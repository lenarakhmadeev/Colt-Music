
define ( require ) ->
	$ = require( '$' )
	LastFm = require( 'services/proxy/LastFm' )
	lastFmFilters = require( 'services/proxy/lastFmFilters' )
	C = require( 'services/constants' )


	lastFm = new LastFm( C.LASTFM_KEY, C.LASTFM_URL )

	lastFmProxy =

		getTrackInfo: ( artist, title ) ->
			dfd = new $.Deferred()

			lastFm.getTrackInfo( artist, title )
				.done ( data, textStatus, jqXHR ) ->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = lastFmFilters.info( data )
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message ) ->
					dfd.reject( message )

			dfd.promise()


		getSimilarTracks: ( artist, title, offset, count ) ->
			dfd = new $.Deferred()

			lastFm.getSimilarTracks( artist, title, offset + count )
				.done ( data, textStatus, jqXHR ) ->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = lastFmFilters.similar( data )[ offset... ]
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message ) ->
					dfd.reject( message )

			dfd.promise()


		getArtistTopTracks: ( artist, offset, count ) ->
			dfd = new $.Deferred()

			lastfmApi.getArtistTopTracks( artist, 1, offset + count )
				.done ( data, textStatus, jqXHR ) ->
					if 'error' of data
						dfd.reject( data.message )
					else
						result = lastFmFilters.topTracks( data )[ offset... ]
						dfd.resolve( result )

				.error ( jqXHR, textStatus, message ) ->
					dfd.reject( message )

			dfd.promise()
