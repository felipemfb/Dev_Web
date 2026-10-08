<?php
session_start();
require_once "helper.php";
require_once "mysqlConnect.php";
header("Access-Control-Allow-Origin: http://127.0.0.1:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION['user_id']) || !isset($_SESSION['authenticated'])) {
    echo json_encode([
        "status" => "error",
        "data" => ["reason" => "not authenticated"]
    ]);
    exit;
}

$userId = $_SESSION['user_id'];
try {
    $stmt = $PDO->prepare("
        SELECT
            c.id,
            c.nom,
            COALESCE(t.nb_topics, 0) AS nb_topics,
            COALESCE(p.nb_posts, 0) AS nb_posts,
            p.last_message
        FROM participate pa
        INNER JOIN course c
            ON c.id = pa.id_cours
        LEFT JOIN (
            SELECT
                id_cours,
                COUNT(*) AS nb_topics
            FROM topics
            GROUP BY id_cours
        ) t
            ON t.id_cours = c.id
        LEFT JOIN (
            SELECT
                id_cours,
                COUNT(*) AS nb_posts,
                MAX(time) AS last_message
            FROM posts
            GROUP BY id_cours
        ) p
            ON p.id_cours = c.id
        WHERE pa.id_user = ?
        ORDER BY c.nom
    ");

    $stmt->execute([$userId]);
    $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode([
        "status" => "ok",
        "data" => $courses
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "data" => ["reason" => $e->getMessage()]
    ]);
}