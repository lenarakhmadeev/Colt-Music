
define [
	'views/View'
	
	'models/PlayerModel'
	'views/PlayerView'

	'collections/ListCollection'
	'views/ListView'

], ( View, PlayerModel, PlayerView, ListCollection, ListView )->

	'use strict'

	class AppView extends View

		initialize: ( options )->
			@initPlayer()
			@initList()


		_render: ()->
			@append( @playerView )
			@append( @listView )


		initPlayer: ()->
			playerModel = new PlayerModel()

			@playerView = new PlayerView( model: playerModel )
			@playerView.render()


		initList: ()->
			listCollection = new ListCollection()
			listCollection.getAudio()

			@listView = new ListView( collection: listCollection )
			@listView.render()