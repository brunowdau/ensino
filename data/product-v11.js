window.ENSINO_PRODUCT = {
  "version": "11.0",
  "roles": [
    {
      "id": "operacao",
      "label": "Financeiro operacional",
      "short": "Operação",
      "desc": "Executa rotinas, registros, conciliações e fechamento.",
      "focus": "executar"
    },
    {
      "id": "gestao",
      "label": "Gestor financeiro",
      "short": "Gestão",
      "desc": "Valida dados, interpreta números e coordena ações.",
      "focus": "analisar"
    },
    {
      "id": "direcao",
      "label": "Direção / sócio",
      "short": "Direção",
      "desc": "Usa os indicadores para priorizar decisões e acompanhar resultado.",
      "focus": "decidir"
    }
  ],
  "applicationTasks": {
    "caixa-x-competencia": {
      "title": "Classifique 5 movimentações reais",
      "action": "Escolha cinco receitas ou despesas do último mês e registre, para cada uma, a competência e a data em que o dinheiro entrou ou saiu.",
      "evidence": "Lista com fato, competência, data de caixa e justificativa.",
      "result": "Nenhuma movimentação relevante classificada apenas pela data do pagamento."
    },
    "plano-de-contas": {
      "title": "Abra as contas genéricas",
      "action": "Revise pelo menos dez lançamentos registrados em “Outros”, “Diversos” ou contas genéricas e confirme se a natureza econômica está correta.",
      "evidence": "Relação dos lançamentos revisados e das reclassificações realizadas.",
      "result": "Contas genéricas sem valores materiais que prejudiquem a análise."
    },
    "contas-a-pagar": {
      "title": "Audite uma amostra do contas a pagar",
      "action": "Selecione dez títulos de fornecedores e confira fornecedor, documento, competência, vencimento, valor, classificação e status de pagamento.",
      "evidence": "Checklist da amostra e correções executadas.",
      "result": "Amostra sem divergências não explicadas."
    },
    "contas-a-receber": {
      "title": "Revise a carteira vencida",
      "action": "Abra os títulos vencidos e separe atraso real, renegociação formal, promessa de pagamento e recebimento ainda não baixado.",
      "evidence": "Carteira revisada com status e ação definida para cada item material.",
      "result": "Vencidos representam a realidade e não foram “limpos” por alteração de data."
    },
    "conciliacao-bancaria": {
      "title": "Concilie uma conta bancária",
      "action": "Concilie integralmente uma conta bancária de um período fechado, investigando cada diferença em vez de usar ajuste genérico.",
      "evidence": "Saldo conciliado e relação das diferenças encontradas com suas causas.",
      "result": "Diferença não explicada igual a zero."
    },
    "fechamento-financeiro": {
      "title": "Execute um fechamento real",
      "action": "Aplique o checklist do Ensino Lean ao último mês encerrado e classifique cada etapa como concluída, pendente ou em revisão.",
      "evidence": "Checklist preenchido e pendências materiais documentadas.",
      "result": "Mês pronto para análise com pendências conhecidas e rastreáveis."
    },
    "dre-gerencial": {
      "title": "Explique as três maiores variações",
      "action": "Abra a última DRE fechada, identifique as três variações mais relevantes e formule uma hipótese e uma próxima investigação para cada uma.",
      "evidence": "Tabela com variação, hipótese, evidência e próxima análise.",
      "result": "A reunião passa a discutir causas e ações, não apenas números."
    },
    "fluxo-de-caixa": {
      "title": "Encontre o vale de caixa",
      "action": "Projete pelo menos oito semanas ou três meses e identifique a data de menor saldo, sua causa principal e a antecedência disponível para agir.",
      "evidence": "Fluxo projetado com menor saldo destacado e plano de reação.",
      "result": "Risco financeiro identificado antes de virar urgência."
    },
    "pmr": {
      "title": "Calcule e abra o PMR",
      "action": "Calcule o PMR atual, compare com o período anterior e identifique quais clientes ou condições comerciais mais explicam a mudança.",
      "evidence": "PMR atual, comparação e principais drivers.",
      "result": "O indicador deixa de ser um número isolado e aponta onde investigar."
    },
    "pmp": {
      "title": "Mapeie o financiamento dos fornecedores",
      "action": "Calcule o PMP e abra os fornecedores mais relevantes, comparando prazo negociado, prazo efetivo e concentração.",
      "evidence": "PMP e relação dos principais fornecedores com prazos.",
      "result": "A gestão conhece quanto da operação é financiada por fornecedores."
    },
    "pme": {
      "title": "Abra o capital parado em estoque",
      "action": "Calcule o PME e identifique itens, famílias ou categorias que mais concentram estoque e baixa rotação.",
      "evidence": "PME, valor em estoque e principais focos de capital parado.",
      "result": "Ação de estoque priorizada por impacto financeiro."
    },
    "ciclo-financeiro": {
      "title": "Compare o ciclo atual com o anterior",
      "action": "Calcule PME + PMR − PMP para dois períodos e identifique qual componente mais explica a variação.",
      "evidence": "Ciclo dos dois períodos e decomposição da mudança.",
      "result": "A empresa sabe quantos dias adicionais ou reduzidos precisa financiar."
    },
    "ncg": {
      "title": "Explique a mudança da NCG",
      "action": "Calcule a NCG atual e anterior e decomponha a variação entre clientes, estoque e fornecedores.",
      "evidence": "NCG dos períodos, variação absoluta e principais componentes.",
      "result": "A pressão de capital de giro fica ligada a causas operacionais concretas."
    },
    "margem-de-contribuicao": {
      "title": "Abra a margem onde ela varia",
      "action": "Calcule a MC% do período atual e anterior e abra pelo menos uma dimensão relevante — produto, cliente, canal ou família — para localizar quem explica a mudança.",
      "evidence": "MC e MC% comparativas, abertura escolhida e principais drivers.",
      "result": "A variação média fica conectada a componentes concretos de preço, custo, desconto, mix, comissão, frete ou imposto."
    },
    "ponto-de-equilibrio": {
      "title": "Calcule a folga sobre o equilíbrio",
      "action": "Calcule o ponto de equilíbrio atual, compare com a receita média dos últimos três meses e simule uma queda de 3 p.p. na margem.",
      "evidence": "PE atual, receita média, folga e cenário de sensibilidade.",
      "result": "A gestão entende quanto a margem altera a necessidade de faturamento."
    },
    "precificacao": {
      "title": "Teste uma condição comercial real",
      "action": "Escolha um produto ou serviço relevante, monte a ponte do preço até a margem e simule a condição de desconto mais usada pela equipe comercial.",
      "evidence": "Preço atual, componentes variáveis, MC antes/depois e regra de decisão.",
      "result": "Desconto deixa de ser aprovado apenas como percentual sobre preço."
    },
    "orcado-realizado": {
      "title": "Explique três desvios materiais",
      "action": "Compare o último mês fechado contra orçamento e selecione os três desvios de maior impacto. Classifique cada um como pontual, timing ou recorrente.",
      "evidence": "Desvio, causa/hipótese, classificação e ação necessária.",
      "result": "A reunião deixa de tratar todo desvio da mesma forma."
    },
    "forecast-financeiro": {
      "title": "Atualize o forecast",
      "action": "Fixe o realizado até a data-base, atualize as premissas futuras mais relevantes e monte cenário base e cenário de pressão.",
      "evidence": "Premissas alteradas, justificativa, resultado/caixa projetado e gatilhos.",
      "result": "A empresa ganha antecedência de decisão sem apagar o orçamento original."
    },
    "plano-de-acao-gerencial": {
      "title": "Feche uma análise com ação acompanhável",
      "action": "Escolha um problema real discutido na última reunião e registre problema, hipótese, ação, responsável, prazo, indicador e resultado esperado.",
      "evidence": "Plano de ação completo e próxima data de revisão.",
      "result": "A reunião termina com execução verificável e não com intenção genérica."
    }
  },
  "library": [
    {
      "slug": "caixa-x-competencia",
      "format": "Guia visual",
      "tags": [
        "fundamentos",
        "dre",
        "caixa"
      ]
    },
    {
      "slug": "plano-de-contas",
      "format": "Lean Card",
      "tags": [
        "classificação",
        "fechamento"
      ]
    },
    {
      "slug": "contas-a-pagar",
      "format": "Checklist",
      "tags": [
        "rotina",
        "pagamentos"
      ]
    },
    {
      "slug": "contas-a-receber",
      "format": "Checklist",
      "tags": [
        "carteira",
        "inadimplência"
      ]
    },
    {
      "slug": "conciliacao-bancaria",
      "format": "Checklist",
      "tags": [
        "bancos",
        "controle"
      ]
    },
    {
      "slug": "fechamento-financeiro",
      "format": "Playbook",
      "tags": [
        "fechamento",
        "rotina"
      ]
    },
    {
      "slug": "dre-gerencial",
      "format": "Playbook",
      "tags": [
        "resultado",
        "margem"
      ]
    },
    {
      "slug": "fluxo-de-caixa",
      "format": "Guia visual",
      "tags": [
        "caixa",
        "projeção"
      ]
    },
    {
      "slug": "pmr",
      "format": "Indicador",
      "tags": [
        "recebimento",
        "capital de giro"
      ]
    },
    {
      "slug": "pmp",
      "format": "Indicador",
      "tags": [
        "fornecedores",
        "capital de giro"
      ]
    },
    {
      "slug": "pme",
      "format": "Indicador",
      "tags": [
        "estoque",
        "capital de giro"
      ]
    },
    {
      "slug": "ciclo-financeiro",
      "format": "Indicador",
      "tags": [
        "prazos",
        "capital de giro"
      ]
    },
    {
      "slug": "ncg",
      "format": "Playbook",
      "tags": [
        "capital de giro",
        "crescimento"
      ]
    },
    {
      "slug": "margem-de-contribuicao",
      "format": "Indicador",
      "tags": [
        "margem",
        "rentabilidade",
        "desconto"
      ]
    },
    {
      "slug": "ponto-de-equilibrio",
      "format": "Indicador",
      "tags": [
        "equilíbrio",
        "meta",
        "estrutura"
      ]
    },
    {
      "slug": "precificacao",
      "format": "Playbook",
      "tags": [
        "preço",
        "desconto",
        "rentabilidade"
      ]
    },
    {
      "slug": "orcado-realizado",
      "format": "Playbook",
      "tags": [
        "orçamento",
        "desvio",
        "planejamento"
      ]
    },
    {
      "slug": "forecast-financeiro",
      "format": "Playbook",
      "tags": [
        "forecast",
        "projeção",
        "cenário"
      ]
    },
    {
      "slug": "plano-de-acao-gerencial",
      "format": "Checklist",
      "tags": [
        "ação",
        "responsável",
        "prazo"
      ]
    }
  ],
  "diagnoses": [
    {
      "id": "caixa",
      "title": "Tenho lucro, mas falta dinheiro",
      "desc": "Separe resultado, timing financeiro, investimento e capital de giro.",
      "icon": "cash",
      "questions": [
        {
          "id": "dre",
          "q": "A DRE fechada mostra resultado operacional positivo?",
          "yes": "continue",
          "no": "resultado",
          "unknown": "qualidade"
        },
        {
          "id": "investimento",
          "q": "Houve investimento, amortização de dívida ou retirada extraordinária relevante?",
          "yes": "extraordinario",
          "no": "continue",
          "unknown": "continue"
        },
        {
          "id": "receber",
          "q": "Contas a receber ou PMR aumentaram?",
          "yes": "capital",
          "no": "continue",
          "unknown": "capital"
        },
        {
          "id": "estoque",
          "q": "Estoque ou PME aumentaram?",
          "yes": "capital",
          "no": "timing",
          "unknown": "timing"
        }
      ],
      "results": {
        "resultado": {
          "title": "Primeiro foco: resultado",
          "why": "Se a operação não gera resultado, a pressão de caixa pode começar na própria economia do negócio.",
          "links": [
            [
              "DRE Gerencial",
              "#lesson/dre-gerencial"
            ],
            [
              "Margem de contribuição",
              "#simulators/margem"
            ]
          ]
        },
        "qualidade": {
          "title": "Primeiro foco: qualidade da informação",
          "why": "Antes de explicar caixa, confirme se DRE, carteira e bancos estão fechados e confiáveis.",
          "links": [
            [
              "Fechamento Financeiro",
              "#lesson/fechamento-financeiro"
            ],
            [
              "Conciliação Bancária",
              "#lesson/conciliacao-bancaria"
            ]
          ]
        },
        "extraordinario": {
          "title": "Separe o efeito extraordinário",
          "why": "Investimento, dívida e retiradas podem reduzir caixa sem representar piora operacional.",
          "links": [
            [
              "Fluxo de Caixa",
              "#lesson/fluxo-de-caixa"
            ],
            [
              "Simulador de Fluxo",
              "#simulators/fluxo"
            ]
          ]
        },
        "capital": {
          "title": "Hipótese predominante: capital de giro",
          "why": "Clientes e estoque podem absorver caixa mesmo com lucro positivo. Abra prazos, ciclo e NCG.",
          "links": [
            [
              "Ciclo Financeiro",
              "#lesson/ciclo-financeiro"
            ],
            [
              "NCG",
              "#lesson/ncg"
            ],
            [
              "Simular capital de giro",
              "#simulators/capital"
            ]
          ]
        },
        "timing": {
          "title": "Abra o timing financeiro",
          "why": "Com resultado positivo e sem sinal claro de investimento ou capital de giro, investigue datas de entradas, saídas e concentração de pagamentos.",
          "links": [
            [
              "Fluxo de Caixa",
              "#lesson/fluxo-de-caixa"
            ],
            [
              "Simulador de Fluxo",
              "#simulators/fluxo"
            ]
          ]
        }
      }
    },
    {
      "id": "margem",
      "title": "Vendo mais, mas sobra pouco",
      "desc": "Descubra se a deterioração veio de preço, custo, desconto, mix, frete ou comissão.",
      "icon": "trend",
      "questions": [
        {
          "id": "receita",
          "q": "A receita cresceu no período?",
          "yes": "continue",
          "no": "volume"
        },
        {
          "id": "mc",
          "q": "A margem de contribuição percentual caiu?",
          "yes": "margem",
          "no": "continue",
          "unknown": "margem"
        },
        {
          "id": "fixa",
          "q": "As despesas fixas cresceram mais rápido que a receita?",
          "yes": "estrutura",
          "no": "mix",
          "unknown": "mix"
        }
      ],
      "results": {
        "volume": {
          "title": "Abra receita antes da margem",
          "why": "Se a receita caiu, primeiro separe preço, volume, frequência, clientes e sazonalidade.",
          "links": [
            [
              "DRE Gerencial",
              "#lesson/dre-gerencial"
            ]
          ]
        },
        "margem": {
          "title": "Foco: qualidade da venda",
          "why": "Receita maior com margem menor aponta para preço, custo, descontos, mix, comissão, frete ou impostos.",
          "links": [
            [
              "Margem de Contribuição",
              "#lesson/margem-de-contribuicao"
            ],
            [
              "Precificação e Desconto",
              "#lesson/precificacao"
            ],
            [
              "Simular Margem",
              "#simulators/margem"
            ]
          ]
        },
        "estrutura": {
          "title": "Foco: estrutura fixa",
          "why": "Com margem preservada, abra despesas fixas e produtividade antes de cortar linearmente.",
          "links": [
            [
              "Ponto de Equilíbrio",
              "#lesson/ponto-de-equilibrio"
            ],
            [
              "DRE Gerencial",
              "#lesson/dre-gerencial"
            ],
            [
              "Simular equilíbrio",
              "#simulators/equilibrio"
            ]
          ]
        },
        "mix": {
          "title": "Foco: mix e composição",
          "why": "A média pode esconder produtos, clientes ou canais com contribuições muito diferentes.",
          "links": [
            [
              "Margem de Contribuição",
              "#lesson/margem-de-contribuicao"
            ],
            [
              "Precificação e Desconto",
              "#lesson/precificacao"
            ]
          ]
        }
      }
    },
    {
      "id": "estoque",
      "title": "Meu estoque está consumindo caixa",
      "desc": "Conecte rotação, prazo de estoque, ciclo financeiro e NCG.",
      "icon": "box",
      "questions": [
        {
          "id": "pme",
          "q": "O PME aumentou em relação ao período anterior?",
          "yes": "giro",
          "no": "continue",
          "unknown": "giro"
        },
        {
          "id": "venda",
          "q": "O crescimento de estoque foi acompanhado por crescimento proporcional de vendas?",
          "yes": "planejamento",
          "no": "excesso"
        },
        {
          "id": "fornecedor",
          "q": "O PMP aumentou junto com o estoque?",
          "yes": "planejamento",
          "no": "financiamento",
          "unknown": "financiamento"
        }
      ],
      "results": {
        "giro": {
          "title": "Primeiro foco: rotação",
          "why": "PME crescente indica que mais capital permanece convertido em estoque por mais tempo.",
          "links": [
            [
              "PME",
              "#lesson/pme"
            ],
            [
              "Ciclo Financeiro",
              "#lesson/ciclo-financeiro"
            ]
          ]
        },
        "excesso": {
          "title": "Hipótese: estoque acima da demanda",
          "why": "Estoque crescendo sem venda proporcional exige abrir itens, famílias e cobertura.",
          "links": [
            [
              "PME",
              "#lesson/pme"
            ],
            [
              "NCG",
              "#lesson/ncg"
            ]
          ]
        },
        "financiamento": {
          "title": "Foco: financiamento do crescimento",
          "why": "Se o estoque cresce sem prazo adicional de fornecedor, a empresa financia a diferença com caixa próprio.",
          "links": [
            [
              "PMP",
              "#lesson/pmp"
            ],
            [
              "NCG",
              "#lesson/ncg"
            ],
            [
              "Simular capital de giro",
              "#simulators/capital"
            ]
          ]
        },
        "planejamento": {
          "title": "Foco: necessidade x estratégia",
          "why": "Crescimento de estoque pode ser intencional; compare cobertura, giro, compra e demanda antes de concluir.",
          "links": [
            [
              "PME",
              "#lesson/pme"
            ],
            [
              "Ciclo Financeiro",
              "#lesson/ciclo-financeiro"
            ]
          ]
        }
      }
    },
    {
      "id": "receber",
      "title": "Clientes demoram para pagar",
      "desc": "Diferencie prazo comercial, atraso real, concentração e efeito no caixa.",
      "icon": "clock",
      "questions": [
        {
          "id": "carteira",
          "q": "A carteira está conciliada e renegociações estão atualizadas?",
          "yes": "continue",
          "no": "qualidade",
          "unknown": "qualidade"
        },
        {
          "id": "pmr",
          "q": "O PMR aumentou?",
          "yes": "prazo",
          "no": "continue",
          "unknown": "prazo"
        },
        {
          "id": "vencido",
          "q": "O valor vencido também aumentou?",
          "yes": "inadimplencia",
          "no": "comercial"
        }
      ],
      "results": {
        "qualidade": {
          "title": "Primeiro foco: carteira confiável",
          "why": "Não interprete PMR ou atraso sobre títulos desatualizados.",
          "links": [
            [
              "Contas a Receber",
              "#lesson/contas-a-receber"
            ],
            [
              "Conciliação Bancária",
              "#lesson/conciliacao-bancaria"
            ]
          ]
        },
        "prazo": {
          "title": "Abra a composição do PMR",
          "why": "Descubra se a mudança vem de prazo concedido, mix de clientes ou atraso.",
          "links": [
            [
              "PMR",
              "#lesson/pmr"
            ],
            [
              "Fluxo de Caixa",
              "#lesson/fluxo-de-caixa"
            ]
          ]
        },
        "inadimplencia": {
          "title": "Foco: atraso e cobrança",
          "why": "PMR maior com vencidos maiores aponta para execução de cobrança e risco de carteira.",
          "links": [
            [
              "Contas a Receber",
              "#lesson/contas-a-receber"
            ],
            [
              "PMR",
              "#lesson/pmr"
            ]
          ]
        },
        "comercial": {
          "title": "Foco: política comercial",
          "why": "PMR maior sem aumento de vencidos sugere maior prazo concedido ou mudança de mix.",
          "links": [
            [
              "PMR",
              "#lesson/pmr"
            ],
            [
              "Ciclo Financeiro",
              "#lesson/ciclo-financeiro"
            ]
          ]
        }
      }
    }
  ],
  "cases": [
    {
      "id": "industria-horizonte",
      "initials": "IH",
      "sector": "Indústria",
      "title": "Indústria Horizonte",
      "challenge": "Crescimento com lucro, mas forte pressão de caixa.",
      "story": "A empresa acelerou vendas, manteve resultado positivo e ao mesmo tempo passou a financiar clientes e estoque por muito mais tempo.",
      "metrics": [
        [
          "Receita",
          "R$ 1,00 mi → R$ 1,35 mi"
        ],
        [
          "Margem",
          "36% → 31%"
        ],
        [
          "Ciclo",
          "26 → 55 dias"
        ],
        [
          "NCG",
          "R$ 330 mil → R$ 540 mil"
        ],
        [
          "Caixa",
          "R$ 380 mil → R$ 160 mil"
        ]
      ],
      "questions": [
        {
          "q": "Qual é a primeira conclusão que os dados NÃO permitem?",
          "options": [
            "A operação continua gerando resultado",
            "O capital de giro ficou mais pesado",
            "Cortar despesas fixas é necessariamente a ação prioritária"
          ],
          "answer": 2,
          "feedback": "A evidência aponta para margem e capital de giro. Cortar estrutura antes de abrir as causas pode atacar o lugar errado."
        },
        {
          "q": "Qual combinação explica melhor o alongamento do ciclo?",
          "options": [
            "PMR e PME subiram e PMP quase não mudou",
            "Resultado operacional aumentou",
            "Receita cresceu"
          ],
          "answer": 0,
          "feedback": "Clientes e estoque passaram a reter capital por mais tempo sem compensação relevante dos fornecedores."
        },
        {
          "q": "Qual próxima análise é mais coerente?",
          "options": [
            "Abrir clientes e estoque que explicam PMR e PME",
            "Analisar apenas o saldo bancário final",
            "Aumentar vendas imediatamente"
          ],
          "answer": 0,
          "feedback": "O diagnóstico já localizou o mecanismo; agora é preciso identificar os componentes que explicam os indicadores."
        }
      ],
      "links": [
        [
          "Laboratório Financeiro",
          "#lab/laboratorio-gestao"
        ],
        [
          "Diagnóstico de Caixa",
          "#resolve/caixa"
        ]
      ]
    },
    {
      "id": "varejo-prisma",
      "initials": "VP",
      "sector": "Comércio",
      "title": "Varejo Prisma",
      "challenge": "Faturamento maior, margem menor e estoque crescente.",
      "story": "Uma distribuidora ampliou descontos para ganhar volume. O faturamento subiu, mas a margem caiu e as compras cresceram antes do giro.",
      "metrics": [
        [
          "Receita",
          "R$ 900 mil → R$ 1,08 mi"
        ],
        [
          "Margem",
          "34% → 27%"
        ],
        [
          "Estoque",
          "R$ 280 mil → R$ 455 mil"
        ],
        [
          "PME",
          "31 → 49 dias"
        ],
        [
          "Caixa",
          "R$ 220 mil → R$ 105 mil"
        ]
      ],
      "questions": [
        {
          "q": "Qual sinal econômico exige investigação imediata?",
          "options": [
            "Aumento da receita",
            "Queda de 7 p.p. na margem",
            "Aumento do estoque isoladamente"
          ],
          "answer": 1,
          "feedback": "Crescer receita com forte deterioração relativa de margem pode destruir a qualidade econômica das vendas."
        },
        {
          "q": "Qual efeito financeiro aparece junto?",
          "options": [
            "Menos capital em estoque",
            "Mais capital retido em estoque",
            "PMP necessariamente maior"
          ],
          "answer": 1,
          "feedback": "Estoque e PME subiram; mais dinheiro permanece imobilizado antes da venda."
        },
        {
          "q": "Qual análise conjunta é mais útil?",
          "options": [
            "Margem + PME + NCG",
            "Somente faturamento",
            "Somente despesas fixas"
          ],
          "answer": 0,
          "feedback": "O caso combina deterioração de margem e capital parado, portanto exige leitura econômica e financeira integrada."
        }
      ],
      "links": [
        [
          "DRE Gerencial",
          "#lesson/dre-gerencial"
        ],
        [
          "PME",
          "#lesson/pme"
        ],
        [
          "Simular Margem",
          "#simulators/margem"
        ]
      ]
    },
    {
      "id": "servicos-atlas",
      "initials": "SA",
      "sector": "Serviços",
      "title": "Serviços Atlas",
      "challenge": "Resultado razoável, recebimento mais lento e concentração de caixa.",
      "story": "Uma empresa de serviços manteve receita e margem relativamente estáveis, mas passou a conceder prazos maiores a clientes relevantes.",
      "metrics": [
        [
          "Receita",
          "R$ 620 mil → R$ 645 mil"
        ],
        [
          "Margem",
          "42% → 41%"
        ],
        [
          "PMR",
          "35 → 59 dias"
        ],
        [
          "Vencidos",
          "R$ 32 mil → R$ 88 mil"
        ],
        [
          "Caixa",
          "R$ 180 mil → R$ 82 mil"
        ]
      ],
      "questions": [
        {
          "q": "Qual indicador mudou mais claramente o mecanismo financeiro?",
          "options": [
            "Receita",
            "PMR",
            "Margem"
          ],
          "answer": 1,
          "feedback": "O PMR aumentou 24 dias, alterando de forma relevante o tempo entre vender e receber."
        },
        {
          "q": "O aumento de vencidos sugere qual investigação?",
          "options": [
            "Cobrança, carteira e renegociações",
            "Somente preço de venda",
            "Somente despesas administrativas"
          ],
          "answer": 0,
          "feedback": "Prazo comercial e inadimplência precisam ser separados antes de qualquer conclusão."
        },
        {
          "q": "Qual ação analítica vem primeiro?",
          "options": [
            "Validar carteira e abrir clientes que explicam o PMR",
            "Cortar estrutura",
            "Vender mais a prazo"
          ],
          "answer": 0,
          "feedback": "A base precisa estar confiável e a concentração do prazo precisa ser identificada."
        }
      ],
      "links": [
        [
          "Contas a Receber",
          "#lesson/contas-a-receber"
        ],
        [
          "PMR",
          "#lesson/pmr"
        ],
        [
          "Resolver problema",
          "#resolve/receber"
        ]
      ]
    }
  ],
  "governance": {
    "owner": "Lean Company",
    "version": "11.0",
    "revision": "set/2026",
    "status": "Conteúdo gerencial interno"
  },
  "assessment": {
    "title": "Diagnóstico inicial",
    "desc": "Cinco decisões curtas para calibrar sua jornada sem substituir a formação.",
    "questions": [
      {
        "slug": "caixa-x-competencia",
        "q": "A energia foi consumida em março e paga em abril. Em qual mês ela pertence à DRE?",
        "options": [
          "Março",
          "Abril",
          "Nos dois meses"
        ],
        "answer": 0
      },
      {
        "slug": "conciliacao-bancaria",
        "q": "Banco e sistema batem porque existe um lançamento genérico de “Ajuste de conciliação”. A conta está conciliada?",
        "options": [
          "Sim",
          "Não; a diferença precisa ser explicada na origem"
        ],
        "answer": 1
      },
      {
        "slug": "dre-gerencial",
        "q": "Receita subiu, despesas fixas ficaram estáveis e a MC% caiu bastante. Qual bloco deve ser aberto primeiro?",
        "options": [
          "Margem e seus drivers",
          "Despesas fixas",
          "Saldo bancário"
        ],
        "answer": 0
      },
      {
        "slug": "ciclo-financeiro",
        "q": "PME = 30 dias, PMR = 45 dias e PMP = 30 dias. Qual é o ciclo financeiro?",
        "options": [
          "15 dias",
          "45 dias",
          "75 dias"
        ],
        "answer": 1
      },
      {
        "slug": "forecast-financeiro",
        "q": "Novas informações indicam receita futura menor que o orçamento. O que deve acontecer?",
        "options": [
          "Alterar o orçamento original",
          "Atualizar o forecast e preservar o orçamento como referência",
          "Ignorar até o fechamento"
        ],
        "answer": 1
      }
    ]
  }
};
