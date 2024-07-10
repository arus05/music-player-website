<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo "Connection error: " . mysqli_connect_error();
    }

    if (isset($_POST["submit"])) {
        // Retrieve and sanitize user input
        $username_input = mysqli_real_escape_string($conn, $_POST["username"]);
        $password_input = mysqli_real_escape_string($conn, $_POST["password"]);

        // Hash the password
        $hash = password_hash($password_input, PASSWORD_DEFAULT);

        // Prepare and execute the insert query
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "ss", $username_input, $hash);

        if (mysqli_stmt_execute($stmt)) {
            // Retrieve the new user's ID
            $sql = "SELECT userId FROM users WHERE username = ?";
            $stmt = mysqli_prepare($conn, $sql);
            mysqli_stmt_bind_param($stmt, "s", $username_input);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $newUserId = $result->fetch_assoc()['userId'];

            // Start the session and set session variables
            session_start();
            $_SESSION['username'] = $username_input;
            $_SESSION['userId'] = $newUserId;

            // Redirect to index.php
            header("Location: index.php");
            exit();
        } else {
            echo "Query error: " . mysqli_error($conn);
        }

        // Close the statement and connection
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }

        $conn->close();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
        <title>Music Player</title>
        <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
        <div class="login-container">
            <div class="login-title">
                <i class='bx bx-pulse'></i>
                <h1>
                    DFA Music
                </h1>
            </div>
            <form class="login-card" action="register.php" method="POST">
                <div class="mail-circle">
                    <i class='bx bx-envelope' ></i>
                </div>
                <div class="username-container">
                    <i class='bx bxs-user'></i>
                    <input type="text" name="username" placeholder="Username" required>
                </div>
                <div class="password-container">
                    <i class='bx bxs-lock-alt' ></i>
                    <input type="password" name="password" placeholder="Password" required>
                </div>
                <input type="submit" name="submit" value="REGISTER" class="login-btn">
                <div class="login-card-bottom">
                    <p>
                        Already have an account? Log In <a href="login.php">HERE</a> !
                    </p>
                </div>
            </form>
        </div>
    </body>
</html>