<template>
  <div class="container">
    <h1>INDICATIONS</h1>
    <p>{{indData}}</p>
    <br/>
    <div v-for="cl in indUnits" v-bind:key="cl.elN">
        <p>{{cl.name}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Indications',
  data() {
      return {
          indData: '',
          indUnits: []
      }
  },
  mounted() {
      this.getIndications()
  },
  methods: {
      async getIndications() {
          await axios
            .get('/classes/indication?order=-createdAt&limit=1')
            .then(response => {
                console.log(response.data.results[0].units)
                this.indData = response.data.results[0].createdAt.split('T')[0]
                this.indUnits = Array.from(Object.values(response.data.results[0].units))
            })
      }
  }
}
</script>