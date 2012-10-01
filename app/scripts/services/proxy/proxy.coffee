
define [
	'underscore'
	'services/proxy/lastFmProxy'
	'services/proxy/vkProxy'

], ( _, lastFmProxy, vkProxy )->

	'use strict'

	# Абстрагирует вызовы API сервисов и фильтрует их
	proxy = _.extend( {}, lastFmProxy, vkProxy )
