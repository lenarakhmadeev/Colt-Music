
# todo : нормальная фильтрация по всем кейсам

keyOrPluck = (data, key)->
	if data == null
		return null

	if _.isArray(data)
		_.pluck(data, key)
	else
		data[key]


filterTags = (data)->
	tags = keypath(data, 'track.toptags.tag', {})
	keyOrPluck(tags, 'name') || null


filterSim = (data)->
	artist: keypath(data, 'artist.name')
	title: keypath(data, 'name')
	image: keypath(data, 'image.1.#text')


filterTop = (data)->
	artist: keypath(data, 'artist.name')
	title: keypath(data, 'name')
	image: keypath(data, 'image.1.#text')


infoFilter = (data)->
	album: keypath(data, 'track.album.title')
	album_cover: keypath(data, 'track.album.image.1.#text')
	tags: filterTags(data)
	wiki: keypath(data, 'track.wiki') # todo посмотреть подробнее


similarFilter =  (data)->
	temp = keypath(data, 'similartracks.track')
	if _.isString(temp)
		return []

	tracks = if _.isArray(temp) then temp else [temp]

	_.map(tracks, filterSim)


topTracksFilter = (data)->
	l arguments

	temp = keypath(data, 'toptracks.track')
	if _.isString(temp)
		return []

	tracks = if _.isArray(temp) then temp else [temp]

	_.map(tracks, filterTop)



class @ApiProxy

	# todo декоратор для кэша

	constructor: (@lastfmApi, @vkApi)->


	getInfo: (artist, title, callback)=>
		@lastfmApi.getInfo(artist, title)
		.done (data, textStatus, jqXHR)=>
			if keypath(data, 'error')?
				callback?(data.message)
			else
				callback?(null, infoFilter(data))

		.error (jqXHR, textStatus, message)->
			callback?(message)


	getSimilar: (artist, title, page, count, callback)=>
		@lastfmApi.getSimilar(artist, title, page * count)
		.done (data, textStatus, jqXHR)=>
			if keypath(data, 'error')?
				callback?(data.message)
			else
				result = similarFilter(data)
				callback?(null, result[(page - 1) * count..])

		.error (jqXHR, textStatus, message)->
			callback?(message)


	getTopTracks: (artist, page, count, callback)=>
		@lastfmApi.getTopTracks(artist, page, count)
		.done (data, textStatus, jqXHR)=>
			if keypath(data, 'error')?
				callback?(data.message)
			else
				callback?(null, topTracksFilter(data))

		.error (jqXHR, textStatus, message)->
			callback?(message)


	searchAudio: (artist, title, page, count, callback)=>
		params =
			q: "#{artist} - #{title}"
			sort: 2
			auto_complete: 1
			count: count

		request = @vkApi.api 'audio.search', params, ()->
			l arguments

	getAudio: (artist, title)=>

	addToWall: ()=>

	addToAudio: ()=>

	# todo delete, edit
	#


lastfmApi = new LastFm(api_key, api_url)

@_proxy = new ApiProxy(lastfmApi, VK)