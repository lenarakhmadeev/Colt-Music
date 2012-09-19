
define [
	'models/Collection'
	'services/proxy/proxy'
	'models/SimilarModel'
	
], ( Collection, proxy, SimilarModel )->

	class SimilarsCollection extends Collection

		model: SimilarModel

		initialize: ( models, options )->

		setParent: ( @parent )->


		count: 2
		offset: 0
		wait: false

		getMoreSimilars: ()->
			# todo если ошибка
			return if @wait

			@wait = true
			@setStatus( 'loading' )

			proxy.getSimilarTracks( @getArtist(), @getTitle(), @offset, @count )
				.done ( data )=>
					@offset += @count
					@wait = false

					# todo переделать
					if data.length < @count
						@setStatus( 'no' )
					else
						@setStatus( 'yes' )


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


