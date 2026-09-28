/* Ensino Lean V12 — painel Lean local */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C;
  A.pages=A.pages||{};

  A.pages.consultant=()=>{
    A.meta("Painel Lean","Visão gerencial local");
    const events=A.state.events||[];
    const views=events.filter(e=>e.type==="lesson_view").length;
    const attempts=events.filter(e=>e.type==="exercise_attempt").length;
    const apps=events.filter(e=>e.type==="application").length;
    const validations=events.filter(e=>e.type==="validation").length;
    const searches=A.state.searches||[];
    const items=A.learningItems();
    const weak=items.map(i=>({item:i,c:A.competency(i.slug)})).filter(x=>(x.c.wrong||0)>0).sort((a,b)=>(b.c.wrong||0)-(a.c.wrong||0)).slice(0,6);
    const pending=items.filter(i=>{const l=A.competency(i.slug).level||0;return l===3&&A.DATA.lessons?.[i.slug]}).slice(0,6);
    const due=A.dueReviews();
    const st=A.courseStats();

    const readiness=[
      ["Qualidade da base",["caixa-x-competencia","plano-de-contas","contas-a-pagar","contas-a-receber","conciliacao-bancaria","fechamento-financeiro"]],
      ["Resultado e caixa",["dre-gerencial","fluxo-de-caixa"]],
      ["Capital de giro",["pmr","pmp","pme","ciclo-financeiro","ncg"]],
      ["Rentabilidade e planejamento",["margem-de-contribuicao","ponto-de-equilibrio","precificacao","orcado-realizado","forecast-financeiro","plano-de-acao-gerencial"]]
    ];
    const readinessHtml=readiness.map(r=>{const vals=r[1].map(k=>A.competency(k).level||0),avg=vals.length?vals.reduce((a,b)=>a+b,0)/(vals.length*5)*100:0;return'<div class="readiness-row"><div><strong>'+r[0]+'</strong><span>'+Math.round(avg)+'% de maturidade registrada</span></div><div class="progress-track"><span style="width:'+avg+'%"></span></div></div>'}).join("");
    const recent=events.slice(0,14).map(e=>'<div class="event"><span>'+new Date(e.at).toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})+'</span><strong>'+A.esc(e.type.replace(/_/g," "))+'</strong><small>'+A.esc(e.data.slug||e.data.query||e.data.id||"")+'</small></div>').join("");

    A.view.innerHTML=C.pageHead("VISÃO DO CONSULTOR","Painel Lean — demonstração local","Mostra como a plataforma pode apoiar a consultoria. Nesta fase, os dados representam apenas este navegador.")+
      '<div class="consult-grid"><div class="consult-stat surface"><b>'+st.percent+'%</b><span>domínio demonstrado</span></div><div class="consult-stat surface"><b>'+apps+'</b><span>aplicações registradas</span></div><div class="consult-stat surface"><b>'+validations+'</b><span>validações registradas</span></div><div class="consult-stat surface"><b>'+attempts+'</b><span>tentativas em exercícios</span></div></div>'+
      '<section class="section grid2"><div class="surface consultant-block"><div class="kicker">PRONTIDÃO</div><h2>Mapa de maturidade</h2>'+readinessHtml+'</div><div class="surface consultant-block"><div class="kicker">PRIORIDADES</div><h2>O que merece atenção</h2>'+(weak.length?C.listRows(weak.map(x=>x.item.title+" · "+x.c.wrong+" erro(s)")):C.callout("Sem erros relevantes","Ainda não há padrão de dificuldade registrado.","green"))+(pending.length?'<div class="subsection"><div class="kicker">APLICAÇÃO PENDENTE</div>'+C.listRows(pending.map(x=>x.title))+'</div>':'')+(due.length?'<div class="subsection"><div class="kicker">REVISÕES</div>'+C.listRows(due.map(k=>A.itemTitle(k)))+'</div>':'')+'</div></section>'+
      '<section class="section grid2"><div class="surface consultant-block"><div class="kicker">BUSCAS</div><h2>Dúvidas pesquisadas</h2>'+(searches.length?C.listRows(searches.slice(0,10).map(x=>x.query)):C.callout("Sem buscas","Nenhuma busca registrada ainda.",""))+'</div><div class="surface consultant-block"><div class="kicker">ATIVIDADE</div><h2>Eventos recentes</h2><div class="event-list">'+(recent||'<div class="event"><span>—</span><strong>Sem atividade</strong><small></small></div>')+'</div></div></section>';
  };
})();