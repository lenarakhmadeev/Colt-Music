
define [
	'backbone'
], (Backbone)->

	mediator = 
		subscribe: Backbone.Events.on
		unsubscribe: Backbone.Events.off
		publish: Backbone.Events.trigger