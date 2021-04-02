/* eslint-disable no-undef */
const fs = require('fs')
const { ethers } = require('ethers')

module.exports = () => {
	if (fs.existsSync('./src/data/ens.js')) {
		// If the Mirror subdomain wasn't set on the first run, we might have an invalid publication address.
		// This makes sure invalid addresses are re-calculated on every run instead of just the first one.
		if (!String(fs.readFileSync('./src/data/ens.js')).includes("'null'")) return
	}

	const provider = new ethers.providers.InfuraProvider(null, process.env.INFURA_ID)

	provider.resolveName(`${process.env.MIRROR_SUBDOMAIN}.mirror.xyz`).then(publicationAddress => {
		fs.writeFileSync('./src/data/ens.js', `export const publicationAddress = '${publicationAddress}'\n`)
	})
}
