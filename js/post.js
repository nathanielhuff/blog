// post.js

// main.js
(function(window, angular, undefined) {

	// instantiation

  var appName = 'post';

  angular
    .module(appName, ['ngSanitize']);

  // filters

  angular
    .module(appName)
    .filter('trustAsHtml', function ($sce) { return $sce.trustAsHtml; });

  // controllers

  function PostController ($filter) {
    if (!POST_JSON) return;

    _this = this;

    var d = POST_JSON.date;

    _this.post = {
      id: POST_JSON.ID,
      slug: POST_JSON.slug,
      title: POST_JSON.title,
      date: $filter('date')(d, 'fullDate'),
      time: $filter('date')(d, 'shortTime'),
      content: POST_JSON.content
    };
  }

  angular
    .module(appName)
    .controller('PostController', ['$filter', PostController]);

})(window, window.angular);