import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts';
import trends from './modules/trends';
import categories from './modules/categories';
import company from './modules/company';
import modals from './modules/modals';
// const dbs = require('../models');

Vue.use(Vuex)

export default new Vuex.Store({
   	state: {
	},
	getters : {
	},
	mutations: {
	},
	actions: {
		GET_INIT: ({dispatch}) => {
			return Promise.all([
				dispatch('GET_COMPANY'),
				dispatch('GET_CATEGORY'),
				dispatch('GET_ACCOUNT'),
				dispatch('GET_TREND'),
				]);
   		},
	},

	modules: {
		accounts,
		// jobfunctions,
		trends,
		categories,
		company,
		modals,
	}
})
