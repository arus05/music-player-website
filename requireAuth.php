<?php
    session_start();
    if (!isset($_SESSION['username']) || !isset($_SESSION['userId'])) {
        header("Location: login.php");
        exit();
    }
?>