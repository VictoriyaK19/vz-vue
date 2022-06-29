<template>
    <div class="container">
        <div class="columns">
            <div class="column">
                <h1 class="title">Добавяне на потребител</h1>
            </div>

            <div class="column">
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Имена</label>
                        <div class="control">
                            <input type="decimal" class="input" v-model="newClient.name">
                        </div>
                    </div>

                    <div class="field">
                        <label>Телефон</label>
                        <div class="control">
                            <input type="text" class="input" v-model="newClient.phone">
                        </div>
                    </div>
                    
                    <div class="field">
                        <label>Показания Старо</label>
                        <div class="control">
                            <input type="text" class="input" v-model="newClient.old">
                        </div>
                    </div>

                    <div class="field">
                        <label>Показания Ново</label>
                        <div class="control">
                            <input type="text" class="input" v-model="newClient.new">
                        </div>
                    </div>

                    <div class="field">
                        <label>Бележка</label>
                        <div class="control">
                            <input type="text" class="input" v-model="newClient.note">
                        </div>
                    </div>

                    <div class="field mt-5">
                        <div class="control">
                            <button class="button is-success">Добави</button>
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
    name: 'AddClient',
    data() {
      return {
            objectId: '',
            indClients: [],
            indMain: {},
            newClient: {
                check: "on",
                elN: "",
                name: "",
                new: 0,
                note: "",
                old: 0,
                paid: true,
                phone: ""
            }
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
            
            this.objectId = res.data.results[0].objectId
            const rawUnits = Array.from(Object.values(res.data.results[0].units))

            this.newClient.elN = rawUnits.length
            this.indMain = rawUnits.pop()
            this.indClients = rawUnits
          }
          catch(err) {
            alert(err.message);
          }

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
            this.indClients.push(this.newClient)
            this.indClients.push(this.indMain)
            const units = this.indClients
            
            console.log(units)

            // if (this.client.old >= 0 && this.client.new >= this.client.old && this.client.name != '') {
            //     await axios
            //         .put('/classes/indications/' + this.objectId, {units,})
            //         .then(response => {
            //             toastData.message = 'Промените бяха записани успешно.'
            //             toastData.type = 'is-success'
            //             toast(toastData)

            //             this.$router.push('/indications')
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         })
            // } else {
            //     toastData.message = 'Липсващи или невалидни данни.'
            //     toastData.type = 'is-danger'
            //     toast(toastData)
            // }
        }
  }
}
</script>

<style>

</style>