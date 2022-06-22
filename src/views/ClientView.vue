<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Потребител {{ client.name }}</h1>

            </div>

            <!-- <Chart /> -->
            <chart :type="'bar'" :data="{labels, datasets}" :options="options"></chart>

            <div class="column is-6">
                <div class="box" v-for="p in client.period.length" v-bind:key="p" v-bind:class="!client.data[p-1].paid ? 'has-background-danger-light': ''">
                    <h2 class="subtitle">Детайли за период {{client.period[p-1]}}</h2>
                    <p>Старо: {{client.data[p-1].old}}, Ново: {{client.data[p-1].new}}</p>
                    <p>-- Разлика: {{client.data[p-1].new - client.data[p-1].old}} --</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import Chart from '../components/layout/Chart.vue'
import Chart from 'vue-bulma-chartjs'

export default {
    name: 'ClientView',
    components: {
        Chart,
    },
    data() {
        return {
            client: {
                name: '',
                period: [],
                data: [],
            },
            // data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
                }],
            // },
            options: {
                segmentShowStroke: false
            }
        }
    },
    mounted() {
        this.getClientInfo()
    },
    methods: {
        async getClientInfo() {
            this.$store.commit('setLoading', true)

            const clientID = this.$route.params.id
          
            await axios
                .get('/classes/indication?order=-createdAt')
                .then(response => {
                    response.data.results.forEach( r => {
                        this.client.period.push(r.createdAt.split('T')[0])
                        this.labels.push(r.createdAt.split('T')[0])
                        this.client.data.push(r.units[clientID])
                        this.client.name = r.units[clientID].name
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            this.labels = this.client.period
            console.log(this.labels)
            this.datasets[0].data = Array.from(this.client.data.map(cl => cl.new - cl.old))
            console.log(this.datasets[0])
            
            this.$store.commit('setLoading', false)
        }
    }
}
</script>