<template>
  <div class="container">
    <h1 class="has-text-weight-bold">Плащания за {{ indDate}}</h1>
    <h3>Сумите са формирани при цена за киловат: {{ taxes.kWprice }}.лв и такса: {{taxes.tax}}лв.</h3>
    <br/> 

    <div class="column is-12">
      <table class="table is-fullwidth">
          <thead>
              <tr>
                  <th class="has-text-centered">ел.№</th>
                  <th class="has-text-centered">Потребител</th>
                  <th class="has-text-centered">Сума</th>
                  <th></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="cl in indClients" v-bind:key="cl.elN" v-bind:class="cl.paid ? '' : 'has-background-danger-light'">
                  <td class="has-text-centered">{{ cl.elN }}</td>
                  <td>{{ cl.name }}</td>
                  <td class="has-text-centered">{{ ((cl.new - cl.old) * taxes.kWprice + taxes.tax).toFixed(2) }}</td>
                  <td class="has-text-centered">
                    <button v-if="cl.paid" class="button is-small is-danger is-light">Изчисти</button>
                    <button v-else class="button is-small is-info is-light">Плати</button>
                  </td>
                  <td class="has-text-centered">
                    <router-link :to="{ name: 'edit-client', params: { id: cl.elN }}" class="button is-small is-warning is-light">Редактирай</router-link>
                  </td>
              </tr>
          </tbody>
      </table>

      <div class="box columns">
        <div class="column">
          <p>Обща сума: {{ totalSum.toFixed(2) }} лв.</p>
          <p>Касова наличност: {{ cash.toFixed(2) }} лв.</p>
        </div>
        <div class="column has-text-right">
          <p>Главен ел. киловати: {{ indMain.new - indMain.old}} kW</p>
          <p>Потребители киловати: {{ consumed }} kW</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Payments',
    data() {
      return {
          indDate: '',
          indClients: [],
          indMain: {},
          taxes: {},
          cash: 0,
          totalSum: 0,
          consumed: 0
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
              const rawUnits = Array.from(Object.values(res[0].data.results[0].units))
              this.taxes = res[1].data.results[0]

              this.indMain = rawUnits.pop()
              this.indClients = rawUnits

              this.calculateCash()
              this.calculateConsumation()

            }
            catch(err) {
              alert(err.message);
            }

            this.$store.commit('setLoading', false)
        },
        calculateCash() {
          const totalSum = this.indClients.map(cl =>((cl.new - cl.old) * this.taxes.kWprice + this.taxes.tax)).reduce((a, b) => a + b, 0)
          const paid = this.indClients.filter(cl => cl.paid)
          const cash = paid.map(cl =>((cl.new - cl.old) * this.taxes.kWprice + this.taxes.tax)).reduce((a, b) => a + b, 0)
          this.cash = cash
          this.totalSum = totalSum
        },
        calculateConsumation() {
          const cosumations = this.indClients.map(cl => cl.new - cl.old)
          const consumed = cosumations.reduce((a, b) => a + b, 0)
          this.consumed = consumed
        }
    }
}
</script>

<style>

</style>