
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
			'click .play': 'play'
			'click .pause': 'pause'
			'click .rew': 'prev'
			'click .ff': 'next'
			'click .PlayerAddButton': 'addAudio'


		initialize: ( options )->
			@model.on( 'change:played', @renderPlayed, this )
			@model.on( 'change:current', @renderCurrent, this )

			@marqueeView = new MarqueeView( model: @model )


		_render: ()->
			@renderMarquee()


		renderMarquee: ()->
			@marqueeView.render()
			@append( '.trackinfo', @marqueeView )


		renderPlayed: ()->
			if @model.get( 'played' )
				@$( '.play' ).fadeOut( 'slow' )
				@$( '.pause' ).fadeIn( 'slow' )
			else
				@$( '.play' ).fadeIn( 'slow' )
				@$( '.pause' ).fadeOut( 'slow' )


		renderCurrent: ()->
			current = @model.get( 'current' )

			@renderType( current.get( 'type' ) )

			cover = current.get( 'info.images.large' ) or 'images/big.png'
			@renderCover( cover )


		renderType: ( type )->
			if type == 'similar'
				@$( '.PlayerAddButton' ).show( 500 )
			else
				@$( '.PlayerAddButton' ).hide( 500 )


		renderCover: ( cover )->
			@$( '.PlayerBigImage' ).attr( 'src', cover )



		#-------------------------------------------------------

		play: ()->
			mediator.publish( 'player:resume' )


		pause: ()->
			mediator.publish( 'player:pause' )


		prev: ()->
			mediator.publish( 'list:prev' )


		next: ()->
			mediator.publish( 'list:next' )


		addAudio: ()->
			track = @model.get( 'current' )
			track.addToAudio()



