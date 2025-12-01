// ShoreSquad JavaScript - Enhanced with Bootstrap 5
console.log('🌊 Welcome to ShoreSquad!');

// Weather Integration
async function fetchWeather() {
    const weatherInfo = document.getElementById('weather-info');
    
    // Using a demo weather API (replace with your OpenWeatherMap API key)
    const city = 'Singapore';
    const apiKey = 'YOUR_API_KEY_HERE'; // Get free key from openweathermap.org
    
    // For demo purposes, show mock data
    setTimeout(() => {
        weatherInfo.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <i class="bi bi-cloud-sun fs-1 text-warning me-3"></i>
                <div class="text-start">
                    <h4 class="mb-1">Sunny & Clear</h4>
                    <p class="mb-0 text-muted">Perfect beach cleanup weather!</p>
                    <p class="mb-0"><strong>28°C</strong> | Wind: 10 km/h</p>
                </div>
            </div>
        `;
    }, 1000);
    
    // Uncomment below to use real API
    /*
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const weather = response.data;
        weatherInfo.innerHTML = `
            <div class="d-flex justify-content-center align-items-center">
                <i class="bi bi-cloud-sun fs-1 text-warning me-3"></i>
                <div class="text-start">
                    <h4 class="mb-1">${weather.weather[0].main}</h4>
                    <p class="mb-0 text-muted">${weather.weather[0].description}</p>
                    <p class="mb-0"><strong>${Math.round(weather.main.temp)}°C</strong> | Wind: ${weather.wind.speed} km/h</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherInfo.innerHTML = '<p class="text-danger">Unable to load weather data</p>';
    }
    */
}

// Initialize weather on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather();
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
    
    // Add sample comments
    addComment('Sarah Chen', 'Super excited for the Pasir Ris cleanup! See you all there! 🌊');
    addComment('Mike Johnson', 'This is my first cleanup event. Any tips for beginners?');
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