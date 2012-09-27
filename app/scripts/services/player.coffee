
define [
	'jquery'
	'module'
	'services/mediator'
	'jquery_jplayer'

], ( $, module, mediator )->

	'use strict'

	player =

		init: ()->
			@initJPlayer()


		initJPlayer: ()->
			@jp = $( '#jp' )

			@jp.jPlayer
				ready: ()=>
					@initEvents()

				swfPath: module.config().swf_path
				wmode: 'window'
				volume: 1
				solution: 'flash,html'

				ended: ()->
					mediator.publish( 'flow:next' )

				cssSelectorAncestor: '.player'
				cssSelector:
					volumeBarValue: '.PlayerVolBar'
					volumeBar: '.PlayerVolBack'

					mute: '.MutePre'
					unmute: '.MuteAft'

					seekBar: '.PlayerLoadProgress'
					playBar: '.PlayerPlayProgress'


		initEvents: ()->
			mediator.subscribe( 'player:play', @play, this )
			mediator.subscribe( 'player:pause', @pause, this )
			mediator.subscribe( 'player:resume', @resume, this )


		play: ( model )->
			@jp.jPlayer( 'setMedia', mp3 : model.get( 'audio.url' ) )
			@jp.jPlayer( 'play' )


		pause: ()->
			@jp.jPlayer( 'pause' )


		resume: ()->
			@jp.jPlayer( 'play' )


		togglePlay: ()->
			event = if @paused then 'player:resume' else 'player:pause'
			mediator.publish( event )


