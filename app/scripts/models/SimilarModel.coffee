
define ( require )->
	TrackModel = require( 'models/TrackModel' )


	class SimilarModel extends TrackModel

		defaults:
			artist: null
			title: null

			selected: false
			played: false

			type: 'similar'
			has_info: false
			has_audio: false

			info:
				wiki: null
				album: null
				images: null
				tags: null

			audio:
				url: null
				audio_id: null
				owner_id: null
				duration: null









