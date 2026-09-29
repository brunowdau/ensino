(function(){
 "use strict";const A=window.ALT;A.pages=A.pages||{};
 function groups(){
  const map={};A.MODEL.competencies.forEach(c=>(map[c.group]??=[]).push(c));
  return map;
 }
 function quickRefs(slug,d){
  const resources=[];
  const lib=A.PRODUCT.library?.find(x=>x.slug===slug);
  if(lib)resources.push('<div class="context-tool"><strong>'+A.esc(lib.format)+'</strong><span>Consulta rápida durante o trabalho.</span><a href="#learn/'+slug+'?tab=reference">Abrir →</a></div>');
  resources.push('<div class="context-tool"><strong>Praticar</strong><span>Treine com feedback antes da demonstração.</span><a href="#practice/'+slug+'?mode=practice">Praticar →</a></div>');
  resources.push('<div class="context-tool"><strong>Demonstrar</strong><span>Avaliação sem feedback imediato.</span><a href="#practice/'+slug+'?mode=demo">Demonstrar →</a></div>');resources.push('<div class="context-tool"><strong>Salvar consulta</strong><span>'+(A.isFavorite(slug)?'Já está nos seus favoritos.':'Guarde este tema para acesso rápido.')+'</span><button class="text-link" type="button" data-favorite="'+slug+'">'+(A.isFavorite(slug)?'★ Salvo':'☆ Salvar')+'</button></div>');
  return '<div class="context-tools">'+resources.join("")+'</div>';
 }
 function reference(slug,d){
  const lib=A.PRODUCT.library?.find(x=>x.slug===slug);
  const format=lib?.format||"Lean Card";
  let body='<span class="badge purple">'+A.esc(format)+'</span><h2 style="margin-top:8px">'+A.esc(d.title)+'</h2><p>'+A.esc(d.inOneSentence||d.summary||"")+'</p>';
  if(format==="Checklist")body+=A.quick((d.finishCriteria||d.steps||d.quick||[]).map(x=>Array.isArray(x)?x[0]:x));
  else if(format==="Indicador")body+=(d.formula?'<div class="callout green"><strong>Fórmula</strong><p>'+A.esc(d.formula)+'</p></div>':'')+A.quick((d.interpretation||d.analysis||d.quick||[]).map(x=>Array.isArray(x)?x[0]+(x[1]?" — "+x[1]:""):x).slice(0,6));
  else if(format==="Playbook")body+=A.quick((d.analysisSteps||d.steps||d.analysis||d.quick||[]).map(x=>Array.isArray(x)?x[0]+(x[1]?" — "+x[1]:""):x).slice(0,7));
  else body+=A.quick((d.quick||d.outcomes||[]).slice(0,6));
  return body;
 }
 function learnPane(slug,d,tab){
  if(tab==="visual")return '<div class="lesson-pane"><h2>Modelo mental</h2><p>Use a representação visual para entender o mecanismo, não apenas memorizar a definição.</p>'+A.visual(slug)+(d.formula?A.callout("Fórmula",d.formula,"green"):"")+'</div>';
  if(tab==="reference")return '<div class="lesson-pane">'+reference(slug,d)+'</div>';
  const target=A.target(slug);
  let main='<div class="lesson-pane"><h2>O que você precisa dominar</h2><p>'+A.esc(d.summary||"")+'</p><div class="role-target"><strong>'+A.esc(A.role().label)+' · nível esperado: '+A.esc(target)+'</strong><p>'+A.esc(A.roleText(slug))+'</p></div>'+A.quick(d.outcomes||d.quick||[]);
  if(A.role().id==="operacao"){
    if(d.before)main+='<div class="section"><div class="kicker">ANTES DE EXECUTAR</div>'+A.quick(d.before)+'</div>';
    if(d.steps)main+='<div class="section"><div class="kicker">ROTEIRO</div>'+A.quick(d.steps.map(x=>Array.isArray(x)?x[0]+" — "+x[1]:x))+'</div>';
    if(d.validation)main+=A.callout("Validação",d.validation.ok||"Valide antes de concluir.","green");
  }else if(A.role().id==="gestao"){
    if(d.responds)main+='<div class="section"><div class="kicker">PERGUNTAS QUE RESPONDE</div>'+A.quick(d.responds)+'</div>';
    if(d.analysisSteps)main+='<div class="section"><div class="kicker">ROTEIRO DE ANÁLISE</div>'+A.quick(d.analysisSteps.map(x=>x[0]+" — "+x[1]))+'</div>';
    if(d.interpretation)main+='<div class="section"><div class="kicker">INTERPRETAÇÃO</div>'+A.quick(d.interpretation.map(x=>x[0]+" — "+x[1]))+'</div>';
  }else{
    if(d.responds)main+='<div class="section"><div class="kicker">O QUE VOCÊ DEVE COBRAR</div>'+A.quick(d.responds.slice(0,5))+'</div>';
    if(d.nextQuestion)main+=A.callout("Pergunta seguinte",d.nextQuestion,"green");
    const caut=[...(d.notConclude||[]),...(d.doesNotAnswer||[])].slice(0,5);if(caut.length)main+='<div class="section"><div class="kicker">NÃO CONCLUA SOZINHO</div>'+A.quick(caut)+'</div>';
  }
  return main+quickRefs(slug,d)+'</div>';
 }
 A.pages.home=()=>{
  A.meta("Início","Competência aplicada");
  const p=A.progress(),next=A.nextCompetency(),pending=A.pendingApplications(),weak=A.weak(),sust=A.sustainedCount(),due=A.dueReviews();
  const routine=A.MODEL.routines[0],runs=(A.state.routines[routine.id]?.runs||[]).length;
  const queue=[];if(due[0])queue.push(["clock","Revisar "+due[0].title,"Reforço de retenção pendente.","#practice/"+due[0].slug+"?mode=review"]);
  if(weak[0])queue.push(['alert','Reforçar '+weak[0].title,weak[0].c.wrong+' erros registrados.','#practice/'+weak[0].slug+'?mode=practice']);
  if(pending[0])queue.push(['target','Aplicar '+pending[0].title,'Você já demonstrou; falta evidência real.','#evolve/apply/'+pending[0].slug]);
  if(next)queue.push(['learn','Continuar '+next.title,'Próxima competência ainda não demonstrada.','#learn/'+next.slug]);
  A.view.innerHTML='<section class="home-head"><div class="today surface"><div class="kicker">HOJE</div><h1>Aprenda menos. <span style="color:var(--purple)">Use melhor.</span></h1><p>O objetivo não é concluir aulas. É dominar competências, aplicá-las na empresa e sustentar a execução ao longo do tempo.</p><div class="actions today-actions"><a class="btn primary" href="'+(next?'#learn/'+next.slug:'#evolve')+'">Continuar jornada →</a><a class="btn" href="#work">Trabalhar agora</a></div></div><aside class="readiness surface"><div class="kicker">PRONTIDÃO</div><h2>'+p.percent+'% demonstrado</h2><p>'+A.esc(A.role().label)+' · '+p.done+' de '+p.total+' competências.</p><div class="readiness-score"><b>'+sust+'</b><span>competências sustentadas</span></div><div class="progress" style="margin-top:12px;background:rgba(255,255,255,.14)"><span style="width:'+p.percent+'%;background:#fff"></span></div></aside></section>'+
   '<section class="section"><div class="section-head"><div><div class="kicker">PRIORIDADES</div><h2>O que merece sua atenção</h2></div></div><div class="work-queue">'+queue.map(x=>'<a class="queue-card surface" href="'+x[3]+'"><span class="queue-icon">'+A.icon(x[0])+'</span><div><strong>'+A.esc(x[1])+'</strong><p>'+A.esc(x[2])+'</p></div><span>→</span></a>').join("")+'</div></section>'+
   '<section class="section"><div class="metric-row"><div><b>'+p.done+'</b><span>demonstradas</span></div><div><b>'+pending.length+'</b><span>aplicações pendentes</span></div><div><b>'+A.state.applications.length+'</b><span>evidências registradas</span></div><div><b>'+runs+'</b><span>fechamentos registrados</span></div><div><b>'+sust+'</b><span>sustentadas</span></div></div></section>'+
   '<section class="section"><div class="section-head"><div><div class="kicker">USAR NO TRABALHO</div><h2>Não comece por uma aula se você já tem um problema real</h2><p>Diagnostique, execute uma rotina ou simule uma decisão.</p></div><a class="text-link" href="#work">Abrir Trabalhar →</a></div><div class="work-grid">'+
   '<a class="work-card surface" href="#work/diagnose/caixa"><span class="work-card-icon">'+A.icon("cash")+'</span><h3>Meu caixa piorou</h3><p>Organize hipóteses por evidência e veja quais dados ainda faltam.</p><span class="btn">Diagnosticar →</span></a>'+
   '<a class="work-card surface" href="#work/routine/fechamento-mensal"><span class="work-card-icon">'+A.icon("check")+'</span><h3>Fechamento mensal</h3><p>Use o conhecimento durante a execução real da rotina.</p><span class="btn">Executar →</span></a>'+
   '<a class="work-card surface" href="#work/tool/capital"><span class="work-card-icon">'+A.icon("trend")+'</span><h3>Simular capital de giro</h3><p>Teste PMR, PME e PMP antes de tomar uma decisão.</p><span class="btn">Simular →</span></a></div></section>';
 };
 A.pages.learn=(slug)=>{
  A.meta("Aprender","Formação por competência");
  const map=groups();
  if(!slug){
   A.view.innerHTML=A.pageHead("APRENDER","Formação por competência","O currículo muda de profundidade conforme seu papel. Aprenda o suficiente para executar, analisar ou decidir — sem obrigar todos a percorrer o mesmo caminho.")+
    '<div class="practice-grid">'+A.MODEL.competencies.map(c=>{const comp=A.comp(c.slug);return'<a class="practice-card surface" href="#learn/'+c.slug+'"><span class="badge '+(comp.level>=3?"green":"purple")+'">'+A.esc(c.group)+'</span><h3>'+A.esc(c.title)+'</h3><p>Nível esperado para '+A.esc(A.role().label)+': <strong>'+A.esc(A.target(c.slug))+'</strong>.</p><div class="practice-meta"><span>'+A.levelLabel(comp.level||0)+'</span><span>Estudar →</span></div></a>'}).join("")+'</div>';return;
  }
  const d=A.lesson(slug);if(!d){location.hash="#learn";return}
  if(A.comp(slug).level<1)A.setLevel(slug,1,{learnedAt:A.now()});
  const q=new URLSearchParams((location.hash.split("?")[1]||"")),tab=q.get("tab")||"learn";
  A.view.innerHTML='<div class="learn-layout"><aside class="competency-groups">'+Object.entries(map).map(([g,arr])=>'<section class="group-block surface"><h3>'+A.esc(g)+'</h3><div class="group-list">'+arr.map(c=>'<a class="'+(c.slug===slug?"active":"")+'" href="#learn/'+c.slug+'"><span>'+A.esc(c.title)+'</span><b>'+A.levelLabel(A.comp(c.slug).level||0)+'</b></a>').join("")+'</div></section>').join("")+'</aside><article class="learn-main surface"><div class="kicker">COMPETÊNCIA</div><h1>'+A.esc(d.title)+'</h1><p>'+A.esc(d.summary||"")+'</p><div class="lesson-tabs"><button class="'+(tab==="learn"?"active":"")+'" data-learn-tab="learn">Aprender</button><button class="'+(tab==="visual"?"active":"")+'" data-learn-tab="visual">Visualizar</button><button class="'+(tab==="reference"?"active":"")+'" data-learn-tab="reference">Consulta rápida</button></div><div id="lessonPane">'+learnPane(slug,d,tab)+'</div></article></div>';
 };
 document.addEventListener("click",e=>{let b;if((b=e.target.closest("[data-learn-tab]"))){const slug=location.hash.split("/")[1]?.split("?")[0],d=A.lesson(slug);if(!d)return;document.querySelectorAll("[data-learn-tab]").forEach(x=>x.classList.toggle("active",x===b));document.getElementById("lessonPane").innerHTML=learnPane(slug,d,b.dataset.learnTab);return}if((b=e.target.closest("[data-favorite]"))){const on=A.toggleFavorite(b.dataset.favorite);b.textContent=on?"★ Salvo":"☆ Salvar";return}});
})();