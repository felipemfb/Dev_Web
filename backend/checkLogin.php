<?php
session_start();
require_once "helper.php";
require_once "mysqlConnect.php";
$user = authenticate($PDO);

if (!$user){
    sendError("Incorrect data entered");
}

$_SESSION["authenticated"] = true;
$_SESSION["login"] = $_POST["login"];
$_SESSION["user_id"] = $user["id"];
sendMessage("ok");