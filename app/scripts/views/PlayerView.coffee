
define [
	'views/View'
	'services/mediator'
	'views/MarqueeView'
	'tpl!templates/player.html'
	
], ( View, mediator, MarqueeView, playerTemplate )->

	'use strict'

	class PlayerView extends View

		template: playerTemplate

		className: 'player'

		events:
			'click .play': 'resume'
			'click .pause': 'pause'
			'click .rew': 'prev'
			'click .ff': 'next'
			'click .PlayerAddButton': 'addAudio'


		initialize: ( options )->
			@model.on( 'change:current', @renderCurrent, this )

			@marqueeView = new MarqueeView( model: @model )


		_render: ()->
			@renderMarquee()


		renderMarquee: ()->
			@marqueeView.render()
			@append( '.trackinfo', @marqueeView )


		renderPlayed: ()->
			played = @model.getCurrent().get( 'played' )

			if played
				@$( '.play' ).hide()
				@$( '.pause' ).show()
			else
				@$( '.play' ).show()
				@$( '.pause' ).hide()


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
				@$( '.PlayerAddButton' ).show( 500 )
			else
				@$( '.PlayerAddButton' ).hide( 500 )


		renderCover: ()->
			cover = @model.getCurrent().get( 'info.images.126' ) or 'images/big.png'
			@$( '.PlayerBigImage' ).attr( 'src', cover )


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



