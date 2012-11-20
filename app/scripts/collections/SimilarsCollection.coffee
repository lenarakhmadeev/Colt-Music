
define ( require )->
	_ = require( '_' )
	Collection = require( 'collections/Collection' )
	proxy = require( 'services/proxy/proxy' )
	SimilarModel = require( 'models/SimilarModel' )


	class SimilarsCollection extends Collection

		model: SimilarModel

		initialize: ( models, options )->


		# Сохраняем родительский элемент
		# для навигации по списку и доступа к аттрибутам родителя
		setParent: ( @parent )->


		count: 2
		offset: 0
		getMoreSimilars: ()->
			@setStatus( 'loading' )

			proxy.getSimilarTracks( @getArtist(), @getTitle(), @offset, @count )
				.done ( data )=>
					@offset += @count

					status = if data.length < @count then 'no' else 'yes'
					@setStatus( status )

					_.each( data, @addRaw, this )

				.fail ()=>
					@setStatus( 'no' )

				.always ()=>
					@trigger( 'updated' )


		addRaw: ( data )->
			data.info =
				images: data.images

			delete data.images

			@add( data )


		getArtist: ()->
			@parent.get( 'artist' )


		getTitle: ()->
			@parent.get( 'title' )


		setStatus: ( status )->
			@own.set( 'status', status )


		first_geted: false
		getFirstSimilars: ()->
			return if @first_geted

			@first_geted = true
			@getMoreSimilars()


