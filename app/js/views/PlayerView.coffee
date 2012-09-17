
define [
	'views/View'
	'services/mediator'
	'views/MarqueeView'
	'tpl!templates/player.html'
	
], (View, mediator, MarqueeView, playerTemplate)->

	class PlayerView extends View

		template: playerTemplate

		className: 'player'

		events:
			'click .play': 'play'
			'click .pause': 'pause'
			'click .rew': 'prev'
			'click .ff': 'next'
			'click .PlayerAddButton': 'addAudio'


		initialize: (options)->
			@model.on( 'change:played', @renderPlayed, this )
			@model.on( 'change:type', @renderType, this )
			@model.on( 'change:album_cover', @renderCover, this )
			
			@marqueeView = new MarqueeView( model: @model )


		_render: ()->
			@renderMarquee()


		renderMarquee: ()->
			@marqueeView.render()
			@$('.trackinfo', @$el).append( @marqueeView.el )


		renderPlayed: ()->
			if @model.get( 'played' )
				@$('.play').fadeOut('slow')
				@$('.pause').fadeIn('slow')
			else
				@$( '.play' ).fadeIn( 'slow' )
				@$( '.pause' ).fadeOut( 'slow' )


		renderType: ()->
			type = @model.get( 'type' )

			if type == 'item'
				@$( '.PlayerAddButton' ).show( 500 )
			else
				@$( '.PlayerAddButton' ).hide( 500 )


		renderCover: ()->
			@$( '.PlayerBigImage' ).attr( 'src', @model.get( 'album_cover' ) )



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



