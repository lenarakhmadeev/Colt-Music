
define (require) ->
	$ = require '$'

	location = document.location.search.substr( 1 )
	pairs = location.split( '&' )
	params = {}

	for pair in pairs
		curr = pair.split( '=' )
		params[ curr[ 0 ] ] = curr[ 1 ]

	params.api_result = $.parseJSON(decodeURIComponent(params.api_result))

	params