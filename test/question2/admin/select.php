<?php
include('conn.php');

$sql = "SELECT * FROM ask2";
$result = mysql_query($sql);                //�õ���ѯ������ݼ�
$data =array();

//ѭ�������ݼ�ȡ������
while( $row = mysql_fetch_array($result) ){
	$dataItem = array('answer' => $row["ask_answer"], 'result' => $row["ask_result"], 'time' => date("Y-m-d", $row['ask_time']));
	$data[]= $dataItem;
}
$json = json_encode($data);
echo $json;
?>