
class @ItemModel extends Backbone.Model

	# todo надо ли?
	defaults:
		artist: null
		title: null
		audio_url: null
		selected: false
		info:
			album: null
			album_cover: null
			tags: null
			wiki: null

	initialize: ()->
		@similar = new SimCollection(@get('artist'), @get('title'))

	getInfo: ()=>
		l 'ItemModel.getInfo', arguments

		_proxy.getInfo @get('artist'), @get('title'), (err, data)=>
			if err
				return l err

			@set(info: data)

