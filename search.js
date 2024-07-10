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
