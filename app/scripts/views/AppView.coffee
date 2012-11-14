
define ( require )->
	mediator = require( 'services/mediator' )
	vk = require( 'vk' )

	View = require( 'views/View' )

	PlayerModel = require( 'models/PlayerModel' )
	PlayerView = require( 'views/PlayerView' )

	ListCollection = require( 'collections/ListCollection' )
	NavigationView = require( 'views/NavigationView' )
	ListView = require( 'views/ListView' )

	AppTemplate = require( 'tpl!templates/app.html' )


	class AppView extends View

		template: AppTemplate

		className: 'b-app'

		initialize: ( options )->
			@initPlayer()
			@initListCollection()
			@initNavigation()
			@initList()

			mediator.subscribe( 'scroll', @scroll, this )
			mediator.subscribe( 'app:resize', @resizeWindow, this )


		scroll: ( scrollTop )->
			pos = Math.max( scrollTop - 75, 0 )
			@$( '.b-app__slider' ).offset( top: pos );


		resizeWindow: ()->
			height = @$el.height()
			return if @height == height

			@height = height

			vk.callMethod('resizeWindow', null, height + 200)


		initPlayer: ()->
			playerModel = new PlayerModel()
			@playerView = new PlayerView( model: playerModel )


		initListCollection: ()->
			@listCollection = new ListCollection()
			@listCollection.getAudio()


		initNavigation: ()->
			@navigationView = new NavigationView( collection: @listCollection )


		initList: ()->
			@listView = new ListView( collection: @listCollection )


		_render: ()->
			@append( '.b-app__player-place', @playerView )
			@append( '.b-app__navigation-place', @navigationView )
			@append( '.b-app__list-place', @listView )

			@playerView.render()
			@listView.render()
			@navigationView.render()
