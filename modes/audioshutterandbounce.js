'use strict'

const util = require('../util.js')
let audioMap
let audioMapL
module.exports = {
	setup: async (info) => {
		audioMap = await util.getAudioLevelMap(info.videoPath)
		audioMapL = audioMap.length - 1
	},
	getFrameBounds: (info) => {
		const { percentMax } = audioMap[Math.max(Math.min(Math.floor((info.frame / (info.frameCount - 1)) * audioMapL), audioMapL), 0)]
		return {
			width: info.frame < 20 ? info.maxWidth : Math.floor(Math.abs(info.maxWidth * percentMax)),
			height: info.frame < 20 ? info.maxHeight : Math.floor(Math.abs(info.maxHeight * percentMax)),
		}
	},
}
