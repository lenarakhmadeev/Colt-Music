
define [
	'backbone'

], ( Backbone )->

	###
		Коммуникация между модулями посредствам вызовов и прослушивания событий
	###
	mediator =

		# Подписаться на событие
		subscribe: Backbone.Events.on

		# Отписаться от события
		unsubscribe: Backbone.Events.off

		# Запустить событие
		publish: ()->
			console.log 'publish', arguments

			Backbone.Events.trigger.apply( this, arguments )