window.ENSINO_V71 = {
  companyCase: {
    name:'Indústria Horizonte',
    description:'Empresa fictícia B2B usada ao longo dos conteúdos para conectar resultado, caixa, prazos e capital de giro.',
    before:{revenue:'R$ 1,0 mi',margin:'R$ 380 mil',pmr:'32 dias',pmp:'30 dias',pme:'24 dias',cycle:'26 dias',ncg:'R$ 330 mil'},
    after:{revenue:'R$ 1,2 mi',margin:'R$ 390 mil',pmr:'48 dias',pmp:'31 dias',pme:'38 dias',cycle:'55 dias',ncg:'R$ 540 mil'}
  },
  glossary: {
    competencia:{title:'Data de competência',desc:'Período ao qual uma receita ou despesa pertence economicamente. Pode ser diferente da data em que o dinheiro foi pago ou recebido.',link:'caixa-x-competencia'},
    caixa:{title:'Regime de caixa',desc:'Visão baseada no momento em que o dinheiro efetivamente entra ou sai da conta.',link:'fluxo-de-caixa'},
    dre:{title:'DRE Gerencial',desc:'Relatório que organiza receitas, custos, despesas e resultado de um período para apoiar a gestão.',link:'dre-gerencial'},
    plano:{title:'Plano de contas',desc:'Estrutura padronizada usada para classificar receitas, custos e despesas conforme sua natureza.',link:'plano-de-contas'},
    margem:{title:'Margem de contribuição',desc:'Quanto sobra da receita depois dos custos e despesas variáveis. Essa sobra ajuda a pagar a estrutura fixa e gerar resultado.',link:'dre-gerencial'},
    pmr:{title:'PMR — Prazo Médio de Recebimento',desc:'Tempo médio entre a venda e o recebimento do dinheiro. Quanto maior, mais tempo a empresa financia seus clientes.',link:'pmr'},
    pmp:{title:'PMP — Prazo Médio de Pagamento',desc:'Tempo médio entre a compra e o pagamento aos fornecedores. Prazo maior pode aliviar caixa, mas deve ser analisado junto com preço e condições comerciais.',link:'pmp'},
    pme:{title:'PME — Prazo Médio de Estoque',desc:'Tempo médio em que o capital permanece imobilizado em estoque antes de girar.',link:'pme'},
    ciclo:{title:'Ciclo financeiro',desc:'Quantidade de dias em que a empresa precisa financiar a operação entre estoque, venda, recebimento e pagamento a fornecedores.',link:'ciclo-financeiro'},
    ncg:{title:'NCG — Necessidade de Capital de Giro',desc:'Recurso que a operação precisa para sustentar clientes e estoques, descontado o financiamento operacional dos fornecedores.',link:'ncg'},
    centro:{title:'Centro de custo',desc:'Identifica onde a despesa foi consumida ou qual área é responsável por ela. É diferente da natureza definida pelo plano de contas.'},
    inadimplencia:{title:'Inadimplência',desc:'Valor ou percentual de títulos que não foram pagos no vencimento. Deve ser separado de prazo comercial normalmente concedido.'}
  },

  searchAliases:[
    {terms:['nao tenho dinheiro','sem dinheiro','caixa negativo','falta caixa','caixa apertado','vendo e nao sobra','lucro mas falta dinheiro'],target:'#diagnostico/caixa-ruim'},
    {terms:['cliente demora pagar','recebo muito tarde','prazo cliente','vendas a prazo'],target:'#lesson/pmr'},
    {terms:['pago antes de receber','fornecedor curto prazo','prazo fornecedor'],target:'#lesson/ciclo-financeiro'},
    {terms:['estoque alto','dinheiro parado estoque','estoque consome caixa','estoque sem giro'],target:'#lesson/pme'},
    {terms:['empresa cresce e falta caixa','crescimento sem caixa','capital de giro'],target:'#lesson/ncg'},
    {terms:['despesa no mes errado','competencia','data da despesa','paguei em outro mes'],target:'#lesson/caixa-x-competencia'},
    {terms:['onde classificar despesa','qual conta usar','plano de contas','classificacao despesa'],target:'#lesson/plano-de-contas'}
  ],

  financeSequence:[
    {slug:'caixa-x-competencia',title:'Caixa x Competência',why:'Entenda quando uma receita ou despesa pertence ao resultado e quando o dinheiro realmente entra ou sai.',kind:'Conceito'},
    {slug:'plano-de-contas',title:'Plano de Contas',why:'Aprenda a classificar corretamente para que DRE, orçamento e análises mostrem a realidade.',kind:'Conceito operacional'},
    {slug:'fechamento-financeiro',title:'Fechamento Financeiro',why:'Transforme movimentações do mês em uma base estável e confiável para análise.',kind:'Procedimento'},
    {slug:'dre-gerencial',title:'DRE Gerencial',why:'Aprenda a interpretar resultado, margem, estrutura e variações sem parar no faturamento ou no lucro final.',kind:'Análise'},
    {slug:'fluxo-de-caixa',title:'Fluxo de Caixa',why:'Antecipe falta de dinheiro e separe operação normal de investimento, dívida e eventos extraordinários.',kind:'Análise'},
    {slug:'pmr',title:'Prazo Médio de Recebimento (PMR)',why:'Entenda quanto tempo a empresa leva para transformar venda em dinheiro e como isso pressiona o caixa.',kind:'Indicador'},
    {slug:'pmp',title:'Prazo Médio de Pagamento (PMP)',why:'Entenda quanto tempo o fornecedor financia a operação e como negociar prazo sem olhar só os dias.',kind:'Indicador'},
    {slug:'pme',title:'Prazo Médio de Estoque (PME)',why:'Entenda quanto tempo o dinheiro fica imobilizado em estoque e por que média total pode esconder excesso e ruptura.',kind:'Indicador'},
    {slug:'ciclo-financeiro',title:'Ciclo Financeiro',why:'Junte estoque, recebimento e pagamento para enxergar quantos dias a empresa precisa financiar a própria operação.',kind:'Indicador'},
    {slug:'ncg',title:'Necessidade de Capital de Giro (NCG)',why:'Entenda por que uma empresa pode crescer, ter lucro e mesmo assim consumir cada vez mais caixa.',kind:'Indicador'},
    {slug:'caixa-ruim',title:'Meu caixa está ruim',why:'Use um roteiro de investigação para separar prejuízo, prazos, estoque, investimento e crescimento.',kind:'Diagnóstico',diagnostic:true}
  ],

  lessons:{
    'caixa-x-competencia':{
      title:'Caixa x Competência',type:'concept',time:'10–15 min',audience:'Operação e gestão',
      summary:'Entenda por que uma despesa pode pertencer a março na DRE e só sair do banco em abril — e como separar corretamente resultado de movimento financeiro.',
      inOneSentence:'Competência responde “a qual período isso pertence?”. Caixa responde “quando o dinheiro entrou ou saiu?”.',
      quick:['Competência organiza o resultado.','Caixa organiza entradas e saídas de dinheiro.','As duas datas podem ser diferentes sem existir erro.'],
      definitions:[
        ['Competência','A receita ou despesa pertence ao período em que foi gerada ou consumida, mesmo que o recebimento ou pagamento aconteça depois.'],
        ['Caixa','A movimentação aparece quando o dinheiro efetivamente entra ou sai da conta.']
      ],
      example:{title:'Conta de energia de março paga em abril',intro:'A Indústria Horizonte consumiu energia em março. A fatura venceu e foi paga em abril.',rows:[['Na DRE','Março'],['No Fluxo de Caixa','Abril']],insight:'A despesa afeta o resultado de março e o caixa de abril. Misturar as datas distorce uma das duas análises.'},
      extraExamples:[
        ['Manutenção executada em junho e paga em julho','Competência: junho · Caixa: julho'],
        ['Comissão de venda de dezembro paga em janeiro','Competência: dezembro · Caixa: janeiro'],
        ['Seguro anual pago antecipadamente','O caixa sai de uma vez; o reconhecimento gerencial pode precisar respeitar o período coberto conforme o critério adotado pela empresa.']
      ],
      whyMatters:[
        ['DRE confiável','Se a competência estiver errada, um mês pode parecer melhor e outro pior sem que a operação tenha realmente mudado.'],
        ['Comparação válida','Mês contra mês só faz sentido quando receitas e despesas seguem o mesmo critério.'],
        ['Diagnóstico correto','Uma variação criada apenas pela data errada pode levar o gestor a investigar custo, preço ou produtividade sem necessidade.']
      ],
      rules:[
        ['1. Identifique o fato econômico','Quando a receita foi gerada ou quando o recurso foi efetivamente consumido?'],
        ['2. Registre a competência','Essa é a data que deve alimentar a análise de resultado.'],
        ['3. Registre o movimento financeiro','Quando o dinheiro efetivamente entrou ou saiu?'],
        ['4. Preserve o critério','Situações equivalentes precisam receber o mesmo tratamento ao longo dos meses.']
      ],
      evidence:['Documento ou contrato identifica o período do serviço.','Nota fiscal informa competência ou período de referência quando aplicável.','Equipe responsável confirma quando o recurso foi consumido.'],
      errorChain:['Despesa de março lançada em abril','Março fica artificialmente melhor','Abril fica artificialmente pior','A DRE mostra uma variação que não ocorreu','O gestor investiga uma causa inexistente'],
      operator:['Identifique o período real antes de olhar a data do pagamento.','Use documento, contrato, período de consumo e contexto como evidência.','Sinalize dúvidas materiais antes do fechamento.'],
      manager:['Entenda que DRE e banco não precisam fechar pelo mesmo mês.','Ao ver uma variação forte, confirme se houve mudança de competência antes de concluir.'],
      exercise:{q:'Uma manutenção foi executada em 28 de junho e paga em 10 de julho. Em qual mês a despesa deve aparecer na DRE?',options:['Junho','Julho','Nos dois meses'],answer:0,feedback:'A manutenção foi realizada em junho. O pagamento em julho afeta o fluxo de caixa de julho.'},
      next:['plano-de-contas','fechamento-financeiro','dre-gerencial']
    },

    'plano-de-contas':{
      title:'Plano de Contas',type:'concept',time:'15–20 min',audience:'Principalmente operação',
      summary:'Aprenda a classificar receitas e despesas pela natureza correta, diferenciar plano de contas de centro de custo e entender como um erro operacional muda a leitura gerencial.',
      inOneSentence:'Plano de contas responde “o que é esta movimentação?”. Centro de custo responde “onde ou por quem ela foi consumida?”.',
      quick:['Classifique pela natureza, não pelo fornecedor.','Evite contas genéricas como destino padrão.','Natureza e centro de custo são perguntas diferentes.'],
      why:'Sem classificação consistente, a DRE pode fechar matematicamente e ainda assim contar uma história errada.',
      principle:'O fornecedor responde “de quem comprei?”. A conta responde “o que a empresa consumiu?”.',
      example:{title:'O mesmo fornecedor pode gerar despesas diferentes',intro:'A Indústria Horizonte recebeu três cobranças do Google.',rows:[['Google Ads','Marketing / mídia'],['Google Workspace','Software / administrativo'],['Google Cloud','Tecnologia / infraestrutura']],insight:'O fornecedor é o mesmo. A natureza é diferente. Classificar tudo como “Google” ou “Marketing” destrói a qualidade da análise.'},
      classificationTree:[
        ['1. O que aconteceu?','Receita, custo diretamente ligado ao produto/serviço ou despesa de estrutura?'],
        ['2. Qual é a natureza?','Marketing, pessoal, tecnologia, manutenção, frete, ocupação, matéria-prima etc.'],
        ['3. Onde foi consumido?','Se a empresa utiliza centro de custo, identifique a área responsável.'],
        ['4. Existe conta padronizada?','Use a estrutura existente antes de criar nova categoria.'],
        ['5. A mesma situação foi tratada assim antes?','Consistência é necessária para comparar meses.']
      ],
      accountVsCenter:[
        ['Plano de contas','Natureza','Software, energia, comissão, matéria-prima'],
        ['Centro de custo','Responsabilidade / local de consumo','Administrativo, Comercial, Fábrica, Filial 02']
      ],
      commonMistakes:['Classificar pelo fornecedor.','Criar uma conta nova para cada pequena variação.','Usar “Outros” como destino frequente.','Mudar a conta usada para a mesma despesa entre meses.','Confundir natureza com área responsável.'],
      whyMatters:[
        ['DRE','A linha gerencial fica distorcida.'],
        ['Orçamento','Realizado x planejado deixa de ser comparável.'],
        ['Gestão por área','Centro de custo incorreto atribui gasto à área errada.'],
        ['Decisão','O gestor pode reduzir o orçamento de uma área que nem gerou aquele gasto.']
      ],
      errorChain:['Software classificado como Marketing','Despesa de Marketing aparece acima do real','Gestor conclui que mídia está cara','Corta campanha','Ação ataca o problema errado'],
      operator:['Leia o documento e entenda o que foi adquirido.','Peça contexto quando a descrição não for suficiente.','Revise contas genéricas no fechamento.','Documente regra para situações recorrentes.'],
      manager:['Abra lançamentos quando uma linha se comportar de forma estranha.','Confirme qualidade de classificação antes de responsabilizar uma área.'],
      exercise:{q:'Uma cobrança da Microsoft é referente ao Microsoft 365 usado pelo administrativo. Qual lógica é mais adequada?',options:['Classificar como “Microsoft”','Classificar pela natureza, como software, e pelo centro de custo administrativo quando aplicável','Classificar como marketing porque é uma empresa de tecnologia'],answer:1,feedback:'Fornecedor, natureza e centro de custo são dimensões diferentes.'},
      next:['fechamento-financeiro','dre-gerencial']
    },

    'fechamento-financeiro':{
      title:'Fechamento Financeiro',type:'procedure',time:'20–30 min',audience:'Operação com validação da gestão',
      summary:'Um roteiro para encerrar o mês com dados confiáveis antes de transformar números em análise e decisão.',
      objective:'O fechamento existe para transformar movimentações operacionais em uma versão estável do mês, com critérios consistentes e pendências conhecidas.',
      quick:['Concilie bancos.','Revise pagar e receber.','Valide competência e classificação.','Cheque receita, impostos e custos.','Documente pendências antes de liberar para análise.'],
      roles:[['Executa','Financeiro operacional'],['Valida','Responsável financeiro / controladoria quando houver'],['Utiliza','Gestores e direção']],
      before:['Todas as contas bancárias acessíveis e atualizadas.','Contas a pagar e a receber lançadas e baixadas.','Documentos principais disponíveis.','Regras de {{competencia|competência}} e {{plano|plano de contas}} definidas.'],
      steps:[
        ['1. Concilie os bancos','Compare movimentações do sistema com extratos. Diferenças precisam ser explicadas, não mascaradas com uma conta “Ajuste”.'],
        ['2. Revise contas a pagar','Procure títulos duplicados, vencidos sem baixa, pagamentos sem lançamento e renegociações não atualizadas.'],
        ['3. Revise contas a receber','Valide baixas, atrasos, recebimentos antecipados, estornos e títulos em aberto.'],
        ['4. Revise competência','Confirme se receitas e despesas pertencem ao período correto.'],
        ['5. Revise classificação','Abra contas genéricas, “Outros” e linhas com variação relevante. Confira plano de contas e centro de custo.'],
        ['6. Valide faturamento e impostos','Confronte o que entrou na análise com relatórios de origem.'],
        ['7. Valide custos e eventos relevantes','Confirme custos do período, provisões materiais e fatos extraordinários.'],
        ['8. Registre ajustes e libere a versão','Após validação, mudanças no período precisam de rastreabilidade.']
      ],
      stageValidation:[
        ['Conciliação','Saldo e movimentações explicados; nenhuma diferença material sem justificativa.'],
        ['Pagar / receber','Baixas, vencimentos e pendências relevantes conferidos.'],
        ['Competência','Principais receitas e despesas pertencem ao período correto.'],
        ['Classificação','Contas genéricas e variações relevantes revisadas.'],
        ['Resultado','Receita, impostos e custos relevantes validados com a origem.']
      ],
      finishCriteria:['Bancos conciliados.','Pendências materiais resolvidas ou explicitadas.','Competência revisada.','Contas genéricas revisadas.','Receita, impostos e custos relevantes validados.','Ajustes documentados.','Versão pronta para análise gerencial.'],
      notReady:['Existem diferenças bancárias sem explicação.','O mês muda toda vez que alguém lança uma nota antiga.','Receitas ou custos relevantes ainda não foram conferidos.','Há valores relevantes em “Outros” sem abertura.'],
      errorChain:['Mês apresentado antes do fechamento','DRE usa dados incompletos','Gestor discute uma variação que depois desaparece','Reunião perde confiança','Equipe passa a desacreditar do indicador'],
      operator:['Execute o checklist na mesma ordem.','Documente pendências que permanecerem abertas.','Não force saldo ou categoria apenas para o relatório “fechar”.'],
      manager:['Não inicie análise sem saber se o mês está fechado.','Pergunte quais estimativas e pendências ainda existem.','Separe erro de dado de problema real de gestão.'],
      exercise:{q:'O saldo final do sistema bate com o banco, mas várias movimentações foram lançadas como “Ajuste”. O fechamento está confiável?',options:['Sim, porque o saldo final bate','Não, porque a conciliação precisa explicar as movimentações','Sim, desde que “Ajuste” represente menos de 1%'],answer:1,feedback:'Bater saldo não basta. O fechamento precisa preservar a natureza e a rastreabilidade das movimentações.'},
      next:['dre-gerencial','fluxo-de-caixa']
    },

    'dre-gerencial':{
      title:'DRE Gerencial',type:'analysis',time:'30–40 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a transformar a DRE de uma sequência de números em um raciocínio: o que mudou, por que mudou e qual parte do negócio precisa ser investigada.',
      inOneSentence:'A DRE mostra como o faturamento de um período vai sendo consumido até chegar ao resultado.',
      quick:['1. Receita: o que mudou?','2. Margem: a qualidade da venda acompanhou?','3. Estrutura: despesas cresceram proporcionalmente?','4. Resultado: consequência do que veio antes.','5. Variações: quais linhas explicam a mudança?'],
      responds:['A empresa está gerando resultado?','O resultado melhorou ou piorou?','A mudança veio de faturamento, margem ou estrutura?','As despesas cresceram mais rápido que a receita?','O crescimento está trazendo resultado ou apenas volume?'],
      doesNotAnswer:['Quando exatamente faltará dinheiro no banco.','Por que um cliente específico deixou de comprar.','Qual item de estoque está parado sem abrir a análise de estoque.','Qual máquina está causando atraso de produção.'],
      before:['Mês fechado e validado.','{{competencia|Competência}} aplicada de forma consistente.','{{plano|Plano de contas}} revisado.','Receita e impostos conferidos.','Custos relevantes atualizados.','Eventos extraordinários identificados.'],
      anatomy:[
        ['Receita Bruta','Quanto a empresa vendeu antes das deduções.'],['(-) Impostos e deduções','O que reduz a receita até chegar ao valor líquido.'],['= Receita Líquida','Base efetiva para sustentar custos e estrutura.'],['(-) Custos e despesas variáveis','Gastos que acompanham diretamente a venda.'],['= Margem de Contribuição','Quanto sobra para pagar a estrutura fixa e gerar resultado.'],['(-) Despesas fixas','Estrutura administrativa, comercial e operacional.'],['= Resultado Operacional','O que a operação gerou depois de sustentar sua estrutura.']
      ],
      analysisSteps:[
        ['1. Receita','Meça a variação em valor e percentual. Depois decomponha em preço, volume, mix, clientes e sazonalidade. “Vendeu mais” é o início, não a conclusão.'],
        ['2. Margem','Compare valor e percentual. Se receita cresce e margem não acompanha, investigue preço, desconto, custo, mix, frete, comissão e impostos.'],
        ['3. Estrutura fixa','Compare valor, % da receita e orçamento. Uma despesa pode subir em reais e melhorar proporcionalmente.'],
        ['4. Resultado','Leia como consequência das etapas anteriores. Evite começar pelo lucro e sair procurando culpados.'],
        ['5. Variações relevantes','Toda mudança material precisa de hipótese concreta. Se não existe explicação operacional, volte à qualidade do dado.']
      ],
      compare:[['Mês anterior','Mudança recente; cuidado com sazonalidade.'],['Mesmo mês do ano anterior','Ajuda em negócios sazonais.'],['Orçado x realizado','Mostra desvios do plano.'],['% da receita','Mostra eficiência e peso relativo.'],['Acumulado do ano','Reduz reação exagerada a um mês isolado.']],
      caseExample:{title:'Indústria Horizonte — crescimento com deterioração de margem',intro:'A empresa cresceu vendas, mas a margem praticamente não acompanhou.',rows:[['Receita anterior','R$ 1,0 mi'],['Receita atual','R$ 1,2 mi'],['Margem anterior','R$ 380 mil'],['Margem atual','R$ 390 mil']],insight:'A receita cresceu 20%, mas a margem cresceu apenas 2,6%. Antes de comemorar o crescimento, a gestão deve abrir preço, custo, desconto, mix, frete, comissão e impostos.'},
      scenario2:{title:'Despesa aumentou em reais, mas melhorou proporcionalmente',rows:[['Receita — Jan','R$ 1,0 mi'],['Despesa Adm. — Jan','R$ 100 mil (10%)'],['Receita — Fev','R$ 1,5 mi'],['Despesa Adm. — Fev','R$ 120 mil (8%)']],insight:'A despesa subiu R$ 20 mil, mas caiu de 10% para 8% da receita. Valor absoluto e eficiência contam histórias diferentes.'},
      investigations:[['Faturamento caiu','Abra volume, ticket, clientes ativos, frequência, mix e sazonalidade.'],['Faturamento subiu e margem caiu','Abra preço, descontos, custos, mix, comissões, impostos e frete.'],['Margem está boa e resultado piorou','Abra despesas fixas por grupo e procure novas estruturas ou gastos extraordinários.'],['DRE dá lucro, mas caixa piora','Vá para Fluxo de Caixa, {{pmr|PMR}}, {{pmp|PMP}}, {{pme|PME}}, {{ciclo|Ciclo Financeiro}} e {{ncg|NCG}}.']],
      notConclude:['“Faturamento cresceu, então estamos melhores.”','“Lucro caiu, então precisamos cortar despesas.”','“Despesa aumentou em reais, então piorou.”','“A DRE está positiva, então o caixa deveria estar positivo.”'],
      operator:['Garanta competência correta.','Classifique pela natureza.','Revise contas genéricas e variações relevantes.','Mantenha critérios estáveis.','Documente eventos extraordinários.'],
      manager:['Comece pela pergunta “o que mudou?”.','Abra as linhas que explicam a maior parte da variação.','Cruze resultado com indicadores operacionais antes de agir.','Separe problema real de distorção de dado.'],
      errorChain:['Despesa no mês errado','DRE melhora artificialmente','Mês seguinte piora artificialmente','Gestor interpreta tendência inexistente','Ação é tomada sobre um problema que não ocorreu'],
      exercise:{q:'A receita da Indústria Horizonte cresceu 20%, mas a margem cresceu apenas 2,6%. Qual é a melhor próxima investigação?',options:['Comemorar o crescimento e encerrar','Abrir preço, custo, desconto, mix, frete, comissão e impostos','Cortar despesas administrativas imediatamente'],answer:1,feedback:'O sinal principal está na qualidade da venda, antes da estrutura fixa.'},
      next:['fluxo-de-caixa','pmr','pme','ciclo-financeiro']
    },

    'fluxo-de-caixa':{
      title:'Fluxo de Caixa',type:'analysis',time:'25–30 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a enxergar quando o dinheiro entra e sai, antecipar faltas de caixa e separar problema operacional de investimento ou evento extraordinário.',
      inOneSentence:'DRE mostra resultado; fluxo de caixa mostra dinheiro e tempo.',
      quick:['Confirme o saldo real.','Projete entradas e saídas nas datas reais.','Procure vales de caixa antes de chegar a zero.','Explique a origem da queda: operação, prazo, estoque, investimento ou dívida.'],
      responds:['Quanto dinheiro temos de fato?','Quais entradas e saídas estão previstas?','Em que data o caixa pode ficar crítico?','A falta de caixa vem da operação ou de evento extraordinário?'],
      doesNotAnswer:['Sozinho, não mostra se a empresa é lucrativa.','Não explica sozinho qual produto ou cliente destruiu margem.','Não substitui a DRE nem os indicadores de prazos e estoque.'],
      before:['Bancos conciliados.','Contas a pagar e a receber atualizadas.','Datas de vencimento revisadas.','Movimentos extraordinários identificados.'],
      analysisSteps:[['1. Saldo real','O ponto de partida precisa bater com os bancos.'],['2. Projeção','Liste entradas e saídas nas datas em que devem acontecer.'],['3. Vales de caixa','Identifique dias ou semanas em que o saldo fica pressionado.'],['4. Causa','Separe operação normal, investimento, dívida, distribuição e eventos não recorrentes.'],['5. Cruzamento','Se a pressão é recorrente, investigue DRE, PMR, PMP, PME, Ciclo e NCG.']],
      caseExample:{title:'Indústria Horizonte — lucro positivo, caixa em queda',intro:'A empresa aumentou vendas a prazo e estoque para sustentar o crescimento.',rows:[['Receita','R$ 1,2 mi'],['Resultado operacional','positivo'],['PMR','48 dias'],['PME','38 dias'],['Ciclo financeiro','55 dias']],insight:'A empresa pode gerar lucro e ainda consumir caixa porque mais recursos ficam presos em clientes e estoque por mais tempo.'},
      profitVsCash:[['Venda a prazo','Pode aumentar receita e lucro hoje, mas o dinheiro entra depois.'],['Compra de máquina','Reduz caixa agora sem aparecer integralmente como despesa operacional da DRE.'],['Estoque crescendo','Consome caixa antes de virar venda.'],['Pagamento de dívida','Reduz caixa sem significar necessariamente piora operacional.']],
      notConclude:['“Tenho dinheiro no banco hoje, então o caixa está saudável.”','“A DRE tem lucro, então não deveria faltar dinheiro.”','“Caixa negativo significa necessariamente prejuízo.”'],
      operator:['Concilie bancos.','Atualize vencimentos e baixas.','Revise previsões quando datas mudarem.','Separe transferências internas para não duplicar movimentos.'],
      manager:['Analise projeção, não apenas saldo atual.','Pergunte qual evento explica a queda.','Cruze com DRE, prazos, estoque e crescimento.'],
      exercise:{q:'A DRE da Indústria Horizonte mostra lucro, mas o caixa caiu por três meses. O que deve ser investigado primeiro?',options:['Assumir que a DRE está errada','Prazos, estoque, investimentos, dívidas e capital de giro','Ignorar o caixa porque a DRE tem lucro'],answer:1,feedback:'Lucro e caixa medem dimensões diferentes. O tempo do dinheiro e o capital preso na operação são hipóteses centrais.'},
      next:['pmr','pmp','pme','ciclo-financeiro','ncg','caixa-ruim']
    },

    'pmr':{
      title:'Prazo Médio de Recebimento (PMR)',type:'indicator',time:'15–20 min',audience:'Gestão e operação financeira',
      summary:'Entenda quanto tempo, em média, a empresa leva para transformar venda em dinheiro e como separar prazo comercial de atraso real.',
      inOneSentence:'PMR mede quantos dias, em média, o dinheiro fica com o cliente depois que a venda aconteceu.',
      quick:['PMR maior = dinheiro demora mais para voltar.','Separe prazo negociado de atraso.','Cruze sempre com inadimplência, ciclo financeiro e caixa.'],
      formula:'Forma gerencial comum: PMR ≈ (Contas a Receber médio ÷ Vendas a prazo do período) × dias do período. A metodologia deve permanecer consistente entre os meses.',
      responds:['Estamos recebendo mais devagar?','O prazo comercial está aumentando?','O problema é condição de venda ou atraso de clientes?','Quanto tempo adicional estamos financiando a carteira?'],
      doesNotAnswer:['Não mostra sozinho se a empresa está inadimplente.','Não diz se aumentar prazo comercial foi uma boa decisão de margem e volume.'],
      data:['Contas a receber confiável.','Datas de venda, vencimento e baixa.','Receita/vendas do período conforme metodologia adotada.'],
      quality:['Baixas estão atualizadas.','Títulos renegociados estão com datas corretas.','Atrasos não foram “sumidos” com baixa manual.','A base usa o mesmo critério entre períodos.'],
      when:'Mensalmente e sempre que houver mudança relevante na política comercial ou na inadimplência.',
      analysis:[['1. Tendência','Compare o PMR atual com histórico e meta.'],['2. Abra a carteira','Separe clientes, condições comerciais e atrasos.'],['3. Diferencie causa','Prazo maior por estratégia comercial é diferente de atraso.'],['4. Meça impacto','Cruze com fluxo, ciclo e NCG.']],
      interpretation:[['PMR sobe e inadimplência também sobe','Provável deterioração da cobrança / qualidade da carteira.'],['PMR sobe, inadimplência estável e parcelamento aumentou','Mudança comercial pode explicar.'],['PMR cai, mas margem cai forte','Talvez a empresa esteja comprando recebimento mais rápido com desconto ou condição comercial pior; investigue.']],
      cross:[['fluxo-de-caixa','Mostra quando o recebimento lento pressiona o saldo.'],['ciclo-financeiro','PMR alonga o período financiado.'],['ncg','Clientes a receber maiores tendem a elevar NCG.'],['fluxo-de-caixa','Mostra quando o atraso vira pressão real no caixa.']],
      caseExample:{title:'Indústria Horizonte — recebimento ficou mais lento',rows:[['PMR anterior','32 dias'],['PMR atual','48 dias'],['Aumento','16 dias']],insight:'A empresa passou a financiar seus clientes por mais 16 dias, ao mesmo tempo em que cresceu vendas. Isso ajuda a explicar a pressão no caixa.'},
      operator:['Mantenha vencimentos e baixas corretos.','Registre renegociações.','Sinalize títulos vencidos e divergências.'],
      manager:['Pergunte se a mudança veio de política comercial ou atraso.','Avalie impacto de prazo junto com margem e volume.'],
      exercise:{q:'O PMR subiu de 32 para 48 dias, mas a inadimplência ficou estável e a empresa passou a vender mais parcelado. Qual hipótese é mais provável?',options:['Apenas piora de cobrança','Mudança na condição comercial','Erro de estoque'],answer:1,feedback:'O aumento pode ser estratégico/comercial. O próximo passo é medir se o ganho de vendas e margem compensa o capital adicional necessário.'},
      next:['pmp','pme','ciclo-financeiro','ncg']
    },

    'pmp':{
      title:'Prazo Médio de Pagamento (PMP)',type:'indicator',time:'12–18 min',audience:'Gestão e operação financeira',
      summary:'Entenda por quantos dias, em média, os fornecedores financiam a operação — sem cair no erro de pensar que prazo maior é sempre melhor.',
      inOneSentence:'PMP mede quanto tempo a empresa leva, em média, para pagar seus fornecedores operacionais.',
      quick:['PMP maior pode aliviar caixa.','Prazo precisa ser analisado junto com preço e risco de fornecimento.','Cruze PMP com PMR, PME e ciclo financeiro.'],
      formula:'Forma gerencial comum: PMP ≈ (Fornecedores operacionais médios ÷ Compras do período) × dias do período. Preserve o mesmo critério entre os meses.',
      responds:['Estamos pagando mais cedo ou mais tarde?','Quanto do ciclo é financiado pelos fornecedores?','A negociação de prazo está acompanhando o crescimento?'],
      doesNotAnswer:['Não diz sozinho se a compra ficou mais cara.','Não mede qualidade do fornecedor ou risco de ruptura.'],
      data:['Fornecedores operacionais a pagar.','Datas de compra, vencimento e pagamento.','Compras/consumo do período conforme metodologia definida.'],
      quality:['Renegociações atualizadas.','Pagamentos antecipados identificados.','Dívidas financeiras não misturadas com fornecedor operacional.'],
      when:'Mensalmente e em negociações relevantes de compras e fornecedores.',
      analysis:[['1. Tendência','Compare PMP atual com histórico.'],['2. Preço x prazo','Veja se mais prazo veio acompanhado de custo maior.'],['3. Concentração','Cheque vencimentos concentrados em determinados dias.'],['4. Cruzamento','Compare com PMR e PME.']],
      interpretation:[['PMP aumenta sem aumento relevante de custo','Pode aliviar capital de giro.'],['PMP aumenta, mas fornecedor retira desconto importante','Benefício financeiro pode desaparecer.'],['PMP muito menor que PMR + PME','Empresa provavelmente financia grande parte do ciclo com caixa próprio ou dívida.']],
      cross:[['pmr','Compara tempo até receber.'],['pme','Inclui tempo em estoque.'],['ciclo-financeiro','PMP reduz o ciclo financiado pela empresa.'],['fluxo-de-caixa','Mostra datas de saída reais.']],
      caseExample:{title:'Indústria Horizonte — fornecedor quase não acompanhou o crescimento',rows:[['PMP anterior','30 dias'],['PMP atual','31 dias'],['PMR atual','48 dias'],['PME atual','38 dias']],insight:'O prazo de fornecedor praticamente não mudou, enquanto recebimento e estoque se alongaram. O descasamento ficou muito maior.'},
      operator:['Cadastre vencimentos e renegociações corretamente.','Evite antecipação fora de política sem justificativa.'],
      manager:['Negocie prazo considerando preço, desconto e risco.','Observe concentração de vencimentos além da média.'],
      exercise:{q:'Um fornecedor oferece +15 dias de prazo, mas aumenta o preço em 6%. O que fazer?',options:['Aceitar porque prazo maior é sempre melhor','Comparar o benefício financeiro do prazo com o custo adicional e o impacto na margem','Recusar automaticamente'],answer:1,feedback:'Prazo é uma dimensão da negociação. O custo total precisa ser comparado.'},
      next:['pme','ciclo-financeiro','ncg']
    },

    'pme':{
      title:'Prazo Médio de Estoque (PME)',type:'indicator',time:'15–20 min',audience:'Gestão, compras, estoque e financeiro',
      summary:'Entenda por quantos dias o capital fica imobilizado em estoque e por que a média total pode esconder excesso e ruptura ao mesmo tempo.',
      inOneSentence:'PME mede por quanto tempo, em média, o dinheiro fica convertido em estoque antes de girar.',
      quick:['PME maior = capital parado por mais tempo.','Abra por categoria e curva ABC.','Estoque alto não significa disponibilidade do item certo.'],
      formula:'Forma gerencial comum: PME ≈ (Estoque médio ÷ Custo ou consumo do período) × dias do período. A base deve refletir a natureza do negócio.',
      responds:['O estoque está girando mais devagar?','Quanto tempo de capital está imobilizado?','Quais categorias explicam o aumento?','Existe excesso mesmo com ruptura?'],
      doesNotAnswer:['Não identifica sozinho qual SKU está em excesso.','Não define sozinho o estoque ideal; demanda, prazo de fornecedor e nível de serviço importam.'],
      data:['Estoque médio confiável.','Custo/consumo do período.','Movimentações de entrada, saída e inventário.'],
      quality:['Acuracidade de estoque aceitável.','Perdas e obsolescência registradas.','Transferências não duplicadas.','Itens sem giro não escondidos na média.'],
      when:'Mensalmente e com abertura por família/categoria quando houver aumento relevante ou falta de caixa.',
      analysis:[['1. Tendência','Veja se o PME está subindo.'],['2. Abra por categoria','A média geral pode esconder problemas opostos.'],['3. Separe excesso e ruptura','Confira itens parados e itens críticos em falta.'],['4. Relacione a compras','Cheque lote, frequência e prazo de fornecedor.']],
      interpretation:[['PME sobe e cobertura sobe','Provável aumento de estoque em relação ao consumo.'],['PME sobe concentrado em Curva C','Capital pode estar preso em itens de baixo giro.'],['Estoque total alto e ruptura de A','Mix de estoque está desalinhado, não apenas o volume total.']],
      cross:[['ciclo-financeiro','PME alonga o ciclo.'],['ncg','Estoque maior tende a elevar capital necessário.'],['fluxo-de-caixa','Mostra o desembolso que já aconteceu.']],
      caseExample:{title:'Indústria Horizonte — crescimento veio acompanhado de estoque',rows:[['PME anterior','24 dias'],['PME atual','38 dias'],['Aumento','14 dias']],insight:'Mais capital ficou parado em estoque justamente quando a empresa também passou a receber mais devagar. Os dois efeitos se somam.'},
      operator:['Garanta entradas, saídas e inventários confiáveis.','Sinalize itens sem giro e divergências físicas.'],
      manager:['Não reduza estoque de forma linear.','Abra por categoria e criticidade antes de definir meta.'],
      exercise:{q:'A empresa tem estoque total elevado, mas continua faltando itens de alto giro. Qual conclusão é mais adequada?',options:['Aumentar todo o estoque','Abrir o estoque por categoria/curva e analisar mix, giro e cobertura','Reduzir todo o estoque em 20%'],answer:1,feedback:'O problema pode ser composição do estoque, não apenas valor total.'},
      next:['ciclo-financeiro','ncg']
    },

    'ciclo-financeiro':{
      title:'Ciclo Financeiro',type:'indicator',time:'18–25 min',audience:'Gestão financeira e direção',
      summary:'Junte estoque, recebimento e pagamento para enxergar quantos dias a empresa precisa financiar a própria operação.',
      inOneSentence:'Ciclo Financeiro = {{pme|PME}} + {{pmr|PMR}} − {{pmp|PMP}}.',
      quick:['PME adiciona dias.','PMR adiciona dias.','PMP reduz dias.','Quanto maior o ciclo, mais tempo o caixa sustenta a operação.'],
      responds:['Quantos dias a empresa financia a operação?','Qual componente mais alongou o ciclo?','A política comercial, estoque ou compras está pressionando caixa?'],
      doesNotAnswer:['Não mostra sozinho quanto dinheiro isso representa. Para isso, use NCG e fluxo.','Não diz automaticamente qual prazo deve ser reduzido sem considerar operação e estratégia.'],
      data:['PME confiável.','PMR confiável.','PMP confiável.'],
      quality:['Todos os prazos calculados na mesma data-base e com metodologia consistente.','Bases de clientes, estoque e fornecedores atualizadas.'],
      when:'Mensalmente e sempre que houver mudança relevante em venda a prazo, compras ou política de estoque.',
      analysis:[['1. Calcule o ciclo','PME + PMR − PMP.'],['2. Compare com histórico','A empresa está financiando mais dias que antes?'],['3. Abra os componentes','Qual prazo explica a mudança?'],['4. Simule','Quanto o ciclo cairia se PMR ou PME reduzissem alguns dias?']],
      interpretation:[['Ciclo aumenta por PMR','Recebimento ficou mais lento.'],['Ciclo aumenta por PME','Capital ficou mais tempo em estoque.'],['Ciclo cai por PMP maior','Fornecedor passou a financiar mais dias — valide custo da negociação.']],
      cross:[['pmr','Tempo até receber.'],['pmp','Tempo até pagar.'],['pme','Tempo em estoque.'],['ncg','Transforma o efeito operacional em necessidade de recursos.'],['fluxo-de-caixa','Mostra quando a pressão aparece no saldo.']],
      caseExample:{title:'Indústria Horizonte — o ciclo mais que dobrou',rows:[['Ciclo anterior','24 + 32 − 30 = 26 dias'],['Ciclo atual','38 + 48 − 31 = 55 dias'],['Aumento','29 dias']],insight:'A empresa passou a financiar quase um mês adicional de operação. O crescimento de vendas veio com uma exigência muito maior de caixa.'},
      operator:['Garanta dados corretos de clientes, fornecedores e estoque.'],
      manager:['Ataque o componente que mais explica o alongamento e avalie consequências comerciais/operacionais antes de definir meta.'],
      exercise:{q:'PME 38 dias + PMR 48 dias − PMP 31 dias resulta em qual ciclo?',options:['55 dias','17 dias','117 dias'],answer:0,feedback:'38 + 48 − 31 = 55 dias.'},
      next:['ncg','fluxo-de-caixa','caixa-ruim']
    },

    'ncg':{
      title:'Necessidade de Capital de Giro (NCG)',type:'indicator',time:'20–30 min',audience:'Gestão financeira e direção',
      summary:'Entenda por que crescimento pode consumir caixa quando clientes e estoques aumentam mais rápido que o financiamento dos fornecedores.',
      inOneSentence:'NCG mede quanto recurso fica preso na operação para sustentar clientes e estoques, descontado o financiamento dos fornecedores.',
      quick:['Clientes a receber consomem capital.','Estoque consome capital.','Fornecedores ajudam a financiar a operação.','Crescimento pode elevar a NCG mesmo com lucro.'],
      responds:['Quanto capital a operação exige?','Clientes, estoque ou fornecedores explicam a mudança?','O crescimento está consumindo caixa?','A NCG está crescendo mais rápido que a capacidade financeira da empresa?'],
      doesNotAnswer:['Não substitui fluxo de caixa.','Não mede sozinho rentabilidade da operação.','Não deve ser lida sem entender os componentes.'],
      formula:'NCG simplificada = Contas a Receber + Estoques − Fornecedores Operacionais',
      data:['Contas a receber na data-base.','Estoques na data-base.','Fornecedores operacionais na data-base.'],
      quality:['Cancelamentos e baixas tratados corretamente.','Estoque confiável.','Dívida financeira separada de fornecedor operacional.','Mesma data-base entre os componentes.'],
      when:'Mensalmente, durante crescimento acelerado e quando caixa começa a ficar pressionado sem explicação pela DRE.',
      analysis:[['1. Veja a NCG total','Quanto capital está preso na operação?'],['2. Abra componentes','Clientes, estoque ou fornecedores explicam a mudança?'],['3. Compare com crescimento','NCG cresceu mais rápido que receita e resultado?'],['4. Cruze com ciclo','Prazos ajudam a explicar por que os saldos aumentaram.'],['5. Conecte ao caixa','Veja se a empresa tem recursos para financiar a necessidade.']],
      interpretation:[['Clientes sobem','Pode ser crescimento de vendas, PMR maior ou atraso.'],['Estoque sobe','Pode ser preparação para crescimento, compra excessiva ou giro pior.'],['Fornecedores sobem','Pode aliviar NCG, desde que seja operacional e sustentável.']],
      cross:[['ciclo-financeiro','Explica dinâmica de tempo.'],['fluxo-de-caixa','Mostra consequência financeira.'],['dre-gerencial','Mostra se a operação gera resultado para sustentar crescimento.']],
      caseExample:{title:'Indústria Horizonte — crescimento consumiu capital',rows:[['NCG anterior','R$ 330 mil'],['NCG atual','R$ 540 mil'],['Aumento','R$ 210 mil']],insight:'Mesmo com crescimento e resultado positivo, a operação passou a exigir R$ 210 mil adicionais. Se a empresa não gerar ou captar esse recurso, o caixa fica pressionado.'},
      operator:['Mantenha clientes, estoque e fornecedores confiáveis.','Use a mesma data-base.','Evite misturar dívida bancária com fornecedor operacional.'],
      manager:['Planeje crescimento com necessidade de capital.','Não trate falta de caixa causada por NCG apenas com corte de despesa.'],
      exercise:{q:'A receita cresce, clientes e estoque aumentam e fornecedores ficam estáveis. Qual tendência é mais provável?',options:['NCG aumentar','NCG cair automaticamente','NCG ficar sempre igual'],answer:0,feedback:'Mais capital fica preso em clientes e estoques sem aumento equivalente do financiamento operacional.'},
      next:['fluxo-de-caixa','caixa-ruim']
    }
  },

  diagnostic:{
    id:'caixa-ruim',title:'Meu caixa está ruim',summary:'Use esta página como roteiro de investigação. Caixa ruim é um sintoma: teste hipóteses e procure evidências antes de escolher a ação.',
    intro:'Evite começar por “cortar despesas” ou “pegar empréstimo”. Primeiro descubra qual mecanismo está consumindo o dinheiro. Prejuízo, recebimento lento, estoque, prazos, investimento e crescimento podem produzir o mesmo sintoma.',
    caseIntro:'Na Indústria Horizonte, a receita cresceu, a DRE continuou positiva, mas PMR e PME aumentaram e o ciclo financeiro passou de 26 para 55 dias. Isso ajuda a mostrar por que “caixa ruim” não significa automaticamente prejuízo.',
    branches:[
      {q:'1. A operação está dando prejuízo?',why:'Se a empresa não gera resultado, o problema pode ser econômico antes de ser financeiro.',verify:'Abra a DRE e veja se o resultado operacional é negativo ou deteriora de forma recorrente.',supports:['Resultado negativo recorrente.','Margem insuficiente para pagar a estrutura.'],weakens:['Resultado operacional positivo e estável.'],links:[['dre-gerencial','Analisar DRE']]},
      {q:'2. Estamos demorando mais para receber?',why:'Venda pode gerar resultado antes de gerar dinheiro.',verify:'Compare PMR atual x histórico, política comercial e inadimplência.',supports:['PMR aumentou.','Contas a receber cresceram mais que vendas.','Títulos vencidos aumentaram.'],weakens:['PMR estável e carteira saudável.'],links:[['pmr','Analisar PMR'],['fluxo-de-caixa','Ver efeito no caixa']]},
      {q:'3. O dinheiro está ficando mais tempo em estoque?',why:'Estoque é caixa convertido em mercadoria ou matéria-prima.',verify:'Compare PME, giro, cobertura e itens sem giro.',supports:['PME aumentou.','Estoque cresceu mais que consumo/vendas.','Itens sem giro aumentaram.'],weakens:['PME estável e estoque compatível com demanda.'],links:[['pme','Analisar PME'],['fluxo-de-caixa','Ver efeito no caixa']]},
      {q:'4. Pagamos antes de receber?',why:'Mesmo com lucro, a empresa pode financiar muitos dias de operação.',verify:'Compare PMR + PME com PMP e calcule o ciclo financeiro.',supports:['Ciclo aumentou.','PMR/PME cresceram sem compensação no PMP.'],weakens:['Ciclo curto e estável.'],links:[['ciclo-financeiro','Analisar ciclo'],['pmp','Analisar PMP']]},
      {q:'5. Houve investimento, dívida ou saída extraordinária?',why:'Máquinas, obras, pagamento de dívida ou distribuição podem reduzir caixa sem significar prejuízo operacional.',verify:'Separe o fluxo operacional dos movimentos de investimento, financiamento e eventos não recorrentes.',supports:['Saída relevante fora da operação normal.'],weakens:['Queda ocorre mesmo sem movimentos extraordinários.'],links:[['fluxo-de-caixa','Analisar Fluxo'],['dre-gerencial','Comparar com resultado']]},
      {q:'6. A empresa cresceu rápido e a operação passou a exigir mais capital?',why:'Crescimento pode elevar clientes a receber e estoque antes de o dinheiro voltar ao caixa.',verify:'Compare NCG atual x histórica e abra clientes, estoque e fornecedores.',supports:['NCG cresceu mais rápido que resultado.','Clientes e estoque subiram sem fornecedor acompanhar.'],weakens:['NCG estável apesar do crescimento.'],links:[['ncg','Analisar NCG'],['ciclo-financeiro','Entender prazos']]}
    ],
    finish:'Depois de testar as hipóteses, transforme “meu caixa está ruim” em uma causa específica: prejuízo? recebimento? estoque? ciclo? investimento? crescimento? Só então escolha a ação e o indicador que acompanhará a melhora.'
  }
};