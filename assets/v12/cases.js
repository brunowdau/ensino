/* Ensino Lean V12 — casos práticos em formato de dossier */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C;
  A.pages=A.pages||{};
  let session={id:null,step:"context",q:0,score:0,answered:{}};

  function getCase(id){return (A.PRODUCT.cases||[]).find(x=>x.id===id)}
  function caseList(){
    return'<div class="case-grid-v12">'+(A.PRODUCT.cases||[]).map(c=>'<a class="case-card-v12 surface" href="#cases/'+c.id+'"><div class="case-card-top"><span class="case-mark">'+A.esc(c.initials)+'</span><span class="badge teal">'+A.esc(c.sector)+'</span></div><h3>'+A.esc(c.title)+'</h3><p><strong>'+A.esc(c.challenge)+'</strong></p><p>'+A.esc(c.story)+'</p><div class="case-card-metrics">'+(c.metrics||[]).slice(0,3).map(m=>'<span><b>'+A.esc(m[1])+'</b>'+A.esc(m[0])+'</span>').join("")+'</div><span class="case-go">Abrir dossier →</span></a>').join("")+'</div>';
  }
  function tabs(){
    const stages=[["context","1 · Contexto"],["evidence","2 · Evidências"],["decision","3 · Decisões"],["debrief","4 · Debrief"]];
    return'<div class="dossier-tabs">'+stages.map(s=>'<button type="button" data-case-stage="'+s[0]+'" class="'+(session.step===s[0]?"active":"")+'" '+(s[0]==="debrief"&&Object.keys(session.answered).length<((getCase(session.id)?.questions||[]).length)?"disabled":"")+'>'+s[1]+'</button>').join("")+'</div>';
  }
  function contextView(c){
    return'<section class="dossier-sheet"><div class="dossier-lead"><div><span class="badge teal">'+A.esc(c.sector)+'</span><h2>'+A.esc(c.challenge)+'</h2><p>'+A.esc(c.story)+'</p></div><span class="case-mark big">'+A.esc(c.initials)+'</span></div><div class="case-metrics-v12">'+(c.metrics||[]).map(m=>'<div><span>'+A.esc(m[0])+'</span><b>'+A.esc(m[1])+'</b></div>').join("")+'</div><div class="dossier-instruction"><strong>Sua missão</strong><p>Construa uma hipótese com base em evidências. Não escolha a ação antes de entender o mecanismo que explica o caso.</p></div><button class="btn primary" type="button" data-case-next="evidence">Abrir evidências →</button></section>';
  }
  function evidenceView(c){
    return'<section class="dossier-sheet"><div class="kicker">DOCUMENTOS DO CASO</div><h2>Abra as evidências antes de concluir</h2><p class="lead">Cada documento mostra uma parte do problema. Procure sinais que se conectam entre si.</p><div class="evidence-grid">'+(c.evidence||[]).map((e,i)=>'<article class="evidence-doc"><div class="evidence-doc-head"><span>'+A.esc(e.type)+'</span><b>Documento '+(i+1)+'</b></div><h3>'+A.esc(e.title)+'</h3>'+C.table(e.rows,e.headers)+'</article>').join("")+'</div><div class="actions"><button class="btn" type="button" data-case-prev="context">← Contexto</button><button class="btn primary" type="button" data-case-next="decision">Tomar decisões →</button></div></section>';
  }
  function decisionView(c){
    const qs=c.questions||[],q=qs[session.q],done=Object.keys(session.answered).length;
    if(!q)return debriefView(c);
    const previous=session.answered[session.q];
    return'<section class="dossier-sheet"><div class="decision-progress"><span>Decisão '+(session.q+1)+' de '+qs.length+'</span><div class="progress-track"><span style="width:'+Math.round(done/qs.length*100)+'%"></span></div></div><div class="case-decision"><div class="kicker">LEIA AS EVIDÊNCIAS</div><h2>'+A.esc(q.q)+'</h2><div class="answers case-answers">'+q.options.map((o,i)=>'<button type="button" data-case-answer="'+i+'" data-correct="'+q.answer+'" '+(previous!=null?"disabled":"")+' class="'+(previous!=null?(previous===i?(i===q.answer?"correct":"wrong"):""):"")+'">'+A.esc(o)+'</button>').join("")+'</div><div class="feedback" aria-live="polite">'+(previous!=null?A.esc(previous===q.answer?q.feedback:"Revise os documentos: a evidência ainda não sustenta essa escolha."):"")+'</div></div><div class="actions"><button class="btn" type="button" data-case-prev="evidence">← Rever evidências</button>'+(previous!=null?'<button class="btn primary" type="button" data-case-question-next>'+(session.q<qs.length-1?"Próxima decisão →":"Ver debrief →")+'</button>':'')+'</div></section>';
  }
  function debriefView(c){
    const total=(c.questions||[]).length,score=session.score;
    return'<section class="dossier-sheet"><div class="debrief-score"><span>'+score+'/'+total+'</span><div><div class="kicker">DEBRIEF</div><h2>'+A.esc(c.title)+'</h2><p>'+((score===total)?"Você conectou corretamente as principais evidências do caso.":"Você concluiu o caso. Revise as decisões incorretas e abra os conteúdos relacionados antes de repetir.")+'</p></div></div><div class="debrief-map"><div><strong>1. Evidência</strong><span>O que mudou?</span></div><i>→</i><div><strong>2. Mecanismo</strong><span>O que explica?</span></div><i>→</i><div><strong>3. Investigação</strong><span>O que abrir?</span></div><i>→</i><div><strong>4. Ação</strong><span>O que decidir?</span></div></div><div class="case-links"><strong>Continue estudando</strong>'+(c.links||[]).map(l=>'<a href="'+l[1]+'">'+A.esc(l[0])+' →</a>').join("")+'</div><div class="actions"><button class="btn" type="button" data-case-restart>Refazer caso</button><a class="btn primary" href="#cases">Outros casos →</a></div></section>';
  }
  function body(c){
    if(session.step==="evidence")return evidenceView(c);
    if(session.step==="decision")return decisionView(c);
    if(session.step==="debrief")return debriefView(c);
    return contextView(c);
  }
  function refresh(){
    const c=getCase(session.id),box=document.getElementById("caseWorkspace");if(box)box.innerHTML=tabs()+body(c);
  }

  A.pages.cases=id=>{
    A.meta("Casos práticos","Diagnóstico com evidências");
    if(!id){A.view.innerHTML=C.pageHead("PRATICAR","Casos práticos","Dossiers empresariais fictícios com evidências, decisões sequenciais e debrief. O objetivo é interpretar antes de agir.")+caseList();return}
    const c=getCase(id);if(!c){location.hash="#cases";return}
    if(session.id!==id)session={id,step:"context",q:0,score:0,answered:{}};
    A.view.innerHTML=C.pageHead("CASO PRÁTICO",A.esc(c.title),A.esc(c.challenge),'<a class="btn" href="#cases">Todos os casos</a>')+'<div class="case-dossier surface"><header class="dossier-header"><div><span class="badge teal">'+A.esc(c.sector)+'</span><strong>Dossier empresarial · '+A.esc(c.initials)+'</strong></div><span>Dados fictícios para treinamento</span></header><div id="caseWorkspace">'+tabs()+body(c)+'</div></div>';
  };

  document.addEventListener("click",e=>{
    let el;
    if((el=e.target.closest("[data-case-stage]"))){if(el.disabled)return;session.step=el.dataset.caseStage;refresh();return}
    if((el=e.target.closest("[data-case-next]"))){session.step=el.dataset.caseNext;refresh();return}
    if((el=e.target.closest("[data-case-prev]"))){session.step=el.dataset.casePrev;refresh();return}
    if((el=e.target.closest("[data-case-answer]"))){
      const c=getCase(session.id),q=c.questions[session.q],choice=Number(el.dataset.caseAnswer);if(session.answered[session.q]!=null)return;
      session.answered[session.q]=choice;const ok=choice===q.answer;if(ok)session.score++;
      A.event("case_attempt",{id:session.id,question:session.q,correct:ok});refresh();return;
    }
    if((el=e.target.closest("[data-case-question-next]"))){
      const c=getCase(session.id);if(session.q<(c.questions||[]).length-1){session.q++;session.step="decision"}else session.step="debrief";refresh();return;
    }
    if((el=e.target.closest("[data-case-restart]"))){session={id:session.id,step:"context",q:0,score:0,answered:{}};refresh();return}
  });
})();