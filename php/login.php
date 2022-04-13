<?php

$servername = "matthewsand.info";
$databaseUsername = "matthfzp_login";
$databasePassword = "CQapJYoY.9";
$databaseName = "matthfzp_asyncGame";

if(isset($_POST['username'])) {
    $username = $_POST['username'];
}
else {
    echo "Invalid username";
}

if(isset($_POST['password'])) {
    $password = $_POST['password'];
}
else {
    echo "Invalid password";
}


$mysql = new mysqli($servername, $databaseUsername, $databasePassword, $databaseName);

// Checks if the connection was successful
if ($mysql->connect_error) {
    die("Connection failed: " . $mysql->connect_error);
}
