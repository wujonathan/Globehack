<?php
/*Fetches all of the information needed to generate all the markers and the content of those markers. Echos an array with picture information and comment arrays as entries*/
header("Content-Type: application/json");

require 'database.php';
require 'user_agent_test.php';

$session_usr = array();

if(!$_SESSION['user_id']){
	echo json_encode($session_usr);
}
else{
	$session_id = $_SESSION['user_id'];
	$status = array("userid" => htmlspecialchars($session_id));		
	array_push($session_usr, $status);
	echo json_encode($session_usr);
}

?>