<?php

$servername = "localhost";
$databaseUsername = "matthfzp_login";
$databasePassword = "CQapJYoY.9";
$databaseName = "matthfzp_asyncGame";

if(isset($_POST['username'])) {
    $username = $_POST['username'];
}
else {
    echo "Invalid username";
    exit();
}

if(isset($_POST['password'])) {
    $password = $_POST['password'];
}
else {
    echo "Invalid password";
    exit();
}


$mysql = new mysqli($servername, $databaseUsername, $databasePassword, $databaseName);

if ($mysql->connect_error) {
    die("Connection failed: " . $mysql->connect_error);
}

$result = $mysql->query("CALL loginUser('" . $username . "','" . $password . "')");


// retreives token returned from query
$row = $result->fetch_assoc();
$token = $row['TOKEN'];

$resultJson = array();

// Checks if the token is valid by checking for spaces
if(strpos($token, ' ') !== false) {
    $resultJson['success'] = false;
    echo json_encode($resultJson);
    exit();
}

// Puts token into json format 
$resultJson['success'] = true;
$resultJson['token'] = $token;
echo json_encode ($resultJson);
