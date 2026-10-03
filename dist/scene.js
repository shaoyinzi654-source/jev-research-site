/* Original procedural carbon structures. Conceptual geometry, not atomistic simulation. */
(()=>{'use strict';let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;const scenes=[];let mouse=[0,0];addEventListener('pointermove',e=>{mouse=[e.clientX/innerWidth-.5,e.clientY/innerHeight-.5]},{passive:true});
const norm=a=>{const n=Math.hypot(...a)||1;return a.map(v=>v/n)},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],sub=(a,b)=>a.map((v,i)=>v-b[i]);
function geometry(dark){const vertices=[],edges=[],nodes=[];function point(p,c){nodes.push({p,c});return nodes.length-1}function edge(a,b){edges.push([a,b])}
if(dark){const n=115;for(let i=0;i<n;i++){const z=1-2*(i+.5)/n,r=Math.sqrt(1-z*z),a=i*2.39996323;point([r*Math.cos(a)*6,r*Math.sin(a)*6,z*6],i%17===0?[.65,.29,.46]:[.76,.78,.82])}nodes.forEach((v,i)=>{nodes.map((w,j)=>({j,d:Math.hypot(...sub(v.p,w.p))})).filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,3).forEach(o=>{if(o.j>i)edge(i,o.j)})})}
else{
 for(let layer=0;layer<3;layer++){
  const map=new Map(),added=new Set(),offset=(layer-1)*.35;
  for(let col=0;col<8;col++)for(let row=0;row<6;row++){
   const x=col*1.5-5.25,y=(row+(col%2)*.5)*Math.sqrt(3)-4.6;
   if(Math.pow(x/6.6,2)+Math.pow(y/5.5,2)>1.12)continue;
   if((col===3||col===4)&&row===(layer===1?3:2))continue;
   const ids=[];
   for(let k=0;k<6;k++){
    const px=x+Math.cos(k*Math.PI/3),py=y+Math.sin(k*Math.PI/3),key=Math.round(px*1000)+','+Math.round(py*1000);
    if(!map.has(key)){
     const z=(layer-1)*1.9+.32*Math.sin(px*.43+layer*.5)+.2*Math.cos(py*.5);
     map.set(key,point([px+offset,py+offset*.6,z],[.17+layer*.035,.28+layer*.035,.43+layer*.04]));
    }
    ids.push(map.get(key));
   }
   for(let k=0;k<6;k++){const a=ids[k],b=ids[(k+1)%6],key=[a,b].sort((a,b)=>a-b).join();if(!added.has(key)){edge(a,b);added.add(key)}}
  }
  const boundary=[...map.values()].filter(id=>Math.abs(nodes[id].p[0])>4.6||Math.abs(nodes[id].p[1])>4.1);
  [0,Math.floor(boundary.length*.3),Math.floor(boundary.length*.65)].forEach((index,j)=>{
   const a=boundary[index],v=nodes[a].p,dir=norm([v[0],v[1],.5]);
   const b=point(v.map((n,k)=>n+dir[k]*.73),j===1?[.78,.06,.35]:[.02,.53,.56]);edge(a,b);
   if(j===1){const c=point(nodes[b].p.map((n,k)=>n+dir[k]*.55+(k===2?.3:0)),[.83,.88,.91]);edge(b,c)}
  });
 }
}
function v(p,n,c){vertices.push(...p,...n,...c)}function tri(a,b,c,na,nb,nc,color){v(a,na,color);v(b,nb,color);v(c,nc,color)}
for(const node of nodes){const p=node.p,r=dark?.23:.135,lat=8,lon=10;function sphere(i,j){const t=i/lat*Math.PI,a=j/lon*Math.PI*2,n=[Math.sin(t)*Math.cos(a),Math.cos(t),Math.sin(t)*Math.sin(a)];return{p:p.map((x,k)=>x+n[k]*r),n}}for(let i=0;i<lat;i++)for(let j=0;j<lon;j++){const a=sphere(i,j),b=sphere(i+1,j),c=sphere(i+1,j+1),d=sphere(i,j+1);tri(a.p,b.p,c.p,a.n,b.n,c.n,node.c);tri(a.p,c.p,d.p,a.n,c.n,d.n,node.c)}}
for(const [a,b]of edges){const p=nodes[a].p,q=nodes[b].p,axis=norm(sub(q,p)),u=norm(cross(axis,Math.abs(axis[1])>.9?[1,0,0]:[0,1,0])),w=cross(axis,u),r=dark?.095:.045,c=dark?[.55,.57,.61]:[.28,.41,.56];function ring(t,base){const n=u.map((x,k)=>x*Math.cos(t)+w[k]*Math.sin(t));return{p:base.map((x,k)=>x+n[k]*r),n}}for(let i=0;i<8;i++){const t=i/8*Math.PI*2,s=(i+1)/8*Math.PI*2,a=ring(t,p),b=ring(t,q),c1=ring(s,q),d=ring(s,p);tri(a.p,b.p,c1.p,a.n,b.n,c1.n,c);tri(a.p,c1.p,d.p,a.n,c1.n,d.n,c)}}return{vertices:new Float32Array(vertices),nodes,edges}}
const vertex=`attribute vec3 aPosition;attribute vec3 aNormal;attribute vec3 aColor;uniform mat4 uProjection;uniform mat4 uModel;uniform float uDistance;varying vec3 vNormal;varying vec3 vColor;varying vec3 vPosition;void main(){vec4 p=uModel*vec4(aPosition,1.0);p.z-=uDistance;vPosition=p.xyz;vNormal=mat3(uModel)*aNormal;vColor=aColor;gl_Position=uProjection*p;}`;
const fragment=`precision mediump float;varying vec3 vNormal;varying vec3 vColor;varying vec3 vPosition;uniform float uDark;void main(){vec3 n=normalize(vNormal),l=normalize(vec3(-0.4,0.8,1.0)),e=normalize(-vPosition);float diffuse=max(dot(n,l),0.0);float spec=pow(max(dot(reflect(-l,n),e),0.0),45.0);float rim=pow(1.0-max(dot(n,e),0.0),3.0);vec3 color=vColor*(0.55+0.45*diffuse)+vec3(spec*.28);color+=uDark*rim*vec3(0.25,0.015,0.10);vec3 bg=mix(vec3(.975,.98,.985),vec3(.031),uDark);float fog=smoothstep(23.0,44.0,-vPosition.z)*(1.0-uDark)*.86;gl_FragColor=vec4(mix(color,bg,fog),1.0);}`;
function setup(canvas,dark){const geo=geometry(dark),gl=canvas.getContext('webgl',{alpha:false,antialias:true,powerPreference:'low-power'});let visible=true,time=0,last=0;new IntersectionObserver(e=>visible=e[0].isIntersecting,{rootMargin:'150px'}).observe(canvas);if(!gl){fallback(canvas,geo,dark);return}function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(p);gl.useProgram(p);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,geo.vertices,gl.STATIC_DRAW);['Position','Normal','Color'].forEach((n,i)=>{const loc=gl.getAttribLocation(p,'a'+n);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,36,i*12)});const projection=gl.getUniformLocation(p,'uProjection'),model=gl.getUniformLocation(p,'uModel'),distance=gl.getUniformLocation(p,'uDistance');gl.uniform1f(gl.getUniformLocation(p,'uDark'),dark?1:0);gl.enable(gl.DEPTH_TEST);gl.clearColor(...(dark?[.031,.031,.031]:[.975,.98,.985]),1);
function resize(){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio,1.6);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));gl.viewport(0,0,canvas.width,canvas.height);const f=1/Math.tan(Math.PI/7.5),aspect=canvas.width/canvas.height,near=.1,far=100;gl.uniformMatrix4fv(projection,false,new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]));render()}
function render(){const yaw=(dark?.1:-.35)+Math.sin(time*.11)*.13+mouse[0]*.08,pitch=(dark?.1:-.4)+Math.sin(time*.08)*.09+mouse[1]*.05,cy=Math.cos(yaw),sy=Math.sin(yaw),cx=Math.cos(pitch),sx=Math.sin(pitch);gl.uniformMatrix4fv(model,false,new Float32Array([cy,sy*sx,-sy*cx,0,0,cx,sx,0,sy,-cy*sx,cy*cx,0,dark?0:.3,dark?0:.3,0,1]));gl.uniform1f(distance,dark?19:(innerWidth<650?27:24));gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,geo.vertices.length/9)}
function tick(t){requestAnimationFrame(tick);if(!paused&&visible&&t-last>32){time+=Math.min((t-last)/1000,.05);last=t;render()}else if(paused||!visible)last=t}addEventListener('resize',resize);resize();requestAnimationFrame(tick);scenes.push({render});}
function fallback(canvas,geo,dark){const replacement=document.createElement('canvas');replacement.id=canvas.id;replacement.setAttribute('aria-hidden','true');canvas.replaceWith(replacement);const ctx=replacement.getContext('2d');function draw(){const w=replacement.width=replacement.clientWidth*devicePixelRatio,h=replacement.height=replacement.clientHeight*devicePixelRatio;ctx.fillStyle=dark?'#080808':'#f8f9fa';ctx.fillRect(0,0,w,h);const scale=Math.min(w/25,h/19);const pp=geo.nodes.map(o=>[w*.54+o.p[0]*scale,h*.45+o.p[1]*scale*.72+o.p[2]*scale*.3]);ctx.strokeStyle=dark?'#aaaab5':'#496a8c';ctx.lineWidth=scale*.045;geo.edges.forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(...pp[a]);ctx.lineTo(...pp[b]);ctx.stroke()});pp.forEach(([x,y])=>{const r=scale*.135,g=ctx.createRadialGradient(x-r/3,y-r/3,0,x,y,r);g.addColorStop(0,'white');g.addColorStop(1,dark?'#59616f':'#294b6d');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()})}addEventListener('resize',draw);draw()}
try{setup(document.getElementById('hero-scene'),false);setup(document.getElementById('about-scene'),true)}catch(e){console.warn('JEV scene initialization:',e.message)}window.JEVScene={setPaused(v){paused=v;scenes.forEach(s=>s.render())}};
})();
