<?php
// http://nathanielhuff.com/posts/post.php?id=18&title=this-is-the-post-title
// http://nathanielhuff.com/posts/18/this-is-the-post-title

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