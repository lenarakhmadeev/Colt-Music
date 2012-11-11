// tpl.js plugin for requirejs / text.js
// it loads and compiles underscore templates
define(['_'], function (_) {

    var loadResource = function (resourceName, parentRequire, callback, config) {
        parentRequire([("text!" + resourceName)],
            function (templateContent) {
                var template = _.template(templateContent);
                callback(template);
            }
        );
    };

    return {
        load: loadResource
    };

});