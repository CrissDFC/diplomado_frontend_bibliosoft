# Responsive Overflow Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Evitar que las tablas ensanchen el documento en tablet y celular.

**Architecture:** Corregir el tamaño mínimo automático del único elemento grid compartido por las vistas afectadas. Mantener las tablas y sus componentes sin cambios y reutilizar el desplazamiento horizontal CSS existente.

**Tech Stack:** React, CSS, Vite, navegador integrado.

---

### Task 1: Restringir el contenedor principal

**Files:**
- Modify: `src/styles/global.css:26`

**Step 1: Verificar el fallo actual**

Ejecutar el frontend conectado al backend y medir `document.documentElement.scrollWidth` en `/libros`, `/prestamos` y `/usuarios` con viewports de 768 y 390 píxeles.

Expected: FAIL porque el ancho del documento supera el viewport en las tres rutas.

**Step 2: Implementar la corrección mínima**

Agregar la propiedad al selector existente:

```css
.app-content { min-width: 0; }
```

**Step 3: Verificar la corrección responsive**

Repetir las mediciones en 1280, 768 y 390 píxeles.

Expected: `document.documentElement.scrollWidth <= window.innerWidth` en las tres rutas, con scroll horizontal contenido dentro de cada tabla cuando sea necesario.

**Step 4: Ejecutar verificaciones del proyecto**

Run: `npm test && npm run lint && npm run build`

Expected: 10 pruebas aprobadas, ESLint sin errores y build exitoso.

**Step 5: Commit**

```bash
git add src/styles/global.css docs/plans/2026-07-17-responsive-overflow-fix.md
git commit -m "fix: contain responsive tables"
```
