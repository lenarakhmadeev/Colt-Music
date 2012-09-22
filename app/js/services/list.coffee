
define [
	'services/mediator'

], ( mediator )->

	'use strict'

	# Логика перехода к следующей/предыдущей записи в списке
	list =

		# Запуск модуля
		init: ()->
			mediator.subscribe( 'list:next', @next, this )
			mediator.subscribe( 'list:prev', @prev, this )
			mediator.subscribe( 'list:current', @setCurrent, this )


		# Проигрывание следующей записи
		next: ()->
			if @currentTrack.get( 'type' ) == 'item'
				next = @nextForItem()
			else
				return if @currentTrack == @currentTrack.collection.last() and
					@currentTrack.collection.parent == @currentTrack.collection.parent.collection.last()
				next = @nextForSim()

			next.play()


		nextForItem: ()->
			if @currentTrack.similarsCollection.length
				next = @currentTrack.similarsCollection.at( 0 )
			else
				next = @nextInCollection( @currentTrack )
				@checkLast( @currentTrack )

			next

		nextForSim: ()->
			if @currentTrack == @currentTrack.collection.last()
				next = @nextInCollection( @currentTrack.collection.parent )
				@checkLast( @currentTrack.collection.parent )
			else
				next = @nextInCollection( @currentTrack )

			next


		nextInCollection: ( track )->
			id = track.id + 1
			track.collection.get( id )


		checkLast: ( track )->
			if track.collection.isLastInPage( track )
				track.collection.nextPage()


		# Проигрывание предыдущей записи
		prev: ()->
			if @currentTrack.get( 'type' ) == 'item'
				return if @currentTrack == @currentTrack.collection.first()
				prev = @prevForItem()
			else
				prev = @prevForSim()

			prev.play()


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
			if @currentTrack?
				@currentTrack.select( false )

			@currentTrack = track
			@currentTrack.select( true )
