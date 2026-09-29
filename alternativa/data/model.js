window.ENSINO_ALT = {
  version:"2.0-alt",
  productName:"Ensino Lean",
  tagline:"Aprender. Praticar. Trabalhar. Evoluir.",
  roles:[
    {id:"operacao",label:"Financeiro operacional",desc:"Executa rotinas, registros, conciliações e fechamento."},
    {id:"gestao",label:"Gestor financeiro",desc:"Valida, interpreta, investiga e coordena ações."},
    {id:"direcao",label:"Direção / sócio",desc:"Prioriza decisões, cobra evidências e acompanha impacto."}
  ],
  roleTargets:{
    "caixa-x-competencia":{operacao:"executar",gestao:"analisar",direcao:"entender"},
    "plano-de-contas":{operacao:"executar",gestao:"analisar",direcao:"entender"},
    "contas-a-pagar":{operacao:"executar",gestao:"validar",direcao:"entender"},
    "contas-a-receber":{operacao:"executar",gestao:"analisar",direcao:"decidir"},
    "conciliacao-bancaria":{operacao:"executar",gestao:"validar",direcao:"entender"},
    "fechamento-financeiro":{operacao:"executar",gestao:"validar",direcao:"decidir"},
    "dre-gerencial":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "fluxo-de-caixa":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "pmr":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "pmp":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "pme":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "ciclo-financeiro":{operacao:"entender",gestao:"analisar",direcao:"decidir"},
    "ncg":{operacao:"entender",gestao:"analisar",direcao:"decidir"},
    "margem-de-contribuicao":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "ponto-de-equilibrio":{operacao:"entender",gestao:"analisar",direcao:"decidir"},
    "precificacao":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "orcado-realizado":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "forecast-financeiro":{operacao:"preparar",gestao:"analisar",direcao:"decidir"},
    "plano-de-acao-gerencial":{operacao:"executar",gestao:"coordenar",direcao:"decidir"}
  },
  competencies:[
    ["caixa-x-competencia","Caixa x Competência","Fundamentos"],
    ["plano-de-contas","Plano de Contas","Fundamentos"],
    ["contas-a-pagar","Contas a Pagar","Rotinas"],
    ["contas-a-receber","Contas a Receber","Rotinas"],
    ["conciliacao-bancaria","Conciliação Bancária","Rotinas"],
    ["fechamento-financeiro","Fechamento Financeiro","Rotinas"],
    ["dre-gerencial","DRE Gerencial","Resultado e Caixa"],
    ["fluxo-de-caixa","Fluxo de Caixa","Resultado e Caixa"],
    ["pmr","PMR","Capital de Giro"],
    ["pmp","PMP","Capital de Giro"],
    ["pme","PME","Capital de Giro"],
    ["ciclo-financeiro","Ciclo Financeiro","Capital de Giro"],
    ["ncg","NCG","Capital de Giro"],
    ["margem-de-contribuicao","Margem de Contribuição","Rentabilidade"],
    ["ponto-de-equilibrio","Ponto de Equilíbrio","Rentabilidade"],
    ["precificacao","Precificação e Desconto","Rentabilidade"],
    ["orcado-realizado","Orçado x Realizado","Planejamento"],
    ["forecast-financeiro","Forecast Financeiro","Planejamento"],
    ["plano-de-acao-gerencial","Plano de Ação Gerencial","Execução"]
  ].map(x=>({slug:x[0],title:x[1],group:x[2]})),
  visualData:{
    "caixa-x-competencia":{kind:"dual-time",data:{competencia:["Venda","SET"],caixa:["Recebimento","NOV"]}},
    "plano-de-contas":{kind:"classification",data:{axes:["Natureza","Centro","Competência"],result:"Análise gerencial"}},
    "contas-a-pagar":{kind:"process",data:{steps:["Documento","Classificar","Competência","Vencimento","Aprovar","Pagar","Baixar"]}},
    "contas-a-receber":{kind:"aging",data:{bands:[["A vencer",72],["1–15",46],["16–30",30],["31–60",20],["60+",12]]}},
    "conciliacao-bancaria":{kind:"match",data:{left:["10.450","2.300","780"],right:["10.450","2.300","—"],message:"Diferença não explicada ≠ conciliação"}},
    "fechamento-financeiro":{kind:"gates",data:{steps:["Bancos","Pagar","Receber","Classificação","DRE","Análise"]}},
    "dre-gerencial":{kind:"waterfall",data:{items:[["Receita",100],["Impostos",-8],["Variáveis",-52],["Estrutura",-31],["Resultado",9]]}},
    "fluxo-de-caixa":{kind:"line",data:{points:[85,75,20,54,77,109],min:50,labels:["Set","Out","Nov","Dez","Jan","Fev"]}},
    "pmr":{kind:"timeline",data:{steps:[["Venda","D0"],["Faturamento","D+2"],["Vencimento","D+30"],["Recebimento","D+48"]]}},
    "pmp":{kind:"timeline",data:{steps:[["Compra","D0"],["Entrada","D+1"],["Vencimento","D+30"],["Pagamento","D+31"]]}},
    "pme":{kind:"loop",data:{days:38,steps:["Comprar","Estoque","Vender"]}},
    "ciclo-financeiro":{kind:"cycle",data:{pme:40,pmr:50,pmp:35,cycle:55}},
    "ncg":{kind:"bridge",data:{clientes:320,estoque:250,fornecedores:210,ncg:360}},
    "margem-de-contribuicao":{kind:"bridge",data:{receita:100,impostos:8,variaveis:52,mc:40}},
    "ponto-de-equilibrio":{kind:"breakeven",data:{fixed:180,mc:30,pe:600}},
    "precificacao":{kind:"stack",data:{price:100,tax:8,cost:52,sales:10,mc:30}},
    "orcado-realizado":{kind:"variance",data:{items:[["Receita",100,110],["MC%",35,29],["Estrutura",270,275]]}},
    "forecast-financeiro":{kind:"forecast",data:{base:[100,103,106],pressure:[100,97,94],opportunity:[100,108,114]}},
    "plano-de-acao-gerencial":{kind:"chain",data:{steps:["Evidência","Hipótese","Ação","Responsável","Prazo","Indicador"]}}
  },
  practice:{
    "caixa-x-competencia":[
      {type:"classify",q:"Classifique cada evento pela lógica predominante.",items:[["Venda realizada em setembro","Competência"],["Recebimento da venda em novembro","Caixa"],["Conta de energia consumida em março","Competência"],["Pagamento da energia em abril","Caixa"]],options:["Competência","Caixa"]},
      {type:"single",q:"Uma venda ocorreu em setembro e foi recebida em novembro. Qual leitura é correta?",options:["DRE em novembro e caixa em setembro","DRE em setembro e caixa em novembro","DRE e caixa em novembro"],answer:1}
    ],
    "plano-de-contas":[
      {type:"classify",q:"Associe cada lançamento à natureza gerencial mais útil.",items:[["Manutenção de máquina","Manutenção"],["Comissão sobre venda","Despesa variável"],["Tarifa bancária","Despesa financeira"],["Compra de matéria-prima","Custo variável"]],options:["Manutenção","Despesa variável","Despesa financeira","Custo variável"]},
      {type:"single",q:"Um gasto foi lançado em 'Diversos'. Qual próxima ação é melhor?",options:["Manter porque o fornecedor está certo","Reclassificar pela natureza econômica","Mover para caixa"],answer:1}
    ],
    "contas-a-pagar":[
      {type:"order",q:"Ordene a rotina de um título a pagar.",items:["Receber documento","Classificar","Definir competência","Validar vencimento","Aprovar","Pagar","Baixar"]},
      {type:"single",q:"Vencimento certo, competência errada. Qual risco?",options:["Só caixa","DRE por período distorcida","Nenhum"],answer:1}
    ],
    "contas-a-receber":[
      {type:"classify",q:"Classifique o status da carteira.",items:[["Título dentro do prazo","A vencer"],["Título vencido há 12 dias","Vencido"],["Renegociação formal assinada","Renegociado"],["Recebido no banco sem baixa no ERP","A conciliar"]],options:["A vencer","Vencido","Renegociado","A conciliar"]},
      {type:"single",q:"Cliente renegociou formalmente. O que fazer?",options:["Apagar histórico","Atualizar com rastreabilidade","Manter vencido para sempre"],answer:1}
    ],
    "conciliacao-bancaria":[
      {type:"single",q:"Banco e sistema batem apenas após ajuste genérico. Está conciliado?",options:["Sim","Não","Só se o valor for pequeno"],answer:1},
      {type:"number",q:"Banco = 128.450 e sistema = 126.980. Qual diferença precisa ser explicada?",answer:1470,tolerance:0}
    ],
    "fechamento-financeiro":[
      {type:"order",q:"Ordene uma sequência mínima de fechamento.",items:["Conciliar bancos","Revisar pagar/receber","Validar classificações","Emitir DRE","Analisar variações","Definir ações"]},
      {type:"single",q:"DRE emitida com bancos divergentes significa:",options:["Mês fechado","Relatório emitido, base ainda não validada","Resultado validado"],answer:1}
    ],
    "dre-gerencial":[
      {type:"single",q:"Receita aumentou, MC% caiu e estrutura ficou estável. O que abrir primeiro?",options:["Margem e drivers","Estrutura","Saldo bancário"],answer:0},
      {type:"number",q:"Receita líquida 500, variáveis 280 e despesas variáveis 40. Qual MC em milhares?",answer:180,tolerance:0},
      {type:"single",q:"Receita +10%, MC% -7 p.p. e estrutura estável. Qual conclusão é mais defensável?",options:["Crescimento automaticamente bom","Qualidade econômica piorou","Cortar estrutura imediatamente"],answer:1}
    ],
    "fluxo-de-caixa":[
      {type:"single",q:"Saldo final positivo, mas mês 2 negativo. Qual foco?",options:["Saldo final","Vale de caixa","Resultado contábil"],answer:1},
      {type:"number",q:"Saldo inicial 100, entradas 80 e saídas 130. Qual saldo final?",answer:50,tolerance:0}
    ],
    "pmr":[
      {type:"number",q:"Receita mensal 900 mil e clientes 1,2 milhão. Aproximando PMR = Clientes ÷ Receita × 30, qual PMR em dias?",answer:40,tolerance:1},
      {type:"single",q:"PMR subiu sem aumento de vencidos. Hipótese prioritária?",options:["Prazo comercial/mix","Inadimplência necessariamente","Erro de estoque"],answer:0}
    ],
    "pmp":[
      {type:"number",q:"Compras/CMV mensal 600 mil e fornecedores 700 mil. PMP aproximado em dias?",answer:35,tolerance:1},
      {type:"single",q:"Pagar mais cedo sem desconto tende a:",options:["Reduzir PMP e pressionar caixa","Aumentar PMP","Não afetar caixa"],answer:0}
    ],
    "pme":[
      {type:"single",q:"Estoque cresce, vendas estáveis e PME sobe. O que isso sugere?",options:["Mais capital parado","Caixa melhorou","Indicador de preço"],answer:0},
      {type:"number",q:"Estoque médio 600 mil e CMV mensal 450 mil. PME aproximado em dias?",answer:40,tolerance:1}
    ],
    "ciclo-financeiro":[
      {type:"number",q:"PME 40, PMR 50, PMP 35. Ciclo financeiro?",answer:55,tolerance:0},
      {type:"single",q:"Aumentar PMP de 35 para 45, mantendo o resto, tende a:",options:["Aumentar ciclo","Reduzir ciclo","Não alterar"],answer:1}
    ],
    "ncg":[
      {type:"number",q:"Clientes 320 + Estoque 250 - Fornecedores 210. NCG?",answer:360,tolerance:0},
      {type:"single",q:"Clientes e estoque crescem, fornecedores estáveis. NCG tende a:",options:["Cair","Subir","Ficar igual"],answer:1}
    ],
    "margem-de-contribuicao":[
      {type:"number",q:"Receita 500, custos variáveis 280 e despesas variáveis 40. MC em milhares?",answer:180,tolerance:0},
      {type:"single",q:"Receita +15%, MC% cai de 38% para 29%. Qual leitura?",options:["Crescimento automaticamente positivo","Qualidade econômica piorou","Margem irrelevante"],answer:1}
    ],
    "ponto-de-equilibrio":[
      {type:"number",q:"Estrutura fixa 180 mil e MC% 30%. PE em milhares?",answer:600,tolerance:1},
      {type:"single",q:"MC% cai e estrutura fica igual. PE tende a:",options:["Subir","Cair","Igual"],answer:0}
    ],
    "precificacao":[
      {type:"number",q:"Preço 100, variáveis em R$ 75. Após desconto de 10%, quanto sobra de contribuição?",answer:15,tolerance:0},
      {type:"single",q:"Depois de medir perda de margem com desconto, qual próxima pergunta?",options:["Volume adicional necessário","Cor da tabela","Receita aumentará por definição"],answer:0}
    ],
    "orcado-realizado":[
      {type:"single",q:"Desvio material por evento único deve ser tratado como:",options:["Mudança estrutural","Pontual, preservando referência","Apagado do realizado"],answer:1},
      {type:"classify",q:"Classifique o tipo de desvio.",items:[["Multa não recorrente","Pontual"],["Receita postergada para o mês seguinte","Timing"],["Custo unitário aumentou permanentemente","Recorrente"]],options:["Pontual","Timing","Recorrente"]}
    ],
    "forecast-financeiro":[
      {type:"single",q:"Nova informação reduz expectativa futura. O que fazer?",options:["Alterar orçamento original","Atualizar forecast e preservar orçamento","Ignorar"],answer:1},
      {type:"single",q:"Forecast de pressão serve principalmente para:",options:["Prever com certeza","Testar premissas adversas e gatilhos","Substituir meta"],answer:1}
    ],
    "plano-de-acao-gerencial":[
      {type:"single",q:"Qual plano é mais completo?",options:["Melhorar PMR","Cobrar clientes","Até 15/10, Ana revisará 20 maiores vencidos; meta reduzir >30 dias em R$80 mil até 31/10"],answer:2},
      {type:"order",q:"Ordene a lógica de uma ação gerencial.",items:["Evidência","Hipótese","Ação","Responsável","Prazo","Indicador"]}
    ]
  },
  routines:[
    {
      id:"fechamento-mensal",title:"Fechamento Mensal Financeiro",cadence:"Mensal",icon:"check",
      desc:"Transforme o fechamento em uma rotina repetível, validada e sustentada.",
      sustainCompetencies:["conciliacao-bancaria","fechamento-financeiro","dre-gerencial","fluxo-de-caixa"],
      tasks:[
        ["bancos","Bancos conciliados","conciliacao-bancaria"],
        ["pagar","Contas a pagar revisadas","contas-a-pagar"],
        ["receber","Contas a receber revisadas","contas-a-receber"],
        ["classificacao","Classificações e competência validadas","caixa-x-competencia"],
        ["dre","DRE emitida e variações explicadas","dre-gerencial"],
        ["fluxo","Fluxo atualizado e vale identificado","fluxo-de-caixa"],
        ["acao","Plano de ação atualizado","plano-de-acao-gerencial"]
      ]
    },
    {
      id:"carteira-semanal",title:"Revisão Semanal da Carteira",cadence:"Semanal",icon:"clock",
      desc:"Mantenha recebimentos, vencidos, renegociações e concentração sob controle.",
      sustainCompetencies:["contas-a-receber","pmr"],
      tasks:[
        ["conciliar","Recebimentos conciliados","contas-a-receber"],
        ["vencidos","Vencidos classificados por causa","contas-a-receber"],
        ["renegociados","Renegociações atualizadas","contas-a-receber"],
        ["concentracao","Maiores exposições revisadas","pmr"],
        ["acao","Ação de cobrança definida","plano-de-acao-gerencial"]
      ]
    },
    {
      id:"reuniao-gerencial",title:"Reunião Gerencial Mensal",cadence:"Mensal",icon:"trend",
      desc:"Conecte DRE, capital de giro, forecast e ação em uma única rotina decisória.",
      sustainCompetencies:["dre-gerencial","ciclo-financeiro","ncg","orcado-realizado","forecast-financeiro","plano-de-acao-gerencial"],
      tasks:[
        ["resultado","DRE e desvios materiais revisados","dre-gerencial"],
        ["margem","Margem e equilíbrio atualizados","margem-de-contribuicao"],
        ["capital","PMR, PME, PMP, ciclo e NCG revisados","ncg"],
        ["orcamento","Orçado x Realizado explicado","orcado-realizado"],
        ["forecast","Forecast atualizado","forecast-financeiro"],
        ["acoes","Top ações com dono e prazo","plano-de-acao-gerencial"]
      ]
    }
  ],
  diagnoses:[
    {
      id:"caixa",title:"Meu caixa piorou",desc:"Separe resultado, capital de giro, investimento e timing.",
      evidence:[
        {id:"dre",q:"A DRE operacional está positiva?",yes:{tag:"resultado",weight:-2},no:{tag:"resultado",weight:3},unknown:{need:"Validar DRE fechada"}},
        {id:"pmr",q:"PMR ou contas a receber aumentaram?",yes:{tag:"capital",weight:3},no:{tag:"capital",weight:-1},unknown:{need:"Calcular evolução de PMR"}},
        {id:"estoque",q:"PME ou estoque aumentaram?",yes:{tag:"capital",weight:3},no:{tag:"capital",weight:-1},unknown:{need:"Validar estoque e PME"}},
        {id:"invest",q:"Houve investimento, dívida ou retirada extraordinária?",yes:{tag:"extraordinario",weight:3},no:{tag:"extraordinario",weight:-1},unknown:{need:"Revisar movimentos não operacionais"}},
        {id:"timing",q:"Existe concentração de pagamentos antes dos recebimentos?",yes:{tag:"timing",weight:2},no:{tag:"timing",weight:0},unknown:{need:"Abrir fluxo projetado"}}
      ],
      hypotheses:[
        {tag:"capital",title:"Capital de giro",links:[["Ciclo Financeiro","#learn/ciclo-financeiro"],["NCG","#learn/ncg"],["Simular capital","#work/tool/capital"]]},
        {tag:"resultado",title:"Resultado operacional",links:[["DRE Gerencial","#learn/dre-gerencial"],["Margem","#learn/margem-de-contribuicao"]]},
        {tag:"extraordinario",title:"Movimentos extraordinários",links:[["Fluxo de Caixa","#learn/fluxo-de-caixa"]]},
        {tag:"timing",title:"Timing financeiro",links:[["Fluxo de Caixa","#learn/fluxo-de-caixa"],["Simular fluxo","#work/tool/fluxo"]]}
      ]
    },
    {
      id:"margem",title:"Vendo mais, mas sobra pouco",desc:"Teste preço, custo, desconto, mix e estrutura.",
      evidence:[
        {id:"receita",q:"A receita aumentou?",yes:{tag:"margem",weight:1},no:{tag:"volume",weight:2},unknown:{need:"Comparar receita por período"}},
        {id:"mc",q:"A MC% caiu?",yes:{tag:"margem",weight:4},no:{tag:"estrutura",weight:1},unknown:{need:"Calcular MC%"}},
        {id:"desconto",q:"Desconto médio aumentou?",yes:{tag:"preco",weight:3},no:{tag:"preco",weight:0},unknown:{need:"Medir desconto médio"}},
        {id:"custo",q:"Custo unitário aumentou?",yes:{tag:"custo",weight:3},no:{tag:"custo",weight:0},unknown:{need:"Abrir custos unitários"}},
        {id:"fixa",q:"Estrutura fixa cresceu mais rápido que receita?",yes:{tag:"estrutura",weight:3},no:{tag:"estrutura",weight:0},unknown:{need:"Comparar estrutura fixa"}}
      ],
      hypotheses:[
        {tag:"margem",title:"Deterioração de margem",links:[["Margem de Contribuição","#learn/margem-de-contribuicao"],["Precificação","#learn/precificacao"]]},
        {tag:"preco",title:"Preço e desconto",links:[["Precificação","#learn/precificacao"],["Simular margem","#work/tool/margem"]]},
        {tag:"custo",title:"Custo variável",links:[["DRE Gerencial","#learn/dre-gerencial"]]},
        {tag:"estrutura",title:"Estrutura fixa",links:[["Ponto de Equilíbrio","#learn/ponto-de-equilibrio"],["Simular equilíbrio","#work/tool/equilibrio"]]},
        {tag:"volume",title:"Volume e receita",links:[["Orçado x Realizado","#learn/orcado-realizado"]]}
      ]
    },
    {
      id:"estoque",title:"Meu estoque está consumindo caixa",desc:"Conecte giro, compras, prazo e necessidade de capital.",
      evidence:[
        {id:"pme",q:"PME aumentou?",yes:{tag:"giro",weight:4},no:{tag:"giro",weight:0},unknown:{need:"Calcular PME"}},
        {id:"venda",q:"Estoque cresceu mais que vendas?",yes:{tag:"excesso",weight:3},no:{tag:"planejamento",weight:1},unknown:{need:"Comparar estoque x vendas"}},
        {id:"pmp",q:"PMP aumentou junto com estoque?",yes:{tag:"financiamento",weight:-1},no:{tag:"financiamento",weight:3},unknown:{need:"Calcular PMP"}}
      ],
      hypotheses:[
        {tag:"giro",title:"Rotação mais lenta",links:[["PME","#learn/pme"],["Ciclo Financeiro","#learn/ciclo-financeiro"]]},
        {tag:"excesso",title:"Estoque acima da demanda",links:[["PME","#learn/pme"],["NCG","#learn/ncg"]]},
        {tag:"financiamento",title:"Crescimento sem financiamento equivalente",links:[["PMP","#learn/pmp"],["NCG","#learn/ncg"],["Simular capital","#work/tool/capital"]]},
        {tag:"planejamento",title:"Estoque estratégico / planejamento",links:[["Forecast","#learn/forecast-financeiro"]]}
      ]
    }
  ],
  cases:[
    {
      id:"horizonte",title:"Indústria Horizonte",sector:"Indústria",initials:"IH",
      premise:"Receita cresceu, resultado continua positivo, mas o caixa caiu fortemente.",
      documents:[
        {title:"DRE comparativa",headers:["Linha","Anterior","Atual"],rows:[["Receita","1,00 mi","1,35 mi"],["MC%","36%","31%"],["Resultado operacional","95 mil","102 mil"]]},
        {title:"Capital de giro",headers:["Indicador","Anterior","Atual"],rows:[["PMR","38","52"],["PME","29","40"],["PMP","41","37"],["Ciclo","26","55"]]},
        {title:"Liquidez",headers:["Indicador","Anterior","Atual"],rows:[["Caixa","380 mil","160 mil"],["NCG","330 mil","540 mil"]]}
      ],
      decisions:[
        {q:"Qual mecanismo merece prioridade?",options:["Estrutura fixa","Capital de giro e margem","Somente receita"],answer:1,impact:"A empresa passou a financiar clientes e estoque por mais tempo enquanto a margem relativa piorou."},
        {q:"A gestão decide aumentar ainda mais o prazo comercial para crescer vendas. O que você faria?",options:["Aprovar sem simular","Simular PMR/NCG e definir limite","Bloquear qualquer venda a prazo"],answer:1,impact:"A decisão precisa quantificar quanto caixa adicional o crescimento exige."}
      ],
      consequence:{title:"Dois meses depois",metrics:[["Receita","+12%"],["PMR","+16 dias"],["NCG","+R$ 240 mil"],["Caixa","-R$ 280 mil"]],q:"Você manteria a política sem ajustes?",options:["Sim","Não, revisaria prazo/mix/limites"],answer:1}
    },
    {
      id:"prisma",title:"Varejo Prisma",sector:"Comércio",initials:"VP",
      premise:"Faturamento sobe com descontos agressivos; margem e giro pioram.",
      documents:[
        {title:"Comercial",headers:["Indicador","Anterior","Atual"],rows:[["Receita","900 mil","1,08 mi"],["Desconto médio","4%","11%"],["Ticket","1.850","1.920"]]},
        {title:"Margem",headers:["Indicador","Anterior","Atual"],rows:[["MC%","34%","27%"],["Frete/Receita","4,2%","5,8%"]]},
        {title:"Estoque",headers:["Indicador","Anterior","Atual"],rows:[["Estoque","280 mil","455 mil"],["PME","31","49"]]}
      ],
      decisions:[
        {q:"Qual conclusão é inadequada?",options:["Receita cresceu","Margem piorou","Crescimento prova que a estratégia funciona"],answer:2,impact:"Receita isolada não prova qualidade econômica."},
        {q:"Qual ferramenta usar antes de repetir a política?",options:["Simular margem/desconto","Apenas saldo bancário","Somente faturamento"],answer:0,impact:"O desconto precisa ser comparado ao volume incremental plausível."}
      ],
      consequence:{title:"Após manter descontos por 60 dias",metrics:[["Receita","+8%"],["MC%","25%"],["PME","54 dias"],["Caixa","-R$ 190 mil"]],q:"Qual foco primeiro?",options:["Mais desconto","Margem + estoque + NCG","Cortar marketing automaticamente"],answer:1}
    },
    {
      id:"atlas",title:"Serviços Atlas",sector:"Serviços",initials:"SA",
      premise:"Resultado estável, prazo de clientes aumenta e concentração cresce.",
      documents:[
        {title:"Carteira",headers:["Indicador","Anterior","Atual"],rows:[["PMR","35","59"],["Vencidos","32 mil","88 mil"],["Clientes >60 dias","3","11"]]},
        {title:"Resultado",headers:["Indicador","Anterior","Atual"],rows:[["Receita","620 mil","645 mil"],["MC%","42%","41%"]]},
        {title:"Concentração",headers:["Indicador","Anterior","Atual"],rows:[["Maior cliente","18%","31%"],["Caixa","180 mil","82 mil"]]}
      ],
      decisions:[
        {q:"O que validar antes de culpar inadimplência?",options:["Carteira, renegociações e prazo comercial","Somente DRE","Somente estoque"],answer:0,impact:"PMR pode subir por política comercial, atraso ou concentração."},
        {q:"Qual risco adicional aparece?",options:["Concentração de cliente","Estoque","PMP alto"],answer:0,impact:"Mais de 30% da receita em um cliente amplifica risco de prazo e negociação."}
      ],
      consequence:{title:"Cliente principal pede +20 dias",metrics:[["Receita preservada","100%"],["PMR estimado","+6 dias"],["Caixa necessário","+R$ 130 mil"]],q:"Decisão adequada?",options:["Aceitar sem condição","Simular impacto e negociar contrapartida/limite","Recusar sempre"],answer:1}
    }
  ],
  tools:[
    {id:"margem",title:"Margem e desconto"},
    {id:"equilibrio",title:"Ponto de equilíbrio"},
    {id:"capital",title:"Capital de giro"},
    {id:"fluxo",title:"Fluxo projetado"}
  ]
};
window.ENSINO_ALT.prerequisites = {
  "plano-de-contas":["caixa-x-competencia"],
  "contas-a-pagar":["plano-de-contas"],
  "contas-a-receber":["plano-de-contas"],
  "conciliacao-bancaria":["contas-a-pagar","contas-a-receber"],
  "fechamento-financeiro":["conciliacao-bancaria"],
  "dre-gerencial":["fechamento-financeiro"],
  "fluxo-de-caixa":["fechamento-financeiro"],
  "pmr":["contas-a-receber"],
  "pmp":["contas-a-pagar"],
  "pme":["fechamento-financeiro"],
  "ciclo-financeiro":["pmr","pmp","pme"],
  "ncg":["ciclo-financeiro"],
  "margem-de-contribuicao":["dre-gerencial"],
  "ponto-de-equilibrio":["margem-de-contribuicao"],
  "precificacao":["margem-de-contribuicao"],
  "orcado-realizado":["dre-gerencial"],
  "forecast-financeiro":["orcado-realizado","fluxo-de-caixa"],
  "plano-de-acao-gerencial":["dre-gerencial"]
};
window.ENSINO_ALT.governance = {
  owner:"Lean Company",
  version:"2.0-alt",
  reviewedAt:"2026-09",
  defaultReviewCycleDays:180,
  status:"Em validação com clientes"
};
