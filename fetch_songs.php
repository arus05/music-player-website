<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo "Connection error: " . mysqli_connect_error();
    }

    $sql = "SELECT * FROM songs";
    $result = mysqli_query($conn, $sql);

    $songs = mysqli_fetch_all($result, MYSQLI_ASSOC);

    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    echo json_encode($songs);

    mysqli_free_result($result);
    $conn->close();
?>
