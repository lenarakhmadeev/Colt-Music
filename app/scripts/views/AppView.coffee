
define [
	'services/mediator'

	'views/View'
	
	'models/PlayerModel'
	'views/PlayerView'

	'collections/ListCollection'
	'views/NavigationView'
	'views/ListView'

	'tpl!templates/app.html'

], ( mediator, View, PlayerModel, PlayerView, ListCollection, NavigationView, ListView, AppTemplate )->

	'use strict'

	class AppView extends View

		template: AppTemplate

		className: 'b-app'

		initialize: ( options )->
			@initPlayer()
			@initListCollection()
			@initNavigation()
			@initList()

			mediator.subscribe( 'scroll', @_onScroll, this )


		_onScroll: ( scrollTop )->
			pos = Math.max( scrollTop - 75, 0 )
			@$( '.b-app__slider' ).offset( top: pos );


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
			@playerView.render()
			@append( '.b-app__player-place', @playerView )

			@navigationView.render()
			@append( '.b-app__navigation-place', @navigationView )

			@listView.render()
			@append( '.b-app__list-place', @listView )
