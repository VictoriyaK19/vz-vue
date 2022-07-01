<template>
    <div class="container">
        <div class="box columns has-background-info-light">
            <div class="column">
                <h1 class="is-size-4 has-text-weight-bold">Архив</h1>
            </div>

            <div class="column has-text-right">
                <div class="dropdown is-hoverable is-right">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu1">
                            <strong>Изберете архивни данни</strong>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu1" role="menu">
                        <div class="dropdown-content" v-for="date, index in dates" v-bind:key="index">
                            <div class="dropdown-item">
                                <a @click="fromIndex(index)"><strong>От дата: {{ date }}</strong></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="indDate" class="box">
            <div class="column is-12">
                <h1 class="is-size-4 has-text-weight-bold">Показания от {{ indDate }}</h1>
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th class="has-text-centered">ел.№</th>
                            <th class="has-text-centered">Потребител</th>
                            <th class="has-text-centered">Старо</th>
                            <th class="has-text-centered">Ново</th>
                            <th class="has-text-centered">Разлика</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cl in indClients" v-bind:key="cl.elN">
                            <td class="has-text-centered">{{ cl.elN }}</td>
                            <td>{{ cl.name }}</td>
                            <td class="has-text-centered">{{ cl.old }}</td>
                            <td class="has-text-centered">{{ cl.new }}</td>
                            <td class="has-text-centered">{{ cl.new - cl.old }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else class="box has-background-info-light">
            <figure class="image is-3by3">
                <img src="../assets/img_archive.png">
            </figure>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Archive',
    data() {
      return {
          dates: [],
          archives: [],
          indDate: '',
          indClients: []
      }
    },
    mounted() {
        this.getAll()
    },
    methods: {
        async getAll() {
            this.$store.commit('setLoading', true)

            try {
                const res = await axios.get('/classes/indication?order=-createdAt')

                this.dates = res.data.results.map(a => a.createdAt.split('T')[0])
                this.archives = res.data.results.map(a => a.units)
            }
            catch(err) {
                alert(err.message);
            }

            this.$store.commit('setLoading', false)
        },
        fromIndex(i) {
            this.indDate = this.dates[i]
            this.indClients = this.archives[i]
        }
    }

}
</script>

<style>

</style>