// Scratch card features removed


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
