<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
              <h2 class="grey--text text-xs-center">SignIn Form</h2>
            <v-container>
              <form @submit.prevent="onSubmit">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" class="submit" color="red white--text" :disabled="loading" :loading="loading">
                        Sign In
                        <span slot="loader" class="custom-loader">
                            <v-icon dark>cached</v-icon>
                        </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        email: '',
        password: '',
      }
    },
    computed: {
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('login', {
            email: formData.email,
            password: formData.password
        })
        this.$store.dispatch('storeUser', formData)
        this.email = ''
        this.password = ''
      }
    }
  }

</script>

<style scoped>
.submit {
    margin-left: 0 !important;
}
</style>
