const DATA = window.ENSINO_V9;
const app = document.getElementById('app');
const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const termPopover = document.getElementById('termPopover');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

const PROGRESS_KEY = 'ensinoLeanV9Progress';
const VIEW_MODE_KEY = 'ensinoLeanV9ViewMode';

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function normalize(s=''){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function termize(text=''){return String(text).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>`${label}<button class="help" type="button" data-term="${key}" aria-label="Explicar ${esc(label)}">?</button>`)}
function hrefFor(slug){
  if(slug==='caixa-ruim') return '#diagnostico/caixa-ruim';
  if(DATA.checkpoints?.[slug]) return `#checkpoint/${slug}`;
  return `#lesson/${slug}`;
}
function titleFor(slug){return DATA.lessons?.[slug]?.title || DATA.checkpoints?.[slug]?.title || (slug==='caixa-ruim'?DATA.diagnostic.title:slug)}
function breadcrumb(items){return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((x,i)=>i===items.length-1?`<strong>${x[0]}</strong>`:`<a href="${x[1]}">${x[0]}</a><span>›</span>`).join('')}</nav>`}
function pageHero(ey,title,summary,crumbs,meta=''){return `<section class="page-hero"><div class="shell">${breadcrumb(crumbs)}<span class="eyebrow">${ey}</span><h1>${title}</h1><p>${termize(summary)}</p>${meta?`<div class="meta-line">${meta}</div>`:''}</div></section>`}
function section(id,ey,title,body){return `<section id="${id}" class="article-section"><span class="eyebrow">${ey}</span><h2>${title}</h2>${body}</section>`}
function toc(items){return `<div class="toc-wrap"><button class="toc-button" type="button" data-toc-toggle>Nesta página ↓</button><nav class="toc" aria-label="Nesta página">${items.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('')}</nav></div>`}
function renderList(items){return `<div class="question-list">${(items||[]).map(x=>`<div class="question"><i>→</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderChecklist(items){return renderList(items)}
function renderFlow(items){return `<div class="teaching-flow">${(items||[]).map((x,i)=>`<div class="flow-step"><span class="n">${i+1}</span><div><strong>${termize(Array.isArray(x)?x[0]:x)}</strong>${Array.isArray(x)&&x[1]?`<p>${termize(x[1])}</p>`:''}</div></div>`).join('')}</div>`}
function renderPairTable(rows,headers){return `<div class="table-scroll"><table class="compare-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${(rows||[]).map(r=>`<tr>${r.map(c=>`<td>${termize(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
function renderQuick(items,title='Essencial'){return `<div class="quick-answer"><span class="eyebrow">Consulta rápida</span><h3>${title}</h3><div class="quick-bullets">${(items||[]).map(x=>`<div><span>→</span><p>${termize(x)}</p></div>`).join('')}</div></div>`}
function renderOutcomes(items){return `<div class="learning-outcomes">${(items||[]).map(x=>`<div class="outcome-row"><i>✓</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderValidation(v){if(!v)return'';return `<div class="validation-set"><div class="validation-row ok"><strong>✓ Está correto quando</strong><p>${termize(v.ok)}</p></div><div class="validation-row review"><strong>⚠ Revise quando</strong><p>${termize(v.review)}</p></div><div class="validation-row bad"><strong>✕ Está errado quando</strong><p>${termize(v.bad)}</p></div></div>`}
function renderCauseEffect(items){return `<div class="cause-effect">${(items||[]).map((x,i)=>`${i?'<span>→</span>':''}<b>${termize(x)}</b>`).join('')}</div>`}
function renderResponsibility(d){return `<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta o processo</h4>${renderList(d.operator||[])}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager||[])}</div></div>`}
function renderExample(ex){if(!ex)return'';return `<div class="example-block"><div class="example-head"><strong>${ex.title}</strong>${ex.intro?`<p>${termize(ex.intro)}</p>`:''}</div><div class="example-body">${ex.rows?`<div class="mini-table">${ex.rows.map((r,i)=>`<div class="mini-row ${i===ex.rows.length-1?'em':''}"><span>${termize(r[0])}</span><span>${termize(r[1])}</span></div>`).join('')}</div>`:''}${ex.insight?`<div class="note green"><strong>Como interpretar</strong><p>${termize(ex.insight)}</p></div>`:''}</div></div>`}
function renderCross(items){return `<div class="cross-grid">${(items||[]).map(x=>`<a class="cross-item" href="${hrefFor(x[0])}"><div><strong>${titleFor(x[0])}</strong><p>${termize(x[1]||'Revisar este conteúdo')}</p></div><span>→</span></a>`).join('')}</div>`}
function renderNextQuestion(text){return text?`<div class="next-question"><strong>Próxima pergunta</strong><p>${termize(text)}</p></div>`:''}

function learningItems(){
  const items=[];
  (DATA.financeStages||[]).forEach((stage,stageIndex)=>{
    (stage.items||[]).forEach(item=>items.push({...item,key:item.slug,stageIndex,stageTitle:stage.title,stageFocus:stage.focus||'',href:item.checkpoint?`#checkpoint/${item.slug}`:item.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${item.slug}`,time:item.checkpoint?(DATA.checkpoints?.[item.slug]?.time||''):item.diagnostic?'Prática aplicada':(DATA.lessons[item.slug]?.time||'')}));
  });
  return items;
}
function getProgress(){try{const p=JSON.parse(localStorage.getItem(PROGRESS_KEY)||'{}');return{completed:Array.isArray(p.completed)?p.completed:[],passed:Array.isArray(p.passed)?p.passed:[],lastVisited:p.lastVisited||null}}catch(_){return{completed:[],passed:[],lastVisited:null}}}
function saveProgress(p){try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(p))}catch(_){}}
function isCompleted(key){return getProgress().completed.includes(key)}
function isPassed(key){return getProgress().passed.includes(key)}
function markPassed(key){if(!key)return;const p=getProgress();if(!p.passed.includes(key))p.passed.push(key);p.lastVisited=key;saveProgress(p)}
function markCompleted(key){if(!key||!isPassed(key))return false;const p=getProgress();if(!p.completed.includes(key))p.completed.push(key);if(!p.passed.includes(key))p.passed.push(key);p.lastVisited=key;saveProgress(p);return true}
function rememberLast(key){if(!learningItems().some(x=>x.key===key))return;const p=getProgress();p.lastVisited=key;saveProgress(p)}
function progressStats(items=learningItems()){const done=new Set(getProgress().completed);const total=items.length;const completed=items.filter(x=>done.has(x.key)).length;return{total,completed,percent:total?Math.round((completed/total)*100):0}}
function recommendedItem(){const items=learningItems(),p=getProgress(),done=new Set(p.completed);const last=items.find(x=>x.key===p.lastVisited);if(last&&!done.has(last.key))return last;return items.find(x=>!done.has(x.key))||items[0]}
function learningPosition(key){const items=learningItems();const idx=items.findIndex(x=>x.key===key);if(idx<0)return null;const item=items[idx];const lessons=items.filter(x=>!x.checkpoint&&!x.diagnostic);const lessonIndex=lessons.findIndex(x=>x.key===key);return{items,idx,item,prev:items[idx-1]||null,next:items[idx+1]||null,lessonIndex,lessonTotal:lessons.length}}
function progressBar(percent,compact=false){return `<div class="course-progress ${compact?'compact':''}"><div class="course-progress-track"><span style="width:${percent}%"></span></div><strong>${percent}%</strong></div>`}
function getViewMode(){try{return localStorage.getItem(VIEW_MODE_KEY)||'study'}catch(_){return'study'}}
function applyViewMode(mode=getViewMode()){const safe=mode==='consult'?'consult':'study';try{localStorage.setItem(VIEW_MODE_KEY,safe)}catch(_){}app.classList.toggle('consult-mode',safe==='consult');document.querySelectorAll('[data-view-mode]').forEach(b=>b.classList.toggle('on',b.dataset.viewMode===safe))}
function currentLearningKey(){const h=location.hash||'';if(h.startsWith('#lesson/'))return h.split('/')[1];if(h.startsWith('#checkpoint/'))return h.split('/')[1];if(h==='#diagnostico/caixa-ruim')return'caixa-ruim';return''}

function renderExercise(ex){
  if(!ex)return'';
  const ctx=ex.context?`<div class="exercise-context">${renderPairTable(ex.context.rows,ex.context.headers)}</div>`:'';
  return `<div class="exercise" data-exercise><span class="eyebrow">Aplicação</span><h4>${ex.q}</h4>${ctx}<div class="exercise-options">${ex.options.map((o,i)=>`<button type="button" data-answer="${i}">${o}</button>`).join('')}</div><div class="exercise-feedback"></div><input type="hidden" data-correct="${ex.answer}" data-feedback="${esc(ex.feedback)}"></div>`;
}

function renderLearningTop(key,allowConsult=true){
  const pos=learningPosition(key);if(!pos)return'';
  const stats=progressStats();
  const label=pos.item.checkpoint?'Checkpoint':pos.item.diagnostic?'Prática final':`Aula ${pos.lessonIndex+1} de ${pos.lessonTotal}`;
  return `<div class="learning-strip"><div class="shell learning-strip-inner"><div class="learning-location"><a href="#financeiro">Trilha Financeiro</a><span>›</span><strong>Módulo ${pos.item.stageIndex+1}: ${pos.item.stageTitle}</strong><span>·</span><span>${label}</span></div><div class="learning-strip-tools">${allowConsult?`<div class="mode-switch" role="group" aria-label="Modo de uso"><button type="button" data-view-mode="study">Estudar</button><button type="button" data-view-mode="consult">Consultar</button></div>`:''}<div class="learning-strip-progress">${progressBar(stats.percent,true)}</div></div></div></div>`;
}
function renderQuickReference(d){
  const quick=d.quick||[];
  const steps=d.steps||d.analysis||d.analysisSteps||d.decisionFlow||d.classificationTree||[];
  const warnings=(d.doesNotAnswer||d.notConclude||d.notReady||[]).slice(0,3);
  return `<section class="quick-reference"><div class="quick-reference-head"><span class="eyebrow">Modo consulta</span><h2>${d.title}</h2><p>Resumo operacional para usar durante o trabalho. Para aprender o raciocínio completo, volte ao modo Estudar.</p></div>${quick.length?renderQuick(quick,'Essencial'):''}${steps.length?`<div class="quick-reference-block"><h3>Roteiro rápido</h3>${renderFlow(steps.slice(0,5))}</div>`:''}${d.validation?`<div class="quick-reference-block"><h3>Como validar</h3>${renderValidation(d.validation)}</div>`:''}${warnings.length?`<div class="quick-reference-block"><h3>Pontos de atenção</h3>${renderList(warnings)}</div>`:''}${d.nextQuestion?`<div class="quick-reference-block">${renderNextQuestion(d.nextQuestion)}</div>`:''}<button class="btn secondary" type="button" data-view-mode="study">Voltar ao modo estudo</button></section>`;
}
function renderLearningBottom(key){
  const pos=learningPosition(key);if(!pos)return'';
  const done=isCompleted(key),passed=isPassed(key);
  const prev=pos.prev?`<a class="lesson-nav-link prev" href="${pos.prev.href}"><span>Anterior</span><strong>← ${pos.prev.title}</strong></a>`:'<span></span>';
  const next=pos.next?`<a class="lesson-nav-link next" href="${pos.next.href}"><span>Próximo</span><strong>${pos.next.title} →</strong></a>`:`<a class="lesson-nav-link next" href="#financeiro"><span>Trilha</span><strong>Ver visão geral →</strong></a>`;
  const button=done?`<button class="btn primary complete-btn done" type="button" data-complete="${key}" data-next="${pos.next?pos.next.href:'#financeiro'}">✓ Concluída — continuar</button>`:passed?`<button class="btn primary complete-btn" type="button" data-complete="${key}" data-next="${pos.next?pos.next.href:'#financeiro'}">Concluir e continuar →</button>`:`<button class="btn primary complete-btn" type="button" disabled>Responda a aplicação corretamente para concluir</button>`;
  return `<section class="lesson-completion"><div class="lesson-completion-head"><span class="eyebrow">Domínio demonstrado</span><h2>${done?'Atividade concluída':passed?'Aplicação correta':'Mostre que entendeu antes de avançar'}</h2><p>${done?'O progresso ficou salvo neste dispositivo.':passed?'Você demonstrou compreensão nesta atividade. Conclua para seguir.':'A conclusão exige uma aplicação correta — não apenas chegar ao fim da página.'}</p></div>${button}<div class="lesson-nav">${prev}${next}</div></section>`;
}

function courseDashboard(){
  const items=learningItems(),stats=progressStats(items),next=recommendedItem(),p=getProgress();
  const lessons=items.filter(x=>!x.checkpoint&&!x.diagnostic).length,checkpoints=items.filter(x=>x.checkpoint).length;
  return `<section class="learning-dashboard"><div class="course-card-main"><div class="course-card-top"><div><span class="eyebrow">Sua formação</span><h2>Financeiro — do dado à decisão</h2><p>Aprenda como o dado nasce, como validar a rotina e como transformar números em análise e diagnóstico.</p></div><span class="course-count">${DATA.financeStages.length} módulos · ${lessons} aulas · ${checkpoints} checkpoints · 1 prática final</span></div>${progressBar(stats.percent)}<div class="course-card-meta"><span>${stats.completed} de ${stats.total} atividades concluídas</span><span>Conclusão exige aplicação correta</span></div><div class="course-actions"><a class="btn primary" href="${next?.href||'#financeiro'}">${p.completed.length||p.lastVisited?'Continuar aprendizado':'Começar formação'} →</a><a class="btn secondary" href="#financeiro">Ver módulos</a></div></div><aside class="course-side"><span class="eyebrow">Consulta no trabalho</span><h3>Já conhece o tema?</h3><p>Abra a aula em modo Consulta ou pesquise a dúvida diretamente. A plataforma serve para aprender e também para apoiar a execução.</p><button type="button" data-open-search>Buscar um assunto →</button><a href="#diagnostico/caixa-ruim">Investigar um problema →</a></aside></section>`;
}

function renderHome(){
  app.innerHTML=`<section class="hero platform-hero"><div class="shell"><div class="hero-inner"><span class="eyebrow">Ensino Lean</span><h1>Aprenda para executar melhor. <span class="accent">Pratique para decidir melhor.</span></h1><p class="hero-copy">Plataforma de treinamento e apoio para clientes da Lean Company. Estude em sequência quando estiver aprendendo e use a mesma base como consulta durante o trabalho.</p><form id="heroSearch" class="searchbar" role="search"><label class="sr-only" for="heroQ">Buscar</label><input id="heroQ" placeholder="O que você quer aprender ou resolver?"><button class="btn primary" type="submit">Buscar</button></form><div class="hero-note">Ex.: “cliente demora a pagar”, “como classificar esta despesa?”, “vendi mais e falta dinheiro”.</div></div></div></section><section class="section learning-home"><div class="shell">${courseDashboard()}</div></section>`;
  setTimeout(()=>document.getElementById('heroSearch')?.addEventListener('submit',e=>{e.preventDefault();openSearch(document.getElementById('heroQ').value)}),0);
}

function renderCourseModules(){
  const done=new Set(getProgress().completed);let lessonNo=0;
  return (DATA.financeStages||[]).map((stage,si)=>{
    const stageItems=(stage.items||[]).map(x=>({...x,key:x.slug}));const stats=progressStats(stageItems);
    const rows=stageItems.map(item=>{
      if(!item.checkpoint&&!item.diagnostic)lessonNo++;
      const completed=done.has(item.slug);const d=item.checkpoint?DATA.checkpoints?.[item.slug]:item.diagnostic?DATA.diagnostic:DATA.lessons[item.slug];
      const label=item.checkpoint?'Checkpoint':item.diagnostic?'Prática final':`Aula ${lessonNo}`;const meta=[item.kind,d?.time].filter(Boolean).join(' · ');
      return `<a class="course-lesson-row ${completed?'completed':''} ${item.checkpoint?'checkpoint-row':''}" href="${item.checkpoint?`#checkpoint/${item.slug}`:item.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${item.slug}`}"><span class="lesson-status">${completed?'✓':item.checkpoint?'◆':lessonNo}</span><div class="course-lesson-copy"><div class="course-lesson-kicker">${label} · ${meta}</div><strong>${item.title}</strong><p>${item.why}</p></div><span class="course-lesson-arrow">→</span></a>`;
    }).join('');
    return `<section class="course-module"><div class="course-module-head"><div><div class="module-labels"><span class="eyebrow">Módulo ${si+1}</span>${stage.focus?`<span class="focus-label">${stage.focus}</span>`:''}</div><h2>${stage.title}</h2><p>${stage.desc}</p></div><div class="module-progress"><span>${stats.completed}/${stats.total}</span>${progressBar(stats.percent,true)}</div></div><div class="course-lesson-list">${rows}</div></section>`;
  }).join('');
}
function renderFinance(){
  const stats=progressStats(),next=recommendedItem();
  app.innerHTML=`${pageHero('Trilha de aprendizagem','Financeiro — do dado à decisão','Uma formação prática para aprender a produzir informação confiável, interpretar resultado e caixa e investigar capital de giro.',[['Início','#home'],['Trilha Financeiro','#financeiro']],`<span>${DATA.financeStages.length} módulos</span><span>${learningItems().filter(x=>!x.checkpoint&&!x.diagnostic).length} aulas</span><span>${learningItems().filter(x=>x.checkpoint).length} checkpoints</span><span>1 prática final</span>`)}<div class="shell finance-wrap course-page"><section class="course-overview"><div><span class="eyebrow">Seu progresso</span><h2>${stats.completed===stats.total?'Formação concluída':'Continue de onde parou'}</h2><p>Não há bloqueio de conteúdo: você pode estudar em ordem ou abrir uma aula para consulta. A conclusão da trilha, porém, só avança após aplicação correta.</p></div><div class="course-overview-progress">${progressBar(stats.percent)}<span>${stats.completed}/${stats.total} atividades</span></div><a class="btn primary" href="${next?.href||'#financeiro'}">${stats.completed?'Continuar':'Começar'} →</a></section><div class="case-intro course-case"><span class="eyebrow">Caso contínuo</span><h3>${DATA.companyCase.name}</h3><p>${DATA.companyCase.description} ${DATA.companyCase.story}</p></div>${renderCourseModules()}<div class="finance-note"><strong>Como usar</strong><p>Para treinamento, siga os módulos. Para trabalho, abra diretamente o tema necessário em modo Consulta. Os checkpoints verificam se você consegue combinar conteúdos, e a prática final exige diagnóstico com evidência.</p></div></div>`;
}

function commonLessonShell(slug,d,body,label){
  return `${pageHero(label,d.title,d.summary,[['Início','#home'],['Trilha Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}${renderLearningTop(slug)}<div class="shell article-shell">${renderQuickReference(d)}<div class="study-content">${body}</div>${renderLearningBottom(slug)}</div>`;
}

function renderConcept(slug,d){
  const top=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['conceito','Conceito'],['exemplos','Exemplos'],['aplicar','Como aplicar'],['validar','Como validar'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}${section('resumo','02 · Consulta rápida','Em 1 minuto',renderQuick(d.quick))}`;
  let body='';
  if(slug==='caixa-x-competencia') body=`${top}${section('conceito','03 · Conceito','Caixa e competência respondem perguntas diferentes',`<div class="definition-pair">${d.definitions.map(x=>`<div class="definition"><strong>${x[0]}</strong><p>${termize(x[1])}</p></div>`).join('')}</div>`)}${section('exemplos','04 · Exemplos','A regra simples — e onde começam as dúvidas',`${renderExample(d.mainExample)}${renderPairTable(d.edgeCases,['Situação','Como tratar'])}`)}${section('aplicar','05 · Aplicação','Como escolher a data',renderFlow(d.decisionFlow))}${section('validar','06 · Validação','Como saber se o lançamento faz sentido',renderValidation(d.validation))}${section('responsabilidade','07 · Responsabilidade','Do lançamento à decisão',`${renderResponsibility(d)}<h4 style="margin-top:22px">Se a data estiver errada</h4>${renderCauseEffect(d.errorChain)}`)}${section('teste','08 · Aplicação','Resolva uma situação realista',renderExercise(d.exercise))}`;
  else body=`${top}${section('conceito','03 · Regra central','Classifique pelo que foi consumido',`<p class="lead">${termize(d.principle)}</p><div class="note"><strong>Por que importa</strong><p>${termize(d.why)}</p></div>`)}${section('exemplos','04 · Exemplos','O mesmo fornecedor pode representar coisas diferentes',`${renderExample(d.example)}<h4 style="margin-top:24px">Casos que geram dúvida</h4>${renderPairTable(d.ambiguity,['Situação','O que perguntar antes de lançar'])}`)}${section('aplicar','05 · Aplicação','Uma árvore mental para classificar',`${renderFlow(d.classificationTree)}<h4 style="margin-top:24px">Plano de contas x centro de custo</h4>${renderPairTable(d.accountVsCenter,['Dimensão','Pergunta','Exemplos'])}`)}${section('validar','06 · Validação','Como saber se a classificação está boa',`${renderValidation(d.validation)}<h4 style="margin-top:24px">Erros recorrentes</h4>${renderList(d.commonMistakes)}`)}${section('responsabilidade','07 · Responsabilidade','Quem registra e quem usa',`${renderResponsibility(d)}<h4 style="margin-top:22px">Quando a classificação erra</h4>${renderCauseEffect(d.errorChain)}`)}${section('teste','08 · Aplicação','Classifique usando o raciocínio',renderExercise(d.exercise))}`;
  app.innerHTML=commonLessonShell(slug,d,body,'Conceito');
}

function renderProcedure(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['papel','Quem faz'],['antes','Antes'],['passo','Passo a passo'],['validar','Validar'],['terminou','Quando terminou'],['erro','Erros'],['teste','Aplicação']])}${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}${section('resumo','02 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<p class="lead">${termize(d.objective)}</p>`)}${section('papel','03 · Responsabilidade','Quem executa, valida e usa',renderPairTable(d.roles,['Papel','Responsável']))}${section('antes','04 · Preparação','Antes de começar',renderChecklist(d.before))}${section('passo','05 · Procedimento','Faça nesta ordem',renderFlow(d.steps))}${section('validar','06 · Validação','O que conferir em cada etapa',`${renderPairTable(d.stageValidation,['Etapa','Critério'])}${renderValidation(d.validation)}`)}${section('terminou','07 · Saída esperada','Como saber que terminou',`${renderChecklist(d.finishCriteria)}<h4 style="margin-top:22px">Sinais de que ainda não terminou</h4>${renderList(d.notReady)}`)}${section('erro','08 · Consequência','Erros que parecem pequenos, mas chegam à gestão',`${renderList(d.mistakes)}<h4 style="margin-top:22px">Da falha à decisão</h4>${renderCauseEffect(d.errorChain)}${renderResponsibility(d)}`)}${section('teste','09 · Aplicação','Resolva uma situação operacional',renderExercise(d.exercise))}`;
  app.innerHTML=commonLessonShell(slug,d,body,'Procedimento');
}

function renderDRE(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['antes','Antes'],['estrutura','Estrutura'],['como','Como analisar'],['caso','Caso'],['investigar','Investigar'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}${section('resumo','02 · Consulta rápida','DRE em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>`)}${section('limites','03 · Limites','O que a DRE responde — e o que não responde sozinha',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinha</strong>${renderList(d.doesNotAnswer)}</div></div>`)}${section('antes','04 · Qualidade','Antes de analisar, valide a base',`<p>Uma leitura sofisticada não corrige dado ruim.</p>${renderChecklist(d.before)}`)}${section('estrutura','05 · Estrutura','Como o faturamento vira resultado',`${renderFlow(d.anatomy)}<div class="note"><strong>Regra de leitura</strong><p>Resultado é consequência. Entenda primeiro como a receita foi consumida.</p></div>`)}${section('como','06 · Método','Como analisar uma DRE',`${renderFlow(d.analysisSteps)}<h4 style="margin-top:22px">Com o que comparar</h4>${renderPairTable(d.compare,['Comparação','O que ajuda a enxergar'])}`)}${section('caso','07 · Caso contínuo',DATA.companyCase.name,`${renderExample(d.caseExample)}${renderNextQuestion(d.nextQuestion)}`)}${section('investigar','08 · Diagnóstico','Se acontecer isto, investigue aquilo',`${renderPairTable(d.investigations,['Sinal','Próxima investigação'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}${section('responsabilidade','09 · Responsabilidade','O relatório depende de quem alimenta e de quem interpreta',`${renderResponsibility(d)}<h4 style="margin-top:22px">Como um erro vira decisão errada</h4>${renderCauseEffect(d.errorChain)}`)}${section('teste','10 · Aplicação','Faça uma leitura sem resposta óbvia',renderExercise(d.exercise))}`;
  app.innerHTML=commonLessonShell(slug,d,body,'Análise gerencial');
}

function renderCashFlow(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['antes','Antes'],['como','Como analisar'],['caso','Caso'],['lucro','Lucro x caixa'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}${section('resumo','02 · Consulta rápida','Fluxo em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>`)}${section('limites','03 · Limites','O que o Fluxo responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div>`)}${section('antes','04 · Qualidade','Antes de analisar',renderChecklist(d.before))}${section('como','05 · Método','Como analisar',renderFlow(d.analysisSteps))}${section('caso','06 · Caso contínuo',DATA.companyCase.name,`${renderExample(d.caseExample)}<h4 style="margin-top:24px">Uma leitura simples de movimentos</h4>${renderPairTable(d.timeline,['Movimento','Efeito no caixa'])}${renderNextQuestion(d.nextQuestion)}`)}${section('lucro','07 · Conceito-chave','Por que lucro e caixa podem andar separados',`${renderPairTable(d.profitVsCash,['Situação','Por que afeta diferente'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}${section('responsabilidade','08 · Responsabilidade','Quem mantém o fluxo confiável',renderResponsibility(d))}${section('teste','09 · Aplicação','Encontre o risco que o saldo final esconde',renderExercise(d.exercise))}`;
  app.innerHTML=commonLessonShell(slug,d,body,'Análise financeira');
}

function renderIndicator(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['resumo','Em 1 minuto'],['limites','O que responde'],['dados','Dados'],['como','Como analisar'],['interpretar','Interpretar'],['cruzar','Cruzar'],['caso','Caso'],['responsabilidade','Responsabilidades'],['teste','Aplicação']])}${section('objetivo','01 · Objetivo','Ao final, você deve conseguir',renderOutcomes(d.outcomes))}${section('resumo','02 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${termize(d.inOneSentence)}</p></div>${d.formula?`<div class="formula-box"><span class="eyebrow">Fórmula / lógica</span><strong>${termize(d.formula)}</strong></div>`:''}`)}${section('limites','03 · Limites','O que este indicador responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div><div class="note"><strong>Quando analisar</strong><p>${termize(d.when)}</p></div>`)}${section('dados','04 · Qualidade','Quais dados precisam estar confiáveis',`<h4>Dados necessários</h4>${renderChecklist(d.data)}<h4 style="margin-top:22px">Antes de confiar</h4>${renderChecklist(d.quality)}`)}${section('como','05 · Método','Como analisar',renderFlow(d.analysis))}${section('interpretar','06 · Leitura','Como interpretar sinais diferentes',`${renderPairTable(d.interpretation,['Sinal','O que pode significar'])}${renderNextQuestion(d.nextQuestion)}`)}${section('cruzar','07 · Conexões','O que analisar junto — e por quê',renderCross(d.cross))}${section('caso','08 · Caso contínuo',DATA.companyCase.name,renderExample(d.caseExample))}${section('responsabilidade','09 · Responsabilidade','Quem garante o dado e quem toma decisão',renderResponsibility(d))}${section('teste','10 · Aplicação','Use evidência para escolher a hipótese',renderExercise(d.exercise))}`;
  app.innerHTML=commonLessonShell(slug,d,body,'Indicador');
}

function renderLesson(slug){
  const d=DATA.lessons?.[slug];if(!d){renderFinance();return}
  if(d.type==='concept')renderConcept(slug,d);
  else if(d.type==='procedure')renderProcedure(slug,d);
  else if(d.type==='indicator')renderIndicator(slug,d);
  else if(slug==='dre-gerencial')renderDRE(slug,d);
  else renderCashFlow(slug,d);
}

function renderCheckpoint(slug,d){
  if(!d){renderFinance();return}
  const body=`${toc([['objetivo','Objetivo'],['caso','Caso'],['decisao','Decisão'],['revisar','Revisar']])}${section('objetivo','01 · Checkpoint','O que este checkpoint verifica',`<p class="lead">${termize(d.objective)}</p><div class="note"><strong>Sem teoria nova</strong><p>O objetivo é verificar se você consegue combinar o que acabou de estudar.</p></div>`)}${section('caso','02 · Situação','Leia o caso antes de responder',renderPairTable(d.context.rows,d.context.headers))}${section('decisao','03 · Aplicação','Escolha a leitura mais consistente',renderExercise(d.question))}${section('revisar','04 · Se precisar revisar','Volte apenas ao ponto que ficou fraco',renderCross(d.review))}`;
  app.innerHTML=`${pageHero('Checkpoint',d.title,d.summary,[['Início','#home'],['Trilha Financeiro','#financeiro'],[d.title,`#checkpoint/${slug}`]],`<span>${d.time}</span><span>Aplicação integrada</span>`)}${renderLearningTop(slug,false)}<div class="shell article-shell"><div class="study-content">${body}</div>${renderLearningBottom(slug)}</div>`;
}

function renderDiagnostic(){
  const d=DATA.diagnostic;
  app.innerHTML=`${pageHero('Prática final',d.title,d.summary,[['Início','#home'],['Trilha Financeiro','#financeiro'],[d.title,'#diagnostico/caixa-ruim']])}${renderLearningTop('caixa-ruim',false)}<div class="shell article-shell"><div class="study-content">${toc([['principio','Princípio'],['ordem','Por onde começar'],['caso','Caso'],['investigar','Hipóteses'],['concluir','Concluir'],['aplicacao','Prática final']])}${section('principio','01 · Comece certo','Caixa ruim é um sintoma, não uma causa',`<p class="diagnostic-intro">${termize(d.intro)}</p><div class="note amber"><strong>Não comece pela solução</strong><p>Primeiro identifique o mecanismo que explica a pressão.</p></div>`)}${section('ordem','02 · Roteiro','Uma ordem simples para não se perder',`<div class="diagnostic-path">${d.path.map(p=>`<div class="path-row"><span class="n">${p.n}</span><div><strong>${p.title}</strong><p>${p.text}</p></div><a href="${p.href}">Abrir →</a></div>`).join('')}</div>`)}${section('caso','03 · Exemplo','O mesmo sintoma pode ter mecanismos diferentes',`<div class="case-intro"><span class="eyebrow">${DATA.companyCase.name}</span><p>${termize(d.caseIntro)}</p></div>${renderPairTable(DATA.companyCase.base.slice(1),DATA.companyCase.base[0])}`)}<section id="investigar" class="article-section"><span class="eyebrow">04 · Investigação</span><h2>Teste hipótese por hipótese</h2>${d.branches.map((b,i)=>`<div class="diagnostic-branch"><div class="q">${i+1}. ${b.q}</div><p>${termize(b.why)}</p><div class="diagnostic-evidence"><div><strong>O que verificar</strong><p>${termize(b.verify)}</p></div><div><strong>Evidências que fortalecem</strong>${renderList(b.supports)}</div><div><strong>Evidências que enfraquecem</strong>${renderList(b.weakens)}</div></div><div class="diagnostic-links">${b.links.map(x=>`<a href="${hrefFor(x[0])}">${x[1]} →</a>`).join('')}</div></div>`).join('')}</section>${section('concluir','05 · Conclusão','Transforme o sintoma em uma causa acompanhável',`<p class="lead">${termize(d.finish)}</p><div class="validation-set"><div class="validation-row ok"><strong>Saída esperada</strong><p>Causa + evidência + ação + responsável + indicador + data de reavaliação.</p></div></div>`)}${section('aplicacao','06 · Prática final','Feche o diagnóstico com evidência',renderExercise(d.exercise))}</div>${renderLearningBottom('caixa-ruim')}</div>`;
}

function searchIndex(){
  const items=[];
  Object.entries(DATA.lessons||{}).forEach(([slug,d])=>items.push({title:d.title,sub:d.type==='procedure'?'Procedimento':d.type==='indicator'?'Indicador':d.type==='analysis'?'Análise':'Conceito',href:`#lesson/${slug}`,text:[d.title,d.summary,JSON.stringify(d)].join(' ')}));
  Object.entries(DATA.checkpoints||{}).forEach(([slug,d])=>items.push({title:d.title,sub:'Checkpoint',href:`#checkpoint/${slug}`,text:[d.title,d.summary,JSON.stringify(d)].join(' ')}));
  items.push({title:DATA.diagnostic.title,sub:'Diagnóstico',href:'#diagnostico/caixa-ruim',text:JSON.stringify(DATA.diagnostic)+' caixa negativo sem dinheiro lucro estoque crescimento'});
  items.push({title:'Financeiro — do dado à decisão',sub:'Trilha',href:'#financeiro',text:'financeiro competencia plano contas pagar receber conciliacao fechamento dre fluxo pmr pmp pme ciclo ncg'});
  return items;
}
function aliasBoost(q,item){const nq=normalize(q);let score=0;(DATA.searchAliases||[]).forEach(a=>{if(a.terms.some(t=>nq.includes(normalize(t)))&&item.href===a.target)score+=30});return score}
function doSearch(q){const words=normalize(q).trim().split(/\s+/).filter(Boolean);let items=searchIndex();if(words.length)items=items.map(x=>{const t=normalize(x.text);const score=words.reduce((s,w)=>s+(t.includes(w)?1:0),0)+aliasBoost(q,x);return{x,score}}).filter(o=>o.score>0).sort((a,b)=>b.score-a.score).map(o=>o.x);searchResults.innerHTML=items.slice(0,20).map(x=>`<a class="result" href="${x.href}"><div><strong>${x.title}</strong><small>${x.sub}</small></div><span>Abrir →</span></a>`).join('')||`<div class="result"><div><strong>Nenhum resultado.</strong><small>Tente descrever a dúvida de outra forma.</small></div></div>`}
function openSearch(q=''){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value=q;doSearch(q);setTimeout(()=>searchInput.focus(),40)}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
function showTerm(btn){const g=DATA.glossary?.[btn.dataset.term];if(!g)return;termPopover.innerHTML=`<strong>${g.title}</strong><p>${g.desc}</p>${g.link?`<a href="#lesson/${g.link}">Entender o tema completo →</a>`:''}`;termPopover.classList.remove('hidden');const r=btn.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);let left=Math.min(r.left,window.innerWidth-w-12),top=r.bottom+8;if(top+190>window.innerHeight)top=Math.max(12,r.top-180);termPopover.style.width=w+'px';termPopover.style.left=Math.max(12,left)+'px';termPopover.style.top=top+'px'}
function hideTerm(){termPopover.classList.add('hidden')}
function toggleMobileNav(){const open=mobileNav.classList.toggle('open');mobileMenuBtn.setAttribute('aria-expanded',String(open))}
function closeMobileNav(){mobileNav.classList.remove('open');mobileMenuBtn.setAttribute('aria-expanded','false')}

function route(){
  const h=location.hash||'#home';closeMobileNav();hideTerm();app.classList.remove('consult-mode');
  if(h==='#financeiro')renderFinance();
  else if(h.startsWith('#lesson/')){const slug=h.split('/')[1];rememberLast(slug);renderLesson(slug);applyViewMode()}
  else if(h.startsWith('#checkpoint/')){const slug=h.split('/')[1];rememberLast(slug);renderCheckpoint(slug,DATA.checkpoints?.[slug]);app.classList.remove('consult-mode')}
  else if(h==='#diagnostico/caixa-ruim'){rememberLast('caixa-ruim');renderDiagnostic();app.classList.remove('consult-mode')}
  else renderHome();
  window.scrollTo(0,0);app.focus({preventScroll:true});
}

window.addEventListener('hashchange',route);
document.getElementById('openSearch').addEventListener('click',()=>openSearch(''));
document.getElementById('mobileSearch').addEventListener('click',()=>{closeMobileNav();openSearch('')});
document.getElementById('closeSearch').addEventListener('click',closeSearch);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();doSearch(searchInput.value)});
searchInput.addEventListener('input',e=>doSearch(e.target.value));
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
mobileMenuBtn.addEventListener('click',toggleMobileNav);

document.addEventListener('click',e=>{
  const mode=e.target.closest('[data-view-mode]');if(mode){e.preventDefault();applyViewMode(mode.dataset.viewMode);return}
  const openSearchBtn=e.target.closest('[data-open-search]');if(openSearchBtn){e.preventDefault();openSearch('');return}
  const complete=e.target.closest('[data-complete]');if(complete){const key=complete.dataset.complete;if(!markCompleted(key))return;const next=complete.dataset.next||'#financeiro';location.hash=next;return}
  const help=e.target.closest('[data-term]');if(help){e.preventDefault();showTerm(help);return}
  if(!e.target.closest('#termPopover'))hideTerm();
  const jump=e.target.closest('[data-jump]');if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'});return}
  const tocBtn=e.target.closest('[data-toc-toggle]');if(tocBtn){tocBtn.nextElementSibling?.classList.toggle('open');return}
  const ans=e.target.closest('[data-answer]');
  if(ans){
    const box=ans.closest('[data-exercise]');const correct=Number(box.querySelector('[data-correct]').value);const feedback=box.querySelector('[data-feedback]').value;const chosen=Number(ans.dataset.answer);
    box.querySelectorAll('[data-answer]').forEach(b=>b.classList.remove('correct','wrong'));
    if(chosen===correct){box.querySelectorAll('[data-answer]').forEach(b=>b.disabled=true);ans.classList.add('correct');markPassed(currentLearningKey());const btn=document.querySelector('[data-complete]')||document.querySelector('.complete-btn');if(btn){btn.disabled=false;btn.textContent='Concluir e continuar →';btn.setAttribute('data-complete',currentLearningKey());const pos=learningPosition(currentLearningKey());btn.setAttribute('data-next',pos?.next?.href||'#financeiro')}const head=document.querySelector('.lesson-completion-head');if(head)head.innerHTML='<span class="eyebrow">Domínio demonstrado</span><h2>Aplicação correta</h2><p>Você demonstrou compreensão nesta atividade. Conclua para seguir na trilha.</p>';}
    else ans.classList.add('wrong');
    box.querySelector('.exercise-feedback').textContent=feedback;return;
  }
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSearch();hideTerm();closeMobileNav()}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch('')}});

route();