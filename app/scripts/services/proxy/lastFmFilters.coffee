
define ( require )->
	jpath = require( 'jpath' )
	_ = require( 'underscore' )

	'use strict'

	lastFmFilters =

		info: ( data )->
			rawImages = jpath( data, '.track.album.image' )

			album: jpath( data, '.track.album.title' )
			images: @filterInfoImages( rawImages )
			tags: jpath( data, 'track.toptags.tag.name', true )
			wiki: jpath( data, '.track.wiki' )


		similar: ( data )->
			tracks = jpath( data, '.similartracks.track' )

			# Если нет похожих, lasFm возвращает саму запись почему-то
			return [] if _.isString( tracks[ 0 ] )

			_.map( tracks, @filterSimilar , this )


		topTracks: ()->


		filterImages : ( data, sizes)->
			return null unless data?

			result = {}

			for image in data
				result[ sizes[ image.size ] ] = image[ '#text' ]

			result


		infoImageSizes:
			'small': 64
			'medium': 126
			'large': 174
			'extralarge': 300

		filterInfoImages: ( data )->
			@filterImages( data, @infoImageSizes )


		similarImageSizes:
			'small': 34
			'medium': 64
			'large': 126
			'extralarge': 300

		filterSimilarImages: ( data )->
			@filterImages( data, @similarImageSizes )


		filterSimilar: ( data )->
			rawImages = jpath( data, '.image' )

			artist: jpath( data, '.artist.name' )
			title: jpath( data, '.name' )
			images: @filterSimilarImages( rawImages )


