<template>
    <div>
        <template v-if="albumData">
            <Content/>
        </template>
        <template v-else>
            <!-- <h1 class="text-xs-center mt-4 grey--text">No Data to Display</h1> -->
            <v-layout>
                <v-flex xs12 class="text-xs-center">
                    <v-progress-circular color="red" indeterminate v-if="loading"></v-progress-circular>
                </v-flex>
            </v-layout>
        </template>
    </div>
</template>

<script>
import Content from '@/components/Content/Content'
export default {
    data() {
        return {
            headers: [
                {
                    text: 'Artist Name',
                    // align: 'left',
                    sortable: false,
                    value: 'artist',
                },
                { text: 'Album Name', value: 'album', sortable: false, },
                { text: 'Genre', value: 'genre', sortable: false, },
            ],
        }
    },
    middleware: ['routeData'],
    components: {
        Content,
    },
    computed: {
        albumData() {
            return this.$store.getters.albumData
        },
        loading() {
            return this.$store.getters.loading
        }
    }

}
</script>

<style scoped>
/* v-progress-linear {
    height: 3px !important;
} */
</style>
