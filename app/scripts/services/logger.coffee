
define [
	'jquery'
	'vk'
	'services/mediator'
	'humane'

], ( $, vk, mediator, humane )->

	'use strict'

	logger =

		init: ()->
			vk.callMethod( 'scrollSubscribe', fireEvent: true )
			vk.addCallback( 'onScroll', @onScroll )

			mediator.subscribe( 'logger:error', @errorMessage, this )
			mediator.subscribe( 'logger:info', @infoMessage, this )
			mediator.subscribe( 'logger:debug', @debugMessage, this )


		errorMessage: ( message )->
			console.log 'error', message
			@_showMessage( message )


		infoMessage: ( message )->
			console.log 'info', message
			@_showMessage( message )


		debugMessage: ( message	)->
			console.log 'debug', message
			@_showMessage( message )


		_showMessage: ( message, type )->
			humane.log( message, { timeout: 1500, clickToClose: true } )
			$( '.humane' ).offset( top: @_getPosition() )


		_getPosition: ()->
			@topPosition


		onScroll: ( scrollTop, windowHeight )->
			console.log 'onscroll', this, scrollTop
			logger.topPosition = scrollTop
