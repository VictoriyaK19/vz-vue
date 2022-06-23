<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">Потребител {{ client.name }}</h1>

            </div>

            <chart :type="'bar'" :height="100" :data="{labels, datasets}" :options="options"></chart>

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
import Chart from 'vue-bulma-chartjs'

export default {
    name: 'ClientView',
    components: {
        Chart,
    },
    data() {
        return {
            res: [],
            client: {
                name: '',
                period: [],
                data: [],
            },
            
            labels: [],
            datasets: [{
                label: 'Консумирани киловати',
                data: [],
                backgroundColor: []
            }],
            options: {
                segmentShowStroke: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
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
                .get('/classes/indication?order=createdAt')
                .then(response => {
                    this.res = response.data.results
                })
                .catch(err => {
                    console.log(err)
                })

            this.res.forEach(r => {
                this.client.period.push(r.createdAt.split('T')[0])
                this.labels.push(`${r.createdAt.split('T')[0]} ст.${r.units[clientID].old}-н.${r.units[clientID].new}`)
                this.client.data.push(r.units[clientID])
            })

            this.client.name = this.res[0].units[clientID].name
            
            this.datasets[0].data = Array.from(this.client.data.map(cl => cl.new - cl.old))
            this.datasets[0].backgroundColor = Array.from(this.client.data.map(cl => cl.paid ? '#E0FFFF' : '#FFF0F5'))
            //this.datasets[0].backgroundColor = Array(this.labels.length).fill('#FFF0F5')
            
            this.$store.commit('setLoading', false)
        }
    }
}
</script>