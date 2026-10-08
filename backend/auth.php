<?php
function authenticate($PDO){
    if (!isset($_POST["login"]) || !isset($_POST["password"])){
        return false;
    }

    $login = $_POST["login"];
    $password = $_POST["password"];
    $stmt = $PDO->prepare("SELECT id, password FROM user WHERE login = ?");
    $stmt->execute([$login]);
    $user = $stmt->fetch();

    if ($user && $password === $user["password"]) {
        return $user;
    }
    return false;
}


function isAuthenticated(){
    return isset($_SESSION["authenticated"]) && $_SESSION["authenticated"] === true;
}
