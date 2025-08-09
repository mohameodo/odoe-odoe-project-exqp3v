document.addEventListener('DOMContentLoaded', () => {
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded.');
        return;
    }

    // Check if we are on the map page
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Initialize map centered on a default location
    const map = L.map('map').setView([40.7128, -74.0060], 12);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const routeLayers = {};
    const vehicleMarkers = {};

    const routeListContainer = document.getElementById('route-list');

    // Populate route list in the sidebar
    transitData.routes.forEach(route => {
        const routeItem = document.createElement('div');
        routeItem.className = 'flex items-center justify-between p-3 rounded-lg hover:bg-gray-100';
        routeItem.innerHTML = `
            <div class="flex items-center">
                <span class="w-8 h-8 rounded-md text-white font-bold text-sm flex items-center justify-center mr-3" style="background-color: ${route.color};">${route.id}</span>
                <div>
                    <p class="font-semibold text-gray-800">${route.name}</p>
                    <p class="text-xs text-gray-500">${route.type}</p>
                </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" class="sr-only peer" data-route-id="${route.id}" checked>
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
        `;
        routeListContainer.appendChild(routeItem);

        // Add event listener for the toggle
        const toggle = routeItem.querySelector('input[type="checkbox"]');
        toggle.addEventListener('change', (e) => {
            const routeId = e.target.dataset.routeId;
            if (e.target.checked) {
                showRoute(routeId);
            } else {
                hideRoute(routeId);
            }
        });
    });

    function createVehicleIcon(route) {
        return L.divIcon({
            className: 'bus-marker-icon',
            html: `<i class="${route.type === 'Bus' ? 'fa-solid fa-bus' : 'fa-solid fa-train-subway'}"></i>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
            popupAnchor: [0, -14],
            // This style is applied directly for dynamic coloring
            // Note: In a real app, you might create CSS classes per color
            // but for this dynamic data, this is simpler.
            // The background color is set via JS below.
        });
    }

    function showRoute(routeId) {
        const route = transitData.routes.find(r => r.id === routeId);
        if (!route) return;

        // Draw route path
        const polyline = L.polyline(route.path, { color: route.color, weight: 5 }).addTo(map);
        
        // Create vehicle markers
        const vehiclesOnRoute = transitData.vehicles.filter(v => v.routeId === routeId);
        const vehicleMarkerGroup = L.layerGroup();

        vehiclesOnRoute.forEach(vehicle => {
            const initialPosition = route.path[vehicle.currentPositionIndex];
            const icon = createVehicleIcon(route);
            const marker = L.marker(initialPosition, { icon: icon }).addTo(vehicleMarkerGroup);
            marker.bindPopup(`<b>${route.name} (${route.id})</b><br>Vehicle #${vehicle.id}`);
            
            // Apply dynamic color to the icon element
            // This is a bit of a hack to get around Leaflet's DivIcon limitations
            // We get the element after it's been created and style it.
            marker.on('add', function() {
                 this._icon.style.backgroundColor = route.color;
            });

            vehicleMarkers[vehicle.id] = marker;
        });

        routeLayers[routeId] = { polyline, vehicleMarkerGroup };
        vehicleMarkerGroup.addTo(map);
    }

    function hideRoute(routeId) {
        if (routeLayers[routeId]) {
            map.removeLayer(routeLayers[routeId].polyline);
            map.removeLayer(routeLayers[routeId].vehicleMarkerGroup);
            delete routeLayers[routeId];

            // Also remove vehicle markers from the tracked object
            transitData.vehicles.filter(v => v.routeId === routeId).forEach(v => {
                delete vehicleMarkers[v.id];
            });
        }
    }

    // Initially show all routes
    transitData.routes.forEach(route => showRoute(route.id));

    // Simulate real-time movement
    function updateVehiclePositions() {
        transitData.vehicles.forEach(vehicle => {
            const marker = vehicleMarkers[vehicle.id];
            if (!marker) return; // Skip if route is hidden

            const route = transitData.routes.find(r => r.id === vehicle.routeId);
            if (!route) return;

            // Move to the next point on the path
            vehicle.currentPositionIndex = (vehicle.currentPositionIndex + 1) % route.path.length;
            const newPosition = route.path[vehicle.currentPositionIndex];
            
            // Smoothly move marker
            marker.setLatLng(newPosition);
        });
    }

    // Update positions every 3 seconds
    setInterval(updateVehiclePositions, 3000);
});
