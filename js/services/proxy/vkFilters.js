
define(['underscore'], function(_) {
  'use strict';

  var audioItemFilter, vkFilters;
  audioItemFilter = function(data) {
    var result;
    result = _.pick(data, 'artist', 'title');
    result.audio = _.pick(data, 'aid', 'owner_id', 'url', 'duration');
    return result;
  };
  return vkFilters = {
    getAudio: function(data) {
      return _.map(data, audioItemFilter);
    },
    searchAudio: function(data) {
      return data.slice(1);
    }
  };
});
