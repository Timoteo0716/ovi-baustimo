/* ---------- Estrellas ---------- */
const memories = [
  "Hace siete años tomaste una decisión muy especial. ❤️",
  "Tu amistad con Jehová merece seguir fortaleciéndose. 🌷",
  "Tu esfuerzo espiritual tiene un gran valor. ✨",
  "Incluso en los días difíciles, puedes seguir adelante. 💗",
  "Nunca dejes de cultivar tu amor por Jehová. 🌟",
  "Espero animarte siempre a seguir progresando. 🫶",
  "¡Felices siete años de bautismo, mi niña! ❤️"
];
const starsEl = document.getElementById("stars");
const noteEl = document.getElementById("memoryNote");
const found = new Set();

memories.forEach((m, i) => {
  const b = document.createElement("button");
  b.className = "star";
  b.textContent = "★";
  b.setAttribute("aria-label", `Recuerdo ${i + 1}`);
  b.onclick = () => {
    b.classList.add("active");
    found.add(i);
    noteEl.textContent = m;
    noteEl.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:350});
    if (found.size === memories.length) celebrate();
  };
  starsEl.appendChild(b);
});

function celebrate() {
  const e = ["💗","💕","✨","🌸","❤️"];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = e[Math.floor(Math.random()*e.length)];
    h.style.left = `${10 + Math.random()*80}%`;
    h.style.fontSize = `${16 + Math.random()*18}px`;
    document.body.appendChild(h);
    h.addEventListener("animationend", () => h.remove());
  }
}

/* ---------- Reproductor ---------- */
// Archivo dentro de la carpeta "audio":
const tracks = ["audio/sjjm_S_052.mp3"];
let current = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const seek = document.getElementById("seek");
const cur = document.getElementById("cur");
const dur = document.getElementById("dur");
const items = document.querySelectorAll("#tracks li");

const fmt = s => isFinite(s) ? `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}` : "0:00";

function load(i, autoplay = false) {
  current = (i + tracks.length) % tracks.length;
  audio.src = tracks[current];
  items.forEach((li, k) => li.classList.toggle("on", k === current));
  if (autoplay) audio.play().catch(() => {});
}
function toggle() { audio.paused ? audio.play().catch(() => {}) : audio.pause(); }

playBtn.onclick = toggle;
document.getElementById("mixBtn").onclick = () => {
  document.querySelector(".player").scrollIntoView({behavior:"smooth", block:"center"});
  if (audio.paused) audio.play().catch(() => {});
};
items.forEach(li => li.onclick = () => load(+li.dataset.i, true));

audio.onplay  = () => playBtn.textContent = "⏸";
audio.onpause = () => playBtn.textContent = "▶";
audio.onended = () => { audio.currentTime = 0; };
audio.onloadedmetadata = () => dur.textContent = fmt(audio.duration);
audio.ontimeupdate = () => {
  cur.textContent = fmt(audio.currentTime);
  seek.value = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
};
seek.oninput = () => { if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration; };

load(0);
