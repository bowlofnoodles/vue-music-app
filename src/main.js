// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible.js'
import 'common/style/index.styl'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

fastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/images/default.jpg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
