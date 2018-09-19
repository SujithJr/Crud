<template>
    <v-container>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular color="red" indeterminate v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row v-if="user">
            <v-flex xs6 offset-xs3>
                <h1 class="text-xs-center grey--text mt-2 mb-4">Album Book</h1>
                <v-card>
                    <v-form @submit.prevent="submit" class="form">
                        <v-text-field v-model="artistName" :artistName="artistName" label="Artist" required></v-text-field>
                        <v-text-field v-model="albumName" :albumName="albumName" label="Album" required ></v-text-field>
                        <v-select :items='items' name="Type" label="Genre" :genre="genre" v-model="genre">
                        </v-select>
                        <!-- <v-text-field v-model="albumName" :rules="albumRules" label="Album" required ></v-text-field>
                        <v-text-field v-model="albumName" :rules="albumRules" label="Album" required ></v-text-field> -->
                        <v-btn type="submit" class="sub" color="red white--text" :disabled="loading" :loading="loading">
                            Submit
                            <span slot="loader" class="custom-loader">
                                <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>
                    </v-form>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row v-else>
            <v-flex xs6 offset-xs3>
                <v-jumbotron>
                    <v-container fill-height>
                        <v-layout align-center>
                            <v-flex>
                                <h3 class="display-3 grey--text">Hey! It's Album Book</h3>
                                <span class="subheading">Music, at its essence, is what gives us memories. And the longer a song has existed in our lives, the more memories we have of it.</span>
                                <v-divider class="my-3"></v-divider>
                                <div class="title mb-3">Let your song change the world.!</div>
                                <v-btn
                                    class="mx-0"
                                    color="primary"
                                    large
                                    to="/signin"
                                >
                                See more
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-jumbotron>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            items: ['Pop', 'Rock', 'Jazz', 'Irish', 'Classic'],
            editedName: {
                artistName: '',
                albumName: '',
                genre: ''
            },
            artistName: '',
            albumName: '',
            genre: '',
        }
    },
    middleware: [],
    methods: {
        submit() {
            const data = {
                artistName: this.artistName,
                albumName: this.albumName,
                genre: this.genre
            }
            console.log(data)
            // axios.post('https://crud-e5523.firebaseio.com/users.json', data)
            // .then((res) => {
            //     console.log(res)
            // }).catch((err) => {
            //     console.log(err)
            // })
            this.artistName = ''
            this.albumName = ''
            this.genre = ''
            this.$store.dispatch('storeUser', data)
            // this.$router.push('/data/data')
        }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        },
        user() {
            return this.$store.getters.userId
        }
    }
}
</script>

<style>
.card {
    padding: 2rem;
    margin-top: 2rem;
}
.form {
    padding: 2rem;
}
.sub {
    margin-left: 0;
}
h1 {
    font-size: 3rem;
}
</style>
