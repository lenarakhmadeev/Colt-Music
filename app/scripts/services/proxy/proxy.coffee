
define ( require )->
	_ = require( '_' )
	lastFmProxy = require( 'services/proxy/lastFmProxy' )
	vkProxy = require( 'services/proxy/vkProxy' )


	# Абстрагирует вызовы API сервисов и фильтрует их
	proxy = _.extend( {}, lastFmProxy, vkProxy )
