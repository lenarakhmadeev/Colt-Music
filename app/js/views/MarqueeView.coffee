
define [
	'jquery'
	'views/View'

], ($, View)->

	class MarqueeView extends View

		initialize: ()->
			@model.on( 'change:artist', @render, this )


		_render: ()->
			@$el.html( @getLine() )


		getLine: ()->
			artist = @model.get( 'artist' )
			title = @model.get( 'title' )
			duration = @model.get( 'duration' )

			"#{ duration } #{ artist } - #{ title }"


