const DATA = window.ENSINO_V7;
const app = document.getElementById('app');
const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const termPopover = document.getElementById('termPopover');

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function termize(text=''){
  return text.replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>`${label}<button class="help" type="button" data-term="${key}" aria-label="Explicar ${label}">?</button>`);
}
function lessonTitle(slug){return DATA.lessons[slug]?.title || (slug==='caixa-ruim' ? DATA.diagnostic.title : slug)}
function hrefFor(slug){return slug==='caixa-ruim' ? '#diagnostico/caixa-ruim' : `#lesson/${slug}`}
function breadcrumb(items){return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((x,i)=>i===items.length-1?`<strong>${x[0]}</strong>`:`<a href="${x[1]}">${x[0]}</a><span>›</span>`).join('')}</nav>`}
function pageHero(ey,title,summary,crumbs,meta=''){return `<section class="page-hero"><div class="shell">${breadcrumb(crumbs)}<span class="eyebrow">${ey}</span><h1>${title}</h1><p>${summary}</p>${meta?`<div class="meta-line">${meta}</div>`:''}</div></section>`}
function section(id,ey,title,body){return `<section id="${id}" class="article-section"><span class="eyebrow">${ey}</span><h2>${title}</h2>${body}</section>`}
function renderExample(ex){return `<div class="example-block"><div class="example-head"><strong>${ex.title}</strong>${ex.intro?`<p>${ex.intro}</p>`:''}${ex.scenario?`<p>${ex.scenario}</p>`:''}</div><div class="example-body">${ex.rows?`<div class="mini-table">${ex.rows.map((r,i)=>`<div class="mini-row ${i===ex.rows.length-1?'em':''}"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}</div>`:''}${ex.insight?`<div class="note green"><strong>Como interpretar</strong><p>${termize(ex.insight)}</p></div>`:''}</div></div>`}
function renderExercise(ex){return `<div class="exercise" data-exercise><span class="eyebrow">Teste rápido</span><h4>${ex.q}</h4><div class="exercise-options">${ex.options.map((o,i)=>`<button type="button" data-answer="${i}">${o}</button>`).join('')}</div><div class="exercise-feedback"></div><input type="hidden" data-correct="${ex.answer}" data-feedback="${esc(ex.feedback)}"></div>`}
function renderFlow(items){return `<div class="teaching-flow">${items.map((x,i)=>`<div class="flow-step"><span class="n">${i+1}</span><div><strong>${termize(x[0])}</strong>${x[1]?`<p>${termize(x[1])}</p>`:''}</div></div>`).join('')}</div>`}
function renderList(items){return `<div class="question-list">${items.map(x=>`<div class="question"><i>→</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderRelated(slugs){return `<div class="related">${slugs.map(s=>`<a href="${hrefFor(s)}"><strong>${lessonTitle(s)}</strong><span>Continuar →</span></a>`).join('')}</div>`}
function renderCauseEffect(items){return `<div class="cause-effect">${items.map((x,i)=>`${i?'<span>→</span>':''}<b>${termize(x)}</b>`).join('')}</div>`}
function toc(items){return `<nav class="toc" aria-label="Nesta página">${items.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('')}</nav>`}

function renderHome(){
  app.innerHTML=`
  <section class="hero"><div class="shell"><div class="hero-inner">
    <span class="eyebrow">Ensino Lean</span>
    <h1>Entenda a gestão. Execute corretamente. <span class="accent">Analise com clareza.</span></h1>
    <p class="hero-copy">Um material de treinamento e consulta para os clientes da Lean Company. Aprenda o conceito, entenda como alimentar a informação corretamente e saiba como usar o dado para analisar a empresa.</p>
    <form id="heroSearch" class="searchbar" role="search"><label class="sr-only" for="heroQ">Buscar</label><input id="heroQ" placeholder="O que você quer entender? Ex.: conta de março paga em abril"><button class="btn primary" type="submit">Buscar</button></form>
    <div class="hero-note">Não precisa saber o nome técnico. Escreva a dúvida como ela aparece no dia a dia.</div>
  </div></div></section>

  <section class="section"><div class="shell">
    <div class="section-head"><span class="eyebrow">Comece por aqui</span><h2>O que você precisa agora?</h2></div>
    <div class="entry-list">
      <a class="entry-row" href="#financeiro"><span class="entry-n">01</span><div><div class="entry-title">Quero aprender um assunto</div><p>Comece pelos fundamentos financeiros e avance até análise de DRE e Fluxo de Caixa.</p></div><span class="entry-arrow">→</span></a>
      <a class="entry-row" href="#diagnostico/caixa-ruim"><span class="entry-n">02</span><div><div class="entry-title">Tenho um problema e não sei onde olhar</div><p>Use o roteiro “Meu caixa está ruim” para testar hipóteses antes de agir.</p></div><span class="entry-arrow">→</span></a>
    </div>
    <div class="chain"><strong>Executar certo</strong><span>→</span><strong>Dado confiável</strong><span>→</span><strong>Analisar</strong><span>→</span><strong>Decidir</strong></div>
  </div></section>`;
  setTimeout(()=>document.getElementById('heroSearch')?.addEventListener('submit',e=>{e.preventDefault();openSearch(document.getElementById('heroQ').value)}),0);
}

function renderFinance(){
  app.innerHTML=`${pageHero('Financeiro','Financeiro','Uma sequência curta para construir a base antes de analisar resultado e caixa.',[['Início','#home'],['Financeiro','#financeiro']])}
  <div class="shell finance-wrap">
    <p class="finance-intro">Não recomendamos começar pela DRE sem entender como os dados chegam até ela. A sequência abaixo liga <strong>conceito → rotina → relatório → análise</strong>.</p>
    <div class="sequence">${DATA.financeSequence.map((x,i)=>`<a class="sequence-item" href="${x.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${x.slug}`}"><span class="num">${String(i+1).padStart(2,'0')}</span><div><h3>${x.title}</h3><p>${x.why}</p></div><span class="status">${x.kind}</span></a>`).join('')}</div>
    <div class="finance-note"><strong>Como usar esta sequência</strong><p>Para treinamento de um novo colaborador do financeiro, comece pelos três primeiros conteúdos. Para gestão, avance até DRE e Fluxo de Caixa. Quando houver uma dor específica, use o diagnóstico.</p></div>
  </div>`;
}

function renderConcept(slug,d){
  const isPlano = slug==='plano-de-contas';
  let body='';
  if(slug==='caixa-x-competencia'){
    body = `${toc([['resumo','Em 30 segundos'],['exemplo','Exemplo'],['por-que','Por que importa'],['aplicar','Como aplicar'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
      ${section('resumo','01 · Entenda primeiro','Em 30 segundos',`<div class="quick-answer"><span class="eyebrow">Resumo</span><h3>${termize(d.inOneSentence)}</h3></div><div class="definition-pair">${d.definitions.map(x=>`<div class="definition"><strong>${x[0]}</strong><p>${termize(x[1])}</p></div>`).join('')}</div>`)}
      ${section('exemplo','02 · Exemplo','Veja a diferença acontecendo',renderExample(d.example))}
      ${section('por-que','03 · Impacto','Por que isso importa?',`<p class="lead">Uma data errada não é apenas um detalhe operacional. Ela pode criar uma tendência que não existe.</p>${renderFlow(d.whyMatters)}`)}
      ${section('aplicar','04 · Aplicação','Como decidir qual data usar',`${renderFlow(d.rules)}<div class="note amber"><strong>Regra prática</strong><p>Primeiro pergunte quando o fato econômico aconteceu. Depois registre quando o dinheiro entrou ou saiu.</p></div>`)}
      ${section('responsabilidade','05 · Responsabilidade','Operação e gestão enxergam partes diferentes',`<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta os dados</h4>${renderList(d.operator)}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager)}</div></div><h4 style="margin-top:20px">Como um erro chega até a decisão</h4>${renderCauseEffect(d.errorChain)}`)}
      ${section('teste','06 · Fixação','Você entendeu?',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue por aqui</h4>${renderRelated(d.next)}`)}`;
  } else if(isPlano){
    body = `${toc([['resumo','O conceito'],['regra','Regra central'],['exemplo','Exemplo'],['como','Como classificar'],['impacto','Impacto'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
      ${section('resumo','01 · Conceito','O que é plano de contas?',`<div class="quick-answer"><span class="eyebrow">Em uma frase</span><h3>${d.inOneSentence}</h3><p>${d.why}</p></div>`)}
      ${section('regra','02 · Regra central','Não classifique pelo fornecedor',`<p class="lead">${d.principle}</p><div class="note"><strong>Por quê?</strong><p>O fornecedor responde “de quem comprei?”. A conta responde “o que a empresa consumiu?”. Para gestão, a segunda pergunta é a que importa.</p></div>`)}
      ${section('exemplo','03 · Exemplo','O mesmo fornecedor, três naturezas diferentes',renderExample(d.example))}
      ${section('como','04 · Execução','Como classificar corretamente',renderFlow(d.steps))}
      ${section('impacto','05 · Impacto','Onde uma classificação errada aparece?',`${renderFlow(d.whyMatters)}<h4 style="margin-top:20px">Erros comuns</h4>${renderList(d.commonMistakes)}<h4 style="margin-top:20px">Como o erro chega à decisão</h4>${renderCauseEffect(d.errorChain)}`)}
      ${section('responsabilidade','06 · Responsabilidade','Quem alimenta x quem analisa',`<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta os dados</h4>${renderList(d.operator)}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager)}</div></div>`)}
      ${section('teste','07 · Fixação','Teste a regra',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Próximos conteúdos</h4>${renderRelated(d.next)}`)}`;
  }
  app.innerHTML = `${pageHero('Conceito',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderProcedure(slug,d){
  const body=`${toc([['objetivo','Objetivo'],['antes','Antes de começar'],['passo','Passo a passo'],['validar','Como saber que terminou'],['erro','Se fizer errado'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
    ${section('objetivo','01 · Objetivo','O que o fechamento precisa entregar?',`<p class="lead">${d.objective}</p><div class="note"><strong>Resultado esperado</strong><p>Ao final, o mês precisa estar estável o suficiente para que uma análise gerencial não mude por causa de erros básicos de cadastro, baixa, competência ou classificação.</p></div>`)}
    ${section('antes','02 · Preparação','Antes de começar',`<div class="checklist">${d.before.map(x=>`<div class="check-item"><span>✓</span><div>${termize(x)}</div></div>`).join('')}</div>`)}
    ${section('passo','03 · Procedimento','Faça nesta ordem',renderFlow(d.steps))}
    ${section('validar','04 · Validação','Como saber que o mês está pronto?',`<div class="checklist">${d.finishCriteria.map(x=>`<div class="check-item"><span>✓</span><div>${termize(x)}</div></div>`).join('')}</div><h4 style="margin-top:22px">Sinais de que o fechamento ainda NÃO está pronto</h4>${renderList(d.notReady)}`)}
    ${section('erro','05 · Consequência','O que acontece quando o fechamento é superficial?',`${renderCauseEffect(d.errorChain)}<div class="note red"><strong>Ponto de atenção</strong><p>O pior efeito de um fechamento ruim não é o número errado. É a perda de confiança da equipe na própria ferramenta de gestão.</p></div>`)}
    ${section('responsabilidade','06 · Responsabilidade','Quem executa e quem valida',`<div class="responsibility"><div class="resp-block"><h4>Para quem executa o fechamento</h4>${renderList(d.operator)}</div><div class="resp-block"><h4>Para quem vai analisar</h4>${renderList(d.manager)}</div></div>`)}
    ${section('teste','07 · Fixação','Teste a lógica',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Depois do fechamento</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Procedimento',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderAnalysis(slug,d){
  if(slug==='dre-gerencial') return renderDRE(slug,d);
  if(slug==='fluxo-de-caixa') return renderCashFlow(slug,d);
}

function renderDRE(slug,d){
  const body=`${toc([['resumo','Em uma frase'],['responde','O que responde'],['antes','Antes de analisar'],['estrutura','Estrutura'],['como','Como analisar'],['exemplos','Exemplos'],['investigar','O que investigar'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
    ${section('resumo','01 · Entenda primeiro','Em uma frase',`<div class="quick-answer"><span class="eyebrow">DRE Gerencial</span><h3>${d.inOneSentence}</h3><p>Ela não serve apenas para mostrar lucro. Serve para explicar <strong style="color:#fff">como</strong> o resultado foi formado.</p></div>`)}
    ${section('responde','02 · Perguntas','O que a DRE precisa responder?',`<p class="lead">Se a DRE não ajuda a responder perguntas como estas, ela está sendo usada apenas como relatório — não como ferramenta de gestão.</p>${renderList(d.responds)}`)}
    ${section('antes','03 · Qualidade','Antes de analisar, valide a base',`<p>Uma análise sofisticada em cima de dado ruim continua sendo uma análise ruim.</p><div class="checklist">${d.before.map(x=>`<div class="check-item"><span>✓</span><div>${termize(x)}</div></div>`).join('')}</div>`)}
    ${section('estrutura','04 · Estrutura','Como o faturamento vira resultado',`<div class="teaching-flow">${d.anatomy.map((x,i)=>`<div class="flow-step"><span class="n">${i+1}</span><div><strong>${termize(x[0])}</strong><p>${termize(x[1])}</p></div></div>`).join('')}</div><div class="note"><strong>Leia de cima para baixo</strong><p>Cada linha explica como parte da receita foi consumida. O resultado final só faz sentido depois de entender o caminho.</p></div>`)}
    ${section('como','05 · Método','Como analisar uma DRE',`${renderFlow(d.analysisSteps)}<h4 style="margin-top:22px">Com o que comparar</h4><table class="compare-table"><thead><tr><th>Comparação</th><th>O que ela ajuda a enxergar</th></tr></thead><tbody>${d.compare.map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td></tr>`).join('')}</tbody></table>`)}
    ${section('exemplos','06 · Exemplos','Dois exemplos de leitura que evitam conclusões rasas',`${renderExample(d.scenario1)}${renderExample(d.scenario2)}`)}
    ${section('investigar','07 · Diagnóstico','Se acontecer isto, investigue aquilo',`<table class="compare-table"><thead><tr><th>Sinal</th><th>Próxima investigação</th></tr></thead><tbody>${d.investigations.map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${termize(x[1])}</td></tr>`).join('')}</tbody></table><h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
    ${section('responsabilidade','08 · Responsabilidade','O relatório depende de quem alimenta e de quem interpreta',`<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta os dados</h4>${renderList(d.operator)}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager)}</div></div><h4 style="margin-top:20px">Como um erro simples vira decisão errada</h4>${renderCauseEffect(d.errorChain)}`)}
    ${section('teste','09 · Fixação','Agora faça a leitura',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue estudando</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Análise gerencial',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderCashFlow(slug,d){
  const body=`${toc([['resumo','Em uma frase'],['responde','O que responde'],['antes','Antes de analisar'],['como','Como analisar'],['exemplo','Exemplo'],['lucro','Lucro x caixa'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
    ${section('resumo','01 · Entenda primeiro','Em uma frase',`<div class="quick-answer"><span class="eyebrow">Fluxo de Caixa</span><h3>${d.inOneSentence}</h3><p>O fluxo existe para enxergar <strong style="color:#fff">quando</strong> o dinheiro entra e sai — inclusive antes de acontecer.</p></div>`)}
    ${section('responde','02 · Perguntas','O que o fluxo precisa responder?',renderList(d.responds))}
    ${section('antes','03 · Qualidade','Antes de analisar',`<div class="checklist">${d.before.map(x=>`<div class="check-item"><span>✓</span><div>${termize(x)}</div></div>`).join('')}</div>`)}
    ${section('como','04 · Método','Como analisar',renderFlow(d.analysisSteps))}
    ${section('exemplo','05 · Exemplo','Antecipe o problema antes de faltar dinheiro',renderExample(d.example))}
    ${section('lucro','06 · Conceito crítico','Por que lucro e caixa podem ser diferentes?',`<table class="compare-table"><thead><tr><th>Situação</th><th>Efeito</th></tr></thead><tbody>${d.profitVsCash.map(x=>`<tr><td><strong>${x[0]}</strong></td><td>${x[1]}</td></tr>`).join('')}</tbody></table><h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
    ${section('responsabilidade','07 · Responsabilidade','Operação e gestão',`<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta os dados</h4>${renderList(d.operator)}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager)}</div></div>`)}
    ${section('teste','08 · Fixação','Teste a leitura',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue por aqui</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Análise financeira',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderDiagnostic(){
  const d=DATA.diagnostic;
  app.innerHTML=`${pageHero('Diagnóstico',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,'#diagnostico/caixa-ruim']])}
    <div class="shell article-shell">
      ${toc([['principio','Princípio'],['investigar','Como investigar'],['concluir','Como concluir']])}
      ${section('principio','01 · Comece certo','Caixa ruim é um sintoma, não uma causa',`<p class="diagnostic-intro">${d.intro}</p><div class="note amber"><strong>Evite começar pela solução</strong><p>“Cortar despesas” ou “pegar empréstimo” pode aliviar o caixa sem resolver o mecanismo que criou o problema.</p></div>`)}
      <section id="investigar" class="article-section"><span class="eyebrow">02 · Investigação</span><h2>Teste as hipóteses nesta ordem</h2>${d.branches.map(b=>`<div class="diagnostic-branch"><div class="q">${b.q}</div><p>${termize(b.why)}</p><div class="note"><strong>O que olhar</strong><p>${termize(b.look)}</p></div><div class="diagnostic-links">${b.links.map(x=>`<a href="#lesson/${x[0]}">${x[1]} →</a>`).join('')}</div></div>`).join('')}</section>
      ${section('concluir','03 · Conclusão','A ação depende da causa encontrada',`<p class="lead">${termize(d.finish)}</p><div class="note green"><strong>Boa análise</strong><p>Uma boa conclusão reduz o problema de “meu caixa está ruim” para uma causa específica que pode ser acompanhada e tratada.</p></div>`)}
    </div>`;
}

function renderLesson(slug){
  const d=DATA.lessons[slug];
  if(!d){renderHome();return}
  if(d.type==='concept')renderConcept(slug,d);
  else if(d.type==='procedure')renderProcedure(slug,d);
  else renderAnalysis(slug,d);
}

function route(){
  const h=location.hash||'#home';
  if(h==='#financeiro') renderFinance();
  else if(h.startsWith('#lesson/')) renderLesson(h.split('/')[1]);
  else if(h==='#diagnostico/caixa-ruim') renderDiagnostic();
  else renderHome();
  window.scrollTo(0,0);
  app.focus({preventScroll:true});
}

function normalize(s=''){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function searchIndex(){
  const items=[];
  Object.entries(DATA.lessons).forEach(([slug,d])=>{
    const raw=[d.title,d.summary,d.inOneSentence,d.why,d.objective,JSON.stringify(d)].filter(Boolean).join(' ');
    items.push({title:d.title,sub:d.type==='procedure'?'Procedimento':d.type==='analysis'?'Análise':'Conceito',href:`#lesson/${slug}`,text:raw});
  });
  items.push({title:DATA.diagnostic.title,sub:'Diagnóstico',href:'#diagnostico/caixa-ruim',text:JSON.stringify(DATA.diagnostic)+' caixa negativo sem dinheiro lucro falta caixa estoque prazo crescimento investimento'});
  items.push({title:'Financeiro',sub:'Área',href:'#financeiro',text:'financeiro fundamentos resultado caixa competência plano de contas fechamento dre fluxo'});
  return items;
}
function doSearch(q){
  const words=normalize(q).trim().split(/\s+/).filter(Boolean);
  let items=searchIndex();
  if(words.length){
    items=items.map(x=>{const t=normalize(x.text);const score=words.reduce((s,w)=>s+(t.includes(w)?1:0),0);return {x,score}}).filter(o=>o.score>0).sort((a,b)=>b.score-a.score).map(o=>o.x);
  }
  searchResults.innerHTML=items.slice(0,20).map(x=>`<a class="result" href="${x.href}"><div><strong>${x.title}</strong><small>${x.sub}</small></div><span>Abrir →</span></a>`).join('') || `<div class="result"><div><strong>Nenhum resultado.</strong><small>Tente escrever a dúvida de outra forma.</small></div></div>`;
}
function openSearch(q=''){
  overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value=q;doSearch(q);setTimeout(()=>searchInput.focus(),40);
}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}

function showTerm(btn){
  const g=DATA.glossary[btn.dataset.term];if(!g)return;
  termPopover.innerHTML=`<strong>${g.title}</strong><p>${g.desc}</p>${g.link?`<a href="#lesson/${g.link}">Entender o tema completo →</a>`:''}`;
  termPopover.classList.remove('hidden');
  const r=btn.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);
  let left=Math.min(r.left,window.innerWidth-w-12), top=r.bottom+8;
  if(top+170>window.innerHeight)top=Math.max(12,r.top-160);
  termPopover.style.width=w+'px';termPopover.style.left=Math.max(12,left)+'px';termPopover.style.top=top+'px';
}

window.addEventListener('hashchange',()=>{closeSearch();termPopover.classList.add('hidden');route()});
document.getElementById('openSearch').addEventListener('click',()=>openSearch(''));
document.getElementById('closeSearch').addEventListener('click',closeSearch);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();doSearch(searchInput.value)});
searchInput.addEventListener('input',e=>doSearch(e.target.value));
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});

document.addEventListener('click',e=>{
  const jump=e.target.closest('[data-jump]');
  if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'});return}
  const term=e.target.closest('[data-term]');
  if(term){e.preventDefault();e.stopPropagation();showTerm(term);return}
  if(!e.target.closest('#termPopover'))termPopover.classList.add('hidden');

  const answer=e.target.closest('[data-answer]');
  if(answer){
    const ex=answer.closest('[data-exercise]');
    if(ex.dataset.done==='1')return;
    const correct=Number(ex.querySelector('[data-correct]').dataset.correct);
    const feedback=ex.querySelector('[data-correct]').dataset.feedback;
    const picked=Number(answer.dataset.answer);
    ex.dataset.done='1';
    ex.querySelectorAll('[data-answer]').forEach((b,i)=>{if(i===correct)b.classList.add('correct');else if(i===picked)b.classList.add('wrong')});
    ex.querySelector('.exercise-feedback').textContent=(picked===correct?'Correto. ':'Revise o raciocínio. ')+feedback;
  }
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){closeSearch();termPopover.classList.add('hidden')}
  if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch('')}
});

route();