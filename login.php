<?php
    session_start();

    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music_player_website";

    $error = "";

    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        echo "Connection error: " . mysqli_connect_error();
    }

    if (isset($_POST['username']) && isset($_POST['password'])){
        $user = $_POST['username'];
        $pass = $_POST['password'];
    
        $sql = "SELECT * FROM users WHERE username = ?";
    
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('s', $user);
        $stmt->execute();
    
        $result = $stmt->get_result();
    
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if (password_verify($pass, $row['password'])) {
                $_SESSION['username'] = $user;
                $_SESSION["userId"] = $row["userId"];
                header("Location: index.php");
                exit();
            }
            else {
                $error = "Invalid password";
            }
        } else {
            $error = "No user found";
        }
    
        $stmt->close();
        $conn->close();
    }
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
            <form class="login-card" action="login.php" method="POST">
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
                <?php if ($error != ""): ?>
                    <div style="color: white">
                        <?php echo $error ?>
                    </div>
                <?php endif ?>
                <input type="submit" name="submit" value="LOGIN" class="login-btn">
                <div class="login-card-bottom">
                    <p>
                        No account? Sign up <a href="register.php">HERE</a> !
                    </p>
                </div>
            </form>
        </div>
    </body>
</html>