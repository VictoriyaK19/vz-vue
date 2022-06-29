<template>
    <div class="container">
    <h1 class="is-size-4 has-text-weight-bold">Отчитане на показания</h1>
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
                <tr v-for="cl in indClients" v-bind:key="cl.elN">
                    <td class="has-text-right"><span class="mt-5">{{ cl.name }}</span></td>
                    <td class="has-text-centered">{{ cl.elN }}</td>
                    <td class="has-text-centered">{{ cl.old }}</td>
                    <td class="has-text-left">
                        <input type="number" class="input is-small" style="width: 50%;" v-model="cl.new">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="box has-text-centered">
        <button @click="onSave()" class="button is-info">Запиши показанията</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'bulma-toast'


export default {
    name: 'Reporting',
    data() {
        return {
            indClients: [],
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
            const toastData = {
                message: 'info',
                type: 'is-info',
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: 'bottom-right',
            }
            const units = this.indClients
            let err = ''
            this.indClients.forEach(cl => {
                if (cl.new < cl.old) {
                    err = 'Невалидни показания'
                }
            })

            if (err) {
                toastData.message = err
                toastData.type = 'is-danger'
                toast(toastData)
            } else {
                toastData.message = 'Промените бяха записани успешно.'
                toastData.type = 'is-success'
                toast(toastData)
            }

            // this must replace in "else" - block

            // await axios
            //     .post('/classes/indications/', {units,})
            //     .then(response => {
            //         toastData.message = 'Промените бяха записани успешно.'
            //         toastData.type = 'is-success'
            //         toast(toastData)

            //         this.$router.push('/indications')
            //     })
            //     .catch(error => {
            //         console.log(error)
            //         toastData.message = 'Липсващи или невалидни данни.'
            //         toastData.type = 'is-danger'
            //         toast(toastData)
            //     })
            
        }
    }
}
</script>

<style>

</style>