from pathlib import Path
p=Path('dist/index.html')
s=p.read_text(encoding='utf-8')
start=s.index('<article class="sample"')
end=s.index('</article>', start)+len('</article>')
new=r'''<article class="hero-lab" aria-label="JEV 推理机制交互图">
          <div class="lab-head"><span class="live-dot"></span><span>JEV / COMPUTATIONAL WORKFLOW</span><span class="lab-status">LIVE MODEL VIEW</span></div>
          <div class="mechanism-wrap">
            <svg class="mechanism" viewBox="0 0 780 440" role="img" aria-labelledby="mech-title mech-desc">
              <title id="mech-title">JEV 从实验状态到容量估计的可追溯计算机制</title><desc id="mech-desc">实验条件表示为查询向量，进入固定 JEV 模型进行区间概率判别；模型选择候选范围后，在真实实验库检索可比记录，融合范围内与全局近邻，输出连续容量。点击下方阶段查看计算细节。</desc>
              <defs>
                <linearGradient id="g-flow" x1="0" x2="1"><stop stop-color="#65d4d0"/><stop offset=".52" stop-color="#68aef5"/><stop offset="1" stop-color="#ffad67"/></linearGradient>
                <linearGradient id="g-surface" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1e5260"/><stop offset="1" stop-color="#183546"/></linearGradient>
                <radialGradient id="g-ion"><stop stop-color="#ffdc9a"/><stop offset=".65" stop-color="#ffac55"/><stop offset="1" stop-color="#d66d45"/></radialGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <marker id="m-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8" fill="none" stroke="#8cbcc7" stroke-width="1.4"/></marker>
              </defs>
              <path class="orbit orbit-a" d="M41 232C135 173 202 285 290 217S455 172 541 225s125 17 205-42" fill="none" stroke="#294957" stroke-width="1" stroke-dasharray="3 8"/>
              <path d="M52 227C133 195 201 250 284 216S452 190 540 224s135-1 193-38" fill="none" stroke="url(#g-flow)" stroke-width="2.2" opacity=".78" marker-end="url(#m-arrow)"/>
              <g class="mech-stage is-on" data-stage="0">
                <rect x="35" y="83" width="145" height="264" rx="9" fill="#122b37" stroke="#37616e"/>
                <text x="55" y="112" class="svg-kicker">01 / QUERY STATE</text><text x="55" y="139" class="svg-title">实验条件</text>
                <g class="state-row-svg"><rect x="53" y="159" width="108" height="35" rx="4"/><text x="64" y="173">热解温度</text><text x="64" y="187" class="state-val">500 °C</text></g>
                <g class="state-row-svg"><rect x="53" y="201" width="108" height="35" rx="4"/><text x="64" y="215">溶液 pH</text><text x="64" y="229" class="state-val">5.0</text></g>
                <g class="state-row-svg"><rect x="53" y="243" width="108" height="35" rx="4"/><text x="64" y="257">初始浓度 C₀</text><text x="64" y="271" class="state-val">40 mg/L</text></g>
                <g class="state-row-svg"><rect x="53" y="285" width="108" height="35" rx="4"/><text x="64" y="299">BET 面积</text><text x="64" y="313" class="state-val">208.4 m²/g</text></g>
                <circle cx="167" cy="216" r="4" fill="#61d1cb" filter="url(#glow)"/>
              </g>
              <g class="mech-stage" data-stage="1">
                <path d="M249 129l34-29h96l34 29v173l-34 29h-96l-34-29z" fill="#174553" stroke="#5d999a"/>
                <path d="M269 148l25-20h74l25 20v136l-25 20h-74l-25-20z" fill="#1a3744" stroke="#337e87"/>
                <path d="M295 175h74M295 190h74M295 205h74" stroke="#37616e" stroke-width="1"/>
                <text x="331" y="163" class="svg-kicker" text-anchor="middle">02 / FIXED WEIGHTS</text><text x="331" y="230" class="svg-title svg-jev" text-anchor="middle">JEV</text><text x="331" y="254" class="svg-note" text-anchor="middle">区间概率 pᵢ · 置信度 c</text>
                <g class="prob-bars"><rect x="289" y="270" width="10" height="17" rx="2"/><rect x="303" y="264" width="10" height="23" rx="2"/><rect x="317" y="240" width="10" height="47" rx="2"/><rect x="331" y="260" width="10" height="27" rx="2"/><rect x="345" y="268" width="10" height="19" rx="2"/><rect x="359" y="274" width="10" height="13" rx="2"/></g>
                <text x="331" y="312" class="svg-note" text-anchor="middle">预训练参数固定</text>
              </g>
              <g class="mech-stage" data-stage="2">
                <text x="436" y="124" class="svg-kicker">03 / RANGE GATE</text><text x="436" y="150" class="svg-title">范围选择</text>
                <g class="range-cells"><rect x="435" y="171" width="39" height="60" rx="4"/><rect x="481" y="171" width="39" height="60" rx="4"/><rect x="527" y="162" width="43" height="78" rx="5" class="chosen"/><rect x="577" y="171" width="39" height="60" rx="4"/><rect x="623" y="171" width="39" height="60" rx="4"/><rect x="669" y="171" width="39" height="60" rx="4"/></g>
                <g class="range-labels"><text x="454" y="254">B₁</text><text x="500" y="254">B₂</text><text x="548" y="254" class="chosen-label">B₃</text><text x="596" y="254">B₄</text><text x="642" y="254">B₅</text><text x="688" y="254">B₆</text></g>
                <text x="548" y="191" class="range-n" text-anchor="middle">8–16</text><text x="548" y="213" class="range-p" text-anchor="middle">p = 0.93</text>
                <text x="436" y="298" class="svg-note">所选区间 → 局部候选池</text><path d="M449 320h244" stroke="#294957"/><circle cx="502" cy="320" r="3" fill="#4cbcb5"/><circle cx="547" cy="320" r="3" fill="#4cbcb5"/><circle cx="610" cy="320" r="3" fill="#4cbcb5"/><circle cx="661" cy="320" r="3" fill="#4cbcb5"/>
              </g>
              <g class="mech-stage" data-stage="3">
                <text x="454" y="105" class="svg-kicker">04 / EMPIRICAL RETRIEVAL</text><text x="454" y="131" class="svg-title">从实测库取证</text>
                <path d="M466 296Q538 188 704 285" fill="none" stroke="#d68e5a" stroke-width="1" stroke-dasharray="4 5"/><path d="M466 296Q535 245 704 285" fill="none" stroke="#55bcb3" stroke-width="1.2" stroke-dasharray="3 5"/>
                <g class="data-cloud"><circle cx="482" cy="270" r="4"/><circle cx="496" cy="219" r="3"/><circle cx="509" cy="293" r="4"/><circle cx="523" cy="246" r="4"/><circle cx="538" cy="204" r="3"/><circle cx="550" cy="277" r="4"/><circle cx="568" cy="227" r="3"/><circle cx="581" cy="298" r="3"/><circle cx="595" cy="255" r="4"/><circle cx="612" cy="212" r="3"/><circle cx="628" cy="278" r="4"/><circle cx="644" cy="241" r="3"/><circle cx="661" cy="295" r="3"/><circle cx="679" cy="221" r="4"/><circle cx="694" cy="265" r="3"/></g>
                <circle cx="509" cy="293" r="9" class="neighbor neighbor-global"/><circle cx="595" cy="255" r="10" class="neighbor neighbor-local"/>
                <text x="465" y="337" class="svg-note">279 条 Pb 候选记录 · 邻居排序可追溯</text>
              </g>
              <g class="mech-stage" data-stage="4">
                <text x="502" y="111" class="svg-kicker">05 / LOG-SPACE FUSION</text><text x="502" y="139" class="svg-title">连续容量输出</text>
                <text x="500" y="177" class="svg-note">全局近邻 Qᴳ</text><text x="701" y="177" class="svg-note" text-anchor="end">局部近邻 Qᴮ</text>
                <line x1="520" y1="221" x2="682" y2="221" stroke="#527380" stroke-width="2"/><line x1="548" y1="221" x2="651" y2="221" stroke="url(#g-flow)" stroke-width="4"/>
                <circle cx="520" cy="221" r="6" fill="#60c9c1"/><circle cx="682" cy="221" r="6" fill="#ffab65"/><circle cx="615" cy="221" r="8" fill="#d8ccff" stroke="#8274d8" stroke-width="2"/>
                <text x="520" y="249" class="svg-num" text-anchor="middle">7.00</text><text x="682" y="249" class="svg-num" text-anchor="middle">10.00</text>
                <rect x="541" y="273" width="124" height="58" rx="8" fill="#302f54" stroke="#7972bd"/><text x="603" y="296" class="svg-kicker" text-anchor="middle">FINAL ESTIMATE</text><text x="603" y="320" class="svg-result" text-anchor="middle">8.07 <tspan class="svg-unit">mg/g</tspan></text>
              </g>
              <g class="mech-label"><circle cx="54" cy="390" r="3" fill="#60cec6"/><text x="65" y="394">输入状态</text><circle cx="166" cy="390" r="3" fill="#69aef5"/><text x="177" y="394">固定 JEV</text><circle cx="278" cy="390" r="3" fill="#ffae69"/><text x="289" y="394">区间筛选</text><circle cx="397" cy="390" r="3" fill="#60cec6"/><text x="408" y="394">实测近邻</text><circle cx="514" cy="390" r="3" fill="#aa98fa"/><text x="525" y="394">对数融合</text><text x="746" y="394" text-anchor="end" class="svg-caveat">计算机制示意 · 非材料表面机理</text></g>
            </svg>
          </div>
          <div class="lab-control" role="tablist" aria-label="JEV 推理阶段">
            <button class="lab-step is-current" role="tab" aria-selected="true" data-step="0"><span>01</span>实验状态</button><button class="lab-step" role="tab" aria-selected="false" data-step="1"><span>02</span>JEV 判断</button><button class="lab-step" role="tab" aria-selected="false" data-step="2"><span>03</span>区间筛选</button><button class="lab-step" role="tab" aria-selected="false" data-step="3"><span>04</span>实测检索</button><button class="lab-step" role="tab" aria-selected="false" data-step="4"><span>05</span>融合输出</button>
          </div>
          <div class="lab-foot"><span class="lab-caption" aria-live="polite">Pb 留出案例 · 实际计算记录</span><span>点击阶段，逐步查看推理过程 <span aria-hidden="true">↗</span></span></div>
        </article>'''
s=s[:start]+new+s[end:]
style=r'''
  /* Editorial academic homepage redesign — custom, code-drawn science visual */
  :root{--night:#081b25;--night2:#102d38;--teal:#35bdb5;--signal:#ffad62;--violet:#a697f2;--blue:#72b2fa;--ink:#142f39;--paper:#f5f5ef}
  .topbar{background:rgba(8,27,37,.91);border-bottom:1px solid rgba(162,207,211,.14);backdrop-filter:blur(16px)}
  .brandmark{background:linear-gradient(145deg,#40cdc0,#3489c8);box-shadow:0 7px 24px #43c2b633;border:1px solid #9bf2e655}
  .navlinks a:hover,.nav-cta:hover{color:#77ddd1}
  .hero{padding:64px 0 56px;background:radial-gradient(ellipse at 75% 46%,#144451 0,transparent 39%),radial-gradient(ellipse at 12% 8%,#163944 0,transparent 37%),linear-gradient(118deg,#071820,#0b202b 54%,#102c37);position:relative;overflow:hidden}
  .hero:before{content:"";position:absolute;inset:0;pointer-events:none;opacity:.23;background-image:linear-gradient(#a3cdd411 1px,transparent 1px),linear-gradient(90deg,#a3cdd411 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(90deg,transparent,black 35%,black)}
  .hero-grid{grid-template-columns:minmax(270px,.68fr) minmax(580px,1.32fr);gap:38px;align-items:center;position:relative;z-index:1}
  .hero h1{font-size:clamp(42px,5.2vw,69px);letter-spacing:-.055em;line-height:1.13;max-width:580px}.hero h1 em{color:#6dd4ca;text-shadow:0 0 36px #53d6c61d}
  .hero .lead{max-width:480px;color:#bfd0d1;font-size:16px;line-height:1.9}.eyebrow{color:#75d2cc;letter-spacing:.16em;font-size:10px}
  .hero-meta{border-top-color:#ffffff24;gap:10px 17px}.hero-meta strong{color:#f4c17d;font-size:18px}
  .button-primary{background:#30a99f;border-color:#4dd6c8;color:#061c24}.button-primary:hover{background:#63d5c9;color:#071c24}.button-secondary{border-color:#6c8b92;color:#e3eded}
  .hero-lab{border:1px solid #81b9bf36;background:linear-gradient(145deg,#102b36e8,#0b202af2);border-radius:14px;box-shadow:0 30px 90px #0005, inset 0 1px #ffffff12;overflow:hidden;position:relative}
  .lab-head,.lab-foot{height:43px;display:flex;align-items:center;justify-content:space-between;padding:0 17px;color:#a5c0c5;font-size:9px;letter-spacing:.11em;border-bottom:1px solid #ffffff13}.live-dot{height:6px;width:6px;background:#4cd4ad;border-radius:50%;box-shadow:0 0 12px #4cd4ad;display:inline-block;margin-right:-7px;animation:livePulse 1.8s ease-out infinite}.lab-status{color:#6bd2bf;font-size:8px}
  .mechanism-wrap{padding:7px 14px 0;position:relative}.mechanism{display:block;width:100%;height:auto;overflow:visible}.svg-kicker{font:600 9px ui-sans-serif,system-ui,sans-serif;fill:#77b8bb;letter-spacing:1.05px}.svg-title{font:600 17px ui-sans-serif,system-ui,sans-serif;fill:#e7f0ec}.svg-note{font:10px ui-sans-serif,system-ui,sans-serif;fill:#91adb2}.svg-jev{font:700 39px ui-sans-serif,system-ui,sans-serif;fill:#77d9d0;letter-spacing:2px}.state-row-svg rect{fill:#17343e;stroke:#31505a}.state-row-svg text{font:8px ui-sans-serif,system-ui,sans-serif;fill:#92aeb1}.state-row-svg .state-val{font-weight:700;fill:#e2e9dd}.prob-bars rect{fill:#50b9b0;opacity:.42}.prob-bars rect:nth-child(3){fill:#a697f2;opacity:1}.range-cells rect{fill:#173640;stroke:#36545e}.range-cells .chosen{fill:#b56d37;stroke:#ffbc73;filter:url(#glow)}.range-labels text{font:9px ui-sans-serif,system-ui,sans-serif;fill:#809da2;text-anchor:middle}.range-labels .chosen-label{fill:#ffd094;font-weight:700}.range-n{font:700 12px ui-sans-serif,system-ui,sans-serif;fill:#fff3db}.range-p{font:9px ui-sans-serif,system-ui,sans-serif;fill:#ffce91}.data-cloud circle{fill:#81c8c4;opacity:.72;animation:cloudBreathe 4s ease-in-out infinite alternate}.data-cloud circle:nth-child(3n){fill:#e2a968;animation-delay:-1.4s}.data-cloud circle:nth-child(2n){animation-delay:-2.6s}.neighbor{fill:none;stroke-width:1.5;stroke-dasharray:3 3;animation:ring 7s linear infinite}.neighbor-global{stroke:#62ccc2}.neighbor-local{stroke:#ffb96f}.svg-num{font:700 12px ui-sans-serif,system-ui,sans-serif;fill:#e8e6ca}.svg-result{font:700 21px ui-sans-serif,system-ui,sans-serif;fill:#f4f0ff}.svg-unit{font:500 9px ui-sans-serif,system-ui,sans-serif;fill:#c9c5ef}.svg-caveat{font:8px ui-sans-serif,system-ui,sans-serif;fill:#78949c;letter-spacing:.25px}.orbit-a{stroke-dasharray:2 8;animation:orbitDash 24s linear infinite}.mech-stage{opacity:.13;transition:opacity .55s ease,filter .55s ease}.mech-stage.is-on{opacity:1;filter:drop-shadow(0 0 11px #70cfc522)}.lab-control{display:grid;grid-template-columns:repeat(5,1fr);padding:0 13px;gap:5px;border-top:1px solid #ffffff12}.lab-step{color:#8ca9b0;background:transparent;border:0;border-bottom:2px solid transparent;padding:12px 5px 11px;text-align:left;font:500 10px ui-sans-serif,system-ui,sans-serif;cursor:pointer;transition:color .2s,border-color .2s,background .2s}.lab-step span{display:block;color:#57747d;font:9px ui-monospace,monospace;margin-bottom:5px}.lab-step:hover{color:#e7f1e9;background:#ffffff07}.lab-step.is-current{color:#e8f3eb;border-bottom-color:#59d0c5;background:linear-gradient(0deg,#55cabe14,transparent)}.lab-step.is-current span{color:#75d9cf}.lab-foot{height:38px;border-bottom:0;border-top:1px solid #ffffff0b;letter-spacing:0;font-size:9px}.lab-foot>span:first-child{color:#cfe1dc}.lab-foot>span:last-child{color:#79969d}.sample,.lab-foot{font-variant-numeric:tabular-nums}
  .ticker{background:#102a34;border-block:1px solid #ffffff12}.ticker-inner{grid-template-columns:repeat(4,minmax(0,1fr))}.ticker-item{border-color:#ffffff17}.ticker-item strong{color:#70d5ca}.ticker-item span{color:#a3bdc0}
  .section-no{color:#248f89}.section-head h2{letter-spacing:-.04em}.section-head>p{line-height:1.85}.flowframe{border-radius:13px;box-shadow:0 18px 50px #17384510}.method-card{border-radius:10px;transition:transform .25s,box-shadow .25s}.method-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px #10293617}.scope,.final{position:relative;overflow:hidden}.final{background:linear-gradient(120deg,#102c35,#153d43 67%,#1b4850)}
  @keyframes livePulse{0%{box-shadow:0 0 0 0 #4cd4adbb}70%{box-shadow:0 0 0 7px #4cd4ad00}100%{box-shadow:0 0 0 0 #4cd4ad00}}
  @keyframes cloudBreathe{from{opacity:.45;transform:translateY(1px)}to{opacity:.98;transform:translateY(-2px)}}@keyframes ring{to{stroke-dashoffset:-48}}@keyframes orbitDash{to{stroke-dashoffset:-200}}
  @media(max-width:1020px){.hero-grid{grid-template-columns:1fr;gap:28px}.hero-grid>div:first-child{max-width:760px}.hero .lead{max-width:690px}.hero-lab{max-width:900px}.hero{padding-top:56px}}
  @media(max-width:620px){.hero{padding:45px 0 38px}.hero h1{font-size:42px}.mechanism-wrap{padding:5px 3px 0;overflow-x:auto}.mechanism{min-width:630px}.lab-control{gap:0;padding:0 5px}.lab-step{font-size:8px;text-align:center;padding-inline:2px}.lab-head,.lab-foot{padding-inline:11px;font-size:8px}.ticker-inner{grid-template-columns:repeat(2,minmax(0,1fr))}.ticker-item{min-height:72px}.hero-meta{flex-wrap:wrap}}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
'''
s=s.replace('</style>',style+'\n</style>',1)
script=r'''
    (()=>{const steps=[...document.querySelectorAll('.lab-step')],stages=[...document.querySelectorAll('.mech-stage')],caption=document.querySelector('.lab-caption');if(!steps.length)return;const lines=['Pb 留出案例 · 实际计算记录','固定参数 JEV · 输出区间概率与置信度','P(B₃)=0.93 · 选择 8–16 mg/g','279 条 Pb 候选记录 · 邻居排序可追溯','Qᴳ=7.00 · Qᴮ=10.00 · Qᶠ=8.07 mg/g'];let active=0,timer;function show(n,manual=false){active=(n+steps.length)%steps.length;steps.forEach((b,i)=>{b.classList.toggle('is-current',i===active);b.setAttribute('aria-selected',String(i===active));b.tabIndex=i===active?0:-1});stages.forEach((g,i)=>g.classList.toggle('is-on',i===active));caption.textContent=lines[active];if(manual){clearInterval(timer);timer=setInterval(()=>show(active+1),4200)}}steps.forEach((b,i)=>{b.addEventListener('click',()=>show(i,true));b.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();show(i+1,true);steps[active].focus()}if(e.key==='ArrowLeft'){e.preventDefault();show(i-1,true);steps[active].focus()}})});show(0);timer=setInterval(()=>show(active+1),4200)})();
'''
s=s.replace('</script>',script+'\n  </script>',1)
p.write_text(s,encoding='utf-8')
print('Redesigned homepage with custom interactive scientific mechanism visual.')
