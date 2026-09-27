const DATA = window.ENSINO_V72;
const app = document.getElementById('app');
const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const termPopover = document.getElementById('termPopover');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function termize(text=''){return String(text).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>`${label}<button class="help" type="button" data-term="${key}" aria-label="Explicar ${esc(label)}">?</button>`)}
function lessonTitle(slug){return DATA.lessons[slug]?.title || (slug==='caixa-ruim'?DATA.diagnostic.title:slug)}
function hrefFor(slug){return slug==='caixa-ruim'?'#diagnostico/caixa-ruim':`#lesson/${slug}`}
function breadcrumb(items){return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((x,i)=>i===items.length-1?`<strong>${x[0]}</strong>`:`<a href="${x[1]}">${x[0]}</a><span>›</span>`).join('')}</nav>`}
function pageHero(ey,title,summary,crumbs,meta=''){return `<section class="page-hero"><div class="shell">${breadcrumb(crumbs)}<span class="eyebrow">${ey}</span><h1>${title}</h1><p>${termize(summary)}</p>${meta?`<div class="meta-line">${meta}</div>`:''}</div></section>`}
function section(id,ey,title,body){return `<section id="${id}" class="article-section"><span class="eyebrow">${ey}</span><h2>${title}</h2>${body}</section>`}
function toc(items){return `<div class="toc-wrap"><button class="toc-button" type="button" data-toc-toggle>Nesta página ↓</button><nav class="toc" aria-label="Nesta página">${items.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('')}</nav></div>`}

function renderQuick(items,title='Em 1 minuto'){
  return `<div class="quick-answer"><span class="eyebrow">Consulta rápida</span><h3>${title}</h3><div class="quick-bullets">${items.map(x=>`<div><span>→</span><p>${termize(x)}</p></div>`).join('')}</div></div>`;
}
function renderOutcomes(items){return `<div class="learning-outcomes">${items.map(x=>`<div class="outcome-row"><i>✓</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderList(items){return `<div class="question-list">${(items||[]).map(x=>`<div class="question"><i>→</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderFlow(items){return `<div class="teaching-flow">${(items||[]).map((x,i)=>`<div class="flow-step"><span class="n">${i+1}</span><div><strong>${termize(x[0])}</strong>${x[1]?`<p>${termize(x[1])}</p>`:''}</div></div>`).join('')}</div>`}
function renderPairTable(rows,headers){return `<div style="overflow-x:auto"><table class="compare-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${termize(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function renderChecklist(items){return renderList(items)}
function renderValidation(v){if(!v)return'';return `<div class="validation-set"><div class="validation-row ok"><strong>✓ Está correto quando</strong><p>${termize(v.ok)}</p></div><div class="validation-row review"><strong>⚠ Revise quando</strong><p>${termize(v.review)}</p></div><div class="validation-row bad"><strong>✕ Está errado quando</strong><p>${termize(v.bad)}</p></div></div>`}
function renderCauseEffect(items){return `<div class="cause-effect">${items.map((x,i)=>`${i?'<span>→</span>':''}<b>${termize(x)}</b>`).join('')}</div>`}
function renderResponsibility(d){return `<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta o processo</h4>${renderList(d.operator||[])}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager||[])}</div></div>`}
function renderExample(ex){if(!ex)return'';return `<div class="example-block"><div class="example-head"><strong>${ex.title}</strong>${ex.intro?`<p>${termize(ex.intro)}</p>`:''}</div><div class="example-body">${ex.rows?`<div class="mini-table">${ex.rows.map((r,i)=>`<div class="mini-row ${i===ex.rows.length-1?'em':''}"><span>${termize(r[0])}</span><span>${termize(r[1])}</span></div>`).join('')}</div>`:''}${ex.insight?`<div class="note green"><strong>Como interpretar</strong><p>${termize(ex.insight)}</p></div>`:''}</div></div>`}
function renderCross(items){return `<div class="cross-grid">${(items||[]).map(x=>`<a class="cross-item" href="#lesson/${x[0]}"><div><strong>${lessonTitle(x[0])}</strong><p>${termize(x[1])}</p></div><span>→</span></a>`).join('')}</div>`}
function renderRelated(items){return `<div class="related">${(items||[]).map(s=>`<a href="${hrefFor(s)}"><strong>${lessonTitle(s)}</strong><span>Continuar →</span></a>`).join('')}</div>`}
function renderNextQuestion(text){return text?`<div class="next-question"><strong>Próxima pergunta</strong><p>${termize(text)}</p></div>`:''}
function renderExercise(ex){
  const ctx=ex.context?`<div class="exercise-context"><table><thead><tr>${ex.context.headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${ex.context.rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
  return `<div class="exercise" data-exercise><span class="eyebrow">Aplicação</span><h4>${ex.q}</h4>${ctx}<div class="exercise-options">${ex.options.map((o,i)=>`<button type="button" data-answer="${i}">${o}</button>`).join('')}</div><div class="exercise-feedback"></div><input type="hidden" data-correct="${ex.answer}" data-feedback="${esc(ex.feedback)}"></div>`;
}


const PROGRESS_KEY='ensinoLeanV8Progress';

function learningItems(){
  const items=[];
  (DATA.financeStages||[]).forEach((stage,stageIndex)=>{
    (stage.items||[]).forEach(item=>{
      items.push({
        ...item,
        key:item.slug,
        stageIndex,
        stageTitle:stage.title,
        href:item.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${item.slug}`,
        time:item.diagnostic?'Prática aplicada':(DATA.lessons[item.slug]?.time||'')
      });
    });
  });
  return items;
}
function getProgress(){
  try{
    const parsed=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}');
    return {completed:Array.isArray(parsed.completed)?parsed.completed:[],lastVisited:parsed.lastVisited||null};
  }catch(_){return {completed:[],lastVisited:null}}
}
function saveProgress(state){
  try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(state))}catch(_){}
}
function isCompleted(key){return getProgress().completed.includes(key)}
function markCompleted(key){
  const state=getProgress();
  if(!state.completed.includes(key))state.completed.push(key);
  state.lastVisited=key;
  saveProgress(state);
}
function rememberLast(key){
  if(!learningItems().some(x=>x.key===key))return;
  const state=getProgress();state.lastVisited=key;saveProgress(state);
}
function progressStats(items=learningItems()){
  const done=new Set(getProgress().completed);
  const total=items.length;
  const completed=items.filter(x=>done.has(x.key)).length;
  return {total,completed,percent:total?Math.round((completed/total)*100):0};
}
function recommendedItem(){
  const items=learningItems(),state=getProgress(),done=new Set(state.completed);
  const last=items.find(x=>x.key===state.lastVisited);
  if(last && !done.has(last.key))return last;
  return items.find(x=>!done.has(x.key))||items[0];
}
function learningPosition(key){
  const items=learningItems();
  const idx=items.findIndex(x=>x.key===key);
  if(idx<0)return null;
  const item=items[idx];
  const lessons=items.filter(x=>!x.diagnostic);
  const lessonIndex=lessons.findIndex(x=>x.key===key);
  return {items,idx,item,prev:items[idx-1]||null,next:items[idx+1]||null,lessonIndex,lessonTotal:lessons.length};
}
function progressBar(percent,compact=false){
  return `<div class="course-progress ${compact?'compact':''}"><div class="course-progress-track"><span style="width:${percent}%"></span></div><strong>${percent}%</strong></div>`;
}
function renderLearningTop(key){
  const pos=learningPosition(key);if(!pos)return'';
  const stats=progressStats();
  const label=pos.item.diagnostic?'Prática final':`Aula ${pos.lessonIndex+1} de ${pos.lessonTotal}`;
  return `<div class="learning-strip"><div class="shell learning-strip-inner"><div><a href="#financeiro">Trilha Financeiro</a><span>›</span><strong>Módulo ${pos.item.stageIndex+1}: ${pos.item.stageTitle}</strong><span>·</span><span>${label}</span></div><div class="learning-strip-progress">${progressBar(stats.percent,true)}</div></div></div>`;
}
function renderLearningBottom(key){
  const pos=learningPosition(key);if(!pos)return'';
  const done=isCompleted(key);
  const prev=pos.prev?`<a class="lesson-nav-link prev" href="${pos.prev.href}"><span>Anterior</span><strong>← ${pos.prev.title}</strong></a>`:'<span></span>';
  const next=pos.next?`<a class="lesson-nav-link next" href="${pos.next.href}"><span>Próximo</span><strong>${pos.next.title} →</strong></a>`:`<a class="lesson-nav-link next" href="#financeiro"><span>Trilha</span><strong>Ver visão geral →</strong></a>`;
  return `<section class="lesson-completion"><div class="lesson-completion-head"><span class="eyebrow">Sua jornada</span><h2>${done?'Conteúdo concluído':'Concluiu este conteúdo?'}</h2><p>${done?'O progresso ficou salvo neste dispositivo. Você pode revisar esta aula quando quiser.':'Marque como concluído para acompanhar sua evolução na trilha Financeiro.'}</p></div><button class="btn primary complete-btn ${done?'done':''}" type="button" data-complete="${key}" data-next="${pos.next?pos.next.href:'#financeiro'}">${done?'✓ Concluída — continuar':'Concluir e continuar →'}</button><div class="lesson-nav">${prev}${next}</div></section>`;
}
function courseDashboard(){
  const items=learningItems(),stats=progressStats(items),next=recommendedItem(),state=getProgress();
  const started=state.completed.length>0||state.lastVisited;
  return `<section class="learning-dashboard"><div class="course-card-main"><div class="course-card-top"><div><span class="eyebrow">Trilha em destaque</span><h2>Financeiro — do dado à decisão</h2><p>Aprenda a registrar corretamente, validar a informação, interpretar DRE e Fluxo e investigar capital de giro.</p></div><span class="course-count">5 módulos · 13 aulas · 1 prática</span></div>${progressBar(stats.percent)}<div class="course-card-meta"><span>${stats.completed} de ${stats.total} atividades concluídas</span><span>Progresso salvo neste dispositivo</span></div><div class="course-actions"><a class="btn primary" href="${next?.href||'#financeiro'}">${started?'Continuar aprendizado':'Começar trilha'} →</a><a class="btn secondary" href="#financeiro">Ver módulos</a></div></div><aside class="course-side"><span class="eyebrow">Precisa consultar?</span><h3>Use o Ensino também no trabalho</h3><p>Você não precisa seguir a trilha para tirar uma dúvida. Busque um termo ou comece por um problema real.</p><a href="#diagnostico/caixa-ruim">Investigar “Meu caixa está ruim” →</a><button type="button" data-open-search>Buscar um assunto →</button></aside></section>`;
}
function renderCourseModules(){
  const done=new Set(getProgress().completed);
  let globalIndex=0;
  return (DATA.financeStages||[]).map((stage,si)=>{
    const stageItems=stage.items||[];
    const stats=progressStats(stageItems.map(x=>({...x,key:x.slug})));
    const rows=stageItems.map(item=>{
      globalIndex++;
      const completed=done.has(item.slug);
      const d=item.diagnostic?null:DATA.lessons[item.slug];
      const label=item.diagnostic?'Prática final':`Aula ${globalIndex}`;
      const meta=[item.kind,d?.time].filter(Boolean).join(' · ');
      return `<a class="course-lesson-row ${completed?'completed':''}" href="${item.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${item.slug}`}"><span class="lesson-status">${completed?'✓':globalIndex}</span><div class="course-lesson-copy"><div class="course-lesson-kicker">${label} · ${meta}</div><strong>${item.title}</strong><p>${item.why}</p></div><span class="course-lesson-arrow">→</span></a>`;
    }).join('');
    return `<section class="course-module"><div class="course-module-head"><div><span class="eyebrow">Módulo ${si+1}</span><h2>${stage.title}</h2><p>${stage.desc}</p></div><div class="module-progress"><span>${stats.completed}/${stats.total}</span>${progressBar(stats.percent,true)}</div></div><div class="course-lesson-list">${rows}</div></section>`;
  }).join('');
}

function renderHome(){
  const next=recommendedItem();
  app.innerHTML=`
    <section class="hero platform-hero"><div class="shell"><div class="hero-inner">
      <span class="eyebrow">Ensino Lean</span>
      <h1>Aprenda. Pratique. Consulte. <span class="accent">Aplique na empresa.</span></h1>
      <p class="hero-copy">Uma plataforma de treinamento e apoio para os clientes da Lean Company. Estude em sequência quando estiver aprendendo e volte diretamente ao conteúdo quando precisar executar ou analisar algo no dia a dia.</p>
      <form id="heroSearch" class="searchbar" role="search"><label class="sr-only" for="heroQ">Buscar</label><input id="heroQ" placeholder="O que você quer aprender ou resolver?"><button class="btn primary" type="submit">Buscar</button></form>
      <div class="hero-note">Ex.: “cliente demora a pagar”, “como classificar esta despesa?”, “vendi mais e falta dinheiro”.</div>
    </div></div></section>
    <section class="section learning-home"><div class="shell">
      ${courseDashboard()}
    </div></section>
    <section class="section home-method"><div class="shell">
      <div class="section-head"><span class="eyebrow">Como o Ensino Lean funciona</span><h2>Aprendizado conectado ao trabalho real</h2><p>O objetivo não é apenas conhecer conceitos. É conseguir executar corretamente, confiar no dado, interpretar o que aconteceu e escolher a próxima investigação.</p></div>
      <div class="learning-principles">
        <div><span>01</span><strong>Aprender</strong><p>Entenda conceitos e ferramentas com exemplos.</p></div>
        <div><span>02</span><strong>Executar</strong><p>Veja passo a passo, critérios e validações.</p></div>
        <div><span>03</span><strong>Analisar</strong><p>Aprenda a ler sinais, cruzar indicadores e evitar conclusões erradas.</p></div>
        <div><span>04</span><strong>Aplicar</strong><p>Use casos e diagnósticos para transformar dado em decisão.</p></div>
      </div>
    </div></section>`;
  setTimeout(()=>{
    document.getElementById('heroSearch')?.addEventListener('submit',e=>{e.preventDefault();openSearch(document.getElementById('heroQ').value)});
  },0);
}

function renderFinance(){
  const stats=progressStats();
  const next=recommendedItem();
  app.innerHTML=`${pageHero('Trilha de aprendizagem','Financeiro — do dado à decisão','Uma formação prática para entender como a informação financeira nasce, como deve ser validada e como chega até a análise e a decisão.',[['Início','#home'],['Trilha Financeiro','#financeiro']],`<span>5 módulos</span><span>13 aulas</span><span>1 diagnóstico prático</span>`)}
  <div class="shell finance-wrap course-page">
    <section class="course-overview"><div><span class="eyebrow">Seu progresso</span><h2>${stats.completed===stats.total?'Trilha concluída':'Continue de onde parou'}</h2><p>${stats.completed===stats.total?'Você concluiu todas as atividades. Use a trilha agora como material de revisão e consulta.':'O progresso é salvo neste dispositivo enquanto não temos login individual.'}</p></div><div class="course-overview-progress">${progressBar(stats.percent)}<span>${stats.completed}/${stats.total} atividades</span></div><a class="btn primary" href="${next?.href||'#financeiro'}">${stats.completed?'Continuar':'Começar'} →</a></section>
    <div class="case-intro course-case"><span class="eyebrow">Caso contínuo</span><h3>${DATA.companyCase.name}</h3><p>${DATA.companyCase.description} ${DATA.companyCase.story}</p></div>
    ${renderCourseModules()}
    <div class="finance-note"><strong>Como usar esta trilha</strong><p>Se estiver em treinamento, siga os módulos em ordem. Se estiver trabalhando e precisar resolver uma dúvida, use a busca ou abra diretamente a aula necessária. Operação e gestão compartilham a mesma base, mas cada conteúdo deixa explícita a responsabilidade de quem alimenta e de quem analisa.</p></div>
  </div>`;
}

function renderConcept(slug,d){
  const commonStart=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['conceito','Conceito'],['exemplos','Exemplos'],['aplicar','Como aplicar'],['validar','Como validar'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}
  ${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}
  ${section('resumo','02 · Consulta rápida','Em 1 minuto',renderQuick(d.quick))}`;
  let body='';
  if(slug==='caixa-x-competencia'){
    body=`${commonStart}
    ${section('conceito','03 · Conceito','Caixa e competência respondem perguntas diferentes',`<div class="definition-pair">${d.definitions.map(x=>`<div class="definition"><strong>${x[0]}</strong><p>${termize(x[1])}</p></div>`).join('')}</div>`)}
    ${section('exemplos','04 · Exemplos','A regra simples — e onde começam as dúvidas',`${renderExample(d.mainExample)}${renderPairTable(d.edgeCases,['Situação','Como tratar'])}`)}
    ${section('aplicar','05 · Aplicação','Como escolher a data',renderFlow(d.decisionFlow))}
    ${section('validar','06 · Validação','Como saber se o lançamento faz sentido',renderValidation(d.validation))}
    ${section('responsabilidade','07 · Responsabilidade','Do lançamento à decisão',`${renderResponsibility(d)}<h4 style="margin-top:22px">Se a data estiver errada</h4>${renderCauseEffect(d.errorChain)}`)}
    ${section('teste','08 · Aplicação','Resolva uma situação realista',`${renderExercise(d.exercise)}`)}`;
  } else {
    body=`${commonStart}
    ${section('conceito','03 · Regra central','Classifique pelo que foi consumido',`<p class="lead">${termize(d.principle)}</p><div class="note"><strong>Por que importa</strong><p>${termize(d.why)}</p></div>`)}
    ${section('exemplos','04 · Exemplos','O mesmo fornecedor pode representar coisas diferentes',`${renderExample(d.example)}<h4 style="margin-top:24px">Casos que geram dúvida</h4>${renderPairTable(d.ambiguity,['Situação','O que perguntar antes de lançar'])}`)}
    ${section('aplicar','05 · Aplicação','Uma árvore mental para classificar',`${renderFlow(d.classificationTree)}<h4 style="margin-top:24px">Plano de contas x centro de custo</h4>${renderPairTable(d.accountVsCenter,['Dimensão','Pergunta','Exemplos'])}`)}
    ${section('validar','06 · Validação','Como saber se a classificação está boa',`${renderValidation(d.validation)}<h4 style="margin-top:24px">Erros recorrentes</h4>${renderList(d.commonMistakes)}`)}
    ${section('responsabilidade','07 · Responsabilidade','Quem registra e quem usa',`${renderResponsibility(d)}<h4 style="margin-top:22px">Quando a classificação erra</h4>${renderCauseEffect(d.errorChain)}`)}
    ${section('teste','08 · Aplicação','Classifique usando o raciocínio',`${renderExercise(d.exercise)}`)}`;
  }
  app.innerHTML=`${pageHero('Conceito',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${body}${renderLearningBottom(slug)}</div>`;
}

function renderProcedure(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['papel','Quem faz'],['antes','Antes'],['passo','Passo a passo'],['validar','Validar'],['terminou','Quando terminou'],['erro','Erros'],['teste','Aplicação']])}
  ${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}
  ${section('resumo','02 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<p class="lead">${termize(d.objective)}</p>`)}
  ${section('papel','03 · Responsabilidade','Quem executa, valida e usa',renderPairTable(d.roles,['Papel','Responsável']))}
  ${section('antes','04 · Preparação','Antes de começar',renderChecklist(d.before))}
  ${section('passo','05 · Procedimento','Faça nesta ordem',renderFlow(d.steps))}
  ${section('validar','06 · Validação','O que conferir em cada etapa',`${renderPairTable(d.stageValidation,['Etapa','Critério'])}${renderValidation(d.validation)}`)}
  ${section('terminou','07 · Saída esperada','Como saber que terminou',`${renderChecklist(d.finishCriteria)}<h4 style="margin-top:22px">Sinais de que ainda não terminou</h4>${renderList(d.notReady)}`)}
  ${section('erro','08 · Consequência','Erros que parecem pequenos, mas chegam à gestão',`${renderList(d.mistakes)}<h4 style="margin-top:22px">Da falha à decisão</h4>${renderCauseEffect(d.errorChain)}${renderResponsibility(d)}`)}
  ${section('teste','09 · Aplicação','Resolva uma situação operacional',`${renderExercise(d.exercise)}`)}`;
  app.innerHTML=`${pageHero('Procedimento',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${body}${renderLearningBottom(slug)}</div>`;
}

function renderDRE(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['antes','Antes'],['estrutura','Estrutura'],['como','Como analisar'],['caso','Caso'],['investigar','Investigar'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}
  ${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}
  ${section('resumo','02 · Consulta rápida','DRE em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>`)}
  ${section('limites','03 · Limites','O que a DRE responde — e o que não responde sozinha',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinha</strong>${renderList(d.doesNotAnswer)}</div></div>`)}
  ${section('antes','04 · Qualidade','Antes de analisar, valide a base',`<p>Uma leitura sofisticada não corrige dado ruim.</p>${renderChecklist(d.before)}`)}
  ${section('estrutura','05 · Estrutura','Como o faturamento vira resultado',`${renderFlow(d.anatomy)}<div class="note"><strong>Regra de leitura</strong><p>Resultado é consequência. Entenda primeiro como a receita foi consumida.</p></div>`)}
  ${section('como','06 · Método','Como analisar uma DRE',`${renderFlow(d.analysisSteps)}<h4 style="margin-top:22px">Com o que comparar</h4>${renderPairTable(d.compare,['Comparação','O que ajuda a enxergar'])}`)}
  ${section('caso','07 · Caso contínuo',DATA.companyCase.name,`${renderExample(d.caseExample)}${renderNextQuestion(d.nextQuestion)}`)}
  ${section('investigar','08 · Diagnóstico','Se acontecer isto, investigue aquilo',`${renderPairTable(d.investigations,['Sinal','Próxima investigação'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
  ${section('responsabilidade','09 · Responsabilidade','O relatório depende de quem alimenta e de quem interpreta',`${renderResponsibility(d)}<h4 style="margin-top:22px">Como um erro vira decisão errada</h4>${renderCauseEffect(d.errorChain)}`)}
  ${section('teste','10 · Aplicação','Faça uma leitura sem resposta óbvia',`${renderExercise(d.exercise)}`)}`;
  app.innerHTML=`${pageHero('Análise gerencial',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${body}${renderLearningBottom(slug)}</div>`;
}

function renderCashFlow(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['antes','Antes'],['como','Como analisar'],['caso','Caso'],['lucro','Lucro x caixa'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}
  ${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}
  ${section('resumo','02 · Consulta rápida','Fluxo em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>`)}
  ${section('limites','03 · Limites','O que o Fluxo responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div>`)}
  ${section('antes','04 · Qualidade','Antes de analisar',renderChecklist(d.before))}
  ${section('como','05 · Método','Como analisar',renderFlow(d.analysisSteps))}
  ${section('caso','06 · Caso contínuo',DATA.companyCase.name,`${renderExample(d.caseExample)}<h4 style="margin-top:24px">Uma leitura simples de movimentos</h4>${renderPairTable(d.timeline,['Movimento','Efeito no caixa'])}${renderNextQuestion(d.nextQuestion)}`)}
  ${section('lucro','07 · Conceito-chave','Por que lucro e caixa podem andar separados',`${renderPairTable(d.profitVsCash,['Situação','Por que afeta diferente'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
  ${section('responsabilidade','08 · Responsabilidade','Quem mantém o fluxo confiável',renderResponsibility(d))}
  ${section('teste','09 · Aplicação','Encontre o risco que o saldo final esconde',`${renderExercise(d.exercise)}`)}`;
  app.innerHTML=`${pageHero('Análise financeira',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${body}${renderLearningBottom(slug)}</div>`;
}

function renderIndicator(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['dados','Dados'],['como','Como analisar'],['interpretar','Interpretar'],['cruzar','Cruzar'],['caso','Caso'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}
  ${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}
  ${section('resumo','02 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>${d.formula?`<div class="formula-box"><span class="eyebrow">Fórmula / lógica</span><strong>${termize(d.formula)}</strong></div>`:''}`)}
  ${section('limites','03 · Limites','O que este indicador responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div><div class="note"><strong>Quando analisar</strong><p>${termize(d.when)}</p></div>`)}
  ${section('dados','04 · Qualidade','Quais dados precisam estar confiáveis',`<h4>Dados necessários</h4>${renderChecklist(d.data)}<h4 style="margin-top:22px">Antes de confiar</h4>${renderChecklist(d.quality)}`)}
  ${section('como','05 · Método','Como analisar',renderFlow(d.analysis))}
  ${section('interpretar','06 · Leitura','Como interpretar sinais diferentes',`${renderPairTable(d.interpretation,['Sinal','O que pode significar'])}${renderNextQuestion(d.nextQuestion)}`)}
  ${section('cruzar','07 · Conexões','O que analisar junto — e por quê',renderCross(d.cross))}
  ${section('caso','08 · Caso contínuo',DATA.companyCase.name,renderExample(d.caseExample))}
  ${section('responsabilidade','09 · Responsabilidade','Quem garante o dado e quem toma decisão',renderResponsibility(d))}
  ${section('teste','10 · Aplicação','Use evidência para escolher a hipótese',`${renderExercise(d.exercise)}`)}`;
  app.innerHTML=`${pageHero('Indicador',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${body}${renderLearningBottom(slug)}</div>`;
}

function renderDiagnostic(){
  const d=DATA.diagnostic;
  app.innerHTML=`${pageHero('Prática aplicada',d.title,d.summary,[['Início','#home'],['Trilha Financeiro','#financeiro'],[d.title,'#diagnostico/caixa-ruim']])}${renderLearningTop('caixa-ruim')}
  <div class="shell article-shell">
    ${toc([['principio','Princípio'],['ordem','Por onde começar'],['caso','Caso'],['investigar','Hipóteses'],['concluir','Concluir']])}
    ${section('principio','01 · Comece certo','Caixa ruim é um sintoma, não uma causa',`<p class="diagnostic-intro">${termize(d.intro)}</p><div class="note amber"><strong>Não comece pela solução</strong><p>Empréstimo, corte, cobrança ou redução de estoque podem ser corretos — mas somente depois de identificar o mecanismo que explica a pressão.</p></div>`)}
    ${section('ordem','02 · Roteiro','Uma ordem simples para não se perder',`<div class="diagnostic-path">${d.path.map(p=>`<div class="path-row"><span class="n">${p.n}</span><div><strong>${p.title}</strong><p>${p.text}</p></div><a href="${p.href}">Abrir →</a></div>`).join('')}</div>`)}
    ${section('caso','03 · Exemplo','O mesmo sintoma pode ter mecanismos diferentes',`<div class="case-intro"><span class="eyebrow">${DATA.companyCase.name}</span><p>${termize(d.caseIntro)}</p></div>${renderPairTable(DATA.companyCase.base.slice(1),DATA.companyCase.base[0])}`)}
    <section id="investigar" class="article-section"><span class="eyebrow">04 · Investigação</span><h2>Teste hipótese por hipótese</h2>${d.branches.map((b,i)=>`<div class="diagnostic-branch"><div class="q">${i+1}. ${b.q}</div><p>${termize(b.why)}</p><div class="diagnostic-evidence"><div><strong>O que verificar</strong><p>${termize(b.verify)}</p></div><div><strong>Evidências que fortalecem</strong>${renderList(b.supports)}</div><div><strong>Evidências que enfraquecem</strong>${renderList(b.weakens)}</div></div><div class="diagnostic-links">${b.links.map(x=>`<a href="#lesson/${x[0]}">${x[1]} →</a>`).join('')}</div></div>`).join('')}</section>
    ${section('concluir','05 · Conclusão','Transforme o sintoma em uma causa acompanhável',`<p class="lead">${termize(d.finish)}</p><div class="validation-set"><div class="validation-row ok"><strong>Saída esperada</strong><p>Causa mais provável + evidência + ação + responsável + indicador + data de reavaliação.</p></div><div class="validation-row bad"><strong>Ainda está superficial</strong><p>“Precisamos melhorar o caixa”, “precisamos vender mais” ou “precisamos cortar custos” sem demonstrar a causa.</p></div></div>`)}
    ${renderLearningBottom('caixa-ruim')}
  </div>`;
}

function renderLesson(slug){
  const d=DATA.lessons[slug];
  if(!d){renderHome();return}
  if(d.type==='concept')renderConcept(slug,d);
  else if(d.type==='procedure')renderProcedure(slug,d);
  else if(d.type==='indicator')renderIndicator(slug,d);
  else if(slug==='dre-gerencial')renderDRE(slug,d);
  else renderCashFlow(slug,d);
}

function route(){
  const h=location.hash||'#home';
  closeMobileNav();
  hideTerm();
  if(h==='#financeiro')renderFinance();
  else if(h.startsWith('#lesson/')){
    const slug=h.split('/')[1];
    rememberLast(slug);
    renderLesson(slug);
  }
  else if(h==='#diagnostico/caixa-ruim'){
    rememberLast('caixa-ruim');
    renderDiagnostic();
  }
  else renderHome();
  window.scrollTo(0,0);
  app.focus({preventScroll:true});
}

function normalize(s=''){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function searchIndex(){
  const items=[];
  Object.entries(DATA.lessons).forEach(([slug,d])=>items.push({title:d.title,sub:d.type==='procedure'?'Procedimento':d.type==='indicator'?'Indicador':d.type==='analysis'?'Análise':'Conceito',href:`#lesson/${slug}`,text:[d.title,d.summary,JSON.stringify(d)].join(' ')}));
  items.push({title:DATA.diagnostic.title,sub:'Diagnóstico',href:'#diagnostico/caixa-ruim',text:JSON.stringify(DATA.diagnostic)+' caixa negativo sem dinheiro lucro estoque crescimento'});
  items.push({title:'Financeiro',sub:'Área',href:'#financeiro',text:'financeiro competencia plano contas pagar receber conciliacao fechamento dre fluxo pmr pmp pme ciclo ncg'});
  return items;
}
function aliasBoost(q,item){const nq=normalize(q);let boost=0;DATA.searchAliases.forEach(a=>{if(a.terms.some(t=>nq.includes(normalize(t)))&&item.href===a.target)boost+=30});return boost}
function doSearch(q){
  const words=normalize(q).trim().split(/\s+/).filter(Boolean);
  let items=searchIndex();
  if(words.length){items=items.map(x=>{const t=normalize(x.text);const score=words.reduce((s,w)=>s+(t.includes(w)?1:0),0)+aliasBoost(q,x);return{x,score}}).filter(o=>o.score>0).sort((a,b)=>b.score-a.score).map(o=>o.x)}
  searchResults.innerHTML=items.slice(0,20).map(x=>`<a class="result" href="${x.href}"><div><strong>${x.title}</strong><small>${x.sub}</small></div><span>Abrir →</span></a>`).join('')||`<div class="result"><div><strong>Nenhum resultado.</strong><small>Tente descrever a dúvida de outra forma.</small></div></div>`;
}
function openSearch(q=''){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value=q;doSearch(q);setTimeout(()=>searchInput.focus(),40)}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
function showTerm(btn){
  const g=DATA.glossary[btn.dataset.term];if(!g)return;
  termPopover.innerHTML=`<strong>${g.title}</strong><p>${g.desc}</p>${g.link?`<a href="#lesson/${g.link}">Entender o tema completo →</a>`:''}`;
  termPopover.classList.remove('hidden');
  const r=btn.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);let left=Math.min(r.left,window.innerWidth-w-12),top=r.bottom+8;if(top+190>window.innerHeight)top=Math.max(12,r.top-180);termPopover.style.width=w+'px';termPopover.style.left=Math.max(12,left)+'px';termPopover.style.top=top+'px';
}
function hideTerm(){termPopover.classList.add('hidden')}
function toggleMobileNav(){const open=mobileNav.classList.toggle('open');mobileMenuBtn.setAttribute('aria-expanded',String(open))}
function closeMobileNav(){mobileNav.classList.remove('open');mobileMenuBtn.setAttribute('aria-expanded','false')}

window.addEventListener('hashchange',route);
document.getElementById('openSearch').addEventListener('click',()=>openSearch(''));
document.getElementById('mobileSearch').addEventListener('click',()=>{closeMobileNav();openSearch('')});
document.getElementById('closeSearch').addEventListener('click',closeSearch);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();doSearch(searchInput.value)});
searchInput.addEventListener('input',e=>doSearch(e.target.value));
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
mobileMenuBtn.addEventListener('click',toggleMobileNav);

document.addEventListener('click',e=>{
  const complete=e.target.closest('[data-complete]');
  if(complete){
    const key=complete.dataset.complete;
    markCompleted(key);
    const next=complete.dataset.next||'#financeiro';
    if(location.hash===next){route()}else{location.hash=next}
    return;
  }
  const openSearchBtn=e.target.closest('[data-open-search]');
  if(openSearchBtn){e.preventDefault();openSearch('');return}
  const help=e.target.closest('[data-term]');
  if(help){e.preventDefault();showTerm(help);return}
  if(!e.target.closest('#termPopover'))hideTerm();
  const jump=e.target.closest('[data-jump]');
  if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'});return}
  const tocBtn=e.target.closest('[data-toc-toggle]');
  if(tocBtn){tocBtn.nextElementSibling?.classList.toggle('open');return}
  const ans=e.target.closest('[data-answer]');
  if(ans){
    const box=ans.closest('[data-exercise]');
    const correct=Number(box.querySelector('[data-correct]').value);
    const feedback=box.querySelector('[data-feedback]').value;
    box.querySelectorAll('[data-answer]').forEach(b=>{b.classList.remove('correct','wrong');b.disabled=true});
    ans.classList.add(Number(ans.dataset.answer)===correct?'correct':'wrong');
    box.querySelector(`[data-answer="${correct}"]`)?.classList.add('correct');
    box.querySelector('.exercise-feedback').textContent=feedback;
    return;
  }
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeSearch();hideTerm();closeMobileNav()}
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch('')}
});

route();