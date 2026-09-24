window.ENSINO_V7 = {
  glossary: {
    competencia:{title:'Data de competência',desc:'É o período ao qual uma receita ou despesa pertence economicamente. Pode ser diferente da data em que o dinheiro foi pago ou recebido.',link:'caixa-x-competencia'},
    caixa:{title:'Regime de caixa',desc:'É a visão baseada no momento em que o dinheiro efetivamente entra ou sai da conta.',link:'fluxo-de-caixa'},
    dre:{title:'DRE Gerencial',desc:'Relatório que organiza receitas, custos, despesas e resultado de um período para apoiar a gestão.',link:'dre-gerencial'},
    plano:{title:'Plano de contas',desc:'Estrutura padronizada usada para classificar receitas, custos e despesas de acordo com sua natureza.',link:'plano-de-contas'},
    margem:{title:'Margem de contribuição',desc:'É o que sobra da receita depois dos custos e despesas variáveis. Essa sobra ajuda a pagar a estrutura fixa e gerar resultado.',link:'dre-gerencial'},
    pmr:{title:'PMR',desc:'Prazo Médio de Recebimento. Indica, em média, quanto tempo a empresa leva para transformar uma venda em dinheiro recebido.'},
    pmp:{title:'PMP',desc:'Prazo Médio de Pagamento. Indica, em média, quanto tempo a empresa leva para pagar seus fornecedores.'},
    pme:{title:'PME',desc:'Prazo Médio de Estoque. Indica por quanto tempo, em média, o dinheiro fica imobilizado em estoque antes de girar.'},
    ciclo:{title:'Ciclo financeiro',desc:'Tempo em que a empresa precisa financiar a operação entre pagar/estocar e efetivamente receber pelas vendas.'},
    ncg:{title:'NCG',desc:'Necessidade de Capital de Giro. Representa quanto recurso a operação exige para sustentar clientes e estoques, descontado o financiamento operacional de fornecedores.'}
  },

  financeSequence:[
    {slug:'caixa-x-competencia',title:'Caixa x Competência',why:'Aprenda a diferença entre quando algo pertence ao resultado e quando o dinheiro realmente entra ou sai.',kind:'Conceito'},
    {slug:'plano-de-contas',title:'Plano de Contas',why:'Entenda por que classificar corretamente cada receita e despesa é o que torna os relatórios confiáveis.',kind:'Conceito operacional'},
    {slug:'fechamento-financeiro',title:'Fechamento Financeiro',why:'Veja como transformar movimentações do mês em uma base estável para análise gerencial.',kind:'Procedimento'},
    {slug:'dre-gerencial',title:'DRE Gerencial',why:'Aprenda a ler o resultado da empresa sem parar no faturamento ou no lucro final.',kind:'Análise'},
    {slug:'fluxo-de-caixa',title:'Fluxo de Caixa',why:'Entenda por que lucro e caixa são diferentes e como antecipar falta de dinheiro.',kind:'Análise'},
    {slug:'caixa-ruim',title:'Meu caixa está ruim',why:'Use um roteiro de investigação para separar prejuízo, prazos, estoque, investimentos e crescimento.',kind:'Diagnóstico',diagnostic:true}
  ],

  lessons:{
    'caixa-x-competencia':{
      title:'Caixa x Competência',type:'concept',time:'8–12 min',audience:'Operação e gestão',
      summary:'Entenda por que uma despesa pode pertencer a março na DRE e só sair do banco em abril — e por que misturar essas duas datas distorce a gestão.',
      inOneSentence:'Competência responde “a qual período isso pertence?”. Caixa responde “quando o dinheiro entrou ou saiu?”.',
      definitions:[
        ['Competência','A receita ou despesa é reconhecida no período em que foi gerada ou consumida, mesmo que o recebimento ou pagamento aconteça depois.'],
        ['Caixa','A movimentação aparece quando o dinheiro efetivamente entra ou sai da conta.']
      ],
      example:{
        title:'Conta de energia de março paga em abril',
        intro:'A empresa consumiu energia durante março. A fatura venceu e foi paga em abril.',
        rows:[['Na DRE','Março'],['No Fluxo de Caixa','Abril']],
        insight:'A despesa pertence ao resultado de março, porque foi nesse mês que a empresa consumiu o recurso. O dinheiro saiu em abril, então o efeito financeiro aparece em abril.'
      },
      whyMatters:[
        ['DRE confiável','Se a competência estiver errada, um mês pode parecer melhor e outro pior sem que isso tenha realmente acontecido.'],
        ['Comparação válida','Mês contra mês só faz sentido quando receitas e despesas seguem o mesmo critério.'],
        ['Decisão correta','O gestor pode cortar custo, rever preço ou cobrar resultado com base em uma variação que foi criada apenas por erro de data.']
      ],
      rules:[
        ['Pergunte primeiro','“Em qual mês essa receita ou despesa foi gerada?”'],
        ['Depois registre o caixa','“Em qual dia o dinheiro entrou ou saiu?”'],
        ['Não use pagamento como atalho','A data do banco não define automaticamente a competência.']
      ],
      errorChain:['Despesa de março lançada em abril','Março fica artificialmente melhor','Abril fica artificialmente pior','A DRE mostra uma variação inexistente','O gestor pode investigar a causa errada'],
      operator:['Identifique o período real da receita ou despesa.','Use documentos, notas, contratos e período de consumo como evidência.','Não altere o critério entre meses semelhantes.','Em dúvida material, sinalize antes do fechamento.'],
      manager:['Entenda que DRE e banco não precisam “bater por mês”.','Ao ver uma variação forte, confirme se houve mudança de competência.','Não conclua que despesa subiu apenas olhando a data de pagamento.'],
      exercise:{q:'Uma manutenção foi executada em 28 de junho e paga em 10 de julho. Em qual mês a despesa deve aparecer na DRE?',options:['Junho','Julho','Nos dois meses'],answer:0,feedback:'A manutenção foi realizada em junho. Por isso, a competência é junho. O pagamento em julho afeta o fluxo de caixa de julho.'},
      next:['plano-de-contas','fechamento-financeiro','dre-gerencial']
    },

    'plano-de-contas':{
      title:'Plano de Contas',type:'concept',time:'10–15 min',audience:'Principalmente operação',
      summary:'Aprenda a classificar receitas e despesas pela natureza correta — e entenda por que uma classificação errada muda a leitura gerencial da empresa.',
      inOneSentence:'Plano de contas é a estrutura que diz “que tipo de receita, custo ou despesa é esta?”.',
      why:'Sem uma classificação consistente, a DRE pode até fechar matematicamente, mas o gestor não sabe onde o dinheiro foi realmente consumido.',
      principle:'Classifique pela natureza da movimentação, não apenas pelo nome do fornecedor.',
      example:{
        title:'O mesmo fornecedor pode gerar despesas diferentes',
        intro:'Imagine que a empresa recebeu três cobranças do Google.',
        rows:[['Google Ads','Marketing / mídia'],['Google Workspace','Software / administrativo'],['Google Cloud','Tecnologia / infraestrutura']],
        insight:'O fornecedor é o mesmo, mas a natureza da despesa é diferente. Classificar tudo como “Google” ou “Marketing” destrói a qualidade da análise.'
      },
      steps:[
        ['1. Entenda o que foi comprado','Pergunte qual produto, serviço ou recurso a empresa realmente consumiu.'],
        ['2. Identifique a natureza','Marketing? Software? Frete? Manutenção? Matéria-prima?'],
        ['3. Use a conta padronizada','Evite criar uma nova conta quando uma classificação existente já representa bem a natureza.'],
        ['4. Seja consistente','Situações iguais devem receber tratamento igual ao longo do tempo.'],
        ['5. Trate exceções conscientemente','Se uma classificação precisar mudar, documente o motivo e preserve comparabilidade quando possível.']
      ],
      whyMatters:[
        ['DRE','Despesas mal classificadas alteram a leitura das linhas gerenciais.'],
        ['Orçamento','O gestor compara realizado x planejado por categorias.'],
        ['Centro de custo','Uma despesa pode estar na natureza certa e ainda assim alocada à área errada.'],
        ['Decisão','Se “Marketing” parece caro porque recebeu despesas de software, o gestor pode cortar o lugar errado.']
      ],
      commonMistakes:['Classificar pelo fornecedor em vez da natureza.','Criar contas novas para cada pequena variação.','Usar “Outros” como destino frequente.','Mudar a conta usada para a mesma despesa sem motivo.','Lançar tudo que é pago no cartão em uma conta genérica.'],
      errorChain:['Despesa classificada na conta errada','A linha da DRE fica distorcida','Comparações e orçamento ficam inconsistentes','O gestor identifica a área errada como problema','A decisão ataca a causa errada'],
      operator:['Leia o documento antes de classificar.','Use uma regra de classificação documentada.','Peça contexto quando a descrição não for suficiente.','Revise contas genéricas e exceções no fechamento.'],
      manager:['Ao analisar uma linha inesperada, peça abertura dos lançamentos.','Evite avaliar desempenho de uma área sem confirmar a qualidade da classificação.'],
      exercise:{q:'Uma cobrança da Microsoft é referente ao Microsoft 365 usado pelo administrativo. Qual lógica é mais adequada?',options:['Classificar como “Microsoft”','Classificar pela natureza, como software/administrativo','Classificar como marketing porque é uma empresa de tecnologia'],answer:1,feedback:'O fornecedor não define a natureza. O que importa é o recurso consumido e sua finalidade.'},
      next:['fechamento-financeiro','dre-gerencial']
    },

    'fechamento-financeiro':{
      title:'Fechamento Financeiro',type:'procedure',time:'15–20 min',audience:'Operação com validação da gestão',
      summary:'Um roteiro para encerrar o mês com dados suficientemente confiáveis antes de transformar números em análise e decisão.',
      objective:'O fechamento não existe para “gerar um relatório”. Ele existe para garantir que o mês analisado represente a realidade da empresa com critérios consistentes.',
      before:['Todas as contas bancárias acessíveis e atualizadas.','Contas a pagar e a receber lançadas e baixadas.','Documentos principais disponíveis.','Regras de {{competencia|competência}} e {{plano|plano de contas}} definidas.'],
      steps:[
        ['1. Concilie os bancos','Compare cada movimentação relevante do sistema com o extrato. Diferenças precisam ser explicadas, não mascaradas por uma conta “Ajuste”.'],
        ['2. Revise contas a pagar','Procure títulos duplicados, vencidos sem baixa, pagamentos sem lançamento e renegociações não atualizadas.'],
        ['3. Revise contas a receber','Valide baixas, inadimplência, recebimentos antecipados, estornos e títulos em aberto.'],
        ['4. Revise competência','Confirme se receitas e despesas pertencem ao mês correto, independentemente da data do pagamento.'],
        ['5. Revise classificação','Abra contas genéricas, “outros” e linhas que variaram muito. Verifique {{plano|plano de contas}} e centros de custo.'],
        ['6. Valide faturamento e impostos','Confronte o que entrou na análise com os documentos e relatórios de origem.'],
        ['7. Valide custos e eventos relevantes','Confirme custos do período, provisões materiais e acontecimentos extraordinários.'],
        ['8. Registre ajustes e feche a versão','Após a validação, mudanças no período devem ter rastreabilidade.']
      ],
      finishCriteria:['Bancos conciliados.','Pendências materiais resolvidas ou explicitadas.','Competência revisada.','Contas genéricas revisadas.','Receita, impostos e custos relevantes validados.','Ajustes documentados.','Versão pronta para análise gerencial.'],
      notReady:['Existem diferenças bancárias sem explicação.','O mês ainda muda toda vez que alguém lança uma nota antiga.','Receitas ou custos relevantes ainda não foram conferidos.','A equipe sabe que há lançamentos em “Outros” que não foram abertos.'],
      errorChain:['Mês é apresentado antes do fechamento','DRE usa dados incompletos','Gestor discute uma variação que depois desaparece','Reunião perde confiança','A equipe passa a desacreditar dos indicadores'],
      operator:['Execute o checklist sempre na mesma ordem.','Documente pendências que permanecerem abertas.','Não “force” saldo ou categoria para fazer o relatório fechar.'],
      manager:['Não comece a reunião gerencial sem saber se o mês está fechado.','Pergunte quais pendências ou estimativas ainda existem.','Separe erro de dado de problema real de gestão.'],
      exercise:{q:'O saldo final do sistema bate com o banco, mas várias movimentações foram lançadas como “Ajuste”. O fechamento está confiável?',options:['Sim, porque o saldo final bate','Não, porque a conciliação precisa explicar as movimentações','Sim, desde que o valor de “Ajuste” seja pequeno'],answer:1,feedback:'Bater saldo não basta. O objetivo é garantir que cada movimentação esteja corretamente registrada e classificada.'},
      next:['dre-gerencial','fluxo-de-caixa']
    },

    'dre-gerencial':{
      title:'DRE Gerencial',type:'analysis',time:'25–35 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a transformar a DRE de uma sequência de números em um raciocínio: o que mudou, por que mudou e qual parte do negócio precisa ser investigada.',
      inOneSentence:'A DRE mostra como o faturamento de um período vai sendo consumido até chegar ao resultado.',
      responds:['A empresa está gerando resultado?','O resultado melhorou ou piorou?','A mudança veio de faturamento, margem ou estrutura?','As despesas cresceram mais rápido que a receita?','O crescimento está trazendo resultado ou apenas volume?'],
      before:['Mês fechado e validado.','{{competencia|Competência}} aplicada de forma consistente.','{{plano|Plano de contas}} revisado.','Receita e impostos conferidos.','Custos relevantes atualizados.','Eventos extraordinários identificados.'],
      anatomy:[
        ['Receita Bruta','Quanto a empresa vendeu antes das deduções.'],
        ['(-) Impostos e deduções','O que reduz a receita até chegar ao valor líquido.'],
        ['= Receita Líquida','Base efetiva para sustentar custos e estrutura.'],
        ['(-) Custos e despesas variáveis','Gastos que acompanham diretamente a venda.'],
        ['= Margem de Contribuição','Quanto sobra para pagar a estrutura fixa e gerar resultado.'],
        ['(-) Despesas fixas','Estrutura administrativa, comercial e operacional.'],
        ['= Resultado Operacional','O que a operação gerou depois de sustentar sua estrutura.']
      ],
      analysisSteps:[
        ['1. Comece pela receita','Pergunte quanto mudou em valor e percentual. Depois descubra se a mudança veio de preço, volume, mix ou cliente. Não pare no “vendeu mais”.'],
        ['2. Vá imediatamente para a margem','Receita maior com margem praticamente igual pode indicar deterioração de preço, custo, desconto, mix, comissão ou frete. Crescimento sem qualidade aparece aqui.'],
        ['3. Analise a estrutura fixa','Não olhe apenas valor absoluto. Compare também como percentual da receita e contra orçamento. Uma despesa pode subir em reais e ainda melhorar proporcionalmente.'],
        ['4. Leia o resultado como consequência','O lucro final é resultado do que aconteceu antes. Evite começar a análise pelo lucro e procurar culpados depois.'],
        ['5. Explique as maiores variações','Toda variação relevante deve ter uma hipótese concreta. Se não existe explicação, volte à qualidade do dado antes de concluir.']
      ],
      compare:[
        ['Mês anterior','Bom para identificar mudança recente, mas cuidado com sazonalidade.'],
        ['Mesmo mês do ano anterior','Ajuda quando existe sazonalidade anual.'],
        ['Orçado x realizado','Mostra onde a execução ficou diferente do plano.'],
        ['% da receita','Ajuda a enxergar eficiência e peso relativo das linhas.'],
        ['Acumulado do ano','Reduz o risco de reagir demais a um único mês.']
      ],
      scenario1:{
        title:'Receita cresce, mas a margem quase não acompanha',
        rows:[['Receita — Janeiro','R$ 500 mil'],['Receita — Fevereiro','R$ 600 mil'],['Margem — Janeiro','R$ 200 mil'],['Margem — Fevereiro','R$ 204 mil']],
        insight:'A receita cresceu 20%, mas a margem cresceu apenas 2%. O crescimento perdeu qualidade. Antes de comemorar a venda, investigue preço, custo, desconto, mix, frete e comissão.'
      },
      scenario2:{
        title:'Despesa aumentou em reais, mas melhorou proporcionalmente',
        rows:[['Receita — Janeiro','R$ 1,0 mi'],['Despesa Adm. — Janeiro','R$ 100 mil (10%)'],['Receita — Fevereiro','R$ 1,5 mi'],['Despesa Adm. — Fevereiro','R$ 120 mil (8%)']],
        insight:'A despesa subiu R$ 20 mil, mas caiu de 10% para 8% da receita. Concluir apenas “a despesa aumentou” seria uma leitura incompleta.'
      },
      investigations:[
        ['Faturamento caiu','Abra volume, ticket, clientes ativos, frequência, mix e sazonalidade.'],
        ['Faturamento subiu e margem caiu','Investigue preço, descontos, custos, mix, comissões, impostos e frete.'],
        ['Margem está boa e resultado piorou','Abra despesas fixas por grupo e procure novas estruturas, contratações ou gastos extraordinários.'],
        ['DRE dá lucro, mas caixa piora','Não procure resposta só na DRE. Vá para {{caixa|Fluxo de Caixa}}, {{pmr|PMR}}, {{pmp|PMP}}, {{pme|PME}}, {{ciclo|Ciclo Financeiro}} e {{ncg|NCG}}.']
      ],
      notConclude:['“Faturamento cresceu, então estamos melhores.”','“Lucro caiu, então precisamos cortar despesas.”','“Despesa aumentou em reais, então piorou.”','“A DRE está positiva, então o caixa deveria estar positivo.”'],
      operator:['Garanta competência correta.','Classifique lançamentos pela natureza.','Revise contas genéricas e variações relevantes.','Mantenha critérios estáveis entre períodos.','Documente eventos extraordinários.'],
      manager:['Comece pela pergunta “o que mudou?”.','Abra as linhas que explicam a maior parte da variação.','Cruze resultado com indicadores operacionais antes de agir.','Separe problema real de distorção de dado.'],
      errorChain:['Despesa classificada no mês errado','DRE de um mês melhora artificialmente','Mês seguinte piora artificialmente','Gestor interpreta tendência inexistente','Ação é tomada sobre um problema que não ocorreu'],
      exercise:{q:'A receita subiu 20%, mas a margem de contribuição subiu apenas 2%. Qual é a melhor próxima investigação?',options:['Comemorar o crescimento e encerrar a análise','Abrir preço, custo, desconto, mix, frete e comissão','Cortar despesas administrativas imediatamente'],answer:1,feedback:'O principal sinal está na qualidade da venda. Antes de olhar a estrutura fixa, investigue por que a margem não acompanhou a receita.'},
      next:['fluxo-de-caixa','caixa-x-competencia','fechamento-financeiro']
    },

    'fluxo-de-caixa':{
      title:'Fluxo de Caixa',type:'analysis',time:'20–25 min',audience:'Gestão e operação financeira',
      summary:'Aprenda a enxergar quando o dinheiro entra e sai, antecipar faltas de caixa e separar problema operacional de investimento ou evento extraordinário.',
      inOneSentence:'DRE mostra resultado; fluxo de caixa mostra dinheiro e tempo.',
      responds:['Quanto dinheiro temos de fato?','Quais entradas e saídas estão previstas?','Em que data o caixa pode ficar crítico?','A falta de caixa vem da operação ou de um evento extraordinário?'],
      before:['Bancos conciliados.','Contas a pagar e a receber atualizadas.','Datas de vencimento revisadas.','Movimentos extraordinários identificados.'],
      analysisSteps:[
        ['1. Confirme o saldo real','O ponto de partida precisa bater com os bancos.'],
        ['2. Projete o futuro','Liste entradas e saídas previstas nas datas em que realmente devem acontecer.'],
        ['3. Procure os vales de caixa','Não olhe apenas o saldo final do mês. Identifique dias ou semanas em que o caixa fica pressionado.'],
        ['4. Explique a causa','Separe operação normal, investimento, pagamento de dívida, distribuição de lucro e eventos não recorrentes.'],
        ['5. Cruze com a operação','Se o caixa piora continuamente, investigue resultado, recebimento, estoque, pagamento e crescimento.']
      ],
      example:{
        title:'A empresa ainda tem caixa, mas a projeção já mostra pressão',
        rows:[['Saldo inicial','R$ 80 mil'],['Entradas previstas','R$ 55 mil'],['Saídas previstas','R$ 92 mil'],['Saldo final projetado','R$ 43 mil']],
        insight:'O saldo continua positivo, mas caiu quase pela metade. A decisão deve acontecer antes de chegar a zero: cobrança, compras, pagamentos ou capital de giro podem precisar de ajuste.'
      },
      profitVsCash:[
        ['Venda a prazo','Pode aumentar receita e lucro hoje, mas o dinheiro só entra depois.'],
        ['Compra de máquina','Pode reduzir caixa agora sem aparecer integralmente como despesa operacional da DRE.'],
        ['Estoque crescendo','Consome caixa antes de virar venda.'],
        ['Pagamento de dívida','Reduz caixa, mas não significa necessariamente piora operacional.']
      ],
      notConclude:['“Tenho dinheiro no banco hoje, então o caixa está saudável.”','“A DRE tem lucro, então não deveria faltar dinheiro.”','“Caixa negativo significa necessariamente prejuízo.”'],
      operator:['Concilie bancos.','Atualize vencimentos e baixas.','Revise previsões quando datas mudarem.','Separe transferências internas para não duplicar movimentações.'],
      manager:['Analise projeção, não apenas saldo atual.','Pergunte qual evento explica a queda de caixa.','Cruze com DRE, prazos, estoque e crescimento.'],
      exercise:{q:'A DRE mostra lucro, mas o caixa caiu durante três meses. Qual é a atitude mais adequada?',options:['Concluir que a DRE está errada','Investigar prazos, estoque, investimentos, dívidas e capital de giro','Ignorar o caixa porque lucro é mais importante'],answer:1,feedback:'Lucro e caixa medem coisas diferentes. A diferença pode estar no tempo de recebimento/pagamento, estoque ou movimentos extraordinários.'},
      next:['dre-gerencial','caixa-x-competencia','caixa-ruim']
    }
  },

  diagnostic:{
    id:'caixa-ruim',title:'Meu caixa está ruim',summary:'Use esta página como um roteiro de investigação. Caixa ruim é um sintoma: antes de agir, descubra qual mecanismo está consumindo o dinheiro.',
    intro:'Evite começar pela solução (“precisamos cortar despesas”, “precisamos pegar empréstimo”). Primeiro teste hipóteses. Uma empresa pode estar sem caixa por prejuízo, por crescimento, por clientes demorando a pagar, por estoque, por investimento ou por várias causas ao mesmo tempo.',
    branches:[
      {q:'1. A operação está dando prejuízo?',why:'Se a empresa não gera resultado suficiente, o problema pode ser econômico antes de ser financeiro.',look:'Abra a DRE. Veja receita, margem, despesas fixas e resultado. Se o resultado é negativo de forma recorrente, descubra qual linha explica a perda.',links:[['dre-gerencial','Analisar DRE']]},
      {q:'2. A empresa dá lucro, mas demora para receber?',why:'Vender a prazo pode gerar resultado antes de gerar dinheiro.',look:'Analise carteira de clientes, inadimplência e {{pmr|PMR}}. Compare o prazo real recebido com a condição comercial prevista.',links:[['fluxo-de-caixa','Ver efeito no caixa']]},
      {q:'3. O dinheiro está parado em estoque?',why:'Estoque é dinheiro convertido em mercadoria ou matéria-prima. Enquanto não gira, o caixa não retorna.',look:'Analise valor de estoque, itens sem giro, cobertura, compras e {{pme|PME}}. Estoque alto pode coexistir com falta de itens importantes.',links:[['fluxo-de-caixa','Ver efeito no caixa']]},
      {q:'4. Pagamos antes de receber?',why:'Mesmo empresas lucrativas podem financiar a operação por muitos dias.',look:'Compare {{pmr|PMR}}, {{pmp|PMP}} e {{pme|PME}}. A combinação forma o {{ciclo|ciclo financeiro}} e ajuda a explicar quanto tempo o caixa precisa sustentar a operação.',links:[['fluxo-de-caixa','Analisar fluxo de caixa']]},
      {q:'5. Houve investimento ou saída extraordinária?',why:'Máquinas, obras, pagamento de dívida ou distribuição de lucros podem reduzir caixa sem significar prejuízo operacional.',look:'Abra o fluxo e separe operação normal de movimentos extraordinários. O diagnóstico muda completamente.',links:[['fluxo-de-caixa','Analisar fluxo de caixa'],['dre-gerencial','Comparar com resultado']]},
      {q:'6. A empresa cresceu rápido?',why:'Crescimento pode exigir mais clientes a receber e mais estoque antes de gerar dinheiro.',look:'Observe se contas a receber e estoque cresceram mais rápido do que fornecedores. Isso tende a aumentar a {{ncg|NCG}}.',links:[['dre-gerencial','Confirmar qualidade do crescimento'],['fluxo-de-caixa','Ver pressão financeira']]}
    ],
    finish:'Depois de testar as hipóteses, a pergunta deixa de ser “como melhorar o caixa?” e passa a ser específica: reduzir estoque? receber mais rápido? renegociar fornecedores? recuperar margem? planejar investimento? A ação deve atacar a causa encontrada.'
  }
};