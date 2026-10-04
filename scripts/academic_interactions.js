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
