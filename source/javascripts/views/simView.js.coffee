
class @SimView extends Backbone.View
	tpl: compileTemplate('#item-sim-tpl')

	initialize: ()->
		l 'SimView.initialize', arguments

		@delegateEvents(
			'click .SimPlayB' : @play
		)

		@render()

	render: ()=>
		l 'SimView.render', arguments

		@$el.html(@tpl(@model.attributes))


	renderSelect: ()=>

	play: ()=>
		l 'SimView.play', arguments
		@model.getAudioUrl()


	showWiki: ()=>

	addToAudio: ()=>

	addToWall: ()=>
