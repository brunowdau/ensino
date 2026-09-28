/* Ensino Lean V12 — componentes compartilhados e linguagem visual didática */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C={};

  C.pageHead=(kicker,title,desc,actions="")=>'<header class="page-head"><div class="page-head-copy"><div class="kicker">'+kicker+'</div><h1>'+title+'</h1><p>'+desc+'</p></div>'+(actions?'<div class="actions">'+actions+'</div>':'')+'</header>';
  C.quickRows=items=>'<div class="quick-list">'+(items||[]).map(x=>'<div class="quick-row"><i>✓</i><p>'+A.termize(x)+'</p></div>').join("")+'</div>';
  C.listRows=items=>'<div class="quick-list">'+(items||[]).map(x=>'<div class="quick-row"><i>→</i><p>'+A.termize(x)+'</p></div>').join("")+'</div>';
  C.flowRows=items=>'<div class="flow">'+(items||[]).map((x,i)=>{const a=Array.isArray(x)?x:[x,""];return'<div class="flow-row"><b>'+(i+1)+'</b><div><strong>'+A.termize(a[0])+'</strong>'+(a[1]?'<p>'+A.termize(a[1])+'</p>':'')+'</div></div>'}).join("")+'</div>';
  C.table=(rows,headers)=>!rows?.length?"":'<div class="table"><table>'+(headers?'<thead><tr>'+headers.map(h=>'<th>'+A.termize(h)+'</th>').join("")+'</tr></thead>':'')+'<tbody>'+rows.map(r=>'<tr>'+r.map(c=>'<td>'+A.termize(c)+'</td>').join("")+'</tr>').join("")+'</tbody></table></div>';
  C.callout=(label,text,kind="")=>text?'<div class="callout '+kind+'"><strong>'+label+'</strong><p>'+A.termize(text)+'</p></div>':"";
  C.validation=v=>!v?"":'<div class="validation"><div class="ok"><strong>✓ Está correto quando</strong><p>'+A.termize(v.ok||"")+'</p></div><div class="review"><strong>⚠ Revise quando</strong><p>'+A.termize(v.review||"")+'</p></div><div class="bad"><strong>✕ Está errado quando</strong><p>'+A.termize(v.bad||"")+'</p></div></div>';
  C.example=ex=>{
    if(!ex)return"";
    return'<div class="example-sheet"><div class="kicker">EXEMPLO APLICADO</div><h3>'+A.esc(ex.title||"Exemplo")+'</h3>'+(ex.intro?'<p>'+A.termize(ex.intro)+'</p>':'')+(ex.rows?C.table(ex.rows):"")+(ex.insight?C.callout("Como interpretar",ex.insight,"green"):"")+'</div>';
  };
  C.roleFocus=d=>{
    const g=A.roleGuide(d.type)||{};
    return'<div class="role-focus role-'+A.role().id+'"><div class="role-focus-icon">'+A.icon(A.role().id==="operacao"?"layers":A.role().id==="direcao"?"target":"trend")+'</div><div><span>'+A.esc(A.role().label)+'</span><strong>'+A.esc(g.label||"Seu foco")+'</strong><p>'+A.esc(g.text||"")+'</p></div></div>';
  };
  C.roleLens=d=>{
    const r=A.role(),op=d.operator||[],mg=d.manager||[];
    if(r.id==="operacao")return'<div class="role-lens-single"><div class="kicker">PARA SUA FUNÇÃO</div><h3>Execução confiável</h3>'+C.quickRows(op.length?op:["Preserve critério, rastreabilidade e validação do processo."])+'</div>';
    if(r.id==="direcao")return'<div class="role-lens-single decision"><div class="kicker">PARA SUA FUNÇÃO</div><h3>O que cobrar da gestão</h3>'+C.quickRows((mg.length?mg:["Peça evidência, impacto, responsável e próxima decisão."]).slice(0,4))+'</div>';
    return'<div class="role-lens-single"><div class="kicker">PARA SUA FUNÇÃO</div><h3>Análise e gestão</h3>'+C.quickRows(mg.length?mg:["Transforme o dado em investigação e decisão."])+'</div>';
  };
  C.levelStrip=key=>{
    const l=A.competency(key).level||0,n=["Conheceu","Praticou","Demonstrou","Aplicou","Validado"];
    return'<div class="competency-strip">'+n.map((x,i)=>{const lv=i+1;return'<div class="competency-step '+(l>=lv?"done":l+1===lv?"current":"")+'"><span class="dot">'+(l>=lv?"✓":lv)+'</span><div><strong>'+x+'</strong><small>'+(l>=lv?"Concluído":l+1===lv?"Próximo":"Pendente")+'</small></div></div>'}).join("")+'</div>';
  };

  C.visualWrap=(title,body,caption="")=>'<div class="visual-board"><div class="visual-board-head"><span class="kicker">MODELO VISUAL</span><h3>'+A.esc(title)+'</h3></div>'+body+(caption?'<p class="visual-caption">'+A.esc(caption)+'</p>':'')+'</div>';

  const timeline=(labels,vals,classes=[])=>'<div class="timeline-visual">'+labels.map((l,i)=>'<div class="timeline-node '+(classes[i]||"")+'"><span>'+A.esc(l)+'</span><b>'+A.esc(vals[i])+'</b></div>').join('<i>→</i>')+'</div>';

  C.lessonVisual=(slug,d)=>{
    const cfg=A.PRODUCT.visuals?.[slug]||{},k=cfg.kind||d.type,t=cfg.title||d.title;
    let b="";
    if(k==="dual-timeline"){
      b='<div class="split-visual"><div class="visual-lane purple"><span>COMPETÊNCIA</span><strong>SET</strong><p>Venda pertence ao mês do fato econômico.</p>'+timeline(["Venda","DRE"],["SET","SET"])+'</div><div class="visual-lane teal"><span>CAIXA</span><strong>NOV</strong><p>Dinheiro só aparece quando é recebido.</p>'+timeline(["Venda","Recebimento"],["SET","NOV"])+'</div></div>';
    }else if(k==="classification"){
      b='<div class="class-tree"><div class="tree-root">Movimentação</div><div class="tree-branch"><div><span>Natureza</span><b>O que é?</b></div><div><span>Centro</span><b>Onde ocorreu?</b></div><div><span>Competência</span><b>Quando pertence?</b></div></div><div class="tree-result">Plano de contas útil = análise útil</div></div>';
    }else if(k==="pipeline-pay"){
      b='<div class="process-ribbon">'+["Documento","Classificar","Competência","Vencimento","Aprovar","Pagar","Baixar"].map((x,i)=>'<div><b>'+(i+1)+'</b><span>'+x+'</span></div>').join("")+'</div>';
    }else if(k==="aging"){
      b='<div class="aging-visual"><div><span>A vencer</span><b style="height:82%"></b></div><div><span>1–15</span><b style="height:46%"></b></div><div><span>16–30</span><b style="height:30%"></b></div><div class="risk"><span>31–60</span><b style="height:21%"></b></div><div class="risk"><span>60+</span><b style="height:13%"></b></div></div>';
    }else if(k==="reconcile"){
      b='<div class="reconcile-visual"><div class="reconcile-col"><span>BANCO</span><b>10.450</b><b>2.300</b><b>780</b></div><div class="reconcile-match">✓<br>✓<br>?</div><div class="reconcile-col"><span>SISTEMA</span><b>10.450</b><b>2.300</b><b class="warn">—</b></div></div><div class="visual-alert">Diferença não explicada ≠ conciliação concluída</div>';
    }else if(k==="closing-gates"){
      b='<div class="gate-visual">'+["Banco","Pagar","Receber","Classificação","DRE","Análise"].map((x,i)=>'<div class="'+(i<4?"ok":"")+'"><span>'+(i<4?"✓":"→")+'</span><b>'+x+'</b></div>').join("")+'</div>';
    }else if(k==="waterfall"){
      b='<div class="waterfall">'+[["Receita","100","teal"],["Impostos","-8","red"],["Variáveis","-52","orange"],["Estrutura","-31","slate"],["Resultado","9","green"]].map(x=>'<div class="'+x[2]+'"><span>'+x[0]+'</span><b>R$ '+x[1]+'</b></div>').join('<i>→</i>')+'</div>';
    }else if(k==="cash-valley"){
      b='<div class="cash-valley"><div class="cash-line"><i style="left:4%;top:18%"></i><i style="left:24%;top:30%"></i><i class="risk" style="left:45%;top:72%"></i><i style="left:66%;top:46%"></i><i style="left:87%;top:22%"></i><svg viewBox="0 0 100 60" preserveAspectRatio="none"><polyline points="4,12 24,20 45,46 66,29 87,14" fill="none" stroke="currentColor" stroke-width="3"/></svg></div><div class="min-line">saldo mínimo</div><div class="valley-label">vale de caixa</div></div>';
    }else if(k==="timeline-customer"){
      b=timeline(["Venda","Faturamento","Vencimento","Recebimento"],["D0","D+2","D+30","D+48"],["","","","accent"]);
    }else if(k==="timeline-supplier"){
      b=timeline(["Compra","Entrada","Vencimento","Pagamento"],["D0","D+1","D+30","D+31"],["","","","accent"]);
    }else if(k==="inventory-loop"){
      b='<div class="inventory-loop"><div>Comprar</div><i>→</i><div class="big">Estoque<br><b>38 dias</b></div><i>→</i><div>Vender</div><span>capital permanece aqui</span></div>';
    }else if(k==="cycle"){
      b='<div class="cycle-visual"><div class="cycle-track"><span class="stock" style="width:34%">PME 40</span><span class="receive" style="width:42%">PMR 50</span><span class="pay" style="width:29%">PMP 35</span></div><div class="cycle-result">Ciclo Financeiro = <b>55 dias</b></div></div>';
    }else if(k==="working-capital-bridge"){
      b='<div class="wc-bridge"><div class="use"><span>Clientes</span><b>+ 320</b></div><div class="use"><span>Estoque</span><b>+ 250</b></div><div class="source"><span>Fornecedores</span><b>− 210</b></div><div class="equals">=</div><div class="ncg"><span>NCG</span><b>360</b></div></div>';
    }else if(k==="margin-bridge"){
      b='<div class="margin-bridge"><div class="start">R$100<br><span>Receita</span></div><i>−</i><div>R$8<br><span>Impostos</span></div><i>−</i><div>R$52<br><span>Variáveis</span></div><i>=</i><div class="end">R$40<br><span>Contribuição</span></div></div>';
    }else if(k==="break-even"){
      b='<div class="break-even"><div class="be-chart"><span class="line revenue"></span><span class="line cost"></span><i></i></div><div class="be-labels"><span>Prejuízo</span><b>PE</b><span>Lucro</span></div></div>';
    }else if(k==="price-stack"){
      b='<div class="price-stack"><div class="price-total">PREÇO<br><b>R$100</b></div><div class="price-slices"><span class="tax">Impostos 8</span><span class="cost">Custos 52</span><span class="sales">Comissão/Frete 10</span><span class="margin">MC 30</span></div></div>';
    }else if(k==="variance"){
      b='<div class="variance-visual"><div><span>Receita</span><b class="plan" style="height:70%"></b><b class="actual" style="height:78%"></b></div><div><span>MC%</span><b class="plan" style="height:72%"></b><b class="actual bad" style="height:55%"></b></div><div><span>Estrutura</span><b class="plan" style="height:58%"></b><b class="actual" style="height:60%"></b></div></div><div class="variance-legend"><span>■ Orçado</span><span>■ Realizado</span></div>';
    }else if(k==="forecast"){
      b='<div class="forecast-visual"><svg viewBox="0 0 100 55" preserveAspectRatio="none"><polyline points="0,34 18,30 36,25 54,23" class="hist"/><polyline points="54,23 72,21 100,17" class="base"/><polyline points="54,23 72,31 100,39" class="pressure"/><polyline points="54,23 72,15 100,9" class="up"/></svg><div class="forecast-legend"><span>Base</span><span>Pressão</span><span>Oportunidade</span></div></div>';
    }else if(k==="action-chain"){
      b='<div class="action-chain">'+["Evidência","Hipótese","Ação","Responsável","Prazo","Indicador"].map((x,i)=>'<div><b>'+(i+1)+'</b><span>'+x+'</span></div>').join('<i>→</i>')+'</div>';
    }else{
      b='<div class="generic-visual"><span>ENTENDER</span><i>→</i><span>APLICAR</span><i>→</i><span>DECIDIR</span></div>';
    }
    return C.visualWrap(t,b);
  };

  C.masteryStatus=slug=>{
    const c=A.competency(slug),parts=c.demo||{},count=(parts.base?1:0)+(parts.extra?1:0);
    return{count,complete:count>=2};
  };
  C.priorityCard=(icon,title,desc,href,tone="")=>'<a class="priority-card '+tone+'" href="'+href+'"><span class="priority-icon">'+A.icon(icon)+'</span><div><strong>'+A.esc(title)+'</strong><p>'+A.esc(desc)+'</p></div><span class="priority-go">→</span></a>';
})();