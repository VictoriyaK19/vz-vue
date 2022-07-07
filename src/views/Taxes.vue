<template>
  <div class="container">
        <div class="box columns has-background-info-light">
            <div class="column">
                <h1 class="title">Редакция на таксите</h1>
                <p class="has-text-danger">Промяната на таксите да се извършва непосредствено преди отчитане и след събрани задълженията!</p>
                <p class="has-text-danger">В противен случай може да се получат разминавания в касовата наличност и некоректни вземания!</p>
            </div>

            <div class="column is-one-fifth">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Такса (лв.)</label>
                        <div class="control">
                            <input type="decimal" class="input" v-model="taxes.tax">
                        </div>
                    </div>

                    <div class="field">
                        <label>Цена на киловат (лв.)</label>
                        <div class="control">
                            <input type="decimal" class="input" v-model="taxes.kWprice">
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

export default {
    name: 'Taxes',
    data() {
        return {
            taxes: {},
        }
    },
    mounted() {
        this.getTaxes()
    },
    methods: {
        async getTaxes() {
            this.$store.commit('setLoading', true)

            await axios
                .get('/classes/taxes')
                .then(response => {
                    this.taxes = response.data.results[0]
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setLoading', false)
        },
        async submitForm() {
            const toastData = {
                message: 'info',
                type: 'is-info',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            }
                
            if (Number(this.taxes.tax) >= 0 && Number(this.taxes.kWprice) > 0) {
                this.$store.commit('setLoading', true)

                const newdata = {
                    tax: Number(this.taxes.tax),
                    kWprice: Number(this.taxes.kWprice)
                }
                await axios
                    .put('/classes/taxes/' + this.taxes.objectId, newdata)
                    .then(response => {
                        toastData.message = 'Таксите бяха записани успешно.'
                        toastData.type = 'is-success'
                        toast(toastData)

                        this.$router.push('/indications')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$store.commit('setLoading', false)
            } else {
                toastData.message = 'Невалидни данни.'
                toastData.type = 'is-danger'
                toast(toastData)
            }
            
        }
    }
}
</script>

<style>

</style>