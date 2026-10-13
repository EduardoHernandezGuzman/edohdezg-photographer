# Portfolio de EdoHdezG

Portfolio fotográfico de **Eduardo Hernández Guzmán (EdoHdezG)**: retrato y fotografía de calle en blanco y negro y color.

**En línea**: https://eduardohernandezguzman.github.io/edohdezg-photographer/

## Secciones

- **Sobre mí**: enfoque del autor y su forma de trabajar.
- **Proyectos**: tres galerías — _Imagines Viae_, _Homines in Albo et Nigro_ y _Homines in Colore_ — con visor de fotos a tamaño completo.
- **Contacto**: email y redes sociales.

## Tecnologías

HTML5, CSS3 y JavaScript vanilla (módulos ES). Sin frameworks en runtime:

- Fuentes auto-hospedadas (Oswald, Merriweather y Bebas Neue).
- Imágenes en AVIF con fallback WebP/JPG y `srcset`, generadas con sharp.
- Scroll reveal con IntersectionObserver y visor con `<dialog>` nativo.

## Estructura

```
├── index.html              # página única
├── 404.html                # página 404 (GitHub Pages)
├── css/
│   ├── style.css           # estilos del sitio (tokens, layout, componentes)
│   ├── fonts.css           # declaraciones @font-face
│   └── no-js.css           # fallback sin JavaScript
├── js/                     # módulos ES
│   ├── main.js             # punto de entrada
│   ├── animations.js       # scroll reveal (IntersectionObserver)
│   ├── contact.js          # hidratación del email
│   ├── footer.js           # año dinámico
│   ├── lightbox.js         # visor de fotos
│   ├── menu.js             # menú overlay accesible
│   └── navigation.js       # topbar, scrollspy y volver arriba
├── fonts/                  # woff2 auto-hospedadas y sus licencias
├── img/                    # originales (fuente)
│   └── opt/                # derivados AVIF/WebP/JPG generados con sharp
└── scripts/
    ├── optimize-images.mjs # pipeline de imágenes
    └── og-card.html        # plantilla de la imagen social (1200×630)
```

## Scripts

| Comando                   | Descripción                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run dev`             | Sirve el sitio en `http://localhost:3000`.                        |
| `npm run format`          | Formatea el proyecto con Prettier.                                |
| `npm run format:check`    | Comprueba el formato sin modificar archivos.                      |
| `npm run optimize:images` | Regenera `img/opt/` (AVIF/WebP/JPG en 400–1800px, sin upscaling). |

Para regenerar la imagen social (`og-image.jpg`), abre `scripts/og-card.html` en el navegador y captura la vista de 1200×630.

## Despliegue

El sitio se publica en **GitHub Pages** mediante GitHub Actions (`.github/workflows/deploy.yml`): cada push a `master` despliega automáticamente.

La primera vez hay que activarlo en **Settings → Pages → Source: GitHub Actions**.

## Calidad

- **Accesibilidad**: 100 en Lighthouse (alt descriptivos, foco visible, menú y visor operables por teclado, soporte de `prefers-reduced-motion`).
- **Rendimiento**: ~250 KB de carga inicial y menos de 1 MB con la página completa (19 imágenes AVIF desde 21 MB de originales).
- **Seguridad**: CSP restrictiva y sin dependencias externas en runtime.

## Historial de mejoras

1. **Cimientos**: tooling de desarrollo (Prettier, servidor local) y formato.
2. **Seguridad**: CDNs auto-hospedados, SVGs inline, enlaces seguros y email ofuscado.
3. **Accesibilidad**: HTML semántico, textos alternativos, menú accesible y CSP.
4. **Organización**: módulos ES, design tokens, IntersectionObserver y CSS Grid propio (sin Bootstrap).
5. **Rendimiento**: pipeline con sharp, AVIF/WebP + `srcset` y lazy loading.
6. **UX**: lightbox nativo, topbar con scrollspy, hero fluido y footer.
7. **SEO y despliegue**: metadatos, Open Graph, JSON-LD y GitHub Pages.

## Licencia

El **código** se distribuye bajo licencia MIT (ver [`LICENSE`](./LICENSE)). Las **fotografías** no están cubiertas por esa licencia: © Eduardo Hernández Guzmán, todos los derechos reservados.

## Contacto

- Email: edohdezg@gmail.com
