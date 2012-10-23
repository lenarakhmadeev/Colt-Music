
define ( require )->
	_ = require( 'underscore' )
	vk = require( 'vk' )
	mediator = require( 'services/mediator' )

	'use strict'

	scroll =

		# Инициализация модуля
		init: ()->
			# Слушаем событие скролла VK
			vk.callMethod( 'scrollSubscribe', fireEvent: true )
			vk.addCallback( 'onScroll', _.bind( @_onScroll, this ) )


		_onScroll: ( scrollTop, windowHeight )->
			mediator.publish( 'scroll', scrollTop )

