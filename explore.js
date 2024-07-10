const songCardContainer = document.querySelector(".song-card-container")
let songList = []
let favourites = []

/* EVENT LISTENERS FOR USER MENU */
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
            const songCard = document.querySelector(`#song-card-${song.id}`)
            if (matchedIds.has(song.id)) {
                songCard.style.display = "flex"
            }
            else {
                songCard.style.display = "none"
            }
        })

    }, 100);
});

/* NAV BAR COLORING LOGIC */
const currentURL = window.location.href
const currentPageName = currentURL.slice(currentURL.lastIndexOf("/")+1, currentURL.indexOf(".php"))
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
            const songCard = document.createElement("li")
            songCard.classList.add("song-card")
            songCard.id = `song-card-${song.id}`
            songCard.innerHTML = `
<div class="song-card-image">
    <img src="${song.image}">
</div>
<div class="song-card-info">
    <div class="song-card-title-author">
        <span class="song-card-name">${song.title}</span>
        <span class="song-card-author">${song.artist}</span>
    </div>
    <div class="song-card-actions">
        <div class="song-card-like-btn">
            <i class='bx ${favourites.has(song.id) ? "bxs-heart" : "bx-heart"}'></i>
        </div>
    </div>
</div>`
            songCardContainer.append(songCard)
            const likeBtn = document.querySelector(`#song-card-${song.id} .song-card-like-btn`)
            likeBtn.addEventListener("click", () => {
                handleLike(song.id)
            })
        })
    } catch(err) {
        console.error(err)
        const errorMessage = document.createElement("p")
        errorMessage.textContent = "Couldn't connect to database..."
        songCardContainer.append(errorMessage)
    }
}

async function handleLike(songId) {
    // Toggle icon
    const likeIcon = document.querySelector(`#song-card-${songId} i`)
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

/* FETCH SONGS */
loadSongs()