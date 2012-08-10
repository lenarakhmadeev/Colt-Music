
class @ItemModel extends Backbone.Model

	# todo ошибки ajax как обраб??

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

		_proxy.getInfo(@get('artist'), @get('title'))
			.done((data)=>
				@set(info: data)
			)
