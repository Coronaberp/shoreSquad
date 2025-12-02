// Coffee Theme Selector Functionality
document.addEventListener('DOMContentLoaded', () => {
    const coffeeBtn = document.getElementById('coffeeThemeBtn');
    const coffeeMenu = document.getElementById('coffeeMenu');
    const coffeeLiquid = document.getElementById('coffeeLiquid');
    const coffeeOptions = document.querySelectorAll('.coffee-option');
    const body = document.body;
    
    // Theme configurations
    const themes = {
        'light': { class: '', darkMode: false },
        'dark': { class: 'dark-mode', darkMode: true },
        'mocha': { class: '', darkMode: false },
        'caramel': { class: '', darkMode: false },
        'matcha': { class: '', darkMode: false }
    };
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme, false);
    
    // Toggle coffee menu
    coffeeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        coffeeMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!coffeeMenu.contains(e.target) && !coffeeBtn.contains(e.target)) {
            coffeeMenu.classList.remove('active');
        }
    });
    
    // Handle theme selection
    coffeeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme, true);
            coffeeMenu.classList.remove('active');
        });
    });
    
    function applyTheme(theme, animate) {
        // Remove all theme classes and data attributes
        body.classList.remove('dark-mode');
        body.removeAttribute('data-theme');
        
        // Apply new theme using data-theme attribute only
        body.setAttribute('data-theme', theme);
        
        // Animate coffee pour
        if (animate && coffeeLiquid) {
            coffeeLiquid.classList.remove('pouring');
            void coffeeLiquid.offsetWidth; // Force reflow
            coffeeLiquid.classList.add('pouring');
            
            // Add ripple effect to cup
            coffeeBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                coffeeBtn.style.transform = 'scale(1)';
            }, 300);
        }
        
        // Update active state in menu
        coffeeOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.theme === theme) {
                opt.classList.add('active');
            }
        });
        
        // Save preference
        localStorage.setItem('theme', theme);
    }
    
    // Chaos Mode Toggle Functionality
    let chaosActive = false;
    const chaosCircleBtn = document.getElementById('chaosCircle');
    const footerText = document.getElementById('footerText');
    const originalFooterText = footerText ? footerText.textContent : '';
    const coffeeSelector = document.querySelector('.coffee-theme-selector');
    
    // Listen for 'c' key to toggle chaos mode
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'c') {
            chaosActive = !chaosActive;
            
            if (chaosActive) {
                body.classList.add('chaos-mode');
                // Hide coffee selector and show chaos circle button
                if (coffeeSelector) {
                    coffeeSelector.style.display = 'none';
                }
                if (chaosCircleBtn) {
                    chaosCircleBtn.style.display = 'flex';
                }
                // Change footer text to Wingdings
                if (footerText) {
                    footerText.textContent = 'Happy now?';
                    footerText.style.fontFamily = 'Wingdings, Webdings, Symbol';
                }
                console.log('🌈 CHAOS MODE ACTIVATED! Press C to disable 🌈');
            } else {
                body.classList.remove('chaos-mode');
                // Show coffee selector and hide chaos circle button
                if (coffeeSelector) {
                    coffeeSelector.style.display = 'block';
                }
                if (chaosCircleBtn) {
                    chaosCircleBtn.style.display = 'none';
                }
                // Restore original footer text
                if (footerText) {
                    footerText.textContent = originalFooterText;
                    footerText.style.fontFamily = '';
                }
                console.log('✨ Chaos mode deactivated');
            }
        }
    });
    
    // Chaos circle button does nothing when clicked
    if (chaosCircleBtn) {
        chaosCircleBtn.addEventListener('click', () => {
            // Do nothing - just a decorative button
        });
    }
});
