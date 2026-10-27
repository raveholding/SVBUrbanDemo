/* ===== Avisos de reposición (pedidos desde la ficha) + guía de diseño urbano ===== */
function nlNotifyCard(){const n=NL();const L=n.notify.slice().reverse();
 const row=x=>{const f=nlFamMap()[x.fam]||{name:x.fam};const p=S.products.find(q=>q.fam===x.fam&&q.color===x.color&&q.talle===x.talle);const st=p?Math.max(0,(p.stock||0)+((p.loc&&p.loc.onl)||0)):0;
  const dig=String(x.contact).replace(/\D/g,'');const msg=encodeURIComponent('Hola! Volvió el '+f.name+' ('+nlColName(x.color)+', talle '+x.talle+') que habías pedido (mensaje de ejemplo).');
  const link=dig.length>=8?`<a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/${dig}?text=${msg}">Avisar por WhatsApp</a>`:`<a class="btn sm" href="mailto:${esc(x.contact)}?subject=${encodeURIComponent('Volvió tu prenda')}&body=${msg}">Avisar por mail</a>`;
  return `<tr><td>${fmtDT(x.ts)}</td><td>${esc(f.name)} · ${esc(nlColName(x.color))} · ${esc(x.talle)}</td><td>${esc(x.contact)}</td><td class="r">${st}</td><td>${st>0?link:'<span class="mut sm">sin stock todavía</span>'} <button class="btn sm ghost" data-act="nlNotifyDel" data-id="${x.id}" aria-label="Quitar aviso">✕</button></td></tr>`;};
 return `<div class="card"><h3>Avisos de reposición pedidos desde la tienda <span class="tag sim">ejemplo</span></h3><p class="sm mut">Cada vez que alguien toca «Avisarme cuando vuelva» en un talle agotado queda acá. Cuando entra stock, avisás con un toque. Es demanda real de talles que hoy no podés vender: sirve para decidir qué reponer.</p>
 <div class="tw"><table><thead><tr><th>Cuándo</th><th>Prenda</th><th>Contacto</th><th class="r">Stock online</th><th></th></tr></thead><tbody>${L.slice(0,25).map(row).join('')||'<tr><td colspan="5" class="mut">Todavía nadie pidió aviso. Probalo desde la tienda: elegí un talle agotado.</td></tr>'}</tbody></table></div></div>`;}
A.nlNotifyDel=el=>{const n=NL();n.notify=n.notify.filter(x=>x.id!==el.dataset.id);save();rerender();};

/* ===== Guía de diseño UX/UI (identidad urbana en blanco y negro) ===== */
Object.assign(IC,{pen:'M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z'});
const nlDs={chip:'M',done:false};
const NLDS_FLOW=[
 ['1 · Descubrir','Portada con buscador, chips por categoría y «Mis medidas». Prendas agrupadas por modelo (19 en vez de 190 variantes).','Entran por Instagram/WhatsApp; la tienda abre en la grilla, no en un formulario.'],
 ['2 · Explorar','Tarjeta por modelo: precio, colores, rango de talles, «Últimas unidades» y «Tu talle M» si ya cargaste medidas.','Filtrar por categoría y buscar por color o nombre. Sin login.'],
 ['3 · Ficha (PDP)','Prenda y «En el cuerpo», color, talle con stock real, calce según compras, guía cm/in, «Combina con».','Es la pantalla que decide: ahí se resuelve la duda de talle.'],
 ['4 · Carrito','Barra fija con cantidad y total; pedido con prenda, color y talle; envío bonificado con barra de avance.','Se puede volver a la ficha sin perder el carrito.'],
 ['5 · Entrega y cupón','Retiro, envío local o a otra provincia; cupón de la tarjeta de cliente.','Costos visibles antes de confirmar.'],
 ['6 · Confirmación','Pedido por WhatsApp: el local confirma stock y cobro (link de pago simulado en la demo).','No se simula un pago: se confirma con una persona.'],
 ['7 · Post-compra','Aviso cuando vuelve un talle, cambio por talle y devoluciones con motivo que alimentan el «cómo calza».','Cada devolución mejora la próxima recomendación.']];
const NLDS_PDP=[
 ['Selector de talle con stock','Un botón por talle: disponible, «Quedan 2», agotado (tachado, pero tocable para pedir aviso). Mínimo 52 px de alto.','En la demo'],
 ['Talle recomendado','Etiqueta «TU TALLE» calculada con tus medidas y tu preferencia de calce (motor de calce de la demo).','En la demo'],
 ['Mis medidas','Altura, pecho, cintura, cadera y pie, guardadas sólo en el dispositivo. Se cargan una vez y valen para todas las prendas.','En la demo'],
 ['Slider de calce','Ajustado · Regular · Holgado: desplaza la recomendación de talle.','En la demo'],
 ['Guía de talles','Tabla del cuerpo por talle, fila del talle recomendado resaltada, cm/pulgadas, nota sobre estar entre dos talles.','En la demo'],
 ['Cómo calza (comunidad)','Barra normal / chico / grande y una frase accionable («tiende a quedar chico: pedí el siguiente»). Se alimenta con devoluciones por talle.','En la demo (base de ejemplo + devoluciones reales)'],
 ['Vista «En el cuerpo»','Muñeco a escala de tus medidas con la prenda, el color y el talle elegidos. No es una foto ni reemplaza probarse la prenda.','En la demo'],
 ['Avisarme cuando vuelva','Captura contacto en el talle agotado y lo muestra en el tablero para reponer y avisar.','En la demo'],
 ['CTA fijo','Siempre visible: «Elegí tu talle» → «Agregar al carrito» → «Agregado ✓». Si el talle está agotado cambia a «Avisarme».','En la demo']];
const NLDS_MICRO=[
 ['Entrada de la grilla','Las tarjetas aparecen escalonadas al entrar en pantalla (fade + 14 px).','450 ms · ease-out'],
 ['Tarjeta al tocar','Se levanta con sombra dura de 4 px (hover) y se hunde al presionar.','120–200 ms'],
 ['Abrir la ficha','Hoja que sube desde abajo; la ilustración entra con escala 94 → 100 %.','340 ms'],
 ['Elegir talle','«Pop» del botón (escala 0,9 → 1,07 → 1), cambio a negro y vibración corta en celulares.','300 ms'],
 ['Cambio de color','La prenda se redibuja con fundido; el círculo de color gana anillo.','450 ms'],
 ['Intentar agregar sin talle','La botonera de talles tiembla y el scroll la centra; el mensaje se anuncia por voz.','400 ms'],
 ['Agregar al carrito','Un cuadrado vuela hasta la barra del carrito, la barra rebota y el botón confirma con ✓.','620 ms + 450 ms'],
 ['Envío bonificado','La barra de avance crece con cada prenda y cambia el mensaje al llegar al umbral.','500 ms'],
 ['Carga','Esqueleto con brillo mientras se prepara la ilustración.','≈ 280 ms']];
function nlDesignHTML(){
 const sw=(h,n,t,tx)=>`<div style="flex:1;min-width:120px;background:${h};color:${tx};border:1.5px solid #0a0a0a;padding:14px 10px"><b style="font-size:.95rem">${n}</b><div class="sm" style="opacity:.85">${h.toUpperCase()}</div><div class="sm">${t}</div></div>`;
 return `<style>.nlds .dsc{border:1.5px solid var(--ink);padding:14px;margin:.6rem 0;background:var(--card)}.nlds table{width:100%}.nlds .chips{display:flex;gap:8px;flex-wrap:wrap;margin:.6rem 0}.nlds .dc{min-width:54px;min-height:48px;border:1.5px solid var(--ink);background:var(--card);font-weight:700;cursor:pointer;color:var(--ink);transition:transform .12s,background .2s,color .2s}.nlds .dc:active{transform:scale(.92)}.nlds .dc[aria-checked=true]{background:var(--ink);color:var(--card);animation:nldsPop .3s}.nlds .dc.out{opacity:.5;text-decoration:line-through}.nlds .cta{min-height:52px;padding:0 20px;background:var(--ink);color:var(--card);border:1.5px solid var(--ink);font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:background .2s,color .2s}.nlds .cta.done{background:var(--card);color:var(--ink)}@keyframes nldsPop{0%{transform:scale(.9)}60%{transform:scale(1.08)}100%{transform:scale(1)}}.nlds .flow{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px}.nlds .flow>div{border:1.5px solid var(--ink);padding:10px;background:var(--card)}.nlds .flow b{font-family:Anton,Impact,sans-serif;letter-spacing:.04em;text-transform:uppercase;font-weight:400;font-size:1.05rem}@media(prefers-reduced-motion:reduce){.nlds *{animation:none!important;transition:none!important}}</style>
 <div class="nlds"><div class="row"><h1 class="sp">Diseño urbano · guía UX/UI</h1><a class="btn gold" href="#menu" target="_blank" rel="noopener">Abrir la tienda y probar la ficha</a></div>
 <p class="mut">Cómo está pensada la tienda para una marca de ropa urbana en blanco y negro: flujo, ficha de producto para resolver el talle, animaciones, paleta y tipografía. Todo lo que figura «En la demo» ya funciona en la tienda pública de esta demo (datos de ejemplo).</p>
 <div class="dsc"><h2>1 · Flujo de usuario: del descubrimiento al pago</h2><div class="flow">${NLDS_FLOW.map(([a,b,c])=>`<div><b>${a}</b><p class="sm" style="margin:.3rem 0">${b}</p><p class="sm mut" style="margin:0">${c}</p></div>`).join('')}</div>
  <p class="sm mut" style="margin-top:.6rem">Fricciones que ataca el diseño: no saber el talle (guía + «tu talle» + calce de otros), talle agotado (aviso en vez de perder la venta), no saber el costo de envío (barra y opciones antes de confirmar), perder el carrito al mirar otra prenda (carrito persistente y ficha superpuesta).</p></div>
 <div class="dsc"><h2>2 · Ficha de producto: componentes para el problema del talle</h2><div class="tw"><table><thead><tr><th>Componente</th><th>Qué hace</th><th>Estado</th></tr></thead><tbody>${NLDS_PDP.map(([a,b,c])=>`<tr><td><b>${a}</b></td><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody></table></div></div>
 <div class="dsc"><h2>3 · Microinteracciones</h2><div class="tw"><table><thead><tr><th>Momento</th><th>Qué pasa</th><th>Duración</th></tr></thead><tbody>${NLDS_MICRO.map(([a,b,c])=>`<tr><td><b>${a}</b></td><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody></table></div>
  <p class="sm mut">Con «reducir movimiento» activado en el dispositivo, todo se muestra sin animar (fundidos y vuelos desactivados). Probá abajo:</p>
  <div role="radiogroup" aria-label="Talle de prueba" class="chips">${['XS','S','M','L','XL'].map(s=>`<button type="button" class="dc ${s==='XL'?'out':''}" role="radio" aria-checked="${nlDs.chip===s}" data-act="nlDsChip" data-s="${s}">${s}</button>`).join('')}</div>
  <button type="button" class="cta ${nlDs.done?'done':''}" data-act="nlDsAdd">${nlDs.done?'✓ Agregado':'Agregar al carrito'}</button></div>
 <div class="dsc"><h2>4 · Paleta y tipografía</h2><div style="display:flex;flex-wrap:wrap;gap:8px">${sw('#0a0a0a','Negro tinta','Texto, botones, bordes','#fff')}${sw('#ffffff','Blanco','Fondo y lienzo','#0a0a0a')}${sw('#f4f4f4','Humo','Fondo de ilustraciones','#0a0a0a')}${sw('#e4e4e4','Cemento','Líneas suaves','#0a0a0a')}${sw('#6e6e6e','Asfalto','Texto secundario','#fff')}</div>
  <p class="sm">Contraste: blanco sobre negro 19,8 : 1 · asfalto sobre blanco 5,1 : 1 (ambos superan AA). Reglas: sin sombras difusas, bordes de 1,5 px, esquinas rectas, sombra dura de 4 px sólo en hover. <b>El color lo ponen las prendas</b>: la interfaz queda en blanco y negro para que el producto sea lo único con color. Las alertas se resuelven con forma y texto (tachado, rayado, «Quedan 2»), nunca sólo con color.</p>
  <div style="margin:.6rem 0"><div style="font-family:Anton,Impact,sans-serif;font-size:2.4rem;letter-spacing:.03em;text-transform:uppercase;line-height:1">Anton · Titulares</div><div class="sm mut">Condensada, mayúsculas, interlineado 1,0, tracking +3 %. Sólo para títulos y nombres de prenda.</div>
  <div style="font-size:1.1rem;font-weight:700;margin-top:.6rem">Space Grotesk · Texto e interfaz</div><div class="sm mut">400 / 500 / 700. Cuerpo 15–16 px, etiquetas 11–12 px en mayúsculas con tracking +8 %. Precios en 700, sin decimales.</div></div></div>
 <div class="dsc"><h2>5 · Qué medir</h2><p class="sm">Tasa de devolución por talle (tablero de moda) · % de fichas con talle elegido antes de agregar · uso de «Mis medidas» · avisos de reposición por talle · conversión ficha → carrito → pedido. En esta demo sólo hay datos de ejemplo: no son resultados de ningún comercio real.</p></div></div>`;}
reg('diseno','Diseño urbano','pen','sell',()=>nlDesignHTML(),null,'Moda');
A.nlDsChip=el=>{if(el.dataset.s==='XL'){toast('Talle XL agotado (ejemplo): en la tienda se ofrece «Avisarme»');return;}nlDs.chip=el.dataset.s;rerender();};
A.nlDsAdd=()=>{nlDs.done=true;rerender();setTimeout(()=>{nlDs.done=false;if(location.hash.indexOf('diseno')>=0)rerender();},1400);};
