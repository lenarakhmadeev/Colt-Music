
define [
	'underscore'

], ( _ )->

	'use strict'

	audioItemFilter = ( data )->
		result = _.pick( data, 'artist', 'title' )
		result.audio = _.pick( data, 'aid', 'owner_id', 'url', 'duration' )

		result


	vkFilters =

		getAudio: ( data )->
			_.map( data, audioItemFilter )


		searchAudio: ( data )->
			data[ 1... ]
