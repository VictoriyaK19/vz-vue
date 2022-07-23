<template>
    <div class="container">
        <div class="box has-background-info-light">
            <h1 class="is-size-4 has-text-weight-bold">Отчитане на показания</h1>
        </div>
    <br/>

    <div class="columns">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th class="has-text-right">Потребител</th>
                    <th class="has-text-centered">ел.№</th>
                    <th class="has-text-centered">Старо</th>
                    <th class="has-text-left">Ново</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cl in indClients" v-bind:key="cl.elN" >
                    <td class="has-text-right"><span class="mt-5">{{ cl.name }}</span></td>
                    <td class="has-text-centered">{{ cl.elN }}</td>
                    <td class="has-text-centered">{{ cl.old }}</td>
                    <td class="has-text-left">
                        <input type="number" v-bind:class="cl.new<cl.old ? 'input is-small has-background-danger-light': 'input is-small'" style="width: 50%;" v-model="cl.new">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="box has-text-centered has-background-info-light">
        <button @click="onSave" class="button is-info">Запиши показанията</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'
import toastData from '../helpers/ToastData'


export default {
    name: 'Reporting',
    data() {
        return {
            indClients: [],
            units: {}
        }
    },
    mounted() {
        this.getIndications()
    },
    methods: {
        async getIndications() {
            this.$store.commit('setLoading', true)

            try {
                const res = await axios.get('/classes/indication?order=-createdAt&limit=1')
                this.indClients = Array.from(Object.values(res.data.results[0].units))
                this.indClients.forEach(cl => {
                    cl.old = cl.new
                })
            }
            catch(err) {
                alert(err.message);
            }

            this.$store.commit('setLoading', false)
        },
        async onSave() {
            let err = ''
            this.indClients.forEach(cl => {
                if (cl.new < cl.old) {
                    err = 'Въведени невалидни показания!'
                }else {
                    this.units[cl.elN] = cl
                }
            })

            if (err) {
                toastData.message = err
                toastData.type = 'is-danger'
                toast(toastData)
            } else {
                this.$store.commit('setLoading', true)

                await axios
                    .post('/classes/indication/', { units: this.units })
                    .then(response => {
                        toastData.message = 'Отчитането успешно.'
                        toastData.type = 'is-success'
                        toast(toastData)

                        this.$router.push('/indications')
                    })
                    .catch(error => {
                        console.log(error)
                        toastData.message = 'Неуспешно отчитане!'
                        toastData.type = 'is-danger'
                        toast(toastData)
                    })

                this.$store.commit('setLoading', false)
            }
        }
    }
}
</script>

<style>

</style>