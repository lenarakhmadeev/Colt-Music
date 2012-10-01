
define [
	'jquery'
	'module'
	'services/mediator'
	'jquery_jplayer'

], ( $, module, mediator )->

	'use strict'

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

				cssSelectorAncestor: '.player'
				cssSelector:
					volumeBarValue: '.PlayerVolBar'
					volumeBar: '.PlayerVolBack'

					mute: '.MutePre'
					unmute: '.MuteAft'

					seekBar: '.PlayerLoadProgress'
					playBar: '.PlayerPlayProgress'


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


