(function(){
 "use strict";
 const A=window.ALT=window.ALT||{};
 A.DATA=window.ENSINO||{};A.PRODUCT=window.ENSINO_PRODUCT||{};A.MODEL=window.ENSINO_ALT||{};
 A.KEY="ensinoLeanAlternativaState";
 A.esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
 A.norm=v=>String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
 A.money=v=>Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
 A.num=(v,d=1)=>Number(v||0).toLocaleString("pt-BR",{maximumFractionDigits:d});
 A.now=()=>new Date().toISOString();
 A.icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+({
  home:'<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-7h6v7"/>',
  learn:'<path d="M4 5h6v14H4zM14 5h6v14h-6z"/><path d="M10 8h4M10 16h4"/>',
  practice:'<path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="9"/>',
  work:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4h8v2M3 11h18"/>',
  evolve:'<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
  pin:'<path d="m8 3 8 0-1 6 3 3H6l3-3z"/><path d="M12 12v9"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  trend:'<path d="M4 18 9 11l4 3 7-9"/><path d="M16 5h4v4"/>',
  alert:'<path d="M12 3 2 21h20z"/><path d="M12 9v5M12 18h.01"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  cash:'<path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.4"/>'
 }[name]||'<circle cx="12" cy="12" r="8"/>')+'</svg>';
 A.blank=()=>({version:"2.0-alt",role:null,onboarded:false,pinned:false,competencies:{},practice:{},applications:[],routines:{},reviews:{},events:[],searches:[]});
 A.state=(()=>{let s=A.blank();try{const x=JSON.parse(localStorage.getItem(A.KEY)||"null");if(x)Object.assign(s,x)}catch(_){}
   if(!s.role){try{const prev=JSON.parse(localStorage.getItem("ensinoLeanV12State")||"null");if(prev?.role)s.role=prev.role}catch(_){}}
   s.competencies=s.competencies||{};s.practice=s.practice||{};s.applications=s.applications||[];s.routines=s.routines||{};s.reviews=s.reviews||{};s.events=s.events||[];s.searches=s.searches||[];return s})();
 A.save=()=>{try{localStorage.setItem(A.KEY,JSON.stringify(A.state))}catch(_){}};
 A.event=(type,data={})=>{A.state.events.unshift({type,at:A.now(),data});A.state.events=A.state.events.slice(0,250);A.save()};
 A.comp=slug=>{if(!A.state.competencies[slug])A.state.competencies[slug]={level:0,practicePass:false,demoPass:false,applied:false,validated:false,sustained:false,wrong:0};return A.state.competencies[slug]};
 A.setLevel=(slug,l,extra={})=>{const c=A.comp(slug);c.level=Math.max(c.level||0,l);Object.assign(c,extra);A.save();return c};
 A.levelLabel=l=>["Não iniciado","Conheceu","Praticou","Demonstrou","Aplicou","Validado","Sustentado"][l||0];
 A.role=()=>A.MODEL.roles.find(r=>r.id===A.state.role)||A.MODEL.roles[1];
 A.title=slug=>A.DATA.lessons?.[slug]?.title||A.MODEL.competencies.find(x=>x.slug===slug)?.title||slug;
 A.lesson=slug=>A.DATA.lessons?.[slug]||null;
 A.target=slug=>A.MODEL.roleTargets?.[slug]?.[A.role().id]||"entender";
 A.pageHead=(k,t,d,a="")=>'<header class="page-head"><div><div class="kicker">'+k+'</div><h1>'+t+'</h1><p>'+d+'</p></div>'+(a?'<div class="actions">'+a+'</div>':'')+'</header>';
 A.progress=()=>{const all=A.MODEL.competencies||[],done=all.filter(x=>(A.comp(x.slug).level||0)>=3).length;return{total:all.length,done,percent:all.length?Math.round(done/all.length*100):0}};
 A.nextCompetency=()=>A.MODEL.competencies.find(x=>(A.comp(x.slug).level||0)<3)||A.MODEL.competencies.at(-1);
 A.pendingApplications=()=>A.MODEL.competencies.filter(x=>{const c=A.comp(x.slug);return c.demoPass&&!c.applied});
 A.weak=()=>A.MODEL.competencies.map(x=>({...x,c:A.comp(x.slug)})).filter(x=>x.c.wrong>=2).sort((a,b)=>b.c.wrong-a.c.wrong);
 A.sustainedCount=()=>A.MODEL.competencies.filter(x=>A.comp(x.slug).sustained).length;
 A.roleText=slug=>{
   const target=A.target(slug),map={
    executar:"Execute a rotina corretamente e com rastreabilidade.",
    preparar:"Prepare uma base confiável para análise.",
    analisar:"Interprete drivers, evidências e próxima investigação.",
    decidir:"Use impacto e evidência para escolher e acompanhar decisões.",
    validar:"Garanta critérios, exceções e qualidade do processo.",
    entender:"Entenda o risco gerencial e o que deve ser cobrado.",
    coordenar:"Transforme análise em execução com dono, prazo e indicador."
   };return map[target]||map.entender;
 };
 A.table=(rows,headers)=>!rows?.length?"":'<div class="table"><table>'+(headers?'<thead><tr>'+headers.map(h=>'<th>'+A.esc(h)+'</th>').join("")+'</tr></thead>':'')+'<tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+A.esc(c)+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
 A.quick=items=>'<div class="quick-list">'+(items||[]).map(x=>'<div class="quick-row"><i>✓</i><p>'+A.esc(Array.isArray(x)?x[0]:x)+'</p></div>').join("")+'</div>';
 A.callout=(label,text,kind="")=>'<div class="callout '+kind+'"><strong>'+A.esc(label)+'</strong><p>'+A.esc(text)+'</p></div>';

 A.visual=slug=>{
   const v=A.MODEL.visualData?.[slug];if(!v)return"";
   const d=v.data||{};let body="";
   if(v.kind==="dual-time")body='<div class="dual-time"><div><span>'+A.esc(d.competencia[0])+'</span><b>'+A.esc(d.competencia[1])+'</b></div><div><span>'+A.esc(d.caixa[0])+'</span><b>'+A.esc(d.caixa[1])+'</b></div></div>';
   else if(v.kind==="process"||v.kind==="gates"||v.kind==="chain")body='<div class="process">'+d.steps.map((x,i)=>'<div><b>'+(i+1)+'</b><br>'+A.esc(x)+'</div>'+(i<d.steps.length-1?'<i>→</i>':'')).join("")+'</div>';
   else if(v.kind==="aging")body='<div class="barset">'+d.bands.map(x=>'<div><b style="height:'+x[1]+'%"></b><span>'+A.esc(x[0])+'</span></div>').join("")+'</div>';
   else if(v.kind==="waterfall")body='<div class="waterfall">'+d.items.map((x,i)=>'<div class="'+(x[1]<0?"negative":i===d.items.length-1?"result":"")+'"><span>'+A.esc(x[0])+'</span><b>'+x[1]+'</b></div>'+(i<d.items.length-1?'<i>→</i>':'')).join("")+'</div>';
   else if(v.kind==="timeline")body='<div class="timeline">'+d.steps.map((x,i)=>'<div><span>'+A.esc(x[0])+'</span><b>'+A.esc(x[1])+'</b></div>'+(i<d.steps.length-1?'<i>→</i>':'')).join("")+'</div>';
   else if(v.kind==="bridge")body='<div class="bridge">'+Object.entries(d).map(x=>'<div><span>'+A.esc(x[0])+'</span><b>'+A.esc(x[1])+'</b></div>').join("")+'</div>';
   else if(v.kind==="forecast")body='<div class="forecast-viz"><svg viewBox="0 0 100 50" preserveAspectRatio="none"><polyline class="base" points="'+d.base.map((y,i)=>[i*50,50-y/3]).join(" ")+'"/><polyline class="pressure" points="'+d.pressure.map((y,i)=>[i*50,50-y/3]).join(" ")+'"/><polyline class="up" points="'+d.opportunity.map((y,i)=>[i*50,50-y/3]).join(" ")+'"/></svg></div>';
   else if(v.kind==="variance")body='<div class="barset">'+d.items.map(x=>'<div><b style="height:'+Math.min(100,Math.abs(Number(x[2])))+'%"></b><span>'+A.esc(x[0])+'</span></div>').join("")+'</div>';
   else if(v.kind==="line")body='<div class="barset">'+d.points.map((x,i)=>'<div><b style="height:'+Math.max(8,x)+'%"></b><span>'+A.esc(d.labels[i])+'</span></div>').join("")+'</div>';
   else if(v.kind==="cycle")body='<div class="bridge"><div><span>PME</span><b>'+d.pme+'</b></div><div><span>PMR</span><b>'+d.pmr+'</b></div><div><span>PMP</span><b>- '+d.pmp+'</b></div><div><span>Ciclo</span><b>'+d.cycle+'</b></div></div>';
   else if(v.kind==="stack")body='<div class="bridge"><div><span>Preço</span><b>'+d.price+'</b></div><div><span>Impostos</span><b>-'+d.tax+'</b></div><div><span>Custos</span><b>-'+d.cost+'</b></div><div><span>MC</span><b>'+d.mc+'</b></div></div>';
   else if(v.kind==="breakeven")body='<div class="bridge"><div><span>Estrutura</span><b>'+d.fixed+'</b></div><div><span>MC%</span><b>'+d.mc+'%</b></div><div><span>PE</span><b>'+d.pe+'</b></div></div>';
   else if(v.kind==="classification")body='<div class="bridge">'+d.axes.map(x=>'<div><span>Dimensão</span><b>'+A.esc(x)+'</b></div>').join("")+'<div><span>Resultado</span><b>'+A.esc(d.result)+'</b></div></div>';
   else if(v.kind==="match")body='<div class="dual-time"><div><span>Banco</span><b>'+d.left.join(" · ")+'</b></div><div><span>Sistema</span><b>'+d.right.join(" · ")+'</b></div></div>'+A.callout("Validação",d.message,"amber");
   else if(v.kind==="loop")body='<div class="process">'+d.steps.map((x,i)=>'<div>'+A.esc(x)+(x==="Estoque"?'<br><b>'+d.days+' dias</b>':'')+'</div>'+(i<d.steps.length-1?'<i>→</i>':'')).join("")+'</div>';
   return'<div class="visual"><div class="kicker">MODELO MENTAL</div><h3>'+A.esc(A.title(slug))+'</h3>'+body+'</div>';
 };

 A.root=document.getElementById("root");
 A.shell=()=>{
   const nav=[["home","Início","home"],["learn","Aprender","learn"],["practice","Praticar","practice"],["work","Trabalhar","work"],["evolve","Evoluir","evolve"]];
   A.root.innerHTML='<a class="skip" href="#view">Pular para conteúdo</a><div class="app"><aside class="sidebar '+(A.state.pinned?"pinned":"")+'" id="sidebar"><a class="brand" href="#home"><span class="brand-mark">L</span><span class="brand-copy"><strong>Ensino Lean</strong><span>Alternativa 2.0</span></span></a><nav class="nav">'+nav.map(n=>'<a href="#'+n[0]+'" data-nav="'+n[0]+'">'+A.icon(n[2])+'<span class="nav-label">'+n[1]+'</span><span class="nav-tip">'+n[1]+'</span></a>').join("")+'</nav><div class="side-bottom"><button class="side-button" type="button" data-pin>'+A.icon("pin")+'<span>'+(A.state.pinned?"Recolher menu":"Fixar menu")+'</span></button></div></aside><button class="side-scrim" data-side-scrim></button><div class="shell"><header class="topbar"><div class="top-left"><button class="mobile-menu" type="button" data-mobile-menu>'+A.icon("menu")+'</button><div class="crumb"><strong id="crumbTitle">Ensino Lean</strong><span id="crumbSub">Competência aplicada</span></div></div><div class="top-actions"><button class="top-btn role-pill" type="button" data-profile>'+A.esc(A.role().label)+'</button><button class="top-btn" type="button" data-search>'+A.icon("search")+'<span>Buscar</span></button></div></header><main id="view" class="content" tabindex="-1"></main></div></div><div class="overlay" id="overlay" aria-hidden="true"></div>';
   A.view=document.getElementById("view");A.sidebar=document.getElementById("sidebar");A.overlay=document.getElementById("overlay");document.body.classList.toggle("pinned",!!A.state.pinned);
 };
 A.meta=(t,s)=>{document.getElementById("crumbTitle").textContent=t;document.getElementById("crumbSub").textContent=s||"Ensino Lean";document.title=t+" | Ensino Lean Alternativa"};
 A.open=html=>{A.overlay.innerHTML='<div class="modal" role="dialog" aria-modal="true">'+html+'</div>';A.overlay.classList.add("open");A.overlay.setAttribute("aria-hidden","false");setTimeout(()=>A.overlay.querySelector("input,button")?.focus(),20)};
 A.close=()=>{A.overlay.classList.remove("open");A.overlay.setAttribute("aria-hidden","true");A.overlay.innerHTML=""};
 A.profileModal=()=>A.open('<div class="modal-head"><div><div class="kicker">PAPEL PRINCIPAL</div><h2>Como você usa a gestão?</h2><p>O nível exigido muda por função. Você pode alterar depois.</p></div><button class="close" data-close>×</button></div><div class="role-options">'+A.MODEL.roles.map(r=>'<button class="role-option '+(A.state.role===r.id?"selected":"")+'" data-role="'+r.id+'"><strong>'+A.esc(r.label)+'</strong><span>'+A.esc(r.desc)+'</span></button>').join("")+'</div><div class="actions modal-actions"><button class="btn primary" data-save-role '+(!A.state.role?"disabled":"")+'>Continuar</button></div>');
 A.searchModal=()=>A.open('<div class="modal-head"><div><div class="kicker">BUSCA UNIVERSAL</div><h2>O que você precisa agora?</h2><p>A busca encontra competência, rotina, diagnóstico, ferramenta e material de consulta.</p></div><button class="close" data-close>×</button></div><div class="searchbar"><input data-global-search placeholder="Ex.: caixa piorou; conciliação; desconto; PMR..."><button class="btn primary" data-run-search>Buscar</button></div><div class="search-results" id="searchResults"></div>');
 A.runSearch=q=>{
   const n=A.norm(q),items=[];
   A.MODEL.competencies.forEach(x=>{const l=A.lesson(x.slug),hay=A.norm(x.title+" "+(l?.summary||"")+" "+(l?.quick||[]).join(" "));if(!n||hay.includes(n))items.push(["Aprender",x.title,"#learn/"+x.slug])});
   A.MODEL.routines.forEach(x=>{if(!n||A.norm(x.title+" "+x.desc).includes(n))items.push(["Trabalhar",x.title,"#work/routine/"+x.id])});
   A.MODEL.diagnoses.forEach(x=>{if(!n||A.norm(x.title+" "+x.desc).includes(n))items.push(["Diagnosticar",x.title,"#work/diagnose/"+x.id])});
   A.MODEL.tools.forEach(x=>{if(!n||A.norm(x.title).includes(n))items.push(["Simular",x.title,"#work/tool/"+x.id])});
   const groups={};items.slice(0,18).forEach(x=>(groups[x[0]]??=[]).push(x));
   document.getElementById("searchResults").innerHTML=Object.entries(groups).map(([g,arr])=>'<div class="search-group"><h3>'+g+'</h3>'+arr.map(x=>'<a class="search-item" href="'+x[2]+'" data-close><strong>'+A.esc(x[1])+'</strong><span>→</span></a>').join("")+'</div>').join("")||A.callout("Nenhum resultado","Tente outro termo.","amber");
   if(q){A.state.searches.unshift({query:q,at:A.now()});A.state.searches=A.state.searches.slice(0,50);A.event("search",{query:q})}
 };
 A.shell();
 document.addEventListener("click",e=>{
   let el;
   if((el=e.target.closest("[data-mobile-menu]"))){A.sidebar.classList.toggle("open");document.querySelector("[data-side-scrim]")?.classList.toggle("open",A.sidebar.classList.contains("open"));return}
   if((el=e.target.closest("[data-side-scrim]"))){A.sidebar.classList.remove("open");el.classList.remove("open");return}
   if((el=e.target.closest("[data-pin]"))){A.state.pinned=!A.state.pinned;A.save();A.sidebar.classList.toggle("pinned",A.state.pinned);document.body.classList.toggle("pinned",A.state.pinned);return}
   if((el=e.target.closest("[data-profile]"))){A.profileModal();return}
   if((el=e.target.closest("[data-search]"))){A.searchModal();return}
   if((el=e.target.closest("[data-close]"))){A.close();return}
   if((el=e.target.closest("[data-role]"))){A.state.role=el.dataset.role;A.save();A.overlay.querySelectorAll("[data-role]").forEach(b=>b.classList.toggle("selected",b===el));A.overlay.querySelector("[data-save-role]").disabled=false;return}
   if((el=e.target.closest("[data-save-role]"))){A.state.onboarded=true;A.save();A.close();document.querySelector("[data-profile]").textContent=A.role().label;A.navigate();return}
   if((el=e.target.closest("[data-run-search]"))){A.runSearch(A.overlay.querySelector("[data-global-search]")?.value||"");return}
 });
 document.addEventListener("keydown",e=>{if(e.key==="Escape")A.close();if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();A.searchModal()}if(e.key==="Enter"&&document.activeElement.matches("[data-global-search]"))A.runSearch(document.activeElement.value)});
})();