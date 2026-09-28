/* Ensino Lean V12 — diagnósticos adaptativos */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C;
  A.pages=A.pages||{};
  let session=null;

  function diagnosisById(id){return (A.PRODUCT.diagnoses||[]).find(x=>x.id===id)||(A.PRODUCT.diagnoses||[])[0]}
  function defaultResult(id){return({caixa:"timing",margem:"mix",estoque:"planejamento",receber:"comercial"})[id]}

  function start(id){
    const d=diagnosisById(id);
    session={id:d.id,index:0,answers:[],result:null};
    renderWorkspace(d);
  }
  function cards(active){
    return'<div class="diagnosis-list">'+(A.PRODUCT.diagnoses||[]).map(x=>'<a class="diagnosis-card '+(x.id===active?"active":"")+'" href="#resolve/'+x.id+'"><span class="problem-icon">'+A.icon(x.icon)+'</span><div><strong>'+A.esc(x.title)+'</strong><p>'+A.esc(x.desc)+'</p></div><span>→</span></a>').join("")+'</div>';
  }
  function questionView(d){
    if(session.result)return resultView(d,session.result);
    const q=d.questions?.[session.index];if(!q){session.result=defaultResult(d.id);return resultView(d,session.result)}
    const total=d.questions.length,progress=Math.round((session.index)/total*100);
    return'<div class="diag-wizard"><div class="diag-progress"><div><span>Etapa '+(session.index+1)+' de até '+total+'</span><b>'+progress+'%</b></div><div class="progress-track"><span style="width:'+progress+'%"></span></div></div><div class="diag-question"><span class="kicker">PERGUNTA '+(session.index+1)+'</span><h2>'+A.esc(q.q)+'</h2><p>Responda com base na situação atual. Se não tiver certeza, use “Não sei” para evitar uma conclusão forçada.</p><div class="diag-answer-grid"><button type="button" data-adaptive-answer="yes"><strong>Sim</strong><span>Essa condição está presente.</span></button><button type="button" data-adaptive-answer="no"><strong>Não</strong><span>Essa condição não está presente.</span></button><button type="button" data-adaptive-answer="unknown"><strong>Não sei</strong><span>Precisamos validar antes.</span></button></div></div>'+historyView(d)+'</div>';
  }
  function historyView(d){
    if(!session.answers.length)return"";
    return'<div class="diag-history"><div class="kicker">CAMINHO PERCORRIDO</div>'+session.answers.map((a,i)=>'<div><span>'+(i+1)+'</span><p>'+A.esc(d.questions[i].q)+'</p><b>'+({yes:"Sim",no:"Não",unknown:"Não sei"})[a]+'</b></div>').join("")+(session.index>0?'<button class="text-button" type="button" data-diag-back>← Voltar uma pergunta</button>':'')+'</div>';
  }
  function resultView(d,key){
    const r=d.results?.[key];if(!r)return'<div class="callout amber"><strong>Resultado não configurado</strong><p>Revise a sequência de respostas.</p></div>';
    A.event("diagnosis_result",{id:d.id,result:key});
    return'<div class="diag-result-v12"><span class="result-signal">'+A.icon("target")+'</span><div class="kicker">FOCO MAIS COERENTE COM AS RESPOSTAS</div><h2>'+A.esc(r.title)+'</h2><p>'+A.esc(r.why)+'</p><div class="diag-evidence"><strong>Como chegamos aqui</strong>'+historyView(d)+'</div><div class="diag-next"><strong>Próximas investigações</strong>'+(r.links||[]).map(l=>'<a href="'+l[1]+'"><span>'+A.esc(l[0])+'</span>→</a>').join("")+'</div><div class="actions"><button class="btn" type="button" data-diag-restart>Recomeçar diagnóstico</button><a class="btn primary" href="'+((r.links||[])[0]?.[1]||"#trails")+'">Abrir primeiro passo →</a></div><p class="diag-disclaimer">O resultado organiza uma hipótese de investigação. Não substitui a validação dos dados nem determina automaticamente a decisão.</p></div>';
  }
  function renderWorkspace(d){
    A.view.innerHTML=C.pageHead("DIAGNOSTICAR","Resolver um problema","Comece pelo sintoma. A V12 mostra uma pergunta por vez e muda o caminho conforme suas respostas.")+'<div class="diagnosis-layout-v12"><aside>'+cards(d.id)+'</aside><section class="diagnosis-work surface"><div class="diagnosis-work-head"><span class="badge teal">Diagnóstico adaptativo</span><h1>'+A.esc(d.title)+'</h1><p>'+A.esc(d.desc)+'</p></div><div id="adaptiveQuestion">'+questionView(d)+'</div></section></div>';
  }
  function refresh(){
    const d=diagnosisById(session.id),box=document.getElementById("adaptiveQuestion");if(box)box.innerHTML=questionView(d);
  }

  A.pages.resolve=id=>{
    const d=diagnosisById(id);
    A.meta("Resolver um problema","Diagnóstico adaptativo");
    start(d.id);
  };

  document.addEventListener("click",e=>{
    let el;
    if((el=e.target.closest("[data-adaptive-answer]"))){
      if(!session)return;
      const d=diagnosisById(session.id),q=d.questions?.[session.index],ans=el.dataset.adaptiveAnswer;
      session.answers[session.index]=ans;
      const next=q?.[ans];
      if(next&&next!=="continue")session.result=next;
      else{
        session.index++;
        if(session.index>=d.questions.length)session.result=defaultResult(d.id);
      }
      refresh();return;
    }
    if((el=e.target.closest("[data-diag-back]"))){
      if(!session||session.index<=0)return;
      session.result=null;session.index--;session.answers=session.answers.slice(0,session.index);refresh();return;
    }
    if((el=e.target.closest("[data-diag-restart]"))){start(session.id);return}
  });
})();