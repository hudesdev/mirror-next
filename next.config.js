require('./scripts/resolve-ens')()

module.exports = {
	future: {
		webpack5: true,
	},
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom': 'preact/compat',
			})
		}

		return config
	},
	rewrites: async () => [
		{ source: '/feed.xml', destination: '/api/feed' },
		{ source: '/post/:slug', destination: '/api/post' },
	],
}
