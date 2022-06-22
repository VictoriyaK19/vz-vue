<template>
    <nav class="navbar is-dark">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                <strong>VZ</strong>
            </router-link>
        </div>
        <div class="navbar-menu is-active">
            <div class="navbar-end">
                
                <router-link to="/about" class="navbar-item">About </router-link>
                <router-link to="/indications" class="navbar-item">Indications</router-link>

                <div class="navbar-item">
                    <div class="buttons">
                        <template v-if="$store.state.token">
                            <router-link to="/my-page" class="button is-info">My Page</router-link>
                        </template>

                        <template v-else>
                            <router-link to="/register" class="button is-success">
                                <strong>Register</strong>
                            </router-link>
                            <router-link to="/login" class="button is-light">
                                <strong>Login</strong>
                            </router-link>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>