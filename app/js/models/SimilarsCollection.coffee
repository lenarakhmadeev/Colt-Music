
define [
	'models/Collection'
	'services/proxy/proxy'
	'models/SimilarModel'
	
], ( Collection, proxy, SimilarModel )->

	class SimilarsCollection extends Collection

		model: SimilarModel

		initialize: (models, options)->
			@on( 'reset add', @makeModelsIds, this )


		setDesignation: ( @artist, @title )->


		count: 2
		offset: 0
		wait: false

		getMoreSimilars: ()=>
			# todo если ошибка
			return if @wait

			@wait = true
			@own.set( 'status', 'loading' )

			proxy.getSimilarTracks( @artist, @title, @offset, @count )
				.done ( data )=>
					@offset += @count
					@wait = false

					# todo переделать
					if data.length < @count
						@own.set( 'status', 'no' )
					else
						@own.set( 'status', 'yes' )


					@add( data )

				.fail ()=>
					@own.set( 'status', 'no' )


		first_geted: false

		getFirstSimilars: ()->
			return if @first_geted

			@first_geted = true
			@getMoreSimilars()


		makeModelsIds: ()->
			id = 1
			for model in @models
				model.set( 'id', id )
				id++


