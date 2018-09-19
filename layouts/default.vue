<template>
    <v-app>
        <TheHeader/>
        <nuxt/>
    </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader'
export default {
    components: {
        TheHeader
    },
    mounted() {
        this.$store.dispatch('tryAutoLogin')
        this.$store.dispatch('fetchData')
        // this.$store.dispatch('setLoading', false)
    },
}
</script>


<style>
* i{ font-family: 'Material Icons'; }
</style>
