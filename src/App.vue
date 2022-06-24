<template>
  <div>
    <Navbar />

    <div class="loader-wrapper" v-bind:class="{ 'is-active': $store.state.loading }">
      <div class="loader is-loading"></div>
    </div>

    <section class="section">
      <router-view/>
    </section>
    <Footer />

  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  beforeCreate() {
    this.$store.commit('increment')
    if (this.$store.state.token) {
      axios.defaults.headers['X-Parse-Session-Token'] =  this.$store.state.token
    }
  },
}
</script>

<style lang="scss">
@import '../node_modules/bulma';

.loader-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    opacity: 0;
    z-index: -1;
    transition: opacity .3s;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;

        .loader {
            height: 80px;
            width: 80px;
        }

    &.is-active {
        opacity: 1;
        z-index: 1;
    }
}
</style>
