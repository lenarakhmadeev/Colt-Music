
define ( require, exports, module )->
	$ = require( 'jquery' )
	mediator = require( 'services/mediator' )


	# Отвечает за воспроизведение треков
	player =

		# Инициализация модуля
		init: ()->
			@initJPlayer()


		# Инициализация jPlayer
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

				cssSelectorAncestor: '.b-player'
				cssSelector:
					volumeBarValue: '.b-player__volume-bar'
					volumeBar: '.b-player__volume'

					mute: '.b-player__mute-button'
					unmute: '.b-player__unmute-button'

					seekBar: '.b-player__load-bar'
					playBar: '.b-player__progress-bar'


		# Инициализация слушателей событий
		initEvents: ()->
			mediator.subscribe( 'player:play', @play, this )
			mediator.subscribe( 'player:pause', @pause, this )
			mediator.subscribe( 'player:resume', @resume, this )


		# Начинает вопроизведение трека
		play: ( model )->
			@jp.jPlayer( 'setMedia', mp3 : model.get( 'audio.url' ) )
			@jp.jPlayer( 'play' )


		# Пауза
		pause: ()->
			@jp.jPlayer( 'pause' )


		# Продолжает воспроизведение
		resume: ()->
			@jp.jPlayer( 'play' )


		# Меняет состояние поигрывания на обратное: паузу на плей, плей на паузу
		togglePlay: ()->
			event = if @paused then 'player:resume' else 'player:pause'
			mediator.publish( event )


