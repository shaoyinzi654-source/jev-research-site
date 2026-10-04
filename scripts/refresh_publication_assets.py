"""Refresh public figure assets from the current native publication exports."""
from pathlib import Path
import csv, json, shutil, sys, zipfile

ROOT=Path(__file__).resolve().parents[1]
PROJECT=ROOT.parent
LATEST=PROJECT/'output/figures/JEV五张组图_最新版'
OUT=ROOT/'dist/assets/research/20261004'
OUT.mkdir(parents=True,exist_ok=True)
sys.path.insert(0,'C:/Users/frddx/AppData/Local/Temp/jev-manuscript-plotting')
from PIL import Image

titles=[
    ('Experimental evidence & choice','Experimental descriptors, capacity distributions and a fixed JEV decision.'),
    ('Range-guided retrieval & fusion','A traceable path from range selection to local and global evidence.'),
    ('Continuous estimates & benchmarks','Measured neighbours, 12 selected models and matched evaluation errors.'),
    ('Probability & confidence','Record-linked probability diagnosis and confidence-based selection.'),
    ('Validation & context adaptation','Component analysis and adaptation through labelled organic context.'),
]
figures=[]
for i,(title,description) in enumerate(titles,1):
    full=f'Figure{i}_complete';mechanism=f'Figure{i}a_mechanism'
    for stem in [full,mechanism]:
        for ext in ['pdf','svg','png']:
            shutil.copy2(LATEST/f'{stem}.{ext}',OUT/f'{stem}.{ext}')
        im=Image.open(LATEST/f'{stem}.png').convert('RGB')
        im.thumbnail((1400,1600))
        im.save(OUT/f'{stem}_preview.webp',quality=90,method=6)
    figures.append({'id':i,'title':title,'description':description,'full':f'assets/research/20261004/{full}',
                    'mechanism':f'assets/research/20261004/{mechanism}'})
with zipfile.ZipFile(OUT/'JEV_Figures_20261004.zip','w',zipfile.ZIP_DEFLATED) as archive:
    for file in OUT.iterdir():
        if file.suffix in ['pdf','.pdf','.svg','.png']:archive.write(file,file.name)
    archive.writestr('README.txt','JEV RESEARCH | Figures updated 4 October 2026\nFive complete figures and five separate mechanism panels (a).\nNative PDF/SVG and 600 dpi PNG.\nFigure 2a connectors, Figure 3a Local argmin overlap and Figure 4a confidence branch origins are corrected.\nFigure 4e/f record ticks are below the confidence strips and centred on their columns: Pb 1-70, Cd 1-41.\nQuantitative data are unchanged.\n')

sys.path.insert(0,str(PROJECT/'scripts'))
import publication_figures_v12_1 as F
import numpy as np
d=F.old.b.cached.load()
metrics=[]
with (LATEST/'source_data/Figure3/Twelve_model_metrics_actual.csv').open(encoding='utf-8-sig',newline='') as file:
    for row in csv.DictReader(file):
        metrics.append({'method':row['method'],'mae':float(row['MAE_log10']),
                        'lower':float(row['bootstrap_95_low']),'upper':float(row['bootstrap_95_high'])})
points=[{'metal':str(m),'observed':float(y),'predicted':float(p)}
        for m,y,p in zip(d['metal'],d['y'],d['pred'][F.N[0]])]
r2=1-float(np.sum((d['y']-d['pred'][F.N[0]])**2)/np.sum((d['y']-np.mean(d['y']))**2))
summary={'updated':'2026-10-04','figures':figures,'benchmark':metrics,
         'metal':{'records':556,'evaluation':111,'pb':70,'cd':41,'r2':r2,'points':points},
         'organic':{'evaluation':98,'pollutantLabels':14,'mae':.148,'r2':.777},
         'case':json.loads((LATEST/'source_data/Figure2/Actual_values.json').read_text(encoding='utf-8'))}
(ROOT/'dist/assets/evidence-summary.json').write_text(json.dumps(summary,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
shutil.copy2(LATEST/'source_data/Figure3/Twelve_model_metrics_actual.csv',ROOT/'dist/assets/twelve-model-benchmark.csv')
print('Refreshed five full figures, five mechanism panels, downloadable bundle and actual evaluation data.')
