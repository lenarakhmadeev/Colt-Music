
define [
	'mediator'

], (mediator)->

	list = 

		init: ()->
			mediator.subscribe( 'list:next', @next, this )
			mediator.subscribe( 'list:prev', @prev, this )
			mediator.subscribe( 'list:current', @current, this )


		next: ()->
			console.log 'next'

			nextId = @currentTrack.id + 1
			next = @currentTrack.collection.get( nextId )

			mediator.publish( 'player:play', next )
			@current( next )


		nextItem: ()->


		nextSim: ()->



		prev: ()->
			console.log 'prev'


		current: (model)->
			if @currentTrack?
				@currentTrack.select(false)

			@currentTrack = model
			@currentTrack.select(true)
