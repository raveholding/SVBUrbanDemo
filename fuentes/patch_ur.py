#!/usr/bin/env python3
"""Aplica el menú estilo Tienda Nube (ur_menu.js / ur_menu.css) sobre index.html. Idempotente: se puede correr de nuevo.
Uso: python3 fuentes/patch_ur.py [ruta/index.html]"""
import re,sys,os
here=os.path.dirname(os.path.abspath(__file__))
path=sys.argv[1] if len(sys.argv)>1 else os.path.join(here,'..','index.html')
s=open(path,encoding='utf-8').read()
js=open(os.path.join(here,'ur_menu.js'),encoding='utf-8').read()
css=open(os.path.join(here,'ur_menu.css'),encoding='utf-8').read()
B,E='/*UR-BEGIN*/','/*UR-END*/'
block=B+'\n'+js+'\n'+E+'\n'
if B in s:
    i=s.index(B);j=s.index(E)+len(E)+1
    s=s[:i]+block+s[j:]
else:
    anchor='(async()=>{if(CLOUD.on||'
    assert s.count(anchor)==1,('ancla',s.count(anchor))
    s=s.replace(anchor,block+anchor)
# menú lateral
if "innerHTML=urSideHTML(id)" not in s:
    a=" $('#side').innerHTML=`<div class=\"brand\">"
    b="\n const s=openSess();"
    i=s.index(a);j=s.index(b,i)
    s=s[:i]+" $('#side').innerHTML=urSideHTML(id);"+s[j:]
if "urAfter(id);$('#side')" not in s:
    a="sc.after&&sc.after();$('#side')"
    assert s.count(a)==1
    s=s.replace(a,"sc.after&&sc.after();urAfter(id);$('#side')")
# estilos
tag='<style id="ur-css">'+css+'</style>'
if 'id="ur-css"' in s:
    s=re.sub(r'<style id="ur-css">.*?</style>',lambda m:tag,s,flags=re.S)
else:
    s=s.replace('</head>',tag+'</head>',1)
open(path,'w',encoding='utf-8').write(s)
print('ok',len(s))
