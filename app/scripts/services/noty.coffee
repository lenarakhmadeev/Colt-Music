
define [
	'jquery'
	'vk'
	'humane'

], ( $, vk, humane )->

	noty =

		timeout: 1500

		init: ()->
			vk.callMethod( 'scrollSubscribe', fireEvent: true )
			vk.addCallback( 'onScroll', @_onScroll )

			humane.error = humane.spawn
				addnCls: 'humane-original-error'
				timeout: @timeout

			humane.success = humane.spawn
				addnCls: 'humane-original-success'
				timeout: @timeout


		error: ( message )->
			@_notify( 'error', message )


		success: ( message )->
			@_notify( 'success', message )


		info: ( message )->
			@_notify( 'log', message )


		_notify: ( type, message )->
			humane[ type ]( message )

			# Хак
			$( '.humane' ).offset( top: @_getPosition() )


		_getPosition: ()->
			@topPosition


		_onScroll: ( scrollTop, windowHeight )->
			noty.topPosition = scrollTop