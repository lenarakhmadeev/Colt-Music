
define [
	'views/View'
	
	'models/PlayerModel'
	'views/PlayerView'

	'models/ListModel'
	'views/ListView'

], (View, PlayerModel, PlayerView, ListModel, ListView)->

	class AppView extends View

		initialize: (options)->
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
			listModel = new ListModel()
			listModel.getAudio()

			@listView = new ListView( model: listModel )
			@listView.render()