(function(){
 "use strict";const A=window.ALT;A.pages=A.pages||{};let session=null;
 function normalizeContentExercise(slug){
  const e=A.lesson(slug)?.exercise;if(!e?.options)return null;return{type:"single",q:e.q,options:e.options,answer:e.answer,feedback:e.feedback||"Revise a lógica da competência."};
 }
 function bank(slug,mode){
  const own=A.MODEL.practice?.[slug]||[];
  if(mode==="practice")return own.length?[own[0]]:[normalizeContentExercise(slug)].filter(Boolean);
  const demo=[];const ce=normalizeContentExercise(slug);if(ce)demo.push(ce);
  if(own[1])demo.push(own[1]);else if(own[0])demo.push(own[0]);
  return demo.slice(0,2);
 }
 function renderQuestion(q,i,mode,answers){
  const saved=answers?.[i];
  let input="";
  if(q.type==="single"){
    input='<div class="answers">'+q.options.map((o,oi)=>'<button type="button" data-q-single="'+oi+'" data-q-index="'+i+'" class="'+(saved===oi?"selected":"")+'">'+A.esc(o)+'</button>').join("")+'</div>';
  }else if(q.type==="number"){
    input='<div class="number-answer"><input type="number" step="any" data-q-number data-q-index="'+i+'" value="'+(saved??"")+'" placeholder="Digite o valor"><span class="btn" style="cursor:default">valor numérico</span></div>';
  }else if(q.type==="classify"){
    input='<div class="classify-list">'+q.items.map((it,ii)=>'<div class="classify-item"><strong>'+A.esc(it[0])+'</strong><select data-q-classify="'+ii+'" data-q-index="'+i+'"><option value="">Selecione...</option>'+q.options.map(o=>'<option '+(saved?.[ii]===o?"selected":"")+'>'+A.esc(o)+'</option>').join("")+'</select></div>').join("")+'</div>';
  }else if(q.type==="order"){
    const order=saved||q.items.map((_,ii)=>ii);
    input='<div class="order-list" data-order-root="'+i+'">'+order.map((idx,pos)=>'<div class="order-item" data-order-id="'+idx+'"><b>'+(pos+1)+'</b><span>'+A.esc(q.items[idx])+'</span><div><button type="button" data-order-up '+(pos===0?"disabled":"")+' data-q-index="'+i+'">↑</button><button type="button" data-order-down '+(pos===order.length-1?"disabled":"")+' data-q-index="'+i+'">↓</button></div></div>').join("")+'</div>';
  }
  return'<div class="attempt" data-question="'+i+'"><span class="badge '+(mode==="demo"?"purple":"teal")+'">'+(mode==="demo"?"Demonstração":"Prática")+' '+(i+1)+'</span><h2>'+A.esc(q.q)+'</h2>'+input+'<div class="feedback" id="fb'+i+'" aria-live="polite"></div></div>';
 }
 function getAnswer(q,i){
  if(q.type==="single"){const b=document.querySelector('[data-question="'+i+'"] .selected');return b?Number(b.dataset.qSingle):null}
  if(q.type==="number"){const v=document.querySelector('[data-q-number][data-q-index="'+i+'"]')?.value;return v===""||v==null?null:Number(v)}
  if(q.type==="classify")return [...document.querySelectorAll('[data-q-classify][data-q-index="'+i+'"]')].map(s=>s.value);
  if(q.type==="order")return [...document.querySelectorAll('[data-order-root="'+i+'"] .order-item')].map(x=>Number(x.dataset.orderId));
 }
 function correct(q,a){
  if(a==null)return false;
  if(q.type==="single")return a===q.answer;
  if(q.type==="number")return Math.abs(Number(a)-Number(q.answer))<=Number(q.tolerance||0);
  if(q.type==="classify")return q.items.every((it,i)=>a[i]===it[1]);
  if(q.type==="order")return a.every((v,i)=>v===i);
  return false;
 }
 function practicePage(slug,mode){
  const c=A.MODEL.competencies.find(x=>x.slug===slug),d=A.lesson(slug);if(!c||!d){location.hash="#practice";return}
  const qs=bank(slug,mode),comp=A.comp(slug);session={slug,mode,qs,answers:{},done:false};
  A.meta(mode==="demo"?"Demonstrar":"Praticar",c.title);
  const side=mode==="practice"?'<h3>Prática com feedback</h3><p>Erre à vontade. O objetivo é aprender o raciocínio antes da avaliação.</p><div class="callout green"><strong>Regra</strong><p>O feedback aparece após cada tentativa. Esta etapa não prova domínio.</p></div>':'<h3>Demonstração</h3><p>Responda todas as questões antes de receber o resultado.</p><div class="demo-lock"><strong>Sem feedback imediato.</strong><br>Você precisa acertar todas as aplicações para demonstrar domínio.</div>';
  A.view.innerHTML='<div class="practice-shell"><section class="practice-main surface"><div class="kicker">'+(mode==="demo"?"AVALIAÇÃO":"TREINO")+'</div><h1>'+A.esc(c.title)+'</h1><p>Nível exigido para '+A.esc(A.role().label)+': <strong>'+A.esc(A.target(slug))+'</strong>.</p><div id="practiceQuestions">'+qs.map((q,i)=>renderQuestion(q,i,mode,{})).join("")+'</div><div class="actions" style="margin-top:18px">'+(mode==="practice"?'<button class="btn primary" data-submit-practice>Verificar prática</button><a class="btn" href="#practice/'+slug+'?mode=demo">Ir para demonstração →</a>':'<button class="btn primary" data-submit-demo>Enviar demonstração</button>')+'<a class="btn" href="#learn/'+slug+'">Rever conteúdo</a></div><div id="practiceResult"></div></section><aside class="practice-side surface">'+side+'<div class="section"><div class="kicker">STATUS</div><h3>'+A.levelLabel(comp.level||0)+'</h3><div class="progress" style="margin-top:8px"><span style="width:'+Math.round((comp.level||0)/6*100)+'%"></span></div></div></aside></div>';
 }
 function caseCards(){
  return A.MODEL.cases.map(c=>'<article class="case-card surface"><span class="case-mark">'+A.esc(c.initials)+'</span><span class="badge teal" style="align-self:flex-start;margin-top:9px">'+A.esc(c.sector)+'</span><h3>'+A.esc(c.title)+'</h3><p>'+A.esc(c.premise)+'</p><a class="btn primary" href="#practice/case/'+c.id+'">Abrir caso →</a></article>').join("");
 }
 A.pages.practice=(slug,sub)=>{
  if(sub==="case"){renderCase(slug);return}
  A.meta("Praticar","Laboratório de gestão");
  if(!slug){
    A.view.innerHTML=A.pageHead("PRATICAR","Laboratório de gestão","Treine com feedback, demonstre competência sem ajuda e enfrente casos que incluem dados incompletos, consequências e decisões sequenciais.")+
      '<section class="section"><div class="section-head"><div><div class="kicker">COMPETÊNCIAS</div><h2>Prática e demonstração</h2></div></div><div class="practice-grid">'+A.MODEL.competencies.map(c=>{const comp=A.comp(c.slug);return'<article class="practice-card surface"><span class="badge '+(comp.demoPass?"green":comp.practicePass?"teal":"purple")+'">'+A.esc(c.group)+'</span><h3>'+A.esc(c.title)+'</h3><p>'+(comp.demoPass?"Domínio demonstrado. Próximo passo: aplicação real.":comp.practicePass?"Prática concluída. Faça a demonstração.":"Treine antes de demonstrar.")+'</p><div class="practice-meta"><span>'+A.levelLabel(comp.level||0)+'</span><span>'+A.esc(A.target(c.slug))+'</span></div><div class="actions"><a class="btn" href="#practice/'+c.slug+'?mode=practice">Praticar</a><a class="btn primary" href="#practice/'+c.slug+'?mode=demo">Demonstrar</a></div></article>'}).join("")+'</div></section>'+
      '<section class="section"><div class="section-head"><div><div class="kicker">CASOS</div><h2>Decisão com consequência</h2><p>Os casos não entregam a resposta limpa: você precisa conectar documentos, mecanismos e efeitos posteriores.</p></div></div><div class="case-grid">'+caseCards()+'</div></section>';return;
  }
  const mode=new URLSearchParams((location.hash.split("?")[1]||"")).get("mode")||"practice";practicePage(slug,mode);
 };
 function renderCase(id){
  const c=A.MODEL.cases.find(x=>x.id===id);if(!c){location.hash="#practice";return}
  A.meta(c.title,"Caso prático");
  session={caseId:id,stage:"docs",decision:0,answers:[],score:0,consequenceAnswered:false};
  drawCase(c);
 }
 function drawCase(c){
  let body="";
  if(session.stage==="docs"){
    body='<div class="case-stage"><div class="kicker">1 · EVIDÊNCIAS</div><h2 style="font-size:31px">Abra os documentos</h2><p style="color:var(--muted);margin-top:5px">Nem todo dado tem o mesmo peso. Procure sinais que se conectam.</p><div class="case-docs">'+c.documents.map(d=>'<div class="doc"><h3>'+A.esc(d.title)+'</h3>'+A.table(d.rows,d.headers)+'</div>').join("")+'</div><button class="btn primary" data-case-next="decision" style="margin-top:14px">Tomar decisões →</button></div>';
  }else if(session.stage==="decision"){
    const q=c.decisions[session.decision],ans=session.answers[session.decision];
    body='<div class="case-stage"><div class="kicker">2 · DECISÃO '+(session.decision+1)+' DE '+c.decisions.length+'</div><h2 style="font-size:31px">'+A.esc(q.q)+'</h2><div class="answers">'+q.options.map((o,i)=>'<button data-case-answer="'+i+'" class="'+(ans!=null?(ans===i?(i===q.answer?"correct":"wrong"):""):"")+'" '+(ans!=null?"disabled":"")+'>'+A.esc(o)+'</button>').join("")+'</div><div class="feedback">'+(ans!=null?A.esc(q.impact):"")+'</div>'+(ans!=null?'<button class="btn primary" data-case-advance style="margin-top:12px">'+(session.decision<c.decisions.length-1?"Próxima decisão →":"Ver consequência →")+'</button>':'')+'</div>';
  }else{
    const q=c.consequence,ans=session.consequenceAnswer;
    body='<div class="case-stage"><div class="consequence"><div class="kicker">3 · CONSEQUÊNCIA</div><h3>'+A.esc(q.title)+'</h3><div class="consequence-metrics">'+q.metrics.map(m=>'<div><span>'+A.esc(m[0])+'</span><b>'+A.esc(m[1])+'</b></div>').join("")+'</div></div><div class="attempt"><h2>'+A.esc(q.q)+'</h2><div class="answers">'+q.options.map((o,i)=>'<button data-consequence-answer="'+i+'" class="'+(ans!=null?(ans===i?(i===q.answer?"correct":"wrong"):""):"")+'" '+(ans!=null?"disabled":"")+'>'+A.esc(o)+'</button>').join("")+'</div><div class="feedback">'+(ans!=null?(ans===q.answer?"A decisão considera o efeito posterior e revê a hipótese quando os dados mudam.":"Revise o mecanismo e o impacto após a decisão."):"")+'</div></div>'+(ans!=null?'<div class="actions"><button class="btn" data-case-restart>Refazer caso</button><a class="btn primary" href="#practice">Outros casos →</a></div>':'')+'</div>';
  }
  A.view.innerHTML='<section class="case-shell surface"><span class="badge teal">'+A.esc(c.sector)+'</span><h1>'+A.esc(c.title)+'</h1><p>'+A.esc(c.premise)+'</p>'+body+'</section>';
 }
 document.addEventListener("click",e=>{
  let b;
  if((b=e.target.closest("[data-q-single]"))){const root=b.closest("[data-question]");root.querySelectorAll("[data-q-single]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");return}
  if((b=e.target.closest("[data-order-up],[data-order-down]"))){const item=b.closest(".order-item"),root=item.parentElement;if(b.hasAttribute("data-order-up")&&item.previousElementSibling)root.insertBefore(item,item.previousElementSibling);if(b.hasAttribute("data-order-down")&&item.nextElementSibling)root.insertBefore(item.nextElementSibling,item);[...root.children].forEach((x,i)=>x.querySelector("b").textContent=i+1);return}
  if((b=e.target.closest("[data-submit-practice]"))){
    const q=session.qs[0],a=getAnswer(q,0),ok=correct(q,a),fb=document.getElementById("fb0");fb.textContent=ok?"Correto. A prática está concluída.":"Ainda não. Use o conteúdo e tente novamente.";if(ok){A.setLevel(session.slug,2,{practicePass:true,practicedAt:A.now()});A.event("practice_pass",{slug:session.slug})}else{A.comp(session.slug).wrong++;A.save();A.event("practice_fail",{slug:session.slug})}return;
  }
  if((b=e.target.closest("[data-submit-demo]"))){
    let complete=true,all=true;session.qs.forEach((q,i)=>{const a=getAnswer(q,i);if(a==null||(Array.isArray(a)&&a.some(x=>!x))){complete=false;return}if(!correct(q,a))all=false});
    const out=document.getElementById("practiceResult");if(!complete){out.innerHTML=A.callout("Falta responder","Complete todas as aplicações antes de enviar.","amber");return}
    if(all){A.setLevel(session.slug,3,{demoPass:true,demonstratedAt:A.now()});A.event("demo_pass",{slug:session.slug});out.innerHTML=A.callout("Competência demonstrada","Você respondeu corretamente sem feedback imediato. Próximo passo: aplicar na empresa.","green")+'<div class="actions" style="margin-top:10px"><a class="btn primary" href="#evolve/apply/'+session.slug+'">Registrar aplicação real →</a></div>'}
    else{A.comp(session.slug).wrong++;A.save();A.event("demo_fail",{slug:session.slug});out.innerHTML=A.callout("Ainda não demonstrado","A avaliação terminou com uma ou mais respostas incorretas. Volte à prática e tente uma nova demonstração.","amber")+'<div class="actions" style="margin-top:10px"><a class="btn" href="#practice/'+session.slug+'?mode=practice">Voltar à prática</a></div>'}return;
  }
  if((b=e.target.closest("[data-case-next]"))){session.stage=b.dataset.caseNext;drawCase(A.MODEL.cases.find(x=>x.id===session.caseId));return}
  if((b=e.target.closest("[data-case-answer]"))){const c=A.MODEL.cases.find(x=>x.id===session.caseId),q=c.decisions[session.decision],v=Number(b.dataset.caseAnswer);if(session.answers[session.decision]!=null)return;session.answers[session.decision]=v;if(v===q.answer)session.score++;A.event("case_decision",{case:session.caseId,correct:v===q.answer});drawCase(c);return}
  if((b=e.target.closest("[data-case-advance]"))){const c=A.MODEL.cases.find(x=>x.id===session.caseId);if(session.decision<c.decisions.length-1)session.decision++;else session.stage="consequence";drawCase(c);return}
  if((b=e.target.closest("[data-consequence-answer]"))){const c=A.MODEL.cases.find(x=>x.id===session.caseId),v=Number(b.dataset.consequenceAnswer);session.consequenceAnswer=v;A.event("case_consequence",{case:session.caseId,correct:v===c.consequence.answer});drawCase(c);return}
  if((b=e.target.closest("[data-case-restart]"))){renderCase(session.caseId);return}
 });
})();