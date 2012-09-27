
define [
	'jquery'
	'views/View'
	'jquery_marquee'

], ( $, View )->

	'use strict'

	class MarqueeView extends View

		className: 'mariquee'

		initialize: ( options )->
			@model.on( 'change:current', @render, this )


		_render: ()->
			@$el.marquee( @getLine(), 'low' )


		getLine: ()->
			current = @model.get( 'current' )
			return '' unless current?

			time = @convertTime( current.get( 'audio.duration' ) )
			"#{ time } #{ current.get( 'artist' ) } - #{ current.get( 'title' ) }"


		convertTime: ( totalSec, separator = ':' )->
			hours = parseInt( totalSec / 3600 )
			minutes = parseInt( totalSec / 60 ) % 60
			seconds = totalSec % 60

			result = []

			if hours > 0
				result.push( hours )
				result.push( @formatTime( minutes ) )
				result.push( @formatTime( seconds ) )
			else
				if minutes > 0
					result.push( minutes )
					result.push( @formatTime( seconds ) )
				else
					result.push( seconds )

			result.join( separator )


		formatTime: ( time )->
			if time < 10 then '0' + time else time


