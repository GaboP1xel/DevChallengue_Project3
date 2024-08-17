"use strict";

const imgSong = document.getElementById("music-img");
const songTitle = document.getElementById("music-details-h3");
const songArtist = document.getElementById("music-details-span");
const playButton = document.getElementById("play-button");
const audio1 = document.getElementById("audioPlayer");
const audio2 = document.getElementById("audioPlayer2");
const timePlayed = document.getElementById("time-played");
const timeTotal = document.getElementById("time-total");
const progressBar = document.getElementById("progress-bar");
const playButtonContainer = document.querySelector(".play-button-container");
const nextSong = document.getElementById("forward-music");
const backSong = document.getElementById("backward-music");
const body = document.getElementById("mouse-up-element");
let musicPlay = false;

const progressBarValue = (song) => {
    let songActualTime = song.currentTime;
    let songTime = song.duration;
    let percentaje = songActualTime / songTime * 100;
    progressBar.value = percentaje;
    return percentaje;
}

const clickEvent = () => {
    if (!musicPlay) {
        playButton.src = "dccl--javascript-music-player/pause_fill.svg";
        audio1.play();
        audio1.addEventListener("timeupdate", () => progressBarValue(audio1));
        musicPlay = true;
    } else {
        playButton.src = "dccl--javascript-music-player/Play_fill.svg";
        audio1.pause();
        musicPlay = false;
    };
}

const clickEvent2 = () => {
    if (!musicPlay) {
        playButton.src = "dccl--javascript-music-player/pause_fill.svg";
        audio2.play();
        audio2.addEventListener("timeupdate", () => progressBarValue(audio2));
        musicPlay = true;
    } else {
        playButton.src = "dccl--javascript-music-player/Play_fill.svg";
        audio2.pause();
        musicPlay = false;
    };
}

const songDuration = (song) => {
    let songTime = song.duration;
    let songMinutes = Math.floor(songTime / 60);
    let songSeconds = Math.floor(songTime % 60)
    timeTotal.textContent = `${songMinutes < 10 ? "0" : ""}${songMinutes}:${songSeconds}`;
};

const songActualDuration = (song) => {
    let songTime = song.duration;
    let songActualTime = song.currentTime;
    let songActualTimeMinutes = Math.floor(songActualTime / 60);
    let songActualTimeSeconds = Math.floor(songActualTime % 60);
    timePlayed.textContent = `${songActualTimeMinutes < 10 ? "0" : ""}${songActualTimeMinutes}:${songActualTimeSeconds < 10 ? "0" : ""}${songActualTimeSeconds}`;
    if (songActualTime == songTime) {
        playButton.src = "dccl--javascript-music-player/Play_fill.svg";
        musicPlay = false;
    }
};

const getDinamicPercentaje = e => {
    let progressBarMeasures = progressBar.getBoundingClientRect();
    let progressBarWidth = progressBarMeasures.width;
    let progressBarClientPosition = e.clientX - progressBarMeasures.left;
    let percentaje = Math.round(progressBarClientPosition / progressBarWidth * 100);
    return percentaje;
}

function song1() {
    playButtonContainer.removeEventListener("click", clickEvent2);
    playButtonContainer.addEventListener("click", clickEvent);
    musicPlay = false;

    imgSong.src = `dccl--javascript-music-player/cover-1.png`;
    songTitle.textContent = `Forest Lullaby`;
    songArtist.textContent = `Lesfm`;

    audio1.addEventListener("loadedmetadata", () => {
        songDuration(audio1);
        audio1.addEventListener("timeupdate", () => {
            songActualDuration(audio1);
        })
    });

    const getDinamicTime1 = e => {
        let progressBarMeasures = progressBar.getBoundingClientRect();
        let progressBarWidth = progressBarMeasures.width;
        let progressBarClientPosition = e.clientX - progressBarMeasures.left;
        let percentaje = Math.round(progressBarClientPosition / progressBarWidth * 100);
        percentaje = Math.max(0, Math.min(percentaje, 100));
        let songTime1 = audio1.duration;
        let transformToTime = ((percentaje / 100) * songTime1);
        let songActualTimeMinutes = Math.floor(transformToTime / 60);
        let songActualTimeSeconds = Math.floor(transformToTime % 60);
        timePlayed.textContent = `${songActualTimeMinutes < 10 ? "0" : ""}${songActualTimeMinutes}:${songActualTimeSeconds < 10 ? "0" : ""}${songActualTimeSeconds}`;
    };

    const percentajes1 = e => {
        let progressBarMeasures = progressBar.getBoundingClientRect();
        let progressBarWidth = progressBarMeasures.width;
        let progressBarClientPosition = e.clientX - progressBarMeasures.left;
        let songTime1 = audio1.duration;
        let percentaje = Math.round(progressBarClientPosition / progressBarWidth * 100);
        let actualTime = Math.round((percentaje / 100) * songTime1);
        return actualTime;
    }

    let moveAccess1 = false;

    const progressBarMouseDown = e => {
        e.preventDefault();
        progressBar.value = getDinamicPercentaje(e);
        moveAccess1 = true;
        audio1.pause();
    }

    const progressBarMouseMove = e => {
        if (moveAccess1) {
            progressBar.value = getDinamicPercentaje(e);
            getDinamicTime1(e)
        }
    }

    const progressBarMouseUp = e => {
        audio2.pause();
        if (moveAccess1) {
            moveAccess1 = false;
            musicPlay = false;
            progressBar.value = getDinamicPercentaje(e);
            audio1.currentTime = percentajes1(e);
            if (!musicPlay) {
                playButton.src = "dccl--javascript-music-player/pause_fill.svg";
                audio1.play();
                audio1.addEventListener("timeupdate", () => progressBarValue(audio1));
                musicPlay = true;
            };
        }
    }

    const progressBarMouseDown2 = e => {};

    const progressBarMouseMove2 = e => {};

    const progressBarMouseUp2 = e => {};

    progressBar.removeEventListener("mousedown", progressBarMouseDown2);
    body.removeEventListener("mousemove", progressBarMouseMove2);
    body.removeEventListener("mouseup", progressBarMouseUp2);

    progressBar.addEventListener("mousedown", progressBarMouseDown);
    body.addEventListener("mousemove", progressBarMouseMove);
    body.addEventListener("mouseup", progressBarMouseUp);


}

function song2() {
    playButtonContainer.removeEventListener("click", clickEvent);
    playButtonContainer.addEventListener("click", clickEvent2);
    imgSong.src = `dccl--javascript-music-player/cover-2.png`;
    songTitle.textContent = `Lost in the City Lights`;
    songArtist.textContent = `Cosmo Sheldrake`;
    playButton.src = "dccl--javascript-music-player/Play_fill.svg";

    songDuration(audio2);
    audio2.addEventListener("timeupdate", () => {
        songActualDuration(audio2);
    });

    const getDinamicTime2 = e => {
        let progressBarMeasures = progressBar.getBoundingClientRect();
        let progressBarWidth = progressBarMeasures.width;
        let progressBarClientPosition = e.clientX - progressBarMeasures.left;
        let percentaje = Math.round(progressBarClientPosition / progressBarWidth * 100);
        percentaje = Math.max(0, Math.min(percentaje, 100));
        let songTime = audio2.duration;
        let transformToTime = ((percentaje / 100) * songTime);
        let songActualTimeMinutes = Math.floor(transformToTime / 60);
        let songActualTimeSeconds = Math.floor(transformToTime % 60);
        timePlayed.textContent = `${songActualTimeMinutes < 10 ? "0" : ""}${songActualTimeMinutes}:${songActualTimeSeconds < 10 ? "0" : ""}${songActualTimeSeconds}`;
    };

    const percentajes2 = e => {
        let progressBarMeasures = progressBar.getBoundingClientRect();
        let progressBarWidth = progressBarMeasures.width;
        let progressBarClientPosition = e.clientX - progressBarMeasures.left;
        let songTime = audio2.duration;
        let percentaje = Math.round(progressBarClientPosition / progressBarWidth * 100);
        let actualTime = Math.round((percentaje / 100) * songTime);
        return actualTime;
    }

    let moveAccess2 = false;

    const progressBarMouseDown2 = e => {
        e.preventDefault();
        progressBar.value = getDinamicPercentaje(e);
        moveAccess2 = true;
        audio2.pause();
    }

    const progressBarMouseMove2 = e => {
        if (moveAccess2) {
            progressBar.value = getDinamicPercentaje(e);
            getDinamicTime2(e)
        }
    }

    const progressBarMouseUp2 = e => {
        audio1.pause();
        if (moveAccess2) {
            moveAccess2 = false;
            musicPlay = false;
            progressBar.value = getDinamicPercentaje(e);
            audio2.currentTime = percentajes2(e);
            if (!musicPlay) {
                playButton.src = "dccl--javascript-music-player/pause_fill.svg";
                audio2.play();
                audio2.addEventListener("timeupdate", () => progressBarValue(audio2));
                musicPlay = true;
            };
        }
    }

    const progressBarMouseDown = e => {};

    const progressBarMouseMove = e => {};

    const progressBarMouseUp = e => {};

    progressBar.removeEventListener("mousedown", progressBarMouseDown);
    body.removeEventListener("mousemove", progressBarMouseMove);
    body.removeEventListener("mouseup", progressBarMouseUp);

    progressBar.addEventListener("mousedown", progressBarMouseDown2);
    body.addEventListener("mousemove", progressBarMouseMove2);
    body.addEventListener("mouseup", progressBarMouseUp2);

}

const songs = [
    song1,
    song2
];

let currentSongIndex = 0;

const currentSong = () => {
    const audioElements = [audio1, audio2];
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    })
    musicPlay = false;
    let selectedSong = songs[currentSongIndex];
    selectedSong();
}

function forwardSong() {
    playButton.src = "dccl--javascript-music-player/Play_fill.svg";
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    currentSong();
}

function backwardSong() {
    playButton.src = "dccl--javascript-music-player/Play_fill.svg";
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    currentSong();
}

nextSong.addEventListener("click", () => {
    forwardSong();
});

backSong.addEventListener("click", () => {
    backwardSong();
})

currentSong();