/* Ensino Lean V12 — core, estado, shell e utilitários */
(function(){
  "use strict";
  const A=window.LeanApp=window.LeanApp||{};
  A.DATA=window.ENSINO||{};
  A.PRODUCT=window.ENSINO_PRODUCT||{};
  A.STATE_KEY="ensinoLeanV12State";
  A.PREV_KEY="ensinoLeanV11State";

  A.esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
  A.norm=v=>String(v||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  A.nowISO=()=>new Date().toISOString();
  A.addDays=d=>{const x=new Date();x.setDate(x.getDate()+d);return x.toISOString()};
  A.money=v=>Number(v||0).toLocaleString("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
  A.num=(v,d=1)=>Number(v||0).toLocaleString("pt-BR",{maximumFractionDigits:d});
  A.pct=v=>A.num(v,1)+"%";
  A.termize=t=>A.esc(t).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>'<button class="term" type="button" data-term="'+A.esc(key)+'">'+A.esc(label)+'</button>');

  A.icon=name=>{
    const d={
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
      cash:'<path d="M4 7h16v10H4z"/><circle cx="12" cy="12" r="2.4"/><path d="M7 12h.01M17 12h.01"/>',
      trend:'<path d="M4 18 9 11l4 3 7-9"/><path d="M16 5h4v4"/>',
      box:'<path d="M4 8l8-4 8 4-8 4z"/><path d="m4 8 8 4 8-4M4 8v8l8 4 8-4V8"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      review:'<path d="M4 7h10a6 6 0 1 1-5.2 9"/><path d="m4 7 3-3M4 7l3 3"/>',
      alert:'<path d="M12 3 2 21h20z"/><path d="M12 9v5M12 18h.01"/>',
      check:'<path d="m5 12 4 4L19 6"/>',
      arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>',
      layers:'<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
      target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'
    }[name]||'<circle cx="12" cy="12" r="8"/>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+d+'</svg>';
  };

  A.blankState=()=>({version:12,role:null,sidebarPinned:false,competencies:{},events:[],searches:[],profile:{name:"Bruno"},onboarded:false,assessment:null,favorites:[]});
  A.loadState=()=>{
    const s=A.blankState();
    try{const raw=JSON.parse(localStorage.getItem(A.STATE_KEY)||"null");if(raw)Object.assign(s,raw)}catch(_){}
    if(!localStorage.getItem(A.STATE_KEY)){
      try{
        const prev=JSON.parse(localStorage.getItem(A.PREV_KEY)||"null");
        if(prev){
          Object.assign(s,prev,{version:12});
          s.events=(prev.events||[]).slice(0,150);
          s.searches=(prev.searches||[]).slice(0,40);
        }
      }catch(_){}
    }
    s.competencies=s.competencies||{};s.events=s.events||[];s.searches=s.searches||[];s.favorites=s.favorites||[];
    return s;
  };
  A.state=A.loadState();
  A.save=()=>{try{localStorage.setItem(A.STATE_KEY,JSON.stringify(A.state))}catch(_){}};
  A.event=(type,data={})=>{A.state.events.unshift({type,at:A.nowISO(),data});A.state.events=A.state.events.slice(0,180);A.save()};
  A.competency=key=>{
    if(!A.state.competencies[key])A.state.competencies[key]={level:0,wrong:0,correct:0,demo:{}};
    if(!A.state.competencies[key].demo)A.state.competencies[key].demo={};
    return A.state.competencies[key];
  };
  A.setLevel=(key,level,extra={})=>{const c=A.competency(key);c.level=Math.max(c.level||0,level);Object.assign(c,extra);A.save();return c};
  A.levelLabel=l=>["Não iniciado","Conheceu","Praticou","Demonstrou","Aplicou","Validado"][l||0];
  A.role=()=>A.PRODUCT.roles?.find(r=>r.id===A.state.role)||A.PRODUCT.roles?.[1]||{id:"gestao",label:"Gestor financeiro",short:"Gestão"};
  A.roleGuide=type=>A.PRODUCT.roleGuidance?.[type]?.[A.role().id]||null;
  A.learningItems=()=>{
    const arr=[];
    (A.DATA.financeStages||[]).forEach((stage,si)=>(stage.items||[]).forEach(item=>{
      const href=item.lab?"#lab/"+item.slug:item.checkpoint?"#checkpoint/"+item.slug:item.diagnostic?"#diagnostico/caixa-ruim":"#lesson/"+item.slug;
      arr.push({...item,stageIndex:si,stageTitle:stage.title,href});
    }));
    return arr;
  };
  A.itemTitle=key=>A.DATA.lessons?.[key]?.title||A.DATA.checkpoints?.[key]?.title||A.DATA.labs?.[key]?.title||(key==="caixa-ruim"?(A.DATA.diagnostic?.title||"Diagnóstico"):key);
  A.demonstrated=key=>(A.competency(key).level||0)>=3;
  A.courseStats=()=>{const items=A.learningItems(),done=items.filter(i=>A.demonstrated(i.slug)).length;return{total:items.length,done,percent:items.length?Math.round(done/items.length*100):0}};
  A.nextItem=()=>A.learningItems().find(i=>!A.demonstrated(i.slug))||A.learningItems().at(-1);
  A.dueReviews=()=>{const now=Date.now();return Object.keys(A.state.competencies).filter(k=>{const c=A.state.competencies[k];return c.level>=3&&c.reviewDue&&new Date(c.reviewDue).getTime()<=now&&A.DATA.lessons?.[k]})};
  A.lessonIndex=slug=>A.learningItems().findIndex(i=>i.slug===slug);
  A.toggleFavorite=slug=>{const f=A.state.favorites||[];const i=f.indexOf(slug);if(i>=0)f.splice(i,1);else f.push(slug);A.save();return i<0};
  A.isFavorite=slug=>(A.state.favorites||[]).includes(slug);

  A.routeKind=()=>{
    const h=location.hash||"#home";
    if(h==="#home"||h==="")return"home";
    if(h==="#trails"||h==="#financeiro")return"trails";
    if(h.startsWith("#lesson/"))return"lesson";
    if(h.startsWith("#checkpoint/"))return"checkpoint";
    if(h.startsWith("#lab/"))return"lab";
    if(h.startsWith("#diagnostico/"))return"diagnostic";
    if(h==="#assessment")return"assessment";
    if(h.startsWith("#resolve"))return"resolve";
    if(h==="#library"||h.startsWith("#resource/"))return"library";
    if(h.startsWith("#simulators"))return"simulators";
    if(h.startsWith("#cases"))return"cases";
    if(h==="#progress")return"progress";
    if(h.startsWith("#review/"))return"review";
    if(h==="#consultant")return"consultant";
    return"home";
  };

  A.root=document.getElementById("root");
  A.nav=[
    ["home","Início","home","Painel"],
    ["trails","Trilhas","trail","Aprender"],
    ["resolve","Resolver um problema","help","Aplicar"],
    ["library","Biblioteca","book",""],
    ["simulators","Simuladores","calc",""],
    ["cases","Casos práticos","case",""],
    ["progress","Meu progresso","chart","Evolução"]
  ];

  A.shell=()=>{
    let nav="",last="";
    A.nav.forEach(n=>{
      if(n[3]&&n[3]!==last){nav+='<div class="nav-group">'+n[3]+'</div>';last=n[3]}
      nav+='<a href="#'+n[0]+'" data-nav="'+n[0]+'">'+A.icon(n[2])+'<span class="nav-label">'+n[1]+'</span><span class="nav-tip">'+n[1]+'</span></a>';
    });
    A.root.innerHTML='<a class="skip" href="#view">Pular para o conteúdo</a><div class="app">'+
      '<aside class="sidebar '+(A.state.sidebarPinned?"pinned":"")+'" id="sidebar"><a class="brand" href="#home"><span class="brand-mark">L</span><span class="brand-copy"><strong>Ensino Lean</strong><span>Lean Company</span></span></a><nav class="nav" aria-label="Navegação principal">'+nav+'</nav><div class="sidebar-footer"><button class="sidebar-toggle" type="button" data-pin>'+A.icon("pin")+'<span>'+(A.state.sidebarPinned?"Recolher menu":"Fixar menu aberto")+'</span></button><button class="profile-mini" type="button" data-profile><span class="avatar">B</span><span class="profile-copy"><strong>'+A.esc(A.state.profile?.name||"Bruno")+'</strong><span>'+A.esc(A.role().short)+'</span></span></button></div></aside>'+
      '<button class="side-scrim" type="button" data-side-scrim aria-label="Fechar menu"></button>'+
      '<div class="shell-main"><header class="topbar"><div class="top-left"><button class="mobile-menu" type="button" data-mobile-menu aria-label="Abrir menu" aria-expanded="false">'+A.icon("menu")+'</button><div class="crumb"><strong id="crumbTitle">Ensino Lean</strong><span id="crumbSub">Capacitação gerencial aplicada</span></div></div><div class="top-actions"><button class="top-pill" type="button" data-profile>'+A.esc(A.role().label)+'</button><button class="top-btn" type="button" data-search>'+A.icon("search")+'<span>Buscar</span></button></div></header><main id="view" class="content" tabindex="-1"></main></div></div><div id="overlay" class="overlay" aria-hidden="true"></div>';
    A.view=document.getElementById("view");A.sidebar=document.getElementById("sidebar");A.overlay=document.getElementById("overlay");
    document.body.classList.toggle("sidebar-pinned",!!A.state.sidebarPinned);
  };

  A.meta=(title,sub)=>{document.getElementById("crumbTitle").textContent=title;document.getElementById("crumbSub").textContent=sub||"Ensino Lean";document.title=title+" | Ensino Lean"};
  A.setActive=()=>{
    let k=A.routeKind(),active=k;
    if(["lesson","checkpoint","lab","diagnostic","review"].includes(k))active="trails";
    if(k==="assessment")active="home";
    document.querySelectorAll("[data-nav]").forEach(x=>x.dataset.nav===active?x.setAttribute("aria-current","page"):x.removeAttribute("aria-current"));
  };

  A.lastFocus=null;
  A.openModal=html=>{
    A.lastFocus=document.activeElement;
    A.overlay.innerHTML='<div class="modal" role="dialog" aria-modal="true">'+html+'</div>';
    A.overlay.classList.add("open");A.overlay.setAttribute("aria-hidden","false");
    setTimeout(()=>A.overlay.querySelector("input,button,a[href]")?.focus(),20);
  };
  A.closeModal=()=>{
    const was=A.overlay.classList.contains("open");
    A.overlay.classList.remove("open");A.overlay.setAttribute("aria-hidden","true");A.overlay.innerHTML="";
    if(was&&A.lastFocus&&typeof A.lastFocus.focus==="function")setTimeout(()=>{try{A.lastFocus.focus()}catch(_){}},0);
  };

  A.profileModal=onboarding=>{
    const roles=(A.PRODUCT.roles||[]).map(r=>'<button class="role-option '+(A.state.role===r.id?"selected":"")+'" type="button" data-role="'+r.id+'"><strong>'+A.esc(r.label)+'</strong><span>'+A.esc(r.desc)+'</span></button>').join("");
    A.openModal('<div class="modal-head"><div><div class="kicker">'+(onboarding?"PERSONALIZAR EXPERIÊNCIA":"PERFIL")+'</div><h2>'+(onboarding?"Qual é seu papel principal?":"Seu foco de aprendizagem")+'</h2><p>A V12 adapta ênfase, linguagem e próximos passos conforme seu papel. Você pode mudar isso depois.</p></div>'+(!onboarding?'<button class="close" type="button" data-close>×</button>':'')+'</div><div class="role-options">'+roles+'</div><div class="actions modal-actions"><button class="btn primary" type="button" data-save-role '+(!A.state.role?"disabled":"")+'>Continuar</button>'+(!onboarding?'<a class="btn" href="#consultant" data-close>Visão do consultor</a>':'')+'</div>');
  };

  A.searchModal=q=>{
    A.openModal('<div class="modal-head"><div><div class="kicker">BUSCA GLOBAL</div><h2>O que você quer aprender ou resolver?</h2><p>Busque pelo termo técnico ou pela dor do dia a dia.</p></div><button class="close" type="button" data-close>×</button></div><div class="modal-search"><input aria-label="Buscar no Ensino Lean" data-global-search value="'+A.esc(q||"")+'" placeholder="Ex.: caixa caiu; cliente demora a pagar; margem..."><button class="btn primary" type="button" data-run-search>Buscar</button></div><div id="searchResults" class="search-groups"></div>');
    A.runSearch(q||"");
  };
  A.runSearch=q=>{
    const nq=A.norm(q);
    const lessons=Object.keys(A.DATA.lessons||{}).map(slug=>{const d=A.DATA.lessons[slug];const hay=A.norm(d.title+" "+d.summary+" "+(d.quick||[]).join(" "));const score=!nq?1:(A.norm(d.title).includes(nq)?4:0)+(hay.includes(nq)?1:0);return{slug,d,score}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,6);
    const resources=(A.PRODUCT.library||[]).filter(r=>{const d=A.DATA.lessons?.[r.slug];return d&&(!nq||A.norm(d.title+" "+d.summary+" "+r.format+" "+(r.tags||[]).join(" ")).includes(nq))}).slice(0,6);
    const diagnoses=(A.PRODUCT.diagnoses||[]).filter(d=>!nq||A.norm(d.title+" "+d.desc).includes(nq)).slice(0,4);
    (A.DATA.searchAliases||[]).forEach(alias=>{
      if(nq&&alias.terms.some(t=>A.norm(t).includes(nq)||nq.includes(A.norm(t)))){
        const slug=(alias.target.match(/#lesson\/([^/]+)/)||[])[1];
        if(slug&&A.DATA.lessons?.[slug]&&!lessons.some(x=>x.slug===slug))lessons.unshift({slug,d:A.DATA.lessons[slug],score:5});
      }
    });
    const group=(title,arr,fn)=>arr.length?'<section class="search-group"><h3>'+title+'</h3>'+arr.map(fn).join("")+'</section>':"";
    const box=document.getElementById("searchResults");if(!box)return;
    box.innerHTML=group("Aprender",lessons,x=>'<a class="search-item" href="#lesson/'+x.slug+'" data-close><strong>'+A.esc(x.d.title)+'</strong><span>Aula →</span></a>')+
      group("Consultar",resources,r=>'<a class="search-item" href="#resource/'+r.slug+'" data-close><strong>'+A.esc(A.DATA.lessons[r.slug].title)+'</strong><span>'+A.esc(r.format)+' →</span></a>')+
      group("Resolver",diagnoses,d=>'<a class="search-item" href="#resolve/'+d.id+'" data-close><strong>'+A.esc(d.title)+'</strong><span>Diagnóstico →</span></a>')+
      ((!lessons.length&&!resources.length&&!diagnoses.length)?'<div class="callout amber"><strong>Nenhum resultado direto</strong><p>Tente caixa, margem, recebimento, estoque, orçamento ou fechamento.</p></div>':"");
    if(q){A.state.searches.unshift({query:q,at:A.nowISO()});A.state.searches=A.state.searches.slice(0,50);A.event("search",{query:q})}
  };

  A.shell();

  document.addEventListener("click",e=>{
    let el;
    if((el=e.target.closest("[data-mobile-menu]"))){A.sidebar.classList.toggle("open");const on=A.sidebar.classList.contains("open");el.setAttribute("aria-expanded",on?"true":"false");document.querySelector("[data-side-scrim]")?.classList.toggle("open",on);return}
    if((el=e.target.closest("[data-side-scrim]"))){A.sidebar.classList.remove("open");el.classList.remove("open");document.querySelector("[data-mobile-menu]")?.setAttribute("aria-expanded","false");return}
    if((el=e.target.closest("[data-pin]"))){A.state.sidebarPinned=!A.state.sidebarPinned;A.save();document.body.classList.toggle("sidebar-pinned",A.state.sidebarPinned);A.sidebar.classList.toggle("pinned",A.state.sidebarPinned);el.querySelector("span").textContent=A.state.sidebarPinned?"Recolher menu":"Fixar menu aberto";return}
    if((el=e.target.closest("[data-profile]"))){A.profileModal(false);return}
    if((el=e.target.closest("[data-search]"))){A.searchModal("");return}
    if((el=e.target.closest("[data-close]"))){A.closeModal();return}
    if((el=e.target.closest("[data-role]"))){A.state.role=el.dataset.role;A.save();A.overlay.querySelectorAll("[data-role]").forEach(b=>b.classList.toggle("selected",b===el));const save=A.overlay.querySelector("[data-save-role]");if(save)save.disabled=false;return}
    if((el=e.target.closest("[data-save-role]"))){A.state.onboarded=true;A.save();A.closeModal();document.querySelector(".top-pill[data-profile]").textContent=A.role().label;const p=document.querySelector(".profile-copy span");if(p)p.textContent=A.role().short;A.navigate();return}
    if((el=e.target.closest("[data-run-search]"))){A.runSearch(A.overlay.querySelector("[data-global-search]")?.value||"");return}
    if((el=e.target.closest("[data-term]"))){const g=A.DATA.glossary?.[el.dataset.term];if(g)A.openModal('<div class="modal-head"><div><div class="kicker">GLOSSÁRIO</div><h2>'+A.esc(g.title)+'</h2><p>'+A.esc(g.desc)+'</p></div><button class="close" type="button" data-close>×</button></div>'+(g.link?'<div class="actions modal-actions"><a class="btn primary" href="#lesson/'+g.link+'" data-close>Estudar tema →</a></div>':''));return}
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){A.closeModal();A.sidebar.classList.remove("open");document.querySelector("[data-side-scrim]")?.classList.remove("open")}
    if(e.key==="/"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName)){e.preventDefault();A.searchModal("")}
    if(e.key==="Enter"&&A.overlay.classList.contains("open")&&document.activeElement.matches("[data-global-search]"))A.runSearch(document.activeElement.value);
    if(e.key==="Tab"&&A.overlay.classList.contains("open")){
      const f=[...A.overlay.querySelectorAll("button,a[href],input,textarea,select,[tabindex]:not([tabindex='-1'])")].filter(x=>!x.disabled&&x.offsetParent!==null);
      if(f.length){const first=f[0],last=f.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
    }
  });
  A.overlay.addEventListener("click",e=>{if(e.target===A.overlay)A.closeModal()});
})();