
define [
	'services/mediator'

], ( mediator )->

	'use strict'

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
				next = @nextForItem()
			else
				return if track == track.collection.last() and
					track.collection.parent == track.collection.parent.collection.last()
				next = @nextForSim()

			next


		nextForItem: ()->
			if @currentTrack.similarsCollection.length
				next = @currentTrack.similarsCollection.at( 0 )
			else
				next = @nextInCollection( @currentTrack )
				@checkLastInPage( @currentTrack )

			next

		nextForSim: ()->
			if @currentTrack == @currentTrack.collection.last()
				next = @nextInCollection( @currentTrack.collection.parent )
				@checkLastInPage( @currentTrack.collection.parent )
			else
				next = @nextInCollection( @currentTrack )

			next


		nextInCollection: ( track )->
			id = track.id + 1
			track.collection.get( id )


		checkLastInPage: ( track )->
			if _.last( track.collection.own.get( 'content' ) ) == track

				# событие
				track.collection.nextPage()


		# Проигрывание предыдущей записи
		prev: ()->
			prev = @_prev( @currentTrack )
			prev.play() if prev?


		_prev: ( track )->
			if track.get( 'type' ) == 'item'
				return if track == track.collection.first()
				prev = @prevForItem()
			else
				prev = @prevForSim()

			prev


		prevForItem: ()->
			prevItem = @prevInCollection( @currentTrack )

			if prevItem.similarsCollection.length
				prevItem.similarsCollection.last()
			else
				prevItem


		prevForSim: ()->
			if @currentTrack == @currentTrack.collection.first()
				@currentTrack.collection.parent
			else
				@prevInCollection( @currentTrack )


		prevInCollection: ( track )->
			id = track.id - 1
			track.collection.get( id )


		# Устанавливает текущую запись
		setCurrent: ( track )->
			@currentTrack.setCurrent( false ) if @currentTrack?

			@currentTrack = track

			#@preloadNextSimilar( track )


		preloadNextSimilar: ( track )->
			nextNext = @_next( track )
			if nextNext? and nextNext.get( 'type' ) == 'similar'
				nextNext.getAudioUrl()
