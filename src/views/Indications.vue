<template>
  <div class="container">
    <h1>INDICATIONS</h1>
    <p>{{indData}}</p>
    <br/>
    <div v-for="cl in indUnits" v-bind:key="cl.elN">
        <p>{{cl.name}}</p>
        <p>{{((cl.new - cl.old) * taxes.kWprice + taxes.tax).toFixed(2)}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'Indications',
  data() {
      return {
          indData: '',
          indUnits: [],
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
            
            this.indData = res[0].data.results[0].createdAt.split('T')[0]
            this.indUnits = Array.from(Object.values(res[0].data.results[0].units))
            this.taxes = res[1].data.results[0]
          }
          catch(err) {
            alert(err.message);
          }

          // await axios
          //   .get('/classes/indication?order=-createdAt&limit=1')
          //   .then(response => {
          //       console.log(response.data.results[0].units)
          //       this.indData = response.data.results[0].createdAt.split('T')[0]
          //       this.indUnits = Array.from(Object.values(response.data.results[0].units))
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })

          this.$store.commit('setLoading', false)
      }
  }
}
</script>