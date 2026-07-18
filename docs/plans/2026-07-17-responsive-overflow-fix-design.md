# Corrección del desbordamiento responsive

## Problema

Las vistas de libros, préstamos y usuarios superan el ancho del viewport en tablet y celular. Las tres comparten `.app-content`, un elemento hijo del grid cuyo tamaño mínimo automático adopta el ancho intrínseco de las tablas.

## Diseño aprobado

Agregar `min-width: 0` a `.app-content` para permitir que el elemento grid se contraiga al ancho disponible. Las tablas conservarán su regla responsive existente `overflow-x: auto`, por lo que su contenido podrá desplazarse dentro de la página sin ensanchar el documento.

## Alternativas descartadas

- Agregar un contenedor nuevo a cada tabla: requiere modificar componentes que ya comparten la misma causa.
- Convertir las tablas en tarjetas móviles: cambia el diseño y aumenta el alcance sin ser necesario para corregir el defecto.

## Verificación

- Comprobar las rutas de libros, préstamos y usuarios a 1280, 768 y 390 píxeles.
- Confirmar que `document.documentElement.scrollWidth <= window.innerWidth`.
- Ejecutar pruebas, ESLint y build de producción.
