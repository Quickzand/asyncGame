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

if(isset($_POST['email'])) {
    $email = $_POST['email'];
}
else {
    echo "Invalid email";
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

$result = $mysql->query("CALL addUser('" . $username . "','" . $password . "','" . $email . "')");


$row = $result->fetch_assoc();
$msg = $row['MSG'];

$resultJson = array();

if($msg == "USER ADDED") {
    $resultJson['success'] = true;
}
else {
    $resultJson['success'] = false;
}

echo json_encode($resultJson);


