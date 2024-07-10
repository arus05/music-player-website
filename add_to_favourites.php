<?php
    include("requireAuth.php");

    // header('Content-Type: application/text');
    // header("Access-Control-Allow-Origin: *");
    // header("Access-Control-Allow-Headers: *");

    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo "Connection error: " . mysqli_connect_error();
    }

    $userId = $_SESSION['userId'];
    $songId = mysqli_real_escape_string($conn, $_POST["songId"]);
    $like = mysqli_real_escape_string($conn, $_POST["like"]);

    if ($like === "1") {
        $sql = "INSERT INTO user_song (userId, songId)
                VALUES ($userId, $songId);";
    }
    else if ($like == "0"){
        $sql = "DELETE FROM user_song
        WHERE userId=$userId AND songId=$songId;";
        echo "unlike";
    }

    if (!mysqli_query($conn, $sql)) {
        echo "query error" . mysqli_error($conn);
    }
    else {
        echo "finished";
    }

    $conn->close();
?>