const songListEl = document.getElementById("song-list")
let songList = []
let favourites

let currentlyPlaying = []

/* EVENT LISTENERS FOR USER MENU*/
const profilePictureEl = document.querySelector(".profile-picture")
const userMenuEl = document.querySelector(".user-menu")

profilePictureEl.addEventListener("click", (e) => {
    userMenuEl.style.display = userMenuEl.style.display == "" ? "block" : ""
})

const userMenuLogoutEl = document.querySelector(".user-menu-logout")
userMenuLogoutEl.addEventListener("click", async () => {
    console.log("LOG OUT")
    const formData = new FormData()
    formData.append("submit", "LOGOUT")
    const res = await fetch("logout.php", { method: 'POST', body: formData })
    if (res.ok) {
        window.location.replace("login.php");
    }
})

/* EVENT LISTENERS FOR SEARCHING */
const searchBar = document.querySelector(".search-input")
let searchTimeout;
searchBar.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        const matchedIds = matchSongs(query)

        console.log(matchedIds)
        
        songList.forEach(song => {
            const songItem = document.querySelector(`#song-item-${song.id}`)
            const separator = document.querySelector(`#song-item-${song.id} + .separator`)
            if (matchedIds.has(song.id)) {
                console.log(songItem)
                songItem.style.display = "grid"
                separator.style.display = "block"
            }
            else {
                console.log(songItem)
                songItem.style.display = "none"
                separator.style.display = "none"
            }
        })

    }, 100);
});

/* EVENT LISTENERS FOR MUSIC PLAYER */
let currentSongId = -1;
const audioEl = document.querySelector(".song-player-audio")
const songTitleEl = document.querySelector(".song-player-title")
const songAuthorEl = document.querySelector(".song-player-artist")
const songImageEl = document.querySelector(".song-player-image-container img")
const songSeekBarEl = document.querySelector(".song-player-scroller input")
const currentTimeEl = document.querySelector(".song-player-current-time")
const endTimeEl = document.querySelector(".song-player-end-time")
const prevBtnEl = document.querySelector(".song-player-prev-btn")
const playBtnEl = document.querySelector(".song-player-play-btn")
const nextBtnEl = document.querySelector(".song-player-next-btn")
const audioControlEl = document.querySelector(".song-player-audio-control input")

audioEl.volume = parseFloat(audioControlEl.value)

audioControlEl.addEventListener("change", (e) => {
    console.log("change volume to " + e.target.value)
    audioEl.volume = parseFloat(e.target.value)
})

songSeekBarEl.addEventListener("change", (e) => {
    audioEl.currentTime = parseInt(e.target.value)
    currentTimeEl.textContent = formatTime(parseInt(e.target.value))
})

playBtnEl.addEventListener("click", (e) => {
    if (currentSongId == -1) return

    toggleSongPlayerButton()
    togglePlayIcon(currentSongId)

    if (audioEl.paused) {
        audioEl.play()
        playAnimation()
    }
    else {
        audioEl.pause()
        pauseAnimation()
    }
})

prevBtnEl.addEventListener("click", (e) => {
    if (currentSongId == -1) return

    const currentIndex = songList.findIndex(song => song.id == currentSongId)
    const newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : songList.length - 1
    
    handlePlayPause(songList[newIndex].id)
})

nextBtnEl.addEventListener("click", (e) => {
    if (currentSongId == -1) return

    const currentIndex = songList.findIndex(song => song.id == currentSongId)
    const newIndex = currentIndex + 1 < songList.length ? currentIndex + 1 : 0
    
    handlePlayPause(songList[newIndex].id)
})

const seekBarInterval = setInterval(() => {
    songSeekBarEl.value = audioEl.currentTime
    currentTimeEl.textContent = formatTime(audioEl.currentTime)
}, 500)

/* NAV BAR COLORING LOGIC */
const currentURL = window.location.href
let currentPageName
if (currentURL[currentURL.length-1] == "/") {
    currentPageName = "index"
} else {
    currentPageName = currentURL.slice(currentURL.lastIndexOf("/")+1, currentURL.indexOf(".php"))
}
const currentNavItemId = `menu-item-${currentPageName}-link`
const currentNavItem = document.getElementById(currentNavItemId)
currentNavItem.style.color = "#00e4cb"

/* FUNCTIONS */
async function loadSongs() {
    try {
        let res = await fetch("http://localhost/music-player/fetch_songs.php", {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        songList = await res.json()
        
        res = await fetch("http://localhost/music-player/fetch_favourites.php", {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        favourites = await res.json()
        console.log(favourites)
        favourites = new Set(favourites)

        songList.forEach(song => {
            songElement = createSong(song)
            separator = document.createElement("div")
            separator.classList.add("separator")
            songListEl.append(songElement, separator)
        })
    } catch(err) {
        console.error(err)
        const errorMessage = document.createElement("p")
        errorMessage.textContent = "Couldn't connect to database..."
        songListEl.append(errorMessage)
    }
}

/* SONG FUNCTIONS */
function togglePlayIcon(songId) {
    const iconEl = document.querySelector(`#song-item-${songId} .song-play-btn i`)
    iconEl.classList.toggle("bx-pause-circle")
    iconEl.classList.toggle("bx-play-circle")
}

function setPlayIcon(iconEl) {
    iconEl.classList.remove("bx-pause-circle")
    iconEl.classList.add("bx-play-circle")
}

function createSong(song) {
    const songElement = document.createElement("li")
    songElement.classList.add("song-item")
    songElement.id = `song-item-${song.id}`

    const songNumber = document.createElement("div")
    songNumber.classList.add("song-number")
    songNumber.textContent = song.id

    const songImageContainer = document.createElement("div")
    songImageContainer.classList.add("song-image-container")
    const songImage = document.createElement("img")
    songImage.src = song.image
    songImageContainer.append(songImage)

    const songName = document.createElement("div")
    songName.classList.add("song-name")
    songName.textContent = song.title

    const songAuthor = document.createElement("div")
    songAuthor.classList.add("song-author")
    songAuthor.textContent = song.artist

    const songLikeBtn = document.createElement("button")
    songLikeBtn.classList.add("song-like-btn")
    const likeBtnIcon = document.createElement("i")
    likeBtnIcon.classList.add("bx")
    if (favourites.has(song.id)) {
        likeBtnIcon.classList.add("bxs-heart")
    }
    else {
        likeBtnIcon.classList.add("bx-heart")
    }
    songLikeBtn.append(likeBtnIcon)
    songLikeBtn.addEventListener("click", (e) => {
        handleLike(song.id)
    })

    const songPlayBtn = document.createElement("button")
    songPlayBtn.classList.add("song-play-btn")
    const playBtnIcon = document.createElement("i")
    playBtnIcon.classList.add("bx")
    playBtnIcon.classList.add("bx-play-circle")
    songPlayBtn.append(playBtnIcon)
    songPlayBtn.addEventListener("click", (e) => {
        handlePlayPause(song.id)
    })

    songElement.append(
        songNumber,
        songImageContainer,
        songName,
        songAuthor,
        songLikeBtn,
        songPlayBtn
    )

    return songElement
}

function toggleSongPlayerButton() {
    const playIcon = document.querySelector(".song-player-play-btn span")
    if (playIcon.textContent.indexOf("pause") != -1) {
        playIcon.textContent = "play_arrow"
    }
    else {
        playIcon.textContent = "pause"
    }
}

function pauseSongPlayerButton() {
    const playIcon = document.querySelector(".song-player-play-btn span")
    playIcon.textContent = "pause"
}

function playSongPlayerButton() {
    const playIcon = document.querySelector(".song-player-play-btn span")
    playIcon.textContent = "play"
}

function handlePlayPause(songId) {
    songSeekBarEl.disabled = false
    if (currentSongId == songId) {
        toggleSongPlayerButton()
        togglePlayIcon(songId)
        if (audioEl.paused) {
            audioEl.play()
            playAnimation()
        }
        else {
            audioEl.pause()
            pauseAnimation()
        }
    }
    else if (currentSongId == -1) {
        setSong(songId)
        toggleSongPlayerButton()
        togglePlayIcon(songId)
        audioEl.play()
        playAnimation()
    }
    else {
        const prevSongIcon = document.querySelector(`#song-item-${currentSongId} .song-play-btn i`)
        setPlayIcon(prevSongIcon)
        togglePlayIcon(songId)
        pauseSongPlayerButton()
        playAnimation()
        setSong(songId)
        audioEl.play()
    }
}

async function handleLike(songId) {
    // Toggle icon
    const likeIcon = document.querySelector(`#song-item-${songId} .song-like-btn i`)
    likeIcon.classList.toggle("bxs-heart")
    likeIcon.classList.toggle("bx-heart")

    // Send request to backend fav/
    const url = 'http://localhost/music-player/add_to_favourites.php';
    let formData = new FormData();
    formData.append("songId", songId)
    if (favourites.has(songId)) {
        formData.append('like', "0")
        const res = await fetch(url, { method: 'POST', body: formData, 
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        if (res.ok) {
            const data = await res.text()
            console.log(data)
            favourites.delete(songId)
        }
    }
    else {
        formData.append('like', "1");
        const res = await fetch(url, { method: 'POST', body: formData,
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
         })
        if (res.ok) {
            const data = await res.text()
            console.log(data)
            favourites.add(songId)
        }
    }
}

/* SEARCH FUNCTIONS */
function matchSongs(query) {
    query = query.toLowerCase()
    const matchedIds = new Set()

    songList.forEach(song => {
        if (
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        ) {
            matchedIds.add(song.id)
        }
    })

    return matchedIds
}

/* SONG PLAYER FUNCTIONS */
function playAnimation() {
    const imageContainer = document.querySelector(".song-player-image-container")
    imageContainer.style.animationPlayState = "running"
}

function pauseAnimation() {
    const imageContainer = document.querySelector(".song-player-image-container")
    imageContainer.style.animationPlayState = "paused"
}

function setSong(songId) {
    const song = songList.find(song => song.id == songId)

    currentSongId = song.id

    audioEl.src = song.src

    audioEl.onloadedmetadata = () => {
        songSeekBarEl.max = audioEl.duration
        endTimeEl.textContent = formatTime(audioEl.duration)
    }

    songTitleEl.textContent = song.title
    songAuthorEl.textContent = song.artist
    songImageEl.src = song.image
    songSeekBarEl.value = 0
    currentTimeEl.textContent = "00:00"
}

function formatTime(seconds) {
    let time = ""
    let min = Math.floor(seconds / 60)
    let sec = Math.floor(seconds % 60)
    if (min < 10) {
        time += "0"
    }
    time += min + ":"
    if (sec < 10) {
        time += "0"
    }
    time += sec
    return time
}

/* FETCH SONGS */
loadSongs()