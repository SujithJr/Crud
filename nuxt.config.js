const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: '',
  /*
  ** Headers of the page
  */
  head: {
    title: 'crud',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
        {   rel: 'icon', type: 'image/x-icon', href: '/favicon.ico',
            rel: 'stylesheet', type:'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        }
    ]
  },


  modules: [
      // Doc: https://github.com/nuxt-community/axios-module#usage
     ['vue-warehouse/nuxt',
          {
              vuex: true,
              plugins: [
                  'store/plugins/expire',
                  'store/plugins/defaults'
              ],
              storages: [
                  'store/storages/localStorage',
                  'store/storages/cookieStorage'
              ]
          }
      ],
  ],

  /*
  ** Customize the progress bar color
  */
 plugins: ['~/plugins/vuetify.js'],
 css: ['~/assets/css/main.css', 'vuetify/dist/vuetify.css',
    '@mdi/font/css/materialdesignicons.css',
    '@fortawesome/fontawesome-free/css/all.css',
    ],
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vuetify', 'vue-warehouse/nuxt'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      // if (isDev && isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    //   if (ctx.isServer) {
    //       config.externals = [
    //           nodeExternals({
    //               whitelist: [/^vuetify/]
    //           })
    //       ]
    //   }
    }
  }
}
