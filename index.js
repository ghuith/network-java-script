
// Sample weather data
const weatherData = {
    'Paris': {
        current: 18,
        min: 15,
        max: 22,
        humidity: 65,
       
    },
    'france': {
        current: 15,
        min: 12,
        max: 17,
        humidity: 75,
        
    },
    'Berlin': {
        current: 16,
        min: 13,
        max: 19,
        humidity: 70,
        
    },
    'Madrid': {
        current: 25,
        min: 20,
        max: 28,
        humidity: 45,
     
     
    }
};

let chart = null;

// Initialize the dashboard
function initDashboard() {
    displayCities();
    createChart();
}

// Display city cards
function displayCities() {
    const grid = document.getElementById('citiesGrid');
    grid.innerHTML = '';

    for (const [city, data] of Object.entries(weatherData)) {
        const card = createCityCard(city, data);
        grid.appendChild(card);
    }
}

// Create a city card
function createCityCard(city, data) {
    const card = document.createElement('div');
    card.className = 'city-card';
    card.innerHTML = `
        <div class="city-name">${city}</div>
        <div class="temperature">${data.current}°C</div>
        <div class="details">
            <div class="detail-item">
                <span>Min Temperature</span>
                <span>${data.min}°C</span>
            </div>
            <div class="detail-item">
                <span>Max Temperature</span>
                <span>${data.max}°C</span>
            </div>
            <div class="detail-item">
                <span>Humidity</span>
                <span>${data.humidity}%</span>
            </div>
           
        </div>
    `;
    
    card.addEventListener('click', () => updateChart(city));
    return card;
}

// Create temperature chart
function createChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Temperature Trend (°C)',
                data: weatherData['Paris'].historicalData,
                borderColor: '#3498db',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Trend - Paris'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// Update chart for selected city
function updateChart(city) {
    chart.data.datasets[0].data = weatherData[city].historicalData;
    chart.options.plugins.title.text = `Temperature Trend - ${city}`;
    chart.update();
}

// Search functionality
function searchCity() {
    const searchTerm = document.getElementById('citySearch').value.toLowerCase();
    const grid = document.getElementById('citiesGrid');
    
    grid.childNodes.forEach(card => {
        const cityName = card.querySelector('.city-name').textContent.toLowerCase();
        card.style.display = cityName.includes(searchTerm) ? 'block' : 'none';
    });
}

// Initialize the dashboard when the page loads
window.onload = initDashboard;
