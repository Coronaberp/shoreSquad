# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Overview

ShoreSquad is a web application that mobilizes young people to clean beaches using weather tracking, interactive maps, and social features to make eco-action fun and connected.

## Features

- 📊 **Impact Stats**: View total kilograms collected, beaches cleaned, and squad members
- 🗓️ **Upcoming Events**: Browse and join beach cleanup events
- 🗺️ **Interactive Maps**: See cleanup locations with Google Maps integration
- ☀️ **Weather Integration**: Check weather conditions for planning cleanups
- 💬 **Community Comments**: Share thoughts and connect with other members
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Color Palette

- **Primary Color**: `#0077b6` (Ocean Blue)
- **Secondary Color**: `#00b4d8` (Sky Blue)
- **Accent Color**: `#90e0ef` (Light Aqua)
- **Neutral Colors**: `#f0f8ff` (Alice Blue), `#333333` (Dark Gray)

## Tech Stack

- **HTML5**: Semantic markup
- **Bootstrap 5**: Modern UI framework
- **CSS3**: Custom styling with CSS variables
- **JavaScript (ES6+)**: Interactive functionality
- **Leaflet.js**: Map integration
- **Axios**: HTTP requests for weather API
- **Bootstrap Icons**: Icon library

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Live Server extension for VS Code (recommended)

### Installation

1. Clone or download this repository
2. Open the project folder in VS Code
3. Install the Live Server extension if not already installed
4. Right-click on `index.html` and select "Open with Live Server"

### Configuration

To enable real weather data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `js/app.js`
3. Replace `YOUR_API_KEY_HERE` with your actual API key
4. Uncomment the real API code block

## Project Structure

```
shoreSquad/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Custom styles
├── js/
│   └── app.js          # JavaScript functionality
├── .gitignore          # Git ignore file
├── .vscode/
│   └── settings.json   # VS Code settings
└── README.md           # Project documentation
```

## Features Implementation

### Interactivity

- Smooth scrolling navigation
- Card hover effects with elevation
- Form validation and submission
- Dynamic comment posting
- Responsive navigation menu

### Performance

- Lazy loading for images
- Debounced search inputs
- CDN-hosted libraries
- Optimized asset loading

### Accessibility

- ARIA labels and roles
- Semantic HTML structure
- Keyboard navigation support
- High contrast color scheme
- Screen reader friendly

## Future Enhancements

- [ ] User authentication with Firebase
- [ ] Real-time event updates
- [ ] Photo uploads for cleanup events
- [ ] Gamification with badges and leaderboards
- [ ] Progressive Web App (PWA) capabilities
- [ ] Push notifications for events
- [ ] Integration with social media sharing

## Contributing

We welcome contributions! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## License

© 2025 ShoreSquad. All rights reserved.

---

**Making waves for a cleaner tomorrow! 🌊**
