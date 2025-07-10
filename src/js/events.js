// Gestor de eventos
class EventManager {
    constructor() {
        this.events = [];
        this.currentEvent = null;
        this.init();
    }

    async init() {
        await this.loadEvents();
        this.renderEvents();
        this.setupEventListeners();
    }

    async loadEvents() {
        try {
            const response = await fetch('http://localhost:3000/events');
            this.events = await response.json();
        } catch (error) {
            console.error('Error loading events:', error);
            if (window.notificationManager) {
                window.notificationManager.show('Error al cargar eventos', 'error');
            }
        }
    }

    renderEvents() {
        const container = document.getElementById('eventos-container');
        if (!container) return;

        // Filtrar solo eventos activos para la vista pública
        const activeEvents = this.events.filter(event => event.status === 'active');

        container.innerHTML = activeEvents.map(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            const formattedTime = eventDate.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });

            const statusClass = event.status === 'active' ? 'bg-green-100 text-green-800' : 
                               event.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                               'bg-red-100 text-red-800';

            const typeClass = event.type === 'free' ? 'bg-blue-100 text-blue-800' : 'bg-coffee-100 text-coffee-800';

            return `
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-coffee-100">
                    <div class="relative">
                        <img src="${event.image}" alt="${event.title}" class="w-full h-48 object-cover">
                        <div class="absolute top-4 left-4 flex gap-2">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold ${statusClass}">
                                ${event.status === 'active' ? 'Activo' : event.status === 'inactive' ? 'Inactivo' : 'Cancelado'}
                            </span>
                            <span class="px-3 py-1 rounded-full text-xs font-semibold ${typeClass}">
                                ${event.type === 'free' ? 'Gratuito' : 'Pago'}
                            </span>
                        </div>
                        ${event.type === 'paid' ? `
                            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                                <span class="text-coffee-800 font-bold">$${event.price?.toLocaleString()}</span>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-coffee-800 mb-3">${event.title}</h3>
                        <p class="text-coffee-700 mb-4 line-clamp-3">${event.description}</p>
                        
                        <div class="flex items-center text-coffee-600 mb-4">
                            <i class="fas fa-calendar mr-2"></i>
                            <span class="text-sm">${formattedDate} - ${formattedTime}</span>
                        </div>
                        
                        <button onclick="window.eventManager.showEventDetails('${event.id}')" 
                                class="w-full bg-coffee-600 text-white py-3 rounded-xl font-semibold hover:bg-coffee-700 transition-all duration-300 transform hover:scale-105">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupEventListeners() {
        // Manejadores de eventos específicos para eventos
    }

    showEventDetails(eventId) {
        this.currentEvent = this.events.find(event => event.id === eventId);
        if (!this.currentEvent) return;

        const modal = document.getElementById('event-details-modal');
        if (!modal) return;

        // Llenar información del evento
        document.getElementById('event-details-title').textContent = this.currentEvent.title;
        document.getElementById('event-details-description').textContent = this.currentEvent.description;
        document.getElementById('event-details-image').src = this.currentEvent.image;
        document.getElementById('event-details-image').alt = this.currentEvent.title;

        // Formatear fecha
        const eventDate = new Date(this.currentEvent.date);
        const formattedDate = eventDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('event-details-date').textContent = formattedDate;

        // Estado y tipo
        const statusElement = document.getElementById('event-details-status');
        const typeElement = document.getElementById('event-details-type');
        
        statusElement.textContent = this.currentEvent.status === 'active' ? 'Activo' : 
                                   this.currentEvent.status === 'inactive' ? 'Inactivo' : 'Cancelado';
        statusElement.className = `px-4 py-2 rounded-full text-sm font-semibold ${
            this.currentEvent.status === 'active' ? 'bg-green-100 text-green-800' : 
            this.currentEvent.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
            'bg-red-100 text-red-800'
        }`;

        typeElement.textContent = this.currentEvent.type === 'free' ? 'Gratuito' : 'Pago';
        typeElement.className = `px-4 py-2 rounded-full text-sm font-semibold ${
            this.currentEvent.type === 'free' ? 'bg-blue-100 text-blue-800' : 'bg-coffee-100 text-coffee-800'
        }`;

        // Precio
        const priceSection = document.getElementById('event-details-price-section');
        const priceElement = document.getElementById('event-details-price');
        
        if (this.currentEvent.type === 'paid') {
            priceSection.classList.remove('hidden');
            priceElement.textContent = `$${this.currentEvent.price?.toLocaleString()}`;
        } else {
            priceSection.classList.add('hidden');
        }

        // Patrocinadores
        const sponsorsContainer = document.getElementById('event-details-sponsors-list');
        if (this.currentEvent.sponsors && this.currentEvent.sponsors.length > 0) {
            sponsorsContainer.innerHTML = this.currentEvent.sponsors.map(sponsor => 
                `<span class="px-3 py-1 bg-coffee-100 text-coffee-800 rounded-full text-sm">${sponsor.name}</span>`
            ).join('');
        } else {
            sponsorsContainer.innerHTML = '<span class="text-coffee-600">No hay patrocinadores</span>';
        }

        // Botón de acción
        const actionBtn = document.getElementById('event-action-btn');
        if (this.currentEvent.status === 'active') {
            if (this.currentEvent.type === 'paid') {
                actionBtn.innerHTML = '<i class="fas fa-credit-card mr-2"></i>Comprar Entrada';
                actionBtn.onclick = () => this.showPurchaseModal();
            } else {
                actionBtn.innerHTML = '<i class="fas fa-user-check mr-2"></i>Confirmar Asistencia';
                actionBtn.onclick = () => this.showAttendanceModal();
            }
            actionBtn.classList.remove('hidden');
        } else {
            actionBtn.classList.add('hidden');
        }

        // Mostrar modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    closeEventDetailsModal() {
        const modal = document.getElementById('event-details-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }

    showPurchaseModal() {
        this.closeEventDetailsModal();
        const modal = document.getElementById('purchase-modal');
        if (modal) {
            // Resetear formulario
            document.getElementById('purchase-form').reset();
            document.getElementById('purchase-step-1').classList.remove('hidden');
            document.getElementById('purchase-step-2').classList.add('hidden');
            document.getElementById('purchase-step-3').classList.add('hidden');
            document.getElementById('purchase-buttons').classList.remove('hidden');
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    showAttendanceModal() {
        this.closeEventDetailsModal();
        const modal = document.getElementById('attendance-modal');
        if (modal) {
            // Resetear formulario
            document.getElementById('attendance-form').reset();
            document.getElementById('attendance-step-1').classList.remove('hidden');
            document.getElementById('attendance-step-2').classList.add('hidden');
            document.getElementById('attendance-buttons').classList.remove('hidden');
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    }

    closePurchaseModal() {
        const modal = document.getElementById('purchase-modal');
        if (modal) {
            // Cerrar inmediatamente cuando el usuario lo solicite
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            
            // Resetear el formulario y pasos para la próxima compra
            const form = document.getElementById('purchase-form');
            if (form) form.reset();
            
            // Resetear pasos
            document.getElementById('purchase-step-1').classList.remove('hidden');
            document.getElementById('purchase-step-2').classList.add('hidden');
            document.getElementById('purchase-step-3').classList.add('hidden');
            document.getElementById('purchase-buttons').classList.remove('hidden');
            
            // Resetear botón
            const continueBtn = document.getElementById('purchase-continue');
            if (continueBtn) {
                continueBtn.innerHTML = 'Continuar';
                continueBtn.disabled = false;
            }
            
            // Resetear paso actual
            if (window.purchaseManager) {
                window.purchaseManager.currentStep = 1;
            }
        }
    }

    closeAttendanceModal() {
        const modal = document.getElementById('attendance-modal');
        if (modal) {
            // Cerrar inmediatamente cuando el usuario lo solicite
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            
            // Resetear el formulario y pasos para la próxima asistencia
            const form = document.getElementById('attendance-form');
            if (form) form.reset();
            
            // Resetear pasos
            document.getElementById('attendance-step-1').classList.remove('hidden');
            document.getElementById('attendance-step-2').classList.add('hidden');
            document.getElementById('attendance-buttons').classList.remove('hidden');
            
            // Resetear botón
            const continueBtn = document.getElementById('attendance-continue');
            if (continueBtn) {
                continueBtn.innerHTML = 'Confirmar Asistencia';
                continueBtn.disabled = false;
            }
        }
    }
}

// Inicializar el gestor de eventos
window.eventManager = new EventManager();