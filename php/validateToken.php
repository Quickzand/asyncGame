<?php
$servername = "localhost";
$databaseUsername = "matthfzp_login";
$databasePassword = "CQapJYoY.9";
$databaseName = "matthfzp_asyncGame";


$mysql = new mysqli($servername, $databaseUsername, $databasePassword, $databaseName);

$stmt = $mysql->prepare("CALL validateUserToken('".$_POST["token"]."')");
$stmt->execute();
$result = $stmt->get_result();

// Sets up output json
$resultJson = array();



// If result is empty, token is invalid
if($result->num_rows == 0) {
    $resultJson['success'] = false;
    echo json_encode($resultJson);
    exit();
}

$resultJson['success'] = true;
echo json_encode($resultJson);
?>