<template>
  <chart :type="'bar'" :data="data" :options="options"></chart>
</template>

<script>
import Chart from 'vue-bulma-chartjs'

export default {
  components: {
    Chart,

  },
  data () {
    return {
      data: {
        labels: [1,2,3,4],
        datasets: [{
          data: [20, 40, 5, 35],
          backgroundColor: [
            '#1fc8db',
            '#fce473',
            '#42afe3',
            '#ed6c63',
            '#97cd76'
          ]
        }]
      },
      options: {
        segmentShowStroke: false
      }
    }
  },
}
</script>