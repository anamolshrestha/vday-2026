// Configuration
const START_DATE = new Date("2024-04-29T00:00:00"); // CHANGE THIS DATE!

// DOM Elements
const app = document.getElementById('app');
const startBtn = document.getElementById('start-btn');
const heroSection = document.getElementById('hero');
const hiddenSections = document.querySelectorAll('.screen.hidden'); // Selector fixed to exclude overlay
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const successOverlay = document.getElementById('success');

// Music Logic (YouTube API)
let player;
// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: 'Lf1M-XJpUpQ',
    playerVars: {
      'playsinline': 1,
      'controls': 0,
      'disablekb': 1
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // Player is ready, but we wait for user interaction to play
}

// 1. Start Button Logic
startBtn.addEventListener('click', () => {
  // Play Music
  if (player && player.playVideo) {
    player.playVideo();
    player.setVolume(50); // Moderate volume
  }

  // Reveal sections
  hiddenSections.forEach(section => {
    section.classList.remove('hidden'); // Use class manipulation
    // Small delay to allow display:flex to apply before opacity transition
    setTimeout(() => {
      section.style.opacity = '1';
    }, 50);
  });

  // Scroll to timer
  document.getElementById('timer').scrollIntoView({ behavior: 'smooth' });

  // Start Music (Optional - browser policy blocks auto-play usually, so this is good place)
  // const audio = new Audio('/your-song.mp3');
  // audio.play();
});

// 2. Countdown Timer
function updateTimer() {
  const now = new Date();
  const diff = now - START_DATE;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('years').innerText = years;
  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;
}

setInterval(updateTimer, 1000);
updateTimer();

// 3. Scroll Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// 4. "No" Button Logic (Funny Options)
const noTexts = [
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
];

let noCount = 0;

noBtn.addEventListener('click', () => {
  noCount++;
  // Cycle through messages, loop if we run out (or just stay on the last one)
  const textIndex = Math.min(noCount, noTexts.length - 1);
  noBtn.innerText = noTexts[textIndex];

  // Make Yes button grow
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = `${currentSize * 1.5}px`;

  // Optional: Add some funny random movement/shake or just text change
  noBtn.style.transform = 'translate(0, 0)'; // Reset any previous transforms if needed
});

// 5. Success Logic
yesBtn.addEventListener('click', () => {
  successOverlay.classList.remove('hidden');
  // Celebration confetti could go here
  createConfetti();
});

// Allow closing the overlay by clicking anywhere
successOverlay.addEventListener('click', () => {
  successOverlay.classList.add('hidden');
});

// 6. Floating Hearts Background
function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.position = 'fixed';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.top = '100vh';
  heart.style.fontSize = Math.random() * 20 + 20 + 'px';
  heart.style.opacity = Math.random() * 0.5 + 0.3;
  heart.style.animation = `float ${Math.random() * 3 + 4}s linear forwards`;
  heart.style.zIndex = '-1';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

// Add CSS keyframes for float if not present, or simple JS animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes float {
    to {
        transform: translateY(-110vh) rotate(360deg);
    }
}
`;
document.head.appendChild(styleSheet);

setInterval(createHeart, 500);

// Simple Confetti
import { initGame } from './game.js';
import { initThemeToggle } from './features.js';

// Initialize Game & Features
initGame();
initThemeToggle();

// ... existing code ...

// 7. Interactive Cursor Trail
document.addEventListener('mousemove', function (e) {
  if (Math.random() < 0.1) { // Don't create on every frame
    const heart = document.createElement('div');
    heart.innerHTML = ['❤️', '✨', '💖'][Math.floor(Math.random() * 3)];
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '12px';
    heart.style.animation = 'fadeOut 1s linear forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1000);
  }
});

// Add fadeOut animation dynamically
const styleStyle = document.createElement("style");
styleStyle.innerText = `
@keyframes fadeOut {
    to {
        transform: translateY(20px);
        opacity: 0;
    }
}
`;
document.head.appendChild(styleStyle);

function createConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#ff4d6d', '#ff8fa3', '#fff', 'gold'][Math.floor(Math.random() * 4)];
    confetti.style.zIndex = '200';

    // Random velocity
    const vx = (Math.random() - 0.5) * 20;
    const vy = (Math.random() - 0.5) * 20;

    document.body.appendChild(confetti);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let t = 0;

    const animate = () => {
      t += 1;
      x += vx;
      y += vy + t * 0.5; // Gravity

      confetti.style.left = x + 'px';
      confetti.style.top = y + 'px';

      if (y < window.innerHeight) {
        requestAnimationFrame(animate);
      } else {
        confetti.remove();
      }
    };
    requestAnimationFrame(animate);
  }
}
