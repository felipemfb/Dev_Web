<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type:application/json;charset=utf8');


/**
 * la fonction permettant d'envoyer un message JSON au frontend
 * @param $data
 */
function sendMessage ($data) {
  echo json_encode ([ 'status' => 'ok',
                      'data'   => $data ]);
  die;
}


/**
 * la fonction permettant d'envoyer un message d'erreur au frontend
 * @param $reason
 */
function sendError ($reason) {
  echo json_encode (['status' => 'error',
                     'data'   => ['reason' => $reason] ]);
  die;
}


// le script du backend permettant de réaliser l'authentification de l'utilisateur.
// Attention: ce script ne doit contenir qu'un session_start() suivi de déclarations
// de fonctions. Il ne doit pas exécuter d'autre code.
require_once 'auth.php';


// check qu'on est bien authentifié
if ( (basename($_SERVER['SCRIPT_NAME']) != 'checkLogin.php' )  && ! isAuthenticated() ) {
    sendError ('not authenticated');
}
  
?>
