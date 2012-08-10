
class @SimModel extends Backbone.Model

	defaults:
		artist: null
		title: null
		audio_url: null
		selected: false
		album_cover: null # Нужно, т.к. приходит автоматом
		info:
			album: null
			album_cover: null
			tags: null
			wiki: null

	getInfo: ()=>
		l 'ItemModel.getInfo', arguments

		_proxy.getInfo(@get('artist'), @get('title'))
			.done((data)=>
				@set(info: data)
			)

	getAudioUrl: ()=>
		l 'ItemModel.getAudioUrl', arguments

		limit = 10
		_proxy.searchAudio(@get('artist'), @get('title'), limit)
			.done((data)=>
				l 'ItemModel.getAudioUrl done', arguments

				@set(audio_url: keypath(data, '0.url'))
			)


