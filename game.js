export function initGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('start-game-btn');
    const scoreEl = document.getElementById('score');
    const messageEl = document.getElementById('game-message');

    let score = 0;
    let gameRunning = false;
    let hearts = [];
    let basket = { x: canvas.width / 2, y: canvas.height - 50, width: 50, height: 30 };
    let animationId;

    // Basket emoji
    const basketEmoji = "🧺";

    // Mouse control
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width; // Relationship bitmap vs. element for X

        let mouseX = (e.clientX - rect.left) * scaleX;

        // Clamp basket position
        basket.x = Math.max(0, Math.min(canvas.width - basket.width, mouseX - basket.width / 2));
    });

    // Touch control
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        let touchX = (e.touches[0].clientX - rect.left) * scaleX;
        basket.x = Math.max(0, Math.min(canvas.width - basket.width, touchX - basket.width / 2));
    }, { passive: false });

    startBtn.addEventListener('click', startGame);

    function startGame() {
        if (gameRunning) return;

        score = 0;
        scoreEl.innerText = score;
        messageEl.classList.add('hidden');
        startBtn.disabled = true;
        startBtn.innerText = "Playing...";
        gameRunning = true;
        hearts = [];

        step();
        spawnHeart();
    }

    function spawnHeart() {
        if (!gameRunning) return;

        const x = Math.random() * (canvas.width - 30);
        hearts.push({
            x: x,
            y: -30,
            speed: Math.random() * 2 + 2,
            type: Math.random() > 0.8 ? '💖' : '❤️' // Rare sparkling heart
        });

        setTimeout(spawnHeart, Math.random() * 1000 + 500);
    }

    function step() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Basket
        ctx.font = "40px Arial";
        ctx.fillText(basketEmoji, basket.x, basket.y + 35);

        // Update and Draw Hearts
        for (let i = 0; i < hearts.length; i++) {
            let h = hearts[i];
            h.y += h.speed;

            ctx.font = "30px Arial";
            ctx.fillText(h.type, h.x, h.y);

            // Collision Detection
            if (
                h.x < basket.x + basket.width &&
                h.x + 30 > basket.x &&
                h.y < basket.y + basket.height &&
                h.y + 30 > basket.y
            ) {
                // Catch!
                score++;
                scoreEl.innerText = score;
                hearts.splice(i, 1);
                i--;

                // Win Condition
                if (score >= 20) {
                    endGame(true);
                    return;
                }
            } else if (h.y > canvas.height) {
                // Missed
                hearts.splice(i, 1);
                i--;
            }
        }

        animationId = requestAnimationFrame(step);
    }

    function endGame(win) {
        gameRunning = false;
        cancelAnimationFrame(animationId);
        startBtn.disabled = false;
        startBtn.innerText = "Play Again";

        if (win) {
            messageEl.classList.remove('hidden');
            // Confetti effect from main can be triggered here if global, or just local celebration
        }
    }
}
