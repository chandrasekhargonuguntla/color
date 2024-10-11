
// Get all elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');


const songs = [
{
name: 'song1',
displayName: 'Song One',
artist: 'Artist One',
cover: 'https://via.placeholder.com/200?text=Cover+1'
},
{
name: 'song2',
displayName: 'Song Two',
artist: 'Artist Two',
cover: 'https://via.placeholder.com/200?text=Cover+2'
},
{
name: 'song3',
displayName: 'Song Three',
artist: 'Artist Three',
cover: 'https://via.placeholder.com/200?text=Cover+3'
}
];


let songIndex = 0;


loadSong(songs[songIndex]);

function loadSong(song) {
title.innerText = song.displayName;
artist.innerText = song.artist;
audio.src = `music/${song.name}.mp3`;
cover.src = song.cover;
}


function playSong() {
playBtn.classList.replace('fa-play', 'fa-pause');
audio.play();
}


function pauseSong() {
playBtn.classList.replace('fa-pause', 'fa-play');
audio.pause();
}


playBtn.addEventListener('click', () => {
const isPlaying = playBtn.classList.contains('fa-pause');

if (isPlaying) {
pauseSong();
} else {
playSong();
}
});


prevBtn.addEventListener('click', prevSong);
function prevSong() {
songIndex--;
if (songIndex < 0) {
songIndex = songs.length - 1;
}
loadSong(songs[songIndex]);
playSong();
}


nextBtn.addEventListener('click', nextSong);
function nextSong() {
songIndex++;
if (songIndex > songs.length - 1) {
songIndex = 0;
}
loadSong(songs[songIndex]);
playSong();
}


audio.addEventListener('timeupdate', updateProgressBar);
function updateProgressBar(e) {
const { duration, currentTime } = e.srcElement;
const progressPercent = (currentTime / duration) * 100;
progress.style.width = `${progressPercent}%`;


const currentMinutes = Math.floor(currentTime / 60);
const currentSeconds = Math.floor(currentTime % 60);
const durationMinutes = Math.floor(duration / 60);
const durationSeconds = Math.floor(duration % 60);

currentTimeEl.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
durationEl.innerText = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}


progressContainer.addEventListener('click', setProgress);
function setProgress(e) {
const width = progressContainer.clientWidth;
const clickX = e.offsetX;
const duration = audio.duration;

audio.currentTime = (clickX / width) * duration;
}


audio.addEventListener('ended', nextSong);
