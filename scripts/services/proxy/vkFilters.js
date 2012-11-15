
define(function(require) {
  var audioItemFilter, pickAudioData, vkFilters, _;
  _ = require('_');
  pickAudioData = function(data) {
    var result;
    result = _.pick(data, 'owner_id', 'url', 'duration');
    result.audio_id = data.aid;
    return result;
  };
  audioItemFilter = function(data) {
    var result;
    result = _.pick(data, 'artist', 'title');
    result.audio = pickAudioData(data);
    return result;
  };
  return vkFilters = {
    getAudio: function(data) {
      return _.map(data, audioItemFilter);
    },
    searchAudio: function(data) {
      return _.map(data.slice(1), pickAudioData);
    },
    audioUrl: function(data) {
      return data[0];
    }
  };
});
