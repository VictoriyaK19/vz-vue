<template>
  <div class="container">
    <h1 class="has-text-weight-bold">Показания от {{indDate}}</h1>
    <h3>Сумите са формирани при цена за киловат: {{taxes.kWprice}}.лв и такса: {{taxes.tax}}лв.</h3>
    <br/>

    <div class="column is-12">
      <table class="table is-fullwidth">
          <thead>
              <tr>
                  <th class="has-text-centered">ел.№</th>
                  <th class="has-text-centered">Потребител</th>
                  <th class="has-text-centered">Сума</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="cl in indClients" v-bind:key="cl.elN" v-bind:class="!cl.paid ? 'has-background-danger-light': ''">
                  <td class="has-text-centered">{{ cl.elN }}</td>
                  <td>{{ cl.name }}</td>
                  <td class="has-text-centered">{{ ((cl.new - cl.old) * taxes.kWprice + taxes.tax).toFixed(2) }}</td>
                  <td>
                      <router-link :to="{ name: 'client', params: { id: cl.elN }}" class="is-italic">инфо</router-link>
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
  name: 'Indications',
  data() {
      return {
          indDate: '',
          indClients: [],
          taxes: {}
      }
  },
  mounted() {
      this.getIndications()
  },
  methods: {
      async getIndications() {
          this.$store.commit('setLoading', true)

          try {
            const res = await Promise.all([
              axios.get('/classes/indication?order=-createdAt&limit=1'),
              axios.get('/classes/taxes')
            ])
            
            this.indDate = res[0].data.results[0].createdAt.split('T')[0]
            this.indClients = Array.from(Object.values(res[0].data.results[0].units))
            this.indClients = this.indClients.filter(unit => unit.elN != 99)
            this.taxes = res[1].data.results[0]
          }
          catch(err) {
            alert(err.message);
          }

          this.$store.commit('setLoading', false)
      }
  }
}
</script>