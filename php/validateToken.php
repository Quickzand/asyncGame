<?php
$servername = "localhost";
$databaseUsername = "matthfzp_login";
$databasePassword = "CQapJYoY.9";
$databaseName = "matthfzp_asyncGame";


$mysql = new mysqli($servername, $databaseUsername, $databasePassword, $databaseName);

$result = $mysql->query("CALL validateUserToken('".$_POST["token"]."')");



// Sets up output json
$resultJson = array();

// If result contains 'valid' for the first column, then the token is valid
if($result->fetch_assoc()["VALID"] != 'VALID') {
    $resultJson['success'] = false;
    echo json_encode($resultJson);
    exit();
}

$resultJson['success'] = true;
echo json_encode($resultJson);
?>