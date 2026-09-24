const DATA = window.ENSINO_V71;
const app = document.getElementById('app');
const overlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const termPopover = document.getElementById('termPopover');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function termize(text=''){return String(text).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g,(_,key,label)=>`${label}<button class="help" type="button" data-term="${key}" aria-label="Explicar ${label}">?</button>`)}
function lessonTitle(slug){return DATA.lessons[slug]?.title || (slug==='caixa-ruim' ? DATA.diagnostic.title : slug)}
function hrefFor(slug){return slug==='caixa-ruim' ? '#diagnostico/caixa-ruim' : `#lesson/${slug}`}
function breadcrumb(items){return `<nav class="breadcrumb" aria-label="Breadcrumb">${items.map((x,i)=>i===items.length-1?`<strong>${x[0]}</strong>`:`<a href="${x[1]}">${x[0]}</a><span>›</span>`).join('')}</nav>`}
function pageHero(ey,title,summary,crumbs,meta=''){return `<section class="page-hero"><div class="shell">${breadcrumb(crumbs)}<span class="eyebrow">${ey}</span><h1>${title}</h1><p>${termize(summary)}</p>${meta?`<div class="meta-line">${meta}</div>`:''}</div></section>`}
function section(id,ey,title,body){return `<section id="${id}" class="article-section"><span class="eyebrow">${ey}</span><h2>${title}</h2>${body}</section>`}
function toc(items){return `<nav class="toc" aria-label="Nesta página">${items.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('')}</nav>`}
function renderList(items){return `<div class="question-list">${(items||[]).map(x=>`<div class="question"><i>→</i><p>${termize(x)}</p></div>`).join('')}</div>`}
function renderFlow(items){return `<div class="teaching-flow">${(items||[]).map((x,i)=>`<div class="flow-step"><span class="n">${i+1}</span><div><strong>${termize(x[0])}</strong>${x[1]?`<p>${termize(x[1])}</p>`:''}</div></div>`).join('')}</div>`}
function renderQuick(items){return `<div class="quick-answer"><span class="eyebrow">Em 1 minuto</span><div class="quick-bullets">${(items||[]).map(x=>`<div><span>✓</span><p>${termize(x)}</p></div>`).join('')}</div></div>`}
function renderChecklist(items){return `<div class="checklist">${(items||[]).map(x=>`<div class="check-item"><span>✓</span><div>${termize(x)}</div></div>`).join('')}</div>`}
function renderCauseEffect(items){return `<div class="cause-effect">${(items||[]).map((x,i)=>`${i?'<span>→</span>':''}<b>${termize(x)}</b>`).join('')}</div>`}
function renderRelated(slugs){return `<div class="related">${(slugs||[]).map(s=>`<a href="${hrefFor(s)}"><strong>${lessonTitle(s)}</strong><span>Continuar →</span></a>`).join('')}</div>`}
function renderExample(ex){if(!ex)return'';return `<div class="example-block"><div class="example-head"><strong>${ex.title}</strong>${ex.intro?`<p>${termize(ex.intro)}</p>`:''}${ex.scenario?`<p>${termize(ex.scenario)}</p>`:''}</div><div class="example-body">${ex.rows?`<div class="mini-table">${ex.rows.map((r,i)=>`<div class="mini-row ${i===ex.rows.length-1?'em':''}"><span>${termize(r[0])}</span><span>${termize(r[1])}</span></div>`).join('')}</div>`:''}${ex.insight?`<div class="note green"><strong>Como interpretar</strong><p>${termize(ex.insight)}</p></div>`:''}</div></div>`}
function renderExercise(ex){if(!ex)return'';return `<div class="exercise" data-exercise><span class="eyebrow">Teste rápido</span><h4>${termize(ex.q)}</h4><div class="exercise-options">${ex.options.map((o,i)=>`<button type="button" data-answer="${i}">${termize(o)}</button>`).join('')}</div><div class="exercise-feedback"></div><input type="hidden" data-correct="${ex.answer}" data-feedback="${esc(ex.feedback)}"></div>`}
function renderPairTable(rows,headers=['Item','Leitura']){return `<table class="compare-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${(rows||[]).map(r=>`<tr>${r.map((c,i)=>`<td>${i===0?`<strong>${termize(c)}</strong>`:termize(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`}
function renderCross(rows){return `<div class="cross-grid">${(rows||[]).map(r=>`<a class="cross-item" href="${hrefFor(r[0])}"><div><strong>${lessonTitle(r[0])}</strong><p>${termize(r[1])}</p></div><span>→</span></a>`).join('')}</div>`}
function renderResponsibility(d){return `<div class="responsibility"><div class="resp-block"><h4>Para quem alimenta os dados</h4>${renderList(d.operator||[])}</div><div class="resp-block"><h4>Para quem analisa</h4>${renderList(d.manager||[])}</div></div>`}
function renderCompanyCase(ex){return `<div class="case-wrap"><span class="eyebrow">Caso contínuo · ${DATA.companyCase.name}</span>${renderExample(ex)}</div>`}

function renderHome(){
  app.innerHTML=`
  <section class="hero"><div class="shell"><div class="hero-inner">
    <span class="eyebrow">Ensino Lean</span>
    <h1>Entenda a gestão. Execute corretamente. <span class="accent">Analise com clareza.</span></h1>
    <p class="hero-copy">Um material de treinamento e consulta para os clientes da Lean Company. Use para aprender um conceito, executar uma rotina corretamente ou investigar um problema de gestão.</p>
    <form id="heroSearch" class="searchbar" role="search"><label class="sr-only" for="heroQ">Buscar</label><input id="heroQ" placeholder="Escreva como a dúvida aparece no dia a dia"><button class="btn primary" type="submit">Buscar</button></form>
    <div class="hero-note">Ex.: “vendi mais, mas falta dinheiro”, “onde classifico esta despesa?”, “conta de março paga em abril”.</div>
  </div></div></section>
  <section class="section"><div class="shell">
    <div class="section-head"><span class="eyebrow">Comece por aqui</span><h2>O que você precisa agora?</h2></div>
    <div class="entry-list">
      <a class="entry-row" href="#financeiro"><span class="entry-n">01</span><div><div class="entry-title">Quero aprender ou consultar um assunto</div><p>Comece pelos fundamentos financeiros e avance até DRE, Fluxo, prazos e capital de giro.</p></div><span class="entry-arrow">→</span></a>
      <a class="entry-row" href="#diagnostico/caixa-ruim"><span class="entry-n">02</span><div><div class="entry-title">Tenho um problema e não sei onde olhar</div><p>Use “Meu caixa está ruim” como roteiro para testar causas antes de escolher a ação.</p></div><span class="entry-arrow">→</span></a>
    </div>
    <div class="chain"><strong>Executar certo</strong><span>→</span><strong>Dado confiável</strong><span>→</span><strong>Analisar</strong><span>→</span><strong>Investigar</strong><span>→</span><strong>Decidir</strong></div>
  </div></section>`;
  setTimeout(()=>document.getElementById('heroSearch')?.addEventListener('submit',e=>{e.preventDefault();openSearch(document.getElementById('heroQ').value)}),0);
}

function renderFinance(){
  app.innerHTML=`${pageHero('Financeiro','Financeiro','Do registro correto à decisão: uma sequência para entender como os dados financeiros são formados, analisados e conectados ao caixa.',[['Início','#home'],['Financeiro','#financeiro']])}
  <div class="shell finance-wrap">
    <p class="finance-intro">Se você está aprendendo do início, use a ordem abaixo. Se veio consultar uma dúvida específica, abra diretamente o tema. A sequência liga <strong>conceito → rotina → relatório → indicador → diagnóstico</strong>.</p>
    <div class="case-intro"><span class="eyebrow">Exemplo recorrente</span><h3>${DATA.companyCase.name}</h3><p>${DATA.companyCase.description} Você verá a mesma empresa em DRE, Fluxo, PMR, PME, Ciclo e NCG para entender como uma decisão aparece em vários indicadores.</p></div>
    <div class="sequence">${DATA.financeSequence.map((x,i)=>`<a class="sequence-item" href="${x.diagnostic?'#diagnostico/caixa-ruim':`#lesson/${x.slug}`}"><span class="num">${String(i+1).padStart(2,'0')}</span><div><h3>${x.title}</h3><p>${x.why}</p></div><span class="status">${x.kind}</span></a>`).join('')}</div>
    <div class="finance-note"><strong>Para treinamento</strong><p>Operação financeira: priorize os três primeiros temas. Gestão: avance de DRE para Fluxo, prazos, Ciclo e NCG. O diagnóstico serve para conectar tudo quando existe uma dor real.</p></div>
  </div>`;
}

function renderConcept(slug,d){
  let body='';
  if(slug==='caixa-x-competencia'){
    body=`${toc([['resumo','Em 1 minuto'],['conceito','Conceito'],['exemplo','Exemplos'],['aplicar','Como aplicar'],['evidencia','Como validar'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
    ${section('resumo','01 · Consulta rápida','Em 1 minuto',renderQuick(d.quick))}
    ${section('conceito','02 · Conceito','Caixa e competência respondem perguntas diferentes',`<p class="lead">${termize(d.inOneSentence)}</p><div class="definition-pair">${d.definitions.map(x=>`<div class="definition"><strong>${x[0]}</strong><p>${termize(x[1])}</p></div>`).join('')}</div>`)}
    ${section('exemplo','03 · Exemplos','Veja a regra em situações diferentes',`${renderExample(d.example)}${renderPairTable(d.extraExamples,['Situação','Tratamento'])}`)}
    ${section('aplicar','04 · Aplicação','Como decidir qual data usar',`${renderFlow(d.rules)}<h4 style="margin-top:22px">Por que isso importa</h4>${renderFlow(d.whyMatters)}`)}
    ${section('evidencia','05 · Validação','Como sustentar a competência escolhida',`${renderChecklist(d.evidence)}<div class="note amber"><strong>Em dúvida material</strong><p>Não escolha a data pelo atalho mais fácil. Documente a dúvida e resolva antes de fechar o mês.</p></div>`)}
    ${section('responsabilidade','06 · Responsabilidade','Quem alimenta x quem analisa',`${renderResponsibility(d)}<h4 style="margin-top:20px">Como um erro chega à decisão</h4>${renderCauseEffect(d.errorChain)}`)}
    ${section('teste','07 · Fixação','Teste a regra',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Próximos conteúdos</h4>${renderRelated(d.next)}`)}`;
  } else {
    body=`${toc([['resumo','Em 1 minuto'],['regra','Regra central'],['exemplo','Exemplo'],['classificar','Como classificar'],['diferenca','Conta x centro'],['impacto','Impacto'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
    ${section('resumo','01 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<p class="lead">${d.inOneSentence}</p>`)}
    ${section('regra','02 · Regra central','Não classifique pelo fornecedor',`<p class="lead">${d.principle}</p><div class="note"><strong>Por quê?</strong><p>${d.why}</p></div>`)}
    ${section('exemplo','03 · Exemplo','O mesmo fornecedor pode representar naturezas diferentes',renderExample(d.example))}
    ${section('classificar','04 · Execução','Uma árvore mental para classificar',renderFlow(d.classificationTree))}
    ${section('diferenca','05 · Conceito complementar','Plano de contas não é centro de custo',`${renderPairTable(d.accountVsCenter,['Dimensão','Pergunta','Exemplos'])}<div class="note"><strong>Exemplo</strong><p>“Software” pode ser a natureza. “Administrativo” pode ser o centro de custo. As duas informações respondem perguntas diferentes.</p></div>`)}
    ${section('impacto','06 · Impacto','Como uma classificação ruim contamina a gestão',`${renderFlow(d.whyMatters)}<h4 style="margin-top:22px">Erros comuns</h4>${renderList(d.commonMistakes)}<h4 style="margin-top:22px">Do lançamento à decisão errada</h4>${renderCauseEffect(d.errorChain)}`)}
    ${section('responsabilidade','07 · Responsabilidade','Quem alimenta x quem analisa',renderResponsibility(d))}
    ${section('teste','08 · Fixação','Teste a regra',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Próximos conteúdos</h4>${renderRelated(d.next)}`)}`;
  }
  app.innerHTML=`${pageHero('Conceito',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderProcedure(slug,d){
  const body=`${toc([['resumo','Em 1 minuto'],['papel','Quem faz'],['antes','Antes'],['passo','Passo a passo'],['validar','Como validar'],['terminou','Quando terminou'],['erro','Se fizer errado'],['teste','Teste']])}
  ${section('resumo','01 · Consulta rápida','O fechamento em 1 minuto',`${renderQuick(d.quick)}<p class="lead">${d.objective}</p>`)}
  ${section('papel','02 · Responsabilidade','Quem executa, valida e usa',renderPairTable(d.roles,['Papel','Responsável']))}
  ${section('antes','03 · Preparação','Antes de começar',renderChecklist(d.before))}
  ${section('passo','04 · Procedimento','Faça nesta ordem',renderFlow(d.steps))}
  ${section('validar','05 · Validação','O que validar em cada etapa',renderPairTable(d.stageValidation,['Etapa','Critério de validação']))}
  ${section('terminou','06 · Saída esperada','Como saber que o mês está pronto?',`${renderChecklist(d.finishCriteria)}<h4 style="margin-top:22px">Sinais de que ainda NÃO terminou</h4>${renderList(d.notReady)}`)}
  ${section('erro','07 · Consequência','Quando o fechamento é superficial',`${renderCauseEffect(d.errorChain)}<div class="note red"><strong>Ponto de atenção</strong><p>O pior efeito não é um número isolado errado. É perder confiança na ferramenta de gestão e passar a discutir dado em vez de discutir a empresa.</p></div>${renderResponsibility(d)}`)}
  ${section('teste','08 · Fixação','Teste a lógica',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Depois do fechamento</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Procedimento',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderDRE(slug,d){
  const body=`${toc([['resumo','Em 1 minuto'],['responde','O que responde'],['antes','Antes'],['estrutura','Estrutura'],['como','Como analisar'],['caso','Caso'],['investigar','Investigar'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
  ${section('resumo','01 · Consulta rápida','DRE em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${d.inOneSentence}</p></div>`)}
  ${section('responde','02 · Limites','O que a DRE responde — e o que não responde sozinha',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinha</strong>${renderList(d.doesNotAnswer)}</div></div>`)}
  ${section('antes','03 · Qualidade','Antes de analisar, valide a base',`<p>Uma leitura sofisticada não corrige dado ruim.</p>${renderChecklist(d.before)}`)}
  ${section('estrutura','04 · Estrutura','Como o faturamento vira resultado',`${renderFlow(d.anatomy)}<div class="note"><strong>Leia de cima para baixo</strong><p>O resultado é consequência. Primeiro entenda como a receita foi consumida.</p></div>`)}
  ${section('como','05 · Método','Como analisar uma DRE',`${renderFlow(d.analysisSteps)}<h4 style="margin-top:22px">Com o que comparar</h4>${renderPairTable(d.compare,['Comparação','O que ajuda a enxergar'])}`)}
  ${section('caso','06 · Caso contínuo','Indústria Horizonte: crescimento sem a mesma qualidade',`${renderCompanyCase(d.caseExample)}${renderExample(d.scenario2)}`)}
  ${section('investigar','07 · Diagnóstico','Se acontecer isto, investigue aquilo',`${renderPairTable(d.investigations,['Sinal','Próxima investigação'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
  ${section('responsabilidade','08 · Responsabilidade','O relatório depende de quem alimenta e de quem interpreta',`${renderResponsibility(d)}<h4 style="margin-top:20px">Como um erro simples vira decisão errada</h4>${renderCauseEffect(d.errorChain)}`)}
  ${section('teste','09 · Fixação','Agora faça a leitura',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue estudando</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Análise gerencial',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderCashFlow(slug,d){
  const body=`${toc([['resumo','Em 1 minuto'],['responde','O que responde'],['antes','Antes'],['como','Como analisar'],['caso','Caso'],['lucro','Lucro x caixa'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
  ${section('resumo','01 · Consulta rápida','Fluxo em 1 minuto',`${renderQuick(d.quick)}<div class="note"><strong>Em uma frase</strong><p>${d.inOneSentence}</p></div>`)}
  ${section('responde','02 · Limites','O que o fluxo responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div>`)}
  ${section('antes','03 · Qualidade','Antes de analisar',renderChecklist(d.before))}
  ${section('como','04 · Método','Como analisar',renderFlow(d.analysisSteps))}
  ${section('caso','05 · Caso contínuo','Indústria Horizonte: lucro positivo, caixa pressionado',renderCompanyCase(d.caseExample))}
  ${section('lucro','06 · Conceito crítico','Por que lucro e caixa podem ser diferentes?',`${renderPairTable(d.profitVsCash,['Situação','Efeito'])}<h4 style="margin-top:22px">O que NÃO concluir</h4>${renderList(d.notConclude)}`)}
  ${section('responsabilidade','07 · Responsabilidade','Operação e gestão',renderResponsibility(d))}
  ${section('teste','08 · Fixação','Teste a leitura',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue por aqui</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Análise financeira',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderIndicator(slug,d){
  const formula=d.formula?`<div class="formula-box"><span class="eyebrow">Fórmula / lógica</span><strong>${termize(d.formula)}</strong></div>`:'';
  const body=`${toc([['resumo','Em 1 minuto'],['responde','O que responde'],['dados','Dados'],['como','Como analisar'],['interpretar','Como interpretar'],['cruzar','O que cruzar'],['caso','Caso'],['responsabilidade','Responsabilidades'],['teste','Teste']])}
  ${section('resumo','01 · Consulta rápida','Em 1 minuto',`${renderQuick(d.quick)}<p class="lead">${termize(d.inOneSentence)}</p>${formula}`)}
  ${section('responde','02 · Limites','O que este indicador responde — e o que não responde sozinho',`<div class="definition-pair"><div class="definition"><strong>Responde</strong>${renderList(d.responds)}</div><div class="definition"><strong>Não responde sozinho</strong>${renderList(d.doesNotAnswer)}</div></div><div class="note"><strong>Quando analisar</strong><p>${termize(d.when)}</p></div>`)}
  ${section('dados','03 · Qualidade','Quais dados precisam estar confiáveis',`<h4>Dados necessários</h4>${renderChecklist(d.data)}${d.quality?`<h4 style="margin-top:22px">Antes de confiar no indicador</h4>${renderChecklist(d.quality)}`:''}`)}
  ${section('como','04 · Método','Como analisar',renderFlow(d.analysis))}
  ${section('interpretar','05 · Leitura','Como interpretar comportamentos diferentes',renderPairTable(d.interpretation,['Sinal','O que pode significar']))}
  ${section('cruzar','06 · Conexões','Quais indicadores analisar junto',renderCross(d.cross))}
  ${section('caso','07 · Caso contínuo',`${DATA.companyCase.name}: o mesmo problema visto por outro ângulo`,renderCompanyCase(d.caseExample))}
  ${section('responsabilidade','08 · Responsabilidade','Quem garante o dado e quem toma decisão',renderResponsibility(d))}
  ${section('teste','09 · Fixação','Teste a leitura',`${renderExercise(d.exercise)}<h4 style="margin-top:24px">Continue por aqui</h4>${renderRelated(d.next)}`)}`;
  app.innerHTML=`${pageHero('Indicador',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,hrefFor(slug)]],`<span>${d.time}</span><span>${d.audience}</span>`)}<div class="shell article-shell">${body}</div>`;
}

function renderDiagnostic(){
  const d=DATA.diagnostic;
  app.innerHTML=`${pageHero('Diagnóstico',d.title,d.summary,[['Início','#home'],['Financeiro','#financeiro'],[d.title,'#diagnostico/caixa-ruim']])}
  <div class="shell article-shell">
    ${toc([['principio','Princípio'],['caso','Caso'],['investigar','Investigar'],['concluir','Concluir']])}
    ${section('principio','01 · Comece certo','Caixa ruim é um sintoma, não uma causa',`<p class="diagnostic-intro">${d.intro}</p><div class="note amber"><strong>Não comece pela solução</strong><p>Empréstimo, corte de despesas ou cobrança podem ser corretos — mas somente depois de identificar qual mecanismo explica a pressão.</p></div>`)}
    ${section('caso','02 · Exemplo','O mesmo sintoma pode esconder mecanismos diferentes',`<div class="case-intro"><span class="eyebrow">${DATA.companyCase.name}</span><p>${d.caseIntro}</p></div>`)}
    <section id="investigar" class="article-section"><span class="eyebrow">03 · Investigação</span><h2>Teste cada hipótese e procure evidência</h2>${d.branches.map(b=>`<div class="diagnostic-branch"><div class="q">${b.q}</div><p>${termize(b.why)}</p><div class="diagnostic-evidence"><div><strong>O que verificar</strong><p>${termize(b.verify)}</p></div><div><strong>Evidências que fortalecem a hipótese</strong>${renderList(b.supports)}</div><div><strong>Evidências que enfraquecem a hipótese</strong>${renderList(b.weakens)}</div></div><div class="diagnostic-links">${b.links.map(x=>`<a href="#lesson/${x[0]}">${x[1]} →</a>`).join('')}</div></div>`).join('')}</section>
    ${section('concluir','04 · Conclusão','Transforme o sintoma em uma causa acompanhável',`<p class="lead">${termize(d.finish)}</p><div class="note green"><strong>A saída de uma boa análise</strong><p>Defina: causa mais provável, ação, responsável, indicador que acompanhará a melhora e prazo para reavaliar.</p></div>`)}
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
  if(h==='#financeiro')renderFinance();
  else if(h.startsWith('#lesson/'))renderLesson(h.split('/')[1]);
  else if(h==='#diagnostico/caixa-ruim')renderDiagnostic();
  else renderHome();
  window.scrollTo(0,0);app.focus({preventScroll:true});
}

function normalize(s=''){return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function searchIndex(){
  const items=[];
  Object.entries(DATA.lessons).forEach(([slug,d])=>{
    items.push({title:d.title,sub:d.type==='procedure'?'Procedimento':d.type==='indicator'?'Indicador':d.type==='analysis'?'Análise':'Conceito',href:`#lesson/${slug}`,text:[d.title,d.summary,JSON.stringify(d)].join(' ')});
  });
  items.push({title:DATA.diagnostic.title,sub:'Diagnóstico',href:'#diagnostico/caixa-ruim',text:JSON.stringify(DATA.diagnostic)+' caixa negativo sem dinheiro lucro falta caixa estoque prazo crescimento investimento'});
  items.push({title:'Financeiro',sub:'Área',href:'#financeiro',text:'financeiro fundamentos resultado caixa competencia plano de contas fechamento dre fluxo pmr pmp pme ciclo ncg'});
  return items;
}
function aliasBoost(q,item){
  const nq=normalize(q);let boost=0;
  DATA.searchAliases.forEach(a=>{
    if(a.terms.some(t=>nq.includes(normalize(t))) && item.href===a.target)boost+=20;
  });
  return boost;
}
function doSearch(q){
  const words=normalize(q).trim().split(/\s+/).filter(Boolean);
  let items=searchIndex();
  if(words.length){
    items=items.map(x=>{const t=normalize(x.text);const score=words.reduce((s,w)=>s+(t.includes(w)?1:0),0)+aliasBoost(q,x);return{x,score}}).filter(o=>o.score>0).sort((a,b)=>b.score-a.score).map(o=>o.x);
  }
  searchResults.innerHTML=items.slice(0,20).map(x=>`<a class="result" href="${x.href}"><div><strong>${x.title}</strong><small>${x.sub}</small></div><span>Abrir →</span></a>`).join('')||`<div class="result"><div><strong>Nenhum resultado.</strong><small>Tente escrever a dúvida de outra forma.</small></div></div>`;
}
function openSearch(q=''){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');searchInput.value=q;doSearch(q);setTimeout(()=>searchInput.focus(),40)}
function closeSearch(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
function showTerm(btn){
  const g=DATA.glossary[btn.dataset.term];if(!g)return;
  termPopover.innerHTML=`<strong>${g.title}</strong><p>${g.desc}</p>${g.link?`<a href="#lesson/${g.link}">Entender o tema completo →</a>`:''}`;
  termPopover.classList.remove('hidden');
  const r=btn.getBoundingClientRect(),w=Math.min(320,window.innerWidth-24);let left=Math.min(r.left,window.innerWidth-w-12),top=r.bottom+8;if(top+190>window.innerHeight)top=Math.max(12,r.top-180);termPopover.style.width=w+'px';termPopover.style.left=Math.max(12,left)+'px';termPopover.style.top=top+'px';
}
function toggleMobileNav(){const open=mobileNav.classList.toggle('open');mobileMenuBtn.setAttribute('aria-expanded',String(open))}
function closeMobileNav(){mobileNav.classList.remove('open');mobileMenuBtn?.setAttribute('aria-expanded','false')}

window.addEventListener('hashchange',()=>{closeSearch();termPopover.classList.add('hidden');route()});
document.getElementById('openSearch').addEventListener('click',()=>openSearch(''));
document.getElementById('closeSearch').addEventListener('click',closeSearch);
document.getElementById('searchForm').addEventListener('submit',e=>{e.preventDefault();doSearch(searchInput.value)});
searchInput.addEventListener('input',e=>doSearch(e.target.value));
overlay.addEventListener('click',e=>{if(e.target===overlay)closeSearch()});
mobileMenuBtn?.addEventListener('click',toggleMobileNav);

document.addEventListener('click',e=>{
  const jump=e.target.closest('[data-jump]');if(jump){e.preventDefault();document.getElementById(jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'});return}
  const term=e.target.closest('[data-term]');if(term){e.preventDefault();e.stopPropagation();showTerm(term);return}
  if(!e.target.closest('#termPopover'))termPopover.classList.add('hidden');
  const answer=e.target.closest('[data-answer]');if(answer){const ex=answer.closest('[data-exercise]');if(ex.dataset.done==='1')return;const correct=Number(ex.querySelector('[data-correct]').dataset.correct);const feedback=ex.querySelector('[data-correct]').dataset.feedback;const picked=Number(answer.dataset.answer);ex.dataset.done='1';ex.querySelectorAll('[data-answer]').forEach((b,i)=>{if(i===correct)b.classList.add('correct');else if(i===picked)b.classList.add('wrong')});ex.querySelector('.exercise-feedback').textContent=(picked===correct?'Correto. ':'Revise o raciocínio. ')+feedback;}
});

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSearch();closeMobileNav();termPopover.classList.add('hidden')}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openSearch('')}});
route();