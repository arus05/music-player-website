<?php
    include("requireAuth.php")
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
                <div class="main-content">
                    <div class="song-container">
                        <ul class="song-list" id="song-list">
                            <!-- <li class="song-item">
                                <div class="song-id">
                                    1
                                </div>
                                <div class="song-image-container">
                                    <img src="assets/images/gojo.jpg" alt="">
                                </div>
                                <div class="song-name">
                                    The Call
                                </div>
                                <div class="song-author">
                                    Huang Dennis
                                </div>
                                <button class="song-like-btn">
                                    <i class='bx bx-heart'></i>
                                </button>
                                <button class="song-play-btn">
                                    <i class='bx bx-play-circle'></i>
                                </button>
                            </li> -->
                        </ul>
                    </div>
                    <div class="song-player">
                        <audio hidden src="" controls class="song-player-audio"></audio>
                        <h3 class="song-player-title"> Not Playing </h3>
                        <p class="song-player-artist"> ... </p>
                        <div class="song-player-image-container">
                            <img src="assets/images/music_note.jpg" alt="">
                        </div>
                        <div class="song-player-scroller">
                            <input disabled type="range">
                            <div class="song-player-time">
                                <p class="song-player-current-time">00:00</p>
                                <p class="song-player-end-time">03:51</p>
                            </div>
                        </div>
                        <div class="song-player-controls">
                            <div class="song-player-prev-btn">
                                <i class='bx bx-skip-previous' ></i>
                            </div>
                            <div class="song-player-play-btn">
                                <span class="material-symbols-outlined">
                                    play_arrow
                                </span>
                            </div>
                            <div class="song-player-next-btn">
                                <i class='bx bx-skip-next' ></i>
                            </div>
                        </div>
                        <div class="song-player-audio-control">
                            <div class="song-player-audio-low">
                                <i class='bx bx-volume-low' ></i>
                            </div>
                            <input type="range" step="0.01" min="0" max="1" value="0.5">
                            <div class="song-player-audio-high">
                                <i class='bx bx-volume-full' ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <script src="favourites.js"></script>
    </body>
</html>