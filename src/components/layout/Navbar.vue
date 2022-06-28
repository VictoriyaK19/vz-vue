<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>ВЗ</strong>
            </router-link>
            <template v-if="$store.state.user">
                <p class="navbar-item">Привет, {{$store.state.user}}</p>
            </template>
        </div>
        <div class="navbar-menu is-active">
            <div class="navbar-end">
                
                <router-link to="/indications" class="navbar-item"><strong>Показания</strong></router-link>
                
                <router-link to="/about" class="navbar-item"><strong>Контакти</strong></router-link>

                <router-link to="/archive" class="navbar-item"><strong>Архив</strong></router-link>

                <template v-if="$store.state.user">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link has-text-info"><strong>Администрация</strong></a>

                        <div class="navbar-dropdown">
                            <router-link to="/payments" class="navbar-item has-text-info"><strong>Плащания</strong></router-link>
                            <router-link to="/taxes" class="navbar-item has-text-info"><strong>Такси</strong></router-link>
                            <router-link to="/reporting" class="navbar-item has-text-info"><strong>Отчитане</strong></router-link>
                            <router-link to="/" class="navbar-item has-text-info"><strong>Добавяне</strong></router-link>
                            <router-link to="/" class="navbar-item has-text-info"><strong>Изтриване</strong></router-link>
                            <hr class="navbar-divider">
                            <router-link @click="logout" to="#" class="navbar-item has-text-danger"><strong>Изход</strong></router-link>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <router-link to="/login" class="navbar-item has-text-info"><strong>Админ</strong></router-link>
                </template>
                
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Navbar',
    methods: {
        async logout() {
            await axios
                .post('/logout')
                .then(response => {
                    console.log('Logout!')
                })
                .catch(error =>{
                    console.log(JSON.stringify(error))
                })
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            this.$store.commit('removeToken')
            this.$store.commit('removeUser')
            
            axios.defaults.headers['X-Parse-Session-Token'] = ''

            this.$router.push('/')
        }
    }
}
</script>

<style>

</style>