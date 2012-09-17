
define [
	'jquery'
	'services/mediator'
	'jquery_jplayer'

], ($, mediator)->

	player =

		init: ()->
			@initJPlayer()
			@initEvents()


		initJPlayer: ()->
			@jp = $('#jp')

			@jp.jPlayer
				ready: ()=>
					# todo&&
					console.log 'ready'

				swfPath: 'js/libs/jquery/jplayer'
				wmode: 'window'
				volume: 1
				solution: 'flash,html'

				ended: ()->
					mediator.publish( 'list:next')

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


		play: (model)->
			console.log 'play', model
			@jp.jPlayer( 'setMedia', mp3 : model.get( 'url' ) or model.get( 'audio' ).url )
			@jp.jPlayer( 'play' )


		pause: ()->
			@jp.jPlayer( 'pause' )


		resume: ()->
			@jp.jPlayer( 'play' )
