module.exports = {
	pluginOptions: {
	    electronBuilder: {
			builderOptions: {
				"extraFiles": {
					"from":"src/migrations",
					"to":"./migrations/"
				},
				nodeIntegration: true,
      			externals: ['umzug']
			}
	    }
	},
	"transpileDependencies": [
		"vuetify"
	]
}