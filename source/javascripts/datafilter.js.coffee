

keyOrPluck = (data, key)->
	# переделать
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

@dataFilter =
	info: (data)->
		album: keypath(data, 'track.album.title')
		album_cover: keypath(data, 'track.album.image.1.#text')
		tags: filterTags(data)
		wiki: keypath(data, 'track.wiki') # todo посмотреть подробнее

	similar: (data)->
		l 'dataFilter.similar', arguments

		temp = keypath(data, 'similartracks.track')
		if _.isString(temp)
			return []

		tracks = if _.isArray(temp) then temp else [temp]

		_.map(tracks, filterSim)

	searchAudio: (data)->
		l 'dataFilter.searchAudio', arguments

		keypath(data, 'response').slice(1)



	getAudio: (data)->
		l 'dataFilter.getAudio', arguments

		data.response

