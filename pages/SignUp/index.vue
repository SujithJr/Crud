<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
              <h2 class="grey--text text-xs-center">SignUp Form</h2>
            <v-container>
            <form @submit.prevent="onSubmit">
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="email" label="Mail" type="email" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="password" label="Password" type="password" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="confirmPassword" label="Confirm Password" :rules="[comparePasswords]" type="password" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn type="submit" class="submit" color="red white--text" :disabled="loading" :loading="loading">
                            Sign up
                            <span slot="loader" class="custom-loader">
                                <v-icon light>cached</v-icon>
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
    import axios from 'axios'
  export default {
    data() {
      return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        loading() {
            return this.$store.getters.loading
        }
    },
    methods: {
        onSubmit() {
            const formData = {
                email: this.email,
                password: this.password,
            }
            if(this.password !== this.confirmPassword) {
                return
            }
            console.log(formData)
            this.$store.dispatch('signup', formData)
            // this.$store.dispatch('storeUser', formData)
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            if (this.user) {
                this.$router.push('/')
            } else {
                return
            }
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.submit {
    margin-left: 0 !important;
}
</style>
