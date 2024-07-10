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
    togglePlayIcon(document.querySelector(`#song-item-${currentSongId} .song-play-btn i`))

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