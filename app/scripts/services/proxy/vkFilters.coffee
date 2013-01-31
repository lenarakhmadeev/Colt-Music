
define ( require ) ->
	_ = require( '_' )


	pickAudioData = ( data ) ->
		result = _.pick( data, 'owner_id', 'url', 'duration' )

		# Меняем aid на audio_id
		result.audio_id = data.aid

		result


	audioItemFilter = ( data ) ->
		result = _.pick( data, 'artist', 'title' )
		result.audio = pickAudioData( data )

		result


	vkFilters =

		getAudio: ( data ) ->
			_.map( data, audioItemFilter )


		searchAudio: ( data ) ->
			_.map( data[ 1... ], pickAudioData )


		audioUrl: ( data ) ->
			data[ 0 ]
