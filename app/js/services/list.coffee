
define [
	'services/mediator'

], ( mediator )->

	###
		Логика перехода к следующей/предыдущей записи в списке
	###
	list = 

		# Запуск модуля
		init: ()->
			mediator.subscribe( 'list:next', @next, this )
			mediator.subscribe( 'list:prev', @prev, this )
			mediator.subscribe( 'list:current', @setCurrent, this )


		# Проигрывание следующей записи
		next: ()->
			console.log 'next'

			next = if @currentTrack.get( 'type' ) == 'item'
				@nextForItem()
			else
				@nextForSim()

			next.play()


		nextForItem: ()->
			if @currentTrack.similarsCollection.length
				@currentTrack.similarsCollection.at( 0 )
			else
				@nextInCollection( @currentTrack )

		nextForSim: ()->
			if @currentTrack == @currentTrack.collection.last()
				@nextInCollection( @currentTrack.collection.parent )
			else
				@nextInCollection( @currentTrack )


		nextInCollection: ( track )->
			id = track.id + 1
			track.collection.get( id )

		# Проигрывание предыдущей записи
		prev: ()->
			console.log 'prev'

			prev = if @currentTrack.get( 'type' ) == 'item'
				@prevForItem()
			else
				@prevForSim()

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
