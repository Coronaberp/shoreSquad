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
    const chaosToggle = document.getElementById('chaosToggle');
    const chaosModal = document.getElementById('chaosModal');
    const chaosConfirm = document.getElementById('chaosConfirm');
    const chaosCancel = document.getElementById('chaosCancel');
    let chaosActive = false;
    let chaosRevealed = false;
    
    // Listen for 'c' key to reveal chaos button
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c' && !chaosRevealed) {
            chaosToggle.classList.remove('hidden');
            chaosRevealed = true;
            
            // Add entrance animation
            chaosToggle.style.animation = 'chaosAppear 0.5s ease-out';
            console.log('🌪️ Chaos button revealed! Press at your own risk... 🌪️');
        }
    });
    
    // Show warning modal
    chaosToggle.addEventListener('click', () => {
        if (chaosActive) {
            // Turn off chaos mode
            body.classList.remove('chaos-mode');
            chaosActive = false;
            chaosToggle.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i>';
            chaosToggle.title = 'Click at your own risk...';
        } else {
            // Show warning modal
            chaosModal.classList.add('active');
        }
    });
    
    // Confirm chaos mode
    chaosConfirm.addEventListener('click', () => {
        chaosModal.classList.remove('active');
        body.classList.add('chaos-mode');
        chaosActive = true;
        chaosToggle.innerHTML = '<i class="bi bi-x-circle-fill"></i>';
        chaosToggle.title = 'Click to end the chaos!';
        
        // Play warning sound effect (optional)
        console.log('🌪️ CHAOS MODE ACTIVATED! 🌪️');
        
        // Auto-disable after 10 seconds if user doesn't manually disable
        setTimeout(() => {
            if (chaosActive) {
                body.classList.remove('chaos-mode');
                chaosActive = false;
                chaosToggle.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i>';
                chaosToggle.title = 'Click at your own risk...';
                alert('Chaos mode auto-disabled for your safety! 😅');
            }
        }, 10000);
    });
    
    // Cancel chaos mode
    chaosCancel.addEventListener('click', () => {
        chaosModal.classList.remove('active');
    });
    
    // Close modal on outside click
    chaosModal.addEventListener('click', (e) => {
        if (e.target === chaosModal) {
            chaosModal.classList.remove('active');
        }
    });
});
