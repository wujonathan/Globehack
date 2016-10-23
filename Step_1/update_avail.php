<?php
/*Adds a comment to the database after getting the post variables from the ajax request.*/
header("Content-Type: application/json");
require 'database.php';
require 'user_agent_test.php';

$beds_avail=$_POST['beds_avail'];
$food_avail=$_POST['food_avail'];
$user_id=$_POST['user_id'];

$stmt = $mysqli->prepare("UPDATE beds SET available=? WHERE shelter_id=?");
if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
	exit;
}
$stmt->bind_param('ii',$beds_avail, $user_id);
$stmt->execute();
$stmt->close();

$stmt = $mysqli->prepare("UPDATE food SET available=? WHERE shelter_id=?");
if(!$stmt){
	echo json_encode(array(
		"success" => false,
		"message" => $mysqli->error
		));
	exit;
}
$stmt->bind_param('ii', $food_avail, $user_id);
$stmt->execute();
$stmt->close();

echo json_encode(array(	     	        
	"success" => true
	));				
exit;

?>