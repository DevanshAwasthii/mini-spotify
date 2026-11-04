const myProgressBar = document.getElementById("myProgressBar");
const playerControls = document.querySelector(".buttons");
const masterPlay = document.getElementById("masterPlay");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const songItems = [...document.querySelectorAll(".songItem")];


//mapping all songs
const songs = songItems.map((songItem, index) => ({
    filePath: index === 0 ? "songs/song.mp3" : `songs/song${index + 1}.mp3`,
    songItem,
    title: songItem.querySelector(":scope > span:not(.songlistplay)").textContent.trim()
}));

let songIndex = 0;
const audioElement = new Audio(songs[songIndex].filePath);

function updatePlayButton() {
    const isPlaying = !audioElement.paused;
    masterPlay.dataset.playing = String(isPlaying);
    masterPlay.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    document.getElementById("gif").classList.toggle("is-playing", isPlaying);
    songs.forEach((song, index) => {
        song.songItem.classList.toggle("is-playing", index === songIndex && isPlaying);
    });
}

function updateNowPlaying() {
    nowPlayingTitle.textContent = songs[songIndex].title;
    songs.forEach((song, index) => {
        song.songItem.setAttribute("aria-current", index === songIndex ? "true" : "false");
    });
}

function playSong(index) {
    if (index !== songIndex) {
        songIndex = index;
        audioElement.src = songs[songIndex].filePath;
        audioElement.load();
        myProgressBar.value = 0;
        updateNowPlaying();
    }

    audioElement.play().catch(error => {
        console.error(`Audio playback failed for ${songs[songIndex].filePath}:`, error);
    });
}

function playNextSong() {
    playSong((songIndex + 1) % songs.length);
}

function playPreviousSong() {
    playSong((songIndex - 1 + songs.length) % songs.length);
}

playerControls.addEventListener("click", event => {
    if (event.target.closest("#masterPlay")) {
        if (audioElement.paused) {
            playSong(songIndex);
        } else {
            audioElement.pause();
        }
    } else if (event.target.closest("#nextSong")) {
        playNextSong();
    } else if (event.target.closest("#previousSong")) {
        playPreviousSong();
    }
});

document.querySelector(".songitemcontainer").addEventListener("click", event => {
    const selectedItem = event.target.closest(".songItem");
    if (!selectedItem) {
        return;
    }

    const selectedIndex = songs.findIndex(song => song.songItem === selectedItem);
    if (selectedIndex !== -1) {
        playSong(selectedIndex);
    }
});

audioElement.addEventListener("play", updatePlayButton);
audioElement.addEventListener("pause", updatePlayButton);
audioElement.addEventListener("ended", () => {
    updatePlayButton();
    myProgressBar.value = 0;
});
audioElement.addEventListener("timeupdate", () => {
    if (Number.isFinite(audioElement.duration) && audioElement.duration > 0) {
        myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    }
});

myProgressBar.addEventListener("input", () => {
    if (Number.isFinite(audioElement.duration) && audioElement.duration > 0) {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
});

updateNowPlaying();
