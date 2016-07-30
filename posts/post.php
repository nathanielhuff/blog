<?php
// http://nathanielhuff.com/blog/posts/post.php?id=18&title=this-is-the-post-title
// http://nathanielhuff.com/blog/posts/18/this-is-the-post-title

define("API_ENDPOINT",'http://www.nathanielhuff.com/wordpress/wp-json/');

$valid = false;
$postNotFound = true;
$invalidStatus = true;

if(isset($_GET) && isset($_GET['id']) && isset($_GET['title'])) {
	// Validate the URL parameters
	$id = $_GET['id'];
	$title = $_GET['title'];
	if(is_int(intval($id)) && (preg_match('([A-Za-z0-9-]+)', $title) === 1)) {
		// Get the post from the API Endpoint
		$response = file_get_contents(
				API_ENDPOINT."posts/$id",
				false,
			    stream_context_create(array('http' => array('ignore_errors' => true)))
		   	);
		$json = json_decode($response,true);
		if($json) {
			$valid = true;
			if(!isset($json[0]['code'])) {
				$postNotFound = false;
				// status : publish
				// type : post
				if($json['status'] === 'publish' && $json['type'] === 'post') {
					$invalidStatus = false;
				}
			}
		}
	}
}

// echo ($valid) ? 'true' : 'false';
// echo ($postNotFound) ? 'true' : 'false';
// echo ($invalidStatus) ? 'true' : 'false';

if($valid === false) header('Location: http://nathanielhuff.com/');
else if($postNotFound) exit("Sorry, the post you're looking for doesn't exist.");
else if($invalidStatus) {
	echo "This is not a published post. You will be redirected to my homepage.";
	header("Refresh:3; URL=http://nathanielhuff.com/");
}

?>

<!DOCTYPE html>
<html lang="en-US">
<head>
    <!-- Meta + Title -->
    <meta charset="UTF-8">
    <title>Nathaniel Huff &middot; <?php echo $json['title']; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="description" content="<?php echo $json['excerpt']; ?>">
    <meta name="author" content="Nathaniel Huff">
    <meta name="robots" content="noodp">
    <!-- Open Graph -->
    <meta property="og:locale" content="en_US">
    <meta property="og:type" content="article">
    <meta property="og:title" content="Nathaniel Huff &middot; <?php echo $json['title']; ?>">
    <meta property="og:description" content="<?php echo $json['excerpt']; ?>">
    <meta property="og:url" content="<?php echo "http://nathanielhuff.com/blog/posts/".$json['ID']."/".$json['slug']; ?>">
    <meta property="og:site_name" content="Nathaniel Huff &middot; <?php echo $json['title']; ?>">
    <meta property="og:image" content="<?php echo ($json['featured_image'] && $json['featured_image']['source']) ? $json['featured_image']['source'] : 'http://nathanielhuff.com/blog/img/og-edit.jpg'; ?>">
    <!-- Links -->
    <link rel="canonical" href="<?php echo "http://nathanielhuff.com/blog/posts/".$json['ID']."/".$json['slug']; ?>">
    <!-- Font CSS -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,400italic,700|Lato:400,900,400italic|Merriweather:400,400italic,700" type="text/css">
    <!-- Extenal CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" type="text/css">
    <!-- Internal CSS -->
    <link rel="stylesheet" href="../../socialfont/font.css" type="text/css">
    <link rel="stylesheet" href="../../css/main.css" type="text/css">
    <link rel="stylesheet" href="../../css/post.css" type="text/css">
    <!-- Head CSS -->
	<style>
		[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
		 	display: none !important;
		}
	</style>
    <!-- Head JS -->
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.8/angular-sanitize.min.js"></script>
    <!--[if lt IE 9 ]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body data-ng-app="post">
    <section class="wrapper">
        <header class="cf">
            <a class="cutout" href="http://nathanielhuff.com/blog" target="self" title="Blog Home"></a>
            <div class="heading-wrapper">
                <span class="bar"></span>
                <h1 class="heading">Nathaniel Huff</h1>
                <h4 class="subheading">Musings on web development, <br class="small">adventures, and life.</h4>
            </div>
        </header>
        <nav class="cf">
			<div class="hex-wrap hex-wrap-lg">
				<a class="hexagon hexagon-lg" href="http://nathanielhuff.com/" title="My website homepage." target="_blank">
					<span class="text">Home</span>
				</a>
			</div>
			<div class="hex-wrap hex-wrap-lg">
				<a class="hexagon hexagon-lg" href="http://nathanielhuff.com/blog" title="My blog posts." target="_self">
					<span class="text">Posts</span>
				</a>
			</div>
			<div class="hex-wrap hex-wrap-sm">
				<a class="hexagon hexagon-sm" href="https://www.linkedin.com/pub/nathaniel-huff/26/166/764" title="My Linkedin account." target="_blank">
					<span class="symbol">&#xe052;</span>
				</a>
			</div>
			<div class="hex-wrap hex-wrap-sm">
				<a class="hexagon hexagon-sm" href="https://github.com/nathanielhuff" title="My GitHub account." target="_blank">
					<span class="symbol">&#xe037;</span>
				</a>
			</div>
			<div class="hex-wrap hex-wrap-sm">
				<a class="hexagon hexagon-sm" href="https://twitter.com/@cdxchuff" title="My Twitter feed." target="_blank">
					<span class="symbol">&#xe086;</span>
				</a>
			</div>
			<div class="hex-wrap hex-wrap-sm">
				<a class="hexagon hexagon-sm" href="https://instagram.com/nathaniel_huff/" title="My Instagram posts." target="_blank">
					<span class="symbol">&#xe100;</span>
				</a>
			</div>
		</nav>
        <main class="post" data-ng-controller="PostController as post" data-ng-cloak>
			<!-- Post Content Here -->
			<h1 class="heading">{{ post.post.title }}</h1>
			<h3 class="subheading">{{ post.post.date }} &middot; {{ post.post.time }}</h3>
			<div class="content" data-ng-bind-html="post.post.content | trustAsHtml"></div>
        </main>
        <footer>
            <img class="logo" src="../../img/logo-100x100-grayscale.png" alt="My logo in grayscale.">
            <p class="copyright">&copy; 2016 Nathaniel Huff</p>
        </footer>
    </section>
    <!-- Body JS -->
    <script><?php echo "var POST_JSON = ".json_encode($json).";"; ?></script>
    <script type="text/javascript" src="../../js/post.js"></script>
    <script type="text/javascript" src="../../js/prism.js"></script>
</body>
</html>

