// main.js
(function(window, angular, undefined) {

  // instantiation

  var appName = 'blog';

  angular
    .module(appName, ['ngSanitize', 'Scope.safeApply']);

  // services

  function AjaxService ($http, $q) {
    var cache = {};

    return {
      delete: function (url) {
        return $http.delete(url).then(function(result) {
          return result.data;
        });
      },
      get: function (url, cacheIt) {
        var deferred;
        var cached;

        if (cacheIt) {
          cached = cache[url];
        }

        if (cached && cached.length) {
          /* return the cached results as a promise - so front-end can still call .then() */
          deferred = $q.defer();
          deferred.resolve(cached);
          return deferred.promise;
        } else {
          /* fire an ajax call and cache the results before returning them */
          return $http.get(url).then(function(result) {
            if (cacheIt) {
              cache[url] = result.data;
            }
            return result.data;
          });
        }
      },
      post: function (url, data) {
        return $http.post(url, data).then(function(result) {
          return result.data;
        });
      },
      put: function (url, data) {
        return $http.put(url, data).then(function(result) {
          return result.data;
        });
      },
      reject: function (data) {
        /*
          Be nice to future callbacks... if we "catch" an error, we need to "rethrow" it.
          See https://docs.angularjs.org/api/ng/service/$q#reject
        */
        return $q.reject(data);
      }
    };
  }

  angular
    .module(appName)
    .service('AjaxService', ['$http', '$q', AjaxService]);

  // filters

  angular
    .module(appName)
    .filter('trustAsHtml', function ($sce) { return $sce.trustAsHtml; });

  // controllers

  function BlogController (AjaxService, $document, $filter, $scope) {
    var _this = this;
    var endpoint = 'http://www.nathanielhuff.com/wordpress/wp-json/';

    _this.previews = [];

    function getPosts () {
      var posts;

      // /posts?filter[posts_per_page]=3
      AjaxService
        .get(endpoint + 'posts/?filter[posts_per_page]=3')
        .then(function (data) {
          posts = data;

          for (var i=0,ii=posts.length, p, d; i<ii; ++i) {
            p = posts[i];
            d = new Date(p.date);

            var preview = p.excerpt.slice(0,-10).trim();
            preview = (preview.charAt(preview.length - 1).match(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g)) ? preview.slice(0, -1) + '&hellip;' : preview + '&hellip;';

            _this.previews.push({
              id: p.ID,
              slug: p.slug,
              title: p.title,
              date: $filter('date')(d, 'fullDate'),
              time: $filter('date')(d, 'shortTime'),
              preview: preview
            });
          }
          $scope.$safeApply();

        },function (data) {
          // error
          console.log(data);
        });
    }

    $document.ready(function () {
      getPosts();
    });
  }

  angular
    .module(appName)
    .controller('BlogController', ['AjaxService', '$document', '$filter', '$scope', BlogController]);

})(window, window.angular);
