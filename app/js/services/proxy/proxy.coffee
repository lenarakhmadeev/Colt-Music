
define [
	'underscore'
	'services/proxy/lastFmProxy'
	'services/proxy/vkProxy'

], ( _, lastFmProxy, vkProxy )->

	'use strict'

	proxy = _.extend( {}, lastFmProxy, vkProxy )
