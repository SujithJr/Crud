<template>
    <v-dialog v-model="dialog" max-width="500px" persistent>
        <v-card>
            <v-card-title>
                <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedAlbum.artistName" label="Artist Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedAlbum.albumName" label="Album Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                    <v-select label="Genre" :albumTypes='albumTypes' v-model=editedAlbum.genre></v-select>
                    </v-flex>
                </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['content']
}
</script>

