
define [
	'jquery'
	'views/View'

], ( $, View )->

	'use strict'

	class MarqueeView extends View

		initialize: ( options )->
			@model.on( 'change:current', @render, this )


		_render: ()->
			@$el.html( @getLine() )


		getLine: ()->
			current = @model.get( 'current' )

			return '' if not current?

			time = @convertTime( current.audio.duration )
			"#{ time } #{ current.artist } - #{ current.title }"


		convertTime: ( totalSec, separator = ':' )->
			hours = parseInt( totalSec / 3600 )
			minutes = parseInt( totalSec / 60 ) % 60
			seconds = totalSec % 60

			r = []

			if hours > 0
				r.push( hours )
				r.push( @formatTime( minutes ) )
				r.push( @formatTime( seconds ) )
			else
				if minutes > 0
					r.push( minutes )
					r.push( @formatTime( seconds ) )
				else
					r.push( seconds )

			r.join( separator )


		formatTime: ( time )->
			if time < 10 then '0' + time else time


