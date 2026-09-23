(() => {
  'use strict';
  const DATA = window.LEAN_DATA || {};
  const AREAS = DATA.areas || [];
  const TRACKS = DATA.tracks || [];
  const PROBLEMS = DATA.problems || [];
  const GLOSSARY = DATA.glossary || {};
  const LESSONS = DATA.lessons || {};

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
  const state = { audience:'todos', publishedOnly:false, activeRole:'gestor' };

  const SPECIAL_TITLES = {
    'ncg':'Necessidade de Capital de Giro (NCG)','pmr':'Prazo Médio de Recebimento (PMR)','pmp':'Prazo Médio de Pagamento (PMP)','pme':'Prazo Médio de Estoque (PME)',
    'cmv-cpv-csp':'CMV / CPV / CSP','ebitda':'EBITDA','fundamentos-do-pcp':'Fundamentos do PCP','oee':'OEE','wip':'WIP — Estoque em Processo','vsm':'VSM — Mapeamento do Fluxo de Valor',
    '5s':'5S','kaizen':'Kaizen','sipoc':'SIPOC','pop':'POP — Procedimento Operacional Padrão','raci':'RACI','sla':'SLA','pdca':'PDCA','5w2h':'5W2H','a3':'A3','ishikawa':'Diagrama de Ishikawa','5-porques':'5 Porquês',
    'leading-x-lagging':'Leading x Lagging Indicators','cac':'CAC','ltv':'LTV','power-query':'Power Query','power-bi':'Power BI','procx-procv':'PROCX / PROCV','somases':'SOMASES','erp':'ERP','odbc':'ODBC','sql':'SQL','apis':'APIs','google-sheets':'Google Sheets','ia-aplicada-a-gestao':'IA aplicada à Gestão'
  };

  const MANAGER_ONLY = new Set(['endividamento','rentabilidade','lucratividade','ebitda','orcamento-empresarial','orcado-x-realizado','forecast-financeiro','formacao-de-caixa','metas-comerciais','forecast-de-vendas','cac','ltv','reuniao-executiva','tomada-de-decisao']);
  const OP_ONLY = new Set(['contas-a-pagar','contas-a-receber','conciliacao-bancaria','fechamento-financeiro','ordem-de-producao','sequenciamento','setup','inventario','acuracidade','entradas-de-estoque','saidas-de-estoque','transferencias','cadastro-de-dados','odbc','sql','apis']);

  function safeStorageGet(key, fallback=null){ try { const v = localStorage.getItem(key); return v === null ? fallback : v; } catch { return fallback; } }
  function safeStorageSet(key, value){ try { localStorage.setItem(key, value); } catch {} }
  function completedSet(){ try { return new Set(JSON.parse(safeStorageGet('leanEnsinoCompleted','[]'))); } catch { return new Set(); } }
  function saveCompleted(set){ safeStorageSet('leanEnsinoCompleted', JSON.stringify([...set])); }

  function titleFromSlug(slug){
    if(LESSONS[slug]) return LESSONS[slug].title;
    if(SPECIAL_TITLES[slug]) return SPECIAL_TITLES[slug];
    return slug.split('-').map(w => w ? w[0].toUpperCase()+w.slice(1) : w).join(' ').replace('Pcp','PCP').replace('Kpi','KPI').replace(' X ',' x ');
  }
  function areaById(id){ return AREAS.find(a => a.id === id); }
  function areaByTopic(slug){ return AREAS.find(a => a.topics.includes(slug)); }
  function audiencesFor(slug){
    if(LESSONS[slug]?.audiences) return LESSONS[slug].audiences;
    if(MANAGER_ONLY.has(slug)) return ['gestor'];
    if(OP_ONLY.has(slug)) return ['operacional'];
    return ['gestor','operacional'];
  }
  function isPublished(slug){ return !!LESSONS[slug]; }
  function norm(s=''){ return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
  function tokens(s=''){ return norm(s).split(/[^a-z0-9]+/).filter(t => t.length > 2); }

  function annotate(text=''){
    return String(text).replace(/\{\{([^|}]+)\|([^}]+)\}\}/g, (_, term, label) => {
      const item = GLOSSARY[term];
      if(!item) return label;
      return `${label}<button class="help" type="button" data-term="${term}" aria-label="Explicar ${label}">?<span class="help-pop"><strong>${item.label}</strong>${item.definition}</span></button>`;
    });
  }

  function renderHome(){
    const totalTopics = AREAS.reduce((n,a)=>n+a.topics.length,0);
    $('#statTopics').textContent = totalTopics;
    $('#statPublished').textContent = Object.keys(LESSONS).length;

    $('#problemCards').innerHTML = PROBLEMS.map((p,i)=>`
      <button class="problem-card" type="button" data-problem="${i}">
        <span class="problem-icon">${p.icon}</span>
        <h3>${p.title}</h3><p>${p.desc}</p>
        <span class="problem-lessons">${p.lessons.map(s=>`<span class="mini-pill">${titleFromSlug(s)}</span>`).join('')}</span>
      </button>`).join('');

    $('#areaCards').innerHTML = AREAS.map((a,i)=>`
      <a class="area-card" href="#catalog/${a.id}">
        <span class="area-number">${String(i+1).padStart(2,'0')}</span>
        <h3>${a.title}</h3><p>${a.desc}</p>
        <footer><span>${a.topics.length} temas</span><span>explorar →</span></footer>
      </a>`).join('');

    const completed = completedSet();
    $('#trackCards').innerHTML = TRACKS.map(t=>{
      const published = t.sequence.filter(isPublished);
      const done = published.filter(x=>completed.has(x)).length;
      const pct = published.length ? Math.round(done/published.length*100) : 0;
      const first = t.sequence.find(isPublished) || t.sequence[0];
      return `<a class="track-card" href="#lesson/${first}">
        <span class="tag ${t.audience==='operacional'?'gray':''}">${t.audience==='gestor'?'Gestor':'Operacional'}</span>
        <h3>${t.title}</h3><p>${t.desc}</p>
        <div class="track-progress" aria-label="${pct}% dos conteúdos publicados concluídos"><span style="width:${pct}%"></span></div>
        <div class="track-footer"><span>${done}/${published.length || 0} publicados concluídos</span><span>${pct}%</span></div>
      </a>`;
    }).join('');

    renderContinueCard();
  }

  function renderContinueCard(){
    const last = safeStorageGet('leanEnsinoLastLesson');
    const card = $('#continueCard');
    if(!last || !LESSONS[last]){ card.classList.add('hidden'); return; }
    const done = completedSet().has(last);
    card.innerHTML = `<div><strong>${done?'Revisar conteúdo':'Continuar aprendendo'}: ${titleFromSlug(last)}</strong><small>${LESSONS[last].summary}</small></div><a class="btn secondary small" href="#lesson/${last}">${done?'Revisar':'Continuar'} →</a>`;
    card.classList.remove('hidden');
  }

  function renderCatalog(areaId='financeiro'){
    const area = areaById(areaId) || AREAS[0];
    $('#catalogTitle').textContent = area.title;
    $('#catalogCrumb').textContent = area.title;
    $('#catalogDesc').textContent = area.desc;
    $('#areaNav').innerHTML = AREAS.map(a=>`<button type="button" data-area="${a.id}" class="${a.id===area.id?'on':''}">${a.title}</button>`).join('');
    const completed = completedSet();
    let topics = area.topics.filter(s=> state.audience==='todos' || audiencesFor(s).includes(state.audience));
    if(state.publishedOnly) topics = topics.filter(isPublished);
    const publishedCount = topics.filter(isPublished).length;
    $('#catalogSummary').textContent = `${topics.length} temas exibidos · ${publishedCount} com conteúdo completo nesta versão.`;
    $('#topicList').innerHTML = topics.map((slug,i)=>{
      const lesson = LESSONS[slug]; const aud = audiencesFor(slug); const done = completed.has(slug);
      return `<a class="topic-card" href="#lesson/${slug}">
        <span class="topic-index">${String(i+1).padStart(2,'0')}</span>
        <span><strong>${titleFromSlug(slug)}</strong><small>${lesson?lesson.summary:'Tema previsto na arquitetura do Ensino Lean. Conteúdo completo ainda em desenvolvimento.'}</small></span>
        <span class="topic-badges">
          ${done?'<span class="badge done">concluído</span>':''}
          ${lesson?'<span class="badge ok">publicado</span>':'<span class="badge">planejado</span>'}
          ${aud.includes('gestor')?'<span class="badge blue">gestor</span>':''}
          ${aud.includes('operacional')?'<span class="badge">operacional</span>':''}
        </span>
      </a>`;
    }).join('');
  }

  function collectTerms(data){
    const joined = JSON.stringify(data); const found = []; const re = /\{\{([^|}]+)\|/g; let m;
    while((m = re.exec(joined))){ if(GLOSSARY[m[1]] && !found.includes(m[1])) found.push(m[1]); }
    return found;
  }

  function section(id, eyebrow, title, html){ return `<section id="${id}" class="lesson-section"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${html}</section>`; }

  function renderRole(data, role){
    state.activeRole = role;
    const list = role==='gestor' ? data.manager : data.operator;
    const box = $('#roleContent');
    if(!box) return;
    box.innerHTML = `<h4>${role==='gestor'?'O que o gestor deve observar':'O que a operação deve executar'}</h4><ul>${list.map(x=>`<li>${annotate(x)}</li>`).join('')}</ul>`;
    $$('[data-role]').forEach(b=>b.classList.toggle('on',b.dataset.role===role));
  }

  function renderLesson(slug){
    const area = areaByTopic(slug);
    if(!area){ location.hash='#catalog/financeiro'; return; }
    const data = LESSONS[slug];
    const completed = completedSet();
    safeStorageSet('leanEnsinoLastLesson', slug);

    $('#lessonBreadcrumb').innerHTML = `<a href="#home">Início</a><span>›</span><a href="#catalog/${area.id}">${area.title}</a><span>›</span><strong>${titleFromSlug(slug)}</strong>`;
    $('#lessonTitle').textContent = titleFromSlug(slug);
    $('#lessonStatus').textContent = data ? 'Conteúdo publicado' : 'Tema planejado';
    $('#lessonSummary').innerHTML = data ? annotate(data.summary) : 'Este tema já faz parte da estrutura do Ensino Lean e será desenvolvido seguindo o padrão didático da V4.';

    if(!data){
      $('#lessonMeta').innerHTML = `<span class="badge">planejado</span>${audiencesFor(slug).map(a=>`<span class="badge ${a==='gestor'?'blue':''}">${a}</span>`).join('')}`;
      $('#lessonProgressBox').innerHTML = '<strong>Conteúdo em desenvolvimento</strong><p>O tema já possui lugar definido no catálogo, mas ainda não foi publicado como aula completa.</p>';
      $('#lessonArticle').innerHTML = '<div class="planned-box"><h3>Padrão que será aplicado</h3><p>Objetivos, explicação simples, aprofundamento, visão do gestor e operação, diagrama, exemplo, caso prático, erros comuns, quiz e conteúdos relacionados.</p></div>';
      $('#lessonToc').innerHTML = '';
      $('#lessonTermsCard').innerHTML = '<span class="eyebrow">Status</span><h3>Planejado</h3><p>Volte ao catálogo para escolher um conteúdo já publicado.</p>';
      $('#lessonSequenceCard').innerHTML = `<a class="btn secondary small" href="#catalog/${area.id}">← Voltar para ${area.title}</a>`;
      return;
    }

    $('#lessonMeta').innerHTML = `<span class="badge blue">${data.level}</span><span class="badge">${data.time}</span>${data.audiences.map(a=>`<span class="badge ${a==='gestor'?'blue':''}">${a}</span>`).join('')}`;
    const isDone = completed.has(slug);
    $('#lessonProgressBox').innerHTML = `<strong>${isDone?'Conteúdo concluído':'Seu progresso'}</strong><p>${isDone?'Você marcou esta aula como concluída neste dispositivo.':'Ao finalizar, marque como concluído. O progresso fica salvo neste dispositivo sem precisar de login.'}</p><button id="toggleComplete" class="btn ${isDone?'secondary':'primary'} small" type="button">${isDone?'Marcar como não concluído':'Marcar como concluído'}</button>`;

    const objectives = data.objectives.map((x,i)=>`<div class="objective"><span>${i+1}</span><p>${annotate(x)}</p></div>`).join('');
    const visual = data.visual.map((x,i)=>`<div class="diagram-step"><span class="diagram-num">${i+1}</span><div><strong>${x[0]}</strong><p>${annotate(x[1])}</p></div></div>`).join('');
    const rows = data.example.rows.map(r=>`<div class="data-row ${r[2]?'highlight':''}"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('');
    const related = data.related.map(s=>`<a class="related-link" href="#lesson/${s}">${titleFromSlug(s)}</a>`).join('');
    const prereq = data.prerequisites.map(s=>`<a href="#lesson/${s}">Antes: ${titleFromSlug(s)}</a>`).join('');
    const next = data.next ? `<a href="#lesson/${data.next}">Próximo: ${titleFromSlug(data.next)}</a>` : '';

    $('#lessonArticle').innerHTML = [
      section('objectives','01 · Objetivo','O que você vai aprender',`<div class="objective-list">${objectives}</div>`),
      section('overview','02 · Entenda','O que é e por que isso importa',`
        <div class="explain-grid"><div class="explain-card"><h4>Explicação simples</h4><p>${annotate(data.simple)}</p></div><div class="explain-card"><h4>Por que importa</h4><p>${annotate(data.why)}</p></div></div>
        <details class="advanced"><summary>Aprofundar tecnicamente</summary><p>${annotate(data.technical)}</p></details>
        <div class="formula">${annotate(data.formula)}</div>`),
      section('role','03 · Responsabilidade','O que muda para gestor e operação',`
        <div class="tabs">${data.audiences.includes('gestor')?'<button type="button" data-role="gestor">Visão do gestor</button>':''}${data.audiences.includes('operacional')?'<button type="button" data-role="operacional">Execução operacional</button>':''}</div><div id="roleContent" class="role-box"></div>`),
      section('visual','04 · Visualize',data.visualTitle,`<div class="diagram">${visual}</div>`),
      section('example','05 · Exemplo','Veja os números em uma situação simples',`
        <p>${annotate(data.example.scenario)}</p><div class="example-grid"><div class="data-table">${rows}</div><div class="insight-card"><h4>Como interpretar</h4><p>${annotate(data.example.insight)}</p></div></div>
        <div class="case-card"><span class="eyebrow">Caso empresarial</span><h4>${data.case.title}</h4><p>${annotate(data.case.text)}</p><div class="case-question"><strong>${data.case.question}</strong><details><summary>Ver raciocínio recomendado</summary><div class="case-answer">${annotate(data.case.answer)}</div></details></div></div>`),
      section('mistakes','06 · Atenção','Erros comuns',`<ul>${data.mistakes.map(x=>`<li>${annotate(x)}</li>`).join('')}</ul>`),
      section('connections','07 · Conexões','Que decisões e conteúdos se relacionam',`
        <div class="decision-grid">${data.decisions.map(x=>`<span>${x}</span>`).join('')}</div>
        <h4 style="margin-top:16px">Conteúdos relacionados</h4><div class="related-grid">${related}</div>
        <div class="sequence-row">${prereq}${next}</div>`),
      section('quiz','08 · Verifique','Teste seu entendimento',renderQuiz(slug,data.quiz)),
      section('apply','09 · Aplicação','Leve isso para a rotina',`
        <div class="tool-card"><div><strong>Ferramenta relacionada</strong><p>Quando a calculadora ou simulador correspondente estiver disponível em ferramentas.leancompany.com.br, o acesso será vinculado aqui sem interromper a aula.</p></div><span class="badge">integração planejada</span></div>`)
    ].join('');

    state.activeRole = data.audiences.includes('gestor') ? 'gestor' : 'operacional';
    renderRole(data,state.activeRole);

    const toc = [['objectives','O que você vai aprender'],['overview','O que é'],['role','Gestor x operação'],['visual','Explicação visual'],['example','Exemplo e caso'],['mistakes','Erros comuns'],['connections','Conexões'],['quiz','Teste rápido'],['apply','Aplicação']];
    $('#lessonToc').innerHTML = toc.map(x=>`<a href="#" data-jump="${x[0]}">${x[1]}</a>`).join('');

    const terms = collectTerms(data);
    $('#lessonTermsCard').innerHTML = terms.length ? `<span class="eyebrow">Termos desta aula</span><h3>Consulta rápida</h3><div class="term-list">${terms.map(t=>`<button type="button" data-show-term="${t}">${GLOSSARY[t].label} [?]</button>`).join('')}</div>` : '<span class="eyebrow">Glossário</span><h3>Sem termos adicionais</h3><p>Esta aula utiliza linguagem direta e não exige consulta adicional.</p>';

    const allInArea = area.topics; const idx = allInArea.indexOf(slug); const prev = idx>0?allInArea[idx-1]:null; const nextArea = idx>=0&&idx<allInArea.length-1?allInArea[idx+1]:null;
    $('#lessonSequenceCard').innerHTML = `<span class="eyebrow">Sequência</span><h3>Continue aprendendo</h3><div class="side-sequence">${prev?`<a href="#lesson/${prev}">← ${titleFromSlug(prev)}</a>`:''}${nextArea?`<a href="#lesson/${nextArea}">${titleFromSlug(nextArea)} →</a>`:''}<a href="#catalog/${area.id}">Ver toda a área de ${area.title}</a></div>`;
  }

  function renderQuiz(slug, quiz){
    return `<form id="quizForm" class="quiz-list" data-slug="${slug}">${quiz.map((q,i)=>`
      <div class="quiz-item" data-q="${i}"><fieldset><legend>${i+1}. ${q.prompt}</legend>${q.options.map((opt,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}"> <span>${opt}</span></label>`).join('')}</fieldset><div class="quiz-feedback" id="feedback${i}"></div></div>`).join('')}<div class="quiz-actions"><button class="btn primary small" type="submit">Verificar respostas</button></div></form>`;
  }

  function checkQuiz(form){
    const slug = form.dataset.slug; const data = LESSONS[slug]; let correct=0; let answered=0;
    data.quiz.forEach((q,i)=>{
      const selected = form.querySelector(`input[name="q${i}"]:checked`); const feedback = form.querySelector(`#feedback${i}`);
      if(!selected){ feedback.className='quiz-feedback show incorrect'; feedback.textContent='Escolha uma alternativa antes de verificar.'; return; }
      answered++; const ok = Number(selected.value)===q.answer; if(ok) correct++;
      feedback.className=`quiz-feedback show ${ok?'correct':'incorrect'}`; feedback.textContent=`${ok?'Correto.':'Ainda não.'} ${q.explanation}`;
    });
    if(answered===data.quiz.length) toast(`Você acertou ${correct} de ${data.quiz.length}. ${correct===data.quiz.length?'Ótimo — o conceito principal está claro.':'Revise os comentários e tente novamente.'}`);
  }

  function toggleCompleted(slug){
    const set=completedSet(); if(set.has(slug)) set.delete(slug); else set.add(slug); saveCompleted(set); renderLesson(slug); renderHome(); toast(set.has(slug)?'Conteúdo marcado como concluído.':'Conclusão removida.');
  }

  function searchScore(slug, query){
    const data=LESSONS[slug]; const area=areaByTopic(slug); const qt=tokens(query); if(!qt.length) return 1;
    const title=norm(titleFromSlug(slug)); const body=norm([area?.title||'',data?.summary||'',data?.simple||'',data?.technical||'',...(data?.keywords||[])].join(' '));
    let score=0; qt.forEach(t=>{ if(title.includes(t)) score+=5; if(body.includes(t)) score+=2; });
    PROBLEMS.forEach(p=>{ const ptxt=norm(p.title+' '+p.desc); if(p.lessons.includes(slug)) qt.forEach(t=>{if(ptxt.includes(t)) score+=2;}); });
    return score;
  }

  function renderSearchResults(query='', forcedSlugs=null){
    let list;
    if(forcedSlugs){ list=forcedSlugs.map(slug=>({slug,score:99})); }
    else {
      const all=AREAS.flatMap(a=>a.topics);
      list=all.map(slug=>({slug,score:searchScore(slug,query)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,28);
    }
    $('#searchResults').innerHTML = list.length ? list.map(({slug})=>{
      const area=areaByTopic(slug); const data=LESSONS[slug];
      return `<a class="search-result" href="#lesson/${slug}"><strong>${titleFromSlug(slug)}</strong><small>${area?.title||''} · ${data?'conteúdo publicado':'tema planejado'}${data?' · '+data.summary:''}</small></a>`;
    }).join('') : '<div class="search-empty">Não encontrei um conteúdo diretamente relacionado. Tente palavras mais curtas, como “caixa”, “margem”, “estoque”, “vendas” ou “prazo”.</div>';
  }

  function openSearch(initial='', forcedSlugs=null, heading=null){
    $('#searchOverlay').classList.add('open'); $('#searchOverlay').setAttribute('aria-hidden','false');
    $('#searchTitle').textContent=heading || 'O que você quer aprender?';
    $('#modalSearchInput').value=initial; renderSearchResults(initial,forcedSlugs); setTimeout(()=>$('#modalSearchInput').focus(),40);
  }
  function closeSearch(){ $('#searchOverlay').classList.remove('open'); $('#searchOverlay').setAttribute('aria-hidden','true'); }

  function showTerm(term){
    const item=GLOSSARY[term]; if(!item) return;
    openSearch('',[],item.label);
    $('#searchResults').innerHTML=`<div class="search-result"><strong>${item.label}</strong><small>${item.definition}</small></div>`;
    $('#modalSearchInput').value='';
  }

  function toast(msg){ const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(window.__leanToast); window.__leanToast=setTimeout(()=>el.classList.remove('show'),2800); }

  function showOnly(view){
    ['homeView','catalogView','lessonView'].forEach(id=>$('#'+id).classList.toggle('hidden',id!==view));
    window.scrollTo({top:0,behavior:'auto'});
  }

  function route(){
    const hash=location.hash||'#home';
    if(hash.startsWith('#catalog/')){ showOnly('catalogView'); renderCatalog(hash.split('/')[1]||'financeiro'); return; }
    if(hash.startsWith('#lesson/')){ showOnly('lessonView'); renderLesson(hash.split('/')[1]); return; }
    showOnly('homeView'); renderHome();
    if(hash==='#home/trilhas') setTimeout(()=>$('#home-trilhas')?.scrollIntoView({behavior:'smooth'}),30);
    if(hash==='#home/biblioteca') setTimeout(()=>$('#home-biblioteca')?.scrollIntoView({behavior:'smooth'}),30);
  }

  document.addEventListener('click',e=>{
    const problem=e.target.closest('[data-problem]'); if(problem){ const p=PROBLEMS[Number(problem.dataset.problem)]; openSearch('',p.lessons,p.title); return; }
    const areaBtn=e.target.closest('[data-area]'); if(areaBtn){ location.hash=`#catalog/${areaBtn.dataset.area}`; return; }
    const aud=e.target.closest('[data-audience]'); if(aud){ state.audience=aud.dataset.audience; $$('[data-audience]').forEach(b=>b.classList.toggle('on',b===aud)); const area=(location.hash.split('/')[1]||'financeiro'); renderCatalog(area); return; }
    const role=e.target.closest('[data-role]'); if(role){ const slug=location.hash.split('/')[1]; if(LESSONS[slug]) renderRole(LESSONS[slug],role.dataset.role); return; }
    const jump=e.target.closest('[data-jump]'); if(jump){ e.preventDefault(); $('#'+jump.dataset.jump)?.scrollIntoView({behavior:'smooth',block:'start'}); return; }
    const help=e.target.closest('.help'); if(help){ e.preventDefault(); $$('.help.open').forEach(h=>{if(h!==help)h.classList.remove('open')}); help.classList.toggle('open'); return; }
    if(!e.target.closest('.help-pop')) $$('.help.open').forEach(h=>h.classList.remove('open'));
    const term=e.target.closest('[data-show-term]'); if(term){ showTerm(term.dataset.showTerm); return; }
    if(e.target.id==='toggleComplete'){ toggleCompleted(location.hash.split('/')[1]); return; }
    if(e.target.id==='searchOverlay') closeSearch();
  });

  document.addEventListener('submit',e=>{
    if(e.target.id==='heroSearchForm'){ e.preventDefault(); openSearch($('#heroSearchInput').value); }
    if(e.target.id==='modalSearchForm'){ e.preventDefault(); renderSearchResults($('#modalSearchInput').value); }
    if(e.target.id==='quizForm'){ e.preventDefault(); checkQuiz(e.target); }
  });

  $('#openSearch').addEventListener('click',()=>openSearch(''));
  $('#closeSearch').addEventListener('click',closeSearch);
  $('#modalSearchInput').addEventListener('input',e=>renderSearchResults(e.target.value));
  $('#publishedOnly').addEventListener('change',e=>{ state.publishedOnly=e.target.checked; renderCatalog(location.hash.split('/')[1]||'financeiro'); });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') closeSearch();
    if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){ e.preventDefault(); openSearch(''); }
  });
  window.addEventListener('hashchange',()=>{ closeSearch(); route(); });

  renderHome(); route();
})();