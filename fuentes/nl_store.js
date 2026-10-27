/* ===== Tienda urbana B/N (se ejecuta dentro del menú público) ===== */
(function(){
'use strict';
var RM=false;try{RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}
function P(){try{return window.parent.NL_PUB||null;}catch(e){return null;}}
function CAT(){try{return window.parent.RAVE_API.catalog();}catch(e){return null;}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c];});}
function money(n){return '$ '+Math.round(n).toLocaleString('es-AR');}
function q1(s,r){return (r||document).querySelector(s);}
function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}
var D=null,FAMS={},ORDER=[],ME={},UNIT='cm';
var DIMN={pecho:'Pecho',cintura:'Cintura',cadera:'Cadera',pie:'Largo del pie',altura:'Altura'};
var DIMH={pecho:'Rodeá la parte más ancha del pecho, con la cinta paralela al piso.',cintura:'Medí en la parte más angosta del torso, sin apretar.',cadera:'Rodeá la parte más ancha de la cadera.',pie:'Parate sobre una hoja y medí del talón al dedo más largo (cm).',altura:'Descalza/o y de espaldas a la pared.'};
function loadMe(){try{ME=JSON.parse(localStorage.getItem('nl.me')||'{}')||{};}catch(e){ME={};}if(!ME.pref)ME.pref='regular';}
function saveMe(){try{localStorage.setItem('nl.me',JSON.stringify(ME));}catch(e){}}
function mNum(){var m={pref:ME.pref||'regular'};['pecho','cintura','cadera','altura','pie'].forEach(function(k){var v=parseFloat(String(ME[k]||'').replace(',','.'));if(v>0)m[k]=v;});return m;}
/* ---- datos agrupados por modelo ---- */
function build(){
  var c=CAT();D=c&&c.nl;FAMS={};ORDER=[];if(!D)return false;
  (c.productos||[]).forEach(function(p){if(!p.nl)return;var n=p.nl,f=FAMS[n.fam];
    if(!f){var def=D.fams[n.fam]||{};f=FAMS[n.fam]={id:n.fam,name:p.nom,cat:p.cat,price:p.precio,def:def,colors:[],v:{},sizes:(D.sizes[def.chart]||[]),total:0};ORDER.push(n.fam);}
    if(f.colors.indexOf(n.color)<0)f.colors.push(n.color);
    (f.v[n.color]=f.v[n.color]||{})[n.talle]={id:p.id,n:n.n};f.total+=n.n;});
  return ORDER.length>0;}
function colHex(k){return (D.col[k]||['',"#999"])[1];}
function colName(k){return (D.col[k]||[k])[0];}
function sizeInfo(f,color,sz){var o=(f.v[color]||{})[sz];return o||{id:'',n:0};}
function colorStock(f,color){var t=0;f.sizes.forEach(function(s){t+=sizeInfo(f,color,s).n;});return t;}
/* ---- talle recomendado ---- */
function recFor(fam){var p=P(),m=mNum();if(!p)return null;var f=FAMS[fam];if(!f||!f.def.dims)return null;
  var has=f.def.dims.some(function(d){return m[d]>0;});if(!has)return null;
  var r=p.fit(fam,m);if(!r||!r.best)return null;return{size:r.best,rows:r.rows,note:r.note,missing:r.missing};}
/* ---- ilustración plana de la prenda ---- */
function garment(fam,hex,cat){
  var S='stroke="#0a0a0a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"',F='fill="'+hex+'"',d='';
  var tee='M60 42L86 28Q100 44 114 28L140 42L170 76L150 94L142 84L142 178L58 178L58 84L50 94L30 76Z';
  if(fam==='rem-rib')d='<path d="M64 40L86 28Q100 42 114 28L136 40L160 70L142 84L136 76L136 140L64 140L64 76L58 84L40 70Z" '+F+' '+S+'/>';
  else if(cat==='nl-rem')d='<path d="'+tee+'" '+F+' '+S+'/><path d="M86 28Q100 44 114 28" fill="none" '+S+'/>';
  else if(cat==='nl-cam')d='<path d="'+tee+'" '+F+' '+S+'/><path d="M100 40V178M86 28L100 52L114 28" fill="none" '+S+'/><circle cx="106" cy="90" r="2" fill="#0a0a0a"/><circle cx="106" cy="120" r="2" fill="#0a0a0a"/><circle cx="106" cy="150" r="2" fill="#0a0a0a"/>';
  else if(fam==='sho-den')d='<path d="M62 52L138 52L148 130L108 130L100 92L92 130L52 130Z" '+F+' '+S+'/><path d="M62 52H138V64H62Z" fill="none" '+S+'/>';
  else if(cat==='nl-pan')d='<path d="M62 36L138 36L148 208L108 208L100 90L92 208L52 208Z" '+F+' '+S+'/><path d="M62 36H138V50H62Z" fill="none" '+S+'/><path d="M100 50V90" fill="none" '+S+'/>';
  else if(fam==='pol-ple')d='<path d="M70 62L130 62L168 206L32 206Z" '+F+' '+S+'/><path d="M70 62H130V74H70Z" fill="none" '+S+'/><path d="M84 74L62 206M100 74V206M116 74L138 206" fill="none" '+S+' opacity=".5"/>';
  else if(cat==='nl-ves')d='<path d="M76 30L90 30Q100 44 110 30L124 30L130 86L164 208L36 208L70 86Z" '+F+' '+S+'/><path d="M70 86H130" fill="none" '+S+'/>';
  else if(fam==='tap-pan')d='<path d="M62 34L88 24Q100 38 112 24L138 34L172 168L150 174L138 112L140 214L60 214L62 112L50 174L28 168Z" '+F+' '+S+'/><path d="M100 38V214" fill="none" '+S+'/><circle cx="108" cy="90" r="3" fill="#0a0a0a"/><circle cx="108" cy="130" r="3" fill="#0a0a0a"/>';
  else if(cat==='nl-abr')d='<path d="M62 36L88 26Q100 40 112 26L138 36L170 150L148 156L136 104L136 198L64 198L64 104L52 156L30 150Z" '+F+' '+S+'/><path d="M80 150H120L126 176H74Z" fill="none" '+S+'/><path d="M88 26L92 54M112 26L108 54" fill="none" '+S+'/>';
  else if(fam==='acc-cin')d='<path d="M14 98H186V122H14Z" '+F+' '+S+'/><rect x="82" y="90" width="36" height="40" rx="4" fill="#fff" '+S+'/><circle cx="150" cy="110" r="2.5" fill="#0a0a0a"/><circle cx="162" cy="110" r="2.5" fill="#0a0a0a"/>';
  else if(fam==='acc-buf')d='<path d="M52 40Q100 70 148 40L156 70Q100 100 44 70Z" '+F+' '+S+'/><path d="M118 82L136 188L108 188L96 90Z" '+F+' '+S+'/><path d="M112 168H132M110 178H130" fill="none" '+S+'/>';
  else if(fam==='acc-car')d='<path d="M66 92Q100 14 134 92" fill="none" '+S+'/><rect x="40" y="90" width="120" height="92" rx="10" '+F+' '+S+'/><path d="M40 118H160" fill="none" '+S+'/><circle cx="100" cy="118" r="6" fill="#fff" '+S+'/>';
  else if(cat==='nl-cal')d='<path d="M26 150Q26 112 56 100L86 120Q128 124 164 142Q184 152 176 172L26 172Z" '+F+' '+S+'/><path d="M26 172H176" fill="none" '+S+'/><path d="M86 120L96 108M100 126L110 112" fill="none" '+S+'/><path d="M30 164H174" fill="none" '+S+' opacity=".5"/>';
  else d='<path d="'+tee+'" '+F+' '+S+'/>';
  return '<svg viewBox="0 0 200 230" role="img" aria-hidden="true">'+d+'</svg>';}
/* ---- grilla por modelo ---- */
function tile(f,opts){
  var first=f.colors[0],hex=colHex(first);var low=f.total>0&&f.total<=6;
  var rec=recFor(f.id),yt='';
  if(rec){var any=f.colors.some(function(c){return sizeInfo(f,c,rec.size).n>0;});yt='<span class="nl-yt">Tu talle '+esc(rec.size)+(any?'':' · agotado')+'</span>';}
  var dots=f.colors.slice(0,5).map(function(c){return '<i class="nl-dot" style="background:'+esc(colHex(c))+'" title="'+esc(colName(c))+'"></i>';}).join('');
  var szs=f.sizes.length>1?f.sizes[0]+' – '+f.sizes[f.sizes.length-1]:'Talle único';
  var b=f.total<=0?'<span class="nl-badge out">Sin stock</span>':(low?'<span class="nl-badge">Últimas unidades</span>':'');
  return '<button type="button" class="nl-tile" data-fam="'+esc(f.id)+'" data-q="'+esc((f.name+' '+f.colors.map(colName).join(' ')).toLowerCase())+'" aria-label="'+esc(f.name+', desde '+money(f.price)+', '+f.colors.length+' colores')+'">'+
   '<span class="nl-vis">'+garment(f.id,hex,f.cat)+b+yt+'</span><span class="nl-meta"><span class="nl-nm">'+esc(f.name)+'</span><span class="nl-pr">'+money(f.price)+'</span>'+
   '<span class="nl-dots">'+dots+(f.colors.length>5?'+':'')+'</span><span class="nl-szs">'+esc(szs)+'</span></span></button>';}
var IO=null;
function reveal(root){var els=qa('.nl-tile:not(.in)',root);if(RM||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
  if(!IO)IO=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){var i=en.target;setTimeout(function(){i.classList.add('in');},(parseInt(i.getAttribute('data-i'),10)||0)%6*60);IO.unobserve(i);}});},{rootMargin:'0px 0px -30px 0px'});
  els.forEach(function(e,i){e.setAttribute('data-i',i);IO.observe(e);});}
function paintGrid(){
  if(!build())return;document.body.classList.add('nl-on');
  qa('.nl-grid').forEach(function(g){g.remove();});
  qa('#catalogo-menu .section[data-cat]').forEach(function(sec){var cat=sec.getAttribute('data-cat');
    var ids=ORDER.filter(function(i){return FAMS[i].cat===cat;});if(!ids.length)return;
    var g=document.createElement('div');g.className='nl-grid';g.innerHTML=ids.map(function(i){return tile(FAMS[i]);}).join('');
    var head=q1('.section-head',sec);head&&head.parentNode?head.parentNode.insertBefore(g,head.nextSibling):sec.appendChild(g);
    var cnt=document.getElementById('count-'+cat);if(cnt)cnt.textContent=ids.length;});
  var all=document.getElementById('count-all');if(all)all.textContent=ORDER.length;
  reveal(document);meBtn();filterGrid();}
function filterGrid(){
  var term=((q1('#search-input')||{}).value||'').trim().toLowerCase();var chip=q1('.cat-chip.active');var act=chip?chip.getAttribute('data-cat'):'all';
  var anyVis=false;
  qa('#catalogo-menu .section[data-cat]').forEach(function(sec){var g=q1('.nl-grid',sec);if(!g)return;var vis=0;
    qa('.nl-tile',g).forEach(function(t){var ok=!term||t.getAttribute('data-q').indexOf(term)>=0;t.style.display=ok?'':'none';if(ok)vis++;});
    var show=(act==='all'||act===sec.getAttribute('data-cat'))&&vis>0;sec.style.display=show?'':'none';if(show)anyVis=true;});
  var em=document.getElementById('search-empty');if(em)em.style.display=(!anyVis&&term)?'block':'none';}
/* ---- botón Mis medidas ---- */
function meBtn(){var old=q1('.nl-me');if(old)old.remove();var anchor=q1('#cat-filter');if(!anchor)return;
  var b=document.createElement('button');b.type='button';b.className='nl-me';var have=Object.keys(mNum()).length>1;
  b.innerHTML='Mis medidas <small>'+(have?'· cargadas, ver talles':'· encontrá tu talle')+'</small>';b.addEventListener('click',function(){openMe(null);});
  anchor.parentNode.insertBefore(b,anchor);}
/* ---- ficha de producto ---- */
var ST={fam:'',color:'',size:'',tab:'p',open:false,last:null},pdp,sticky,meBox,live;
function mk(){
  pdp=document.createElement('div');pdp.id='nl-pdp';pdp.setAttribute('role','dialog');pdp.setAttribute('aria-modal','true');pdp.setAttribute('aria-label','Ficha de producto');
  sticky=document.createElement('div');sticky.className='nl-sticky';
  meBox=document.createElement('div');meBox.id='nl-me';meBox.setAttribute('role','dialog');meBox.setAttribute('aria-modal','true');meBox.setAttribute('aria-label','Mis medidas');
  live=document.createElement('div');live.className='nl-sr';live.setAttribute('role','status');live.setAttribute('aria-live','polite');
  document.body.appendChild(pdp);document.body.appendChild(sticky);document.body.appendChild(meBox);document.body.appendChild(live);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(meBox.classList.contains('open'))closeMe();else if(ST.open)closePDP();}});}
function say(t){if(live){live.textContent='';setTimeout(function(){live.textContent=t;},30);}}
function openPDP(fam,from){var f=FAMS[fam];if(!f)return;ST.fam=fam;ST.last=from||document.activeElement;
  var rec=recFor(fam);
  ST.color=f.colors.filter(function(c){return colorStock(f,c)>0;})[0]||f.colors[0];ST.size=f.sizes.length===1?f.sizes[0]:'';ST.tab='p';ST.open=true;
  pdp.innerHTML='<div class="nl-in"><div class="nl-bar"><button type="button" class="nl-x" id="nl-back" aria-label="Volver a la tienda">←</button><span class="nl-crumb">Tienda / '+esc(catName(f.cat))+' / '+esc(f.name)+'</span><button type="button" class="nl-x" id="nl-sh" aria-label="Compartir">↗</button></div>'+
   '<div class="nl-colL"><div class="nl-gal" id="nl-gal"><div class="nl-sk"></div></div><div class="nl-tabs" role="tablist" id="nl-tabs"><button type="button" class="nl-tab" role="tab" data-t="p" aria-selected="true">Prenda</button><button type="button" class="nl-tab" role="tab" data-t="b" aria-selected="false">En el cuerpo</button></div></div>'+
   '<div class="nl-body"><h2 class="nl-h">'+esc(f.name)+'</h2><p class="nl-price" id="nl-pr">'+money(f.price)+'</p><p class="nl-sub">Precios con impuestos incluidos. Datos y fotos de ejemplo.</p>'+
   (f.colors.length>1?'<div class="nl-lbl">Color <span id="nl-cn"></span></div><div class="nl-sws" role="radiogroup" aria-label="Color" id="nl-sws"></div>':'<div class="nl-lbl">Color <span>'+esc(colName(f.colors[0]))+'</span></div>')+
   (f.sizes.length>1?'<div class="nl-lbl">Talle <button type="button" class="nl-link" id="nl-gol">Guía de talles</button></div><div class="nl-sizes" role="radiogroup" aria-label="Talle" id="nl-szs"></div><div id="nl-sznote"></div>':'')+
   '<div class="nl-lbl">Cómo calza <span class="nl-ex">EJEMPLO</span></div><div class="nl-fb" id="nl-fb"></div>'+
   '<button type="button" class="nl-btn ghost full" id="nl-find" style="margin-top:14px">'+(rec?'Ajustar mis medidas':'¿Qué talle soy? Cargá tus medidas')+'</button>'+
   '<div class="nl-acc">'+(f.sizes.length>1?'<details id="nl-guide"><summary>Guía de talles</summary><div class="pnl" id="nl-gt"></div></details>':'')+
   '<details><summary>Envíos y cambios</summary><div class="pnl">Retiro en el local o envío a coordinar por WhatsApp. Envío bonificado desde '+money(D.free)+' (ejemplo). Cambios por talle según la política del local (ejemplo).</div></details>'+
   '<details><summary>Cuidado de la prenda</summary><div class="pnl">Lavar del revés con agua fría. No usar secadora. Planchar a temperatura media (texto de ejemplo).</div></details></div>'+
   '<div class="nl-lbl">Combina con</div><div class="nl-look" id="nl-look"></div></div></div>';
  pdp.classList.add('open');sticky.classList.add('show');pdp.scrollTop=0;document.documentElement.style.overflow='hidden';
  q1('#nl-back').addEventListener('click',closePDP);q1('#nl-sh').addEventListener('click',share);
  q1('#nl-tabs').addEventListener('click',function(e){var b=e.target.closest('.nl-tab');if(!b)return;ST.tab=b.getAttribute('data-t');qa('.nl-tab').forEach(function(t){t.setAttribute('aria-selected',t===b?'true':'false');});paintGal(true);});
  var sw=q1('#nl-sws');sw&&sw.addEventListener('click',function(e){var b=e.target.closest('.nl-sw');if(!b)return;ST.color=b.getAttribute('data-c');paintColors();paintSizes();paintGal(true);paintCTA();});
  var sz=q1('#nl-szs');sz&&sz.addEventListener('click',function(e){var b=e.target.closest('.nl-chip');if(!b)return;ST.size=b.getAttribute('data-s');paintSizes();paintGal(true);paintCTA();paintGuide();buzz();say('Talle '+ST.size+(b.classList.contains('out')?', agotado':''));});
  var gol=q1('#nl-gol');gol&&gol.addEventListener('click',function(){var g=q1('#nl-guide');g.open=true;g.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});});
  q1('#nl-find').addEventListener('click',function(){openMe(fam);});
  q1('#nl-look').addEventListener('click',function(e){var t=e.target.closest('.nl-tile');if(t)openPDP(t.getAttribute('data-fam'),ST.last);});
  paintColors();paintSizes();paintFb();paintGuide();paintLook();paintCTA();
  setTimeout(function(){paintGal(false);},RM?0:280);
  setTimeout(function(){try{q1('#nl-back').focus({preventScroll:true});}catch(e){}},60);}
function catName(c){var h=q1('.section[data-cat="'+c+'"] .section-head h2');return h?h.textContent:'Tienda';}
function closePDP(){ST.open=false;pdp.classList.remove('open');sticky.classList.remove('show');document.documentElement.style.overflow='';try{ST.last&&ST.last.focus&&ST.last.focus({preventScroll:true});}catch(e){}}
function buzz(){try{navigator.vibrate&&navigator.vibrate(10);}catch(e){}}
function share(){var t=FAMS[ST.fam].name+' · New Look';try{if(navigator.share){navigator.share({title:t,url:location.href});return;}}catch(e){}try{navigator.clipboard.writeText(location.href);}catch(e){}flash('Enlace copiado');}
function flash(t){var el=document.getElementById('rv-toast');if(el){el.textContent=t;el.classList.add('show');clearTimeout(flash._t);flash._t=setTimeout(function(){el.classList.remove('show');},2200);}say(t);}
function paintGal(anim){var g=q1('#nl-gal');if(!g||!ST.open)return;var f=FAMS[ST.fam];
  if(ST.tab==='p'){g.classList.remove('av');g.innerHTML=garment(f.id,colHex(ST.color),f.cat);}
  else{g.classList.add('av');var p=P();var m=mNum();var sz=ST.size||(recFor(f.id)||{}).size||f.sizes[Math.floor(f.sizes.length/2)];
    g.innerHTML=p?p.avatar(f.id,ST.color,sz,m):'';var cap=document.createElement('div');cap.style.cssText='position:absolute;left:8px;bottom:8px;background:#fff;border:1.5px solid #0a0a0a;font:700 10px var(--txt);letter-spacing:.06em;text-transform:uppercase;padding:5px 7px';
    cap.textContent=(Object.keys(m).length>1?'Con tus medidas':'Medidas de referencia')+' · talle '+sz;g.appendChild(cap);}
  var cn=q1('#nl-cn');if(cn)cn.textContent=colName(ST.color);}
function paintColors(){var w=q1('#nl-sws');if(!w)return;var f=FAMS[ST.fam];
  w.innerHTML=f.colors.map(function(c){return '<button type="button" class="nl-sw" role="radio" aria-checked="'+(c===ST.color)+'" data-c="'+esc(c)+'" aria-label="'+esc(colName(c)+(colorStock(f,c)>0?'':', sin stock'))+'"><i style="background:'+esc(colHex(c))+'"></i></button>';}).join('');
  var cn=q1('#nl-cn');if(cn)cn.textContent=colName(ST.color);}
function paintSizes(){var w=q1('#nl-szs');if(!w)return;var f=FAMS[ST.fam];var rec=recFor(f.id);
  w.innerHTML=f.sizes.map(function(s){var i=sizeInfo(f,ST.color,s);var out=i.n<=0;var small=out?'Agotado':(i.n<=2?'Quedan '+i.n:'');
    var row=rec&&rec.rows.filter(function(r){return r.size===s;})[0];
    return '<button type="button" class="nl-chip'+(out?' out':'')+(rec&&rec.size===s?' rec':'')+'" role="radio" aria-checked="'+(ST.size===s)+'" data-s="'+esc(s)+'" aria-label="'+esc('Talle '+s+(out?', agotado':(i.n<=2?', quedan '+i.n:''))+(rec&&rec.size===s?', tu talle recomendado':''))+'">'+esc(s)+'<small>'+small+'</small></button>';}).join('');
  var n=q1('#nl-sznote');if(!n)return;var h='';
  if(rec&&ST.size){var row=rec.rows.filter(function(r){return r.size===ST.size;})[0];if(row){h='<div class="nl-note"><b>Talle '+esc(ST.size)+':</b> '+esc(row.label)+(rec.size===ST.size?' · es tu talle recomendado.':' · tu talle recomendado es el <b>'+esc(rec.size)+'</b>.')+(rec.note&&rec.note.length?'<br><span style="font-weight:400">'+esc(rec.note[0])+'</span>':'')+'</div>';}}
  else if(rec){h='<div class="nl-note">Según tus medidas, te recomendamos el talle <b>'+esc(rec.size)+'</b>.</div>';}
  n.innerHTML=h;}
function paintFb(){var b=q1('#nl-fb');if(!b)return;var d=D.fb&&D.fb[ST.fam];if(!d||d.n<8){b.innerHTML='<p class="nl-sub">Todavía hay pocas opiniones de calce.</p>';return;}
  var ok=Math.max(0,d.n-d.chico-d.grande);var pc=function(x){return Math.round(x/d.n*100);};
  var msg=pc(d.chico)>=25?'Tiende a quedar <b>chico</b>: si dudás, pedí el talle siguiente.':(pc(d.grande)>=15?'Tiende a quedar <b>grande</b>: si dudás, pedí el talle anterior.':'Calza <b>como el talle indica</b> para la mayoría.');
  b.innerHTML='<div class="nl-fbar" role="img" aria-label="'+pc(ok)+'% calza normal, '+pc(d.chico)+'% chico, '+pc(d.grande)+'% grande"><i style="width:'+pc(ok)+'%"></i><i style="width:'+pc(d.chico)+'%"></i><i style="width:'+pc(d.grande)+'%"></i></div>'+
   '<div class="nl-fleg"><span><i class="lg a"></i>Normal '+pc(ok)+'%</span><span><i class="lg b"></i>Chico '+pc(d.chico)+'%</span><span><i class="lg c"></i>Grande '+pc(d.grande)+'%</span></div><p class="nl-sub" style="margin-top:8px">'+msg+' Base: '+d.n+' compras (ejemplo).</p>';}
function paintGuide(){var w=q1('#nl-gt');if(!w)return;var f=FAMS[ST.fam];var ch=D.chart[f.def.chart];var dims=(f.def.dims&&f.def.dims.length)?f.def.dims:[];var rec=recFor(f.id);
  if(!dims.length){w.innerHTML='<p>Esta prenda no tiene tabla de medidas.</p>';return;}
  var k=UNIT==='in'?0.3937:1;var fx=function(v){return (v*k).toFixed(UNIT==='in'?1:(f.def.chart==='calz'?1:0)).replace('.',',');};
  w.innerHTML='<div class="nl-seg" role="group" aria-label="Unidad"><button type="button" data-u="cm" aria-pressed="'+(UNIT==='cm')+'">cm</button><button type="button" data-u="in" aria-pressed="'+(UNIT==='in')+'">in</button></div>'+
   '<table class="nl-gt"><caption class="nl-sr">Medidas del cuerpo por talle</caption><thead><tr><th scope="col">Talle</th>'+dims.map(function(d){return '<th scope="col">'+esc(DIMN[d])+'</th>';}).join('')+'</tr></thead><tbody>'+
   f.sizes.map(function(s){var cl=(rec&&rec.size===s)?'hl':(ST.size===s?'sel':'');return '<tr class="'+cl+'"><th scope="row" style="background:none;color:inherit;font-size:13px">'+esc(s)+'</th>'+dims.map(function(d){return '<td>'+fx((ch[s]||{})[d]||0)+'</td>';}).join('')+'</tr>';}).join('')+'</tbody></table>'+
   '<p class="nl-sub" style="margin-top:8px">Son medidas del <b>cuerpo</b>, no de la prenda. Si estás entre dos talles: '+(f.def.stretch?'la prenda es elástica, elegí el menor':'elegí el mayor para más comodidad')+'.</p>';
  w.onclick=function(e){var b=e.target.closest('[data-u]');if(b){UNIT=b.getAttribute('data-u');paintGuide();}};}
function paintLook(){var w=q1('#nl-look');if(!w)return;var f=FAMS[ST.fam];var cats=ORDER.map(function(i){return FAMS[i];}).filter(function(x){return x.cat!==f.cat&&x.total>0;});
  var pick=[];var seen={};cats.forEach(function(x){if(!seen[x.cat]&&pick.length<4){seen[x.cat]=1;pick.push(x);}});
  w.innerHTML=pick.map(function(x){var t=tile(x);return t.replace('class="nl-tile"','class="nl-tile in"');}).join('');}
function cartQty(id){var el=document.querySelector('.card[data-id="'+id+'"]');var q=el&&el.querySelector('.qty-val');return q?(parseInt(q.textContent,10)||0):0;}
function paintCTA(){var f=FAMS[ST.fam];if(!f){return;}var i=ST.size?sizeInfo(f,ST.color,ST.size):null;var out=i&&i.n<=0;var inCart=i?cartQty(i.id):0;var cap=i&&i.n>0&&inCart>=i.n;
  var label,mode;
  if(!ST.size){label='Elegí tu talle';mode='pick';}
  else if(out){label='Avisarme cuando vuelva';mode='notify';}
  else if(cap){label='Ya tenés todo el stock';mode='cap';}
  else{label='Agregar al carrito';mode='add';}
  sticky.innerHTML='<div class="tot"><small>Total</small>'+money(f.price)+'</div><button type="button" class="nl-btn" id="nl-cta" data-m="'+mode+'"'+(mode==='cap'?' aria-disabled="true"':'')+'>'+label+(inCart?'  ·  '+inCart+' en el carrito':'')+'</button>';
  q1('#nl-cta').addEventListener('click',onCTA);}
function onCTA(e){var m=this.getAttribute('data-m'),f=FAMS[ST.fam];
  if(m==='pick'){var w=q1('#nl-szs');if(w){w.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'});if(!RM){w.classList.remove('nl-shake');void w.offsetWidth;w.classList.add('nl-shake');}}flash('Elegí un talle para continuar');return;}
  if(m==='cap'){flash('Llegaste al stock disponible de este talle');return;}
  if(m==='notify'){showNotify();return;}
  var i=sizeInfo(f,ST.color,ST.size);var card=document.querySelector('.card[data-id="'+i.id+'"]');var plus=card&&card.querySelector('.qty-btn.plus');
  if(!plus){flash('No pudimos agregar la prenda');return;}
  plus.click();buzz();flyTo(this);var btn=this;
  btn.classList.add('done');btn.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg> Agregado';say('Agregado: '+f.name+', '+colName(ST.color)+', talle '+ST.size);
  setTimeout(function(){if(ST.open)paintCTA();},1300);}
function flyTo(btn){var bar=document.getElementById('cart-bar');
  var go=function(){var tb=document.getElementById('cart-bar');if(!tb)return;tb.classList.remove('nl-bump');void tb.offsetWidth;tb.classList.add('nl-bump');};
  if(RM||!bar||!btn.getBoundingClientRect||!btn.animate){setTimeout(go,50);return;}
  var a=btn.getBoundingClientRect(),z=bar.getBoundingClientRect();var d=document.createElement('div');d.className='nl-fly';d.style.left=(a.left+a.width/2-9)+'px';d.style.top=(a.top+a.height/2-9)+'px';document.body.appendChild(d);
  var dx=(z.left+z.width/2)-(a.left+a.width/2),dy=(z.top+10)-(a.top+a.height/2);
  var an=d.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:'translate('+dx*0.6+'px,'+(dy-90)+'px) scale(.8)',opacity:1,offset:.55},{transform:'translate('+dx+'px,'+dy+'px) scale(.3)',opacity:.4}],{duration:620,easing:'cubic-bezier(.4,0,.2,1)'});
  an.onfinish=function(){d.remove();go();};}
function showNotify(){var f=FAMS[ST.fam];var n=q1('#nl-sznote');if(!n)return;var saved='';try{saved=localStorage.getItem('nl.contact')||'';}catch(e){}
  n.innerHTML='<div class="nl-nf"><b style="text-transform:uppercase;font:700 12px var(--txt);letter-spacing:.08em">Talle '+esc(ST.size)+' · '+esc(colName(ST.color))+' agotado</b><p class="nl-sub" style="margin:4px 0 0">Dejanos tu WhatsApp o mail y te avisamos cuando vuelva (demo: queda registrado en el panel).</p>'+
   '<label class="nl-sr" for="nl-ct">WhatsApp o mail</label><input type="text" id="nl-ct" inputmode="email" autocomplete="off" placeholder="WhatsApp o mail" value="'+esc(saved)+'"><button type="button" class="nl-btn full" id="nl-nsend">Avisarme</button><div id="nl-nmsg" class="nl-sub" role="status" style="margin-top:6px"></div></div>';
  q1('#nl-nsend').addEventListener('click',function(){var v=q1('#nl-ct').value,p=P();var r=p?p.notify({fam:ST.fam,color:ST.color,talle:ST.size,contact:v}):{err:'No disponible'};var m=q1('#nl-nmsg');
    if(r.err){m.textContent='⚠ '+r.err;return;}try{localStorage.setItem('nl.contact',v);}catch(e){}
    q1('.nl-nf').innerHTML='<b style="font:700 13px var(--txt);text-transform:uppercase;letter-spacing:.06em">✓ Listo, te avisamos</b><p class="nl-sub" style="margin:4px 0 0">Registramos el pedido del talle '+esc(ST.size)+' ('+esc(colName(ST.color))+').</p>';say('Aviso registrado');buzz();});
  q1('#nl-ct').focus();}
/* ---- Mis medidas ---- */
var MEFAM=null;
function openMe(fam){MEFAM=fam;var f=fam?FAMS[fam]:null;var dims=f&&f.def.dims&&f.def.dims.length?f.def.dims.slice():['pecho','cintura','cadera','pie'];if(!f)dims=['pecho','cintura','cadera','pie'];
  var h='<h3>Mis medidas</h3><p class="nl-sub">'+(f?'Para '+esc(f.name)+'. ':'')+'Las guardamos sólo en este dispositivo y las usamos para sugerirte el talle en cada prenda.</p><div class="nl-mf"><div class="g">'+
   ['altura'].concat(dims).filter(function(d,i,a){return a.indexOf(d)===i;}).map(function(d){return '<div><label for="me-'+d+'">'+esc(DIMN[d])+' (cm)</label><input type="number" inputmode="decimal" step="0.5" min="0" max="250" id="me-'+d+'" value="'+esc(ME[d]||'')+'"><div class="hint">'+esc(DIMH[d])+'</div></div>';}).join('')+'</div>'+
   '<label for="me-pref">Cómo te gusta que calce</label><input type="range" class="nl-rng" id="me-pref" min="0" max="2" step="1" value="'+({ajustado:0,regular:1,holgado:2}[ME.pref]||1)+'" aria-valuetext="'+esc(ME.pref||'regular')+'"><div class="nl-rl"><span>Ajustado</span><span>Regular</span><span>Holgado</span></div>'+
   '<div style="display:flex;gap:8px;margin-top:16px"><button type="button" class="nl-btn ghost" id="me-x">Cerrar</button><button type="button" class="nl-btn full" id="me-ok">Ver mi talle</button></div><p class="nl-sub" id="me-msg" role="status" style="margin-top:8px"></p></div>';
  meBox.innerHTML='<div class="box">'+h+'</div>';meBox.classList.add('open');
  q1('#me-x').addEventListener('click',closeMe);meBox.addEventListener('click',function(e){if(e.target===meBox)closeMe();});
  var rg=q1('#me-pref');rg.addEventListener('input',function(){var v=['ajustado','regular','holgado'][+rg.value];rg.setAttribute('aria-valuetext',v);});
  q1('#me-ok').addEventListener('click',function(){qa('#nl-me input[type=number]').forEach(function(i){var k=i.id.replace('me-','');ME[k]=i.value;});ME.pref=['ajustado','regular','holgado'][+rg.value];saveMe();
    var msg=q1('#me-msg');var m=mNum();if(Object.keys(m).length<=1){msg.textContent='Cargá al menos una medida para sugerirte talle.';return;}
    closeMe();meBtn();paintGrid();if(ST.open){var r=recFor(ST.fam);if(r&&!ST.size){ST.size=r.size;}paintSizes();paintGal(false);paintCTA();paintGuide();flash(r?'Tu talle: '+r.size:'Medidas guardadas');}else flash('Medidas guardadas');});
  setTimeout(function(){var i=q1('#nl-me input');i&&i.focus();},60);}
function closeMe(){meBox.classList.remove('open');}
/* ---- carrito: pasos y envío bonificado ---- */
function cartExtras(){var pn=document.getElementById('cart-panel');if(!pn||pn.querySelector('.nl-steps')||!D)return;
  var st=document.createElement('div');st.className='nl-steps';st.innerHTML='<span class="on">1 · Tu pedido</span><span>2 · Entrega</span><span>3 · Confirmás por WhatsApp</span>';pn.insertBefore(st,pn.firstChild);
  var fr=document.createElement('div');fr.className='nl-free';fr.id='nl-free';var tr=pn.querySelector('.cp-total-row');tr&&tr.parentNode.insertBefore(fr,tr.nextSibling);
  var upd=function(){var t=window.RAVE_CART_TOTAL||0;var left=D.free-t;var el=document.getElementById('nl-free');if(!el)return;
    el.innerHTML=(t<=0?'Envío bonificado desde '+money(D.free)+' (ejemplo).':(left>0?'Te faltan <b>'+money(left)+'</b> para el envío bonificado (ejemplo).':'<b>¡Tenés envío bonificado!</b> (ejemplo)'))+'<div class="tr"><i style="width:'+Math.min(100,Math.round(t/D.free*100))+'%"></i></div>';};
  var tv=document.getElementById('cp-total-val');if(tv&&window.MutationObserver)new MutationObserver(upd).observe(tv,{childList:true,characterData:true,subtree:true});upd();}
/* ---- arranque ---- */
function init(){
  if(!CAT()||!P())return;loadMe();mk();paintGrid();if(!D)return;cartExtras();
  document.addEventListener('click',function(e){var t=e.target.closest&&e.target.closest('.nl-grid .nl-tile');if(t){openPDP(t.getAttribute('data-fam'),t);}});
  var si=q1('#search-input');si&&si.addEventListener('input',filterGrid);
  document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.cat-chip'))setTimeout(filterGrid,0);});
  var r0=window.RAVE_MENU_REFRESH;window.RAVE_MENU_REFRESH=function(){if(r0)r0();setTimeout(function(){if(!q1('.nl-grid'))paintGrid();else{filterGrid();}},0);};
  var rr=window.RAVE_MENU_RENDER;window.RAVE_MENU_RENDER=function(){if(rr)rr();paintGrid();if(ST.open&&!FAMS[ST.fam])closePDP();};
  window.NL_STORE={open:function(f){openPDP(f);},fams:function(){return ORDER.slice();}};}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
