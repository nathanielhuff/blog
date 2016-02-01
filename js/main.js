// main.js
(function(window, angular, undefined) {

  // instantiation

  var appName = 'blog';

  angular
    .module(appName, ['ngSanitize']);

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
      /*AjaxService
        .get(endpoint + 'posts/?filter[posts_per_page]=3')
        .then(function (data) {
          // success
          console.log(data)
        },function (data) {
          // error
          console.log(data);
        });*/
      
      // mock Ajax call for now
      posts = [{"ID":29,"title":"Years Later, A Lesson In Not Giving Up","status":"publish","type":"post","author":{"ID":1,"username":"nhuff","name":"Nathan","first_name":"Nathaniel","last_name":"Huff","nickname":"Nathan","slug":"nhuff","URL":"","avatar":"http:\/\/0.gravatar.com\/avatar\/6fd2594c28dbf29ec5233e3ebe19be1d?s=96","description":"","registered":"2014-11-05T22:15:49+00:00","meta":{"links":{"self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1","archives":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1\/posts"}}},"content":"<p><b>Hearing my dad&#8217;s voice on the last lap still gives me chills.<\/b><\/p>\r\n\r\n<p>There&#8217;s something about my dad cheering for me in this race that gets to me like nothing else.<\/p>\r\n\r\n<p>Six years later, this video, and the memories I have of the race, motivate me like few other memories. To me, this race is special. It&#8217;s an achievement that I draw on that no one can take away from me.<\/p>\r\n\r\n<p><b>Here&#8217;s the video for context.<\/b> You&#8217;ll probably want to mute it as I set <a href=\"https:\/\/twitter.com\/@abrband\" target=\"_blank\">August Burns Red<\/a>&#8216;s <a href=\"https:\/\/youtu.be\/JLI41hJ8MxM\" target=\"_blank\"><i>Redemption<\/i><\/a> as the background music. If that song doesn&#8217;t move you, you don&#8217;t have a soul.<\/p>\r\n\r\n<p style=\"text-align:center;\">\r\n<iframe width=\"420\" height=\"315\" src=\"https:\/\/www.youtube.com\/embed\/AMfW6N1yS5I?feature=oembed\" frameborder=\"0\" allowfullscreen><\/iframe>\r\n<\/p>\r\n<h2>Give It Your All And Never Give Up<\/h2>\r\n\r\n<p>This is a post about the merit of never giving up.<\/p>\r\n\r\n<img class=\"center\" src=\"http:\/\/www.nathanielhuff.com\/wordpress\/wp-content\/uploads\/2015\/05\/districts1.jpg\"><\/img>\r\n\r\n<p>If you look at this race on the surface, you might be quick to ask, &#8220;Why does a post about not giving up feature you getting 6th place?&#8221; 6th place in this race means more to me than most, if not all, of the first place finishes I&#8217;ve had, and it takes some background to illustrate just why this race is such a lesson.<\/p>\r\n\r\n<p>I&#8217;ll start off by saying something obvious: I was never meant to be great at running. I never had a lot of natural ability, and I never really had any raw footspeed or athleticism. So to earn any medal&#8230; to compete at the District level&#8230; this was a big deal for me. I had to work twice as hard as the talented just to qualify for this race. To be there&#8230; that alone was an accomplishment.<\/p>\r\n\r\n<img class=\"center\" src=\"http:\/\/www.nathanielhuff.com\/wordpress\/wp-content\/uploads\/2015\/05\/districts4.jpg\"><\/img>\r\n\r\n<p>My goal of my entire high school track experience was to qualify for the State Championships. This was a goal of mine that had been in the back of my mind since I was 14 years old. To qualify for States in the 3200m, I knew that I had to place in the top five. Everything I had ever worked for for this goal came down to one race. A long-held amibition reduced to less than 10 minutes.<\/p>\r\n\r\n<p>If you watched the video, you&#8217;ll note my position throughout the race (it begins just before the second half). I needed that 5th place spot. I wanted it. And I was going to give it all I had to get it. With one lap to go, it was me versus <a href=\"http:\/\/www.aueagles.com\/sports\/c-xc\/2013-14\/bios\/Pope_John00.html\" target=\"_blank\">John Pope<\/a> of Carlisle. You&#8217;ll see that he decidedly passes me with 300m to go, putting me in 6th place.<\/p>\r\n\r\n<p>I remembered where I was at that moment.<\/p>\r\n\r\n<p>I remembered how I dug up every last bit of energy I had left to try to pass him and put myself back in 5th place.<\/p>\r\n\r\n<p><b>But I <i>failed<\/i>.<\/b><\/p>\r\n\r\n<p>John passed me back on the final turn, and I was already maxed out. I had nothing left. I failed my dream, and came in 6th. Game over. Season over. My dream gone.<\/p>\r\n\r\n<p><b>Not so fast.<\/b><\/p>\r\n\r\n<img class=\"center\" src=\"http:\/\/www.nathanielhuff.com\/wordpress\/wp-content\/uploads\/2015\/05\/districts2.jpg\"><\/img>\r\n\r\n<p>The rest of the story is that I did go to States. I qualfied for States because I was lucky. Carlisle&#8217;s 4x800m team contained two of the top five finishers in the District III 3200m that year. Because of the position of the 3200m and the 4x800m in the State Championship event schedule, these two runners opted out of running the 3200m at States.<\/p>\r\n\r\n<p>My dream was saved by fortune. But let&#8217;s look a little deeper&#8230;<\/p>\r\n\r\n<p>There&#8217;s a popular latin proverb, <i>Fortuna Audaces Iuvat<\/i>, meaning &#8220;fortune helps the bold.&#8221;<p>\r\n\r\n<blockquote>Fortuna Audaces Iuvat, meaning &lsquo;fortune helps the bold.&rsquo;<\/blockquote>\r\n\r\n<p>What if I hadn&#8217;t gave my extra effort to try to pass John Pope on the backstretch? What if I had just given in to my pain, and accepted defeat right then and there? Here&#8217;s the point: if I hadn&#8217;t tried to pass John back, I wouldn&#8217;t have gone to States.<\/p>\r\n\r\n<p>Watching the video closely, you&#8217;ll see that the two runners behind me, Colin McKenna of East Pennsboro and Michael Beegle of Gettysburg, almost pass me right before the finish line, because I faded badly, but I still beat them.<\/p>\r\n\r\n<img class=\"center\" src=\"http:\/\/www.nathanielhuff.com\/wordpress\/wp-content\/uploads\/2015\/05\/districts3.jpg\"><\/img>\r\n\r\n<p>Long after the race was over, I realized that my pass-back on the backstretch saved my goal after all.<\/p>\r\n\r\n<h2>The Takeaway<\/h2>\r\n\r\n<p><b><i>If I hadn&#8217;t tried to take back 5th place on the backstretch, the two runners behind me would&#8217;ve taken the extra qualifying spots.<\/i><\/b><\/p>\r\n\r\n<p>The lesson? Don&#8217;t give up. Don&#8217;t ever give up. Don&#8217;t give up in a race, don&#8217;t give up on your ambitions, don&#8217;t give up on life. <b><i>Even if you think you&#8217;ve failed, fortune may reward you for your boldness.<\/i><\/b> It did for me, and it happened because I didn&#8217;t give up <i>and in spite of perceived failure.<\/i><\/p>\r\n\r\n<p>Remember: Fortune favors the brave. I acheived my goal not just because I was lucky, but also because my <i>preparedness<\/i> and my never-give-up attitude met the <i>opportunity<\/i> luck had provided me.<\/p>","parent":null,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/years-later-a-lesson-in-not-giving-up\/","date":"2015-05-16T05:42:27","modified":"2015-05-16T06:33:41","format":"standard","slug":"years-later-a-lesson-in-not-giving-up","guid":"http:\/\/www.nathanielhuff.com\/wordpress\/?p=29","excerpt":"Hearing my dad&#8217;s voice on the last lap still gives me chills. There&#8217;s something about my dad cheering for me in this race that gets to me like nothing else. Six years later, this video, and the memories I have of the race, motivate me like few other memories. To me, this race is special. [&hellip;]","menu_order":0,"comment_status":"closed","ping_status":"closed","sticky":false,"date_tz":"UTC","date_gmt":"2015-05-16T05:42:27","modified_tz":"UTC","modified_gmt":"2015-05-16T06:33:41","meta":{"links":{"self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/29","author":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1","collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts","replies":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/29\/comments","version-history":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/29\/revisions"}},"featured_image":null,"terms":{"post_tag":[{"ID":9,"name":"lessons","slug":"lessons","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/lessons\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/9"}}},{"ID":8,"name":"motivation","slug":"motivation","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/motivation\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/8"}}},{"ID":7,"name":"running","slug":"running","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/running\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/7"}}}],"category":[{"ID":1,"name":"Uncategorized","slug":"uncategorized","description":"","taxonomy":"category","parent":null,"count":2,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/category\/uncategorized\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/category\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/category\/terms\/1"}}}]}},{"ID":18,"title":"Welcome to my site!","status":"publish","type":"post","author":{"ID":1,"username":"nhuff","name":"Nathan","first_name":"Nathaniel","last_name":"Huff","nickname":"Nathan","slug":"nhuff","URL":"","avatar":"http:\/\/0.gravatar.com\/avatar\/6fd2594c28dbf29ec5233e3ebe19be1d?s=96","description":"","registered":"2014-11-05T22:15:49+00:00","meta":{"links":{"self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1","archives":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1\/posts"}}},"content":"<p><b>So, I made a website.<\/b><\/p>\r\n\r\n<p>At the time of posting this, it&#8217;s about 80 percent complete. There a lot of features I&#8217;m missing, but the general outline is there, and I&#8217;m sure I&#8217;ll discover some bugs also. A website is like a car\u2014there&#8217;s always some kind of maintenance to be done.<\/p>\r\n\r\n<p>Besides the ones already credited, here are the technologies I&#8217;m using:<\/p>\r\n<ul>\r\n   <li>WordPress (as a CMS)<\/li>\r\n   <li>Font Awesome (for some icons)<\/li>\r\n   <li>Google Fonts<\/li>\r\n   <li>Modernizr<\/li>\r\n<\/ul>\r\n\r\n<p>I wrote a lot of the CSS and HTML myself and pulled it together with Angular. I still need to do some Apache configuration to ensure direct URLs and page refreshes are handled properly. So don&#8217;t try to go to <code>mysite.com\/blog<\/code> directly via the URL bar because you&#8217;ll get a 404 error. That will be fixed soon.<\/p>\r\n\r\n<p>I&#8217;m also using Prism so I can generate cool-looking code blocks. Here&#8217;s an example from my custom extension of the Javascript <code>Date()<\/code> prototype:<\/p>\r\n<pre><code class=\"language-javascript\">\/\/ Returns HH:MM in standard 12-hour format. Includes leading zeroes.\r\n\/\/ identifierFormat values are 'uppercase','lowercase', or 'single'.\r\nDate.prototype.fromMilitaryTime = function(identifierFormat) {\r\n\tidentifierFormat = (typeof identifierFormat !== 'undefined') \r\n\t\t? identifierFormat : 'uppercase';\r\n\tvar tsArr = this.toTimeString().split(' ')[0].split(':');\r\n\tvar time = '';\r\n\tvar identifier = '';\r\n\tif(tsArr[0] &gt; 12) { \r\n\t\ttime += ((tsArr[0] - 12) + ':' + tsArr[1]);\r\n\t\tidentifier = 'PM';\r\n\t} else if(tsArr[0] == 0) {\r\n\t\ttime += (12 + ':' + tsArr[1]);\r\n\t\tidentifier = 'AM';\r\n\t} else if(tsArr[0] == 12) {\r\n\t\ttime += (tsArr[0]+':'+tsArr[1]);\r\n\t\tidentifier = 'PM';\r\n\t} else {\r\n\t\ttime += (tsArr[0]+':'+tsArr[1]);\r\n\t\tidentifier = 'AM';\r\n\t}\r\n\tswitch(identifierFormat) {\r\n\t\tcase 'uppercase':\r\n\t\t\ttime += (' '+identifier);\r\n\t\t\tbreak;\r\n\t\tcase 'lowercase':\r\n\t\t\ttime += (' '+identifier.toLowerCase());\r\n\t\t\tbreak;\r\n\t\tcase 'single':\r\n\t\t\ttime += identifier.substr(0,1).toLowerCase();\r\n\t\t\tbreak;\r\n\t\tdefault:\r\n\t\t\t time += (' '+identifier);\r\n\t}\r\n\treturn time;\r\n}<\/code><\/pre>\r\n\r\n<p>All in all, I&#8217;m pretty excited. If you&#8217;re a potential employer or looking for someone with budding web development skills, feel free to reach out to me. I hope that this website is an introductory showcase to my abilities. <b>Thanks for reading!<\/b><\/p>","parent":null,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/welcome-to-my-site\/","date":"2014-12-04T22:08:25","modified":"2014-12-05T15:53:47","format":"standard","slug":"welcome-to-my-site","guid":"http:\/\/www.nathanielhuff.com\/wordpress\/?p=18","excerpt":"So, I made a website. At the time of posting this, it&#8217;s about 80 percent complete. There a lot of features I&#8217;m missing, but the general outline is there, and I&#8217;m sure I&#8217;ll discover some bugs also. A website is like a car\u2014there&#8217;s always some kind of maintenance to be done. Besides the ones already [&hellip;]","menu_order":0,"comment_status":"closed","ping_status":"closed","sticky":false,"date_tz":"UTC","date_gmt":"2014-12-04T22:08:25","modified_tz":"UTC","modified_gmt":"2014-12-05T15:53:47","meta":{"links":{"self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/18","author":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/users\/1","collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts","replies":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/18\/comments","version-history":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/posts\/18\/revisions"}},"featured_image":null,"terms":{"post_tag":[{"ID":3,"name":"blog","slug":"blog","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/blog\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/3"}}},{"ID":5,"name":"new","slug":"new","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/new\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/5"}}},{"ID":6,"name":"site","slug":"site","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/site\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/6"}}},{"ID":4,"name":"welcome","slug":"welcome","description":"","taxonomy":"post_tag","parent":null,"count":1,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/tag\/welcome\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/post_tag\/terms\/4"}}}],"category":[{"ID":1,"name":"Uncategorized","slug":"uncategorized","description":"","taxonomy":"category","parent":null,"count":2,"link":"http:\/\/www.nathanielhuff.com\/wordpress\/category\/uncategorized\/","meta":{"links":{"collection":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/category\/terms","self":"http:\/\/www.nathanielhuff.com\/wordpress\/wp-json\/taxonomies\/category\/terms\/1"}}}]}}];
      
      for(var i=0,ii=posts.length, p, d; i<ii; ++i) {
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
      $scope.$apply();
    }

    $document.ready(function () {
      getPosts();
    });
  }

  angular
    .module(appName)
    .controller('BlogController', ['AjaxService', '$document', '$filter', '$scope', BlogController]);

})(window, window.angular);