<?php
    session_start();

    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo "Connection error: " . mysqli_connect_error();
    }

    $user = $_POST['username'];
    $pass = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $user);
    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        // password_verify($pass, $row['password'])
        if ($pass === $row["password"]) {
            $_SESSION['username'] = $user;
            $_SESSION["userId"] = $row["userId"];
            header("Location: index.php");
            exit();
        }
        else {
            echo "Invalid password";
        }
    } else {
        echo "No user found";
    }

    $stmt->close();
    $conn->close();
?>