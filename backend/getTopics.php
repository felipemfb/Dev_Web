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

$courseId = $_POST['course'] ?? null;
if (!$courseId) {
    echo json_encode([
        "status" => "error",
        "data" => "missing course id"
    ]);
    exit;
}


try {
    $stmt = $PDO->prepare("
        SELECT 
            t.id,
            t.nom AS title,
            COALESCE(p.nb_posts, 0) AS num_posts,
            COALESCE(p.last_message, t.date) AS last_message
        FROM topics t
        LEFT JOIN (
            SELECT 
                id_topic,
                COUNT(*) AS nb_posts,
                MAX(time) AS last_message
            FROM posts
            GROUP BY id_topic
        ) p ON p.id_topic = t.id
        WHERE t.id_cours = ?
        ORDER BY last_message DESC;
    ");

    $stmt->execute([$courseId]);
    $topics = $stmt->fetchAll();
    echo json_encode([
        "status" => "ok",
        "data" => $topics
    ]);

} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "data" => $e->getMessage()
    ]);
}