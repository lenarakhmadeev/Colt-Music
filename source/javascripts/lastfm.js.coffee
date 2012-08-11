
class @LastFm

	constructor: (@api_key, @api_url)->


	callApi: (params)->
		$.ajax
			url: @api_url
			dataType: 'jsonp'
			data: params


	getInfo: (artist, title)->
		@callApi
			method: 'track.getInfo'
			autocorrect: 1
			api_key: @api_key
			artist: artist
			track: title
			format: 'json'


	getSimilar: (artist, title, limit)->
		@callApi
			method: 'track.getSimilar'
			autocorrect: 1
			api_key: @api_key
			artist: artist
			track: title
			limit: limit
			format: 'json'


	getTopTracks: (artist, page, limit)->
		@callApi
			method: 'artist.getTopTracks'
			autocorrect: 1
			api_key: @api_key
			artist: artist
			page: page
			limit: limit
			format: 'json'
