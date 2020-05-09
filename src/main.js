import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import './assets/scss/app.scss'

Vue.use(Buefy)

Vue.config.productionTip = false

Vue.filter('DA', function (value) {
  if (!value) return ''
  value = value.toString()
  return value + ' DA'
})

Vue.filter('DD-MM-YYYY', function (value) {
  if (!value) return ''
  
})

Vue.filter('DD-MM-YYYY-HH-MM', function (value) {
  if (!value) return ''
  
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

