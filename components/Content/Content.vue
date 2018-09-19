<template>
    <v-container fluid>
        <h1 class="text-xs-center grey--text mb-2">Album Collection</h1>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedAlbum.artistName" :artistName="defaultAlbum.artistName" label="Artist Name" required=""></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-text-field v-model="editedAlbum.albumName" :albumName="defaultAlbum.albumName" label="Album Name" required=""></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                        <v-select label="Genre" :items='items' v-model="editedAlbum.genre" required></v-select>
                        </v-flex>
                    </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
                </v-card-actions>
                </v-card>
        </v-dialog>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular color="red" indeterminate v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-data-table
            :headers="headers"
            :items="albumData"
            hide-actions
            v-if="!loading"
            class="elevation-1">
            <!-- <div v-for="(album, index) in albumData" :key="index"> -->
            <template slot="items" slot-scope="props">
                <!-- <td>{{ desserts.name }}</td> -->
                <td class="text-xs-left" >{{ props.item.artistName}}</td>
                <td class="text-xs-left" >{{ props.item.albumName}}</td>
                <td class="text-xs-left" >{{ props.item.genre }}</td>
                <td class="text-xs-left layout">
                    <v-icon small class="mr-2" @click="editAlbum(props.item)">
                        edit
                    </v-icon>
                    <v-icon small @click="deleteAlbum(props.item)">
                        delete
                    </v-icon>
                </td>
                <!-- <td class="text-xs-right">{{ desserts.protein }}</td>
                <td class="text-xs-right">{{ desserts.iron }}</td> -->
            </template>
             <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                    Sorry, nothing to display here :(
                </v-alert>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
export default {
    // props: ['artistName', 'albumName', 'genre'],
    data() {
        return {
            dialog: false,
            items: ['Pop', 'Rock', 'Jazz', 'Irish', 'Classic'],
            headers: [
                {
                    text: 'Artist Name',
                    sortable: false,
                    value: 'artist',
                },
                { text: 'Album Name', value: 'album', sortable: false, },
                { text: 'Genre', value: 'genre', sortable: false, },
                { text: 'Actions', value: 'Actions', sortable: false, }
            ],
            editedIndex: -1,
            editedAlbum: {
                artistName: '',
                albumName: '',
                genre: ''
            },
            defaultAlbum: {
                artistName: '',
                albumName: '',
                genre: ''
            }
        }
    },
    computed: {
        albumData() {
            return this.$store.getters.albumData
        },
        formTitle() {
            return this.editedIndex === -1 ? '' : 'Edit Album'
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        }
    },
    created() {
        this.albumData
    },
    methods: {
    editAlbum(item) {
        this.editedIndex = this.albumData.indexOf(item)
        console.log(this.albumData.indexOf(item))
        console.log(this.editedIndex)
        this.editedAlbum = Object.assign({}, item)
        console.log(this.editedAlbum)
        this.dialog = true
    },
    deleteAlbum(item) {
        const index = this.albumData.indexOf(item)
        console.log(this.albumData[index].id)
        const deleteData = this.albumData[index]
        // confirm('Are you sure you want to delete this Album?') &&
        this.albumData.splice(index, 1)
        // if(confirm === 'yes') {
            this.$store.dispatch('deletedAlbum', deleteData)
        // }
    },
    close() {
        this.dialog = false
        setTimeout(() => {
            this.editedAlbum = Object.assign({}, this.defaultAlbum)
            this.editedIndex = -1
        }, 300)
    },
    save() {
        console.log(this.editedAlbum)
        if(this.editedAlbum.artistName === '' || this.editAlbum.albumName === '') {
            return
        } else {
            if (this.editedIndex > -1) {
                Object.assign(this.albumData[this.editedIndex], this.editedAlbum)
            } else {
                this.desserts.push(this.editedAlbum)
            }
            this.$store.dispatch('updatedAlbum', this.editedAlbum)
            this.close()
            }
        }
    }
}
</script>

<style scoped>
.v-progress-linear {
    height: 3px !important;
}
</style>
