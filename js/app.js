// ShoreSquad JavaScript - Enhanced with Bootstrap 5
console.log('🌊 Welcome to ShoreSquad!');

// Weather Integration using NEA (Singapore) Data.gov.sg API
async function fetchWeatherForecast() {
    const weatherInfo = document.getElementById('weather-info');
    
    try {
        weatherInfo.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Loading weather forecast...</p></div>';
        
        // Fetch 4-day weather forecast from Singapore NEA API
        const response = await axios.get('https://api.data.gov.sg/v1/environment/4-day-weather-forecast');
        const forecast = response.data.items[0].forecasts;
        
        // Get current temperature from another endpoint
        const tempResponse = await axios.get('https://api.data.gov.sg/v1/environment/air-temperature');
        const currentTemp = tempResponse.data.items[0].readings[0].value;
        
        // Create weather forecast cards
        let forecastHTML = '<div class="row g-3">';
        
        forecast.slice(0, 4).forEach((day, index) => {
            const date = new Date(day.date);
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-SG', { weekday: 'short' });
            const dateStr = date.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' });
            
            // Map forecast to weather icons
            const weatherIcon = getWeatherIcon(day.forecast);
            
            forecastHTML += `
                <div class="col-md-3 col-6">
                    <div class="card weather-card h-100">
                        <div class="card-body text-center p-3">
                            <h6 class="fw-bold mb-1">${dayName}</h6>
                            <p class="text-muted small mb-2">${dateStr}</p>
                            <i class="bi ${weatherIcon} fs-1 text-primary mb-2"></i>
                            <p class="small mb-2">${day.forecast}</p>
                            <div class="d-flex justify-content-center gap-2 small">
                                <span class="text-danger fw-bold">${day.temperature.high}°C</span>
                                <span class="text-muted">${day.temperature.low}°C</span>
                            </div>
                            <p class="small text-muted mb-0 mt-2">
                                <i class="bi bi-droplet"></i> ${day.relative_humidity.high}%
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        forecastHTML += '</div>';
        
        // Add current conditions header
        const currentConditions = `
            <div class="alert alert-info mb-4">
                <div class="d-flex align-items-center justify-content-center">
                    <i class="bi bi-thermometer-half fs-4 me-3"></i>
                    <div>
                        <strong>Current Temperature:</strong> ${currentTemp}°C
                        <span class="ms-3 text-muted">Singapore</span>
                    </div>
                </div>
            </div>
        `;
        
        weatherInfo.innerHTML = currentConditions + forecastHTML;
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle"></i> 
                Unable to load weather forecast. Please try again later.
            </div>
        `;
    }
}

// Helper function to map forecast text to Bootstrap icons
function getWeatherIcon(forecast) {
    const lowerForecast = forecast.toLowerCase();
    
    if (lowerForecast.includes('thunder') || lowerForecast.includes('storm')) {
        return 'bi-cloud-lightning-rain';
    } else if (lowerForecast.includes('rain') || lowerForecast.includes('showers')) {
        return 'bi-cloud-rain';
    } else if (lowerForecast.includes('cloudy') || lowerForecast.includes('overcast')) {
        return 'bi-cloudy';
    } else if (lowerForecast.includes('partly cloudy') || lowerForecast.includes('fair')) {
        return 'bi-cloud-sun';
    } else if (lowerForecast.includes('hazy') || lowerForecast.includes('haze')) {
        return 'bi-cloud-haze';
    } else {
        return 'bi-sun';
    }
}

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherForecast();
});

// User authentication and profiles
const users = [];

function registerUser(username, password) {
    const user = { username, password };
    users.push(user);
    console.log('User registered:', username);
}

function loginUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        console.log('Login successful:', username);
        return true;
    } else {
        console.log('Login failed for:', username);
        return false;
    }
}

// Example usage
registerUser('testUser', 'password123');
loginUser('testUser', 'password123');

// Comment Section Functionality
const comments = [];

function addComment(username, commentText) {
    const comment = { 
        username, 
        text: commentText, 
        timestamp: new Date(),
        avatar: `https://i.pravatar.cc/50?u=${username}`
    };
    comments.push(comment);
    displayComments();
}

function displayComments() {
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="d-flex">
                <img src="${comment.avatar}" class="rounded-circle me-3" width="50" height="50" alt="${comment.username}">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">${comment.username}</h6>
                    <p class="mb-1">${comment.text}</p>
                    <small class="text-muted">
                        <i class="bi bi-clock"></i> ${comment.timestamp.toLocaleString()}
                    </small>
                </div>
            </div>
        </div>
    `).join('');
}

// Comment form handling
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const commentText = document.getElementById('comment-text').value;
            
            if (username && commentText) {
                addComment(username, commentText);
                commentForm.reset();
                
                // Show success toast
                const toast = document.createElement('div');
                toast.className = 'alert alert-success position-fixed top-0 end-0 m-3';
                toast.style.zIndex = '9999';
                toast.innerHTML = '<i class="bi bi-check-circle"></i> Comment posted successfully!';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        });
    }
    
    // Add sample comments with diverse Singapore names
    addComment('Wei Ting Tan', 'Super excited for the Pasir Ris cleanup! See you all there! 🌊');
    addComment('Raj Kumar', 'This is my first cleanup event. Any tips for beginners?');
    addComment('Nurul Aisyah', 'Great initiative! Let\'s keep our beaches clean 💚');
});

// Optimize performance with lazy loading and debouncing

// Lazy load images or sections
const lazyElements = document.querySelectorAll('[data-lazy]');
const lazyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lazyElement = entry.target;
            if (lazyElement.tagName === 'IMG') {
                lazyElement.src = lazyElement.dataset.src;
            } else {
                lazyElement.textContent = lazyElement.dataset.content;
            }
            observer.unobserve(lazyElement);
        }
    });
});

lazyElements.forEach(el => lazyObserver.observe(el));

// Debounce function for search or input events
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Example usage of debounce
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', debounce(event => {
        console.log('Search query:', event.target.value);
    }, 300));
}