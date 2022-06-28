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
                    <td class="has-text-centered">{{ cl.new }}</td>
                    <td class="has-text-left">
                        <input type="decimal" class="input is-small" style="width: 50%;" v-model="cl.new">
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
            }
            catch(err) {
                alert(err.message);
            }

            this.$store.commit('setLoading', false)
        }
    }
}
</script>

<style>

</style>