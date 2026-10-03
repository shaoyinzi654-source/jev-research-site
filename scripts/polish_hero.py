from pathlib import Path
p=Path('dist/index.html');s=p.read_text(encoding='utf-8')
s=s.replace('<g class="mech-stage is-on" data-stage="0">','<g class="mech-stage is-on" data-stage="0" transform="translate(229 -49) scale(1.5 1.25)">')
s=s.replace('<g class="mech-stage" data-stage="1">','<g class="mech-stage" data-stage="1" transform="translate(-115 -56) scale(1.35 1.25)">')
s=s.replace('<g class="mech-stage" data-stage="2">','<g class="mech-stage" data-stage="2" transform="translate(-57 -44) scale(1.1 1.2)">')
s=s.replace('<g class="mech-stage" data-stage="3">','<g class="mech-stage" data-stage="3" transform="translate(-145 -44) scale(1.25 1.2)">')
s=s.replace('<g class="mech-stage" data-stage="4">','<g class="mech-stage" data-stage="4" transform="translate(-330 -65) scale(1.55 1.3)">')
s=s.replace("});show(0);timer=setInterval(()=>show(active+1),4200)})();", "});show(4);timer=setInterval(()=>show(active+1),5600)})();")
p.write_text(s,encoding='utf-8');print('Centered and scaled each interactive mechanism stage in the scientific hero.')
