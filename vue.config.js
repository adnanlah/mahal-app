module.exports = {
	pluginOptions: {
	    electronBuilder: {
			builderOptions: {
				"extraFiles": {
					"from":"src/assets",
					"to":"./assets/"
				},
			},
			externals: ['umzug']
	    }
	},
	"transpileDependencies": [
		"vuetify"
	]
}