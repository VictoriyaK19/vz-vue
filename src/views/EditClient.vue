<template>
    <div class="container">
        <div class=" box columns has-background-info-light">
            <div class="column">
                <h1 class="title">Редакция на Потребител</h1>
                <h3 class="title has-text-info">{{client.name}}</h3>
            </div>

            <div class="column">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Имена</label>
                        <div class="control">
                            <input type="decimal" class="input" v-model="client.name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Телефон</label>
                        <div class="control">
                            <input type="text" class="input" v-model="client.phone">
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Показания Старо</label>
                        <div class="control">
                            <input type="text" class="input" v-model="client.old">
                        </div>
                    </div>

                    <div class="field">
                        <label>Показания Ново</label>
                        <div class="control">
                            <input type="text" class="input" v-model="client.new">
                        </div>
                    </div>

                    <div class="field">
                        <label>Бележка</label>
                        <div class="control">
                            <input type="text" class="input" v-model="client.note">
                        </div>
                    </div>

                    <div class="field mt-5">
                        <div class="control">
                            <button class="button is-info">Запиши</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import toastData from '../helpers/ToastData'

export default {
    name: 'EditClient',
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
                .get('/classes/indication?order=-createdAt&limit=1')
                .then(response => {
                    this.data = response.data.results[0]
                    this.client = response.data.results[0].units[this.clientID]
                })
                .catch(err => {
                    console.log(err)
                })

            this.$store.commit('setLoading', false)
        },
        async submitForm() {
            this.data.units[this.clientID] = this.client

            if (this.client.old >= 0 && this.client.new >= this.client.old && this.client.name != '') {
                await axios
                    .put('/classes/indication/' + this.data.objectId, { units: this.data.units })
                    .then(response => {
                        toastData.message = 'Промените бяха записани успешно.'
                        toastData.type = 'is-success'
                        toast(toastData)

                        this.$router.push('/indications')
                    })
                    .catch(error => {
                        console.log(error)
                        toastData.message = 'Неуспешна редакция!'
                        toastData.type = 'is-danger'
                        toast(toastData)
                    })
            } else {
                toastData.message = 'Липсващи или невалидни данни.'
                toastData.type = 'is-danger'
                toast(toastData)
            }
        }
    }
}
</script>

<style>

</style>