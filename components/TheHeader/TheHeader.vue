<template>

    <v-toolbar class="primary white--text">
        <v-toolbar-items>
            <v-btn flat class="white--text headline" to="/">Album Book</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-if="user" flat class="white--text title" to="/">Register</v-btn>
            <v-btn v-if="!user" flat class="white--text title" to="/signup">SignUp</v-btn>
            <v-btn v-if="!user" flat class="white--text title" to="/signin">SignIn</v-btn>
            <v-btn v-if="user" flat class="white--text title" to="/data/data">Data</v-btn>
            <v-btn v-if="user" flat class="white--text title" to="/signin" @click="logout">Logout</v-btn>
        </v-toolbar-items>
    </v-toolbar>

</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout')
            // this.$router.push('/signin')
        }
    },
    computed: {
        user() {
            return this.$store.getters.userId
        }
    }
}
</script>

<style>
.v-btn div {
    text-transform: capitalize;
}
</style>
