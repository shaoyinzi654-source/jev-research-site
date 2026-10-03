from pathlib import Path
import math, csv, random, re, json

root=Path(__file__).resolve().parents[1]
assets=root/'dist'/'assets'
assets.mkdir(parents=True,exist_ok=True)
random.seed(71)

def save(name, body):
    body=re.sub(r'<text[^>]*>0[123] / .*?</text>','',body)
    (assets/name).write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 620">'+body+'</svg>',encoding='utf-8')

base='''<defs><radialGradient id="bg"><stop stop-color="#29364d"/><stop offset="1" stop-color="#0b1320"/></radialGradient><linearGradient id="pink"><stop stop-color="#f168b0"/><stop offset="1" stop-color="#9e0049"/></linearGradient><radialGradient id="ion"><stop stop-color="#ffeafa"/><stop offset=".45" stop-color="#ee7ab4"/><stop offset="1" stop-color="#801242"/></radialGradient></defs><rect width="480" height="620" fill="url(#bg)"/>'''

b=base
for layer in range(7):
    y=110+layer*37
    b+=f'<path d="M68 {y+30} 234 {y-40} 414 {y+24} 248 {y+92}Z" fill="#607088" fill-opacity=".07" stroke="#91a5c9" stroke-opacity=".35"/>'
    for x in range(5):
        px=130+x*45;py=y+25+math.sin(x+layer)*8
        b+=f'<circle cx="{px}" cy="{py}" r="{4+layer%3}" fill="{["#668dc2","#778399","#df3b85"][layer%3]}"/><path d="M{px} {py}l30 -13" stroke="#869fc8" stroke-opacity=".3"/>'
b+='<path d="M260 76C368 179 141 225 254 326S338 373 249 452" fill="none" stroke="#ed4b96" stroke-width="2" stroke-dasharray="5 7"/>'
for j in range(12):
    x=245+55*math.sin(j*.8);y=95+j*27
    b+=f'<circle cx="{x}" cy="{y}" r="6" fill="url(#ion)"/>'
b+='<text x="28" y="45" fill="#9eafc9" font-family="monospace" font-size="10" letter-spacing="2">01 / RANGE INTELLIGENCE</text>'
save('research-range.svg',b)

rows=list(csv.DictReader((assets/'pb-candidate-rank-qe.csv').open(encoding='utf-8-sig')))
b=base
b+='<g stroke="#62738c" stroke-opacity=".25" fill="none"><ellipse cx="240" cy="265" rx="187" ry="82"/><ellipse cx="240" cy="265" rx="146" ry="65"/><ellipse cx="240" cy="265" rx="106" ry="46"/><path d="M53 265H427M240 182V348"/></g>'
pts=[]
for i,r in enumerate(rows):
    a=i*2.39996;rr=25+146*math.sqrt((i+1)/len(rows));q=float(r['Qe_mg_g'])
    x=240+rr*math.cos(a);y=292+rr*.46*math.sin(a)-math.log10(max(q,.5))*48
    color='#e45494' if r['inside_8_to_16']=='1' else '#8ca8ca'
    b+=f'<circle cx="{x:.2f}" cy="{y:.2f}" r="{2.0+(i%4)*.5}" fill="{color}" fill-opacity=".76"/>'
    pts.append((x,y))
for i in range(0,len(pts)-10,11):
    x,y=pts[i];x2,y2=pts[i+9]
    b+=f'<path d="M{x:.2f} {y:.2f}L{x2:.2f} {y2:.2f}" stroke="#a5bfdc" stroke-opacity=".16"/>'
for i in (0,2):
    x,y=pts[i]
    b+=f'<circle cx="{x:.2f}" cy="{y:.2f}" r="11" fill="none" stroke="#ef6ca6" stroke-width="1.5"/><circle cx="{x:.2f}" cy="{y:.2f}" r="19" fill="none" stroke="#ef6ca6" stroke-opacity=".4"/>'
b+='<text x="28" y="45" fill="#9eafc9" font-family="monospace" font-size="10" letter-spacing="2">02 / EMPIRICAL EVIDENCE</text>'
save('research-evidence.svg',b)

b=base
for j in range(32):
    shift=j*4
    b+=f'<path d="M{45+shift*.2} {240+shift}C170 {130+shift} 235 {120+shift*.4} 422 {195+shift*.55}" fill="none" stroke="{["#d44789","#657bb6","#9aa8cc"][j%3]}" stroke-opacity="{.25+.012*j}" stroke-width=".9"/>'
for j in range(13):
    b+=f'<ellipse cx="254" cy="260" rx="{30+j*9}" ry="{13+j*4}" transform="rotate(-27 254 260)" fill="none" stroke="#bbaccd" stroke-opacity=".15"/>'
b+='<path d="M89 256L371 211" stroke="#efdce8" stroke-opacity=".5"/><circle cx="89" cy="256" r="15" fill="#6195b7"/><circle cx="371" cy="211" r="15" fill="url(#ion)"/><circle cx="238" cy="232" r="25" fill="url(#ion)"/><circle cx="238" cy="232" r="39" fill="none" stroke="#fc81b6" stroke-opacity=".5"/><text x="28" y="45" fill="#9eafc9" font-family="monospace" font-size="10" letter-spacing="2">03 / CONTINUOUS ESTIMATION</text>'
save('research-fusion.svg',b)

old=(root/'backups'/'index-before-postech-full-redesign.html').read_text(encoding='utf-8-sig')
m=re.search(r'<svg class="flow-svg".*?</svg>',old,re.S)
flow=m.group(0).replace('href="assets/pb-candidate-cloud.svg"','href="pb-candidate-cloud.svg"') if m else ''
(assets/'jev-workflow.svg').write_text(flow.replace('<svg class="flow-svg"','<svg xmlns="http://www.w3.org/2000/svg" class="flow-svg"'),encoding='utf-8')

# Decorative field, algorithmically authored; no borrowed reference imagery.
b='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1500 900"><g fill="none" stroke="#9aa4b4" stroke-opacity=".2">'
for i in range(22):
    x=random.randint(-200,1500);y=random.randint(-100,900)
    b+=f'<path d="M{x} {y}C{x+110} {y-140} {x+230} {y+190} {x+580} {y+70}"/>'
b+='</g></svg>'
(assets/'field.svg').write_text(b,encoding='utf-8')
print('Created original academic artwork and preserved the real JEV workflow.')
