window.ENSINO_V72 = {
  glossary:{
    competencia:{title:'Competência',desc:'Período em que a receita ou despesa pertence economicamente, independentemente da data em que o dinheiro entrou ou saiu.',link:'caixa-x-competencia'},
    caixa:{title:'Caixa',desc:'Momento em que o dinheiro efetivamente entra ou sai das contas da empresa.',link:'fluxo-de-caixa'},
    dre:{title:'DRE',desc:'Demonstração de Resultado. Organiza receitas, custos e despesas de um período para mostrar como o faturamento se transforma em resultado.',link:'dre-gerencial'},
    plano:{title:'Plano de Contas',desc:'Estrutura padronizada usada para classificar receitas, custos e despesas pela natureza econômica.',link:'plano-de-contas'},
    centro:{title:'Centro de Custo',desc:'Identifica qual área, unidade ou responsabilidade consumiu determinado recurso. Responde uma pergunta diferente do plano de contas.',link:'plano-de-contas'},
    conciliacao:{title:'Conciliação Bancária',desc:'Comparação entre o que ocorreu no banco e o que foi registrado no sistema, com investigação de qualquer diferença.',link:'conciliacao-bancaria'},
    inadimplencia:{title:'Inadimplência',desc:'Valores vencidos que ainda não foram recebidos. Não é a mesma coisa que vender com prazo maior.',link:'contas-a-receber'},
    pmr:{title:'PMR — Prazo Médio de Recebimento',desc:'Estimativa de quantos dias, em média, a empresa leva para transformar vendas a prazo em dinheiro recebido.',link:'pmr'},
    pmp:{title:'PMP — Prazo Médio de Pagamento',desc:'Estimativa de quantos dias, em média, a empresa leva para pagar fornecedores operacionais.',link:'pmp'},
    pme:{title:'PME — Prazo Médio de Estoque',desc:'Estimativa de quantos dias, em média, o capital permanece convertido em estoque antes de girar.',link:'pme'},
    ciclo:{title:'Ciclo Financeiro',desc:'Número de dias em que a empresa precisa financiar a própria operação. Uma forma gerencial comum é PME + PMR − PMP.',link:'ciclo-financeiro'},
    ncg:{title:'NCG — Necessidade de Capital de Giro',desc:'Recursos que ficam presos na operação em clientes e estoques, descontado o financiamento operacional dos fornecedores.',link:'ncg'},
    margem:{title:'Margem de Contribuição',desc:'Valor que sobra da receita depois de custos e despesas variáveis e que ajuda a pagar a estrutura fixa e gerar resultado.',link:'dre-gerencial'},
    provisao:{title:'Provisão',desc:'Reconhecimento de um valor esperado no período mesmo quando o documento ou pagamento ainda não ocorreu, conforme critério definido pela empresa.'},
    resultado:{title:'Resultado Operacional',desc:'O que sobra depois de considerar receitas, custos variáveis e estrutura operacional do período.',link:'dre-gerencial'}
  },

  companyCase:{
    name:'Indústria Horizonte',
    description:'Empresa fictícia usada ao longo do Financeiro para mostrar como o mesmo acontecimento aparece em diferentes ferramentas.',
    story:'A empresa cresceu rapidamente. O resultado continuou positivo, mas clientes passaram a pagar mais tarde, o estoque aumentou e fornecedores quase não ampliaram prazo. O caixa começou a ficar pressionado.',
    base:[
      ['Indicador','Antes','Agora'],
      ['Receita mensal','R$ 1,00 mi','R$ 1,35 mi'],
      ['Margem de contribuição','36%','31%'],
      ['Resultado operacional','R$ 110 mil','R$ 150 mil'],
      ['PMR','32 dias','48 dias'],
      ['PME','24 dias','38 dias'],
      ['PMP','30 dias','31 dias'],
      ['Ciclo financeiro','26 dias','55 dias'],
      ['NCG','R$ 330 mil','R$ 540 mil'],
      ['Caixa disponível','R$ 380 mil','R$ 160 mil']
    ]
  },

  financeStages:[
    {title:'Base da informação',desc:'Antes de analisar, aprenda como o dado precisa nascer.',items:[
      {slug:'caixa-x-competencia',title:'Caixa x Competência',kind:'Conceito',why:'Entenda qual mês pertence à DRE e qual data pertence ao caixa.'},
      {slug:'plano-de-contas',title:'Plano de Contas',kind:'Conceito',why:'Classifique pela natureza correta para não distorcer a análise.'}
    ]},
    {title:'Rotina operacional',desc:'Transforme movimentações do dia a dia em uma base confiável.',items:[
      {slug:'contas-a-pagar',title:'Contas a Pagar',kind:'Procedimento',why:'Registre obrigações, vencimentos, pagamentos e competência sem perder rastreabilidade.'},
      {slug:'contas-a-receber',title:'Contas a Receber',kind:'Procedimento',why:'Mantenha a carteira confiável e diferencie prazo comercial de atraso.'},
      {slug:'conciliacao-bancaria',title:'Conciliação Bancária',kind:'Procedimento',why:'Garanta que banco e sistema contem a mesma história.'},
      {slug:'fechamento-financeiro',title:'Fechamento Financeiro',kind:'Procedimento',why:'Valide o mês antes de transformar dado em decisão.'}
    ]},
    {title:'Entender resultado e caixa',desc:'Com a base confiável, interprete o que aconteceu com o negócio e com o dinheiro.',items:[
      {slug:'dre-gerencial',title:'DRE Gerencial',kind:'Análise',why:'Entenda faturamento, margem, estrutura e resultado em sequência.'},
      {slug:'fluxo-de-caixa',title:'Fluxo de Caixa',kind:'Análise',why:'Antecipe falta de dinheiro e separe operação de eventos extraordinários.'}
    ]},
    {title:'Capital de giro',desc:'Entenda por que uma empresa lucrativa pode crescer e ainda assim consumir caixa.',items:[
      {slug:'pmr',title:'PMR',kind:'Indicador',why:'Quanto tempo a empresa leva para receber.'},
      {slug:'pmp',title:'PMP',kind:'Indicador',why:'Quanto tempo os fornecedores financiam a operação.'},
      {slug:'pme',title:'PME',kind:'Indicador',why:'Quanto tempo o capital permanece em estoque.'},
      {slug:'ciclo-financeiro',title:'Ciclo Financeiro',kind:'Indicador',why:'Quantos dias a empresa precisa financiar a operação.'},
      {slug:'ncg',title:'NCG',kind:'Indicador',why:'Quanto recurso está preso na operação.'}
    ]},
    {title:'Aplicar o raciocínio',desc:'Parta do sintoma e teste hipóteses antes de escolher a ação.',items:[
      {diagnostic:true,slug:'caixa-ruim',title:'Meu caixa está ruim',kind:'Diagnóstico',why:'Use DRE, Fluxo, prazos, Ciclo e NCG para descobrir a causa mais provável.'}
    ]}
  ],

  searchAliases:[
    {terms:['vendi mais e falta dinheiro','vendo mais mas falta dinheiro','faturamento aumenta e caixa cai','cresci e fiquei sem caixa'],target:'#diagnostico/caixa-ruim'},
    {terms:['cliente demora a pagar','cliente não paga','demora receber','prazo cliente'],target:'#lesson/pmr'},
    {terms:['boleto vencido','título vencido','cobrança','inadimplência'],target:'#lesson/contas-a-receber'},
    {terms:['onde lançar despesa','qual conta usar','classificar despesa','plano de contas'],target:'#lesson/plano-de-contas'},
    {terms:['conta de março paga abril','competência caixa','data da despesa'],target:'#lesson/caixa-x-competencia'},
    {terms:['banco não bate','saldo sistema banco','conciliar banco'],target:'#lesson/conciliacao-bancaria'},
    {terms:['mês não fecha','fechamento mensal','fechar financeiro'],target:'#lesson/fechamento-financeiro'},
    {terms:['muito estoque','dinheiro parado estoque','estoque alto'],target:'#lesson/pme'},
    {terms:['pago antes de receber','descasamento prazo'],target:'#lesson/ciclo-financeiro'},
    {terms:['crescimento consome caixa','capital de giro','ncg'],target:'#lesson/ncg'}
  ],

  lessons:{
    'caixa-x-competencia':{
      type:'concept',title:'Caixa x Competência',time:'15–20 min',audience:'Operação financeira e gestão',
      summary:'Aprenda a separar quando um fato pertence ao resultado e quando o dinheiro efetivamente entra ou sai — e saiba justificar a data escolhida.',
      outcomes:['Identificar a competência de uma receita ou despesa comum.','Separar competência da data de pagamento ou recebimento.','Explicar por que uma data foi usada.','Reconhecer quando a situação precisa de validação com o responsável.'],
      quick:['Competência responde “a qual período pertence?”.','Caixa responde “quando o dinheiro entrou ou saiu?”.','Pagamento não define automaticamente a competência.','Uma DRE confiável depende de competência consistente.'],
      definitions:[
        ['Competência','Registra o efeito econômico no período em que o fato aconteceu ou foi consumido.'],
        ['Caixa','Registra a entrada ou saída de dinheiro na data financeira efetiva.']
      ],
      mainExample:{title:'Energia de março paga em abril',intro:'A energia foi consumida em março e o boleto foi pago em abril.',rows:[['DRE / competência','Março'],['Fluxo de caixa','Abril']],insight:'São duas leituras diferentes do mesmo fato. A despesa pertence a março, mas o dinheiro saiu em abril.'},
      edgeCases:[
        ['Manutenção realizada em 28/jun e paga em 10/jul','Competência: junho. Caixa: julho.'],
        ['Seguro anual pago antecipadamente','O pagamento ocorre agora, mas o reconhecimento do resultado pode seguir a política definida para o período de cobertura. Não improvise o critério.'],
        ['Serviço executado em março e nota emitida em abril','A nota emitida depois não muda automaticamente o período em que o serviço ocorreu. Valide a política da empresa.'],
        ['Documento chega depois do fechamento','Não “empurre” automaticamente para o mês seguinte. Verifique materialidade, política de fechamento e necessidade de ajuste/provisão.']
      ],
      decisionFlow:[
        ['O que aconteceu?','Identifique o fato real: serviço prestado, consumo, venda, manutenção, aluguel etc.'],
        ['Quando aconteceu ou foi consumido?','Essa é a principal referência para competência.'],
        ['Quando o dinheiro entrou ou saiu?','Essa é a referência de caixa.'],
        ['A situação foge da regra simples?','Se houver contrato longo, provisão, documento atrasado ou dúvida material, valide a política antes de lançar.']
      ],
      validation:{
        ok:'A data escolhida representa o período do fato e existe documento/contexto que sustenta o critério.',
        review:'O documento chegou atrasado, o serviço atravessa períodos ou a regra da empresa não está clara.',
        bad:'A competência foi escolhida apenas porque era a data do pagamento ou porque “era o mês aberto no sistema”.'
      },
      errorChain:['Despesa de março lançada em abril','Março fica artificialmente melhor','Abril fica artificialmente pior','Gestor enxerga uma variação que não ocorreu','Decisão pode ser tomada sobre um falso problema'],
      operator:['Pergunte primeiro quando o fato aconteceu.','Registre a data financeira separadamente.','Documente exceções e dúvidas.','Não use data de pagamento como atalho automático.'],
      manager:['Ao ver variações abruptas, questione competência antes de concluir.','Não compare meses sem confiança no critério usado.'],
      exercise:{
        q:'A manutenção de uma máquina foi executada em 28 de junho e paga em 10 de julho. Onde a despesa deve aparecer na DRE?',
        context:{headers:['Fato','Data'],rows:[['Serviço executado','28/jun'],['Pagamento','10/jul']]},
        options:['Junho','Julho','Nos dois meses como despesa'],answer:0,
        feedback:'A competência é junho porque o serviço ocorreu nesse período. Julho registra a saída financeira. A empresa pode ter políticas específicas para situações excepcionais, mas pagamento não define sozinho a competência.'
      },
      next:['plano-de-contas','contas-a-pagar','fechamento-financeiro']
    },

    'plano-de-contas':{
      type:'concept',title:'Plano de Contas',time:'20–25 min',audience:'Operação financeira e gestão',
      summary:'Aprenda a classificar cada movimentação pela natureza econômica correta e a separar natureza de centro de custo.',
      outcomes:['Classificar uma despesa pela natureza e não apenas pelo fornecedor.','Diferenciar plano de contas de centro de custo.','Usar uma árvore mental de classificação.','Reconhecer situações que exigem contexto antes de lançar.'],
      quick:['Pergunte “o que a empresa consumiu?”.','Fornecedor não define a conta.','Plano de contas responde natureza; centro de custo responde quem/onde consumiu.','Consistência entre meses é essencial para comparar.'],
      principle:'Classifique pela natureza da movimentação e pelo que foi efetivamente consumido, não pelo nome do fornecedor ou pelo meio de pagamento.',
      why:'Uma DRE pode fechar matematicamente e ainda estar gerencialmente errada se as despesas estiverem nas contas erradas.',
      example:{title:'O mesmo fornecedor, três naturezas diferentes',rows:[['Google Ads','Marketing / mídia'],['Google Workspace','Software / administrativo'],['Google Cloud','Tecnologia / infraestrutura']],insight:'O fornecedor é igual, mas o recurso consumido muda. “Google” não é uma natureza gerencial.'},
      classificationTree:[
        ['O que foi comprado ou consumido?','Leia descrição, documento e contexto.'],
        ['É ligado diretamente ao produto/serviço ou à estrutura?','Isso ajuda a separar custo operacional de despesas da estrutura, conforme o modelo gerencial adotado.'],
        ['Qual é a natureza?','Marketing, pessoal, tecnologia, frete, manutenção, matéria-prima etc.'],
        ['Quem ou qual área consumiu?','Use o {{centro|centro de custo}} quando a empresa controlar responsabilidade/área.'],
        ['A regra já existe?','Use a conta padronizada. Evite criar conta nova para cada exceção.']
      ],
      accountVsCenter:[
        ['Plano de contas','O que foi consumido?','Software, combustível, comissão, manutenção'],
        ['Centro de custo','Quem/onde consumiu?','Administrativo, Comercial, Produção, Unidade 2']
      ],
      ambiguity:[
        ['Manutenção de empilhadeira','Pode ser manutenção industrial/operacional. Antes de lançar, identifique o equipamento e a finalidade.'],
        ['Notebook novo','Pode ser ativo/investimento em vez de despesa imediata, conforme política contábil e materialidade. Valide.'],
        ['Frete','Pode estar ligado à compra, à venda ou a uma despesa administrativa. Pergunte qual operação gerou o frete.'],
        ['Cartão corporativo','Cartão é meio de pagamento, não natureza. Abra cada gasto antes de classificar.']
      ],
      validation:{
        ok:'A conta descreve a natureza real, o centro identifica quem consumiu e a regra é consistente com situações semelhantes.',
        review:'A descrição do documento é genérica, o gasto é incomum ou pode ser investimento em vez de despesa.',
        bad:'A conta foi escolhida pelo nome do fornecedor, pelo cartão usado ou porque “era a primeira opção da lista”.'
      },
      commonMistakes:['Usar “Outros” como destino frequente.','Criar conta nova para cada pequena variação.','Classificar pelo fornecedor.','Misturar natureza e centro de custo.','Alterar o tratamento da mesma despesa de um mês para outro sem justificativa.'],
      errorChain:['Despesa vai para a conta errada','Linha da DRE fica distorcida','Comparações e orçamento perdem consistência','Gestor identifica a área errada como problema','A decisão ataca a causa errada'],
      operator:['Leia o documento e procure contexto.','Siga a regra de classificação definida.','Peça esclarecimento quando não souber o que foi consumido.','Revise “Outros” e contas genéricas no fechamento.'],
      manager:['Ao ver uma linha fora do padrão, abra os lançamentos antes de concluir.','Garanta que a estrutura do plano de contas continue útil para a gestão.'],
      exercise:{
        q:'Uma cobrança da Microsoft refere-se ao Microsoft 365 usado pelo administrativo. Qual lógica é mais adequada?',
        context:{headers:['Informação','Valor'],rows:[['Fornecedor','Microsoft'],['Serviço','Microsoft 365'],['Área usuária','Administrativo']]},
        options:['Classificar como “Microsoft”','Classificar pela natureza, por exemplo Software, e usar Administrativo como centro quando aplicável','Classificar como Marketing porque é uma empresa de tecnologia'],answer:1,
        feedback:'O fornecedor não define a natureza. “Software” responde o que foi consumido; “Administrativo” pode responder onde o recurso foi utilizado.'
      },
      next:['contas-a-pagar','contas-a-receber','fechamento-financeiro']
    },

    'contas-a-pagar':{
      type:'procedure',title:'Contas a Pagar',time:'25–35 min',audience:'Operação financeira com supervisão da gestão',
      summary:'Aprenda a registrar, conferir e pagar obrigações sem perder vencimento, competência, classificação ou rastreabilidade.',
      outcomes:['Cadastrar uma obrigação com as informações mínimas necessárias.','Diferenciar competência, vencimento e pagamento.','Executar uma rotina de pagamento com conferência.','Identificar sinais de cadastro ou pagamento inadequado.'],
      quick:['Toda obrigação precisa ter origem, valor, competência, vencimento e classificação.','Pagamento é a última etapa, não o início do processo.','Alteração de vencimento ou valor precisa de rastreabilidade.','A base de contas a pagar alimenta fluxo e fechamento.'],
      objective:'Garantir que a empresa saiba o que deve pagar, quando deve pagar, por que deve pagar e em qual período/natureza aquele gasto pertence.',
      roles:[['Executa','Financeiro operacional'],['Valida exceções','Responsável financeiro / gestor definido'],['Usa o dado','Fluxo de caixa, fechamento e gestão']],
      before:['Documento, contrato ou evidência da obrigação.','Fornecedor identificado.','Regra de {{competencia|competência}}.','{{plano|Plano de contas}} e centro de custo quando aplicável.'],
      steps:[
        ['1. Identifique a origem','Documento, contrato, pedido ou obrigação que sustenta o lançamento.'],
        ['2. Cadastre fornecedor e documento','Evite duplicidade e dados incompletos.'],
        ['3. Defina competência','Pergunte a qual período o gasto pertence.'],
        ['4. Classifique natureza e centro','Use o plano de contas padronizado.'],
        ['5. Cadastre vencimento e condição','Parcela, data, desconto e juros precisam refletir o compromisso real.'],
        ['6. Programe o pagamento','Siga alçada, aprovação e disponibilidade financeira da empresa.'],
        ['7. Pague e dê baixa','Baixa precisa refletir a data e o valor efetivamente pagos.'],
        ['8. Trate exceções','Renegociação, estorno, desconto ou pagamento parcial devem atualizar a obrigação original com rastreabilidade.']
      ],
      stageValidation:[
        ['Cadastro','Fornecedor, documento e valor conferem com a origem.'],
        ['Competência','Representa o período do fato, não apenas o vencimento.'],
        ['Classificação','Natureza e centro são coerentes com o que foi consumido.'],
        ['Vencimento','Data e parcelas representam a condição negociada.'],
        ['Pagamento','Valor pago, conta bancária e data batem com o comprovante/banco.'],
        ['Baixa','Não ficou título aberto depois de pagar nem baixa sem pagamento real.']
      ],
      validation:{
        ok:'Obrigação possui origem, competência, classificação e vencimento corretos; pagamento e baixa batem com o banco.',
        review:'Há renegociação, pagamento parcial, desconto, multa ou documento sem informação suficiente.',
        bad:'Título foi criado apenas no dia do pagamento, sem competência/classificação, ou foi duplicado para “corrigir” uma diferença.'
      },
      finishCriteria:['Próximos vencimentos estão visíveis.','Pagamentos realizados estão baixados.','Títulos vencidos sem pagamento estão explicitados.','Renegociações estão atualizadas.','Nenhuma obrigação relevante depende apenas da memória de alguém.'],
      notReady:['Pagamentos aparecem no banco sem título correspondente.','Existem títulos duplicados.','A competência foi igualada ao vencimento por padrão.','Renegociações ficaram registradas em planilha paralela e não no sistema.'],
      mistakes:['Cadastrar só quando vai pagar.','Usar vencimento como competência automática.','Pagar sem verificar duplicidade.','Excluir obrigação renegociada sem histórico.'],
      errorChain:['Obrigação não é cadastrada no vencimento correto','Fluxo projetado subestima saídas','Gestor acredita que haverá mais caixa','Pagamento chega sem planejamento','Empresa toma decisão atrasada'],
      operator:['Mantenha rotina diária/semanal de revisão.','Nunca esconda título vencido apagando a obrigação.','Atualize renegociações assim que forem acordadas.'],
      manager:['Defina alçadas e prioridades de pagamento.','Use o contas a pagar para projetar caixa, não apenas para autorizar boleto.'],
      exercise:{
        q:'Um fornecedor renegociou uma parcela de R$ 30 mil de 10/09 para 25/09. Qual é a prática correta?',
        context:{headers:['Campo','Antes','Depois'],rows:[['Valor','R$ 30 mil','R$ 30 mil'],['Vencimento','10/09','25/09']]},
        options:['Excluir o título e criar outro sem histórico','Atualizar a obrigação/renegociação com rastreabilidade e refletir a nova data no fluxo','Deixar 10/09 porque a nota original não mudou'],answer:1,
        feedback:'A obrigação continua existindo, mas a condição financeira mudou. O sistema precisa refletir o acordo atual sem perder a origem e o histórico.'
      },
      next:['conciliacao-bancaria','fechamento-financeiro','fluxo-de-caixa']
    },

    'contas-a-receber':{
      type:'procedure',title:'Contas a Receber',time:'25–35 min',audience:'Operação financeira, comercial e gestão',
      summary:'Aprenda a manter a carteira de clientes confiável, registrar recebimentos e diferenciar prazo comercial de atraso.',
      outcomes:['Cadastrar corretamente títulos e vencimentos.','Dar baixa sem esconder atraso ou diferença.','Identificar títulos vencidos e renegociados.','Preparar uma carteira confiável para PMR, inadimplência e fluxo.'],
      quick:['Venda a prazo gera um direito a receber.','Vencimento não é recebimento.','Título vencido continua existindo até ser recebido, renegociado ou tratado conforme política.','Carteira confiável é condição para PMR e inadimplência confiáveis.'],
      objective:'Saber exatamente quanto a empresa tem a receber, de quem, em qual data, há quanto tempo está vencido e o que realmente entrou no caixa.',
      roles:[['Executa','Financeiro / cobrança'],['Origem comercial','Faturamento / comercial conforme processo'],['Usa o dado','Fluxo de caixa, PMR, inadimplência e gestão']],
      before:['Venda/faturamento identificado.','Cliente correto.','Condição comercial e parcelas definidas.','Política de cobrança/renegociação.'],
      steps:[
        ['1. Gere o título a partir da venda','Cliente, valor, documento e origem devem ser rastreáveis.'],
        ['2. Cadastre vencimentos reais','Cada parcela precisa refletir a condição comercial negociada.'],
        ['3. Acompanhe a carteira','Separe a vencer, vencido e renegociado.'],
        ['4. Registre recebimentos','Valor, data e banco devem refletir o que entrou.'],
        ['5. Trate diferenças','Desconto, juros, estorno ou recebimento parcial precisam ser explicados.'],
        ['6. Trate renegociação','Atualize a nova condição sem apagar o histórico de atraso/acordo quando a política exigir.'],
        ['7. Faça cobrança com prioridade','Use valor, atraso, risco e relevância para organizar ação.']
      ],
      stageValidation:[
        ['Origem','Todo título relevante pode ser rastreado até uma venda/documento.'],
        ['Vencimento','Datas refletem a condição comercial real.'],
        ['Recebimento','Baixa bate com banco/retorno e valor recebido.'],
        ['Vencido','Títulos em atraso permanecem visíveis até tratamento real.'],
        ['Renegociação','Nova condição está registrada e o histórico é preservado conforme regra.']
      ],
      validation:{
        ok:'Carteira mostra corretamente o que está a vencer, vencido, recebido e renegociado.',
        review:'Recebimento parcial, desconto, devolução, estorno ou renegociação exigem tratamento específico.',
        bad:'Título vencido é baixado apenas para “limpar a carteira” ou a data de vencimento é alterada para esconder atraso.'
      },
      finishCriteria:['Total da carteira é explicável.','Baixas conferem com recebimentos.','Vencidos estão visíveis.','Renegociações estão atualizadas.','Diferenças relevantes foram tratadas.'],
      notReady:['Clientes aparecem sem títulos apesar de vendas a prazo.','Baixas não batem com banco.','Vencimentos são alterados depois do atraso sem registro.','Há títulos antigos que ninguém sabe explicar.'],
      mistakes:['Baixar título antes do recebimento real.','Mudar vencimento retroativamente para esconder atraso.','Misturar adiantamento com recebimento de venda sem controle.','Não registrar recebimento parcial corretamente.'],
      errorChain:['Título vencido é “ajustado” para nova data sem histórico','Inadimplência parece menor','PMR fica artificialmente melhor','Gestor subestima problema de cobrança','Política comercial continua sem correção'],
      operator:['Atualize carteira diariamente ou na frequência definida.','Nunca esconda atraso com alteração sem rastreabilidade.','Concilie recebimentos com banco/retorno.'],
      manager:['Separe prazo concedido de atraso.','Acompanhe concentração por cliente, idade do vencido e tendência de PMR.'],
      exercise:{
        q:'Um título venceu há 20 dias e o cliente prometeu pagar daqui a 10 dias, sem acordo formal de renegociação. O que fazer?',
        context:{headers:['Situação','Informação'],rows:[['Vencimento original','20 dias atrás'],['Promessa de pagamento','Daqui a 10 dias'],['Recebimento','Ainda não ocorreu']]},
        options:['Alterar o vencimento original para daqui a 10 dias e zerar o atraso','Manter o atraso visível e registrar a promessa/ação de cobrança conforme processo','Dar baixa e reabrir se o cliente não pagar'],answer:1,
        feedback:'A promessa não elimina o atraso já ocorrido. A carteira precisa continuar mostrando a realidade até existir recebimento ou renegociação formal tratada conforme política.'
      },
      next:['conciliacao-bancaria','pmr','fluxo-de-caixa']
    },

    'conciliacao-bancaria':{
      type:'procedure',title:'Conciliação Bancária',time:'20–30 min',audience:'Operação financeira',
      summary:'Aprenda a comparar banco e sistema movimentação por movimentação e a investigar diferenças sem mascará-las.',
      outcomes:['Conciliar uma conta bancária.','Identificar a origem de uma diferença.','Tratar tarifa, transferência, estorno e lançamento ausente corretamente.','Saber quando a conciliação ainda não terminou.'],
      quick:['Saldo igual não basta: as movimentações precisam estar explicadas.','Diferença não se resolve com “Ajuste” genérico.','Transferência entre contas não é receita nem despesa.','Conciliação é pré-requisito para confiar no caixa.'],
      objective:'Garantir que o sistema represente fielmente as movimentações financeiras que realmente ocorreram no banco.',
      roles:[['Executa','Financeiro operacional'],['Valida diferenças relevantes','Responsável financeiro'],['Usa o dado','Fluxo de Caixa e Fechamento']],
      before:['Extratos de todas as contas.','Sistema atualizado.','Contas a pagar/receber com baixas registradas.','Regra para transferências, tarifas e estornos.'],
      steps:[
        ['1. Comece pelo saldo anterior','Garanta que o ponto de partida já estava conciliado.'],
        ['2. Compare entradas','Recebimentos, transferências e outras entradas.'],
        ['3. Compare saídas','Pagamentos, tarifas, impostos e demais saídas.'],
        ['4. Identifique diferenças','Lançamento ausente, duplicado, valor incorreto, data ou conta errada.'],
        ['5. Investigue a causa','Volte à origem antes de fazer ajuste.'],
        ['6. Corrija com rastreabilidade','Ajuste o cadastro/lançamento correto e documente exceções.'],
        ['7. Valide o saldo final','Banco e sistema precisam convergir por movimentações explicadas.']
      ],
      stageValidation:[
        ['Saldo inicial','Igual ao saldo conciliado do período anterior.'],
        ['Entradas','Cada crédito bancário relevante possui origem identificada.'],
        ['Saídas','Cada débito bancário relevante possui lançamento/origem.'],
        ['Transferências','Saída de uma conta e entrada em outra não viram receita/despesa.'],
        ['Diferenças','Não existe valor material sem explicação.']
      ],
      validation:{
        ok:'Banco e sistema batem e cada diferença encontrada foi explicada na origem.',
        review:'Existem movimentos pendentes de identificação, retornos bancários atrasados ou diferenças pequenas recorrentes.',
        bad:'Saldo foi “forçado” com lançamento de ajuste genérico apenas para igualar ao extrato.'
      },
      finishCriteria:['Saldo inicial confirmado.','Entradas e saídas explicadas.','Tarifas/juros registrados.','Transferências tratadas sem duplicidade.','Saldo final do sistema corresponde ao banco.'],
      notReady:['Existe lançamento “Ajuste” sem causa.','Movimentações do banco não têm origem.','Sistema bate apenas no saldo final, mas não nas transações.'],
      mistakes:['Conciliar só o saldo final.','Ignorar tarifas pequenas.','Registrar transferência interna como receita e despesa.','Criar lançamento genérico para eliminar diferença.'],
      errorChain:['Diferença é mascarada com ajuste','Saldo parece correto','Fluxo e classificação ficam errados','Fechamento usa base contaminada','Gestor discute números sem rastreabilidade'],
      operator:['Investigue primeiro, corrija depois.','Concilie com frequência compatível com o volume.','Documente pendências que dependam de terceiros.'],
      manager:['Não aceite “bateu o saldo” como única evidência.','Observe diferenças recorrentes: elas podem indicar falha de processo.'],
      exercise:{
        q:'O saldo do sistema e do banco é igual, mas há um lançamento “Ajuste de conciliação” de R$ 4.300. A conciliação está concluída?',
        context:{headers:['Item','Valor'],rows:[['Saldo banco','R$ 125.000'],['Saldo sistema','R$ 125.000'],['Ajuste genérico','R$ 4.300']]},
        options:['Sim, porque os saldos são iguais','Não; o ajuste precisa ser explicado na origem','Sim, se R$ 4.300 for menos de 5% do saldo'],answer:1,
        feedback:'Conciliação é explicar as movimentações, não apenas chegar ao mesmo saldo. O ajuste genérico pode esconder uma tarifa, duplicidade, recebimento ou pagamento não tratado.'
      },
      next:['fechamento-financeiro','fluxo-de-caixa']
    },

    'fechamento-financeiro':{
      type:'procedure',title:'Fechamento Financeiro',time:'30–40 min',audience:'Operação com validação da gestão',
      summary:'Aprenda a encerrar o mês em uma sequência padronizada e a reconhecer quando os dados realmente estão prontos para análise.',
      outcomes:['Executar o fechamento em uma ordem lógica.','Validar as principais fontes antes da DRE.','Identificar pendências que impedem conclusão.','Entregar uma versão confiável e rastreável para a gestão.'],
      quick:['Fechar não é apertar “gerar DRE”.','Primeiro valide caixa, carteira, competência e classificação.','Pendência relevante precisa ser resolvida ou explicitada.','Após a reunião, mudança no período deve ter rastreabilidade.'],
      objective:'Transformar movimentações operacionais em uma base estável para DRE, Fluxo e indicadores, reduzindo discussões sobre dado durante a reunião de gestão.',
      roles:[['Executa','Financeiro operacional'],['Valida','Responsável financeiro / gestão definida'],['Consome a saída','Gestores e direção']],
      before:['{{conciliacao|Conciliação}} realizada ou pendências explicitadas.','Contas a pagar e receber atualizadas.','Regra de {{competencia|competência}} aplicada.','{{plano|Plano de contas}} e centros revisáveis.'],
      steps:[
        ['1. Concilie bancos','Explique diferenças entre banco e sistema.'],
        ['2. Revise Contas a Pagar','Duplicidades, pagamentos sem baixa, vencidos, renegociações e competência.'],
        ['3. Revise Contas a Receber','Baixas, vencidos, renegociações, estornos e recebimentos não identificados.'],
        ['4. Revise competência','Procure fatos do mês lançados em outro período e documentos atrasados.'],
        ['5. Revise classificação','Abra “Outros”, contas genéricas e linhas que variaram muito.'],
        ['6. Valide faturamento e impostos','Confronte relatórios de origem com o que entrou no resultado.'],
        ['7. Valide custos e eventos relevantes','Custos, provisões, despesas atípicas e fatos não recorrentes.'],
        ['8. Faça revisão gerencial preliminar','Uma variação sem explicação pode ser problema de negócio ou problema de dado. Diferencie antes de publicar.'],
        ['9. Registre pendências e feche versão','Defina o que ficou estimado/pendente e preserve rastreabilidade de alterações posteriores.']
      ],
      stageValidation:[
        ['Bancos','Saldos e movimentos materiais explicados.'],
        ['A pagar','Obrigações, baixas e vencimentos coerentes.'],
        ['A receber','Carteira e recebimentos conciliados.'],
        ['Competência','Receitas/despesas estão no período correto.'],
        ['Classificação','Contas genéricas e exceções foram revisadas.'],
        ['Receita/custos','Fontes principais conferem com relatórios de origem.'],
        ['Versão final','Pendências materiais estão resolvidas ou explicitadas.']
      ],
      validation:{
        ok:'Mês possui fontes reconciliadas, critérios consistentes, pendências conhecidas e versão pronta para comparação.',
        review:'Existem estimativas/provisões materiais ou uma fonte ainda aguarda confirmação; a gestão precisa saber disso.',
        bad:'DRE é apresentada enquanto o mês continua mudando, existem diferenças sem causa ou contas genéricas relevantes não foram abertas.'
      },
      finishCriteria:['Bancos conciliados.','A pagar e receber atualizados.','Competência revisada.','Classificações relevantes revisadas.','Receita, impostos e custos principais validados.','Pendências materiais documentadas.','Versão de análise definida.'],
      notReady:['O mês muda toda vez que alguém lança uma nota antiga.','Existem diferenças bancárias sem explicação.','Valores relevantes estão em “Outros”.','Gestor recebe números sem saber quais partes ainda são estimadas.'],
      mistakes:['Apresentar DRE antes do fechamento.','Tratar qualquer diferença como “ajuste”.','Mudar período já apresentado sem controle.','Confundir fechamento contábil/fiscal com fechamento gerencial sem alinhar critérios.'],
      errorChain:['Mês é apresentado incompleto','DRE mostra variação que depois muda','Reunião discute um falso problema','Números são corrigidos depois','Gestores perdem confiança na ferramenta'],
      operator:['Use o checklist sempre na mesma ordem.','Explique pendências, não esconda.','Registre alterações posteriores ao fechamento.'],
      manager:['Pergunte se o mês está fechado antes de interpretar.','Peça as principais pendências e estimativas.','Separe discussão de qualidade de dado da discussão de gestão.'],
      exercise:{
        q:'O banco está conciliado e a receita foi validada, mas R$ 80 mil de despesas continuam em “Outros” aguardando classificação. A DRE está pronta para uma reunião gerencial?',
        context:{headers:['Validação','Situação'],rows:[['Banco','Concluído'],['Receita','Concluída'],['Despesas em “Outros”','R$ 80 mil sem abertura']]},
        options:['Sim, porque banco e receita estão corretos','Não; a classificação material pode alterar a leitura das linhas da DRE','Sim, se o resultado final não mudar'],answer:1,
        feedback:'O resultado total até pode permanecer igual, mas a interpretação por linha pode mudar completamente. O fechamento gerencial ainda não está pronto.'
      },
      next:['dre-gerencial','fluxo-de-caixa']
    },

    'dre-gerencial':{
      type:'analysis',title:'DRE Gerencial',time:'35–45 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a ler resultado em sequência, investigar variações e decidir qual análise abrir em seguida — sem confundir sintoma com causa.',
      outcomes:['Ler a DRE na ordem correta.','Diferenciar problema de receita, margem e estrutura.','Escolher comparações úteis.','Definir a próxima investigação a partir de um sinal.','Reconhecer quando a DRE não é suficiente para responder uma pergunta.'],
      quick:['Leia Receita → Margem → Estrutura → Resultado.','Resultado é consequência; não comece pelo lucro.','Compare valor, percentual da receita, histórico e orçamento.','Toda variação relevante precisa de hipótese e próxima investigação.'],
      inOneSentence:'A {{dre|DRE}} mostra como o faturamento de um período é consumido até chegar ao {{resultado|resultado operacional}}.',
      responds:['A operação está gerando resultado?','O resultado melhorou ou piorou?','A mudança veio de receita, margem ou estrutura?','As despesas cresceram mais rápido que a receita?','O crescimento está trazendo qualidade econômica?'],
      doesNotAnswer:['Quando faltará dinheiro — use Fluxo de Caixa.','Por que determinado cliente deixou de comprar — use análises comerciais.','Qual SKU está em excesso — abra estoque.','Qual causa operacional derrubou produtividade — use indicadores da operação.'],
      before:['Mês fechado e validado.','{{competencia|Competência}} consistente.','{{plano|Plano de contas}} revisado.','Receita/impostos conferidos.','Custos relevantes atualizados.','Eventos extraordinários identificados.'],
      anatomy:[
        ['Receita Bruta','Quanto foi vendido antes das deduções.'],['(-) Impostos e deduções','O que reduz a receita até o valor líquido.'],['= Receita Líquida','Base efetiva da operação.'],['(-) Custos e despesas variáveis','Gastos que acompanham diretamente a venda.'],['= Margem de Contribuição','Quanto sobra para sustentar a estrutura fixa e gerar resultado.'],['(-) Despesas Fixas','Estrutura administrativa, comercial e operacional.'],['= Resultado Operacional','Consequência do que aconteceu acima.']
      ],
      analysisSteps:[
        ['1. Receita','Meça mudança em valor e percentual. Pergunte: preço, volume, mix, cliente ou sazonalidade?'],
        ['2. Margem','Se receita cresceu, a margem acompanhou? Investigue preço, custo, desconto, mix, comissão, frete e impostos.'],
        ['3. Estrutura fixa','Compare em reais, % da receita e orçamento. Crescer em valor não significa necessariamente piorar.'],
        ['4. Resultado','Leia como consequência. Qual bloco acima mais explica a mudança?'],
        ['5. Variações materiais','Escolha as linhas que realmente explicam o mês. Evite investigar tudo ao mesmo tempo.'],
        ['6. Próxima análise','A DRE localizou o sintoma. Agora escolha a ferramenta que pode explicar a causa.']
      ],
      compare:[['Mês anterior','Mudança recente; cuidado com sazonalidade.'],['Mesmo mês do ano anterior','Ajuda quando existe sazonalidade anual.'],['Orçado x realizado','Mostra desvio em relação ao plano.'],['% da receita','Mostra peso relativo e eficiência.'],['Acumulado','Evita reagir demais a um mês isolado.']],
      caseExample:{title:'Indústria Horizonte — faturou mais e gerou mais resultado, mas a qualidade piorou',rows:[['Receita','R$ 1,00 mi → R$ 1,35 mi'],['Margem','36% → 31%'],['Resultado operacional','R$ 110 mil → R$ 150 mil'],['Caixa','R$ 380 mil → R$ 160 mil']],insight:'A empresa cresceu e o resultado em reais aumentou. Porém, a margem percentual caiu e o caixa piorou. “Faturamos mais e lucramos mais” não encerra a análise.'},
      investigations:[
        ['Receita caiu','Abra volume, preço, ticket, clientes ativos, frequência, mix e sazonalidade.'],
        ['Receita subiu e margem caiu','Abra preço, custo, descontos, mix, comissão, frete e impostos.'],
        ['Margem estável e resultado piorou','Abra despesas fixas, contratações, gastos extraordinários e orçamento.'],
        ['DRE positiva e caixa piora','Vá para Fluxo, PMR, PME, PMP, Ciclo Financeiro e NCG.']
      ],
      nextQuestion:'Depois de localizar onde o resultado mudou, qual indicador ou abertura consegue explicar a causa?',
      notConclude:['“Faturamento cresceu, então estamos melhores.”','“Lucro caiu, então precisamos cortar despesas.”','“Despesa aumentou em reais, então piorou.”','“DRE positiva significa caixa saudável.”'],
      operator:['Garanta competência correta.','Classifique pela natureza.','Revise contas genéricas e variações relevantes.','Documente eventos extraordinários.'],
      manager:['Comece por “o que mudou?”.','Priorize as variações que explicam mais o resultado.','Transforme cada sinal em uma próxima pergunta.','Cruze com indicadores operacionais antes de agir.'],
      errorChain:['Despesa classificada no mês errado','DRE de um mês melhora artificialmente','Mês seguinte piora artificialmente','Gestor interpreta tendência inexistente','Ação ataca um problema que não ocorreu'],
      exercise:{
        q:'Qual hipótese merece investigação primeiro?',
        context:{headers:['Indicador','Março','Abril'],rows:[['Receita','R$ 800 mil','R$ 920 mil'],['Margem de contribuição','35%','29%'],['Despesas fixas','R$ 210 mil','R$ 215 mil'],['Resultado','R$ 70 mil','R$ 52 mil']]},
        options:['Aumento de despesas fixas','Deterioração da qualidade da venda: preço, custo, desconto, mix, frete ou comissão','Queda do faturamento'],answer:1,
        feedback:'Receita cresceu e despesas fixas quase não mudaram. A principal deterioração está na margem, que caiu de 35% para 29%. A próxima investigação deve abrir os componentes da margem.'
      },
      next:['fluxo-de-caixa','pmr','pme','ciclo-financeiro']
    },

    'fluxo-de-caixa':{
      type:'analysis',title:'Fluxo de Caixa',time:'30–40 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a enxergar dinheiro e tempo, antecipar vales de caixa e separar pressão operacional de investimento, dívida ou evento extraordinário.',
      outcomes:['Confirmar o saldo real de partida.','Montar uma leitura de entradas e saídas futuras.','Identificar o momento em que o caixa fica pressionado.','Separar causa operacional de movimento extraordinário.','Definir qual indicador abrir em seguida.'],
      quick:['DRE mostra resultado; Fluxo mostra dinheiro e tempo.','Saldo de hoje não é projeção.','Procure o menor saldo do período, não apenas o saldo final.','Separe operação, investimento, financiamento e eventos extraordinários.'],
      inOneSentence:'Fluxo de caixa mostra quando o dinheiro entra, quando sai e em que momento a empresa pode ficar sem folga financeira.',
      responds:['Quanto dinheiro temos de fato?','Quais entradas e saídas estão previstas?','Em qual data o caixa pode ficar crítico?','A queda veio da operação ou de movimento extraordinário?'],
      doesNotAnswer:['Se a operação é lucrativa — use DRE.','Qual cliente/estoque explica sozinho a pressão — abra PMR, PME, carteira e estoque.','Se uma compra é economicamente boa — caixa mede timing, não rentabilidade isolada.'],
      before:['Bancos conciliados.','Contas a pagar e receber atualizadas.','Datas previstas revisadas.','Movimentos extraordinários identificados.'],
      analysisSteps:[
        ['1. Saldo real','Comece no banco conciliado.'],['2. Entradas previstas','Recebimentos com datas realistas, não apenas promessa.'],['3. Saídas previstas','Fornecedores, folha, impostos, dívidas, investimentos e outras obrigações.'],['4. Vale de caixa','Encontre o menor saldo ao longo dos dias/semanas.'],['5. Explique a causa','Separe operação, investimento, financiamento e evento não recorrente.'],['6. Cruze com a operação','Se a pressão é recorrente, abra DRE, PMR, PME, PMP, Ciclo e NCG.']
      ],
      caseExample:{title:'Indústria Horizonte — lucro positivo, caixa em queda',rows:[['Resultado operacional mensal','R$ 150 mil positivo'],['Caixa disponível','R$ 380 mil → R$ 160 mil'],['PMR','32 → 48 dias'],['PME','24 → 38 dias']],insight:'Resultado positivo não impediu a queda do caixa. Mais dinheiro ficou preso em clientes e estoque.'},
      timeline:[['Saldo inicial','R$ 180 mil'],['Recebimentos','+ R$ 90 mil'],['Folha e impostos','− R$ 120 mil'],['Fornecedores','− R$ 80 mil'],['Recebimentos','+ R$ 55 mil'],['Saldo após movimentos','R$ 125 mil']],
      profitVsCash:[['Venda a prazo','Pode aumentar receita/lucro antes do dinheiro entrar.'],['Compra de máquina','Consome caixa e não aparece integralmente como despesa operacional do período.'],['Estoque crescendo','Consome caixa antes de virar venda.'],['Pagamento de dívida','Consome caixa sem significar necessariamente piora operacional.']],
      nextQuestion:'A pressão de caixa é pontual por um evento ou está sendo produzida continuamente pela operação?',
      notConclude:['“Tenho saldo positivo hoje, então está tudo bem.”','“DRE tem lucro, então não deveria faltar caixa.”','“Caixa negativo significa necessariamente prejuízo.”'],
      operator:['Concilie bancos.','Atualize vencimentos e baixas.','Revise previsões quando datas mudarem.','Não duplique transferências internas.'],
      manager:['Olhe o vale projetado, não apenas o saldo atual.','Pergunte qual evento explica cada queda relevante.','Cruze recorrência de pressão com capital de giro.'],
      exercise:{
        q:'A empresa encerra o mês com saldo positivo, mas o menor saldo projetado no dia 20 fica negativo. Qual leitura é correta?',
        context:{headers:['Data','Saldo projetado'],rows:[['Dia 01','R$ 160 mil'],['Dia 20','− R$ 35 mil'],['Dia 30','R$ 70 mil']]},
        options:['Não há problema porque o mês termina positivo','Existe um vale de caixa que precisa ser planejado antes do dia 20','Basta olhar a DRE'],answer:1,
        feedback:'Fluxo é sobre tempo. Um saldo final positivo não elimina a necessidade de financiar um período intermediário negativo.'
      },
      next:['pmr','pmp','pme','ciclo-financeiro','ncg','caixa-ruim']
    },

    'pmr':{
      type:'indicator',title:'Prazo Médio de Recebimento (PMR)',time:'20–25 min',audience:'Gestão, financeiro e comercial',
      summary:'Entenda quanto tempo as vendas demoram para virar dinheiro e diferencie prazo comercial de atraso.',
      outcomes:['Interpretar aumento ou queda do PMR.','Separar mudança comercial de deterioração de cobrança.','Validar a qualidade da carteira antes de confiar no indicador.','Escolher a próxima análise.'],
      quick:['PMR maior = dinheiro demora mais para voltar.','Prazo comercial e atraso podem gerar o mesmo sinal.','Cruze com inadimplência, condições de venda, Ciclo e NCG.'],
      formula:'Forma gerencial comum: PMR ≈ (Contas a Receber médio ÷ Vendas a prazo do período) × dias do período. Preserve o mesmo critério entre os meses.',
      inOneSentence:'PMR estima quantos dias, em média, a empresa financia os clientes depois da venda.',
      responds:['Estamos recebendo mais devagar?','O prazo comercial aumentou?','A carteira está alongando?','Quanto tempo adicional estamos financiando clientes?'],
      doesNotAnswer:['Não mostra sozinho se existe inadimplência.','Não diz se o prazo maior gerou venda/margem suficiente para compensar.'],
      data:['Contas a receber confiável.','Vencimentos e baixas corretos.','Vendas a prazo conforme metodologia definida.'],
      quality:['Títulos vencidos permanecem visíveis.','Renegociações têm rastreabilidade.','Baixas refletem recebimentos reais.','Critério de cálculo é igual entre períodos.'],
      when:'Mensalmente e quando houver mudança relevante em política comercial, parcelamento ou cobrança.',
      analysis:[['1. Tendência','Compare histórico e meta.'],['2. Prazo x atraso','Separe condição negociada de inadimplência.'],['3. Abra carteira','Veja clientes e faixas de atraso que explicam a mudança.'],['4. Meça impacto','Cruze com Fluxo, Ciclo e NCG.']],
      interpretation:[['PMR sobe e inadimplência sobe','Cobrança/qualidade da carteira pode estar piorando.'],['PMR sobe, inadimplência estável e parcelamento aumenta','Mudança comercial é hipótese forte.'],['PMR cai, mas margem cai muito','Receber mais cedo pode estar sendo comprado com desconto/condição pior.']],
      cross:[['contas-a-receber','Mostra carteira, vencidos e origem do prazo.'],['fluxo-de-caixa','Mostra quando o atraso pressiona o saldo.'],['ciclo-financeiro','PMR adiciona dias ao ciclo.'],['ncg','Mais contas a receber tende a aumentar capital necessário.']],
      caseExample:{title:'Indústria Horizonte — vendas cresceram e recebimento alongou',rows:[['PMR anterior','32 dias'],['PMR atual','48 dias'],['Aumento','16 dias'],['Caixa','R$ 380 mil → R$ 160 mil']],insight:'A empresa passou a financiar clientes por mais tempo justamente durante o crescimento.'},
      nextQuestion:'O PMR aumentou porque vendemos com mais prazo ou porque os clientes atrasaram?',
      operator:['Mantenha vencimentos e baixas corretos.','Não altere datas para esconder atraso.','Registre renegociações conforme processo.'],
      manager:['Compare prazo concedido, atraso e margem.','Abra clientes que mais explicam a mudança.'],
      exercise:{
        q:'Qual hipótese merece investigação primeiro?',
        context:{headers:['Indicador','Antes','Agora'],rows:[['PMR','32 dias','48 dias'],['Inadimplência','2,1%','2,3%'],['Vendas parceladas','40%','68%']]},
        options:['Piora forte da inadimplência','Mudança na condição comercial / parcelamento','Problema de estoque'],answer:1,
        feedback:'A inadimplência quase não mudou, enquanto o peso das vendas parceladas aumentou muito. A condição comercial é a primeira hipótese, embora a carteira deva ser aberta para confirmar.'
      },
      next:['pmp','pme','ciclo-financeiro','ncg']
    },

    'pmp':{
      type:'indicator',title:'Prazo Médio de Pagamento (PMP)',time:'18–25 min',audience:'Gestão financeira e compras',
      summary:'Entenda quanto tempo fornecedores ajudam a financiar a operação e por que prazo maior não é automaticamente melhor.',
      outcomes:['Interpretar mudança do PMP.','Comparar prazo com preço e condição de compra.','Entender o papel do fornecedor no ciclo financeiro.','Reconhecer concentração de vencimentos que a média esconde.'],
      quick:['PMP maior pode aliviar caixa.','Prazo tem custo: compare preço, desconto e risco de fornecimento.','A média pode esconder concentração de pagamentos.'],
      formula:'Forma gerencial comum: PMP ≈ (Fornecedores operacionais médios ÷ Compras do período) × dias do período.',
      inOneSentence:'PMP estima quantos dias, em média, os fornecedores financiam a operação antes do pagamento.',
      responds:['Estamos pagando mais cedo ou mais tarde?','Quanto do ciclo é financiado pelos fornecedores?','O prazo acompanhou o crescimento?'],
      doesNotAnswer:['Não informa sozinho se a compra ficou mais cara.','Não mostra risco de abastecimento ou qualidade do fornecedor.'],
      data:['Fornecedores operacionais.','Compras do período.','Vencimentos e pagamentos corretos.'],
      quality:['Renegociações atualizadas.','Pagamentos antecipados identificados.','Dívida bancária separada de fornecedor operacional.'],
      when:'Mensalmente e em negociações relevantes de compras.',
      analysis:[['1. Tendência','Compare o prazo com histórico.'],['2. Custo da condição','Veja preço, desconto e prazo juntos.'],['3. Distribuição','Cheque concentração de vencimentos.'],['4. Cruzamento','Compare PMR + PME com PMP.']],
      interpretation:[['PMP aumenta sem custo adicional relevante','Pode aliviar capital de giro.'],['PMP aumenta, mas preço sobe muito','Benefício financeiro pode ser menor que o custo.'],['PMP muito menor que PMR + PME','Empresa financia grande parte do ciclo com caixa próprio/dívida.']],
      cross:[['contas-a-pagar','Mostra vencimentos reais e renegociações.'],['ciclo-financeiro','PMP reduz dias financiados pela empresa.'],['fluxo-de-caixa','Mostra quando os pagamentos concentram saída.']],
      caseExample:{title:'Indústria Horizonte — fornecedores quase não acompanharam o crescimento',rows:[['PMP anterior','30 dias'],['PMP atual','31 dias'],['PMR atual','48 dias'],['PME atual','38 dias']],insight:'Clientes e estoque alongaram, mas fornecedor quase não aumentou o financiamento.'},
      nextQuestion:'O ganho de prazo compensa eventual aumento de preço, perda de desconto ou risco de fornecimento?',
      operator:['Cadastre vencimentos e renegociações corretamente.','Evite antecipações fora da política sem registro.'],
      manager:['Negocie prazo junto com custo total.','Observe concentração de vencimentos além da média.'],
      exercise:{
        q:'Fornecedor oferece mais 15 dias de prazo, mas aumenta o preço em 6%. Qual decisão é tecnicamente mais adequada?',
        options:['Aceitar porque prazo maior é sempre melhor','Comparar benefício financeiro do prazo com custo adicional e impacto na margem','Recusar automaticamente'],answer:1,
        feedback:'PMP isolado não decide a compra. Prazo, preço, desconto, confiabilidade e risco precisam ser comparados.'
      },
      next:['pme','ciclo-financeiro','ncg']
    },

    'pme':{
      type:'indicator',title:'Prazo Médio de Estoque (PME)',time:'20–30 min',audience:'Gestão, compras, estoque e financeiro',
      summary:'Entenda por quanto tempo o capital fica imobilizado e por que estoque alto pode coexistir com ruptura.',
      outcomes:['Interpretar aumento do PME.','Diferenciar problema de volume total e problema de mix.','Identificar quando abrir por categoria/ABC.','Relacionar estoque a caixa e NCG.'],
      quick:['PME maior = capital parado por mais tempo.','Média total pode esconder excesso e ruptura ao mesmo tempo.','Abra por categoria, criticidade e curva ABC.'],
      formula:'Forma gerencial comum: PME ≈ (Estoque médio ÷ Custo ou consumo do período) × dias do período.',
      inOneSentence:'PME estima por quantos dias o dinheiro fica convertido em estoque antes de girar.',
      responds:['O estoque está girando mais devagar?','Quanto tempo de capital está imobilizado?','Quais categorias explicam a mudança?'],
      doesNotAnswer:['Não identifica sozinho qual SKU está em excesso.','Não define estoque ideal sem demanda, prazo de fornecedor e nível de serviço.'],
      data:['Estoque médio confiável.','Custo/consumo do período.','Movimentações e inventários.'],
      quality:['Acuracidade aceitável.','Perdas/obsolescência registradas.','Transferências corretas.','Itens sem giro visíveis.'],
      when:'Mensalmente e sempre que houver aumento relevante de estoque, falta de caixa ou ruptura.',
      analysis:[['1. Tendência','PME está subindo?'],['2. Abra por categoria','Qual família explica o aumento?'],['3. Excesso x ruptura','Quais itens estão parados e quais estão faltando?'],['4. Origem','Compras, lote, previsão ou demanda explicam?']],
      interpretation:[['PME sobe e cobertura sobe','Mais estoque em relação ao consumo.'],['PME sobe concentrado na Curva C','Capital pode estar preso em itens de baixo giro.'],['Estoque total alto e ruptura de A','Problema de mix, não apenas de volume total.']],
      cross:[['ciclo-financeiro','PME adiciona dias ao ciclo.'],['ncg','Estoque maior aumenta capital necessário.'],['fluxo-de-caixa','Mostra desembolso que já aconteceu.']],
      caseExample:{title:'Indústria Horizonte — estoque acompanhou o crescimento mais do que deveria',rows:[['PME anterior','24 dias'],['PME atual','38 dias'],['Aumento','14 dias']],insight:'Ao mesmo tempo em que os clientes passaram a pagar mais tarde, o dinheiro também ficou mais tempo em estoque.'},
      nextQuestion:'O aumento é necessário para atender demanda ou está concentrado em itens que não giram?',
      operator:['Mantenha entradas, saídas e inventários confiáveis.','Sinalize itens sem giro e divergências físicas.'],
      manager:['Não aplique corte linear de estoque.','Abra por categoria, criticidade e curva.'],
      exercise:{
        q:'A empresa tem estoque total elevado, mas itens A continuam faltando. Qual investigação faz mais sentido?',
        options:['Aumentar todo o estoque','Abrir mix, curva ABC, giro e cobertura por categoria','Reduzir todo o estoque em 20%'],answer:1,
        feedback:'O problema pode ser composição. Mais estoque total não garante disponibilidade dos itens relevantes.'
      },
      next:['ciclo-financeiro','ncg']
    },

    'ciclo-financeiro':{
      type:'indicator',title:'Ciclo Financeiro',time:'20–30 min',audience:'Gestão financeira e direção',
      summary:'Junte estoque, recebimento e pagamento para entender quantos dias a empresa precisa financiar a operação.',
      outcomes:['Calcular o ciclo com PME, PMR e PMP.','Identificar qual componente explica a mudança.','Simular impacto de reduzir dias.','Relacionar tempo a NCG e caixa.'],
      quick:['PME adiciona dias.','PMR adiciona dias.','PMP reduz dias.','Ciclo maior = mais tempo financiando a operação.'],
      formula:'Ciclo Financeiro = {{pme|PME}} + {{pmr|PMR}} − {{pmp|PMP}}',
      inOneSentence:'Ciclo financeiro mede o intervalo em que o caixa da empresa sustenta a operação antes de o dinheiro retornar.',
      responds:['Quantos dias financiamos a operação?','Qual prazo mais alongou?','A política de vendas, estoque ou compras está pressionando caixa?'],
      doesNotAnswer:['Não mostra sozinho quanto dinheiro isso representa — use NCG.','Não define automaticamente qual prazo deve mudar sem considerar estratégia e operação.'],
      data:['PME, PMR e PMP calculados com metodologia consistente.'],
      quality:['Mesma data-base.','Bases operacionais confiáveis.','Nenhum componente mudou de método de cálculo no meio da comparação.'],
      when:'Mensalmente e durante mudanças relevantes em venda a prazo, estoque ou compras.',
      analysis:[['1. Calcule','PME + PMR − PMP.'],['2. Compare','Quantos dias mudaram?'],['3. Abra componentes','Quem explica a mudança?'],['4. Simule','Quanto cairia se reduzíssemos alguns dias em um componente?'],['5. Valide consequência','Cruze com NCG e Fluxo.']],
      interpretation:[['Ciclo aumenta por PMR','Recebimento ficou mais lento.'],['Ciclo aumenta por PME','Capital ficou mais tempo em estoque.'],['Ciclo cai por PMP maior','Fornecedor financia mais dias; valide custo da negociação.']],
      cross:[['pmr','Tempo até receber.'],['pmp','Tempo até pagar.'],['pme','Tempo em estoque.'],['ncg','Traduz o efeito em necessidade de recursos.'],['fluxo-de-caixa','Mostra quando a pressão aparece.']],
      caseExample:{title:'Indústria Horizonte — o ciclo mais que dobrou',rows:[['Ciclo anterior','24 + 32 − 30 = 26 dias'],['Ciclo atual','38 + 48 − 31 = 55 dias'],['Aumento','29 dias']],insight:'A empresa passou a financiar quase um mês adicional de operação.'},
      nextQuestion:'Qual componente adicionou mais dias e qual ação pode reduzi-lo sem criar um problema maior em vendas, estoque ou fornecedores?',
      operator:['Garanta que dados de clientes, fornecedores e estoque estejam corretos.'],
      manager:['Ataque o componente que mais explica o alongamento e simule consequências antes de definir meta.'],
      exercise:{q:'PME 38 dias + PMR 48 dias − PMP 31 dias resulta em:',options:['55 dias','17 dias','117 dias'],answer:0,feedback:'38 + 48 − 31 = 55 dias. Depois do cálculo, a análise começa: qual componente explica o aumento e o que pode ser feito?'},
      next:['ncg','fluxo-de-caixa','caixa-ruim']
    },

    'ncg':{
      type:'indicator',title:'Necessidade de Capital de Giro (NCG)',time:'25–35 min',audience:'Gestão financeira e direção',
      summary:'Entenda por que crescimento pode consumir caixa quando clientes e estoques aumentam mais rápido que o financiamento de fornecedores.',
      outcomes:['Entender a composição da NCG.','Abrir a variação por clientes, estoque e fornecedores.','Relacionar NCG a crescimento e ciclo financeiro.','Diferenciar falta de caixa por capital de giro de falta de resultado.'],
      quick:['Clientes a receber consomem capital.','Estoque consome capital.','Fornecedores financiam parte da operação.','Crescimento pode elevar NCG mesmo com lucro.'],
      formula:'NCG simplificada = Contas a Receber + Estoques − Fornecedores Operacionais',
      inOneSentence:'NCG mede quanto recurso fica preso na operação para sustentar clientes e estoque depois do financiamento de fornecedores.',
      responds:['Quanto capital a operação exige?','Clientes, estoque ou fornecedores explicam a mudança?','O crescimento está consumindo caixa?'],
      doesNotAnswer:['Não substitui Fluxo de Caixa.','Não mede rentabilidade.','Não deve ser lida sem abrir os componentes.'],
      data:['Contas a receber na data-base.','Estoque na data-base.','Fornecedores operacionais na mesma data-base.'],
      quality:['Baixas/cancelamentos corretos.','Estoque confiável.','Dívida financeira separada de fornecedor operacional.','Mesma data-base.'],
      when:'Mensalmente, durante crescimento e quando caixa piora sem explicação pela DRE.',
      analysis:[['1. Valor total','Quanto capital está preso?'],['2. Componentes','Clientes, estoque ou fornecedores mudaram?'],['3. Crescimento','NCG cresceu mais rápido que receita e resultado?'],['4. Tempo','Ciclo financeiro explica o movimento?'],['5. Financiamento','A empresa consegue financiar a necessidade?']],
      interpretation:[['Clientes sobem','Pode ser crescimento, PMR maior ou atraso.'],['Estoque sobe','Pode ser preparação, compra excessiva ou giro pior.'],['Fornecedores sobem','Pode aliviar NCG se for operacional e sustentável.']],
      cross:[['ciclo-financeiro','Explica a dinâmica de tempo.'],['fluxo-de-caixa','Mostra a consequência no dinheiro.'],['dre-gerencial','Mostra se a operação gera resultado.']],
      caseExample:{title:'Indústria Horizonte — crescimento consumiu capital',rows:[['NCG anterior','R$ 330 mil'],['NCG atual','R$ 540 mil'],['Aumento','R$ 210 mil'],['Resultado operacional','R$ 150 mil positivo']],insight:'A operação exige R$ 210 mil adicionais apesar do resultado positivo. Crescimento e lucro não garantem geração imediata de caixa.'},
      nextQuestion:'Qual componente da NCG aumentou e essa mudança é necessária, temporária ou consequência de um processo pior?',
      operator:['Mantenha clientes, estoque e fornecedores confiáveis.','Use a mesma data-base.','Separe dívida financeira de fornecedor operacional.'],
      manager:['Planeje crescimento considerando capital necessário.','Não trate falta de caixa causada por NCG apenas com corte de despesa.'],
      exercise:{
        q:'A receita cresceu 35%, a DRE continua positiva, contas a receber e estoque aumentaram muito e fornecedores pouco. Qual leitura é mais coerente?',
        options:['O crescimento provavelmente elevou a NCG e consumiu caixa','Lucro positivo impede falta de caixa','A solução automática é cortar despesas fixas'],answer:0,
        feedback:'Mais recursos ficaram presos em clientes e estoque sem financiamento equivalente dos fornecedores. O crescimento pode ser saudável economicamente e exigente financeiramente.'
      },
      next:['fluxo-de-caixa','caixa-ruim']
    }
  },

  diagnostic:{
    id:'caixa-ruim',title:'Meu caixa está ruim',
    summary:'Use este roteiro para sair do sintoma “falta dinheiro” e chegar a uma causa provável acompanhável.',
    intro:'Caixa ruim não é diagnóstico. Antes de cortar despesas, cobrar clientes indiscriminadamente ou buscar empréstimo, separe problema de resultado, timing financeiro, capital de giro e saídas extraordinárias.',
    caseIntro:'Na Indústria Horizonte, receita e resultado cresceram, mas PMR e PME aumentaram, o Ciclo passou de 26 para 55 dias e a NCG subiu R$ 210 mil. O caixa caiu. O problema não era simplesmente “falta de lucro”.',
    path:[
      {n:'1',title:'DRE',text:'A operação gera resultado?',href:'#lesson/dre-gerencial'},
      {n:'2',title:'Fluxo de Caixa',text:'Quando e por qual tipo de movimento o dinheiro cai?',href:'#lesson/fluxo-de-caixa'},
      {n:'3',title:'PMR, PME e PMP',text:'Recebimento, estoque ou pagamento alongaram?',href:'#lesson/ciclo-financeiro'},
      {n:'4',title:'Ciclo Financeiro',text:'Quantos dias adicionais estamos financiando?',href:'#lesson/ciclo-financeiro'},
      {n:'5',title:'NCG',text:'Quanto capital adicional a operação passou a exigir?',href:'#lesson/ncg'},
      {n:'6',title:'Ação',text:'Ataque a causa encontrada e defina indicador para acompanhar.',href:'#diagnostico/caixa-ruim'}
    ],
    branches:[
      {q:'A operação está dando prejuízo?',why:'Se a empresa não gera resultado, o problema pode ser econômico antes de ser financeiro.',verify:'Abra a DRE e identifique se receita, margem ou estrutura explicam resultado negativo.',supports:['Resultado operacional negativo recorrente.','Margem insuficiente para sustentar a estrutura.'],weakens:['Resultado positivo e estável.'],links:[['dre-gerencial','Analisar DRE']]},
      {q:'Estamos demorando mais para receber?',why:'Venda a prazo pode gerar receita e resultado antes de gerar dinheiro.',verify:'Compare PMR, condição comercial, vencidos e carteira de clientes.',supports:['PMR aumentou.','Contas a receber cresceram mais que vendas.','Vencidos aumentaram.'],weakens:['PMR e carteira permanecem estáveis.'],links:[['contas-a-receber','Abrir carteira'],['pmr','Analisar PMR']]},
      {q:'O dinheiro está ficando mais tempo em estoque?',why:'Estoque é caixa convertido em mercadoria ou matéria-prima.',verify:'Compare PME, giro, cobertura, curva e itens sem giro.',supports:['PME aumentou.','Estoque cresceu mais que consumo/vendas.','Itens sem giro aumentaram.'],weakens:['PME e mix permanecem saudáveis.'],links:[['pme','Analisar PME']]},
      {q:'Pagamos antes de receber?',why:'Mesmo com lucro, muitos dias de descasamento exigem financiamento.',verify:'Compare PMR + PME com PMP e calcule o Ciclo Financeiro.',supports:['Ciclo aumentou.','PMR/PME cresceram sem compensação no PMP.'],weakens:['Ciclo curto e estável.'],links:[['pmp','Analisar PMP'],['ciclo-financeiro','Analisar Ciclo']]},
      {q:'Houve investimento, dívida ou saída extraordinária?',why:'Máquina, obra, amortização ou distribuição podem reduzir caixa sem indicar problema operacional.',verify:'Separe movimentos operacionais de investimento, financiamento e eventos não recorrentes no Fluxo.',supports:['Saída relevante fora da operação normal.'],weakens:['Pressão continua mesmo sem eventos extraordinários.'],links:[['fluxo-de-caixa','Analisar Fluxo']]},
      {q:'O crescimento aumentou a necessidade de capital?',why:'Mais clientes a receber e estoque podem consumir caixa antes de o crescimento retornar em dinheiro.',verify:'Compare NCG atual x histórica e abra clientes, estoque e fornecedores.',supports:['NCG cresceu mais rápido que resultado.','Clientes e estoque subiram sem fornecedor acompanhar.'],weakens:['NCG permaneceu estável.'],links:[['ncg','Analisar NCG'],['ciclo-financeiro','Entender prazos']]}
    ],
    finish:'Uma boa investigação termina com cinco definições: causa mais provável, evidência que sustenta a hipótese, ação, responsável e indicador/data para reavaliar. Se você não consegue definir esses cinco pontos, provavelmente ainda está tratando o sintoma.'
  }
};