// 🎵 Music Player
const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const hideBtn = document.getElementById("hideBtn");
const musicPlayer = document.getElementById("musicPlayer");
const miniPlayer = document.getElementById("miniPlayer");
const miniToggle = document.getElementById("miniToggle");
const songTitle = document.querySelector(".song-info h4");
const songArtist = document.querySelector(".song-info p");
const songCover = document.querySelector(".cover");

let isPlaying = false;
let currentTrack = 0;

// Playlist (isiin aja list lagu lu)
const playlist = [
  { 
    src: "musik/lagu1.mp3", 
    title: "On & On", 
    artist: "Cartoon, Jéja, Daniel Levi", 
    cover: "on.jpeg" 
  },
  { 
    src: "musik/lagu2.mp3", 
    title: "Dreams", 
    artist: "Lost Sky", 
    cover: "dreams.jpeg" 
  },
  { 
    src: "musik/lagu3.mp3", 
    title: "Sky High", 
    artist: "Elektronomia", 
    cover: "sky.jpeg" 
  }
];

// Load lagu pertama
function loadTrack(index) {
  currentTrack = index;
  audio.src = playlist[index].src;
  songTitle.textContent = playlist[index].title;
  songArtist.textContent = playlist[index].artist;
  songCover.src = playlist[index].cover;
}

// Mainkan / pause lagu
playPauseBtn.addEventListener("click", togglePlay);
miniToggle.addEventListener("click", togglePlay);

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶︎";
    miniToggle.textContent = "▶︎";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸";
    miniToggle.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// Hide → mini player
hideBtn.addEventListener("click", () => {
  musicPlayer.classList.add("hidden");
  miniPlayer.classList.remove("hidden");
});

// Double click mini → show full player
miniPlayer.addEventListener("dblclick", () => {
  miniPlayer.classList.add("hidden");
  musicPlayer.classList.remove("hidden");
});

// Auto next track
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  audio.play();
  playPauseBtn.textContent = "⏸";
  miniToggle.textContent = "⏸";
  isPlaying = true;
});

// Load pertama
loadTrack(0);

// 🖱️ Cursor Trail
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const colors = ["#000c5b", "#122987", "#1c48b6", "#1d69e6", "#1d80f4", "#3a88db", "#588dc1", "#7490a8"];

// kasih default posisi buat tiap circle
circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
 
});

// update posisi kursor
window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px"; // tadi lu pake `x`, harusnya `y`

    circle.style.scale = (circles.length - index) / circles.length;

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
let hideTimeout = null;

window.addEventListener("mousemove", function(e) {
  coords.x = e.clientX;
  coords.y = e.clientY;

  // reset timer kalau mouse gerak
  if (hideTimeout) clearTimeout(hideTimeout);

  // munculin circle lagi kalau sempat hilang
  circles.forEach(c => c.style.opacity = 1);

  // set timer buat ilangin kalau diem 1.5 detik
  hideTimeout = setTimeout(() => {
    circles.forEach(c => c.style.opacity = 0);
  }, 1500);
});



// === Tambahin di core.js ===

// Load track terakhir dari localStorage (kalau ada)
function loadSavedState() {
  const savedTrack = localStorage.getItem("currentTrack");
  const savedTime = localStorage.getItem("currentTime");
  const savedPlaying = localStorage.getItem("isPlaying");

  if (savedTrack !== null) {
    loadTrack(parseInt(savedTrack));
  } else {
    loadTrack(0); // default lagu pertama
  }

  if (savedTime !== null) {
    audio.currentTime = parseFloat(savedTime);
  }

  if (savedPlaying === "true") {
    audio.play();
    playPauseBtn.textContent = "⏸";
    miniToggle.textContent = "⏸";
    isPlaying = true;
  }
}

// Simpan state sebelum halaman ditutup
window.addEventListener("beforeunload", () => {
  localStorage.setItem("currentTrack", currentTrack);
  localStorage.setItem("currentTime", audio.currentTime);
  localStorage.setItem("isPlaying", isPlaying);
});

// Panggil pas awal
loadSavedState();
