<?php
include('conn.php');

mysql_select_db("question", $conn);
$regdate = time();	
$sql = "INSERT INTO ask(ask_answer, ask_time)VALUES('asddd0dss', $regdate)";

if(!mysql_query($sql,$conn)){
    echo  json_encode(array('success' => 0));
} else {
    echo json_encode(array('success' => 1));
}
?>