// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        // Add animation class
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 500);
    });
    
    // Chaos Mode Toggle Functionality
    let chaosActive = false;
    
    // Listen for 'c' key to toggle chaos mode
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c') {
            chaosActive = !chaosActive;
            
            if (chaosActive) {
                body.classList.add('chaos-mode');
                console.log('🌈 CHAOS MODE ACTIVATED! Press C to disable 🌈');
            } else {
                body.classList.remove('chaos-mode');
                console.log('✨ Chaos mode deactivated');
            }
        }
    });
});
