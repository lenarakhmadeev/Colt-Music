
define ( require )->
	mediator = require( 'services/mediator' )
	_ = require( '_' )


	# Логика установки текущей записи, перехода к следующей/предыдущей в списке
	flow =

		# Запуск модуля
		init: ()->
			mediator.subscribe( 'flow:next', @next, this )
			mediator.subscribe( 'flow:prev', @prev, this )
			mediator.subscribe( 'flow:current', @setCurrent, this )


		# Проигрывание следующей записи
		next: ()->
			next = @_next( @currentTrack )
			next.play() if next?


		_next: ( track )->
			if track.get( 'type' ) == 'item'
				@nextForItem( track )
			else
				@nextForSim( track )


		nextForItem: ( track )->
			if track.similarsCollection.length
				track.similarsCollection.at( 0 )
			else
				@nextInCollection( track )


		nextForSim: ( track )->
			parentItem = track.collection.parent
			if @isLast( track )
				# Последняя рекомендация последней записи
				return if @isLast( parentItem )

				@nextInCollection( parentItem )
			else
				@nextInCollection( track )


		nextInCollection: ( track )->
			id = track.id + 1
			track.collection.get( id )


		# Проигрывание предыдущей записи
		prev: ()->
			prev = @_prev( @currentTrack )
			prev.play() if prev?


		_prev: ( track )->
			if track.get( 'type' ) == 'item'
				@prevForItem( track )
			else
				@prevForSim( track )


		prevForItem: ( track )->
			return if @isFirst( track )

			prevItem = @prevInCollection( track )

			if prevItem.similarsCollection.length
				prevItem.similarsCollection.last()
			else
				prevItem


		prevForSim: ( track )->
			if @isFirst( track )
				track.collection.parent
			else
				@prevInCollection( track )


		prevInCollection: ( track )->
			id = track.id - 1
			track.collection.get( id )


		isLast: ( track )->
			track == track.collection.last()


		isFirst: ( track )->
			track == track.collection.first()


		loadTrackPage: ( track )->
			if track.get( 'type' ) == 'similar'
				track = track.collection.parent

			mediator.publish( 'list:load_page', @getItemPage( track ) )


		getItemPage: ( item )->
			pageSize = item.collection.pageSize
			indx = item.id

			Math.floor(indx / pageSize)


		# Устанавливает текущую запись
		setCurrent: ( track )->
			@currentTrack.setCurrent( false ) if @currentTrack?
			@currentTrack = track
			@loadTrackPage( track )
			@preloadNextSimilar( track )


		# Подгружает audio_url для след similar
		preloadNextSimilar: ( track )->
			nextNext = @_next( track )
			if nextNext? and nextNext.get( 'type' ) == 'similar'
				nextNext.getAudioUrl()
