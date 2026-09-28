/* Ensino Lean V12 — simuladores com comparação de cenários */
(function(){
  "use strict";
  const A=window.LeanApp,C=A.C;
  A.pages=A.pages||{};

  const defs={
    margem:{
      title:"Margem e desconto",desc:"Compare preço, desconto e custos em três cenários.",better:"higher",
      fields:[
        ["price","Preço de venda (R$)",100,100,105],
        ["cost","Custo unitário (R$)",55,55,55],
        ["freight","Frete unitário (R$)",6,6,6],
        ["commission","Comissão (% venda)",5,5,5],
        ["tax","Impostos (% venda)",8,8,8],
        ["discount","Desconto (%)",0,7,3]
      ],
      calc:x=>{const p=x.price*(1-x.discount/100),mc=p-x.cost-x.freight-p*x.commission/100-p*x.tax/100;return{primary:mc,secondary:p?mc/p*100:0,primaryLabel:"MC unitária",secondaryLabel:"MC%"}}
    },
    equilibrio:{
      title:"Ponto de equilíbrio",desc:"Compare estrutura, margem e lucro alvo.",better:"lower",
      fields:[
        ["fixed","Despesas fixas (R$)",180000,200000,180000],
        ["mcpct","MC% (%)",32,29,36],
        ["target","Lucro alvo (R$)",80000,80000,100000],
        ["revenue","Receita atual (R$)",700000,700000,760000]
      ],
      calc:x=>{const m=x.mcpct/100,pe=m?x.fixed/m:0,goal=m?(x.fixed+x.target)/m:0;return{primary:pe,secondary:goal,primaryLabel:"Ponto de equilíbrio",secondaryLabel:"Receita p/ lucro alvo"}}
    },
    preco:{
      title:"Preço e margem-alvo",desc:"Teste quanto o preço precisa mudar para sustentar uma contribuição desejada.",better:"neutral",
      fields:[
        ["current","Preço atual (R$)",100,100,100],
        ["fixedVar","Custos variáveis em R$",70,72,68],
        ["varPct","Impostos + comissão (%)",12,12,12],
        ["targetMc","MC% desejada",25,25,30]
      ],
      calc:x=>{const den=1-x.varPct/100-x.targetMc/100,needed=den>0?x.fixedVar/den:0;return{primary:needed,secondary:needed-x.current,primaryLabel:"Preço necessário",secondaryLabel:"Diferença vs atual"}}
    },
    capital:{
      title:"Capital de giro",desc:"Compare PMR, PME e PMP e veja o efeito estimado na NCG.",better:"lower",
      fields:[
        ["sales","Receita mensal (R$)",1000000,1000000,1100000],
        ["cmv","CMV / custos variáveis (R$)",600000,600000,650000],
        ["pmr","PMR (dias)",48,38,52],
        ["pme","PME (dias)",38,30,42],
        ["pmp","PMP (dias)",31,35,31]
      ],
      calc:x=>{const ncg=x.sales/30*x.pmr+x.cmv/30*x.pme-x.cmv/30*x.pmp,cycle=x.pme+x.pmr-x.pmp;return{primary:ncg,secondary:cycle,primaryLabel:"NCG estimada",secondaryLabel:"Ciclo (dias)"}}
    },
    fluxo:{
      title:"Fluxo projetado",desc:"Compare três cenários simplificados de seis meses.",better:"higher",
      fields:[
        ["initial","Saldo inicial (R$)",150000,150000,150000],
        ["inflow","Entradas médias/mês (R$)",240000,255000,225000],
        ["outflow","Saídas médias/mês (R$)",245000,245000,255000],
        ["shock","Choque no mês 3 (% entradas)",0,0,-20]
      ],
      calc:x=>{let bal=x.initial,min=bal;for(let i=0;i<6;i++){let inf=x.inflow;if(i===2)inf*=1+x.shock/100;bal+=inf-x.outflow;min=Math.min(min,bal)}return{primary:min,secondary:bal,primaryLabel:"Menor saldo",secondaryLabel:"Saldo final"}}
    }
  };

  const scenarios=[["base","Atual"],["a","Cenário A"],["b","Cenário B"]];
  function defaultValue(field,scenarioIndex){return field[2+scenarioIndex]}
  function matrix(def){
    return'<div class="scenario-matrix"><div class="scenario-row head"><div>Premissa</div>'+scenarios.map(s=>'<div>'+s[1]+'</div>').join("")+'</div>'+def.fields.map(f=>'<div class="scenario-row"><label>'+f[1]+'</label>'+scenarios.map((s,i)=>'<input type="number" step="any" data-sim-field="'+f[0]+'" data-sim-scenario="'+s[0]+'" value="'+defaultValue(f,i)+'">').join("")+'</div>').join("")+'</div>';
  }
  function read(def,scenario){
    const o={};def.fields.forEach(f=>{o[f[0]]=Number(document.querySelector('[data-sim-field="'+f[0]+'"][data-sim-scenario="'+scenario+'"]')?.value||0)});return o;
  }
  function formatMetric(def,key,v){
    if(def===defs.capital&&key==="secondary")return A.num(v,0)+" dias";
    if(def===defs.margem&&key==="secondary")return A.pct(v);
    return A.money(v);
  }
  function recalc(id){
    const def=defs[id],out=document.getElementById("scenarioResults");if(!def||!out)return;
    const vals=scenarios.map(s=>def.calc(read(def,s[0]))),base=vals[0];
    out.innerHTML='<div class="scenario-results">'+vals.map((v,i)=>{const delta=i===0?0:v.primary-base.primary;const good=i===0?false:(def.better==="higher"?delta>0:def.better==="lower"?delta<0:false),bad=i===0?false:(def.better==="higher"?delta<0:def.better==="lower"?delta>0:false);return'<div class="scenario-result +(i===0?"base":"")+'"><span class="badge '+(i===0?"teal":"purple")+'">'+scenarios[i][1]+'</span><strong>'+formatMetric(def,"primary",v.primary)+'</strong><small>'+v.primaryLabel+'</small><div class="secondary"><b>'+formatMetric(def,"secondary",v.secondary)+'</b><span>'+v.secondaryLabel+'</span></div>'+(i?'<div class="delta '+(good?"good":bad?"bad":"neutral")+'">Δ '+A.money(delta)+' vs Atual</div>':'<div class="delta neutral">Base de comparação</div>')+'</div>'}).join("")+'</div>'+insight(id,vals);
  }
  function insight(id,v){
    const b=v[0],a=v[1],c=v[2];let t="";
    if(id==="margem")t="Compare a contribuição unitária e percentual. Desconto só faz sentido se o volume adicional plausível compensar a perda econômica.";
    if(id==="equilibrio")t="Margem menor ou estrutura maior elevam a receita necessária. Use o cenário para testar a robustez da meta.";
    if(id==="preco")t="O preço calculado é referência econômica. Mercado, mix, capacidade e estratégia ainda precisam ser validados.";
    if(id==="capital")t="NCG e ciclo mostram quanto capital a operação tende a exigir. Reduzir prazo ou estoque libera caixa; crescimento pode fazer o oposto.";
    if(id==="fluxo")t="Observe o menor saldo, não apenas o saldo final. A antecedência do vale define quanto tempo a gestão tem para agir.";
    return'<div class="sim-insight"><strong>Leitura gerencial</strong><p>'+t+'</p></div>';
  }

  A.pages.simulators=id=>{
    A.meta("Simuladores","Comparação de cenários");
    if(!id){
      A.view.innerHTML=C.pageHead("EXPERIMENTAR","Simuladores","A V12 compara Atual, Cenário A e Cenário B para ensinar sensibilidade e decisão — não apenas produzir um número.")+'<div class="sim-list-v12">'+Object.entries(defs).map(([k,d])=>'<a class="sim-card-v12 surface" href="#simulators/'+k+'"><span class="sim-icon">'+A.icon(k==="capital"?"cash":k==="fluxo"?"chart":k==="preco"?"target":"trend")+'</span><div><h3>'+d.title+'</h3><p>'+d.desc+'</p></div><span>→</span></a>').join("")+'</div>';return;
    }
    const def=defs[id];if(!def){location.hash="#simulators";return}
    A.view.innerHTML=C.pageHead("SIMULADOR",def.title,def.desc,'<a class="btn" href="#simulators">Todos os simuladores</a>')+'<div class="simulator-v12"><section class="sim-form-v12 surface"><div class="kicker">PREMISSAS</div><h2>Atual x Cenários</h2><p>Edite qualquer célula. O objetivo é entender quais variáveis mudam a decisão.</p>'+matrix(def)+'<div class="assumptions">Os cálculos são didáticos e dependem das premissas informadas. Para decisões reais, valide o critério com os dados da empresa.</div></section><aside class="sim-output-v12 surface"><div class="kicker">COMPARAÇÃO</div><h2>Impactos calculados</h2><div id="scenarioResults"></div></aside></div>';
    recalc(id);
  };

  document.addEventListener("input",e=>{if(e.target.matches("[data-sim-field]"))recalc(location.hash.split("/")[1])});
})();