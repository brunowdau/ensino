/* Ensino Lean V10.1 — shell de ecossistema */
(function(){
  "use strict";

  const ecoEsc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
  const icon=(name)=>{
    const p={
      home:'<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-7h6v7"/>',
      trail:'<circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 6h4a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4h0"/><path d="M5 8v8a2 2 0 0 0 2 2h10"/>',
      help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.7 1.2c-.8 1.1-2.2 1.5-2.2 3.3"/><path d="M12 17h.01"/>',
      book:'<path d="M4 4h5v16H4zM10.5 4H16v16h-5.5zM17.5 7H21v13h-3.5z"/>',
      calc:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M7 7h10M8 12h1M12 12h1M16 12h1M8 16h1M12 16h1M16 16h1"/>',
      case:'<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-6h8v6M8 10h.01M12 10h.01M16 10h.01"/>',
      chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
      search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
      cash:'<path d="M4 7h16v10H4z"/><path d="M8 12h.01M16 12h.01"/><circle cx="12" cy="12" r="2.3"/>',
      margin:'<path d="M4 18 9 11l4 3 7-9"/><path d="M16 5h4v4"/>',
      stock:'<path d="M4 8l8-4 8 4-8 4z"/><path d="m4 8 8 4 8-4M4 8v8l8 4 8-4V8"/>',
      clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
    }[name]||'<circle cx="12" cy="12" r="8"/>';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>';
  };

  const nav=[
    {href:'#home',label:'Início',icon:'home',group:'Painel'},
    {href:'#trails',label:'Trilhas',icon:'trail',group:'Aprender'},
    {href:'#library',label:'Biblioteca',icon:'book'},
    {href:'#resolve',label:'Resolver um problema',icon:'help',group:'Aplicar'},
    {href:'#simulators',label:'Simuladores',icon:'calc'},
    {href:'#cases',label:'Casos práticos',icon:'case'},
    {href:'#progress',label:'Meu progresso',icon:'chart',group:'Evolução'}
  ];

  const routeMeta={
    home:['Ensino Lean','Capacitação gerencial aplicada'],
    trails:['Trilhas','Aprendizado estruturado'],
    financeiro:['Financeiro','Trilha · do dado à decisão'],
    resolve:['Resolver um problema','Diagnóstico guiado'],
    library:['Biblioteca','Consulta rápida'],
    simulators:['Simuladores','Aprenda alterando variáveis'],
    cases:['Casos práticos','Treine interpretação'],
    progress:['Meu progresso','Mapa de conhecimento'],
    lesson:['Aula','Trilha Financeiro'],
    checkpoint:['Checkpoint','Validação integrada'],
    lab:['Laboratório','Prática aplicada'],
    diagnostic:['Prática final','Diagnóstico financeiro']
  };

  function sectionForHash(h=location.hash||'#home'){
    if(h==='#home'||!h)return'home';
    if(h==='#trails')return'trails';
    if(h==='#financeiro')return'financeiro';
    if(h.startsWith('#resolve'))return'resolve';
    if(h==='#library')return'library';
    if(h==='#simulators')return'simulators';
    if(h==='#cases')return'cases';
    if(h==='#progress')return'progress';
    if(h.startsWith('#lesson/'))return'lesson';
    if(h.startsWith('#checkpoint/'))return'checkpoint';
    if(h.startsWith('#lab/'))return'lab';
    if(h.startsWith('#diagnostico/'))return'diagnostic';
    return'home';
  }

  function activeNav(section){
    if(['financeiro','lesson','checkpoint','lab','diagnostic'].includes(section))return'trails';
    return section;
  }

  function installShell(){
    if(document.querySelector('.eco-sidebar'))return;
    document.body.classList.add('manual-v101');
    const logo=document.querySelector('.brand-logo')?.src||'';
    const side=document.createElement('aside');
    side.className='eco-sidebar';
    side.innerHTML='<div class="eco-brand"><div class="eco-brand-box">'+(logo?'<img src="'+logo+'" alt="Lean Company">':'<span class="eco-brand-fallback">L</span>')+'</div><div class="eco-brand-title">Ensino Lean</div></div><nav class="eco-nav">'+
      nav.map((n,i)=>{
        const group=n.group?'<div class="eco-nav-group">'+n.group+'</div>':'';
        const sep=n.group&&i?'<div class="eco-nav-sep"></div>':'';
        return sep+group+'<a href="'+n.href+'" data-eco-nav="'+n.href.slice(1)+'">'+icon(n.icon)+'<span class="eco-nav-label">'+n.label+'</span></a>';
      }).join('')+
      '</nav><div class="eco-profile"><div class="eco-avatar">B</div><div class="eco-profile-copy"><strong>Bruno</strong><span>Modo demonstração</span></div></div>';
    document.body.appendChild(side);

    const top=document.createElement('header');
    top.className='eco-topbar';
    top.innerHTML='<div class="eco-top-left"><button class="eco-mobile-menu" type="button" data-eco-menu aria-label="Abrir menu">'+icon('menu')+'</button><div class="eco-crumb"><strong id="ecoCrumbTitle">Ensino Lean</strong><span id="ecoCrumbSub">Capacitação gerencial aplicada</span></div></div><div class="eco-top-actions"><span class="eco-context-pill">Financeiro disponível</span><button class="eco-top-btn" type="button" data-eco-search>'+icon('search')+'<span>Buscar</span></button></div>';
    document.body.appendChild(top);
    const scrim=document.createElement('div');scrim.className='eco-scrim';document.body.appendChild(scrim);
  }

  function updateChrome(){
    const s=sectionForHash(),meta=routeMeta[s]||routeMeta.home;
    const title=document.getElementById('ecoCrumbTitle'),sub=document.getElementById('ecoCrumbSub');
    if(title)title.textContent=meta[0];if(sub)sub.textContent=meta[1];
    const active=activeNav(s);
    document.querySelectorAll('[data-eco-nav]').forEach(a=>a.classList.toggle('active',a.dataset.ecoNav===active));
    document.querySelector('.eco-sidebar')?.classList.remove('mobile-open');
    document.querySelector('.eco-scrim')?.classList.remove('open');
  }

  function stats(){
    try{return typeof progressStats==='function'?progressStats():{total:0,completed:0,percent:0}}catch(_){return{total:0,completed:0,percent:0}}
  }
  function progressData(){
    try{return typeof getProgress==='function'?getProgress():{completed:[],passed:[],lastVisited:null}}catch(_){return{completed:[],passed:[],lastVisited:null}}
  }
  function nextItem(){
    try{return typeof recommendedItem==='function'?recommendedItem():null}catch(_){return null}
  }
  function itemHref(slug){
    if(DATA?.checkpoints?.[slug])return'#checkpoint/'+slug;
    if(DATA?.labs?.[slug])return'#lab/'+slug;
    if(slug==='caixa-ruim')return'#diagnostico/caixa-ruim';
    return'#lesson/'+slug;
  }
  function stageStats(stage){
    const p=progressData(),done=new Set(p.completed||[]),items=stage.items||[],c=items.filter(x=>done.has(x.slug)).length;
    return{done:c,total:items.length,percent:items.length?Math.round(c/items.length*100):0};
  }
  function currentLabel(key){
    const all=[];(DATA.financeStages||[]).forEach(s=>(s.items||[]).forEach(x=>all.push(x)));
    return all.find(x=>x.slug===key)?.title||'Financeiro — do dado à decisão';
  }
  function money(v){return Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:2})}
  function num(v){return Number(v||0).toLocaleString('pt-BR',{maximumFractionDigits:1})}

  function homeVisual(){
    return '<svg viewBox="0 0 180 110" fill="none"><rect x="20" y="18" width="105" height="67" rx="9" fill="#173349"/><rect x="31" y="28" width="83" height="45" rx="5" fill="#fff"/><path d="M38 63 54 52l15 5 14-20 14 7 12-15" stroke="#10a2a5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="109" cy="29" r="5" fill="#5b45a6"/><rect x="58" y="91" width="38" height="7" rx="3.5" fill="#9fb4bf"/><rect x="135" y="31" width="27" height="40" rx="6" fill="#e8f7f5" stroke="#b8d9d7"/><path d="m142 51 5 5 9-12" stroke="#0b7f82" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
  function libraryVisual(type){
    const map={
      'Guia visual':'<path d="M24 77h92"/><rect x="32" y="42" width="15" height="35"/><rect x="56" y="51" width="15" height="26"/><rect x="80" y="35" width="15" height="42"/><rect x="104" y="58" width="15" height="19"/>',
      'Checklist':'<rect x="39" y="17" width="62" height="68" rx="5"/><path d="m50 37 4 4 8-9M50 55l4 4 8-9M69 36h21M69 54h21M50 72h40"/>',
      'Playbook':'<rect x="22" y="28" width="42" height="48"/><rect x="87" y="28" width="42" height="48"/><path d="M64 52h23m-8-7 9 7-9 7"/>',
      'Indicador':'<circle cx="72" cy="54" r="31"/><path d="M72 54 92 38M72 22v8M104 54h-8M72 86v-8M40 54h8"/>'
    };
    return '<svg viewBox="0 0 150 100" fill="none" stroke="#345574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+(map[type]||map['Guia visual'])+'</svg>';
  }

  const problems=[
    {key:'caixa',title:'Tenho lucro, mas falta dinheiro',desc:'Separe resultado, timing financeiro e capital de giro.',ico:'cash',
      steps:[['DRE','Confirme se o resultado é real.','#lesson/dre-gerencial'],['Fluxo','Veja quando o dinheiro entra e sai.','#lesson/fluxo-de-caixa'],['PMR e PME','Descubra onde o capital ficou preso.','#lesson/pmr'],['Ciclo','Meça os dias financiados pela empresa.','#lesson/ciclo-financeiro'],['Diagnóstico','Integre as evidências.','#diagnostico/caixa-ruim']]},
    {key:'margem',title:'Vendo mais, mas sobra pouco',desc:'Localize onde a receita está sendo consumida.',ico:'margin',
      steps:[['DRE','Abra a formação do resultado.','#lesson/dre-gerencial'],['Margem','Separe preço, custo e despesas variáveis.','#lesson/dre-gerencial'],['Mix','Compare o que cresce e o que contribui.','#lesson/dre-gerencial'],['Fluxo','Confirme se existe efeito financeiro adicional.','#lesson/fluxo-de-caixa']]},
    {key:'estoque',title:'Meu estoque está consumindo caixa',desc:'Conecte prazo de estoque, ciclo e necessidade de capital.',ico:'stock',
      steps:[['PME','Meça quanto tempo o capital fica em estoque.','#lesson/pme'],['Ciclo','Conecte estoque, recebimento e fornecedor.','#lesson/ciclo-financeiro'],['NCG','Meça a pressão operacional.','#lesson/ncg']]},
    {key:'receber',title:'Clientes demoram para pagar',desc:'Diferencie prazo comercial, atraso e impacto no caixa.',ico:'clock',
      steps:[['Contas a receber','Valide a carteira.','#lesson/contas-a-receber'],['PMR','Meça o prazo médio.','#lesson/pmr'],['Fluxo','Projete o impacto financeiro.','#lesson/fluxo-de-caixa']]},
    {key:'descasamento',title:'Pago antes de receber',desc:'Veja se o ciclo financeiro está transferindo o financiamento para a empresa.',ico:'clock',
      steps:[['PMP','Quanto o fornecedor financia?','#lesson/pmp'],['PMR','Quanto tempo o cliente leva?','#lesson/pmr'],['PME','Quanto tempo fica em estoque?','#lesson/pme'],['Ciclo','Some os efeitos.','#lesson/ciclo-financeiro']]},
    {key:'crescimento',title:'Cresci e meu caixa piorou',desc:'Crescimento pode exigir capital antes de devolver dinheiro.',ico:'chart',
      steps:[['Resultado','O crescimento foi rentável?','#lesson/dre-gerencial'],['Prazos','PMR, PME e PMP mudaram?','#lesson/pmr'],['NCG','Quanto recurso adicional foi exigido?','#lesson/ncg'],['Prática final','Construa o diagnóstico.','#diagnostico/caixa-ruim']]}
  ];

  const library=[
    {slug:'caixa-x-competencia',type:'Guia visual',title:'Caixa x Competência',desc:'O mesmo fato econômico visto pela DRE e pelo dinheiro.'},
    {slug:'plano-de-contas',type:'Lean Card',title:'Plano de Contas',desc:'Classifique pela natureza econômica, não pelo nome do fornecedor.'},
    {slug:'fechamento-financeiro',type:'Checklist',title:'Fechamento Financeiro',desc:'Validações mínimas antes de liberar o mês para análise.'},
    {slug:'dre-gerencial',type:'Playbook',title:'Como ler uma DRE',desc:'Da receita ao resultado: sequência, sinais e próximas perguntas.'},
    {slug:'fluxo-de-caixa',type:'Guia visual',title:'Fluxo de Caixa',desc:'Antecipe vales de caixa antes que virem urgência.'},
    {slug:'pmr',type:'Indicador',title:'PMR',desc:'Quanto tempo a empresa leva para transformar venda em dinheiro.'},
    {slug:'pmp',type:'Indicador',title:'PMP',desc:'Quanto tempo os fornecedores financiam a operação.'},
    {slug:'pme',type:'Indicador',title:'PME',desc:'Quanto tempo o capital permanece convertido em estoque.'},
    {slug:'ciclo-financeiro',type:'Lean Card',title:'Ciclo Financeiro',desc:'Quantos dias a empresa precisa financiar a própria operação.'},
    {slug:'ncg',type:'Playbook',title:'Necessidade de Capital de Giro',desc:'Entenda por que crescimento pode consumir caixa.'}
  ];

  function renderHome(){
    const st=stats(),next=nextItem(),p=progressData(),nextTitle=next?.title||'Começar a trilha Financeiro',nextHref=next?.href||'#financeiro';
    const stages=DATA.financeStages||[];
    const problemCards=problems.slice(0,4).map(x=>'<a class="eco-problem" href="#resolve/'+x.key+'"><span class="eco-problem-icon">'+icon(x.ico)+'</span><strong>'+x.title+'</strong><p>'+x.desc+'</p><span class="eco-problem-arrow">→</span></a>').join('');
    const road=stages.map((s,i)=>{const ss=stageStats(s);const cls=ss.percent===100?'done':ss.percent>0?'current':'';return '<div class="eco-road-step '+cls+'"><div class="eco-road-dot">'+(ss.percent===100?'✓':i+1)+'</div><strong>'+ecoEsc(s.title)+'</strong><span>'+ss.done+'/'+ss.total+' atividades</span></div>'}).join('');
    const resources=library.slice(0,4).map(r=>'<a class="eco-resource" href="'+itemHref(r.slug)+'"><span class="eco-type">'+r.type+'</span><h3>'+r.title+'</h3><p>'+r.desc+'</p><div class="eco-resource-foot"><span>Financeiro</span><span>Abrir →</span></div></a>').join('');
    app.innerHTML='<main class="eco-view"><section class="eco-dashboard-hero"><div class="eco-hero-main"><div class="eco-kicker">ENSINO LEAN</div><h1>Aprenda para executar. <span>Use para decidir.</span></h1><p>Uma plataforma de capacitação gerencial aplicada ao dia a dia da empresa. Estude em sequência, consulte durante o trabalho ou comece por um problema real.</p><div class="eco-hero-actions"><a class="eco-btn primary" href="'+nextHref+'">'+(st.completed?'Continuar aprendendo':'Começar formação')+' →</a><a class="eco-btn" href="#resolve">Resolver um problema</a><a class="eco-btn" href="#library">Consultar biblioteca</a></div></div><aside class="eco-progress-card"><div class="eco-kicker">SEU PROGRESSO</div><h2>Financeiro</h2><div class="eco-ring" style="--eco-p:'+(st.percent*3.6)+'deg"><b>'+st.percent+'%</b></div><p>'+st.completed+' de '+st.total+' atividades concluídas</p><div class="eco-resume"><strong>'+ecoEsc(nextTitle)+'</strong><span>'+(p.lastVisited?'Retome exatamente de onde parou.':'Sua trilha começa pelos fundamentos da informação.')+'</span></div></aside></section>'+
      '<section class="eco-section"><div class="eco-section-head"><div><div class="eco-kicker">COMECE PELA DOR</div><h2>O que você precisa resolver agora?</h2><p>Escolha o sintoma e siga um caminho de investigação conectado às aulas.</p></div><a class="eco-link" href="#resolve">Ver todos →</a></div><div class="eco-grid-4">'+problemCards+'</div></section>'+
      '<section class="eco-section"><div class="eco-section-head"><div><div class="eco-kicker">CONTINUAR</div><h2>Seu próximo passo</h2></div></div><div class="eco-continue"><div class="eco-continue-visual">'+homeVisual()+'</div><div><div class="eco-type">FORMAÇÃO FINANCEIRO</div><h3>'+ecoEsc(nextTitle)+'</h3><p>A conclusão da trilha exige aplicação correta — não apenas chegar ao fim da página.</p><div class="eco-mini-progress"><span style="width:'+st.percent+'%"></span></div></div><div class="eco-continue-meta"><b>'+st.percent+'%</b><span>concluído</span><a class="eco-btn teal" style="margin-top:10px" href="'+nextHref+'">Abrir →</a></div></div></section>'+
      '<section class="eco-section"><div class="eco-section-head"><div><div class="eco-kicker">TRILHA RECOMENDADA</div><h2>Financeiro — do dado à decisão</h2><p>Da qualidade da informação ao diagnóstico de capital de giro.</p></div><a class="eco-link" href="#financeiro">Abrir trilha →</a></div><div class="eco-roadmap"><div class="eco-roadmap-line">'+road+'</div></div></section>'+
      '<section class="eco-section"><div class="eco-section-head"><div><div class="eco-kicker">CONSULTA RÁPIDA</div><h2>Biblioteca Lean</h2></div><a class="eco-link" href="#library">Abrir biblioteca →</a></div><div class="eco-grid-4">'+resources+'</div></section></main>';
  }

  function renderTrails(){
    const st=stats();
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">APRENDER</div><h1>Trilhas de conhecimento</h1><p>Conteúdo estruturado por área de gestão. O Financeiro já está operacional; as demais trilhas ficam visíveis para mostrar a arquitetura futura sem misturar conteúdo incompleto.</p></div></header><div class="eco-trail-grid">'+
      '<article class="eco-trail-card featured"><div class="eco-kicker" style="color:#8ad1d2">DISPONÍVEL</div><h3>Financeiro</h3><p>Caixa x competência, rotina financeira, DRE, fluxo de caixa, prazos, ciclo financeiro e NCG — com checkpoints e laboratórios.</p><div class="eco-trail-meta"><span>'+DATA.financeStages.length+' módulos</span><span>'+st.total+' atividades</span><span>'+st.percent+'% concluído</span></div><div class="eco-mini-progress" style="background:rgba(255,255,255,.15)"><span style="width:'+st.percent+'%;background:#fff"></span></div><a class="eco-btn" style="margin-top:20px;background:transparent;color:#fff;border-color:rgba(255,255,255,.35)" href="#financeiro">'+(st.completed?'Continuar trilha':'Abrir trilha')+' →</a></article>'+
      '<article class="eco-trail-card"><div class="eco-kicker">PRÓXIMA TRILHA</div><h3>Comercial</h3><p>Carteira, recorrência, ticket, metas, rentabilidade, mix e reativação de clientes.</p><div class="eco-coming">Em estruturação</div></article>'+
      '<article class="eco-trail-card"><div class="eco-kicker">PRÓXIMA TRILHA</div><h3>Produção & PCP</h3><p>Capacidade, gargalos, programação, estoque, lead time, produtividade e gestão à vista.</p><div class="eco-coming">Em estruturação</div></article>'+
      '<article class="eco-trail-card"><div class="eco-kicker">PRÓXIMA TRILHA</div><h3>Indicadores</h3><p>KPIs, metas, análise de desvios, rotina gerencial e plano de ação.</p><div class="eco-coming">Em estruturação</div></article>'+
      '<article class="eco-trail-card"><div class="eco-kicker">PRÓXIMA TRILHA</div><h3>Processos</h3><p>Mapeamento, padronização, responsabilidades, controles e melhoria contínua.</p><div class="eco-coming">Em estruturação</div></article>'+
      '</div></main>';
  }

  function renderResolve(){
    const key=(location.hash.split('/')[1]||'caixa'),chosen=problems.find(x=>x.key===key)||problems[0];
    const cards=problems.map(x=>'<a class="eco-problem eco-problem-choice '+(x.key===chosen.key?'active':'')+'" href="#resolve/'+x.key+'"><span class="eco-problem-icon">'+icon(x.ico)+'</span><strong>'+x.title+'</strong><p>'+x.desc+'</p><span class="eco-problem-arrow">→</span></a>').join('');
    const steps=chosen.steps.map((s,i)=>'<div class="eco-diagnosis-step"><span class="n">'+(i+1)+'</span><div><strong>'+s[0]+'</strong><span>'+s[1]+'</span></div></div>').join('');
    const first=chosen.steps[0]?.[2]||'#financeiro';
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">DIAGNOSTICAR</div><h1>Resolver um problema</h1><p>Comece pelo sintoma. A plataforma organiza uma sequência de investigação e leva você aos conteúdos necessários para entender a causa antes de escolher a ação.</p></div></header><div class="eco-diagnosis-layout"><div><div class="eco-grid-3">'+cards+'</div></div><aside class="eco-diagnosis-side"><div class="eco-kicker">CAMINHO RECOMENDADO</div><h2>'+chosen.title+'</h2><p>'+chosen.desc+'</p><div class="eco-diagnosis-steps">'+steps+'</div><a class="eco-btn primary" href="'+first+'">Começar pelo primeiro conteúdo →</a></aside></div></main>';
  }

  function renderLibrary(){
    const cards=library.map(r=>'<a class="eco-library-card" href="'+itemHref(r.slug)+'" data-eco-lib-card data-type="'+r.type.toLowerCase()+'" data-text="'+ecoEsc((r.title+' '+r.desc+' '+r.type).toLowerCase())+'"><div class="eco-library-cover"><span class="eco-library-badge">'+r.type+'</span>'+libraryVisual(r.type)+'</div><div class="eco-library-body"><div class="eco-type">'+r.type+'</div><h3>'+r.title+'</h3><p>'+r.desc+'</p><div class="eco-library-foot"><span>Financeiro</span><span>Abrir conteúdo →</span></div></div></a>').join('');
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">CONSULTAR</div><h1>Biblioteca Lean</h1><p>Os mesmos conteúdos da formação em formatos de acesso rápido. Use quando você já conhece o assunto e precisa revisar uma regra, um indicador ou um procedimento durante o trabalho.</p></div></header><div class="eco-library-toolbar"><input class="eco-library-search" data-eco-lib-search placeholder="Buscar: DRE, competência, estoque, PMR..."><div class="eco-filters"><button class="eco-filter active" data-eco-lib-filter="todos">Todos</button><button class="eco-filter" data-eco-lib-filter="guia visual">Guias</button><button class="eco-filter" data-eco-lib-filter="playbook">Playbooks</button><button class="eco-filter" data-eco-lib-filter="checklist">Checklists</button><button class="eco-filter" data-eco-lib-filter="indicador">Indicadores</button></div></div><div class="eco-grid-3" data-eco-library>'+cards+'</div></main>';
  }

  function renderSimulators(){
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">EXPERIMENTAR</div><h1>Simuladores</h1><p>Aprenda alterando as variáveis. O objetivo não é apenas obter um número: é enxergar o efeito de uma decisão antes de levá-la para a empresa.</p></div></header><div class="eco-grid-2"><section class="eco-sim-card"><div class="eco-kicker">SIMULADOR 01</div><h2>Margem de contribuição</h2><p>Veja como preço, custos variáveis, impostos e desconto mudam a margem.</p><div class="eco-fields"><div class="eco-field"><label>Preço de venda (R$)</label><input data-mc="price" type="number" value="100"></div><div class="eco-field"><label>Custo do produto (R$)</label><input data-mc="cost" type="number" value="55"></div><div class="eco-field"><label>Frete (R$)</label><input data-mc="freight" type="number" value="8"></div><div class="eco-field"><label>Comissão (R$)</label><input data-mc="commission" type="number" value="5"></div><div class="eco-field"><label>Impostos (%)</label><input data-mc="tax" type="number" value="8"></div><div class="eco-field"><label>Desconto simulado (%)</label><input data-mc="discount" type="number" value="5"></div></div><div class="eco-sim-result"><div class="eco-sim-result-grid"><div><small>MC atual</small><b data-mc-out="value">—</b></div><div><small>MC % atual</small><b data-mc-out="pct">—</b></div><div><small>MC % com desconto</small><b data-mc-out="disc">—</b></div><div><small>Queda relativa</small><b data-mc-out="drop">—</b></div></div></div><div class="eco-insight" data-mc-out="insight"></div></section>'+
      '<section class="eco-sim-card"><div class="eco-kicker">SIMULADOR 02</div><h2>Ciclo financeiro</h2><p>Altere os três prazos e veja quantos dias a empresa precisa financiar a própria operação.</p><div class="eco-fields"><div class="eco-field"><label>PMR — recebimento (dias)</label><input data-cycle="pmr" type="number" value="48"></div><div class="eco-field"><label>PME — estoque (dias)</label><input data-cycle="pme" type="number" value="38"></div><div class="eco-field"><label>PMP — pagamento (dias)</label><input data-cycle="pmp" type="number" value="31"></div></div><div class="eco-sim-result"><div class="eco-sim-result-grid"><div><small>Ciclo financeiro</small><b data-cycle-out="days">—</b></div><div><small>Leitura</small><b data-cycle-out="status" style="font-size:22px">—</b></div></div></div><div class="eco-insight" data-cycle-out="insight"></div><a class="eco-btn" style="margin-top:14px" href="#lesson/ciclo-financeiro">Entender o indicador →</a></section></div></main>';
    calcSimulators();
  }

  function renderCases(){
    const c=DATA.companyCase;
    const base=c.base||[],map={};base.slice(1).forEach(r=>map[r[0]]=r[2]);
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">PRATICAR</div><h1>Casos práticos</h1><p>As aulas deixam de ser conceitos isolados quando o mesmo negócio reaparece em DRE, fluxo, prazos, ciclo e capital de giro. O primeiro caso contínuo já está integrado à trilha Financeiro.</p></div></header><section class="eco-case-feature"><article class="eco-case-main"><div class="eco-case-head"><div class="eco-case-badge">IH</div><div><div class="eco-type">CASO CONTÍNUO · INDÚSTRIA</div><h2>'+ecoEsc(c.name)+'</h2></div></div><p style="font-size:12px;line-height:1.55;color:#647580;margin-top:11px">'+ecoEsc(c.story)+'</p><div class="eco-case-metrics"><div class="eco-case-metric"><b>'+ecoEsc(map['Receita mensal']||'—')+'</b><span>Receita mensal</span></div><div class="eco-case-metric"><b>'+ecoEsc(map['Resultado operacional']||'—')+'</b><span>Resultado operacional</span></div><div class="eco-case-metric"><b>'+ecoEsc(map['Ciclo financeiro']||'—')+'</b><span>Ciclo financeiro</span></div><div class="eco-case-metric"><b>'+ecoEsc(map['NCG']||'—')+'</b><span>NCG</span></div></div><div class="eco-case-challenge"><strong>Desafio:</strong> o negócio cresceu e continua lucrativo, mas o caixa caiu. Sua tarefa é construir uma cadeia de evidências antes de sugerir qualquer ação.</div><div class="eco-case-actions"><a class="eco-btn primary" href="#lab/laboratorio-gestao">Abrir laboratório →</a><a class="eco-btn" href="#diagnostico/caixa-ruim">Ir para diagnóstico final</a></div></article><aside class="eco-case-side"><div class="eco-kicker" style="color:#8ad1d2">COMO USAR</div><h3>Um caso, vários conceitos</h3><p>A Indústria Horizonte acompanha a formação para mostrar como a mesma situação aparece em ferramentas diferentes.</p><ul><li>DRE: crescimento e deterioração da margem.</li><li>Fluxo: queda do caixa disponível.</li><li>PMR/PME/PMP: origem do alongamento.</li><li>Ciclo e NCG: efeito financeiro integrado.</li></ul></aside></section><section class="eco-section"><div class="eco-section-head"><div><div class="eco-kicker">PRÓXIMOS CASOS</div><h2>Expansão planejada</h2><p>Os próximos casos serão adicionados conforme as trilhas Comercial, Produção e Indicadores forem desenvolvidas.</p></div></div><div class="eco-grid-3"><article class="eco-resource"><span class="eco-type">COMÉRCIO</span><h3>Rentabilidade de mix</h3><p>Faturamento cresce, mas produtos e clientes contribuem de formas muito diferentes.</p><span class="eco-coming">Em estruturação</span></article><article class="eco-resource"><span class="eco-type">PRODUÇÃO</span><h3>Capacidade e gargalo</h3><p>Pedidos aumentam, prazo piora e a equipe tenta resolver tudo com hora extra.</p><span class="eco-coming">Em estruturação</span></article><article class="eco-resource"><span class="eco-type">COMERCIAL</span><h3>Carteira e recorrência</h3><p>Vendas caem sem perda aparente de clientes — até abrir frequência, ticket e inatividade.</p><span class="eco-coming">Em estruturação</span></article></div></section></main>';
  }

  function renderProgress(){
    const st=stats(),p=progressData(),done=new Set(p.completed||[]),passed=new Set(p.passed||[]),next=nextItem();
    const stages=(DATA.financeStages||[]).map((s,i)=>{const ss=stageStats(s);return '<div class="eco-stage-row"><div><strong>Módulo '+(i+1)+' · '+ecoEsc(s.title)+'</strong><span>'+ss.done+' de '+ss.total+' atividades</span></div><div class="eco-stage-bar"><i style="width:'+ss.percent+'%"></i></div><span>'+ss.percent+'%</span></div>'}).join('');
    const selected=['caixa-x-competencia','plano-de-contas','conciliacao-bancaria','dre-gerencial','fluxo-de-caixa','pmr','pme','ciclo-financeiro','ncg'];
    const comps=selected.map(slug=>{const d=DATA.lessons?.[slug];if(!d)return'';const pct=done.has(slug)?100:passed.has(slug)?70:0;const label=done.has(slug)?'Concluído':passed.has(slug)?'Aplicação correta · falta concluir':'Não concluído';return '<a class="eco-competency" href="#lesson/'+slug+'"><strong>'+ecoEsc(d.title)+'</strong><span>'+label+'</span><div class="bar"><i style="width:'+pct+'%"></i></div></a>'}).join('');
    app.innerHTML='<main class="eco-view"><header class="eco-page-head"><div class="eco-page-head-copy"><div class="eco-kicker">EVOLUIR</div><h1>Meu progresso</h1><p>O avanço é baseado em atividades concluídas e aplicações corretas. Assim, progresso deixa de significar apenas “página visitada”.</p></div></header><div class="eco-progress-layout"><aside class="eco-progress-summary"><div class="eco-kicker" style="color:#8ad1d2">VISÃO GERAL</div><h2>Financeiro</h2><div class="eco-ring" style="--eco-p:'+(st.percent*3.6)+'deg"><b>'+st.percent+'%</b></div><p>'+st.completed+' de '+st.total+' atividades concluídas.</p><div class="eco-resume"><strong>Próximo passo</strong><span>'+ecoEsc(next?.title||'Formação concluída')+'</span></div>'+(next?'<a class="eco-btn primary" style="margin-top:16px;width:100%" href="'+next.href+'">Continuar →</a>':'')+'</aside><section class="eco-knowledge"><div class="eco-kicker">MAPA DE APRENDIZADO</div><h2>Progresso por módulo</h2><div class="eco-stage-progress">'+stages+'</div><div class="eco-section-head" style="margin-top:27px"><div><div class="eco-kicker">COMPETÊNCIAS</div><h2>Conteúdos-chave</h2></div></div><div class="eco-competencies">'+comps+'</div></section></div></main>';
  }

  function filterLibrary(){
    const q=(document.querySelector('[data-eco-lib-search]')?.value||'').toLowerCase().trim();
    const active=document.querySelector('[data-eco-lib-filter].active')?.dataset.ecoLibFilter||'todos';
    let visible=0;
    document.querySelectorAll('[data-eco-lib-card]').forEach(c=>{
      const okType=active==='todos'||c.dataset.type===active;
      const okText=!q||(c.dataset.text||'').includes(q);
      c.style.display=okType&&okText?'':'none';if(okType&&okText)visible++;
    });
    const grid=document.querySelector('[data-eco-library]'),old=grid?.querySelector('.eco-empty');if(old)old.remove();
    if(grid&&visible===0)grid.insertAdjacentHTML('beforeend','<div class="eco-empty">Nenhum conteúdo encontrado com esse filtro.</div>');
  }

  function calcSimulators(){
    const val=(sel)=>Number(document.querySelector(sel)?.value||0);
    if(document.querySelector('[data-mc="price"]')){
      const p=val('[data-mc="price"]'),c=val('[data-mc="cost"]'),f=val('[data-mc="freight"]'),co=val('[data-mc="commission"]'),t=val('[data-mc="tax"]')/100,d=val('[data-mc="discount"]')/100;
      const mc=p-c-f-co-p*t,pct=p?mc/p*100:0,pd=p*(1-d),mcd=pd-c-f-co-pd*t,pctd=pd?mcd/pd*100:0,drop=pct?((pct-pctd)/pct)*100:0;
      document.querySelector('[data-mc-out="value"]').textContent=money(mc);
      document.querySelector('[data-mc-out="pct"]').textContent=num(pct)+'%';
      document.querySelector('[data-mc-out="disc"]').textContent=num(pctd)+'%';
      document.querySelector('[data-mc-out="drop"]').textContent=num(drop)+'%';
      document.querySelector('[data-mc-out="insight"]').innerHTML='Com <b>'+num(d*100)+'% de desconto</b>, a MC% passa de <b>'+num(pct)+'%</b> para <b>'+num(pctd)+'%</b>. O desconto atinge diretamente o que sobra para pagar a estrutura e gerar resultado.';
    }
    if(document.querySelector('[data-cycle="pmr"]')){
      const pmr=val('[data-cycle="pmr"]'),pme=val('[data-cycle="pme"]'),pmp=val('[data-cycle="pmp"]'),days=pmr+pme-pmp;
      document.querySelector('[data-cycle-out="days"]').textContent=num(days)+' dias';
      document.querySelector('[data-cycle-out="status"]').textContent=days<=0?'Operação financiada':days<=30?'Curto':'Exige capital';
      document.querySelector('[data-cycle-out="insight"]').innerHTML='Lógica: <b>PME + PMR − PMP</b>. Neste cenário, a empresa precisa financiar aproximadamente <b>'+num(days)+' dias</b> da operação. Reduzir PMR/PME ou ampliar PMP encurta o ciclo — sem substituir a análise completa de NCG.';
    }
  }

  function renderCustom(){
    const h=location.hash||'#home';
    if(h==='#home'||h===''){renderHome();return true}
    if(h==='#trails'){renderTrails();return true}
    if(h.startsWith('#resolve')){renderResolve();return true}
    if(h==='#library'){renderLibrary();return true}
    if(h==='#simulators'){renderSimulators();return true}
    if(h==='#cases'){renderCases();return true}
    if(h==='#progress'){renderProgress();return true}
    return false;
  }

  function sync(){
    updateChrome();
    if(renderCustom())window.scrollTo(0,0);
  }

  installShell();
  sync();

  window.addEventListener('hashchange',()=>setTimeout(sync,0));

  document.addEventListener('click',e=>{
    const menu=e.target.closest('[data-eco-menu]');
    if(menu){const s=document.querySelector('.eco-sidebar'),sc=document.querySelector('.eco-scrim');s?.classList.toggle('mobile-open');sc?.classList.toggle('open');return}
    if(e.target.classList.contains('eco-scrim')){document.querySelector('.eco-sidebar')?.classList.remove('mobile-open');e.target.classList.remove('open');return}
    const search=e.target.closest('[data-eco-search]');
    if(search){e.preventDefault();if(typeof openSearch==='function')openSearch('');else document.getElementById('openSearch')?.click();return}
    const filter=e.target.closest('[data-eco-lib-filter]');
    if(filter){e.preventDefault();document.querySelectorAll('[data-eco-lib-filter]').forEach(b=>b.classList.remove('active'));filter.classList.add('active');filterLibrary();return}
  });

  document.addEventListener('input',e=>{
    if(e.target.matches('[data-eco-lib-search]'))filterLibrary();
    if(e.target.matches('[data-mc],[data-cycle]'))calcSimulators();
  });
})();