// Gestor de notificaciones
class NotificationManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        // Crear contenedor de notificaciones si no existe
        this.container = document.getElementById('notification-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'notification-container';
            this.container.className = 'fixed top-20 right-4 z-50 space-y-4';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 8000) {
        const notification = document.createElement('div');
        notification.className = `notification bg-white rounded-xl shadow-lg border-l-4 p-4 transform translate-x-full transition-transform duration-300 max-w-sm`;
        
        // Configurar colores según el tipo
        switch (type) {
            case 'success':
                notification.classList.add('border-green-500');
                break;
            case 'error':
                notification.classList.add('border-red-500');
                break;
            case 'warning':
                notification.classList.add('border-yellow-500');
                break;
            default:
                notification.classList.add('border-blue-500');
        }

        // Configurar icono según el tipo
        let icon = 'fas fa-info-circle';
        let iconColor = 'text-blue-500';
        
        switch (type) {
            case 'success':
                icon = 'fas fa-check-circle';
                iconColor = 'text-green-500';
                break;
            case 'error':
                icon = 'fas fa-exclamation-circle';
                iconColor = 'text-red-500';
                break;
            case 'warning':
                icon = 'fas fa-exclamation-triangle';
                iconColor = 'text-yellow-500';
                break;
        }

        notification.innerHTML = `
            <div class="flex items-start">
                <i class="${icon} ${iconColor} mr-3 mt-1"></i>
                <div class="flex-1">
                    <p class="text-coffee-800 font-medium">${message}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-coffee-400 hover:text-coffee-600">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        this.container.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto-remover después del tiempo especificado
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
    }
}

// Inicializar el gestor de notificaciones
window.notificationManager = new NotificationManager();