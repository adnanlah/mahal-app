import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.filter('da', function (value) {
  if (!value) return ''
  value = value.toString()
  return value + ' DA'
})

Vue.mixin({
  methods: {
  	successToast(message) {
  		this.$buefy.toast.open({
        message: message,
        type: 'is-success'
      })
  	},
  	failToast(message) {
  		this.$buefy.toast.open({
        duration: 3000,
        message: message,
        position: 'is-top',
        type: 'is-danger'
      })
  	}
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

