require('module-alias/register')

const { AppID, APIKey } = require('config/audio')
const ffmpeg = require('fluent-ffmpeg')

const Xunfei = require('xunfeisdk')
const { IATAueType, IATEngineType } = require('xunfeisdk')

const client = new Xunfei.Client(AppID)

client.IATAppKey = APIKey

module.exports = {
	Recognize: audio =>
		client.IAT(audio, IATEngineType.SMS8K_Mandarin, IATAueType.RAW),
	ConvertByteRate: (path, callback, ctx) =>
		ffmpeg(path)
			.audioCodec('libmp3lame')
			.audioBitrate('128k')
			.audioChannels(2)
			.save(path)
			.on('end',callback)
			.on('error', () => ctx.sendError('音频转换失败!'))
}
