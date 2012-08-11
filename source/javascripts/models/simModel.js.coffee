
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
		l 'SimModel.getInfo', arguments

		_proxy.getInfo @get('artist'), @get('title'), (err, data)=>
			if err
				return l err

			@set(info: data)


	getAudioUrl: ()=>
		l 'ItemModel.getAudioUrl', arguments




