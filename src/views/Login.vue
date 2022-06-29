<template>
    <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Администрация</h1>

                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label>Потребител</label>
                        <div class="control">
                            <input type="text" name="username" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Парола</label>
                        <div class="control">
                            <input type="password" name="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
                    </div>

                    <div class="field mt-5">
                        <div class="control">
                            <button class="button is-info">Вход</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name: 'Login',
     data() {
        return {
            username: '',
            password: '',
            errors: []
        }
    },
    methods: {
        async submitForm() {
            this.$store.commit('setLoading', true)

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            const formData = {
                    username: this.username,
                    password: this.password,
                }
            await axios
                .post('/login', formData)
                .then(response => {
                    const token = response.data.sessionToken
                    const user = response.data.username
                    this.$store.commit('setToken', token)
                    this.$store.commit('setUser', user)
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', user)

                    axios.defaults.headers['X-Parse-Session-Token'] = token

                    this.$router.push('/indications')
                })
                .catch(error => {
                    if (error.response) {
                        for (const property in error.response.data) {
                            this.errors.push(`${property}:  ${error.response.data[property]}`)
                        }
                    } else if (error.message) {
                        this.errors.push(`Error: ${error.message}`)
                    }
                })


            this.$store.commit('setLoading', false)
            
        }
    }
}
</script>

