
define [
	'jpath'

], ( jpath )->

	'use strict'

	lastFmFilters =

		info: ( data )->
			rawImages = jpath( data, '.track.album.image' )

			album: ( jpath( data, '.track.album.title' ) or [null] )[0]
			images: @filterImages( rawImages )
			tags: jpath( data, 'track.toptags.tag.name' )
			wiki: jpath( data, '.track.wiki' )


		similar: ( data )->
			tracks = jpath( data, '.similartracks.track' )

			# Если нет похожих, lasFm возвращает саму запись почему-то
			return [] if _.isString( tracks[ 0 ] )

			_.map( tracks, @filterSimilar , this )


		topTracks: ()->


		filterImages : ( data )->
			return null unless data?

			result = {}

			for image in data
				result[ image.size ] = image[ '#text' ]

			result


		filterSimilar: ( data )->
			rawImages = jpath( data, '.image' )

			artist: jpath( data, '.artist.name' )
			title: jpath( data, '.name' )
			images: @filterImages( rawImages )


