const DATA = window.ENSINO_DATA;
const app = document.getElementById('app');
const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const termPopover = document.getElementById('termPopover');
const toast = document.getElementById('toast');

function area(id){return DATA.areas.find(a=>a.id===id)}
function content(slug){return DATA.content[slug]}
function title(slug){return content(slug)?.title || DATA.titles[slug] || slug.replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase())}
function areaOf(slug){return DATA.areas.find(a=>a.groups.some(g=>g.topics.includes(slug)))}
function typeLabel(type){return ({concept:'Conceito',indicator:'Indicador',analysis:'Análise',procedure:'Procedimento',diagnostic:'Diagnóstico',case:'Caso prático'})[type]||'Conteúdo'}
function termize(text=''){
  return text.replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>`${label}<button class="help" type="button" data-term="${key}" aria-label="Explicar ${label}">?</button>`)
}
function panel(id,ey,titleText,inner,extra=''){
  return `<section id="${id}" class="panel ${extra}"><span class="eyebrow">${ey}</span><h3>${titleText}</h3>${inner}</section>`
}
function metaBadges(d){
  return `<div class="meta-row"><span class="badge blue">${typeLabel(d.type)}</span><span class="badge">${d.level||'Fundamental'}</span><span class="badge">${d.time||'—'}</span>${(d.audience||[]).map(x=>`<span class="badge">${x}</span>`).join('')}</div>`
}
function breadcrumb(items){
  return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((x,i)=>i===items.length-1?`<strong>${x[0]}</strong>`:`<a href="${x[1]}">${x[0]}</a><span>›</span>`).join('')}</nav>`
}
function normalize(s=''){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function copyLink(){navigator.clipboard?.writeText(location.href).then(()=>showToast('Link copiado')).catch(()=>showToast('Copie o endereço do navegador'))}
function showToast(msg){toast.textContent=msg;toast.style.display='block';clearTimeout(showToast.t);showToast.t=setTimeout(()=>toast.style.display='none',1800)}

function renderHome(){
  app.innerHTML = `
  <section class="hero">
    <div class="shell hero-grid">
      <div>
        <div class="hero-kicker eyebrow">Ensino Lean · Clientes Lean Company</div>
        <h1>Aprenda para <span class="accent">executar e decidir melhor.</span></h1>
        <p class="hero-copy">O Ensino Lean transforma a gestão implantada pela consultoria em um material de treinamento e consulta: quem alimenta o processo aprende a gerar informação confiável; quem analisa aprende a interpretar, investigar e decidir.</p>
        <form id="heroSearchForm" class="searchbar" role="search">
          <label class="sr-only" for="heroQ">Buscar</label>
          <input id="heroQ" placeholder="O que você quer entender ou resolver? Ex.: meu caixa está negativo">
          <button class="btn primary" type="submit">Buscar</button>
        </form>
        <div class="hero-note">Você pode pesquisar pelo termo ou descrever a dor sem conhecer o nome do indicador.</div>
      </div>
      <aside class="entry-grid" aria-label="Como usar o Ensino Lean">
        <a class="entry-card" href="#areas"><span class="entry-icon">A</span><div><h3>Entender um assunto</h3><p>Conceitos, indicadores e análises organizados por área.</p></div><span class="arrow">→</span></a>
        <a class="entry-card" href="#rotinas"><span class="entry-icon">E</span><div><h3>Executar uma rotina</h3><p>Passo a passo, controles e como saber se ficou correto.</p></div><span class="arrow">→</span></a>
        <a class="entry-card" href="#diagnosticos"><span class="entry-icon">D</span><div><h3>Investigar um problema</h3><p>Comece pelo sintoma e siga as hipóteses de causa.</p></div><span class="arrow">→</span></a>
      </aside>
    </div>
  </section>
  <section class="section" id="areas">
    <div class="shell"><div class="section-head"><div><span class="eyebrow">Aprender por área</span><h2>Onde você quer aprofundar?</h2><p>Use este caminho quando já souber qual assunto ou área precisa estudar.</p></div></div>
    <div class="area-grid">${DATA.areas.map((a,i)=>`<a class="area-card" href="#area/${a.id}"><span class="num">${String(i+1).padStart(2,'0')}</span><h3>${a.title}</h3><p>${a.desc}</p><footer><span>${a.groups.reduce((s,g)=>s+g.topics.length,0)} temas</span><span>explorar →</span></footer></a>`).join('')}</div></div>
  </section>
  <section class="section" id="diagnosticos">
    <div class="shell"><div class="section-head"><div><span class="eyebrow">Diagnóstico por sintoma</span><h2>Tenho um problema. O que pode estar causando?</h2><p>O Ensino Lean não pula do sintoma para a conclusão. Ele organiza hipóteses e mostra quais análises ajudam a confirmar ou descartar cada causa.</p></div></div>
    <div class="problem-grid">${DATA.problems.map(p=>`<a class="problem-card" href="#diagnostico/${p.id}"><span class="label">Problema comum</span><h3>${p.title}</h3><p>${p.summary}</p><span class="action">Investigar causas →</span></a>`).join('')}</div></div>
  </section>
  <section class="section" id="rotinas">
    <div class="shell"><div class="section-head"><div><span class="eyebrow">Consulta operacional</span><h2>Preciso fazer uma rotina corretamente</h2><p>Procedimentos são diferentes de aulas conceituais: aqui o foco é executar, validar e entender o impacto de um erro.</p></div></div>
    <div class="problem-grid">${['conciliacao-bancaria','fechamento-financeiro'].map(slug=>{const d=content(slug);return `<a class="problem-card" href="#conteudo/${slug}"><span class="label">Procedimento</span><h3>${d.title}</h3><p>${d.summary}</p><span class="action">Abrir passo a passo →</span></a>`}).join('')}<article class="problem-card"><span class="label">Em expansão</span><h3>Novos procedimentos</h3><p>Contas a pagar, contas a receber, inventário, PCP e outras rotinas entrarão neste mesmo padrão.</p></article></div></div>
  </section>
  <section class="section" id="treinamentos">
    <div class="shell"><div class="section-head"><div><span class="eyebrow">Treinamentos Lean</span><h2>Sequências prontas para usar com o cliente</h2><p>O consultor pode compartilhar uma sequência recomendada sem depender de login nesta fase.</p></div></div>
    <div class="training-grid">${DATA.trainings.map(t=>`<article class="training-card"><span class="badge blue">${t.audience}</span><h3 style="margin-top:12px">${t.title}</h3><p>${t.desc}</p><div class="training-meta"><span class="badge">${t.steps.length} conteúdos</span><span class="badge">${t.time}</span></div><a class="btn ghost" href="#treinamento/${t.id}">Abrir treinamento →</a></article>`).join('')}</div></div>
  </section>
  <section class="section">
    <div class="shell"><div class="section-head"><div><span class="eyebrow">Casos práticos</span><h2>Treinar raciocínio, não apenas leitura</h2><p>Empresas fictícias permitem praticar diagnóstico sem expor dados de clientes.</p></div></div>
    <div class="problem-grid">${DATA.cases.map(c=>`<a class="problem-card" href="#caso/${c.id}"><span class="label">Caso prático</span><h3>${c.title}</h3><p>${c.summary}</p><span class="action">Resolver caso →</span></a>`).join('')}</div></div>
  </section>`;
  document.getElementById('heroSearchForm')?.addEventListener('submit',e=>{e.preventDefault();openSearch(document.getElementById('heroQ').value)});
}

function renderArea(id){
  const a=area(id)||DATA.areas[0];
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],[a.title,'']])}<span class="eyebrow">Área de conhecimento</span><h1>${a.title}</h1><p>${a.desc}</p></div></section>
  <div class="shell catalog-layout"><aside class="area-nav">${DATA.areas.map(x=>`<a class="${x.id===a.id?'on':''}" href="#area/${x.id}">${x.title}</a>`).join('')}</aside><div>${a.groups.map(g=>`<section class="group"><div class="group-head"><span class="eyebrow">${g.title}</span><h3>${g.title}</h3><p>${g.desc}</p></div><div class="topic-list">${g.topics.map(slug=>{const d=content(slug);return `<a class="topic" href="#conteudo/${slug}"><div><strong>${title(slug)}</strong><small>${d?.summary||'Tema previsto na estrutura didática do Ensino Lean.'}</small></div><div class="topic-right">${d?`<span class="badge blue">${typeLabel(d.type)}</span><span class="badge green">completo</span>`:'<span class="badge">planejado</span>'}</div></a>`}).join('')}</div></section>`).join('')}</div></div>`;
}

function renderDiagnostic(id){
  const p=DATA.problems.find(x=>x.id===id)||DATA.problems[0];
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],['Problemas','#diagnosticos'],[p.title,'']])}<span class="eyebrow">Diagnóstico por sintoma</span><h1>${p.title}</h1><p>${p.summary}</p></div></section>
  <div class="shell diagnostic-layout"><div><div class="diagnostic-intro"><h3>Como investigar</h3><p><strong>Sintoma não é causa.</strong> Teste hipóteses antes de definir ação. Cada hipótese abaixo aponta o que verificar e quais conteúdos ajudam na investigação.</p></div><div class="cause-list">${p.causes.map((c,i)=>`<article class="cause-card"><div class="cause-head"><span class="cause-n">${i+1}</span><div><h3>${c[0]}</h3><p>${c[1]}</p><div class="cause-actions">${c[2].map(s=>`<a href="#conteudo/${s}">${title(s)}</a>`).join('')}</div></div></div></article>`).join('')}</div></div><aside class="sidebar"><div class="side-card"><span class="eyebrow">Regra de análise</span><h4>Não procure um culpado. Procure evidência.</h4><p>O objetivo é confirmar ou descartar hipóteses usando dados, não escolher uma causa por intuição.</p></div><div class="side-card"><button class="btn ghost" type="button" data-copy-link>Copiar link deste diagnóstico</button></div></aside></div>`;
}

function renderTraining(id){
  const t=DATA.trainings.find(x=>x.id===id)||DATA.trainings[0];
  const steps=t.steps.map((s,i)=>({slug:s,d:content(s)}));
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],['Treinamentos','#treinamentos'],[t.title,'']])}<span class="eyebrow">Treinamento Lean</span><h1>${t.title}</h1><p>${t.desc}</p><div class="meta-row"><span class="badge blue">${t.audience}</span><span class="badge">${t.steps.length} conteúdos</span><span class="badge">${t.time}</span></div></div></section>
  <div class="shell training-layout"><div class="training-step-list">${steps.map((x,i)=>`<a class="training-step" href="#conteudo/${x.slug}"><span class="step-n">${String(i+1).padStart(2,'0')}</span><div><strong>${title(x.slug)}</strong><p>${x.d?.summary||'Conteúdo planejado.'}</p></div><span class="type">${x.d?typeLabel(x.d.type):'planejado'}</span></a>`).join('')}</div><aside class="sidebar"><div class="side-card"><span class="eyebrow">Uso na consultoria</span><h4>Compartilhe esta sequência</h4><p>Envie este link para o cliente antes ou depois de uma reunião. No futuro, login permitirá atribuir trilhas por empresa.</p><button class="btn ghost" type="button" data-copy-link style="margin-top:9px">Copiar link</button></div><div class="side-card"><span class="eyebrow">Primeiro passo</span><a class="text-link" href="#conteudo/${t.steps[0]}">Iniciar treinamento →</a></div></aside></div>`;
}

function renderCase(id){
  const c=DATA.cases.find(x=>x.id===id)||DATA.cases[0];
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],['Casos','#home'],[c.title,'']])}<span class="eyebrow">Caso prático · empresa fictícia</span><h1>${c.title}</h1><p>${c.summary}</p></div></section>
  <div class="shell content-layout"><article class="article">${panel('case','01 · Cenário','Situação',`<div class="case-box"><p>${c.scenario}</p></div>`)}${panel('questions','02 · Sua análise','Antes de ver a resposta, pense',`<div class="objective-list">${c.questions.map((q,i)=>`<div class="objective"><i>${i+1}.</i><span>${q}</span></div>`).join('')}</div><div class="reveal"><button type="button" data-reveal>Ver análise sugerida</button><div id="caseReveal" class="reveal-content hidden"><p>${c.answer}</p></div></div>`)}${panel('links','03 · Aprofundar','Conteúdos relacionados',`<div class="cross-links">${c.links.map(s=>`<a class="cross-link" href="#conteudo/${s}"><div><strong>${title(s)}</strong></div><span>→</span></a>`).join('')}</div>`)}</article><aside class="sidebar"><div class="side-card"><span class="eyebrow">Objetivo do caso</span><p>Treinar a sequência de raciocínio e a escolha das análises, não decorar uma resposta.</p></div></aside></div>`;
}

function renderContent(slug){
  const d=content(slug);
  if(!d)return renderPlanned(slug);
  const a=area(d.area);
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],[a.title,`#area/${a.id}`],[d.title,'']])}<span class="eyebrow">${typeLabel(d.type)}</span><h1>${d.title}</h1><p>${d.summary}</p>${metaBadges(d)}</div></section><div class="shell content-layout"><article id="contentArticle" class="article">${renderByType(slug,d)}</article><aside class="sidebar">${renderSidebar(slug,d)}</aside></div>`;
  if(d.manager||d.operator)setTimeout(()=>paintRole(d,'manager'),0);
}

function renderPlanned(slug){
  const a=areaOf(slug)||DATA.areas[0];
  app.innerHTML=`<section class="page-hero"><div class="shell">${breadcrumb([['Início','#home'],[a.title,`#area/${a.id}`],[title(slug),'']])}<span class="eyebrow">Conteúdo planejado</span><h1>${title(slug)}</h1><p>Este tema já está posicionado na arquitetura do Ensino Lean, mas ainda não recebeu o template completo da V6.</p><div class="meta-row"><span class="badge amber">planejado</span></div></div></section><div class="shell" style="padding:28px 0 70px"><div class="panel"><h3>Quando for desenvolvido, este conteúdo seguirá um template adequado ao seu tipo</h3><p>Conceitos, indicadores, análises e procedimentos não serão tratados como a mesma coisa.</p></div></div>`;
}

function renderByType(slug,d){
  if(d.type==='concept')return renderConcept(slug,d);
  if(d.type==='indicator')return renderIndicator(slug,d);
  if(d.type==='analysis')return renderAnalysis(slug,d);
  if(d.type==='procedure')return renderProcedure(slug,d);
  return '';
}

function quickPanel(d){
  return panel('quick','Em 1 minuto','Resumo para consulta rápida',`<p>${termize(d.quick||d.summary)}</p><div class="quick-grid"><div class="quick-item"><strong>Tipo</strong><span>${typeLabel(d.type)}</span></div><div class="quick-item"><strong>Tempo</strong><span>${d.time}</span></div></div>`,'quick-summary');
}
function objectivesPanel(d){return panel('objectives','Objetivo','Ao final, você deve conseguir',`<div class="objective-list">${(d.objectives||[]).map(x=>`<div class="objective"><i>✓</i><span>${termize(x)}</span></div>`).join('')}</div>`) }
function rolePanel(d){if(!d.manager&&!d.operator)return '';return panel('roles','Responsabilidade','Quem analisa x quem alimenta o processo',`<div class="role-tabs">${d.manager?'<button class="on" type="button" data-role="manager">Para quem analisa</button>':''}${d.operator?'<button type="button" data-role="operator">Para quem alimenta o processo</button>':''}</div><div id="roleContent" class="role-content"></div>${d.errorChain?`<h4 style="margin-top:15px">Como um erro operacional chega à decisão</h4><div class="flow">${d.errorChain.map((x,i)=>`<div class="flow-step"><i>${i+1}</i><div><strong>${termize(x)}</strong></div></div>`).join('')}</div>`:''}`)}
function quizPanel(slug,d){if(!d.quiz)return '';return panel('quiz','Teste rápido','Verifique se entendeu',`<div class="quiz"><div class="quiz-question">${d.quiz.q}</div><div class="quiz-options">${d.quiz.options.map((o,i)=>`<button type="button" data-quiz="${slug}" data-option="${i}">${o}</button>`).join('')}</div><div id="quizFeedback" class="quiz-feedback"></div></div>`)}
function examplePanel(d){if(!d.example)return '';return panel('example','Exemplo resolvido',d.example.title,`<p>${d.example.scenario}</p><div class="example"><div class="mini-table">${d.example.rows.map((r,i)=>`<div class="mini-row ${i===d.example.rows.length-1?'em':''}"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div><div class="insight"><h4>Como interpretar</h4><p>${termize(d.example.insight)}</p></div></div>`)}
function nextPanel(d){const next=d.next||[];if(!next.length)return '';return panel('next','Continuar','Próximos conteúdos recomendados',`<div class="cross-links">${next.map(s=>`<a class="cross-link" href="#conteudo/${s}"><div><strong>${title(s)}</strong><p>${content(s)?.summary||'Conteúdo relacionado'}</p></div><span>→</span></a>`).join('')}</div>`)}

function renderConcept(slug,d){
  return `${quickPanel(d)}${objectivesPanel(d)}${panel('understand','01 · Entender','O conceito sem complicação',`<div class="question-grid">${d.simple.map(x=>`<div class="qbox"><p>${termize(x)}</p></div>`).join('')}</div>`)}${examplePanel(d)}${rolePanel(d)}${d.mistakes?panel('mistakes','04 · Evitar','Erros comuns',`<ul>${d.mistakes.map(x=>`<li>${termize(x)}</li>`).join('')}</ul>`):''}${nextPanel(d)}${quizPanel(slug,d)}`;
}
function renderIndicator(slug,d){
  return `${quickPanel(d)}${objectivesPanel(d)}${panel('formula','01 · Medida','O que este indicador mede?',`<div class="alert"><strong>Fórmula / lógica</strong><p>${termize(d.formula)}</p></div><h4 style="margin-top:14px">Dados necessários</h4><div class="checklist">${(d.data||[]).map(x=>`<div class="check-item"><span>✓</span>${x}</div>`).join('')}</div>`)}${panel('when','02 · Momento','Quando analisar?',`<p>${termize(d.when)}</p>`)}${panel('how','03 · Método','Como analisar',`<div class="flow">${d.analysis.map((x,i)=>`<div class="flow-step"><i>${i+1}</i><div><strong>${x[0]}</strong><p>${termize(x[1])}</p></div></div>`).join('')}</div>`)}${crossPanel(d)}${rolePanel(d)}${examplePanel(d)}${attentionPanel(d)}${nextPanel(d)}${quizPanel(slug,d)}`;
}
function renderAnalysis(slug,d){
  return `${quickPanel(d)}${objectivesPanel(d)}${d.prerequisites?.length?panel('prereq','Antes de começar','Pré-requisitos',`<div class="cross-links">${d.prerequisites.map(s=>`<a class="cross-link" href="#conteudo/${s}"><div><strong>${title(s)}</strong></div><span>→</span></a>`).join('')}</div>`):''}${panel('responds','01 · Objetivo','O que esta análise responde?',`<div class="question-grid">${d.responds.map(x=>`<div class="qbox"><strong>${x}</strong></div>`).join('')}</div>`)}${panel('before','02 · Qualidade','Antes de analisar, confirme',`<div class="checklist">${d.before.map(x=>`<div class="check-item"><span>✓</span>${termize(x)}</div>`).join('')}</div>`)}${panel('when','03 · Momento','Quando e com que frequência?',`<div class="question-grid"><div class="qbox"><strong>Quando analisar</strong><p>${termize(d.when)}</p></div><div class="qbox"><strong>Frequência</strong><p>${termize(d.frequency)}</p></div></div>`)}${panel('how','04 · Método','Como analisar, na ordem certa',`<div class="flow">${d.analysis.map((x,i)=>`<div class="flow-step"><i>${i+1}</i><div><strong>${x[0]}</strong><p>${termize(x[1])}</p></div></div>`).join('')}</div>${d.compare?`<h4 style="margin-top:15px">Com o que comparar</h4><div class="compare-grid">${d.compare.map(x=>`<div class="compare"><strong>${x[0]}</strong><p>${x[1]}</p></div>`).join('')}</div>`:''}`)}${crossPanel(d)}${rolePanel(d)}${examplePanel(d)}${attentionPanel(d)}${d.notConclude?.length?panel('not-conclude','07 · Cuidado','O que NÃO concluir rápido demais',`<div class="checklist">${d.notConclude.map(x=>`<div class="check-item"><span>!</span>${x}</div>`).join('')}</div>`):''}${nextPanel(d)}${quizPanel(slug,d)}`;
}
function renderProcedure(slug,d){
  return `${quickPanel(d)}${objectivesPanel(d)}${d.prerequisites?.length?panel('prereq','Antes de executar','Pré-requisitos',`<div class="cross-links">${d.prerequisites.map(s=>`<a class="cross-link" href="#conteudo/${s}"><div><strong>${title(s)}</strong></div><span>→</span></a>`).join('')}</div>`):''}${panel('when','01 · Rotina','Quando executar?',`<p>${d.when}</p>`)}${panel('steps','02 · Execução','Passo a passo',`<div class="flow">${d.steps.map((x,i)=>`<div class="flow-step"><i>${i+1}</i><div><strong>${x[0]}</strong><p>${termize(x[1])}</p></div></div>`).join('')}</div>`)}${panel('controls','03 · Validação','Como saber se ficou correto?',`<div class="checklist">${d.controls.map(x=>`<div class="check-item"><span>✓</span>${x}</div>`).join('')}</div>`)}${panel('impact','04 · Impacto','Se fizer errado, onde aparece?',`<div class="cross-links">${d.downstream.map(x=>`<div class="cross-link"><div><strong>${x}</strong></div></div>`).join('')}</div>`)}${d.mistakes?panel('mistakes','05 · Evitar','Erros comuns',`<ul>${d.mistakes.map(x=>`<li>${x}</li>`).join('')}</ul>`):''}${nextPanel(d)}${quizPanel(slug,d)}`;
}
function crossPanel(d){if(!d.cross?.length)return '';return panel('cross','05 · Conexões','O que analisar junto?',`<div class="cross-links">${d.cross.map(x=>`<a class="cross-link" href="#conteudo/${x[0]}"><div><strong>${title(x[0])}</strong><p>${x[1]}</p></div><span>→</span></a>`).join('')}</div>`)}
function attentionPanel(d){if(!d.attention)return '';return panel('attention','06 · Atenção','Principal ponto de atenção',`<div class="alert"><strong>Não conclua antes de verificar:</strong><p>${termize(d.attention)}</p></div>`)}

function renderSidebar(slug,d){
  const tocMap={concept:[['quick','Resumo'],['objectives','Objetivo'],['understand','Entender'],['example','Exemplo'],['roles','Responsabilidades'],['quiz','Teste']],indicator:[['quick','Resumo'],['formula','O que mede'],['when','Quando'],['how','Como analisar'],['cross','Cruzamentos'],['example','Exemplo'],['quiz','Teste']],analysis:[['quick','Resumo'],['responds','O que responde'],['before','Antes de analisar'],['how','Como analisar'],['cross','Cruzamentos'],['roles','Responsabilidades'],['example','Exemplo'],['not-conclude','O que não concluir'],['quiz','Teste']],procedure:[['quick','Resumo'],['steps','Passo a passo'],['controls','Validar'],['impact','Impacto'],['quiz','Teste']]};
  const toc=(tocMap[d.type]||[]).filter(x=>document.getElementById(x[0])||true);
  return `<div class="side-card"><span class="eyebrow">Nesta página</span><nav>${toc.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('')}</nav></div><div class="side-card"><span class="eyebrow">Uso na prática</span><p>Use esta página tanto em treinamento conduzido pela Lean quanto como material de consulta depois da implantação.</p><button class="btn ghost" type="button" data-copy-link style="margin-top:8px">Copiar link</button></div>${(d.next||[]).length?`<div class="side-card"><span class="eyebrow">Continuar</span><div class="side-links">${d.next.slice(0,4).map(s=>`<a href="#conteudo/${s}">${title(s)} →</a>`).join('')}</div></div>`:''}`;
}

function paintRole(d,role){
  const box=document.getElementById('roleContent');if(!box)return;
  const list=role==='manager'?d.manager:d.operator;
  box.innerHTML=`<h4>${role==='manager'?'O que quem analisa precisa fazer':'O que quem alimenta o processo precisa garantir'}</h4><ul>${(list||[]).map(x=>`<li>${termize(x)}</li>`).join('')}</ul>`;
  document.querySelectorAll('[data-role]').forEach(b=>b.classList.toggle('on',b.dataset.role===role));
}

function searchable(){
  const out=[];
  DATA.areas.forEach(a=>a.groups.forEach(g=>g.topics.forEach(slug=>{const d=content(slug);out.push({type:d?typeLabel(d.type):'Tema',title:title(slug),sub:a.title,href:`#conteudo/${slug}`,text:[title(slug),a.title,d?.summary,d?.quick,d?.objectives?.join(' ')].filter(Boolean).join(' ')})})));
  DATA.problems.forEach(p=>out.push({type:'Problema',title:p.title,sub:'Diagnóstico por sintoma',href:`#diagnostico/${p.id}`,text:[p.title,p.summary,...p.causes.flatMap(c=>[c[0],c[1]])].join(' ')}));
  DATA.trainings.forEach(t=>out.push({type:'Treinamento',title:t.title,sub:t.audience,href:`#treinamento/${t.id}`,text:[t.title,t.desc,t.audience].join(' ')}));
  DATA.cases.forEach(c=>out.push({type:'Caso',title:c.title,sub:'Empresa fictícia',href:`#caso/${c.id}`,text:[c.title,c.summary,c.scenario].join(' ')}));
  return out;
}
function search(q){
  const words=normalize(q).trim().split(/\s+/).filter(Boolean);
  let arr=searchable();
  if(words.length)arr=arr.map(x=>({x,score:words.reduce((s,w)=>s+(normalize(x.text).includes(w)?1:0),0)})).filter(o=>o.score>0).sort((a,b)=>b.score-a.score).map(o=>o.x);
  searchResults.innerHTML=arr.slice(0,30).map(x=>`<a class="result" href="${x.href}"><span class="result-type">${x.type}</span><strong>${x.title}</strong><small>${x.sub}</small></a>`).join('')||'<div class="result"><strong>Nenhum resultado encontrado.</strong><small>Tente descrever o problema com outras palavras.</small></div>';
}
function openSearch(q=''){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value=q;search(q);setTimeout(()=>searchInput.focus(),40)}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
function showTerm(btn){
  const g=DATA.glossary[btn.dataset.term];if(!g)return;
  termPopover.innerHTML=`<strong>${g.title}</strong><p>${g.desc}</p><a href="#conteudo/${g.link}">Entender o tema completo →</a>`;
  termPopover.classList.remove('hidden');
  const r=btn.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);let left=Math.min(r.left,window.innerWidth-w-12),top=r.bottom+8;if(top+170>window.innerHeight)top=Math.max(12,r.top-160);termPopover.style.width=w+'px';termPopover.style.left=Math.max(12,left)+'px';termPopover.style.top=top+'px';
}
function handleQuiz(btn){
  const slug=btn.dataset.quiz,d=content(slug);if(!d?.quiz)return;
  const picked=Number(btn.dataset.option),buttons=[...document.querySelectorAll(`[data-quiz="${slug}"]`)];buttons.forEach((b,i)=>{b.disabled=true;if(i===d.quiz.answer)b.classList.add('correct');else if(i===picked)b.classList.add('wrong')});
  const feedback=document.getElementById('quizFeedback');feedback.textContent=(picked===d.quiz.answer?'Correto. ':'Ainda não. ')+d.quiz.explain;
}
function route(){
  const h=location.hash||'#home';
  if(h==='#home'||h==='#areas'||h==='#diagnosticos'||h==='#rotinas'||h==='#treinamentos'){renderHome();setTimeout(()=>{if(h!=='#home')document.querySelector(h)?.scrollIntoView({block:'start'})},0)}
  else if(h.startsWith('#area/'))renderArea(h.split('/')[1]);
  else if(h.startsWith('#diagnostico/'))renderDiagnostic(h.split('/')[1]);
  else if(h.startsWith('#treinamento/'))renderTraining(h.split('/')[1]);
  else if(h.startsWith('#caso/'))renderCase(h.split('/')[1]);
  else if(h.startsWith('#conteudo/'))renderContent(h.split('/')[1]);
  else renderHome();
  closeSearch();termPopover.classList.add('hidden');window.scrollTo(0,0);
}

window.addEventListener('hashchange',route);
document.getElementById('openSearch').addEventListener('click',()=>openSearch(''));
document.getElementById('closeSearch').addEventListener('click',closeSearch);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();search(searchInput.value)});
searchInput.addEventListener('input',()=>search(searchInput.value));
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSearch();termPopover.classList.add('hidden')}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch('')}});
document.addEventListener('click',e=>{
  const jump=e.target.closest('[data-jump]');if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'})}
  const role=e.target.closest('[data-role]');if(role){const slug=(location.hash||'').split('/')[1],d=content(slug);if(d)paintRole(d,role.dataset.role)}
  const term=e.target.closest('[data-term]');if(term){e.preventDefault();e.stopPropagation();showTerm(term)}else if(!e.target.closest('#termPopover'))termPopover.classList.add('hidden');
  const quiz=e.target.closest('[data-quiz]');if(quiz)handleQuiz(quiz);
  const copy=e.target.closest('[data-copy-link]');if(copy)copyLink();
  const reveal=e.target.closest('[data-reveal]');if(reveal){const box=document.getElementById('caseReveal');box?.classList.toggle('hidden');reveal.textContent=box?.classList.contains('hidden')?'Ver análise sugerida':'Ocultar análise sugerida'}
});
route();