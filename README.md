# Task Manager Microfrontends

Un sistema de gestión de tareas construido con arquitectura de microfrontends usando React, Vite y Module Federation.

## 🏗️ Arquitectura

Este proyecto está dividido en 4 microfrontends independientes:

### 1. **Shell App** (Puerto 3000)
- **Propósito**: Aplicación host que orquesta todos los microfrontends
- **Responsabilidades**: 
  - Enrutamiento principal
  - Integración de microfrontends
  - Layout principal
  - Gestión de estado global

### 2. **Auth Microfrontend** (Puerto 3001)
- **Propósito**: Manejo de autenticación y autorización
- **Componentes expuestos**:
  - `LoginPage`: Página de inicio de sesión
  - `AuthProvider`: Contexto de autenticación
- **Funcionalidades**:
  - Login/Logout
  - Gestión de estado de usuario
  - Protección de rutas

### 3. **Task Management** (Puerto 3002)
- **Propósito**: Gestión completa de tareas
- **Componentes expuestos**:
  - `TaskList`: Lista de tareas con funcionalidades CRUD
  - `TaskModal`: Modal para crear/editar tareas
  - `TaskProvider`: Contexto de gestión de tareas
- **Funcionalidades**:
  - Crear, editar, eliminar tareas
  - Marcar tareas como completadas
  - Filtrado y ordenamiento
  - Gestión de prioridades

### 4. **Dashboard Microfrontend** (Puerto 3003)
- **Propósito**: Panel de control y visualización de datos
- **Componentes expuestos**:
  - `DashboardPage`: Página principal del dashboard
  - `TaskChart`: Gráficos y estadísticas
  - `Sidebar`: Navegación lateral
- **Funcionalidades**:
  - Estadísticas de tareas
  - Gráficos de progreso
  - Navegación del sistema
  - Actividad reciente

## 🚀 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Module Federation** - Compartición de código entre microfrontends
- **Tailwind CSS** - Framework de estilos
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Zustand** - Gestión de estado local
- **Wouter** - Enrutamiento ligero
- **Recharts** - Gráficos y visualizaciones

## 📦 Estructura del Proyecto

```
task-manager-microfrontends/
├── shell-app/                 # Aplicación host
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── providers/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── auth-microfrontend/        # Microfrontend de autenticación
│   ├── src/
│   │   ├── components/
│   │   ├── providers/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── task-management/           # Microfrontend de gestión de tareas
│   ├── src/
│   │   ├── components/
│   │   ├── providers/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── dashboard-microfrontend/   # Microfrontend del dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── start-all.ps1             # Script para iniciar todos los servicios
└── README.md
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- PowerShell (para Windows)

### Instalación Automática

1. **Clonar el repositorio**:
   ```bash
   git clone <repository-url>
   cd task-manager-microfrontends
   ```

2. **Ejecutar el script de inicio** (Windows):
   ```powershell
   .\start-all.ps1
   ```

   Este script:
   - Instala las dependencias en todos los microfrontends
   - Inicia todos los servicios en paralelo
   - Abre cada microfrontend en una ventana de PowerShell separada

### Instalación Manual

1. **Instalar dependencias en cada microfrontend**:
   ```bash
   # Shell App
   cd shell-app
   npm install
   
   # Auth Microfrontend
   cd ../auth-microfrontend
   npm install
   
   # Task Management
   cd ../task-management
   npm install
   
   # Dashboard Microfrontend
   cd ../dashboard-microfrontend
   npm install
   ```

2. **Iniciar cada servicio** (en terminales separadas):
   ```bash
   # Terminal 1 - Shell App
   cd shell-app
   npm run dev
   
   # Terminal 2 - Auth Microfrontend
   cd auth-microfrontend
   npm run dev
   
   # Terminal 3 - Task Management
   cd task-management
   npm run dev
   
   # Terminal 4 - Dashboard Microfrontend
   cd dashboard-microfrontend
   npm run dev
   ```

## 🌐 URLs de Acceso

- **Aplicación Principal**: http://localhost:3000
- **Auth Microfrontend**: http://localhost:3001
- **Task Management**: http://localhost:3002
- **Dashboard Microfrontend**: http://localhost:3003

## 🔧 Configuración de Module Federation

Cada microfrontend está configurado para exponer componentes específicos:

### Shell App (Host)
```javascript
federation({
  name: 'shell',
  remotes: {
    auth: 'http://localhost:3001/assets/remoteEntry.js',
    tasks: 'http://localhost:3002/assets/remoteEntry.js',
    dashboard: 'http://localhost:3003/assets/remoteEntry.js'
  }
})
```

### Auth Microfrontend
```javascript
federation({
  name: 'auth',
  filename: 'remoteEntry.js',
  exposes: {
    './LoginPage': './src/components/LoginPage',
    './AuthProvider': './src/providers/AuthProvider'
  }
})
```

### Task Management
```javascript
federation({
  name: 'tasks',
  filename: 'remoteEntry.js',
  exposes: {
    './TaskList': './src/components/TaskList',
    './TaskModal': './src/components/TaskModal',
    './TaskProvider': './src/providers/TaskProvider'
  }
})
```

### Dashboard Microfrontend
```javascript
federation({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './DashboardPage': './src/pages/DashboardPage',
    './TaskChart': './src/components/TaskChart',
    './Sidebar': './src/components/Sidebar'
  }
})
```

## 🎯 Funcionalidades Principales

### Autenticación
- Login con email y contraseña
- Gestión de sesión
- Protección de rutas
- Estado de autenticación compartido

### Gestión de Tareas
- Crear nuevas tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar como completadas
- Filtrado por estado y prioridad
- Validación de formularios

### Dashboard
- Estadísticas en tiempo real
- Gráficos de progreso
- Navegación del sistema
- Actividad reciente
- Sidebar responsivo

## 🔄 Flujo de Datos

1. **Shell App** actúa como orquestador principal
2. **AuthProvider** maneja el estado de autenticación globalmente
3. **TaskProvider** gestiona el estado de las tareas
4. Los componentes se comunican a través de contextos compartidos
5. Module Federation permite la carga dinámica de componentes

## 🧪 Desarrollo

### Agregar Nuevos Componentes

1. Crear el componente en el microfrontend correspondiente
2. Exportarlo en `vite.config.ts` bajo `exposes`
3. Importarlo en el Shell App
4. Actualizar los tipos TypeScript si es necesario

### Debugging

- Cada microfrontend puede desarrollarse independientemente
- Usar las herramientas de desarrollo de React
- Verificar la consola para errores de Module Federation
- Asegurar que todos los servicios estén ejecutándose

## 📝 Scripts Disponibles

En cada microfrontend:

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 🚀 Despliegue

Para producción:

1. Construir cada microfrontend:
   ```bash
   npm run build
   ```

2. Desplegar cada `dist` folder en servidores separados

3. Actualizar las URLs de los remotes en la configuración de producción

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Soporte

Si encuentras algún problema:

1. Verifica que todos los servicios estén ejecutándose
2. Revisa la consola del navegador para errores
3. Asegúrate de que las dependencias estén instaladas
4. Verifica que los puertos no estén en uso por otras aplicaciones

---

**Desarrollado usando React y Module Federation**