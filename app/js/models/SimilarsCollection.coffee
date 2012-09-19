
define [
	'models/Collection'
	'services/proxy/proxy'
	'models/SimilarModel'
	
], ( Collection, proxy, SimilarModel )->

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

					@add( data )

				.fail ()=>
					@setStatus( 'no' )


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


