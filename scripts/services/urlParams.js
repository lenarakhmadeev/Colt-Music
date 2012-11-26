
define(function(require) {
  var curr, location, pair, pairs, params, _i, _len;
  location = document.location.search.substr(1);
  pairs = location.split('&');
  params = {};
  for (_i = 0, _len = pairs.length; _i < _len; _i++) {
    pair = pairs[_i];
    curr = pair.split('=');
    params[curr[0]] = curr[1];
  }
  return params;
});
