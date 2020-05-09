const dbs = require('../../models');

const state = {
	// showPreviewModal: false,
	previewModalData: null,
}

const getters = {
	PMD: state => {
		return state.previewModalData
	},
}

const mutations = {
	// TOGGLE_SPM: (state, payload) => {
	// 	state.showPreviewModal = !state.showPreviewModal;
	// },
	SET_PREVIEW_DATA: (state, payload) => {
		state.previewModalData = payload;
	},
	DELETE_PREVIEW_DATA: (state, payload) => {
		state.previewModalData = null;
	},
}

const actions = {

}

export default {
    state, getters, mutations, actions
}