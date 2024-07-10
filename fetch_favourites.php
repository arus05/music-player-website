<?php
    include("requireAuth.php");
    
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo json_encode(["error"=>"Connection error: " . mysqli_connect_error()]);
    }

    $loggedInUserId = $_SESSION["userId"];
    $sql = "SELECT songId FROM user_song WHERE userId='$loggedInUserId'";
    $result = mysqli_query($conn, $sql);
    $songIds = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $songIds[] = $row['songId'];
    }

    echo json_encode($songIds);

    mysqli_free_result($result);
    $conn->close();
?>