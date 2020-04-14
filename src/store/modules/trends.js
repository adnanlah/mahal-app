const dbs = require('../../models');
const Op = dbs.default.Sequelize.Op;

const state = {
	trends: null,
}

const getters = {
	TRENDS: state => {
		return state.trends
	}
}

const mutations = {
	SET_TREND: (state, payload) => {
		state.trends = payload;
	},
}

const actions = {
	GET_TREND: async (context) => {
  dbs.default.CounterSale_Product.aggregate('ProductID', 'DISTINCT', {
      plain: false,
      where: {
        createdAt: {
          [Op.lt]: new Date().toString(),
        }
      },
      include: [dbs.default.Product],
      limit: 7
    })
    .map(function (row) { return row.DISTINCT })
    .then(dss => dss.map(ds => ds.Product ))
    .then(dss => context.commit('SET_TREND', dss))
    .catch((e) => Promise.reject(e));
  }
}
export default {
    state, getters, mutations, actions
}