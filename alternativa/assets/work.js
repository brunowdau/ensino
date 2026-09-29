(function(){
 "use strict";const A=window.ALT;A.pages=A.pages||{};let diagSession=null;
 function workTabs(active){return'<div class="work-tabs"><a class="'+(active==="home"?"active":"")+'" href="#work">Visão geral</a><a class="'+(active==="diagnose"?"active":"")+'" href="#work/diagnose/caixa">Diagnosticar</a><a class="'+(active==="routine"?"active":"")+'" href="#work/routine/fechamento-mensal">Rotinas</a><a class="'+(active==="tool"?"active":"")+'" href="#work/tool/capital">Ferramentas</a></div>'}
 A.pages.work=(sub,id)=>{
  if(sub==="diagnose"){renderDiagnosis(id);return}
  if(sub==="routine"){renderRoutine(id);return}
  if(sub==="tool"){renderTool(id);return}
  A.meta("Trabalhar","Use o método durante a execução");
  A.view.innerHTML=A.pageHead("TRABALHAR","Use o Ensino Lean no trabalho real","Diagnostique um problema, execute uma rotina ou teste uma decisão. O conhecimento aparece no contexto em que é necessário.")+workTabs("home")+
   '<section class="section"><div class="section-head"><div><div class="kicker">DIAGNOSTICAR</div><h2>Comece pela evidência, não pela opinião</h2></div></div><div class="work-grid">'+A.MODEL.diagnoses.map(d=>'<a class="work-card surface" href="#work/diagnose/'+d.id+'"><span class="work-card-icon">'+A.icon("target")+'</span><h3>'+A.esc(d.title)+'</h3><p>'+A.esc(d.desc)+'</p><span class="btn">Investigar →</span></a>').join("")+'</div></section>'+
   '<section class="section"><div class="section-head"><div><div class="kicker">EXECUTAR</div><h2>Rotinas Lean</h2><p>O aprendizado vira processo repetível e sustentado.</p></div></div><div class="work-grid">'+A.MODEL.routines.map(r=>'<a class="work-card surface" href="#work/routine/'+r.id+'"><span class="work-card-icon">'+A.icon(r.icon)+'</span><h3>'+A.esc(r.title)+'</h3><p>'+A.esc(r.desc)+'</p><span class="badge teal" style="align-self:flex-start;margin-top:9px">'+A.esc(r.cadence)+'</span><span class="btn">Executar →</span></a>').join("")+'</div></section>'+
   '<section class="section"><div class="section-head"><div><div class="kicker">SIMULAR</div><h2>Ferramentas de decisão</h2></div></div><div class="work-grid">'+A.MODEL.tools.map(t=>'<a class="work-card surface" href="#work/tool/'+t.id+'"><span class="work-card-icon">'+A.icon("trend")+'</span><h3>'+A.esc(t.title)+'</h3><p>Altere premissas e veja o impacto antes de decidir.</p><span class="btn">Simular →</span></a>').join("")+'</div></section>';
 };
 function renderDiagnosis(id){
  const d=A.MODEL.diagnoses.find(x=>x.id===id)||A.MODEL.diagnoses[0];A.meta("Diagnosticar",d.title);
  diagSession={id:d.id,index:0,answers:{},scores:{},missing:[]};drawDiagnosis(d);
 }
 function diagList(active){return'<div class="diag-list">'+A.MODEL.diagnoses.map(d=>'<a class="'+(d.id===active?"active":"")+'" href="#work/diagnose/'+d.id+'"><strong>'+A.esc(d.title)+'</strong><p>'+A.esc(d.desc)+'</p></a>').join("")+'</div>'}
 function drawDiagnosis(d){
  const box=diagSession.index>=d.evidence.length?diagnosisResult(d):diagnosisQuestion(d);
  A.view.innerHTML=A.pageHead("DIAGNOSTICAR",A.esc(d.title),"A ferramenta não entrega uma sentença. Ela organiza evidências, hipóteses, confiança e os dados que ainda faltam.")+workTabs("diagnose")+'<div class="diag-layout"><aside>'+diagList(d.id)+'</aside><section class="diag-main surface">'+box+'</section></div>';
 }
 function diagnosisQuestion(d){
  const q=d.evidence[diagSession.index],p=Math.round(diagSession.index/d.evidence.length*100);
  return'<div class="kicker">EVIDÊNCIA '+(diagSession.index+1)+' DE '+d.evidence.length+'</div><h1>'+A.esc(q.q)+'</h1><p>Responda com base no que está validado. “Não sei” é melhor que assumir.</p><div class="progress" style="margin-top:14px"><span style="width:'+p+'%"></span></div><div class="evidence-options"><button data-evidence-answer="yes"><strong>Sim</strong><span>Existe evidência para isso.</span></button><button data-evidence-answer="no"><strong>Não</strong><span>Existe evidência de que não.</span></button><button data-evidence-answer="unknown"><strong>Não sei</strong><span>Esse dado ainda precisa ser validado.</span></button></div>'+history(d);
 }
 function history(d){
  const arr=Object.entries(diagSession.answers);if(!arr.length)return"";
  return'<div class="section"><div class="kicker">EVIDÊNCIAS REGISTRADAS</div>'+arr.map(([idx,ans])=>'<div style="display:grid;grid-template-columns:24px 1fr auto;gap:8px;padding:7px 0;border-top:1px solid #edf1f3"><span>'+((+idx)+1)+'</span><p style="font-size:10px">'+A.esc(d.evidence[idx].q)+'</p><b style="font-size:9px;color:var(--purple)">'+({yes:"Sim",no:"Não",unknown:"Não sei"})[ans]+'</b></div>').join("")+'</div>';
 }
 function diagnosisResult(d){
  const hyps=d.hypotheses.map(h=>({h,score:diagSession.scores[h.tag]||0})).sort((a,b)=>b.score-a.score);
  const max=Math.max(1,...hyps.map(x=>x.score));
  return'<div class="kicker">LEITURA DAS EVIDÊNCIAS</div><h1>Hipóteses, não conclusões</h1><p>Quanto maior a pontuação, maior a coerência com as respostas informadas. Antes de decidir, valide os dados faltantes.</p><div class="hypothesis-list">'+hyps.map((x,i)=>{const ratio=x.score/max,cls=x.score<=0?"":ratio>=.75?"strong":"medium",label=x.score<=0?"evidência baixa":ratio>=.75?"evidência forte":"evidência moderada";return'<article class="hypothesis"><div class="hypothesis-head"><h3>'+A.esc(x.h.title)+'</h3><span class="confidence '+cls+'">'+label+'</span></div><div class="hypothesis-links">'+(x.h.links||[]).map(l=>'<a href="'+l[1]+'">'+A.esc(l[0])+' →</a>').join("")+'</div></article>'}).join("")+'</div>'+(diagSession.missing.length?'<div class="missing-data"><strong>Dados que ainda faltam validar</strong><ul>'+diagSession.missing.map(x=>'<li>'+A.esc(x)+'</li>').join("")+'</ul></div>':'')+'<div class="actions" style="margin-top:14px"><button class="btn" data-diag-restart>Recomeçar</button>'+(hyps[0]?.h.links?.[0]?'<a class="btn primary" href="'+hyps[0].h.links[0][1]+'">Abrir próxima investigação →</a>':'')+'</div>';
 }
 function renderRoutine(id){
  const r=A.MODEL.routines.find(x=>x.id===id)||A.MODEL.routines[0];A.meta("Rotina",r.title);
  const data=A.state.routines[id]||{runs:[]},runs=data.runs||[],last=runs.at(-1),period=new Date().toLocaleDateString("pt-BR",{month:"2-digit",year:"numeric"});
  A.view.innerHTML=A.pageHead("EXECUTAR",A.esc(r.title),A.esc(r.desc))+workTabs("routine")+'<section class="routine-head"><div class="routine-copy surface"><span class="badge teal">'+A.esc(r.cadence)+'</span><h1>'+A.esc(r.title)+'</h1><p>'+A.esc(r.desc)+'</p><div class="routine-list" data-routine="'+r.id+'">'+r.tasks.map(t=>'<label class="routine-task"><input type="checkbox" data-routine-task="'+t[0]+'"><div><strong>'+A.esc(t[1])+'</strong><span>Competência: '+A.esc(A.title(t[2]))+'</span></div><a href="#learn/'+t[2]+'">Consultar →</a></label>').join("")+'</div><div class="routine-footer"><input data-routine-period value="'+A.esc(period)+'" placeholder="Período / referência"><button class="btn primary" data-complete-routine="'+r.id+'">Registrar rotina concluída</button></div><div id="routineFeedback"></div></div><aside class="routine-status surface"><div class="kicker">SUSTENTAÇÃO</div><h3>'+runs.length+' execução'+(runs.length===1?"":"ões")+' registrada'+(runs.length===1?"":"s")+'</h3><p>Após 3 execuções completas, as competências vinculadas podem atingir “Sustentado”.</p><div class="progress" style="margin-top:13px;background:rgba(255,255,255,.14)"><span style="width:'+Math.min(100,runs.length/3*100)+'%;background:#fff"></span></div>'+(last?'<p style="margin-top:10px">Última: '+A.esc(last.period)+'</p>':'')+'</aside></section>';
 }
 function renderTool(id){
  const tool=A.MODEL.tools.find(x=>x.id===id)||A.MODEL.tools[0];A.meta("Ferramenta",tool.title);
  let fields="";
  if(id==="margem")fields=[["price","Preço",100],["cost","Custos variáveis R$",55],["freight","Frete R$",6],["commission","Comissão %",5],["tax","Impostos %",8],["discount","Desconto %",7]];
  else if(id==="equilibrio")fields=[["fixed","Estrutura fixa",180000],["mcpct","MC %",30],["target","Lucro alvo",60000]];
  else if(id==="capital")fields=[["sales","Receita mensal",1000000],["cmv","CMV mensal",600000],["pmr","PMR dias",48],["pme","PME dias",38],["pmp","PMP dias",31]];
  else fields=[["initial","Saldo inicial",150000],["inflow","Entradas médias",240000],["outflow","Saídas médias",250000],["shock","Choque mês 3 %",-20]];
  A.view.innerHTML=A.pageHead("SIMULAR",A.esc(tool.title),"Use a ferramenta dentro da decisão. O resultado é didático e depende das premissas informadas.")+workTabs("tool")+'<div class="tool-layout"><section class="tool-form surface"><h1>'+A.esc(tool.title)+'</h1><div class="tool-fields">'+fields.map(f=>'<div class="field"><label>'+A.esc(f[1])+'</label><input type="number" step="any" data-tool-field="'+f[0]+'" value="'+f[2]+'"></div>').join("")+'</div><div class="callout amber"><strong>Premissas</strong><p>Valide critérios, base e aplicabilidade antes de usar o número em uma decisão real.</p></div></section><aside class="tool-output surface"><div class="kicker" style="color:#86cbcd">RESULTADO</div><h2>Leitura do cenário</h2><div id="toolResult"></div></aside></div>';calcTool(id);
 }
 function val(k){return Number(document.querySelector('[data-tool-field="'+k+'"]')?.value||0)}
 function calcTool(id){
  const out=document.getElementById("toolResult");if(!out)return;let html="";
  if(id==="margem"){const p=val("price")*(1-val("discount")/100),mc=p-val("cost")-val("freight")-p*val("commission")/100-p*val("tax")/100;html='<div class="tool-result"><div><span>Preço líquido</span><b>'+A.money(p)+'</b></div><div><span>MC unitária</span><b>'+A.money(mc)+'</b></div><div><span>MC%</span><b>'+A.num(p?mc/p*100:0,1)+'%</b></div></div>'}
  else if(id==="equilibrio"){const m=val("mcpct")/100,pe=m?val("fixed")/m:0,goal=m?(val("fixed")+val("target"))/m:0;html='<div class="tool-result"><div><span>Ponto de equilíbrio</span><b>'+A.money(pe)+'</b></div><div><span>Receita p/ lucro alvo</span><b>'+A.money(goal)+'</b></div></div>'}
  else if(id==="capital"){const ncg=val("sales")/30*val("pmr")+val("cmv")/30*val("pme")-val("cmv")/30*val("pmp"),cycle=val("pme")+val("pmr")-val("pmp");html='<div class="tool-result"><div><span>NCG estimada</span><b>'+A.money(ncg)+'</b></div><div><span>Ciclo</span><b>'+A.num(cycle,0)+' dias</b></div></div>'}
  else{let bal=val("initial"),min=bal;for(let i=0;i<6;i++){let inf=val("inflow");if(i===2)inf*=1+val("shock")/100;bal+=inf-val("outflow");min=Math.min(min,bal)}html='<div class="tool-result"><div><span>Menor saldo</span><b>'+A.money(min)+'</b></div><div><span>Saldo final</span><b>'+A.money(bal)+'</b></div></div>'}
  out.innerHTML=html+'<p style="font-size:10px;color:#bdd0d8;margin-top:12px">Use o resultado como insumo de análise, não como decisão automática.</p>';
 }
 document.addEventListener("click",e=>{
  let b;
  if((b=e.target.closest("[data-evidence-answer]"))){const d=A.MODEL.diagnoses.find(x=>x.id===diagSession.id),q=d.evidence[diagSession.index],ans=b.dataset.evidenceAnswer;diagSession.answers[diagSession.index]=ans;const effect=q[ans];if(effect?.tag)diagSession.scores[effect.tag]=(diagSession.scores[effect.tag]||0)+Number(effect.weight||0);if(effect?.need)diagSession.missing.push(effect.need);diagSession.index++;drawDiagnosis(d);return}
  if((b=e.target.closest("[data-diag-restart]"))){renderDiagnosis(diagSession.id);return}
  if((b=e.target.closest("[data-complete-routine]"))){const id=b.dataset.completeRoutine,r=A.MODEL.routines.find(x=>x.id===id),checks=[...document.querySelectorAll("[data-routine-task]")];const missing=checks.filter(x=>!x.checked);const fb=document.getElementById("routineFeedback");if(missing.length){fb.innerHTML=A.callout("Rotina incompleta",missing.length+" etapa(s) ainda precisam ser concluídas.","amber");return}const period=document.querySelector("[data-routine-period]")?.value||new Date().toLocaleDateString("pt-BR");A.state.routines[id]??={runs:[]};A.state.routines[id].runs.push({period,at:A.now(),tasks:checks.map(x=>x.dataset.routineTask)});const count=A.state.routines[id].runs.length;(r.sustainCompetencies||[]).forEach(slug=>{const c=A.comp(slug);if(count>=3&&c.validated)A.setLevel(slug,6,{sustained:true,sustainedAt:A.now()})});A.save();A.event("routine_complete",{id,period});fb.innerHTML=A.callout("Rotina registrada","Execução concluída para "+period+". "+(count>=3?"A recorrência mínima para sustentação foi atingida.":"Faltam "+(3-count)+" execução(ões) para a recorrência mínima."),"green");return}
 });
 document.addEventListener("input",e=>{if(e.target.matches("[data-tool-field]"))calcTool(location.hash.split("/")[2])});
})();