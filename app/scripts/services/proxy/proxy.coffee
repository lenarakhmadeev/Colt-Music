
define ( require )->
	_ = require( 'underscore' )
	lastFmProxy = require( 'services/proxy/lastFmProxy' )
	vkProxy = require( 'services/proxy/vkProxy' )

	'use strict'

	# Абстрагирует вызовы API сервисов и фильтрует их
	proxy = _.extend( {}, lastFmProxy, vkProxy )
