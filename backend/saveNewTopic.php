<?php
session_start();
require_once "mysqlConnect.php";

header("Access-Control-Allow-Origin: http://127.0.0.1:4200");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=utf-8");

if (!isset($_SESSION['user_id'])) {
    echo json_encode([
        "status" => "error",
        "data" => ["reason" => "not authenticated"]
    ]);
    exit;
}

$subject = $_POST['subject'] ?? null;
$courseId = $_POST['course'] ?? null;
$userId = $_SESSION['user_id'];
if (!$subject || !$courseId) {
    echo json_encode([
        "status" => "error",
        "data" => ["reason" => "missing data"]
    ]);
    exit;
}

try {
    if (trim($subject) === "") {
        throw new Exception("empty subject");
    }

    $stmt = $PDO->prepare("
        SELECT COUNT(*) 
        FROM participate
        WHERE id_cours = ? AND id_user = ?
    ");
    $stmt->execute([$courseId, $userId]);

    if ($stmt->fetchColumn() == 0) {
        throw new Exception("user not in course");
    }
    $stmt = $PDO->prepare("
        SELECT COUNT(*) 
        FROM topics
        WHERE id_cours = ? AND nom = ?
    ");
    $stmt->execute([$courseId, $subject]);

    if ($stmt->fetchColumn() > 0) {
        throw new Exception("topic already exists");
    }

    $stmt = $PDO->prepare("
        INSERT INTO topics (nom, id_cours, num_posts)
        VALUES (?, ?, 0)
    ");
    $stmt->execute([$subject, $courseId]);
    $newId = $PDO->lastInsertId();
    $stmt = $PDO->prepare("
        UPDATE course
        SET num_topics = num_topics + 1
        WHERE id = ?
    ");
    $stmt->execute([$courseId]);

    echo json_encode([
        "status" => "ok",
        "data" => [
            "idTopic" => $newId
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "data" => [
            "reason" => $e->getMessage()
        ]
    ]);
}
