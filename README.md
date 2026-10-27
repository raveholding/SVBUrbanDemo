# New Look Urban · Salta Capital — Demo (Sistema VB sobre la demo final V26.29)

Archivo único `index.html` (HTML5/PWA; funciona sin servidor ni conexión, los datos quedan en el navegador). Panel: `#acceso` — ADMIN 1234 · Supervisor 1111 · Mostrador 0000. Tienda pública: `#menu`.

Identidad **urbana en blanco y negro** (Anton + Space Grotesk embebidas, estilo **Liquid Glass** (superficies de vidrio translúcido con desenfoque, brillo interior y bordes redondeados; el color lo ponen las prendas)). La guía completa de diseño está en [`docs/DISENO-UX-UI.md`](docs/DISENO-UX-UI.md) y dentro del panel, en **Moda → Diseño urbano**.

## Novedades de esta versión
- **Base actualizada** a la demo final V26.29 (tema claro/oscuro, gráficos del Resumen, carga de factura) con todas sus funciones.
- **Tienda pública por modelo**: 19 tarjetas en vez de 190 variantes, búsqueda por nombre o color, chips por categoría.
- **Ficha de producto para resolver el talle**: stock real por talle (`Quedan 2`, agotado), «Tu talle» según tus medidas, **Mis medidas** con slider de calce, guía de talles en cm/pulgadas, «Cómo calza» (compras y devoluciones por talle), vista «En el cuerpo», **Avisarme cuando vuelva** (queda en Moda → Tablero de moda), CTA fijo y «Combina con».
- **Carrito**: pedido con prenda, color y talle, tope por stock, barra de envío bonificado (umbral de ejemplo) y pasos del checkout.
- **Microinteracciones** (entrada escalonada, pop del talle, vuelo al carrito, esqueleto, temblor si falta el talle) con soporte de `prefers-reduced-motion`.
- Corrección: la puerta de edad heredada de la base dejaba la tienda no interactiva aunque estuviera oculta; ahora no se activa en este rubro.
- Todo lo anterior de moda: Probador y looks, Moda (talles y stock), Pedidos online y envíos, Talleres y producción, Tablero de moda, Cliente 360 y promos.

## Pruebas (Chromium real, datos de ejemplo)
| Prueba | Resultado |
|---|---|
| Tienda: grilla, búsqueda, chips, ficha, talle, medidas, guía, agotado + aviso, tope de stock, carrito, Esc, 390 px | 36/36 |
| Panel: aviso en el tablero, demo de diseño, 360 px, objetivos táctiles ≥ 36 px, `reduced-motion`, modo oscuro, sin errores | 10/10 |
| Recorrido de 17 pantallas del panel sin errores de consola | OK |
| Flujo completo (probador → POS con promo y puntos → pedido online → devolución → tablero) | OK |
| Móvil 360 px sin desborde horizontal | OK |

## Límites (honestos)
- Todo dato es de **ejemplo** (precios, stock, «cómo calza», avisos). Nada tiene validez fiscal.
- Link de pago, guías de envío, ARCA y Tiendanube son **simulados**; no hay pagos ni transportistas reales. El pedido se confirma por WhatsApp.
- La vista «En el cuerpo» es un muñeco paramétrico, no una foto ni un probador virtual real.
- «Mis medidas» se guarda sólo en el navegador de la persona; los avisos de reposición quedan en el panel de esta demo (sin envío automático).
- La nube de extremo a extremo y el hardware real no se probaron. Las pruebas son en Chromium; no se probó en Safari ni en celulares físicos.
- No se declara «100 % funcional».

## Estructura del repositorio
- `index.html` — la demo.
- `docs/DISENO-UX-UI.md` — flujo, componentes de talle, microinteracciones, paleta y tipografía.
- `fuentes/` — módulos de moda y de tienda (`nl_*.js`, `nl_store.*`, `nl_theme.css`), tipografías con su licencia, script de armado y pruebas Playwright (`urban1.py`, `urban2.py`, `smoke2.py`, `flow.py`). El armado parte de la demo final (`raveholding/raveV2`); las rutas del script son de la máquina donde se construyó.

Desarrollado por VINCULAR BUSINESS · (387) 4484132 · vincularbusiness@gmail.com · «Tu idea, en buenas manos.»
