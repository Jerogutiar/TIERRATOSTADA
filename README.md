# ☕ Tierra Tostada - Sistema de Eventos de Café

## 📖 Descripción

**Tierra Tostada** es una plataforma web moderna y elegante diseñada para la gestión y promoción de eventos relacionados con el café. La aplicación permite a los usuarios explorar, registrarse y participar en diversos eventos como catas de café, talleres de molido artesanal, cursos de barismo, y mucho más.

### ✨ Características Principales

- 🎯 **Gestión Completa de Eventos**: Creación, edición y administración de eventos de café
- 🎨 **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y tema personalizado de café
- 🔐 **Sistema de Autenticación**: Login seguro para administradores
- 📊 **Panel de Administración**: Dashboard completo con estadísticas y gestión
- 💳 **Sistema de Pagos**: Integración para eventos pagos y gratuitos
- 📧 **Sistema de Suscripciones**: Newsletter para mantener informados a los usuarios
- 📱 **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- 🎠 **Carousel Interactivo**: Presentación dinámica de eventos en la página principal

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **Tailwind CSS** - Framework de utilidades CSS
- **Font Awesome** - Iconografía
- **Google Fonts (Inter)** - Tipografía moderna

### Backend & Desarrollo
- **Node.js** - Entorno de ejecución
- **Vite** - Herramienta de construcción y desarrollo
- **JSON Server** - API REST simulada
- **Concurrently** - Ejecución paralela de servicios

### Base de Datos
- **JSON** - Almacenamiento de datos (simulación de base de datos)

## 📁 Estructura del Proyecto

```
TIERRATOSTADA/
├── 📁 db/
│   └── 📄 db.json                 # Base de datos JSON con eventos, usuarios, etc.
├── 📁 pages/
│   ├── 📄 index.html              # Página principal con carousel y eventos
│   ├── 📄 login.html              # Página de autenticación
│   └── 📄 admin.html              # Panel de administración
├── 📁 src/
│   ├── 📁 js/
│   │   ├── 📄 main.js             # Archivo principal de inicialización
│   │   ├── 📄 admin.js            # Lógica del panel de administración
│   │   ├── 📄 auth.js             # Sistema de autenticación
│   │   ├── 📄 events.js           # Gestión de eventos
│   │   ├── 📄 forms.js            # Manejo de formularios
│   │   ├── 📄 notifications.js    # Sistema de notificaciones
│   │   ├── 📄 purchase.js         # Proceso de compra de entradas
│   │   └── 📄 ui.js               # Componentes de interfaz
│   └── 📁 styles/
│       └── 📄 tailwind.config.js  # Configuración de Tailwind CSS
├── 📄 package.json                # Dependencias y scripts del proyecto
├── 📄 package-lock.json           # Lock file de dependencias
└── 📄 README.md                   # Este archivo
```

## 🎯 Tipos de Eventos Disponibles

La plataforma maneja diversos tipos de eventos relacionados con el café:

- **Cata de Café Premium** - Experiencias sensoriales con cafés de origen
- **Taller de Molido Artesanal** - Técnicas de molido perfecto
- **Preparación con Métodos Alternativos** - V60, Chemex, AeroPress
- **Latte Art para Principiantes** - Fundamentos del arte latte
- **Historia del Café Colombiano** - Tradiciones y cultura cafetera
- **Café y Maridaje** - Combinaciones gastronómicas
- **Barismo Avanzado** - Técnicas profesionales
- **Tostado Casero** - Proceso de tostado artesanal
- **Café y Sostenibilidad** - Responsabilidad social y ambiental
- **Cold Brew y Café Frío** - Preparaciones en frío
- **Café y Cultura Mundial** - Tradiciones internacionales

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/tierra-tostada.git
   cd tierra-tostada
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm start
   ```

   Este comando iniciará:
   - **Vite Dev Server** en `http://localhost:5173`
   - **JSON Server** en `http://localhost:3000`

### Scripts Disponibles

```bash
# Desarrollo (ambos servidores)
npm start

# Solo servidor de desarrollo Vite
npm run dev

# Solo JSON Server
npm run json-server

# Construcción para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Café**: Tonos cálidos y terrosos (#a18072, #846358, etc.)
- **Crema**: Colores suaves y acogedores (#fefdfb, #fef7ed, etc.)
- **Gradientes**: Transiciones suaves entre tonos de café y crema

### Tipografía
- **Inter**: Fuente moderna y legible para toda la aplicación
- **Pesos**: 300, 400, 500, 600, 700 para diferentes jerarquías

### Componentes UI
- **Cards**: Diseño de tarjetas para eventos con sombras y bordes redondeados
- **Botones**: Estilos consistentes con hover effects y transiciones
- **Modales**: Ventanas emergentes para detalles y formularios
- **Navegación**: Menú responsive con animaciones suaves

## 🔧 Funcionalidades del Sistema

### Para Usuarios
- **Exploración de Eventos**: Navegación por categorías y filtros
- **Registro en Eventos**: Inscripción a eventos gratuitos y pagos
- **Suscripción a Newsletter**: Recibir notificaciones de nuevos eventos
- **Contacto**: Formulario de contacto para consultas
- **Responsive Design**: Experiencia optimizada en todos los dispositivos

### Para Administradores
- **Dashboard Completo**: Estadísticas en tiempo real
- **Gestión de Eventos**: CRUD completo de eventos
- **Gestión de Suscripciones**: Administración de newsletter
- **Gestión de Mensajes**: Sistema de comunicación con usuarios
- **Reportes de Ventas**: Seguimiento de entradas vendidas
- **Gestión de Asistentes**: Control de participación en eventos

## 📊 Estructura de Datos

### Eventos
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "image": "string (URL)",
  "date": "ISO 8601",
  "status": "active|inactive",
  "type": "free|paid",
  "price": "number",
  "sponsors": ["array"]
}
```

### Usuarios
```json
{
  "id": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "admin|user"
}
```

### Suscripciones
```json
{
  "id": "string",
  "email": "string",
  "date": "ISO 8601",
  "status": "active|inactive"
}
```

## 🌐 API Endpoints

El proyecto utiliza JSON Server para simular una API REST:

- `GET /events` - Obtener todos los eventos
- `POST /events` - Crear nuevo evento
- `PUT /events/:id` - Actualizar evento
- `DELETE /events/:id` - Eliminar evento
- `GET /subscriptions` - Obtener suscripciones
- `POST /subscriptions` - Crear suscripción
- `GET /users` - Obtener usuarios
- `POST /users` - Crear usuario

## 🚀 Despliegue

### Desarrollo Local
```bash
npm start
```

### Producción
```bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/` y pueden ser desplegados en cualquier servidor web estático.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**¡Disfruta explorando el mundo del café con Tierra Tostada! ☕✨**
