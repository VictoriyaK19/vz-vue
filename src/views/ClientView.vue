<template>
    <div class="container">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">{{ client.name }}</h1>

            </div>

            <div class="column is-6">
                <div class="box" v-for="p in client.period.length" v-bind:key="p">
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

export default {
    name: 'ClientView',
    data() {
        return {
            client: {
                name: '',
                period: [],
                data: [],
            },
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
                        this.client.data.push(r.units[clientID])
                        this.client.name = r.units[clientID].name
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            
            this.$store.commit('setLoading', false)
        }
    }
}
</script>