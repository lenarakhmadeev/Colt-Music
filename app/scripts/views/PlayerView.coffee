
define ( require )->
	View = require( 'views/View' )
	mediator = require( 'services/mediator' )
	MarqueeView = require( 'views/MarqueeView' )
	playerTemplate = require( 'tpl!templates/player.html' )

	'use strict'

	class PlayerView extends View

		template: playerTemplate

		className: 'b-player'

		events:
			'click .b-player__play-button': 'resume'
			'click .b-player__pause-button': 'pause'
			'click .b-player__prev-button': 'prev'
			'click .b-player__next-button': 'next'
			'click .b-player__add-button': 'addAudio'


		initialize: ( options )->
			@model.on( 'change:current', @renderCurrent, this )

			@marqueeView = new MarqueeView( model: @model )


		_render: ()->
			@renderMarquee()


		renderMarquee: ()->
			@marqueeView.render()
			@append( '.b-player__marquee-place', @marqueeView )


		renderPlayed: ()->
			played = @model.getCurrent().get( 'played' )

			if played
				@$( '.b-player__play-button' ).hide()
				@$( '.b-player__pause-button' ).show()
			else
				@$( '.b-player__play-button' ).show()
				@$( '.b-player__pause-button' ).hide()


		renderCurrent: ()->
			@subscribePlayed()

			@renderType()
			@renderCover()
			@renderPlayed()


		subscribePlayed: ()->
			current = @model.getCurrent()
			@model.off( 'change:played', null, this )
			current.on( 'change:played', @renderPlayed, this )


		renderType: ()->
			type = @model.getCurrent().get( 'type' )

			if type == 'similar'
				@$( '.b-player__add-button' ).show( 500 )
			else
				@$( '.b-player__add-button' ).hide( 500 )


		renderCover: ()->
			cover = @model.getCurrent().get( 'info.images.126' ) or 'images/big.png'
			@$( '.b-player__cover-image' ).attr( 'src', cover )


		resume: ()->
			@model.resume()


		pause: ()->
			@model.pause()


		prev: ()->
			mediator.publish( 'flow:prev' )


		next: ()->
			mediator.publish( 'flow:next' )


		addAudio: ()->
			track = @model.getCurrent()
			track.addToAudio()



