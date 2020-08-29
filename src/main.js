// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '~/assets/scss/globals.scss'
import Vuex from 'vuex'
require('typeface-source-sans-pro')
require('typeface-fira-code')

export default function (Vue, { router, head, isClient, appOptions }) {
  Vue.use(Vuex)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Add attributes to HTML tag
  head.htmlAttrs = { lang: 'en' }

  head.link.push({
    rel: 'manifest',
    href: '/manifest.json'
  })

  head.meta.push({
    name: 'theme-color',
    content: '#10c186'
  })

  head.meta.push({
    name: 'google-site-verification',
    content: process.env.GSV_META
  })

  head.meta.push({
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'default'
  })

  let copyRightNotice = `Linh Nguyen, ${ new Date().getFullYear() }. All rights reserved`;

  head.meta.push(
    {
      name: 'author',
      content: 'Linh Nguyen'
    },
    {name: 'copyright', content: copyRightNotice},
    {property: "og:image", content: 'https://tuleism.github.io/logo-512.png'},
    {name: "twitter:card", content: 'summary'},
    {name: "twitter:site", content: '@tuleism'},
    {name: "twitter:image", content: 'https://tuleism.github.io/logo-512.png'}
  )

  // State
  appOptions.store = new Vuex.Store({
    state: {
      sidebarOpen: false
    },
    mutations: {
      toggleSidebar(state) {
        state.sidebarOpen = !state.sidebarOpen
      },
      closeSidebar(state) {
        state.sidebarOpen = false
      },
      openSidebar(state) {
        state.sidebarOpen = true
      }
    }
  })
}
