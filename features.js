export function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return; // Guard clause

    let isDrawing = false;

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        // Support touch and mouse
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function scratch(e) {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling on touch

        const ctx = canvas.getContext('2d');
        const pos = getMousePos(e);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2); // Brush size
        ctx.fill();
    }

    canvas.addEventListener('mousedown', (e) => { isDrawing = true; scratch(e); });
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); }, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', () => { isDrawing = false; });

    // Initial draw
    resetScratchCard();
}

export function resetScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Reset composite operation to default for drawing the overlay
    ctx.globalCompositeOperation = 'source-over';

    // Fill with "Scratch Me" overlay
    ctx.fillStyle = '#c0c0c0'; // Silver scratch off color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text on top
    ctx.fillStyle = '#555';
    ctx.font = '30px "Dancing Script"';
    ctx.textAlign = "center";
    ctx.fillText("Scratch to Reveal!", canvas.width / 2, canvas.height / 2);
}

export function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    let isDark = false;
    let stars = [];

    toggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        body.classList.toggle('dark-mode');
        toggleBtn.innerText = isDark ? '☀️' : '🌙';

        if (isDark) {
            createStars();
        } else {
            removeStars();
        }
    });

    function createStars() {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + 'vw';
            star.style.top = Math.random() * 100 + 'vh';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.animationDuration = Math.random() * 2 + 1 + 's';
            document.body.appendChild(star);
            stars.push(star);
        }
    }

    function removeStars() {
        stars.forEach(s => s.remove());
        stars = [];
    }
}
