# Urban · Salta Capital — Demo (Sistema VB sobre la demo final V26.29)

Archivo único `index.html` (HTML5/PWA; funciona sin servidor ni conexión, los datos quedan en el navegador). Panel: `#acceso` — ADMIN 1234 · Supervisor 1111 · Mostrador 0000. Tienda pública: `#menu`.

Estilo **minimalista y de alta moda**: fondos neutros (blanco, piedra y negro entero), mucho espacio en blanco, líneas finas, tipografías Cormorant Garamond y Jost embebidas, y la prenda como protagonista.

## Novedades de esta versión
- **Base actualizada** a la demo final V26.29 (tema claro/oscuro, gráficos del Resumen, carga de factura) con todas sus funciones.
- **Tienda pública por modelo**: 19 tarjetas en vez de 190 variantes, búsqueda por nombre o color, chips por categoría.
- **Ficha de producto para resolver el talle**: stock real por talle (`Quedan 2`, agotado), «Tu talle» según tus medidas, **Mis medidas** con slider de calce, guía de talles en cm/pulgadas, «Cómo calza» (compras y devoluciones por talle), vista «En el cuerpo», **Avisarme cuando vuelva** (queda en Moda → Tablero de moda), CTA fijo y «Combina con».
- **Carrito**: pedido con prenda, color y talle, tope por stock, barra de envío bonificado (umbral de ejemplo) y pasos del checkout.
- **Microinteracciones** sobrias (entrada escalonada con fundido lento, relleno del talle, vuelo al carrito, esqueleto, temblor si falta el talle) con soporte de `prefers-reduced-motion`.
- Corrección: la puerta de edad heredada de la base dejaba la tienda no interactiva aunque estuviera oculta; ahora no se activa en este rubro.
- Todo lo anterior de moda: Probador y looks, Moda (talles y stock), Pedidos online y envíos, Talleres y producción, Tablero de moda, Cliente 360 y promos.

## Menú con la estructura de Tienda Nube (V26.30)
El panel se reordenó como el administrador de Tiendanube y cada ítem agrupa las funciones del Sistema VB que ya existían (como pestañas), más lo nuevo:

| Sección | Ítems → qué contiene |
|---|---|
| (arriba) | **Inicio** (Resumen) · **Estadísticas** (Tablero de moda + *Ventas por canal*, nuevo) |
| Gestión | **Ventas** (todas las ventas con filtros y CSV, pedidos online, caja, arqueo, cajas cerradas, sucursales; globo = pedidos por atender) · **Productos** (inventario, talles y stock, compras, talleres, importar/exportar) · **Pago Nube** (liquidación por medio de pago, comisiones y plazos editables, cuotas) · **Envío Nube** (envíos de los pedidos, zonas y tarifas, envío gratis, retiro, cotizador) · **Clientes** · **Descuentos** (cupones, promociones y Cliente 360) · **Marketing** (audiencias + mensaje por WhatsApp, avisos de reposición) |
| Canales de venta | **Tienda online** (tienda pública, diseño, *Tiendanube y conexiones*, legal) · **Punto de Venta** · **Chat** (bandeja con respuestas rápidas) · **Instagram y Facebook**, **Google Shopping**, **ChatGPT Ads**, **TikTok**, **Pinterest** (cuenta, pasos de activación y feed de productos en CSV con el stock real) · **WhatsApp** (links y mensajes rápidos) · **Marketplaces** (recargo de precio y % de stock por marketplace, CSV) |
| Aplicaciones | **Aplicaciones** (listado) · **Ruleta y Gamificación** (premios y probabilidades; cada premio con descuento crea un cupón de un solo uso en Descuentos) · **Andreani** y **Correo Argentino** (cotizador, etiqueta/guía simulada, despacho) |
| Configuración | General, usuarios y permisos, personal, tareas, nube, auditoría |

Cómo está armado: `fuentes/ur_menu.js` + `fuentes/ur_menu.css` y el script idempotente `fuentes/patch_ur.py`, que los inyecta en `index.html` (`python3 fuentes/patch_ur.py`). El estado nuevo vive en `S.ur` (el estado de la integración Tiendanube del sistema base sigue en `S.tn`). «Pedidos PedidosYa» quedó fuera del menú porque no aplica al rubro; la pantalla sigue en el código.

Pruebas (`fuentes/ur_test.py`, Chromium): recorrido de las 46 pantallas del menú sin errores de consola, pestañas y resaltado del menú, filtros y CSV de ventas, recálculo de comisiones, cotizador por zona, etiqueta + despacho, ruleta (cupones de un solo uso en Descuentos), campañas, chat, feeds CSV, conexión de canales y marketplaces, persistencia al recargar y 7 pantallas en 390 px sin desborde.

Límites de esta parte: las cuentas de canales, los transportistas, los procesadores de pago y los marketplaces son **simulados** (no hay conexión real); tarifas, comisiones y plazos son de ejemplo; los feeds CSV usan un formato base que conviene validar con cada plataforma antes de subirlo; la ruleta se prueba desde el panel (todavía no se muestra en la tienda pública); los parámetros de Pago Nube estiman liquidaciones pero no filtran los medios del mostrador.

## Diseño visual de indumentaria (V26.31)
- **Paleta propia del rubro** en tienda y panel: hueso `#F4EFE7`, arena `#E7DDCF`, tinta `#1D1B19` y arcilla `#B4553A` como acento (se mantiene el modo oscuro del panel). Logo «URBAN» con fondo transparente.
- **La imagen manda**: tarjetas de formato vertical con fondo de estudio y cambio a la vista de espalda al pasar el mouse. La ficha tiene carrusel con deslizamiento, miniaturas y vistas de **frente, espalda, detalle de la tela y «en el cuerpo»**, más **zoom** (rueda, pellizco, doble toque, arrastre, botones +/−) a pantalla completa.
- **Fotos y video reales**: Productos → *Fotos y video* en el panel. Se cargan hasta 6 fotos por modelo (para todos los colores o para un color puntual; se reducen a 1100 px) y un video corto de hasta 5 MB. Cuando hay fotos reemplazan a las ilustraciones; sin fotos la tienda muestra los renders de estudio (ilustraciones, no fotografías).
- **Filtros y orden**: color, talle (combinado con el color y con stock), rango de precio (atajos y mínimo/máximo), solo con stock y orden por precio o A–Z, con contador y chips para quitar cada filtro.
- **Tabla de medidas en cm** abierta en cada ficha (con cm/in y el talle recomendado resaltado), cuotas y medios de pago en la ficha y en el carrito.
- **Envío antes de pagar**: calculador por código postal en la ficha y en el carrito (retiro, Andreani y Correo Argentino, domicilio o sucursal) con las tarifas de Envío Nube; la opción elegida suma al total y viaja en el mensaje del pedido. Valida que se elija una opción y se completen los datos.
- **WhatsApp**: botón flotante en toda la tienda; dentro de una ficha el mensaje ya incluye la prenda, el color y el talle elegidos, y hay un botón «Consultar talle o stock».
- **Mujer / Hombre / Todo**: selector grande arriba de la tienda con contador por sección. Cada modelo tiene género (mujer, hombre o unisex; el unisex aparece en ambas secciones) y las categorías y contadores se ajustan a la sección elegida. Se sumaron 8 modelos de hombre (remera boxy, polo piqué, camisa oxford, jean recto, pantalón cargo, bermuda, campera bomber y botín de cuero) con tabla de talles masculina (S–XXL, 38–48, 40–45). Los feeds de canales incluyen género, y Estadísticas suma «Ventas por sección».
- **Celular primero**: grilla de 2 columnas, filtros en hoja inferior, objetivos táctiles de al menos 44 px y sin desborde horizontal.

Límites: los renders son ilustraciones hasta que se carguen fotografías; no se probó en Safari ni en celulares físicos; tarifas, cuotas y medios de pago son de ejemplo y no hay conexión con pasarelas ni transportistas reales. Pruebas: `fuentes/ur_store_test.py` (tienda) y `fuentes/ur_test.py` (panel).

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
- `fuentes/ur_menu.js`, `ur_menu.css`, `patch_ur.py`, `ur_test.py` — menú estilo Tienda Nube (ver arriba).
- `docs/DISENO-UX-UI.md` — flujo, componentes de talle, microinteracciones, paleta y tipografía.
- `fuentes/` — módulos de moda y de tienda (`nl_*.js`, `nl_store.*`, `nl_theme.css`), tipografías con su licencia, script de armado y pruebas Playwright (`urban1.py`, `urban2.py`, `smoke2.py`, `flow.py`). El armado parte de la demo final (`raveholding/raveV2`); las rutas del script son de la máquina donde se construyó.

Desarrollado por VINCULAR BUSINESS · (387) 4484132 · vincularbusiness@gmail.com · «Tu idea, en buenas manos.»
