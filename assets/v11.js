/* Ensino Lean V11 — produto consolidado */
(function(){
  "use strict";

  var DATA=window.ENSINO||{};
  var PRODUCT=window.ENSINO_PRODUCT||{};
  var STATE_KEY="ensinoLeanV11State";
  var OLD_KEY="ensinoLeanV9Progress";
  var root=document.getElementById("root");

  function esc(v){return String(v==null?"":v).replace(/[&<>"']/g,function(m){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[m]})}
  function norm(v){return String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
  function icon(name){
    var d={
      home:'<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-7h6v7"/>',
      trail:'<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a4 4 0 0 1 4 4 4 4 0 0 0 4 4"/><path d="M5 8v8a2 2 0 0 0 2 2h10"/>',
      help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.7 1.2c-.8 1.1-2.2 1.5-2.2 3.3"/><path d="M12 17h.01"/>',
      book:'<path d="M4 4h5v16H4zM10.5 4H16v16h-5.5zM17.5 7H21v13h-3.5z"/>',
      calc:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 12h1M12 12h1M16 12h1M8 16h1M12 16h1M16 16h1"/>',
      case:'<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-6h8v6M8 10h.01M12 10h.01M16 10h.01"/>',
      chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      pin:'<path d="m8 3 8 0-1 6 3 3H6l3-3z"/><path d="M12 12v9"/>',
      user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 4-7 8-7s7 2 8 7"/>',
      cash:'<path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.4"/><path d="M7 12h.01M17 12h.01"/>',
      trend:'<path d="M4 18 9 11l4 3 7-9"/><path d="M16 5h4v4"/>',
      box:'<path d="M4 8l8-4 8 4-8 4z"/><path d="m4 8 8 4 8-4M4 8v8l8 4 8-4V8"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      review:'<path d="M4 7h10a6 6 0 1 1-5.2 9"/><path d="m4 7 3-3M4 7l3 3"/>',
      chevron:'<path d="m9 18 6-6-6-6"/>'
    }[name]||'<circle cx="12" cy="12" r="8"/>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
  }
  function nowISO(){return new Date().toISOString()}
  function addDays(days){var d=new Date();d.setDate(d.getDate()+days);return d.toISOString()}
  function money(v){return Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0})}
  function num(v,d){return Number(v||0).toLocaleString("pt-BR",{maximumFractionDigits:d==null?1:d})}
  function pct(v){return num(v,1)+"%"}
  function termize(t){
    return esc(t).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,function(_,key,label){
      return '<button class="term" type="button" data-term="'+esc(key)+'">'+esc(label)+'</button>';
    });
  }

  function blankState(){return{version:11,role:null,sidebarPinned:false,competencies:{},events:[],searches:[],profile:{name:"Bruno"},onboarded:false}}
  function loadState(){
    var s=blankState();
    try{var raw=JSON.parse(localStorage.getItem(STATE_KEY)||"null");if(raw)Object.assign(s,raw)}catch(_){}
    if(!s.competencies)s.competencies={};if(!s.events)s.events=[];if(!s.searches)s.searches=[];
    if(!localStorage.getItem(STATE_KEY)){
      try{
        var old=JSON.parse(localStorage.getItem(OLD_KEY)||"{}");
        (old.passed||[]).forEach(function(k){s.competencies[k]=Object.assign({},s.competencies[k],{level:Math.max((s.competencies[k]||{}).level||0,3),demonstratedAt:nowISO(),reviewDue:addDays(7),reviewRound:0})});
        (old.completed||[]).forEach(function(k){s.competencies[k]=Object.assign({},s.competencies[k],{level:Math.max((s.competencies[k]||{}).level||0,3),demonstratedAt:nowISO(),reviewDue:addDays(7),reviewRound:0})});
      }catch(_){}
    }
    return s;
  }
  var state=loadState();
  function save(){try{localStorage.setItem(STATE_KEY,JSON.stringify(state))}catch(_){}}
  function event(type,data){
    state.events.unshift({type:type,at:nowISO(),data:data||{}});
    state.events=state.events.slice(0,150);save();
  }
  function competency(key){
    if(!state.competencies[key])state.competencies[key]={level:0,wrong:0,correct:0};
    return state.competencies[key];
  }
  function setLevel(key,level,extra){
    var c=competency(key);c.level=Math.max(c.level||0,level);Object.assign(c,extra||{});save();
  }
  function levelLabel(level){return["Não iniciado","Conheceu","Praticou","Demonstrou","Aplicou","Validado"][level||0]}
  function role(){return PRODUCT.roles.find(function(r){return r.id===state.role})||PRODUCT.roles[1]||{id:"gestao",label:"Gestor financeiro",short:"Gestão"}}
  function learningItems(){
    var a=[];
    (DATA.financeStages||[]).forEach(function(stage,si){
      (stage.items||[]).forEach(function(item){
        var href=item.lab?"#lab/"+item.slug:item.checkpoint?"#checkpoint/"+item.slug:item.diagnostic?"#diagnostico/caixa-ruim":"#lesson/"+item.slug;
        a.push(Object.assign({},item,{stageIndex:si,stageTitle:stage.title,href:href}));
      });
    });
    return a;
  }
  function itemTitle(key){
    if(DATA.lessons&&DATA.lessons[key])return DATA.lessons[key].title;
    if(DATA.checkpoints&&DATA.checkpoints[key])return DATA.checkpoints[key].title;
    if(DATA.labs&&DATA.labs[key])return DATA.labs[key].title;
    if(key==="caixa-ruim")return (DATA.diagnostic||{}).title||"Diagnóstico";
    return key;
  }
  function demonstrated(key){return (competency(key).level||0)>=3}
  function courseStats(){
    var items=learningItems(),n=items.filter(function(i){return demonstrated(i.slug)}).length;
    return{total:items.length,done:n,percent:items.length?Math.round(n/items.length*100):0};
  }
  function nextItem(){
    var items=learningItems();return items.find(function(i){return !demonstrated(i.slug)})||items[items.length-1];
  }
  function dueReviews(){
    var today=Date.now();
    return Object.keys(state.competencies).filter(function(k){
      var c=state.competencies[k];return c.level>=3&&c.reviewDue&&new Date(c.reviewDue).getTime()<=today&&DATA.lessons&&DATA.lessons[k];
    });
  }
  function lessonIndex(slug){return learningItems().findIndex(function(i){return i.slug===slug})}
  function routeKind(){
    var h=location.hash||"#home";
    if(h==="#home"||h==="")return"home";
    if(h==="#trails"||h==="#financeiro")return"trails";
    if(h.indexOf("#lesson/")===0)return"lesson";
    if(h.indexOf("#checkpoint/")===0)return"checkpoint";
    if(h.indexOf("#lab/")===0)return"lab";
    if(h.indexOf("#diagnostico/")===0)return"diagnostic";
    if(h.indexOf("#resolve")===0)return"resolve";
    if(h==="#library"||h.indexOf("#resource/")===0)return"library";
    if(h.indexOf("#simulators")===0)return"simulators";
    if(h.indexOf("#cases")===0)return"cases";
    if(h==="#progress")return"progress";
    if(h.indexOf("#review/")===0)return"review";
    if(h==="#consultant")return"consultant";
    return"home";
  }

  var nav=[
    ["home","Início","home","Painel"],["trails","Trilhas","trail","Aprender"],["resolve","Resolver um problema","help","Aplicar"],
    ["library","Biblioteca","book",""],["simulators","Simuladores","calc",""],["cases","Casos práticos","case",""],
    ["progress","Meu progresso","chart","Evolução"]
  ];
  function shell(){
    var navHtml="",lastGroup="";
    nav.forEach(function(n){
      if(n[3]&&n[3]!==lastGroup){navHtml+='<div class="nav-group">'+n[3]+'</div>';lastGroup=n[3]}
      navHtml+='<a href="#'+n[0]+'" data-nav="'+n[0]+'">'+icon(n[2])+'<span class="nav-label">'+n[1]+'</span><span class="nav-tip">'+n[1]+'</span></a>';
    });
    root.innerHTML='<a class="skip" href="#view">Pular para o conteúdo</a><div class="app"><aside class="sidebar '+(state.sidebarPinned?"pinned":"")+'" id="sidebar"><a class="brand" href="#home"><span class="brand-mark">L</span><span class="brand-copy"><strong>Ensino Lean</strong><span>Lean Company</span></span></a><nav class="nav" aria-label="Navegação principal">'+navHtml+'</nav><div class="sidebar-footer"><button class="sidebar-toggle" type="button" data-pin>'+icon("pin")+'<span>'+(state.sidebarPinned?"Recolher menu":"Fixar menu aberto")+'</span></button><button class="profile-mini" type="button" data-profile style="background:none;border:0;width:100%;text-align:left"><span class="avatar">B</span><span class="profile-copy"><strong>'+esc((state.profile||{}).name||"Bruno")+'</strong><span>'+esc(role().short)+'</span></span></button></div></aside><button class="side-scrim" type="button" data-side-scrim aria-label="Fechar menu"></button><div class="shell-main"><header class="topbar"><div class="top-left"><button class="mobile-menu" type="button" data-mobile-menu aria-label="Abrir menu">'+icon("menu")+'</button><div class="crumb"><strong id="crumbTitle">Ensino Lean</strong><span id="crumbSub">Capacitação gerencial aplicada</span></div></div><div class="top-actions"><button class="top-pill" type="button" data-profile>'+esc(role().label)+'</button><button class="top-btn" type="button" data-search>'+icon("search")+'<span>Buscar</span></button></div></header><main id="view" class="content" tabindex="-1"></main></div></div><div id="overlay" class="overlay" aria-hidden="true"></div>';
    document.body.classList.toggle("sidebar-pinned",!!state.sidebarPinned);
  }
  shell();
  var view=document.getElementById("view");
  var sidebar=document.getElementById("sidebar");
  var overlay=document.getElementById("overlay");

  function meta(title,sub){
    document.getElementById("crumbTitle").textContent=title;
    document.getElementById("crumbSub").textContent=sub||"Ensino Lean";
    document.title=title+" | Ensino Lean";
  }
  function setActive(){
    var k=routeKind(),active=k;
    if(["lesson","checkpoint","lab","diagnostic","review"].indexOf(k)>=0)active="trails";
    document.querySelectorAll("[data-nav]").forEach(function(a){
      var on=a.dataset.nav===active;if(on)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
    });
  }
  function pageHead(kicker,title,desc,actions){
    return '<header class="page-head"><div class="page-head-copy"><div class="kicker">'+kicker+'</div><h1>'+title+'</h1><p>'+desc+'</p></div>'+(actions?'<div class="actions">'+actions+'</div>':'')+'</header>';
  }
  function quickRows(items){
    return '<div class="quick-list">'+(items||[]).map(function(x){return '<div class="quick-row"><i>✓</i><p>'+termize(x)+'</p></div>'}).join("")+'</div>';
  }
  function listRows(items){
    return '<div class="quick-list">'+(items||[]).map(function(x){return '<div class="quick-row"><i>→</i><p>'+termize(x)+'</p></div>'}).join("")+'</div>';
  }
  function flowRows(items){
    return '<div class="flow">'+(items||[]).map(function(x,i){var a=Array.isArray(x)?x:[x,""];return '<div class="flow-row"><b>'+(i+1)+'</b><div><strong>'+termize(a[0])+'</strong>'+(a[1]?'<p>'+termize(a[1])+'</p>':'')+'</div></div>'}).join("")+'</div>';
  }
  function table(rows,headers){
    if(!rows||!rows.length)return"";
    return '<div class="table"><table>'+(headers?'<thead><tr>'+headers.map(function(h){return'<th>'+termize(h)+'</th>'}).join("")+'</tr></thead>':'')+'<tbody>'+rows.map(function(r){return'<tr>'+r.map(function(c){return'<td>'+termize(c)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table></div>';
  }
  function callout(label,text,kind){return text?'<div class="callout '+(kind||"")+'"><strong>'+label+'</strong><p>'+termize(text)+'</p></div>':""}
  function example(ex){
    if(!ex)return"";
    return '<div class="card" style="padding:17px;margin-top:15px"><div class="kicker">EXEMPLO</div><h3 style="font-size:25px;margin-top:4px">'+esc(ex.title||"Exemplo aplicado")+'</h3>'+(ex.intro?'<p style="color:var(--muted);font-size:11px;margin-top:5px">'+termize(ex.intro)+'</p>':'')+(ex.rows?table(ex.rows):"")+(ex.insight?callout("Como interpretar",ex.insight,"green"):"")+'</div>';
  }
  function validation(v){
    if(!v)return"";
    return '<div class="validation"><div class="ok"><strong>✓ Está correto quando</strong><p>'+termize(v.ok||"")+'</p></div><div class="review"><strong>⚠ Revise quando</strong><p>'+termize(v.review||"")+'</p></div><div class="bad"><strong>✕ Está errado quando</strong><p>'+termize(v.bad||"")+'</p></div></div>';
  }
  function roleLens(d){
    var r=role(),op=(d.operator||[]),mg=(d.manager||[]);
    return '<div class="role-lens"><div class="role-box '+(r.id==="operacao"?"active":"")+'"><strong>Para quem executa</strong><ul>'+op.map(function(x){return"<li>"+termize(x)+"</li>"}).join("")+'</ul></div><div class="role-box '+(r.id!=="operacao"?"active":"")+'"><strong>Para quem analisa e decide</strong><ul>'+mg.map(function(x){return"<li>"+termize(x)+"</li>"}).join("")+'</ul></div></div>';
  }
  function levelStrip(key){
    var l=competency(key).level||0,names=["Conheceu","Praticou","Demonstrou","Aplicou","Validado"];
    return '<div class="competency-strip">'+names.map(function(n,i){var lv=i+1;return'<div class="competency-step '+(l>=lv?"done":l+1===lv?"current":"")+'"><strong>'+n+'</strong><span>'+(l>=lv?"Concluído":l+1===lv?"Próximo":"Pendente")+'</span></div>'}).join("")+'</div>';
  }
  function lessonVisual(slug,d){
    if(slug==="caixa-x-competencia")return '<div class="visual-core"><div class="visual-title">Duas leituras do mesmo fato</div><div class="dual"><div class="lane purple"><span>Competência</span><b>DRE</b><span>Quando o fato pertence economicamente.</span></div><div class="lane teal"><span>Caixa</span><b>DINHEIRO</b><span>Quando entrou ou saiu da conta.</span></div></div></div>';
    if(slug==="dre-gerencial")return '<div class="visual-core"><div class="visual-title">Receita até resultado</div><div class="vbars"><div class="vbar" style="height:100%"><span>Receita</span></div><div class="vbar orange" style="height:82%"><span>Líquida</span></div><div class="vbar purple" style="height:43%"><span>Margem</span></div><div class="vbar" style="height:20%"><span>Resultado</span></div></div></div>';
    if(slug==="fluxo-de-caixa")return '<div class="visual-core"><div class="visual-title">O vale importa mais que o saldo final</div><div class="vbars"><div class="vbar" style="height:76%"><span>M1</span></div><div class="vbar" style="height:59%"><span>M2</span></div><div class="vbar orange" style="height:22%"><span>M3</span></div><div class="vbar" style="height:47%"><span>M4</span></div><div class="vbar" style="height:70%"><span>M5</span></div></div></div>';
    if(d.type==="procedure")return '<div class="visual-core"><div class="visual-title">Processo confiável é processo repetível</div><div class="process-mini"><div><b>1</b><span>Preparar</span></div><div><b>2</b><span>Executar</span></div><div><b>3</b><span>Validar</span></div><div><b>4</b><span>Fechar</span></div></div></div>';
    if(d.type==="indicator")return '<div class="visual-core"><div class="visual-title">'+esc(d.title)+'</div><div class="formula-visual"><strong>'+termize(d.formula||d.inOneSentence||d.title)+'</strong><span>Indicador só é útil quando conectado aos drivers que o explicam.</span></div></div>';
    return '<div class="visual-core"><div class="visual-title">'+esc(d.title)+'</div><div class="dual"><div class="lane teal"><span>Entender</span><b>DADO</b><span>O que aconteceu.</span></div><div class="lane purple"><span>Decidir</span><b>AÇÃO</b><span>O que fazer com a evidência.</span></div></div></div>';
  }

  function renderHome(){
    meta("Início","Capacitação gerencial aplicada");
    var st=courseStats(),next=nextItem(),due=dueReviews(),applied=Object.values(state.competencies).filter(function(c){return(c.level||0)>=4}).length,validated=Object.values(state.competencies).filter(function(c){return(c.level||0)>=5}).length;
    var first=st.done===0;
    var title=first?"Aprenda para executar. <span>Use para decidir.</span>":"Continue de onde parou. <span>O próximo passo está claro.</span>";
    var nextTitle=next?itemTitle(next.slug):"Formação concluída";
    var problems=(PRODUCT.diagnoses||[]).slice(0,4).map(function(x){return'<a class="problem-card card" href="#resolve/'+x.id+'"><span class="problem-icon">'+icon(x.icon)+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.desc)+'</p><span class="go">Investigar →</span></a>'}).join("");
    view.innerHTML='<section class="home-welcome"><div class="welcome-main card"><div class="kicker">'+(first?"BEM-VINDO AO ENSINO LEAN":"SEU PAINEL")+'</div><h1>'+title+'</h1><p>'+(first?"Treinamento, consulta e aplicação gerencial em uma única base de conhecimento. Escolha uma trilha, comece por um problema real ou consulte um tema durante o trabalho.":"A plataforma organiza estudo, revisão e aplicação na empresa. Seu papel atual é "+esc(role().label)+".")+'</p><div class="welcome-actions"><a class="btn primary" href="'+(next?next.href:"#trails")+'">'+(first?"Começar formação":"Continuar: "+esc(nextTitle))+' →</a><a class="btn" href="#resolve">Resolver um problema</a><a class="btn" href="#library">Consultar biblioteca</a></div></div><aside class="resume-card card"><div class="kicker">PRÓXIMO PASSO</div><h2>'+esc(nextTitle)+'</h2><p>'+st.done+' de '+st.total+' atividades com domínio demonstrado.</p><div class="progress-track" style="margin-top:16px;background:rgba(255,255,255,.14)"><span style="width:'+st.percent+'%;background:#fff"></span></div><a class="btn ghost" style="color:#fff;border-color:rgba(255,255,255,.25)" href="'+(next?next.href:"#trails")+'">Abrir atividade →</a></aside></section>'+
      '<section class="home-stat-row"><div class="home-stat card"><b>'+st.percent+'%</b><span>domínio demonstrado</span></div><div class="home-stat card"><b>'+applied+'</b><span>aplicações registradas</span></div><div class="home-stat card"><b>'+due.length+'</b><span>revisões para fazer</span></div><div class="home-stat card"><b>'+validated+'</b><span>aplicações validadas</span></div></section>'+
      (due.length?'<section class="section"><div class="review-card card"><div class="review-copy"><div class="kicker">RETENÇÃO</div><h3>Você tem '+due.length+' revisão'+(due.length>1?"ões":"")+' recomendada'+(due.length>1?"s":"")+'</h3><p>Revisões curtas reforçam conteúdos já demonstrados antes que sejam esquecidos.</p></div><a class="btn teal" href="#review/'+due[0]+'">Revisar agora →</a></div></section>':'')+
      '<section class="section"><div class="section-head"><div><div class="kicker">COMECE PELA DOR</div><h2>O que você precisa resolver agora?</h2><p>O Ensino Lean transforma o sintoma em uma sequência de investigação.</p></div><a class="text-link" href="#resolve">Ver diagnósticos →</a></div><div class="grid4">'+problems+'</div></section>'+
      '<section class="section"><div class="section-head"><div><div class="kicker">FORMAÇÃO ATIVA</div><h2>Financeiro — do dado à decisão</h2><p>Da confiabilidade do dado ao diagnóstico de capital de giro.</p></div><a class="text-link" href="#trails">Abrir trilha →</a></div>'+roadmap()+'</section>';
  }
  function roadmap(){
    return '<div class="card" style="padding:20px"><div class="grid4">'+(DATA.financeStages||[]).slice(0,4).map(function(s,i){
      var its=s.items||[],done=its.filter(function(x){return demonstrated(x.slug)}).length,p=its.length?Math.round(done/its.length*100):0;
      return'<div><span class="badge '+(p===100?"green":"purple")+'">Módulo '+(i+1)+'</span><h3 style="font-size:23px;margin-top:8px">'+esc(s.title)+'</h3><p style="font-size:10.5px;color:var(--muted);margin-top:4px">'+done+'/'+its.length+' atividades</p><div class="progress-track" style="margin-top:9px"><span style="width:'+p+'%"></span></div></div>';
    }).join("")+'</div></div>';
  }

  function renderTrails(){
    meta("Trilhas","Aprendizado estruturado");
    var st=courseStats(),next=nextItem();
    var modules=(DATA.financeStages||[]).map(function(stage,si){
      var its=stage.items||[],done=its.filter(function(x){return demonstrated(x.slug)}).length,p=its.length?Math.round(done/its.length*100):0;
      var rows=its.map(function(item){
        var c=competency(item.slug),href=item.lab?"#lab/"+item.slug:item.checkpoint?"#checkpoint/"+item.slug:item.diagnostic?"#diagnostico/caixa-ruim":"#lesson/"+item.slug;
        var cls=c.level>=4?"applied":c.level>=3?"done":"";
        return'<a class="lesson-row '+cls+'" href="'+href+'"><span class="lesson-state">'+(c.level>=4?"A":c.level>=3?"✓":item.lab?"L":item.checkpoint?"C":"•")+'</span><div><h4>'+esc(item.title)+'</h4><p>'+esc(item.kind||"Conteúdo")+' · '+levelLabel(c.level||0)+'</p></div><span class="arrow">→</span></a>';
      }).join("");
      return'<section class="module card"><div class="module-head"><div><span class="badge teal">Módulo '+(si+1)+'</span><h3>'+esc(stage.title)+'</h3><p>'+esc(stage.desc||"")+'</p></div><div class="module-progress"><b>'+p+'%</b><div class="progress-track" style="margin-top:7px"><span style="width:'+p+'%"></span></div></div></div><div class="lesson-list">'+rows+'</div></section>';
    }).join("");
    view.innerHTML=pageHead("APRENDER","Trilha Financeiro","A formação disponível foi mantida como foco único nesta versão. Cada atividade avança por domínio demonstrado e pode terminar em aplicação real na empresa.",'<a class="btn primary" href="'+(next?next.href:"#trails")+'">'+(st.done?"Continuar":"Começar")+' →</a>')+
      '<section class="trail-hero"><div class="trail-main card"><div class="kicker">FORMAÇÃO DISPONÍVEL</div><h2>Financeiro — do dado à decisão</h2><p>Você aprende como o dado nasce, como validar a rotina, como interpretar resultado e caixa e como conectar prazos ao capital de giro.</p><div class="progress-track" style="margin-top:16px"><span style="width:'+st.percent+'%"></span></div><p style="font-size:10.5px">'+st.done+' de '+st.total+' atividades com domínio demonstrado.</p></div><aside class="trail-side card"><div class="kicker">MODELO DE DOMÍNIO</div><h3>Mais que “aula concluída”</h3><p>Conhecer → praticar → demonstrar → aplicar → validar. A formação acompanha evolução de competência, não apenas páginas visitadas.</p></aside></section><div class="module-list">'+modules+'</div>';
  }

  function stageButtons(active){
    var a=[["understand","1 · Entender"],["visualize","2 · Visualizar"],["apply","3 · Aplicar"],["validate","4 · Validar"],["demonstrate","5 · Demonstrar"]];
    return'<div class="stage-nav" role="tablist">'+a.map(function(x){return'<button type="button" data-stage="'+x[0]+'" class="'+(active===x[0]?"active":"")+'" role="tab">'+x[1]+'</button>'}).join("")+'</div>';
  }
  function lessonStageContent(slug,d,stage){
    if(stage==="understand"){
      return'<section class="lesson-panel card"><div class="kicker">01 · ENTENDER</div><h2>O que você precisa dominar</h2><p>'+termize(d.summary||"")+'</p>'+quickRows(d.outcomes||[])+'<div class="section" style="margin-top:20px"><div class="kicker">EM 1 MINUTO</div>'+quickRows(d.quick||[])+'</div>'+roleLens(d)+'</section>';
    }
    if(stage==="visualize"){
      var core="";
      if(d.definitions)core+='<div class="panel-grid">'+d.definitions.map(function(x){return'<div class="info-item"><strong>'+termize(x[0])+'</strong><p>'+termize(x[1])+'</p></div>'}).join("")+'</div>';
      if(d.principle)core+=callout("Princípio",d.principle,"green");
      if(d.objective)core+=callout("Objetivo do processo",d.objective,"green");
      if(d.inOneSentence)core+=callout("Em uma frase",d.inOneSentence,"green");
      if(d.formula)core+='<div class="formula-visual" style="margin-top:15px"><strong>'+termize(d.formula)+'</strong><span>Use a fórmula junto com a qualidade do dado e seus componentes.</span></div>';
      if(d.anatomy)core+=table(d.anatomy,["Linha","Leitura"]);
      if(d.steps)core+=flowRows(d.steps);
      if(d.analysisSteps)core+=flowRows(d.analysisSteps);
      if(d.analysis)core+=flowRows(d.analysis);
      if(d.classificationTree)core+=flowRows(d.classificationTree);
      return'<section class="lesson-panel card"><div class="kicker">02 · VISUALIZAR</div><h2>Transforme o conceito em um modelo mental</h2>'+lessonVisual(slug,d)+core+'</section>';
    }
    if(stage==="apply"){
      var core="";
      core+=example(d.mainExample||d.example||d.caseExample);
      if(d.edgeCases)core+=table(d.edgeCases,["Situação","Tratamento"]);
      if(d.compare)core+=table(d.compare,["Comparação","Para que serve"]);
      if(d.investigations)core+=table(d.investigations,["Sinal","Próxima investigação"]);
      if(d.timeline)core+=table(d.timeline);
      if(d.profitVsCash)core+=table(d.profitVsCash);
      if(d.interpretation)core+=flowRows(d.interpretation);
      if(d.cross)core+=table(d.cross);
      if(d.nextQuestion)core+=callout("Próxima pergunta",d.nextQuestion,"");
      if(!core)core=callout("Aplicação","Use o roteiro desta aula sobre um período real da empresa e registre as evidências que sustentam sua leitura.","green");
      return'<section class="lesson-panel card"><div class="kicker">03 · APLICAR O RACIOCÍNIO</div><h2>Leve o conceito para uma situação concreta</h2>'+core+'</section>';
    }
    if(stage==="validate"){
      var attention=[];
      ["mistakes","commonMistakes","notReady","notConclude","doesNotAnswer"].forEach(function(k){if(d[k])attention=attention.concat(d[k])});
      var core=validation(d.validation);
      if(d.stageValidation)core+=table(d.stageValidation,["Etapa","Como validar"]);
      if(d.finishCriteria)core+='<div class="section" style="margin-top:18px"><div class="kicker">CRITÉRIOS DE CONCLUSÃO</div>'+quickRows(d.finishCriteria)+'</div>';
      if(attention.length)core+='<div class="section" style="margin-top:18px"><div class="kicker">PONTOS DE ATENÇÃO</div>'+listRows(attention.slice(0,8))+'</div>';
      if(d.errorChain)core+='<div class="section" style="margin-top:18px"><div class="kicker">CADEIA DO ERRO</div>'+flowRows((d.errorChain||[]).map(function(x){return[x,""]}))+'</div>';
      core+=roleLens(d);
      return'<section class="lesson-panel card"><div class="kicker">04 · VALIDAR</div><h2>Saiba quando confiar — e quando parar</h2>'+core+'</section>';
    }
    return renderDemonstrate(slug,d);
  }
  function exerciseBox(slug,ex){
    if(!ex)return callout("Sem questão objetiva","Este conteúdo é demonstrado na prática integrada da trilha.","");
    var c=competency(slug);
    var ctx=ex.context?table(ex.context.rows,ex.context.headers):"";
    return'<div class="exercise" data-exercise="'+esc(slug)+'"><div class="kicker">DEMONSTRAÇÃO</div><h3>'+termize(ex.q)+'</h3>'+ctx+'<div class="answers">'+(ex.options||[]).map(function(o,i){return'<button type="button" data-answer="'+i+'" data-correct="'+ex.answer+'">'+termize(o)+'</button>'}).join("")+'</div><div class="feedback" aria-live="polite">'+(c.level>=3?"Você já demonstrou domínio desta aplicação.":"")+'</div></div>';
  }
  function renderDemonstrate(slug,d){
    var task=(PRODUCT.applicationTasks||{})[slug],c=competency(slug);
    var app="";
    if(task){
      app='<section class="application"><div class="kicker">APLICAR NA SUA EMPRESA</div><h3>'+esc(task.title)+'</h3><p>'+esc(task.action)+'</p><div class="application-grid"><div><strong>Evidência</strong><span>'+esc(task.evidence)+'</span></div><div><strong>Resultado esperado</strong><span>'+esc(task.result)+'</span></div><div><strong>Status</strong><span>'+levelLabel(c.level||0)+'</span></div></div><textarea data-application-note="'+esc(slug)+'" placeholder="Registre aqui o que foi aplicado, o período analisado e as principais evidências.">'+esc(c.applicationNote||"")+'</textarea><div class="application-actions"><button class="btn primary" type="button" data-save-application="'+esc(slug)+'">'+(c.level>=4?"Atualizar aplicação":"Registrar aplicação")+'</button>'+(c.level>=4?'<button class="btn ghost" type="button" data-validate="'+esc(slug)+'">'+(c.level>=5?"Ver validação":"Registrar validação com consultor")+'</button>':'')+'</div></section>';
    }
    return'<section class="lesson-panel card"><div class="kicker">05 · DEMONSTRAR</div><h2>Prove que entendeu e aplique</h2><p>A conclusão deixa de depender de rolagem da página. Primeiro demonstre o raciocínio; depois registre a aplicação real quando ela acontecer.</p>'+exerciseBox(slug,d.exercise)+app+'</section>';
  }
  var currentStage="understand";
  function renderLesson(slug){
    var d=DATA.lessons&&DATA.lessons[slug];if(!d){location.hash="#trails";return}
    var c=competency(slug);if((c.level||0)<1){setLevel(slug,1,{visitedAt:nowISO()});event("lesson_view",{slug:slug})}
    meta(d.title,"Trilha Financeiro · "+(d.type==="procedure"?"Procedimento":d.type==="indicator"?"Indicador":d.type==="analysis"?"Análise":"Conceito"));
    var idx=lessonIndex(slug),items=learningItems(),prev=idx>0?items[idx-1]:null,next=idx>=0&&idx<items.length-1?items[idx+1]:null;
    currentStage="understand";
    view.innerHTML='<div class="lesson-wrap"><section class="lesson-hero"><div class="lesson-intro card"><div class="kicker">'+(d.type==="procedure"?"PROCEDIMENTO":d.type==="indicator"?"INDICADOR":d.type==="analysis"?"ANÁLISE GERENCIAL":"CONCEITO")+'</div><h1>'+esc(d.title)+'</h1><p>'+termize(d.summary||"")+'</p><div class="lesson-meta"><span class="badge teal">'+esc(d.time||"")+'</span><span class="badge purple">'+esc(d.audience||"")+'</span><span class="badge">'+levelLabel(competency(slug).level||0)+'</span></div>'+levelStrip(slug)+'</div><aside class="lesson-visual card">'+lessonVisual(slug,d)+'</aside></section><div class="lesson-toolbar">'+stageButtons(currentStage)+'<span class="lesson-progress">Use as 5 etapas para aprender sem enfrentar uma página longa.</span></div><div id="lessonStage">'+lessonStageContent(slug,d,currentStage)+'</div><nav class="lesson-bottom">'+(prev?'<a class="card" style="padding:12px" href="'+prev.href+'"><span>Anterior</span><strong>← '+esc(prev.title)+'</strong></a>':'<span></span>')+(next?'<a class="card" style="padding:12px;text-align:right" href="'+next.href+'"><span>Próximo</span><strong>'+esc(next.title)+' →</strong></a>':'<a class="card" style="padding:12px;text-align:right" href="#progress"><span>Concluir</span><strong>Ver meu progresso →</strong></a>')+'</nav></div>';
  }
  function switchLessonStage(stage){
    var h=location.hash.split("/"),slug=h[1],d=DATA.lessons&&DATA.lessons[slug];if(!d)return;
    currentStage=stage;document.querySelectorAll("[data-stage]").forEach(function(b){b.classList.toggle("active",b.dataset.stage===stage)});
    var box=document.getElementById("lessonStage");if(box)box.innerHTML=lessonStageContent(slug,d,stage);
    box&&box.scrollIntoView({behavior:"smooth",block:"start"});
  }

  function renderCheckpoint(slug){
    var d=DATA.checkpoints&&DATA.checkpoints[slug];if(!d){location.hash="#trails";return}
    setLevel(slug,1,{visitedAt:nowISO()});event("checkpoint_view",{slug:slug});meta(d.title,"Checkpoint");
    view.innerHTML='<div class="lesson-wrap">'+pageHead("CHECKPOINT",esc(d.title),termize(d.summary||""),'<a class="btn" href="#trails">Voltar à trilha</a>')+'<section class="lesson-panel card"><h2>'+esc(d.objective||"Valide o que aprendeu")+'</h2>'+(d.context?table(d.context.rows,d.context.headers):"")+exerciseBox(slug,d.question)+(d.review?'<div class="section"><div class="kicker">REVISAR SE NECESSÁRIO</div><div class="grid2">'+d.review.map(function(r){return'<a class="card" style="padding:12px" href="#lesson/'+r[0]+'"><strong style="font-size:11px">'+esc(r[1])+'</strong></a>'}).join("")+'</div></div>':'')+'</section></div>';
  }
  function renderLab(slug){
    var d=DATA.labs&&DATA.labs[slug];if(!d){location.hash="#trails";return}
    setLevel(slug,1,{visitedAt:nowISO()});event("lab_view",{slug:slug});meta(d.title,"Laboratório");
    var qs=(d.questions||[]).map(function(q,qi){
      return'<div class="exercise" data-lab-q="'+qi+'" data-lab-root="'+esc(slug)+'"><div class="kicker">DECISÃO '+(qi+1)+'</div><h3>'+termize(q.q)+'</h3><div class="answers">'+q.options.map(function(o,i){return'<button type="button" data-lab-answer="'+i+'" data-correct="'+q.answer+'">'+termize(o)+'</button>'}).join("")+'</div><div class="feedback" aria-live="polite"></div></div>';
    }).join("");
    view.innerHTML='<div class="lesson-wrap">'+pageHead("LABORATÓRIO",esc(d.title),termize(d.summary||""),'<a class="btn" href="#trails">Voltar à trilha</a>')+'<section class="lesson-panel card"><h2>'+esc(d.intro||"Resolva a sequência de decisões")+'</h2>'+(d.context?table(d.context.rows,d.context.headers):"")+'<div data-lab-container="'+esc(slug)+'" data-required="'+(d.questions||[]).length+'">'+qs+'</div>'+callout("Síntese",d.takeaway||"","green")+'</section></div>';
  }
  function renderDiagnostic(){
    var d=DATA.diagnostic||{};setLevel("caixa-ruim",1,{visitedAt:nowISO()});meta(d.title||"Diagnóstico financeiro","Prática final");
    var path=d.path?flowRows(d.path):"";
    view.innerHTML='<div class="lesson-wrap">'+pageHead("PRÁTICA FINAL",esc(d.title||"Diagnóstico Financeiro"),termize(d.summary||d.intro||""),'<a class="btn" href="#resolve/caixa">Usar diagnóstico guiado</a>')+'<section class="lesson-panel card"><h2>Construa uma cadeia de evidências</h2>'+path+exerciseBox("caixa-ruim",d.exercise)+'</section></div>';
  }

  function renderResolve(){
    meta("Resolver um problema","Diagnóstico guiado");
    var parts=(location.hash||"").split("/"),id=parts[1]||((PRODUCT.diagnoses||[])[0]||{}).id;
    var chosen=(PRODUCT.diagnoses||[]).find(function(x){return x.id===id})||(PRODUCT.diagnoses||[])[0];
    var cards=(PRODUCT.diagnoses||[]).map(function(x){return'<a class="problem-card card" href="#resolve/'+x.id+'"><span class="problem-icon">'+icon(x.icon)+'</span><h3>'+esc(x.title)+'</h3><p>'+esc(x.desc)+'</p><span class="go">'+(x.id===chosen.id?"Selecionado":"Investigar")+' →</span></a>'}).join("");
    var questions=(chosen.questions||[]).map(function(q,i){return'<div class="diag-q" data-diag-q="'+esc(q.id)+'"><strong>'+(i+1)+'. '+esc(q.q)+'</strong><div class="diag-options"><button type="button" data-diag-answer="yes">Sim</button><button type="button" data-diag-answer="no">Não</button><button type="button" data-diag-answer="unknown">Não sei</button></div></div>'}).join("");
    view.innerHTML=pageHead("DIAGNOSTICAR","Resolver um problema","Comece pelo sintoma. Responda perguntas simples e o Ensino Lean organiza a próxima investigação — sem transformar hipótese em certeza.")+'<div class="diagnosis-layout"><div><div class="grid2">'+cards+'</div></div><aside class="diagnosis-side card"><div class="kicker">DIAGNÓSTICO GUIADO</div><h2>'+esc(chosen.title)+'</h2><p>'+esc(chosen.desc)+'</p><div class="question-stack" data-diagnosis="'+esc(chosen.id)+'">'+questions+'</div><div id="diagResult"></div></aside></div>';
  }
  function updateDiagnosis(){
    var rootQ=document.querySelector("[data-diagnosis]");if(!rootQ)return;
    var id=rootQ.dataset.diagnosis,d=(PRODUCT.diagnoses||[]).find(function(x){return x.id===id});if(!d)return;
    var resultKey=null,all=true;
    (d.questions||[]).some(function(q){
      var el=rootQ.querySelector('[data-diag-q="'+q.id+'"] .selected');if(!el){all=false;return true}
      var ans=el.dataset.diagAnswer,next=q[ans];if(next&&next!=="continue"){resultKey=next;return true}return false;
    });
    if(!resultKey&&all)resultKey={caixa:"timing",margem:"mix",estoque:"planejamento",receber:"comercial"}[id];
    var box=document.getElementById("diagResult");if(!box)return;
    if(!resultKey){box.innerHTML="";return}
    var r=d.results[resultKey];if(!r)return;
    box.innerHTML='<div class="diag-result"><div class="kicker">PRÓXIMO FOCO</div><h3>'+esc(r.title)+'</h3><p>'+esc(r.why)+'</p><div class="diag-result-links">'+(r.links||[]).map(function(l){return'<a href="'+l[1]+'">'+esc(l[0])+' →</a>'}).join("")+'</div></div>';
    event("diagnosis_result",{id:id,result:resultKey});
  }

  function librarySvg(type){
    var core=type==="Checklist"?'<rect x="36" y="16" width="70" height="70" rx="6"/><path d="m49 37 5 5 9-11M49 56l5 5 9-11M70 36h24M70 55h24M49 74h45"/>':type==="Indicador"?'<circle cx="72" cy="52" r="32"/><path d="M72 52 94 35M72 18v9M106 52h-9M72 86v-9M38 52h9"/>':type==="Playbook"?'<rect x="20" y="29" width="43" height="47"/><rect x="87" y="29" width="43" height="47"/><path d="M63 52h24m-8-7 9 7-9 7"/>':'<path d="M25 75h95"/><rect x="34" y="43" width="16" height="32"/><rect x="60" y="52" width="16" height="23"/><rect x="86" y="34" width="16" height="41"/>';
    return'<svg viewBox="0 0 150 100" fill="none" stroke="#345574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+core+'</svg>';
  }
  function renderLibrary(){
    meta("Biblioteca","Consulta rápida");
    var cards=(PRODUCT.library||[]).map(function(r){
      var d=DATA.lessons&&DATA.lessons[r.slug];if(!d)return"";
      return'<a class="resource-card card" href="#resource/'+r.slug+'" data-resource data-search="'+esc(norm(d.title+" "+d.summary+" "+r.format+" "+(r.tags||[]).join(" ")))+'" data-format="'+norm(r.format)+'"><div class="resource-cover">'+librarySvg(r.format)+'</div><div class="resource-body"><span class="badge purple" style="align-self:flex-start">'+esc(r.format)+'</span><h3>'+esc(d.title)+'</h3><p>'+esc(d.summary)+'</p><div class="resource-foot"><span>Financeiro</span><span>Consultar →</span></div></div></a>';
    }).join("");
    view.innerHTML=pageHead("CONSULTAR","Biblioteca Lean","Conteúdo desenhado para consulta no trabalho. O material rápido não substitui a aula: ele resume regra, roteiro, validação ou indicador e aponta para o aprofundamento.")+'<div class="toolbar"><input class="search-field" data-lib-search placeholder="Buscar por DRE, caixa, conciliação, PMR..."><div class="filters"><button class="filter active" data-lib-filter="todos">Todos</button><button class="filter" data-lib-filter="guia visual">Guias</button><button class="filter" data-lib-filter="checklist">Checklists</button><button class="filter" data-lib-filter="playbook">Playbooks</button><button class="filter" data-lib-filter="indicador">Indicadores</button></div></div><div class="grid3" id="libraryGrid">'+cards+'</div>';
  }
  function renderResource(slug){
    var d=DATA.lessons&&DATA.lessons[slug],cfg=(PRODUCT.library||[]).find(function(x){return x.slug===slug});if(!d||!cfg){location.hash="#library";return}
    meta(d.title,"Biblioteca · "+cfg.format);
    var core='<section class="reference-block card"><div class="kicker">ESSENCIAL</div><h2>Em menos de 2 minutos</h2>'+quickRows(d.quick||d.outcomes||[])+'</section>';
    if(d.type==="procedure")core+='<section class="reference-block card"><div class="kicker">ROTEIRO RÁPIDO</div><h2>Como executar</h2>'+flowRows((d.steps||[]).slice(0,7))+(d.finishCriteria?'<div style="margin-top:15px">'+quickRows(d.finishCriteria)+'</div>':'')+'</section>';
    else if(d.type==="indicator")core+='<section class="reference-block card"><div class="kicker">INDICADOR</div><h2>Fórmula e leitura</h2><div class="formula-visual" style="margin-top:13px"><strong>'+termize(d.formula||d.title)+'</strong></div>'+flowRows((d.interpretation||d.analysis||[]).slice(0,6))+'</section>';
    else if(d.type==="analysis")core+='<section class="reference-block card"><div class="kicker">ROTEIRO DE ANÁLISE</div><h2>O que olhar primeiro</h2>'+flowRows((d.analysisSteps||[]).slice(0,7))+(d.investigations?table(d.investigations,["Sinal","Abrir em seguida"]):"")+'</section>';
    else core+='<section class="reference-block card"><div class="kicker">CONCEITO</div><h2>Como pensar</h2>'+lessonVisual(slug,d)+(d.definitions?'<div class="panel-grid">'+d.definitions.map(function(x){return'<div class="info-item"><strong>'+termize(x[0])+'</strong><p>'+termize(x[1])+'</p></div>'}).join("")+'</div>':'')+'</section>';
    if(d.validation)core+='<section class="reference-block card"><div class="kicker">VALIDAÇÃO</div><h2>Quando confiar</h2>'+validation(d.validation)+'</section>';
    view.innerHTML='<div class="reference"><section class="reference-hero card"><span class="badge purple">'+esc(cfg.format)+'</span><h1>'+esc(d.title)+'</h1><p>'+termize(d.summary||"")+'</p><div class="actions" style="margin-top:15px"><a class="btn primary" href="#lesson/'+slug+'">Estudar conteúdo completo →</a><a class="btn" href="#library">Voltar à biblioteca</a></div></section>'+core+'</div>';
  }
  function filterLibrary(){
    var q=norm((document.querySelector("[data-lib-search]")||{}).value||""),f=(document.querySelector("[data-lib-filter].active")||{}).dataset?.libFilter||"todos";
    document.querySelectorAll("[data-resource]").forEach(function(c){var okQ=!q||(c.dataset.search||"").indexOf(q)>=0,okF=f==="todos"||c.dataset.format===f;c.style.display=okQ&&okF?"":"none"});
  }

  var sims=[
    {id:"margem",title:"Margem e desconto",desc:"Veja quanto um desconto consome da margem."},
    {id:"equilibrio",title:"Ponto de equilíbrio",desc:"Conecte margem, estrutura e lucro alvo."},
    {id:"capital",title:"Capital de giro",desc:"Simule PMR, PME, PMP e impacto estimado na NCG."},
    {id:"fluxo",title:"Fluxo projetado",desc:"Edite seis períodos e encontre o menor saldo."}
  ];
  function renderSimulators(){
    meta("Simuladores","Aprenda alterando variáveis");
    var id=(location.hash.split("/")[1]||"");
    if(!id){
      view.innerHTML=pageHead("EXPERIMENTAR","Simuladores","Os simuladores explicitam premissas e comparam cenários. Eles ensinam mecanismo — não classificam automaticamente uma empresa como boa ou ruim.")+'<div class="sim-list">'+sims.map(function(s){return'<article class="sim-card card"><div class="kicker">SIMULADOR</div><h3>'+s.title+'</h3><p>'+s.desc+'</p><a class="btn primary" href="#simulators/'+s.id+'">Abrir →</a></article>'}).join("")+'</div>';return;
    }
    var s=sims.find(function(x){return x.id===id});if(!s){location.hash="#simulators";return}
    var form="",ass="",result='<aside class="sim-result card"><div class="kicker">CENÁRIO</div><h3>Resultado da simulação</h3><div id="simOutput"></div></aside>';
    if(id==="margem"){
      form='<div class="fields"><div class="field"><label>Preço de venda (R$)</label><input data-sim="price" type="number" value="100"></div><div class="field"><label>Custo unitário (R$)</label><input data-sim="cost" type="number" value="55"></div><div class="field"><label>Frete unitário (R$)</label><input data-sim="freight" type="number" value="6"></div><div class="field"><label>Comissão (% da venda)</label><input data-sim="commission" type="number" value="5"></div><div class="field"><label>Impostos (% da venda)</label><input data-sim="tax" type="number" value="8"></div><div class="field"><label>Desconto simulado (%)</label><input data-sim="discount" type="number" value="7"></div></div>';
      ass='Premissas: custo e frete informados em R$ por unidade; comissão e impostos como percentual do preço líquido após desconto.';
    }else if(id==="equilibrio"){
      form='<div class="fields"><div class="field"><label>Despesas fixas mensais (R$)</label><input data-sim="fixed" type="number" value="180000"></div><div class="field"><label>Margem de contribuição (%)</label><input data-sim="mcpct" type="number" value="32"></div><div class="field"><label>Lucro alvo mensal (R$)</label><input data-sim="target" type="number" value="80000"></div><div class="field"><label>Receita atual (R$)</label><input data-sim="revenue" type="number" value="700000"></div></div>';
      ass='Premissa: margem de contribuição percentual estável no intervalo simulado. Não substitui análise de mix, capacidade ou impostos específicos.';
    }else if(id==="capital"){
      form='<div class="fields"><div class="field"><label>Receita mensal (R$)</label><input data-sim="sales" type="number" value="1000000"></div><div class="field"><label>CMV / custos variáveis mensais (R$)</label><input data-sim="cmv" type="number" value="600000"></div><div class="field"><label>PMR atual (dias)</label><input data-sim="pmr1" type="number" value="48"></div><div class="field"><label>PMR cenário (dias)</label><input data-sim="pmr2" type="number" value="38"></div><div class="field"><label>PME atual (dias)</label><input data-sim="pme1" type="number" value="38"></div><div class="field"><label>PME cenário (dias)</label><input data-sim="pme2" type="number" value="30"></div><div class="field"><label>PMP atual (dias)</label><input data-sim="pmp1" type="number" value="31"></div><div class="field"><label>PMP cenário (dias)</label><input data-sim="pmp2" type="number" value="35"></div></div>';
      ass='Estimativa didática: Clientes ≈ Receita/30×PMR; Estoque ≈ CMV/30×PME; Fornecedores ≈ CMV/30×PMP; NCG estimada = Clientes + Estoque − Fornecedores.';
    }else{
      var months=["Mês 1","Mês 2","Mês 3","Mês 4","Mês 5","Mês 6"];
      form='<div class="fields"><div class="field"><label>Saldo inicial (R$)</label><input data-sim="initial" type="number" value="150000"></div></div><div class="cash-table"><div class="cash-row"><span></span><span style="font-size:9px">Entradas (R$)</span><span style="font-size:9px">Saídas (R$)</span></div>'+months.map(function(m,i){return'<div class="cash-row"><span>'+m+'</span><input data-inflow="'+i+'" type="number" value="'+[230,240,225,250,260,270][i]+'000"><input data-outflow="'+i+'" type="number" value="'+[220,255,280,235,240,250][i]+'000"></div>'}).join("")+'</div>';
      ass='Fluxo simplificado por período. Use valores líquidos esperados de entrada e saída; para uso real, a projeção deve nascer da carteira de pagar e receber.';
    }
    view.innerHTML=pageHead("SIMULADOR",s.title,s.desc,'<a class="btn" href="#simulators">Todos os simuladores</a>')+'<div class="simulator"><section class="sim-form card"><h2>Premissas do cenário</h2><p>Altere os dados e leia o impacto. O resultado é recalculado automaticamente.</p>'+form+'<div class="assumptions">'+ass+'</div></section>'+result+'</div>';
    calculateSimulator(id);
  }
  function sval(name){return Number((document.querySelector('[data-sim="'+name+'"]')||{}).value||0)}
  function calculateSimulator(id){
    var out=document.getElementById("simOutput");if(!out)return;
    if(id==="margem"){
      var price=sval("price"),cost=sval("cost"),freight=sval("freight"),comm=sval("commission")/100,tax=sval("tax")/100,disc=sval("discount")/100;
      var mc=price-cost-freight-price*comm-price*tax,mcPct=price?mc/price*100:0,p2=price*(1-disc),mc2=p2-cost-freight-p2*comm-p2*tax,mcPct2=p2?mc2/p2*100:0;
      out.innerHTML='<div class="result-grid"><div class="result-metric"><small>MC atual</small><b>'+money(mc)+'</b></div><div class="result-metric"><small>MC% atual</small><b>'+pct(mcPct)+'</b></div><div class="result-metric"><small>MC com desconto</small><b>'+money(mc2)+'</b></div><div class="result-metric"><small>MC% com desconto</small><b>'+pct(mcPct2)+'</b></div></div><div class="result-insight">O desconto de '+pct(disc*100)+' reduz a contribuição unitária em <b>'+money(mc-mc2)+'</b>. Compare o ganho esperado de volume com a perda de contribuição antes de decidir.</div>';
    }else if(id==="equilibrio"){
      var fixed=sval("fixed"),mcp=sval("mcpct")/100,target=sval("target"),rev=sval("revenue"),pe=mcp?fixed/mcp:0,goal=mcp?(fixed+target)/mcp:0,current=rev*mcp-fixed;
      out.innerHTML='<div class="result-grid"><div class="result-metric"><small>Ponto de equilíbrio</small><b>'+money(pe)+'</b></div><div class="result-metric"><small>Receita para lucro alvo</small><b>'+money(goal)+'</b></div><div class="result-metric"><small>Resultado no faturamento atual</small><b>'+money(current)+'</b></div><div class="result-metric"><small>Folga sobre equilíbrio</small><b>'+money(rev-pe)+'</b></div></div><div class="result-insight">O ponto de equilíbrio depende diretamente da estrutura fixa e da margem de contribuição. Aumentar receita sem preservar margem pode afastar, e não aproximar, o lucro alvo.</div>';
    }else if(id==="capital"){
      var sales=sval("sales"),cmv=sval("cmv"),pmr1=sval("pmr1"),pmr2=sval("pmr2"),pme1=sval("pme1"),pme2=sval("pme2"),pmp1=sval("pmp1"),pmp2=sval("pmp2");
      var ncg1=sales/30*pmr1+cmv/30*pme1-cmv/30*pmp1,ncg2=sales/30*pmr2+cmv/30*pme2-cmv/30*pmp2,delta=ncg2-ncg1,cycle1=pme1+pmr1-pmp1,cycle2=pme2+pmr2-pmp2;
      out.innerHTML='<div class="result-grid"><div class="result-metric"><small>NCG estimada atual</small><b>'+money(ncg1)+'</b></div><div class="result-metric"><small>NCG cenário</small><b>'+money(ncg2)+'</b></div><div class="result-metric"><small>Variação estimada</small><b>'+money(delta)+'</b></div><div class="result-metric"><small>Ciclo</small><b>'+num(cycle1,0)+' → '+num(cycle2,0)+' dias</b></div></div><div class="result-insight">'+(delta<0?"O cenário libera aproximadamente <b>"+money(Math.abs(delta))+"</b> de capital operacional.":"O cenário exige aproximadamente <b>"+money(delta)+"</b> adicionais de capital operacional.")+' Use a simulação para testar drivers, não como substituto do cálculo real da NCG.</div>';
    }else{
      var initial=sval("initial"),bal=initial,arr=[],min=initial,minI=-1;
      for(var i=0;i<6;i++){var infl=Number((document.querySelector('[data-inflow="'+i+'"]')||{}).value||0),outf=Number((document.querySelector('[data-outflow="'+i+'"]')||{}).value||0);bal+=infl-outf;arr.push(bal);if(bal<min){min=bal;minI=i}}
      var maxAbs=Math.max.apply(null,arr.map(function(x){return Math.abs(x)}).concat([1]));
      out.innerHTML='<div class="result-grid"><div class="result-metric"><small>Menor saldo</small><b>'+money(min)+'</b></div><div class="result-metric"><small>Período crítico</small><b>'+(minI>=0?"Mês "+(minI+1):"Saldo inicial")+'</b></div><div class="result-metric"><small>Saldo final</small><b>'+money(bal)+'</b></div><div class="result-metric"><small>Variação total</small><b>'+money(bal-initial)+'</b></div></div><div class="cash-bars">'+arr.map(function(x,i){return'<div class="cash-bar '+(x<0?"neg":"")+'" style="height:'+Math.max(4,Math.abs(x)/maxAbs*100)+'%"><span>M'+(i+1)+'</span></div>'}).join("")+'</div><div class="result-insight">O foco gerencial deve estar no <b>menor saldo e na antecedência para agir</b>, não apenas no saldo final do horizonte.</div>';
    }
  }

  function renderCases(){
    meta("Casos práticos","Treine interpretação");
    var id=location.hash.split("/")[1]||"";
    if(!id){
      view.innerHTML=pageHead("PRATICAR","Casos práticos","Três empresas fictícias colocam os conceitos em contexto. O objetivo é construir diagnóstico com evidência antes de escolher a ação.")+'<div class="case-grid">'+(PRODUCT.cases||[]).map(function(c){return'<article class="case-card card"><span class="case-mark">'+esc(c.initials)+'</span><span class="badge teal" style="align-self:flex-start;margin-top:10px">'+esc(c.sector)+'</span><h3>'+esc(c.title)+'</h3><p><strong>'+esc(c.challenge)+'</strong></p><p>'+esc(c.story)+'</p><a class="btn primary" href="#cases/'+c.id+'">Abrir caso →</a></article>'}).join("")+'</div>';return;
    }
    var c=(PRODUCT.cases||[]).find(function(x){return x.id===id});if(!c){location.hash="#cases";return}
    view.innerHTML=pageHead("CASO PRÁTICO",esc(c.title),esc(c.challenge),'<a class="btn" href="#cases">Todos os casos</a>')+'<div class="case-detail"><section class="case-main card"><span class="badge teal">'+esc(c.sector)+'</span><h1 style="margin-top:8px">'+esc(c.title)+'</h1><p style="color:var(--muted);margin-top:8px">'+esc(c.story)+'</p><div class="case-metrics">'+c.metrics.map(function(m){return'<div class="case-metric"><strong>'+esc(m[1])+'</strong><span>'+esc(m[0])+'</span></div>'}).join("")+'</div><div class="case-quiz"><div class="kicker">CONSTRUA O DIAGNÓSTICO</div><h2>Decida com base nos dados</h2>'+c.questions.map(function(q,qi){return'<div class="exercise" data-case-q="'+qi+'"><h3>'+esc(q.q)+'</h3><div class="answers">'+q.options.map(function(o,i){return'<button type="button" data-case-answer="'+i+'" data-correct="'+q.answer+'">'+esc(o)+'</button>'}).join("")+'</div><div class="feedback" aria-live="polite"></div></div>'}).join("")+'</div></section><aside class="case-side card"><div class="kicker">PRÓXIMOS PASSOS</div><h3>Conecte o caso ao método</h3><p>Depois de responder, abra os conteúdos que explicam o mecanismo do caso.</p>'+(c.links||[]).map(function(l){return'<a class="btn ghost" style="color:#fff;border-color:rgba(255,255,255,.25)" href="'+l[1]+'">'+esc(l[0])+' →</a>'}).join("")+'</aside></div>';
  }

  function renderProgress(){
    meta("Meu progresso","Mapa de competências");
    var st=courseStats(),items=learningItems(),applied=Object.values(state.competencies).filter(function(c){return c.level>=4}).length,validated=Object.values(state.competencies).filter(function(c){return c.level>=5}).length,due=dueReviews();
    var rows=items.map(function(i){var c=competency(i.slug),l=c.level||0;return'<div class="comp-row"><div><strong>'+esc(i.title)+'</strong><small>'+esc(i.stageTitle||"")+' · '+levelLabel(l)+'</small></div><div class="level">'+[1,2,3,4,5].map(function(x){return'<i class="'+(l>=x?"on":"")+'"></i>'}).join("")+'</div><a class="text-link" href="'+i.href+'">Abrir →</a></div>'}).join("");
    view.innerHTML=pageHead("EVOLUIR","Meu progresso","A evolução é medida por competência: conhecer, praticar, demonstrar, aplicar e validar. Os dados desta versão ficam salvos neste navegador.")+'<div class="progress-layout"><aside class="progress-summary card"><div class="kicker">FORMAÇÃO FINANCEIRO</div><h2>'+st.percent+'% demonstrado</h2><div class="ring" style="--p:'+(st.percent*3.6)+'deg"><b>'+st.percent+'%</b></div><p>'+st.done+' de '+st.total+' atividades com domínio demonstrado.</p><div class="quick-list"><div class="quick-row" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.1)"><i>'+applied+'</i><p style="color:#d5e0e5">Aplicações registradas</p></div><div class="quick-row" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.1)"><i>'+validated+'</i><p style="color:#d5e0e5">Validações registradas</p></div><div class="quick-row" style="background:rgba(255,255,255,.07);border-color:rgba(255,255,255,.1)"><i>'+due.length+'</i><p style="color:#d5e0e5">Revisões pendentes</p></div></div></aside><section class="competency-table card"><div class="kicker">MAPA DE CONHECIMENTO</div><h2>Competências e atividades</h2>'+rows+'</section></div>';
  }

  function renderReview(slug){
    var d=DATA.lessons&&DATA.lessons[slug];if(!d||!d.exercise){location.hash="#progress";return}
    meta("Revisar "+d.title,"Reforço espaçado");
    var c=competency(slug);
    view.innerHTML='<div class="lesson-wrap">'+pageHead("REVISÃO","Reforce "+esc(d.title),"Uma revisão curta usa a aplicação original para recuperar o raciocínio sem reler toda a aula.",'<a class="btn" href="#lesson/'+slug+'">Rever aula</a>')+'<section class="lesson-panel card"><h2>Recupere o raciocínio</h2>'+exerciseBox(slug,d.exercise)+'<div class="callout"><strong>Agenda de retenção</strong><p>Ao acertar a revisão, o próximo reforço será agendado automaticamente neste navegador.</p></div></section></div>';
  }

  function renderConsultant(){
    meta("Painel Lean","Demonstração local");
    var events=state.events||[],views=events.filter(function(e){return e.type==="lesson_view"}).length,attempts=events.filter(function(e){return e.type==="exercise_attempt"}).length,apps=events.filter(function(e){return e.type==="application"}).length,searches=state.searches||[];
    var wrong={};events.filter(function(e){return e.type==="exercise_attempt"&&!e.data.correct}).forEach(function(e){wrong[e.data.slug]=(wrong[e.data.slug]||0)+1});
    var weak=Object.keys(wrong).sort(function(a,b){return wrong[b]-wrong[a]}).slice(0,5);
    var recent=events.slice(0,12).map(function(e){return'<div class="event"><span>'+new Date(e.at).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})+'</span><strong>'+esc(e.type.replace(/_/g," "))+'</strong><span>'+esc(e.data.slug||e.data.query||e.data.id||"")+'</span></div>'}).join("");
    view.innerHTML=pageHead("VISÃO DO CONSULTOR","Painel Lean — demonstração local","Esta tela mostra o tipo de informação que futuramente poderá ser sincronizado por empresa e usuário. Por enquanto, lê somente os dados deste navegador.")+'<div class="consult-grid"><div class="consult-stat card"><b>'+views+'</b><span>aberturas de aulas</span></div><div class="consult-stat card"><b>'+attempts+'</b><span>tentativas em aplicações</span></div><div class="consult-stat card"><b>'+apps+'</b><span>aplicações registradas</span></div><div class="consult-stat card"><b>'+searches.length+'</b><span>buscas realizadas</span></div></div><div class="grid2 section"><section class="card" style="padding:20px"><div class="kicker">PONTOS DE ATENÇÃO</div><h2 style="font-size:29px">Temas com mais erros</h2>'+(weak.length?listRows(weak.map(function(k){return itemTitle(k)+" · "+wrong[k]+" erro(s)"})):callout("Sem dados","Ainda não existem erros registrados neste navegador.","green"))+'</section><section class="card" style="padding:20px"><div class="kicker">BUSCAS RECENTES</div><h2 style="font-size:29px">Dúvidas pesquisadas</h2>'+(searches.length?listRows(searches.slice(0,8).map(function(x){return x.query})):callout("Sem dados","Ainda não existem buscas registradas.",""))+'</section></div><section class="card section" style="padding:20px"><div class="kicker">ATIVIDADE</div><h2 style="font-size:29px">Eventos recentes</h2><div class="event-list">'+(recent||'<div class="event"><span>—</span><strong>Sem atividade registrada</strong><span></span></div>')+'</div></section>';
  }

  function openModal(html){
    overlay.innerHTML='<div class="modal" role="dialog" aria-modal="true">'+html+'</div>';overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");
    setTimeout(function(){var x=overlay.querySelector("input,button");if(x)x.focus()},20);
  }
  function closeModal(){overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");overlay.innerHTML=""}
  function profileModal(onboarding){
    var roles=(PRODUCT.roles||[]).map(function(r){return'<button class="role-option '+(state.role===r.id?"selected":"")+'" type="button" data-role="'+r.id+'"><strong>'+esc(r.label)+'</strong><span>'+esc(r.desc)+'</span></button>'}).join("");
    openModal('<div class="modal-head"><div><div class="kicker">'+(onboarding?"PERSONALIZAR EXPERIÊNCIA":"PERFIL")+'</div><h2>'+(onboarding?"Qual é seu papel principal?":"Seu perfil de aprendizado")+'</h2><p>O conteúdo continua o mesmo, mas a plataforma destaca execução, análise ou decisão conforme seu papel.</p></div>'+(!onboarding?'<button class="close" type="button" data-close>×</button>':'')+'</div><div class="role-options">'+roles+'</div><div class="actions" style="margin-top:16px"><button class="btn primary" type="button" data-save-role '+(!state.role?"disabled":"")+'>Continuar</button>'+(!onboarding?'<a class="btn" href="#consultant" data-close>Visão do consultor</a>':'')+'</div>');
  }
  function searchModal(q){
    openModal('<div class="modal-head"><div><div class="kicker">BUSCA GLOBAL</div><h2>O que você quer aprender ou resolver?</h2><p>Os resultados são separados entre estudar, consultar e diagnosticar.</p></div><button class="close" type="button" data-close>×</button></div><div class="modal-search"><input data-global-search value="'+esc(q||"")+'" placeholder="Ex.: cliente demora a pagar; caixa caiu; DRE..."><button class="btn primary" type="button" data-run-search>Buscar</button></div><div id="searchResults" class="search-groups"></div>');
    runSearch(q||"");
  }
  function runSearch(q){
    var nq=norm(q),lessons=Object.keys(DATA.lessons||{}).map(function(slug){var d=DATA.lessons[slug],score=(norm(d.title).indexOf(nq)>=0?3:0)+(norm(d.summary).indexOf(nq)>=0?1:0);return{slug:slug,d:d,score:score}}).filter(function(x){return !nq||x.score>0}).sort(function(a,b){return b.score-a.score}).slice(0,5);
    var resources=(PRODUCT.library||[]).filter(function(r){var d=DATA.lessons[r.slug];return !nq||norm(d.title+" "+d.summary+" "+r.format+" "+(r.tags||[]).join(" ")).indexOf(nq)>=0}).slice(0,5);
    var diagnoses=(PRODUCT.diagnoses||[]).filter(function(d){return !nq||norm(d.title+" "+d.desc).indexOf(nq)>=0}).slice(0,4);
    (DATA.searchAliases||[]).forEach(function(a){if(nq&&a.terms.some(function(t){return norm(t).indexOf(nq)>=0||nq.indexOf(norm(t))>=0})){if(a.target.indexOf("#diagnostico")===0){var x=(PRODUCT.diagnoses||[])[0];if(x&&!diagnoses.some(function(d){return d.id===x.id}))diagnoses.unshift(x)}}});
    var box=document.getElementById("searchResults");if(!box)return;
    function group(title,arr,render){return arr.length?'<section class="search-group"><h3>'+title+'</h3>'+arr.map(render).join("")+'</section>':""}
    box.innerHTML=group("Aprender",lessons,function(x){return'<a class="search-item" href="#lesson/'+x.slug+'" data-close><strong>'+esc(x.d.title)+'</strong><span>Aula →</span></a>'})+
      group("Consultar",resources,function(r){return'<a class="search-item" href="#resource/'+r.slug+'" data-close><strong>'+esc(DATA.lessons[r.slug].title)+'</strong><span>'+esc(r.format)+' →</span></a>'})+
      group("Resolver",diagnoses,function(d){return'<a class="search-item" href="#resolve/'+d.id+'" data-close><strong>'+esc(d.title)+'</strong><span>Diagnóstico →</span></a>'})+
      ((!lessons.length&&!resources.length&&!diagnoses.length)?'<div class="callout"><strong>Nenhum resultado direto</strong><p>Tente um termo como caixa, DRE, estoque, cliente, pagamento ou recebimento.</p></div>':"");
    if(q){state.searches.unshift({query:q,at:nowISO()});state.searches=state.searches.slice(0,40);event("search",{query:q})}
  }
  function validationModal(slug){
    var c=competency(slug);
    openModal('<div class="modal-head"><div><div class="kicker">VALIDAÇÃO</div><h2>'+esc(itemTitle(slug))+'</h2><p>Registre uma validação realizada junto ao consultor ou responsável. Nesta versão o registro fica somente neste navegador.</p></div><button class="close" type="button" data-close>×</button></div><div class="validation-form"><input data-validator placeholder="Responsável pela validação" value="'+esc(c.validator||"")+'"><input data-validation-date type="date" value="'+esc((c.validatedAt||"").slice(0,10))+'"><textarea data-validation-note placeholder="O que foi validado?">'+esc(c.validationNote||"")+'</textarea></div><div class="actions" style="margin-top:12px"><button class="btn primary" type="button" data-save-validation="'+esc(slug)+'">Salvar validação</button></div>');
  }
  function termModal(key){
    var g=DATA.glossary&&DATA.glossary[key];if(!g)return;
    openModal('<div class="modal-head"><div><div class="kicker">GLOSSÁRIO</div><h2>'+esc(g.title)+'</h2><p>'+esc(g.desc)+'</p></div><button class="close" type="button" data-close>×</button></div>'+(g.link?'<div class="actions" style="margin-top:15px"><a class="btn primary" href="#lesson/'+g.link+'" data-close>Estudar tema completo →</a></div>':''));
  }

  function updateRoute(){
    closeModal();sidebar.classList.remove("open");var sc=document.querySelector("[data-side-scrim]");if(sc)sc.classList.remove("open");
    var h=location.hash||"#home",kind=routeKind();setActive();
    if(kind==="home")renderHome();
    else if(kind==="trails")renderTrails();
    else if(kind==="lesson")renderLesson(h.split("/")[1]);
    else if(kind==="checkpoint")renderCheckpoint(h.split("/")[1]);
    else if(kind==="lab")renderLab(h.split("/")[1]);
    else if(kind==="diagnostic")renderDiagnostic();
    else if(kind==="resolve")renderResolve();
    else if(kind==="library"){if(h.indexOf("#resource/")===0)renderResource(h.split("/")[1]);else renderLibrary()}
    else if(kind==="simulators")renderSimulators();
    else if(kind==="cases")renderCases();
    else if(kind==="progress")renderProgress();
    else if(kind==="review")renderReview(h.split("/")[1]);
    else if(kind==="consultant")renderConsultant();
    else renderHome();
    window.scrollTo(0,0);view.focus({preventScroll:true});
  }

  document.addEventListener("click",function(e){
    var el;
    if((el=e.target.closest("[data-mobile-menu]"))){sidebar.classList.toggle("open");document.querySelector("[data-side-scrim]")?.classList.toggle("open",sidebar.classList.contains("open"));return}
    if((el=e.target.closest("[data-side-scrim]"))){sidebar.classList.remove("open");el.classList.remove("open");return}
    if((el=e.target.closest("[data-pin]"))){state.sidebarPinned=!state.sidebarPinned;save();document.body.classList.toggle("sidebar-pinned",state.sidebarPinned);sidebar.classList.toggle("pinned",state.sidebarPinned);el.querySelector("span").textContent=state.sidebarPinned?"Recolher menu":"Fixar menu aberto";return}
    if((el=e.target.closest("[data-profile]"))){profileModal(false);return}
    if((el=e.target.closest("[data-search]"))){searchModal("");return}
    if((el=e.target.closest("[data-close]"))){closeModal();return}
    if((el=e.target.closest("[data-role]"))){state.role=el.dataset.role;save();overlay.querySelectorAll("[data-role]").forEach(function(b){b.classList.toggle("selected",b===el)});var sv=overlay.querySelector("[data-save-role]");if(sv)sv.disabled=false;return}
    if((el=e.target.closest("[data-save-role]"))){state.onboarded=true;save();closeModal();var rp=role();document.querySelectorAll(".top-pill[data-profile]").forEach(function(b){b.textContent=rp.label});var ps=document.querySelector(".profile-copy span");if(ps)ps.textContent=rp.short;updateRoute();return}
    if((el=e.target.closest("[data-run-search]"))){runSearch((overlay.querySelector("[data-global-search]")||{}).value||"");return}
    if((el=e.target.closest("[data-stage]"))){switchLessonStage(el.dataset.stage);return}
    if((el=e.target.closest("[data-term]"))){termModal(el.dataset.term);return}
    if((el=e.target.closest("[data-lib-filter]"))){document.querySelectorAll("[data-lib-filter]").forEach(function(b){b.classList.remove("active")});el.classList.add("active");filterLibrary();return}
    if((el=e.target.closest("[data-diag-answer]"))){var q=el.closest("[data-diag-q]");q.querySelectorAll("[data-diag-answer]").forEach(function(b){b.classList.remove("selected")});el.classList.add("selected");updateDiagnosis();return}
    if((el=e.target.closest("[data-answer]"))){
      var box=el.closest("[data-exercise]"),slug=box.dataset.exercise,correct=Number(el.dataset.correct),chosen=Number(el.dataset.answer),c=competency(slug);
      setLevel(slug,2,{practicedAt:nowISO()});box.querySelectorAll("[data-answer]").forEach(function(b){b.classList.remove("correct","wrong")});
      var ok=chosen===correct;c=competency(slug);if(ok){el.classList.add("correct");c.correct=(c.correct||0)+1;setLevel(slug,3,{demonstratedAt:nowISO(),reviewDue:c.reviewRound?addDays(c.reviewRound===1?30:90):addDays(7),reviewRound:c.reviewRound||0});box.querySelector(".feedback").textContent=(DATA.lessons&&DATA.lessons[slug]?DATA.lessons[slug].exercise.feedback:DATA.checkpoints&&DATA.checkpoints[slug]?DATA.checkpoints[slug].question.feedback:DATA.diagnostic&&slug==="caixa-ruim"?DATA.diagnostic.exercise.feedback:"Resposta correta.");if(location.hash.indexOf("#review/")===0){c.reviewRound=(c.reviewRound||0)+1;c.reviewDue=addDays(c.reviewRound===1?30:90);save();box.querySelector(".feedback").textContent+=" Próxima revisão agendada."}}else{el.classList.add("wrong");c.wrong=(c.wrong||0)+1;save();box.querySelector(".feedback").textContent="Revise o raciocínio e tente novamente."}event("exercise_attempt",{slug:slug,correct:ok});return;
    }
    if((el=e.target.closest("[data-lab-answer]"))){
      var qbox=el.closest("[data-lab-q]"),slugLab=qbox.dataset.labRoot,okLab=Number(el.dataset.labAnswer)===Number(el.dataset.correct);
      setLevel(slugLab,2,{practicedAt:nowISO()});qbox.querySelectorAll("[data-lab-answer]").forEach(function(b){b.classList.remove("correct","wrong")});
      if(okLab){el.classList.add("correct");qbox.dataset.solved="1";var lab=DATA.labs[slugLab],qi=Number(qbox.dataset.labQ);qbox.querySelector(".feedback").textContent=lab.questions[qi].feedback}else{el.classList.add("wrong");qbox.querySelector(".feedback").textContent="Tente novamente antes de avançar."}
      var all=qbox.parentElement.querySelectorAll("[data-lab-q]").length,solved=qbox.parentElement.querySelectorAll('[data-solved="1"]').length;if(all&&solved===all)setLevel(slugLab,3,{demonstratedAt:nowISO()});event("exercise_attempt",{slug:slugLab,correct:okLab});return;
    }
    if((el=e.target.closest("[data-case-answer]"))){
      var cb=el.closest("[data-case-q]"),caseId=location.hash.split("/")[1],cas=(PRODUCT.cases||[]).find(function(x){return x.id===caseId}),qi2=Number(cb.dataset.caseQ),ok2=Number(el.dataset.caseAnswer)===Number(el.dataset.correct);
      cb.querySelectorAll("[data-case-answer]").forEach(function(b){b.classList.remove("correct","wrong")});el.classList.add(ok2?"correct":"wrong");cb.querySelector(".feedback").textContent=ok2?cas.questions[qi2].feedback:"Revise os dados do caso e tente novamente.";event("case_attempt",{id:caseId,correct:ok2});return;
    }
    if((el=e.target.closest("[data-save-application]"))){
      var slugA=el.dataset.saveApplication,note=(document.querySelector('[data-application-note="'+slugA+'"]')||{}).value||"";setLevel(slugA,4,{appliedAt:nowISO(),applicationNote:note});event("application",{slug:slugA});switchLessonStage("demonstrate");return;
    }
    if((el=e.target.closest("[data-validate]"))){validationModal(el.dataset.validate);return}
    if((el=e.target.closest("[data-save-validation]"))){
      var slugV=el.dataset.saveValidation,validator=(overlay.querySelector("[data-validator]")||{}).value||"",date=(overlay.querySelector("[data-validation-date]")||{}).value||new Date().toISOString().slice(0,10),noteV=(overlay.querySelector("[data-validation-note]")||{}).value||"";
      setLevel(slugV,5,{validatedAt:date,validator:validator,validationNote:noteV});event("validation",{slug:slugV,validator:validator});closeModal();if(location.hash.indexOf("#lesson/")===0)switchLessonStage("demonstrate");return;
    }
  });
  document.addEventListener("input",function(e){
    if(e.target.matches("[data-lib-search]"))filterLibrary();
    if(e.target.matches("[data-sim],[data-inflow],[data-outflow]"))calculateSimulator(location.hash.split("/")[1]);
  });
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){closeModal();sidebar.classList.remove("open")}
    if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();searchModal("")}
    if(e.key==="Enter"&&overlay.classList.contains("open")&&document.activeElement.matches("[data-global-search]"))runSearch(document.activeElement.value);
  });
  overlay.addEventListener("click",function(e){if(e.target===overlay)closeModal()});
  window.addEventListener("hashchange",updateRoute);

  updateRoute();
  if(!state.role&&!state.onboarded)setTimeout(function(){profileModal(true)},120);
})();