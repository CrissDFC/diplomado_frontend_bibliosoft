# SIGEB Frontend

SPA en React para gestión de biblioteca, integrada con SIGEB Backend.

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
