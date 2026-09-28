/* Ensino Lean V12 — trilhas, aulas, biblioteca, progresso e retenção */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C;
  A.pages=A.pages||{};

  const stageLabel={understand:"1 · Entender",visualize:"2 · Visualizar",apply:"3 · Aplicar",validate:"4 · Validar",demonstrate:"5 · Demonstrar"};
  let currentStage="understand";

  function rolePriorityText(d){
    const g=A.roleGuide(d.type);
    return g?'<div class="role-inline"><span>'+A.esc(A.role().short)+'</span><p>'+A.esc(g.text)+'</p></div>':"";
  }
  function stageButtons(active){
    return'<div class="stage-nav" role="tablist">'+Object.keys(stageLabel).map(k=>'<button type="button" data-stage="'+k+'" class="'+(active===k?"active":"")+'" role="tab" aria-selected="'+(active===k?"true":"false")+'">'+stageLabel[k]+'</button>').join("")+'</div>';
  }
  function technicalDetails(d){
    let x="";
    if(d.before)x+='<div class="subsection"><div class="kicker">ANTES DE COMEÇAR</div>'+C.quickRows(d.before)+'</div>';
    if(d.data)x+='<div class="subsection"><div class="kicker">DADOS NECESSÁRIOS</div>'+C.quickRows(d.data)+'</div>';
    if(d.quality)x+='<div class="subsection"><div class="kicker">QUALIDADE DO DADO</div>'+C.quickRows(d.quality)+'</div>';
    if(d.roles)x+=C.table(d.roles,["Responsabilidade","Papel"]);
    if(d.steps)x+=C.flowRows(d.steps);
    return x;
  }
  function analyticalDetails(d){
    let x="";
    if(d.responds)x+='<div class="subsection"><div class="kicker">PERGUNTAS QUE RESPONDE</div>'+C.quickRows(d.responds)+'</div>';
    if(d.analysisSteps)x+=C.flowRows(d.analysisSteps);
    if(d.analysis)x+=C.flowRows(d.analysis);
    if(d.interpretation)x+=C.flowRows(d.interpretation);
    if(d.investigations)x+=C.table(d.investigations,["Sinal","Próxima investigação"]);
    if(d.cross)x+='<div class="cross-links">'+d.cross.map(v=>'<a href="#lesson/'+v[0]+'"><strong>'+A.esc(A.itemTitle(v[0]))+'</strong><span>'+A.termize(v[1]||"")+'</span></a>').join("")+'</div>';
    return x;
  }
  function decisionDetails(d){
    let x="";
    if(d.responds)x+='<div class="subsection"><div class="kicker">O QUE ESSA FERRAMENTA RESPONDE</div>'+C.quickRows(d.responds.slice(0,5))+'</div>';
    if(d.interpretation)x+=C.flowRows(d.interpretation.slice(0,5));
    if(d.nextQuestion)x+=C.callout("Pergunta seguinte",d.nextQuestion,"green");
    const cautions=[...(d.notConclude||[]),...(d.doesNotAnswer||[])].slice(0,5);
    if(cautions.length)x+='<div class="subsection"><div class="kicker">NÃO CONCLUA SOZINHO</div>'+C.listRows(cautions)+'</div>';
    return x;
  }

  function stageContent(slug,d,stage){
    const r=A.role().id;
    if(stage==="understand"){
      return'<section class="lesson-sheet"><div class="section-marker">01</div><div class="kicker">ENTENDER</div><h2>O que você precisa dominar</h2><p class="lead">'+A.termize(d.summary||"")+'</p>'+C.roleFocus(d)+C.quickRows(d.outcomes||[])+
        '<div class="subsection"><div class="kicker">EM 1 MINUTO</div>'+C.quickRows(d.quick||[])+'</div>'+C.roleLens(d)+'</section>';
    }
    if(stage==="visualize"){
      let core=C.lessonVisual(slug,d);
      if(d.definitions)core+='<div class="panel-grid">'+d.definitions.map(x=>'<div class="info-item"><strong>'+A.termize(x[0])+'</strong><p>'+A.termize(x[1])+'</p></div>').join("")+'</div>';
      if(d.formula)core+='<div class="formula-visual"><strong>'+A.termize(d.formula)+'</strong><span>Leia a fórmula junto com os dados que a alimentam e os drivers que a explicam.</span></div>';
      if(d.principle)core+=C.callout("Princípio",d.principle,"green");
      if(d.why)core+=C.callout("Por que importa",d.why,"green");
      if(d.inOneSentence)core+=C.callout("Em uma frase",d.inOneSentence,"");
      if(r==="operacao")core+=technicalDetails(d);
      else if(r==="gestao")core+=analyticalDetails(d)||technicalDetails(d);
      else core+=decisionDetails(d)+'<details class="details-box"><summary>Ver detalhes técnicos</summary>'+technicalDetails(d)+analyticalDetails(d)+'</details>';
      if(d.accountVsCenter)core+=C.table(d.accountVsCenter,["Dimensão","Pergunta","Exemplos"]);
      if(d.anatomy)core+=C.table(d.anatomy,["Linha","Leitura"]);
      if(d.classificationTree)core+=C.flowRows(d.classificationTree);
      if(d.decisionFlow)core+=C.flowRows(d.decisionFlow);
      return'<section class="lesson-sheet"><div class="section-marker">02</div><div class="kicker">VISUALIZAR</div><h2>Construa o modelo mental</h2>'+core+'</section>';
    }
    if(stage==="apply"){
      let core=C.example(d.mainExample||d.example||d.caseExample);
      if(d.edgeCases)core+=C.table(d.edgeCases,["Situação","Tratamento"]);
      if(d.ambiguity)core+=C.table(d.ambiguity,["Situação ambígua","Como decidir"]);
      if(d.compare)core+=C.table(d.compare,["Comparação","Para que serve"]);
      if(d.timeline)core+=C.table(d.timeline);
      if(d.profitVsCash)core+=C.table(d.profitVsCash);
      if(r!=="operacao"&&d.investigations)core+=C.table(d.investigations,["Sinal","Próxima investigação"]);
      if(r!=="operacao"&&d.interpretation)core+=C.flowRows(d.interpretation);
      if(d.cross)core+='<div class="subsection"><div class="kicker">CRUZAR COM</div><div class="cross-links">'+d.cross.map(x=>'<a href="#lesson/'+x[0]+'"><strong>'+A.esc(A.itemTitle(x[0]))+'</strong><span>'+A.termize(x[1]||"")+'</span></a>').join("")+'</div></div>';
      if(d.nextQuestion)core+=C.callout("Próxima pergunta",d.nextQuestion,"green");
      if(!core)core=C.callout("Aplicação","Use a lógica desta aula sobre um período real e registre as evidências que sustentam sua leitura.","green");
      return'<section class="lesson-sheet"><div class="section-marker">03</div><div class="kicker">APLICAR</div><h2>Leve o conceito para uma situação concreta</h2>'+rolePriorityText(d)+core+'</section>';
    }
    if(stage==="validate"){
      const attention=[...(d.mistakes||[]),...(d.commonMistakes||[]),...(d.notReady||[]),...(d.notConclude||[]),...(d.doesNotAnswer||[])];
      let core=C.validation(d.validation);
      if(d.stageValidation)core+=C.table(d.stageValidation,["Etapa","Como validar"]);
      if(d.finishCriteria)core+='<div class="subsection"><div class="kicker">CRITÉRIOS DE CONCLUSÃO</div>'+C.quickRows(d.finishCriteria)+'</div>';
      if(attention.length)core+='<div class="subsection"><div class="kicker">PONTOS DE ATENÇÃO</div>'+C.listRows(attention.slice(0,8))+'</div>';
      if(d.errorChain)core+='<div class="subsection"><div class="kicker">CADEIA DO ERRO</div>'+C.flowRows(d.errorChain.map(x=>[x,""]))+'</div>';
      core+=C.roleLens(d);
      return'<section class="lesson-sheet"><div class="section-marker">04</div><div class="kicker">VALIDAR</div><h2>Saiba quando confiar — e quando parar</h2>'+core+'</section>';
    }
    return demonstrate(slug,d);
  }

  function demoQuestion(slug,part,ex){
    if(!ex)return"";
    const c=A.competency(slug),done=!!c.demo?.[part];
    return'<div class="exercise '+(done?"done":"")+'" data-demo="'+slug+'" data-demo-part="'+part+'"><div class="exercise-top"><span class="badge '+(done?"green":"purple")+'">'+(part==="base"?"Aplicação 1":"Aplicação 2")+'</span>'+(done?'<span class="demo-ok">✓ Correta</span>':'')+'</div><h3>'+A.termize(ex.q)+'</h3>'+(ex.context?C.table(ex.context.rows,ex.context.headers):"")+'<div class="answers">'+(ex.options||[]).map((o,i)=>'<button type="button" data-demo-answer="'+i+'" data-correct="'+ex.answer+'" '+(done?"disabled":"")+'>'+A.termize(o)+'</button>').join("")+'</div><div class="feedback" aria-live="polite">'+(done?A.esc(ex.feedback||"Aplicação demonstrada."):"")+'</div></div>';
  }
  function demonstrate(slug,d){
    const c=A.competency(slug),extra=A.PRODUCT.masteryExtra?.[slug],ms=C.masteryStatus(slug),task=A.PRODUCT.applicationTasks?.[slug];
    let app="";
    if(task){
      app='<section class="application"><div class="application-head"><div><div class="kicker">APLICAR NA SUA EMPRESA</div><h3>'+A.esc(task.title)+'</h3></div><span class="badge '+(c.level>=4?"green":"")+'">'+A.levelLabel(c.level||0)+'</span></div><p>'+A.esc(task.action)+'</p><div class="application-grid"><div><strong>Evidência esperada</strong><span>'+A.esc(task.evidence)+'</span></div><div><strong>Resultado esperado</strong><span>'+A.esc(task.result)+'</span></div></div><textarea data-application-note="'+slug+'" placeholder="Registre período, evidências e o que foi aplicado.">'+A.esc(c.applicationNote||"")+'</textarea><div class="application-actions"><button class="btn primary" type="button" data-save-application="'+slug+'" '+(!ms.complete?"disabled":"")+'>'+(c.level>=4?"Atualizar aplicação":"Registrar aplicação")+'</button>'+(c.level>=4?'<button class="btn ghost" type="button" data-validate="'+slug+'">'+(c.level>=5?"Ver validação":"Registrar validação")+'</button>':'')+'</div>'+(!ms.complete?'<p class="application-lock">Demonstre as duas aplicações acima para liberar o registro na empresa.</p>':'')+'</section>';
    }
    return'<section class="lesson-sheet"><div class="section-marker">05</div><div class="kicker">DEMONSTRAR</div><h2>Prove que entendeu antes de aplicar</h2><p class="lead">A V12 exige duas aplicações corretas. Uma única questão não valida domínio.</p><div class="demo-progress"><span style="width:'+(ms.count/2*100)+'%"></span></div><p class="demo-status" id="demoStatus">'+ms.count+' de 2 aplicações corretas'+(ms.complete?" · domínio demonstrado":"")+'</p>'+demoQuestion(slug,"base",d.exercise)+demoQuestion(slug,"extra",extra)+app+'</section>';
  }

  A.pages.home=()=>{
    A.meta("Início","Capacitação gerencial aplicada");
    const st=A.courseStats(),next=A.nextItem(),due=A.dueReviews(),first=st.done===0,applied=Object.values(A.state.competencies).filter(c=>(c.level||0)>=4).length,validated=Object.values(A.state.competencies).filter(c=>(c.level||0)>=5).length;
    const pendingApply=A.learningItems().filter(i=>{const l=A.competency(i.slug).level||0;return l===3&&A.DATA.lessons?.[i.slug]}).slice(0,3);
    const problems=(A.PRODUCT.diagnoses||[]).slice(0,4).map(x=>'<a class="problem-card surface" href="#resolve/'+x.id+'"><span class="problem-icon">'+A.icon(x.icon)+'</span><h3>'+A.esc(x.title)+'</h3><p>'+A.esc(x.desc)+'</p><span class="go">Investigar →</span></a>').join("");
    if(first){
      A.view.innerHTML='<section class="welcome-grid"><div class="welcome-main surface"><div class="kicker">BEM-VINDO AO ENSINO LEAN</div><h1>Aprenda para executar. <span>Use para decidir.</span></h1><p>Uma base de capacitação gerencial que combina formação, consulta, diagnóstico e aplicação na empresa.</p><div class="actions welcome-actions"><a class="btn primary" href="'+(next?next.href:"#trails")+'">Começar formação →</a><a class="btn" href="#assessment">Diagnóstico inicial</a><a class="btn" href="#resolve">Resolver um problema</a></div></div><aside class="role-home surface">'+C.roleFocus({type:"analysis"})+'<a class="text-link" href="#trails">Ver trilha Financeiro →</a></aside></section>';
    }else{
      const priorities=[];
      if(due.length)priorities.push(C.priorityCard("review","Revisar "+A.itemTitle(due[0]),"Reforço recomendado para retenção.","#review/"+due[0],"amber"));
      if(pendingApply.length)priorities.push(C.priorityCard("target","Aplicar "+A.itemTitle(pendingApply[0].slug),"Você já demonstrou. Falta levar para a empresa.",pendingApply[0].href+"?stage=demonstrate","purple"));
      if(next)priorities.push(C.priorityCard("trail","Continuar "+A.itemTitle(next.slug),"Próxima competência da trilha.",next.href,"teal"));
      A.view.innerHTML='<section class="dashboard-head"><div><div class="kicker">SEU PAINEL</div><h1>Seu próximo passo está claro.</h1><p>Prioridades de estudo, revisão e aplicação para '+A.esc(A.role().label)+'.</p></div><div class="dashboard-score"><b>'+st.percent+'%</b><span>domínio demonstrado</span></div></section><section class="priority-grid">'+priorities.join("")+'</section>';
    }
    A.view.innerHTML+='<section class="metric-strip"><div><b>'+st.done+'</b><span>competências demonstradas</span></div><div><b>'+applied+'</b><span>aplicações na empresa</span></div><div><b>'+due.length+'</b><span>revisões pendentes</span></div><div><b>'+validated+'</b><span>validações registradas</span></div></section>'+
      '<section class="section"><div class="section-head"><div><div class="kicker">COMECE PELA DOR</div><h2>O que você precisa resolver agora?</h2><p>O diagnóstico adapta as próximas perguntas conforme suas respostas.</p></div><a class="text-link" href="#resolve">Abrir diagnósticos →</a></div><div class="grid4">'+problems+'</div></section>'+
      '<section class="section"><div class="section-head"><div><div class="kicker">MAPA DA FORMAÇÃO</div><h2>Financeiro — do dado à decisão</h2></div><a class="text-link" href="#trails">Abrir trilha →</a></div>'+roadmap()+'</section>';
  };

  function roadmap(){
    return'<div class="roadmap">'+(A.DATA.financeStages||[]).map((s,i)=>{const its=s.items||[],done=its.filter(x=>A.demonstrated(x.slug)).length,p=its.length?Math.round(done/its.length*100):0;return'<div class="roadmap-step '+(p===100?"done":"")+'"><span class="roadmap-num">'+(p===100?"✓":i+1)+'</span><div><strong>'+A.esc(s.title)+'</strong><small>'+done+'/'+its.length+' atividades</small><div class="progress-track"><span style="width:'+p+'%"></span></div></div></div>'}).join("")+'</div>';
  }

  A.pages.trails=()=>{
    A.meta("Trilhas","Aprendizado estruturado");
    const st=A.courseStats(),next=A.nextItem();
    const modules=(A.DATA.financeStages||[]).map((stage,si)=>{
      const its=stage.items||[],done=its.filter(x=>A.demonstrated(x.slug)).length,p=its.length?Math.round(done/its.length*100):0;
      const rows=its.map(item=>{const c=A.competency(item.slug),href=item.lab?"#lab/"+item.slug:item.checkpoint?"#checkpoint/"+item.slug:item.diagnostic?"#diagnostico/caixa-ruim":"#lesson/"+item.slug;return'<a class="lesson-row '+(c.level>=4?"applied":c.level>=3?"done":"")+'" href="'+href+'"><span class="lesson-state">'+(c.level>=4?"A":c.level>=3?"✓":item.lab?"L":item.checkpoint?"C":"•")+'</span><div><h4>'+A.esc(item.title)+'</h4><p>'+A.esc(item.kind||"Conteúdo")+' · '+A.levelLabel(c.level||0)+'</p></div><span class="arrow">→</span></a>'}).join("");
      return'<section class="module surface"><div class="module-head"><div><span class="badge teal">Módulo '+(si+1)+'</span><h3>'+A.esc(stage.title)+'</h3><p>'+A.esc(stage.desc||"")+'</p></div><div class="module-progress"><b>'+p+'%</b><div class="progress-track"><span style="width:'+p+'%"></span></div></div></div><div class="lesson-list">'+rows+'</div></section>';
    }).join("");
    A.view.innerHTML=C.pageHead("APRENDER","Trilha Financeiro","Uma formação estruturada do dado à decisão. O progresso mede domínio demonstrado, aplicação e validação.",'<a class="btn primary" href="'+(next?next.href:"#trails")+'">'+(st.done?"Continuar":"Começar")+' →</a>')+
      '<section class="trail-overview"><div class="trail-copy surface"><div class="kicker">FORMAÇÃO ATIVA</div><h2>Financeiro — do dado à decisão</h2><p>6 módulos que conectam confiabilidade, resultado, caixa, capital de giro, rentabilidade, planejamento e execução.</p><div class="progress-track big"><span style="width:'+st.percent+'%"></span></div><small>'+st.done+' de '+st.total+' atividades com domínio demonstrado.</small></div><aside class="trail-model surface">'+C.roleFocus({type:"analysis"})+'<div class="mastery-legend"><span>Conheceu</span><span>Praticou</span><span>Demonstrou</span><span>Aplicou</span><span>Validado</span></div></aside></section><div class="module-list">'+modules+'</div>';
  };

  A.pages.lesson=slug=>{
    const d=A.DATA.lessons?.[slug];if(!d){location.hash="#trails";return}
    const c=A.competency(slug);if((c.level||0)<1){A.setLevel(slug,1,{visitedAt:A.nowISO()});A.event("lesson_view",{slug})}
    A.meta(d.title,"Trilha Financeiro · "+(d.type==="procedure"?"Procedimento":d.type==="indicator"?"Indicador":d.type==="analysis"?"Análise":"Conceito"));
    const idx=A.lessonIndex(slug),items=A.learningItems(),prev=idx>0?items[idx-1]:null,next=idx>=0&&idx<items.length-1?items[idx+1]:null;
    const query=new URLSearchParams((location.hash.split("?")[1]||""));currentStage=query.get("stage")||"understand";
    A.view.innerHTML='<div class="lesson-wrap"><section class="lesson-hero"><div class="lesson-intro surface"><div class="kicker">'+(d.type==="procedure"?"PROCEDIMENTO":d.type==="indicator"?"INDICADOR":d.type==="analysis"?"ANÁLISE GERENCIAL":"CONCEITO")+'</div><h1>'+A.esc(d.title)+'</h1><p>'+A.termize(d.summary||"")+'</p><div class="lesson-meta"><span class="badge teal">'+A.esc(d.time||"")+'</span><span class="badge purple">'+A.esc(d.audience||"")+'</span><span class="badge">'+A.levelLabel(A.competency(slug).level||0)+'</span><span class="badge">'+A.esc(A.PRODUCT.governance?.revision||"")+'</span></div>'+C.levelStrip(slug)+'</div><aside class="lesson-role surface">'+C.roleFocus(d)+'</aside></section><div class="lesson-toolbar">'+stageButtons(currentStage)+'<span class="lesson-progress">5 etapas · duas aplicações para demonstrar domínio</span></div><div id="lessonStage">'+stageContent(slug,d,currentStage)+'</div><nav class="lesson-bottom">'+(prev?'<a href="'+prev.href+'"><span>Anterior</span><strong>← '+A.esc(prev.title)+'</strong></a>':'<span></span>')+(next?'<a href="'+next.href+'" class="next"><span>Próximo</span><strong>'+A.esc(next.title)+' →</strong></a>':'<a href="#progress" class="next"><span>Concluir</span><strong>Ver meu progresso →</strong></a>')+'</nav><div class="content-feedback"><div><strong>Este conteúdo resolveu sua dúvida?</strong><p>O feedback fica registrado localmente e ajuda a priorizar melhorias.</p></div><div class="actions"><button class="btn" type="button" data-content-feedback="yes" data-feedback-slug="'+slug+'">Sim</button><button class="btn" type="button" data-content-feedback="no" data-feedback-slug="'+slug+'">Não</button></div></div></div>';
  };

  function switchStage(stage){
    const slug=location.hash.split("/")[1]?.split("?")[0],d=A.DATA.lessons?.[slug];if(!d)return;
    currentStage=stage;
    document.querySelectorAll("[data-stage]").forEach(b=>{const on=b.dataset.stage===stage;b.classList.toggle("active",on);b.setAttribute("aria-selected",on?"true":"false")});
    const box=document.getElementById("lessonStage");if(box)box.innerHTML=stageContent(slug,d,stage);
    box?.scrollIntoView({behavior:"smooth",block:"start"});
  }

  A.pages.checkpoint=slug=>{
    const d=A.DATA.checkpoints?.[slug];if(!d){location.hash="#trails";return}
    if((A.competency(slug).level||0)<1)A.setLevel(slug,1,{visitedAt:A.nowISO()});
    A.event("checkpoint_view",{slug});A.meta(d.title,"Checkpoint");
    A.view.innerHTML='<div class="lesson-wrap">'+C.pageHead("CHECKPOINT",A.esc(d.title),A.termize(d.summary||""),'<a class="btn" href="#trails">Voltar à trilha</a>')+'<section class="lesson-sheet"><h2>'+A.esc(d.objective||"Valide o que aprendeu")+'</h2>'+(d.context?C.table(d.context.rows,d.context.headers):"")+checkpointQuestion(slug,d.question)+(d.review?'<div class="subsection"><div class="kicker">REVISAR SE NECESSÁRIO</div><div class="cross-links">'+d.review.map(r=>'<a href="#lesson/'+r[0]+'"><strong>'+A.esc(r[1])+'</strong></a>').join("")+'</div></div>':'')+'</section></div>';
  };
  function checkpointQuestion(slug,q){
    if(!q)return"";
    const done=A.demonstrated(slug);
    return'<div class="exercise" data-checkpoint="'+slug+'"><span class="badge '+(done?"green":"purple")+'">Decisão integrada</span><h3>'+A.termize(q.q)+'</h3><div class="answers">'+q.options.map((o,i)=>'<button type="button" data-checkpoint-answer="'+i+'" data-correct="'+q.answer+'" '+(done?"disabled":"")+'>'+A.termize(o)+'</button>').join("")+'</div><div class="feedback" aria-live="polite">'+(done?A.esc(q.feedback):"")+'</div></div>';
  }

  A.pages.lab=slug=>{
    const d=A.DATA.labs?.[slug];if(!d){location.hash="#trails";return}
    if((A.competency(slug).level||0)<1)A.setLevel(slug,1,{visitedAt:A.nowISO()});
    A.event("lab_view",{slug});A.meta(d.title,"Laboratório");
    const qs=(d.questions||[]).map((q,i)=>'<div class="exercise" data-lab-q="'+i+'" data-lab-root="'+slug+'"><span class="badge purple">Decisão '+(i+1)+'</span><h3>'+A.termize(q.q)+'</h3><div class="answers">'+q.options.map((o,oi)=>'<button type="button" data-lab-answer="'+oi+'" data-correct="'+q.answer+'">'+A.termize(o)+'</button>').join("")+'</div><div class="feedback" aria-live="polite"></div></div>').join("");
    A.view.innerHTML='<div class="lesson-wrap">'+C.pageHead("LABORATÓRIO",A.esc(d.title),A.termize(d.summary||""),'<a class="btn" href="#trails">Voltar à trilha</a>')+'<section class="lesson-sheet"><h2>'+A.esc(d.intro||"Resolva a sequência de decisões")+'</h2>'+(d.context?C.table(d.context.rows,d.context.headers):"")+'<div data-lab-container="'+slug+'">'+qs+'</div>'+C.callout("Síntese",d.takeaway||"","green")+'</section></div>';
  };

  A.pages.diagnostic=()=>{
    const d=A.DATA.diagnostic||{};if((A.competency("caixa-ruim").level||0)<1)A.setLevel("caixa-ruim",1,{visitedAt:A.nowISO()});
    A.meta(d.title||"Diagnóstico financeiro","Prática final");
    A.view.innerHTML='<div class="lesson-wrap">'+C.pageHead("PRÁTICA FINAL",A.esc(d.title||"Diagnóstico Financeiro"),A.termize(d.summary||d.intro||""),'<a class="btn primary" href="#resolve/caixa">Usar diagnóstico adaptativo →</a>')+'<section class="lesson-sheet"><h2>Construa uma cadeia de evidências</h2>'+(d.path?C.flowRows(d.path):"")+checkpointQuestion("caixa-ruim",d.exercise)+'</section></div>';
  };

  A.pages.library=()=>{
    A.meta("Biblioteca","Consulta rápida");
    const cards=(A.PRODUCT.library||[]).map(r=>{const d=A.DATA.lessons?.[r.slug];if(!d)return"";return'<a class="resource-card surface" href="#resource/'+r.slug+'" data-resource data-format="'+A.norm(r.format)+'" data-search="'+A.esc(A.norm(d.title+" "+d.summary+" "+r.format+" "+(r.tags||[]).join(" ")))+'"><div class="resource-type '+A.norm(r.format).replace(/\s/g,"-")+'">'+A.icon(r.format==="Checklist"?"check":r.format==="Indicador"?"chart":r.format==="Playbook"?"layers":"book")+'</div><div class="resource-body"><span class="badge purple">'+A.esc(r.format)+'</span><h3>'+A.esc(d.title)+'</h3><p>'+A.esc(d.summary)+'</p><div class="resource-foot"><span>Financeiro</span><span>Consultar →</span></div></div></a>'}).join("");
    A.view.innerHTML=C.pageHead("CONSULTAR","Biblioteca Lean","Formatos rápidos para o trabalho: checklist, indicador, playbook, guia visual e Lean Card.")+'<div class="toolbar"><input class="search-field" data-lib-search placeholder="Buscar DRE, margem, caixa, estoque, PMR..."><div class="filters"><button class="filter active" data-lib-filter="todos">Todos</button><button class="filter" data-lib-filter="guia visual">Guias</button><button class="filter" data-lib-filter="lean card">Cards</button><button class="filter" data-lib-filter="checklist">Checklists</button><button class="filter" data-lib-filter="playbook">Playbooks</button><button class="filter" data-lib-filter="indicador">Indicadores</button></div></div><div class="grid3" id="libraryGrid">'+cards+'</div>';
  };

  A.pages.resource=slug=>{
    const d=A.DATA.lessons?.[slug],cfg=A.PRODUCT.library?.find(x=>x.slug===slug);if(!d||!cfg){location.hash="#library";return}
    A.meta(d.title,"Biblioteca · "+cfg.format);
    const fav=A.isFavorite(slug);
    let body="";
    if(cfg.format==="Checklist"){
      const items=(d.finishCriteria||d.steps||d.quick||[]).map(x=>Array.isArray(x)?x[0]:x);
      body='<section class="reference-format checklist-format"><div class="kicker">CHECKLIST</div><h2>Use durante a execução</h2><div class="checklist">'+items.map((x,i)=>'<label><input type="checkbox"><span><b>'+(i+1)+'</b>'+A.termize(x)+'</span></label>').join("")+'</div></section>';
    }else if(cfg.format==="Indicador"){
      body='<section class="reference-format indicator-format"><div class="kicker">FICHA DO INDICADOR</div><h2>'+A.esc(d.title)+'</h2><div class="indicator-formula">'+A.termize(d.formula||d.inOneSentence||"")+'</div>'+(d.data?'<div class="ref-grid"><div><strong>Dados necessários</strong>'+C.quickRows(d.data)+'</div><div><strong>Como interpretar</strong>'+C.flowRows((d.interpretation||d.analysis||[]).slice(0,5))+'</div></div>':'')+(d.when?C.callout("Quando acompanhar",d.when,""):"")+'</section>';
    }else if(cfg.format==="Playbook"){
      body='<section class="reference-format playbook-format"><div class="kicker">PLAYBOOK</div><h2>Roteiro de decisão</h2>'+C.flowRows((d.analysisSteps||d.steps||d.analysis||[]).slice(0,7))+(d.investigations?C.table(d.investigations,["Sinal","Próxima investigação"]):"")+'</section>';
    }else if(cfg.format==="Guia visual"){
      body='<section class="reference-format guide-format">'+C.lessonVisual(slug,d)+'<div class="guide-summary"><h2>O que lembrar</h2>'+C.quickRows((d.quick||d.outcomes||[]).slice(0,6))+'</div></section>';
    }else{
      const cautions=[...(d.mistakes||[]),...(d.notConclude||[]),...(d.doesNotAnswer||[])].slice(0,4);
      body='<section class="reference-format lean-card-format"><span class="badge teal">LEAN CARD</span><h2>'+A.esc(d.title)+'</h2><p class="lead">'+A.termize(d.inOneSentence||d.summary||"")+'</p><div class="ref-grid"><div><strong>Use para</strong>'+C.quickRows((d.responds||d.outcomes||[]).slice(0,4))+'</div><div><strong>Evite</strong>'+C.listRows(cautions)+'</div></div></section>';
    }
    A.view.innerHTML='<div class="reference"><header class="reference-hero surface"><div><span class="badge purple">'+A.esc(cfg.format)+'</span><h1>'+A.esc(d.title)+'</h1><p>'+A.termize(d.summary||"")+'</p></div><div class="actions"><button class="btn" type="button" data-favorite="'+slug+'">'+(fav?"★ Salvo":"☆ Salvar")+'</button><a class="btn primary" href="#lesson/'+slug+'">Estudar completo →</a></div></header>'+body+'<a class="text-link back-library" href="#library">← Voltar à biblioteca</a></div>';
  };

  A.pages.progress=()=>{
    A.meta("Meu progresso","Mapa de competências");
    const st=A.courseStats(),due=A.dueReviews(),items=A.learningItems(),weak=items.filter(i=>(A.competency(i.slug).wrong||0)>=2).sort((a,b)=>(A.competency(b.slug).wrong||0)-(A.competency(a.slug).wrong||0)).slice(0,3),pending=items.filter(i=>{const l=A.competency(i.slug).level||0;return l===3&&A.DATA.lessons?.[i.slug]}).slice(0,3);
    const priorities=[];
    weak.forEach(i=>priorities.push(C.priorityCard("alert","Reforçar "+i.title,(A.competency(i.slug).wrong||0)+" erros registrados.",i.href,"red")));
    if(due[0])priorities.push(C.priorityCard("review","Revisar "+A.itemTitle(due[0]),"Revisão espaçada pendente.","#review/"+due[0],"amber"));
    if(pending[0])priorities.push(C.priorityCard("target","Aplicar "+pending[0].title,"Domínio demonstrado; falta aplicação na empresa.",pending[0].href+"?stage=demonstrate","purple"));
    const rows=items.map(i=>{const c=A.competency(i.slug),l=c.level||0;return'<div class="comp-row"><div><strong>'+A.esc(i.title)+'</strong><small>'+A.esc(i.stageTitle||"")+' · '+A.levelLabel(l)+'</small></div><div class="level">'+[1,2,3,4,5].map(x=>'<i class="'+(l>=x?"on":"")+'"></i>').join("")+'</div><a class="text-link" href="'+i.href+'">Abrir →</a></div>'}).join("");
    A.view.innerHTML=C.pageHead("EVOLUIR","Meu progresso","Veja domínio, aplicações, validações e lacunas prioritárias. Nesta etapa, os dados continuam salvos neste navegador.")+(priorities.length?'<section class="section"><div class="section-head"><div><div class="kicker">PRIORIDADES</div><h2>Onde concentrar esforço agora</h2></div></div><div class="priority-grid">'+priorities.slice(0,4).join("")+'</div></section>':'')+'<div class="progress-layout section"><aside class="progress-summary surface"><div class="kicker">FORMAÇÃO FINANCEIRO</div><h2>'+st.percent+'% demonstrado</h2><div class="ring" style="--p:'+(st.percent*3.6)+'deg"><b>'+st.percent+'%</b></div><p>'+st.done+' de '+st.total+' atividades com domínio demonstrado.</p></aside><section class="competency-table surface"><div class="kicker">MAPA DE CONHECIMENTO</div><h2>Competências e atividades</h2>'+rows+'</section></div>';
  };

  A.pages.assessment=()=>{
    A.meta("Diagnóstico inicial","Calibrar jornada");
    const a=A.PRODUCT.assessment||{questions:[]},saved=A.state.assessment;
    const qs=a.questions.map((q,i)=>{const chosen=saved?.answers?.[i];return'<div class="exercise" data-assess-q="'+i+'"><span class="badge purple">Questão '+(i+1)+'</span><h3>'+A.esc(q.q)+'</h3><div class="answers">'+q.options.map((o,oi)=>'<button type="button" data-assess-answer="'+oi+'" class="'+(chosen===oi?"selected":"")+'">'+A.esc(o)+'</button>').join("")+'</div></div>'}).join("");
    A.view.innerHTML='<div class="lesson-wrap">'+C.pageHead("DIAGNÓSTICO INICIAL",A.esc(a.title||"Diagnóstico inicial"),A.esc(a.desc||""),'<a class="btn" href="#trails">Ir para a trilha</a>')+'<section class="lesson-sheet"><h2>Calibre seu ponto de partida</h2><p class="lead">O diagnóstico não bloqueia conteúdo. Ele apenas orienta a intensidade da jornada.</p>'+qs+'<div class="actions"><button class="btn primary" type="button" data-finish-assessment>Calcular resultado</button></div><div id="assessmentResult">'+(saved?'<div class="callout green"><strong>Resultado registrado</strong><p>'+saved.score+' de '+a.questions.length+' respostas corretas.</p></div>':'')+'</div></section></div>';
  };

  A.pages.review=slug=>{
    const d=A.DATA.lessons?.[slug],q=A.PRODUCT.masteryExtra?.[slug]||d?.exercise;if(!d||!q){location.hash="#progress";return}
    A.meta("Revisar "+d.title,"Reforço espaçado");
    A.view.innerHTML='<div class="lesson-wrap">'+C.pageHead("REVISÃO","Reforce "+A.esc(d.title),"Uma revisão curta recupera o raciocínio sem exigir a releitura da aula.",'<a class="btn" href="#lesson/'+slug+'">Rever aula</a>')+'<section class="lesson-sheet"><h2>Recupere a decisão</h2><div class="exercise" data-review="'+slug+'"><h3>'+A.termize(q.q)+'</h3><div class="answers">'+q.options.map((o,i)=>'<button type="button" data-review-answer="'+i+'" data-correct="'+q.answer+'">'+A.termize(o)+'</button>').join("")+'</div><div class="feedback" aria-live="polite"></div></div>'+C.callout("Retenção","Ao acertar, a próxima revisão é reagendada automaticamente neste navegador.","")+'</section></div>';
  };

  function filterLibrary(){
    const q=A.norm(document.querySelector("[data-lib-search]")?.value||""),f=document.querySelector("[data-lib-filter].active")?.dataset.libFilter||"todos";
    document.querySelectorAll("[data-resource]").forEach(c=>{const okQ=!q||(c.dataset.search||"").includes(q),okF=f==="todos"||c.dataset.format===f;c.style.display=okQ&&okF?"":"none"});
  }

  function validationModal(slug){
    const c=A.competency(slug);
    A.openModal('<div class="modal-head"><div><div class="kicker">VALIDAÇÃO</div><h2>'+A.esc(A.itemTitle(slug))+'</h2><p>Registre uma validação realizada com o consultor ou responsável. O registro continua local nesta versão.</p></div><button class="close" type="button" data-close>×</button></div><div class="validation-form"><input data-validator placeholder="Responsável pela validação" value="'+A.esc(c.validator||"")+'"><input data-validation-date type="date" value="'+A.esc((c.validatedAt||"").slice(0,10))+'"><textarea data-validation-note placeholder="O que foi validado?">'+A.esc(c.validationNote||"")+'</textarea></div><div class="actions modal-actions"><button class="btn primary" type="button" data-save-validation="'+slug+'">Salvar validação</button></div>');
  }

  document.addEventListener("click",e=>{
    let el;
    if((el=e.target.closest("[data-stage]"))){switchStage(el.dataset.stage);return}
    if((el=e.target.closest("[data-demo-answer]"))){
      const box=el.closest("[data-demo]"),slug=box.dataset.demo,part=box.dataset.demoPart,correct=Number(el.dataset.correct),chosen=Number(el.dataset.demoAnswer),d=A.DATA.lessons?.[slug],ex=part==="base"?d?.exercise:A.PRODUCT.masteryExtra?.[slug],c=A.competency(slug);
      A.setLevel(slug,2,{practicedAt:A.nowISO()});box.querySelectorAll("[data-demo-answer]").forEach(b=>b.classList.remove("correct","wrong"));
      const ok=chosen===correct;el.classList.add(ok?"correct":"wrong");c.correct=(c.correct||0)+(ok?1:0);c.wrong=(c.wrong||0)+(ok?0:1);
      if(ok){c.demo[part]=true;box.querySelector(".feedback").textContent=ex?.feedback||"Correto."}else box.querySelector(".feedback").textContent="Revise o raciocínio e tente novamente.";
      if(c.demo.base&&c.demo.extra)A.setLevel(slug,3,{demonstratedAt:A.nowISO(),reviewDue:A.addDays(7),reviewRound:c.reviewRound||0});
      else A.save();
      A.event("exercise_attempt",{slug,part,correct:ok});
      if(ok)switchStage("demonstrate");
      return;
    }
    if((el=e.target.closest("[data-save-application]"))){
      const slug=el.dataset.saveApplication,note=document.querySelector('[data-application-note="'+slug+'"]')?.value||"";
      A.setLevel(slug,4,{appliedAt:A.nowISO(),applicationNote:note});A.event("application",{slug});switchStage("demonstrate");return;
    }
    if((el=e.target.closest("[data-validate]"))){validationModal(el.dataset.validate);return}
    if((el=e.target.closest("[data-save-validation]"))){
      const slug=el.dataset.saveValidation,validator=A.overlay.querySelector("[data-validator]")?.value||"",date=A.overlay.querySelector("[data-validation-date]")?.value||new Date().toISOString().slice(0,10),note=A.overlay.querySelector("[data-validation-note]")?.value||"";
      A.setLevel(slug,5,{validatedAt:date,validator,validationNote:note});A.event("validation",{slug,validator});A.closeModal();if(location.hash.startsWith("#lesson/"))switchStage("demonstrate");return;
    }
    if((el=e.target.closest("[data-checkpoint-answer]"))){
      const box=el.closest("[data-checkpoint]"),slug=box.dataset.checkpoint,d=A.DATA.checkpoints?.[slug]||A.DATA.diagnostic,ok=Number(el.dataset.checkpointAnswer)===Number(el.dataset.correct);
      A.setLevel(slug,2,{practicedAt:A.nowISO()});box.querySelectorAll("[data-checkpoint-answer]").forEach(b=>b.classList.remove("correct","wrong"));el.classList.add(ok?"correct":"wrong");box.querySelector(".feedback").textContent=ok?(d.question?.feedback||d.exercise?.feedback||"Correto."):"Revise o raciocínio e tente novamente.";if(ok)A.setLevel(slug,3,{demonstratedAt:A.nowISO()});A.event("exercise_attempt",{slug,correct:ok});return;
    }
    if((el=e.target.closest("[data-lab-answer]"))){
      const box=el.closest("[data-lab-q]"),slug=box.dataset.labRoot,ok=Number(el.dataset.labAnswer)===Number(el.dataset.correct),lab=A.DATA.labs?.[slug],qi=Number(box.dataset.labQ);
      A.setLevel(slug,2,{practicedAt:A.nowISO()});box.querySelectorAll("[data-lab-answer]").forEach(b=>b.classList.remove("correct","wrong"));el.classList.add(ok?"correct":"wrong");box.querySelector(".feedback").textContent=ok?(lab?.questions?.[qi]?.feedback||"Correto."):"Tente novamente antes de avançar.";if(ok)box.dataset.solved="1";const all=box.parentElement.querySelectorAll("[data-lab-q]").length,solved=box.parentElement.querySelectorAll('[data-solved="1"]').length;if(all&&all===solved)A.setLevel(slug,3,{demonstratedAt:A.nowISO()});A.event("exercise_attempt",{slug,correct:ok});return;
    }
    if((el=e.target.closest("[data-assess-answer]"))){const q=el.closest("[data-assess-q]");q.querySelectorAll("[data-assess-answer]").forEach(b=>b.classList.remove("selected"));el.classList.add("selected");return}
    if((el=e.target.closest("[data-finish-assessment]"))){
      const a=A.PRODUCT.assessment||{questions:[]},answers=[];let score=0,complete=true;
      a.questions.forEach((q,i)=>{const b=document.querySelector('[data-assess-q="'+i+'"] .selected');if(!b){complete=false;return}const ans=Number(b.dataset.assessAnswer);answers[i]=ans;if(ans===q.answer)score++});
      const out=document.getElementById("assessmentResult");if(!complete){out.innerHTML=C.callout("Falta responder","Responda todas as questões antes de calcular o resultado.","amber");return}
      A.state.assessment={score,answers,at:A.nowISO()};A.save();A.event("assessment",{score});
      const label=score<=2?"Comece pelos fundamentos e siga a trilha em ordem.":score<=4?"Você já possui boa base; formalize critérios e pratique.":"Base forte: priorize aplicação, casos e diagnóstico, sem pular a formalização.";
      out.innerHTML=C.callout(score+" de "+a.questions.length+" corretas",label,"green");return;
    }
    if((el=e.target.closest("[data-review-answer]"))){
      const box=el.closest("[data-review]"),slug=box.dataset.review,ok=Number(el.dataset.reviewAnswer)===Number(el.dataset.correct),c=A.competency(slug);
      box.querySelectorAll("[data-review-answer]").forEach(b=>b.classList.remove("correct","wrong"));el.classList.add(ok?"correct":"wrong");
      if(ok){c.reviewRound=(c.reviewRound||0)+1;c.reviewDue=A.addDays(c.reviewRound===1?30:90);A.save();box.querySelector(".feedback").textContent="Correto. Próxima revisão agendada."}else box.querySelector(".feedback").textContent="Revise o conteúdo e tente novamente.";
      A.event("review_attempt",{slug,correct:ok});return;
    }
    if((el=e.target.closest("[data-lib-filter]"))){document.querySelectorAll("[data-lib-filter]").forEach(b=>b.classList.remove("active"));el.classList.add("active");filterLibrary();return}
    if((el=e.target.closest("[data-favorite]"))){const on=A.toggleFavorite(el.dataset.favorite);el.textContent=on?"★ Salvo":"☆ Salvar";return}
    if((el=e.target.closest("[data-content-feedback]"))){A.event("content_feedback",{slug:el.dataset.feedbackSlug,value:el.dataset.contentFeedback});const box=el.closest(".content-feedback");if(box)box.innerHTML='<strong>Obrigado pelo feedback.</strong><p>A resposta foi registrada neste navegador.</p>';return}
  });
  document.addEventListener("input",e=>{if(e.target.matches("[data-lib-search]"))filterLibrary()});
})();