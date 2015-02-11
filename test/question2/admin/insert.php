<?php
include('conn.php');
mysql_select_db("question", $conn);

$answer = $_POST['answer'];
$result = $_POST['result'];

$regdate = time();	
$sql = "INSERT INTO ask2(ask_answer, ask_result, ask_time)VALUES('$answer', '$result', $regdate)";

if(!mysql_query($sql,$conn)){
    echo  json_encode(array('success' => 0
//		, 
//		'error' => mysql_error(), 
//		'userdata' => $answer.'*'.$result
		
	));
} else {
    echo json_encode(array('success' => 1));
}
?>