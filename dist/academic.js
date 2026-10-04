(()=>{'use strict';
const $=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
const dialog=$('#detail-dialog');
const details={
framework:{label:'JEV / RESEARCH FRAMEWORK',title:'From experiments<br>to continuous estimates.',body:`<p>JEV combines a fixed pretrained model's range decision with labelled experimental context and measured neighbours to produce a traceable adsorption capacity estimate.</p><div class="detail-grid"><div class="detail-step"><small>01 / CONTEXT</small><h3>Experimental context</h3><p>Six state fields—pyrolysis temperature, solution pH, initial concentration, BET area, contact time and biochar pH—retrieve eight same-metal references.</p></div><div class="detail-step"><small>02 / RANGE</small><h3>Capacity range selection</h3><p>JEV returns range probabilities pᵢ and confidence c with fixed pretrained parameters. Pb boundaries of 2, 8, 16, 30 and 60 mg/g define six ranges.</p></div><div class="detail-step"><small>03 / EVIDENCE</small><h3>Two retrieval routes</h3><p>Eleven descriptors rank the global and range-specific candidates. Missing values use pool statistics; descriptors are standardized within the pool. Matching feedstocks receive a −1.5 ranking offset.</p></div><div class="detail-step"><small>04 / ESTIMATION</small><h3>Log-space fusion</h3><p>Local QB and global QG evidence are combined into continuous Qe while retaining the selected records and decision path.</p></div></div><p class="formula">QF = QB<sup>α</sup> × QG<sup>1−α</sup></p><p>Confidence c is a range decision score. Continuous prediction intervals and external validity require further evaluation.</p><img src="assets/research/20261004/Figure1a_mechanism.svg" alt="Experimental context, range selection and neighbour fusion workflow">`},
range:{label:'RESEARCH 01 / RANGE INTELLIGENCE',title:'A range before<br>a number.',body:`<p>A capacity range provides a local constraint for retrieving experimentally similar records. The probability distribution preserves uncertainty in the range decision.</p><h3>Six Pb capacity ranges</h3><p class="formula">2 · 8 · 16 · 30 · 60 <small>mg/g</small></p><p>In the illustrative query, JEV selects B3: 8 ≤ Qe &lt; 16 mg/g. Its probability is 0.93 and returned confidence c is 0.91.</p><h3>From selection to retrieval</h3><p>Of 279 Pb candidates, 77 belong to the selected range. Descriptor similarity then ranks this local evidence pool.</p><p>Range probabilities and confidence c describe the discrete decision; they do not define a calibrated continuous Qe interval.</p>`},
retrieval:{label:'RESEARCH 02 / EMPIRICAL RETRIEVAL',title:'Experiments provide<br>the context.',body:`<p>Material properties and operating conditions jointly shape adsorption performance. JEV retrieves labelled context using the experimental state and ranks final candidates using a broader descriptor set.</p><div class="detail-grid"><div class="detail-step"><small>CONTEXT / SIX FIELDS</small><h3>Six state fields</h3><p>Pyrolysis temperature, solution pH, initial concentration, BET area, contact time and biochar pH retrieve eight same-metal neighbours.</p></div><div class="detail-step"><small>RANKING / ELEVEN DESCRIPTORS</small><h3>Eleven descriptors</h3><p>Final retrieval uses pool-specific imputation and standardization, with a −1.5 offset for matching feedstocks.</p></div></div><h3>Every candidate links to a measured record</h3><p>The Pb example retains all 279 global candidates and 77 range-specific candidates. Downloaded data include measured capacities, range membership and neighbour flags.</p><a class="outline-button" href="assets/pb-candidate-rank-qe.csv" download>DOWNLOAD CANDIDATES <span>↓</span></a>`},
fusion:{label:'RESEARCH 03 / CONTINUOUS ESTIMATION',title:'Two evidence routes.<br>One traceable estimate.',body:`<p>The local neighbour QB and global neighbour QG provide complementary evidence. Log-space weighting converts a discrete range decision into a continuous estimate.</p><p class="formula">QF = QB<sup>α</sup> × QG<sup>1−α</sup></p><h3>A traceable Pb example</h3><p>Pyrolysis temperature: 500 °C. Solution pH: 5. Initial concentration: 40 mg/L. BET area: 208.4 m²/g. Selected range: 8–16 mg/g. Global QG = 7 mg/g; local QB = 10 mg/g.</p><p class="formula">10<sup>0.4</sup> × 7<sup>0.6</sup> ≈ 8.07 mg/g</p><p>With α = 0.4 and k = 1, this example matches measured Qe = 8.07 mg/g. It illustrates traceability rather than a guarantee for unseen materials.</p>`},
metal:{label:'VALIDATION / METAL ADSORPTION',title:'Pb & Cd.<br>Retrospective evaluation.',body:`<p>The dataset contains 556 records: 349 Pb and 207 Cd. The development set contains 445 records; the evaluation set contains 111 (70 Pb and 41 Cd).</p><table><thead><tr><th>Method</th><th>MAE</th><th>95% interval</th></tr></thead><tbody><tr><td>JEV fusion</td><td>0.111</td><td>0.076–0.152</td></tr><tr><td>Nearest neighbour</td><td>0.119</td><td>0.084–0.160</td></tr><tr><td>LightGBM</td><td>0.123</td><td>0.091–0.159</td></tr></tbody></table><p>Errors use log₁₀ capacity units. Fusion R² is 0.918; Pb and Cd R² are 0.828 and 0.926 respectively.</p><p>Early development inspected 25 of the 111 evaluation records, so the assessment is retrospective. Record-level splitting may also retain related experiments across sets.</p><p>MAE intervals overlap. These selected comparisons do not establish statistically significant superiority; archived tree ensembles achieve lower MAE. New materials and conditions require external validation.</p>`},
organic:{label:'VALIDATION / ORGANIC CONTEXTS',title:'Adapting through<br>labelled context.',body:`<p>The organic EC evaluation includes 98 records across 14 pollutant labels, some of which may represent aliases. Labelled target context supports the predictions.</p><table><thead><tr><th>Method</th><th>MAE</th></tr></thead><tbody><tr><td>Geometric midpoint</td><td>0.252</td></tr><tr><td>Nearest neighbour</td><td>0.152</td></tr><tr><td>Fusion</td><td>0.148</td></tr></tbody></table><p>Fusion R² is 0.777. Errors use log₁₀ capacity units. The paired fusion improvement interval includes zero.</p><h3>Context adaptation</h3><p>Target conditions and labelled references inform capacity ranges and retrieval. Evaluation of new pollutant classes requires suitable data coverage and comparable experiments.</p>`},
case:{label:'TRACEABLE EXAMPLE / PB',title:'279 records.<br>A visible decision path.',body:`<p>The selected 8–16 mg/g range contains 77 of the 279 global candidates. Descriptor distances rank these records for local neighbour selection.</p><p>The global nearest neighbour ranks first and has QG = 7 mg/g. The local neighbour ranks third globally and has QB = 10 mg/g. With α = 0.4 and k = 1, QF ≈ 8.07 mg/g.</p><img src="assets/pb-candidate-cloud.svg" alt="Measured capacities and neighbour flags for 279 Pb candidates"><p>Measured Qe for this example is 8.07 mg/g. The example illustrates an auditable path; overall performance is assessed across the evaluation records.</p><a class="outline-button" href="assets/pb-candidate-rank-qe.csv" download>DOWNLOAD DATA <span>↓</span></a>`}
};
function openDialog(d){d.showModal();document.body.classList.add('modal-open')}
function closeDialog(d){d.close();document.body.classList.remove('modal-open')}
all('dialog').forEach(d=>{
  d.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  d.querySelector('[data-close]').addEventListener('click',()=>closeDialog(d));
  d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d)}});
});
function showDetail(key){const t=details[key];if(!t)return;$('#detail-content').innerHTML=`<p class="eyebrow">${t.label}</p><h2>${t.title}</h2>${t.body}`;openDialog(dialog);dialog.scrollTop=0}
all('[data-detail]').forEach(b=>b.addEventListener('click',()=>showDetail(b.dataset.detail)));
$('#open-menu').addEventListener('click',()=>openDialog($('#navigation-dialog')));
all('#navigation-dialog nav a').forEach(a=>a.addEventListener('click',()=>closeDialog($('#navigation-dialog'))));

const titles=['Experimental evidence & choice','Range-guided retrieval & fusion','Continuous estimates & benchmarks','Probability & confidence','Validation & context adaptation'];
const descriptions=['Experimental descriptors, capacity distributions and a fixed JEV decision.','A traceable path from range selection to local and global evidence.','Measured neighbours, 12 selected models and matched evaluation errors.','Record-linked probability diagnosis and confidence-based selection.','Component analysis and adaptation through labelled organic context.'];
const FIGURE_VERSION='20261004d';
let figureIndex=1,figureView='full';
function renderFigure(){
  $('.figure-full').classList.remove('zoomed');$('#figure-zoom').textContent='ZOOM IN +';$('#figure-zoom').setAttribute('aria-pressed','false');
  const base=`assets/research/20261004/Figure${figureIndex}${figureView==='full'?'_complete':'a_mechanism'}`;
  $('#figure-label').textContent=`JEV RESEARCH / FIGURE ${String(figureIndex).padStart(2,'0')}${figureView==='mechanism'?'a':''}`;
  $('#figure-title').textContent=titles[figureIndex-1];$('#figure-description').textContent=descriptions[figureIndex-1];
  const image=$('#figure-image');image.src=base+'.svg?v='+FIGURE_VERSION;image.alt=`Figure ${figureIndex}${figureView==='mechanism'?'a mechanism panel':', complete figure'}: ${titles[figureIndex-1]}`;
  $('.figure-full').classList.toggle('mechanism',figureView==='mechanism');
  for(const ext of ['pdf','svg','png'])$('#figure-'+ext).href=base+'.'+ext+'?v='+FIGURE_VERSION;
  all('[data-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===figureView)));
}
all('[data-figure]').forEach(button=>button.addEventListener('click',()=>{
  figureIndex=Number(button.dataset.figure);figureView=button.dataset.panel||'full';renderFigure();openDialog($('#figure-dialog'));$('#figure-dialog').scrollTop=0;
}));
all('[data-view]').forEach(button=>button.addEventListener('click',()=>{figureView=button.dataset.view;renderFigure()}));
$('#figure-zoom').addEventListener('click',()=>{const zoomed=$('.figure-full').classList.toggle('zoomed');$('#figure-zoom').setAttribute('aria-pressed',String(zoomed));$('#figure-zoom').textContent=zoomed?'FIT TO VIEW −':'ZOOM IN +'});

const colors={pb:'#0868b8',cd:'#e65c00',teal:'#008b8d',purple:'#7b3294',navy:'#142d4e',pink:'#be165c',grey:'#8292a4'};
const notes={metal:'111 retrospective evaluation records: 70 Pb and 41 Cd. MAE is measured in log₁₀ capacity units; record-bootstrap intervals overlap.',organic:'98 EC evaluation records across 14 pollutant labels. Adaptation uses labelled target context.',case:'Pb query ID 10. Actual experimental conditions and retrieved records; Qe is withheld from the query.'};
let selected='metal',study=null;
const svgText=(x,y,text,size=12,color=colors.navy,extra='')=>`<text x="${x}" y="${y}" font-family="Outfit,Arial,sans-serif" font-size="${size}" fill="${color}" ${extra}>${text}</text>`;
function cover(key){
  if(!study)return `<img src="assets/research/20261004/Figure${key==='organic'?5:key==='case'?2:3}_complete_preview.webp" alt="Actual study results: ${key}" loading="eager">`;
  const label=key==='metal'?'MEASURED VS. ESTIMATED':key==='organic'?'LABELLED CONTEXT ADAPTATION':'A TRACEABLE PB QUERY';
  let out=`<svg class="chart-cover" viewBox="0 0 480 530" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${key==='metal'?'Actual observed and predicted capacity for 111 Pb and Cd evaluation records':key==='organic'?'Organic evaluation MAE comparison for 98 records':'Actual global and local evidence for Pb query ID 10'}"><rect x="10" y="10" width="460" height="510" fill="white"/>`;
  out+=svgText(42,46,label,9,colors.pink,'letter-spacing="1.6"');
  if(key==='metal'){
    const mae=study.benchmark[0].mae,points=study.metal.points;
    out+=svgText(40,111,mae.toFixed(3),57,colors.navy,'font-weight="300" letter-spacing="-3"');
    out+=svgText(192,86,'FUSION MAE',9,colors.grey,'letter-spacing="1"');out+=svgText(192,108,'log₁₀ capacity units',12,colors.grey);
    out+=svgText(407,86,'R²',10,colors.grey,'text-anchor="end"');out+=svgText(432,112,study.metal.r2.toFixed(3),23,colors.purple,'text-anchor="end"');
    let lo=Math.floor(Math.min(...points.flatMap(p=>[p.observed,p.predicted]))),hi=Math.ceil(Math.max(...points.flatMap(p=>[p.observed,p.predicted])));
    const x=v=>77+(v-lo)/(hi-lo)*342,y=v=>411-(v-lo)/(hi-lo)*242;
    for(let v=lo;v<=hi;v++){
      out+=`<path d="M${x(v)} 169V411M77 ${y(v)}H419" stroke="#ecf0f4" stroke-width="1"/>`;
      out+=svgText(x(v),434,String(v),10,colors.grey,'text-anchor="middle"');out+=svgText(63,y(v)+4,String(v),10,colors.grey,'text-anchor="end"');
    }
    out+=`<path d="M77 169V411H419" fill="none" stroke="#70869e" stroke-width="1"/><path d="M77 411L419 169" fill="none" stroke="#a8b6c6" stroke-dasharray="4 5"/>`;
    for(const p of points)out+=`<circle cx="${x(p.observed).toFixed(2)}" cy="${y(p.predicted).toFixed(2)}" r="3" fill="${p.metal==='Pb'?colors.pb:colors.cd}" fill-opacity=".8" stroke="white" stroke-width=".5"/>`;
    out+=svgText(248,462,'Observed log₁₀(Qe)',11,colors.grey,'text-anchor="middle"');
    out+=`<text x="31" y="300" transform="rotate(-90 31 300)" text-anchor="middle" fill="${colors.grey}" font-family="Outfit,Arial,sans-serif" font-size="11">Estimated log₁₀(Qe)</text>`;
    out+=`<circle cx="81" cy="145" r="3" fill="${colors.pb}"/><circle cx="196" cy="145" r="3" fill="${colors.cd}"/>`;
    out+=svgText(92,149,'Pb · n = 70',10,colors.grey);out+=svgText(207,149,'Cd · n = 41',10,colors.grey);
    out+=svgText(42,495,'111 matched evaluation records · JEV fusion',10,colors.grey);
  }else if(key==='organic'){
    out+=svgText(40,106,'98',57,colors.navy,'font-weight="300" letter-spacing="-3"');out+=svgText(125,83,'EC EVALUATION RECORDS',9,colors.grey,'letter-spacing="1"');out+=svgText(125,105,'14 pollutant labels',13,colors.grey);
    const names=['Geometric midpoint','Global retrieval','JEV fusion'],values=[.252,.152,.148],cols=[colors.grey,colors.teal,colors.purple];
    for(let i=0;i<4;i++){const xx=60+i*115;out+=`<path d="M${xx} 174V392" stroke="#ecf0f4"/>`;out+=svgText(xx,417,(i*.1).toFixed(1),10,colors.grey,'text-anchor="middle"')}
    names.forEach((name,i)=>{const yy=197+i*74;out+=svgText(60,yy-10,name,13,colors.navy);out+=`<rect x="60" y="${yy}" width="${values[i]/.3*345}" height="17" fill="${cols[i]}"/>`;out+=svgText(70+values[i]/.3*345,yy+13,values[i].toFixed(3),12,cols[i])});
    out+=svgText(235,445,'MAE · log₁₀ capacity units',11,colors.grey,'text-anchor="middle"');out+=svgText(42,490,'R² = 0.777',20,colors.purple);out+=svgText(195,490,'Labelled target context',10,colors.grey);
  }else{
    const c=study.case;out+=svgText(42,99,'Evidence, connected.',31,colors.navy,'font-weight="300" letter-spacing="-1"');out+=svgText(42,126,'Pb ID 10 · 279 global candidates · 77 in range',11,colors.grey);
    out+=`<rect x="42" y="157" width="390" height="47" fill="#fff4ed" stroke="#e65c0040"/>`;out+=svgText(61,187,'B3 / 8 ≤ Qe &lt; 16 mg/g',20,colors.cd);out+=svgText(414,185,'p = 0.93',10,colors.cd,'text-anchor="end"');
    out+=`<path d="M105 306Q172 230 239 307M369 306Q302 230 239 307" fill="none" stroke="#c4d1df" stroke-width="1.5"/><path d="M235 382V418" stroke="#7b3294" stroke-width="1.5"/>`;
    for(const [xx,value,col,label]of [[105,c.global_capacity,colors.teal,'GLOBAL QG'],[369,c.local_capacity,colors.cd,'LOCAL QB']]){out+=`<circle cx="${xx}" cy="306" r="36" fill="${col}"/>`;out+=svgText(xx,314,value.toFixed(2),22,'white','text-anchor="middle"');out+=svgText(xx,365,label,9,colors.grey,'text-anchor="middle" letter-spacing="1"')}
    out+=`<circle cx="239" cy="332" r="49" fill="#f3eaf8" stroke="#7b329430"/>`;out+=svgText(239,340,c.fused_capacity.toFixed(2),30,colors.purple,'text-anchor="middle"');out+=svgText(239,434,'QF = 10⁰·⁴ × 7⁰·⁶',18,colors.purple,'text-anchor="middle"');
    out+=svgText(42,492,'Measured Qe = 8.07 mg/g · k = 1 · α = 0.4',11,colors.grey);
  }
  return out+'</svg>';
}
function selectEvidence(key){selected=key;all('.evidence-row').forEach(button=>{const active=button.dataset.evidence===key;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});$('#evidence-feature').innerHTML=cover(key);$('#evidence-note').textContent=notes[key]}
all('.evidence-row').forEach(button=>button.addEventListener('click',()=>selectEvidence(button.dataset.evidence)));
$('#evidence-details').addEventListener('click',()=>showDetail(selected));selectEvidence('metal');
fetch('assets/evidence-summary.json?v=20261004c').then(response=>{if(!response.ok)throw Error('Evidence unavailable');return response.json()}).then(data=>{study=data;selectEvidence(selected)}).catch(()=>{selectEvidence(selected)});

const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
function motion(){const button=$('#motion-toggle');button.setAttribute('aria-pressed',String(paused));button.innerHTML=(paused?'▶':'Ⅱ')+' <span>'+(paused?'PLAY MOTION':'PAUSE MOTION')+'</span>';window.JEVScene?.setPaused(paused||document.hidden)}
$('#motion-toggle').addEventListener('click',()=>{paused=!paused;motion()});document.addEventListener('visibilitychange',motion);reduced.addEventListener('change',e=>{paused=e.matches;motion()});motion();

let ticking=false;
function update(){
  const region=$('#about').getBoundingClientRect(),progress=Math.max(0,Math.min(1,-region.top/Math.max(1,region.height-innerHeight)));
  $('#about').style.setProperty('--progress',progress);$('#header').classList.toggle('dark',region.top<82&&region.bottom>100);
  document.documentElement.style.setProperty('--reading',Math.max(0,Math.min(1,scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight))));
  $('.back-top').classList.toggle('visible',scrollY>innerHeight*.8);
  let current='home';for(const section of all('main>section[id]'))if(section.getBoundingClientRect().top<innerHeight*.35)current=section.id;
  all('.site-header nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+current));
  if(innerWidth>760&&!reduced.matches){const r=$('#research').getBoundingClientRect(),p=Math.max(-1,Math.min(1,(innerHeight*.55-r.top-r.height*.45)/innerHeight));all('.research-card').forEach((b,i)=>b.style.setProperty('--shift',((i===1?-1:1)*p*22)+'px'))}
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(update);ticking=true}},{passive:true});addEventListener('resize',update);update();
if('IntersectionObserver'in window&&!reduced.matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target)}}),{threshold:.06});
  for(const element of all('.section-head,.framework-heading,.method-steps li,.library-card,.contact-layout')){element.dataset.reveal='';observer.observe(element)}
  document.documentElement.classList.add('js-reveal');
}
})();
