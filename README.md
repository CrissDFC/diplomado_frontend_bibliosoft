# SIGEB Frontend

SPA en React para la gestión bibliotecaria de SIGEB. Proporciona autenticación, navegación y operaciones de catálogo, préstamos y usuarios consumiendo la API REST del backend.

## Tecnologías

- React 19 y React Router.
- Vite.
- API Fetch con JWT.
- CSS responsive sin dependencias visuales adicionales.

## Requisitos

- Node.js 22 o posterior.
- Backend ejecutándose en `http://localhost:3000`.

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se abre normalmente en `http://localhost:5173`.

`.env` debe contener:

```dotenv
VITE_API_URL=http://localhost:3000/api
```

## Verificación

```bash
npm test
npm run lint
npm run build
```

## Despliegue con Docker

La imagen usa dos etapas: Node.js 22 compila y verifica el proyecto; Nginx sirve únicamente los archivos estáticos finales. La configuración de Nginx incluye fallback a `index.html` para React Router.

### 1. Definir la API pública

El archivo `.env.production` está ignorado por Git y se entrega por separado. Puede copiarse desde el ejemplo:

```bash
cp .env.production.example .env.production
```

Debe contener la URL pública completa del backend, incluyendo `/api`:

```dotenv
VITE_API_URL=https://api.biblioteca.example/api
```

Esta variable se incorpora durante la construcción. No es un secreto, pero cambiarla requiere reconstruir la imagen del frontend.

### 2. Construir la imagen

```bash
docker build \
  --build-arg VITE_API_URL=https://api.biblioteca.example/api \
  -t sigeb-frontend:production .
```

La construcción falla si `VITE_API_URL` está vacío y ejecuta automáticamente pruebas, ESLint y el build de Vite.

### 3. Iniciar el frontend

```bash
docker run -d \
  --name sigeb-frontend \
  --restart unless-stopped \
  -p 8080:80 \
  sigeb-frontend:production
```

La aplicación queda disponible en `http://localhost:8080`.

### 4. Comprobar el contenedor

```bash
curl http://localhost:8080/health
curl -I http://localhost:8080/libros/1
docker inspect --format '{{.State.Health.Status}}' sigeb-frontend
```

`/health` debe responder `200` y una ruta directa como `/libros/1` debe devolver la SPA, no un error 404 de Nginx.

### Archivos excluidos

`.dockerignore` evita copiar dependencias locales, `dist`, `.git`, archivos `.env`, documentación y la antigua base `db.json` dentro de la imagen.

## Módulos y páginas

- Inicio de sesión.
- Registro público de lectores.
- Listado, creación, edición y detalle de libros.
- Listado, creación, edición y detalle de préstamos.
- Gestión administrativa de usuarios.

## Autorización

- Administrador: acceso completo.
- Bibliotecario: libros y préstamos; consulta usuarios para prestar.
- Lector: catálogo y préstamos propios.

La interfaz oculta rutas y acciones no autorizadas, pero el backend vuelve a comprobar cada permiso.

## Componentes reutilizables

- Navbar y Footer.
- Card, Button, Alert y Loader.
- Formularios, tablas y filtros por módulo.

## API falsa anterior

`db.json` y el script `npm run api` se conservan únicamente como referencia de la primera entrega. La segunda entrega consume el backend Express configurado en `VITE_API_URL`.
