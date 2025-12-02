// Coffee Theme Selector Functionality
document.addEventListener('DOMContentLoaded', () => {
    const coffeeBtn = document.getElementById('coffeeThemeBtn');
    const coffeeMenu = document.getElementById('coffeeMenu');
    const coffeeLiquid = document.getElementById('coffeeLiquid');
    const coffeeOptions = document.querySelectorAll('.coffee-option');
    const body = document.body;
    const coffeeSelector = document.querySelector('.coffee-theme-selector');
    const accountDropdown = document.getElementById('accountDropdown');
    
    // Theme configurations
    const themes = {
        'light': { class: '', darkMode: false },
        'dark': { class: 'dark-mode', darkMode: true },
        'mocha': { class: '', darkMode: false },
        'caramel': { class: '', darkMode: false },
        'matcha': { class: '', darkMode: false }
    };
    
    // Load saved theme immediately
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme, false);
    
    // Function to close coffee menu
    function closeCoffeeMenu() {
        if (coffeeMenu) {
            coffeeMenu.classList.remove('active');
        }
        if (coffeeSelector) {
            coffeeSelector.classList.remove('faded');
        }
    }
    
    // Function to close account dropdown
    function closeAccountDropdown() {
        if (accountDropdown) {
            const dropdown = bootstrap.Dropdown.getInstance(accountDropdown);
            if (dropdown) {
                dropdown.hide();
            }
        }
    }
    
    // Toggle coffee menu - close account dropdown when opening
    if (coffeeBtn && coffeeMenu) {
        coffeeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpening = !coffeeMenu.classList.contains('active');
            
            if (isOpening) {
                // Close account dropdown and fade it
                closeAccountDropdown();
                if (accountDropdown) {
                    accountDropdown.closest('.nav-item')?.classList.add('faded');
                }
                coffeeSelector?.classList.remove('faded');
            }
            
            coffeeMenu.classList.toggle('active');
        });
    }
    
    // Listen for Bootstrap dropdown events on account dropdown
    if (accountDropdown) {
        accountDropdown.addEventListener('show.bs.dropdown', () => {
            // Close coffee menu and fade it
            closeCoffeeMenu();
            if (coffeeSelector) {
                coffeeSelector.classList.add('faded');
            }
            accountDropdown.closest('.nav-item')?.classList.remove('faded');
        });
        
        accountDropdown.addEventListener('hide.bs.dropdown', () => {
            // Remove fade from coffee selector
            if (coffeeSelector) {
                coffeeSelector.classList.remove('faded');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (coffeeMenu && coffeeBtn && !coffeeMenu.contains(e.target) && !coffeeBtn.contains(e.target)) {
            coffeeMenu.classList.remove('active');
            // Remove fades when closing
            if (accountDropdown) {
                accountDropdown.closest('.nav-item')?.classList.remove('faded');
            }
        }
    });
    
    // Handle theme selection
    coffeeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            applyTheme(theme, true);
            if (coffeeMenu) {
                coffeeMenu.classList.remove('active');
            }
            // Remove fades
            if (accountDropdown) {
                accountDropdown.closest('.nav-item')?.classList.remove('faded');
            }
        });
    });
    
    function applyTheme(theme, animate) {
        // Remove all theme classes and data attributes
        body.classList.remove('dark-mode');
        body.removeAttribute('data-theme');
        
        // Apply new theme using data-theme attribute only
        body.setAttribute('data-theme', theme);
        
        // Animate coffee pour (only if elements exist)
        if (animate && coffeeLiquid && coffeeBtn) {
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
    
    // Listen for 'c' key to toggle chaos mode
    document.addEventListener('keydown', (e) => {
        // Ignore if typing in an input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
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
