# Urban · Diseño UX/UI (minimalista de alta moda)

Marca de moda de Salta Capital con estilo minimalista y de alta moda: exclusividad, orden y elegancia. Todo lo que dice «En la demo» está construido en la tienda pública y en el panel de esta demo. Datos, precios, stock y «cómo calza» son de **ejemplo**.

## 1. Flujo de usuario: del descubrimiento al pago
| Paso | Pantalla | Decisión de diseño |
|---|---|---|
| 1 · Descubrir | Portada de la tienda: logo, buscador, chips de categoría, **Mis medidas** | Entran desde Instagram o WhatsApp; no hay login ni formulario antes de ver prendas. |
| 2 · Explorar | Grilla por **modelo** (19 tarjetas en vez de 190 variantes talle × color) | Precio, colores, rango de talles, «Últimas unidades» y «Tu talle M» si ya cargaron medidas. |
| 3 · Ficha (PDP) | Hoja a pantalla completa: prenda / en el cuerpo, color, talle, calce, guía | Es la pantalla que decide la compra: ahí se resuelve la duda de talle. |
| 4 · Carrito | Barra fija con cantidad y total; panel con el pedido | Cada renglón dice prenda, color y talle. Barra de avance hacia el envío bonificado (umbral de ejemplo). |
| 5 · Entrega y cupón | Retiro, envío local o a otra provincia; cupón | Costos visibles antes de confirmar. |
| 6 · Confirmación | Pedido por WhatsApp | El local confirma stock y cobro. La demo **no** simula un pago real. |
| 7 · Post-compra | Aviso de reposición, cambios, devoluciones por motivo | Las devoluciones «talle chico/grande» alimentan el «cómo calza» de la ficha. |

Fricciones que ataca: no saber el talle, talle agotado (se ofrece aviso en vez de perder la venta), no saber el envío, perder el carrito al mirar otra prenda.

## 2. Componentes de la ficha para resolver el talle (En la demo)
1. **Selector de talle con stock real**: disponible, «Quedan 2», agotado (tachado pero tocable). Mínimo 52 px de alto.
2. **Talle recomendado** («TU TALLE») según tus medidas y tu preferencia de calce.
3. **Mis medidas**: altura, pecho, cintura, cadera y pie; se guardan sólo en el dispositivo.
4. **Slider de calce**: Ajustado · Regular · Holgado.
5. **Guía de talles**: tabla del cuerpo por talle, fila recomendada resaltada, cm / pulgadas.
6. **Cómo calza**: barra normal / chico / grande + frase accionable.
7. **Vista «En el cuerpo»**: muñeco a escala de las medidas con la prenda, color y talle elegidos (guía visual, no reemplaza probarse la prenda).
8. **Avisarme cuando vuelva**: registra el contacto y lo muestra en el Tablero de moda.
9. **CTA fijo**: «Elegí tu talle» → «Agregar al carrito» → «Agregado ✓»; con talle agotado pasa a «Avisarme»; con el stock completo en el carrito se deshabilita.
10. **Combina con**: tarjetas de otras categorías para armar el look.

## 3. Microinteracciones
| Momento | Respuesta | Duración |
|---|---|---|
| Entrada de la grilla | Tarjetas escalonadas con fundido lento | 900 ms |
| Tarjeta | La ilustración se acerca 4 % sin saltos; al presionar baja la opacidad | 1,4 s |
| Abrir la ficha | La hoja sube desde abajo; la prenda entra con escala 94 → 100 % | 340 ms |
| Elegir talle | Relleno negro con fundido y vibración corta en celulares; sin rebotes | 350 ms |
| Cambiar color | La prenda se redibuja con fundido | 450 ms |
| Agregar sin talle | La botonera se sacude apenas y se centra; se anuncia por lector de pantalla | 400 ms |
| Agregar al carrito | Un cuadrado vuela a la barra del carrito, la barra rebota, el botón muestra ✓ | 620 + 450 ms |
| Envío bonificado | La barra de avance crece con cada prenda | 500 ms |
| Carga de la ficha | Esqueleto con brillo | ≈ 280 ms |

Con «reducir movimiento» activado, todo se muestra sin animar. Foco visible en todos los controles, `Esc` cierra la ficha, el selector de talle es un grupo de opciones accesible y los avisos se leen con `aria-live`.

## 4. Paleta y tipografía
| Rol | Color | Uso |
|---|---|---|
| Negro tinta | `#111111` | Texto, botón principal, barra del carrito |
| Blanco | `#FFFFFF` | Fondo y aire |
| Piedra | `#F5F5F3` | Fondo de la prenda |
| Hilo | `#E6E6E3` | Líneas de 1 px |
| Gris humo | `#6F6F6F` | Texto secundario |

Contraste: blanco sobre negro 18,9 : 1; gris humo sobre blanco 5,0 : 1.

Principios: fondos neutros (blanco, piedra y negro entero), **mucho espacio en blanco**, líneas de 1 px en lugar de cajas, sin sombras ni efectos de vidrio, esquinas rectas, botones rectangulares con letras espaciadas, una sola columna de lectura y la **prenda como protagonista** (lo único con color). Las señales (stock, agotado, calce) se resuelven con forma y texto, nunca sólo con color. En el panel interno los indicadores de estado (por ejemplo el velocímetro de la meta) conservan un color funcional de la demo base.

Tipografía: **Cormorant Garamond** (serif de contraste alto, peso fino 300, minúsculas; cursiva para aclaraciones) para títulos y nombres de prenda, y **Jost** (sans geométrica estilo Futura, 300/400) para texto e interfaz, con etiquetas en mayúsculas y tracking +20–26 %. Ambas con licencia SIL OFL y embebidas en el archivo (funciona sin internet).

## 5. Qué medir
Tasa de devolución por talle, % de fichas con talle elegido antes de agregar, uso de «Mis medidas», avisos de reposición por talle, conversión ficha → carrito → pedido. En la demo todo es de ejemplo.
