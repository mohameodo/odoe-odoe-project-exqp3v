document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Logic for the Routes page
    const routesContainer = document.getElementById('routes-container');
    if (routesContainer && typeof transitData !== 'undefined') {
        transitData.routes.forEach(route => {
            const routeCard = document.createElement('div');
            routeCard.className = 'bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1';
            
            routeCard.innerHTML = `
                <div class="flex items-center mb-4">
                    <span class="w-14 h-14 rounded-xl text-white font-bold text-2xl flex items-center justify-center mr-4" style="background-color: ${route.color}">${route.id}</span>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">${route.name}</h3>
                        <p class="text-sm text-gray-500">${route.type}</p>
                    </div>
                </div>
                <p class="text-gray-600 mb-6">${route.description}</p>
                <a href="map.html?route=${route.id}" class="font-semibold text-blue-600 hover:text-blue-800">View on Map <i class="fas fa-arrow-right ml-1"></i></a>
            `;
            routesContainer.appendChild(routeCard);
        });
    }
});
