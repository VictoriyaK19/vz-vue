<template>
  
</template>

<script>
import axios from 'axios'

export default {
    name: 'Edit',
    data() {
        return {
            clientID: '',
            data: {},
            client: {
                elN: '',
                name: '',
                phone: '',
                old: '',
                new: '',
                note: ''
            }
        }
    },
    mounted() {
        this.getClientInfo()
    },
    methods: {
        async getClientInfo() {
            this.$store.commit('setLoading', true)

            this.clientID = this.$route.params.id
          
            await axios
                .get('/classes/indication?order=-createdAt')
                .then(response => {
                    this.data = response.data.results[0]
                    this.objectId = response.data.results[0].objectId
                    this.client = response.data.results[0].units[this.clientID]
                    console.log(this.data)
                })
                .catch(err => {
                    console.log(err)
                })

            this.$store.commit('setLoading', false)
        }
    }
}
</script>

<style>

</style>