from pathlib import Path
import shutil
ROOT=Path(__file__).resolve().parents[1]
js=ROOT/'dist/academic.js'
source=js.read_text(encoding='utf-8')
prefix=source[:source.index('function openDialog')]
prefix=prefix.replace('assets/jev-workflow.svg','assets/research/20261004/Figure1a_mechanism.svg')
js.write_text(prefix+(ROOT/'scripts/academic_interactions.js').read_text(encoding='utf-8'),encoding='utf-8')
html=(ROOT/'scripts/academic_home.html').read_text(encoding='utf-8')
html=html.replace('<div class="figure-full">','<div class="figure-view-tools"><span>SCIENTIFIC FIGURE / VECTOR VIEW</span><button id="figure-zoom" aria-pressed="false">ZOOM IN +</button></div><div class="figure-full">')
(ROOT/'dist/index.html').write_text(html,encoding='utf-8')
print('Academic website refreshed.')
