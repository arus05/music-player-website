<?php include("requireAuth.php") ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
        <title>Music Player</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="explore.css">
    </head>
    
    <body>
        <div class="container">
        <aside class="sidebar">
                <div class="logo">
                    <i class='bx bx-pulse'></i>
                    <a href="index.php" class="logo-name">DFA Music</a>
                </div>
                <div class="menu">
                    <div class="separator"></div>
                    <ul class="menu-list">
                        <li class="menu-home">
                            <i class='bx bx-home' ></i>
                            <a href="index.php" id="menu-item-index-link">Home</a>
                        </li>
                        <li class="menu-explore">
                            <i class='bx bx-search-alt'></i>
                            <a href="explore.php" id="menu-item-explore-link">Explore</a>
                        </li>
                        <li class="menu-favs">
                            <i class='bx bx-heart'></i>
                            <a href="favourites.php" id="menu-item-favourites-link">Favourites</a>
                        </li>
                    </ul>
                    <form class="menu-logout" action="logout.php" method="POST">
                        <i class='bx bx-log-out' id="logout-icon"></i>
                        <input type="submit" value="Log Out">
                    </form>
                </div>
                <footer class="footer">
                    <div class="separator"></div>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <a href="#">Contact us</a>
                        </li>
                        <li class="footer-item">
                            <a href="#">About us</a>
                        </li>
                        <li class="footer-item">
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li class="footer-item">
                            <a href="#">Terms of Service</a>
                        </li>
                        <li class="footer-item">
                            <a href="#">FAQ</a>
                        </li>
                    </ul>
                    <div class="separator"></div>
                    <ul class="social-media-list">
                        <li class="social-media-item">
                            <a href="https://facebook.com" target="_blank">
                                <i class='bx bxl-facebook-circle'></i>
                            </a>
                        </li>
                        <li class="social-media-item">
                            <a href="https://instagram.com" target="_blank">
                                <i class='bx bxl-instagram-alt'></i>
                            </a>
                        </li>
                        <li class="social-media-item" target="_blank">
                            <a href="https://x.com">
                                <i class='bx bxl-twitter'></i>
                            </a>
                        </li>
                    </ul>
                    <div class="copyright">
                        Copyright &copy; 2015, DFA Music.
                    </div>
                </footer>
            </aside>
            <main class="main">
                <div class="main-navbar">
                    <div class="search-bar">
                        <div class="search-icon-container">
                            <i class='bx bx-search'></i>
                        </div>
                        <input type="text" placeholder="Search song" class ="search-input" id="search-input">
                    </div>
                    <div class="user-info">
                        <div class="profile-picture">
                            <img src="assets/images/gojo.jpg" alt="">
                        </div>
                        <div class="username">
                            @<?php echo $_SESSION['username'] ?>
                        </div>
                        <ul class="user-menu">
                            <li class="user-menu-settings">
                                <i class='bx bxs-cog' ></i>
                                <button>Settings</button>
                            </li>
                            <li class="user-menu-logout">
                                <i class='bx bx-log-out'></i>
                                <button>Log Out</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="main-content-explore">
                    <div class="song-container">
                        <ul class="song-card-container">
                            <!-- <li class="music-card">
                                <div class="music-image"></div>
                                <div class="music-info">
                                    <div class="music-title-author">
                                        <span>Music Title</span>
                                        <span>Author</span>
                                    </div>
                                    <div class="music-actions">
                                        <i class='bx bx-play-circle'></i>
                                        <i class='bx bx-heart'></i>
                                    </div>
                                </div>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </main>
        </div>
        <script src="explore.js"></script>
    </body>
</html>