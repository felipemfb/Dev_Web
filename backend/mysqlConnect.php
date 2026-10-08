<?php
require_once 'config.php';

$dsn = "mysql:host=$mysqlHost;" .
       "dbname=$mysqlDatabase;" .
       "charset=$charset";

$opt = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false
];

$PDO = new PDO($dsn, $mysqlLogin, $mysqlPassword, $opt);
?>