# Ensino Lean — V12

Plataforma de capacitação gerencial aplicada da Lean Company.

## Direção da V12

A V12 mantém a arquitetura macro validada na V11 e profissionaliza a experiência em sete frentes:

1. linguagem visual didática específica por tema;
2. demonstração de competência mais rigorosa;
3. diagnóstico adaptativo;
4. casos práticos em formato de dossier;
5. simuladores comparativos;
6. personalização mais forte por função;
7. arquitetura técnica modular.

## Formação Financeiro

A trilha continua com:
- 6 módulos;
- 19 aulas;
- 4 checkpoints;
- 2 laboratórios;
- 1 prática diagnóstica final.

Cada uma das 19 aulas possui:
- exercício base;
- segunda aplicação de domínio;
- elemento visual próprio;
- atividade de aplicação na empresa;
- formato de consulta na Biblioteca.

## Modelo pedagógico

Etapas da aula:
1. Entender
2. Visualizar
3. Aplicar
4. Validar
5. Demonstrar

Mapa de competência:
Conheceu → Praticou → Demonstrou → Aplicou → Validado.

Na V12, “Demonstrou” exige duas aplicações corretas; uma única questão não é mais suficiente.

## Melhorias V12

### UX / UI
- Home mais operacional para usuário recorrente;
- prioridades de estudo, revisão e aplicação;
- menos dependência de cards dentro das aulas;
- conteúdo central em folhas editoriais;
- textos auxiliares maiores;
- menu lateral mantido e responsivo;
- linguagem visual própria para cada uma das 19 aulas.

### Personalização
Perfis:
- Financeiro operacional;
- Gestor financeiro;
- Direção / sócio.

A função altera foco, ênfase e profundidade técnica exibida na aula.

### Resolver um problema
Os diagnósticos agora mostram uma pergunta por vez e adaptam a próxima etapa conforme a resposta.

### Biblioteca
Os formatos possuem experiências distintas:
- Checklist;
- Indicador;
- Playbook;
- Guia visual;
- Lean Card.

### Simuladores
Cinco simuladores comparando:
- Atual;
- Cenário A;
- Cenário B.

Simuladores disponíveis:
- Margem e desconto;
- Ponto de equilíbrio;
- Preço e margem-alvo;
- Capital de giro;
- Fluxo projetado.

### Casos práticos
Os três casos passaram a operar como dossiers:
- contexto;
- documentos/evidências;
- decisões sequenciais;
- debrief.

### Progresso
O painel destaca:
- competências frágeis;
- revisões pendentes;
- aplicações pendentes;
- nível de domínio.

### Painel Lean
A demonstração local mostra:
- maturidade por bloco;
- erros;
- buscas;
- aplicações;
- validações;
- atividade recente.

## Arquitetura técnica

A V12 não carrega os arquivos runtime da V11.

Arquivos ativos:
- `index.html`
- `assets/v12.css`
- `data/content.js`
- `data/product-v12.js`
- `assets/v12/core.js`
- `assets/v12/components.js`
- `assets/v12/learning.js`
- `assets/v12/diagnostics.js`
- `assets/v12/simulators.js`
- `assets/v12/cases.js`
- `assets/v12/analytics.js`
- `assets/v12/app.js`

## Persistência e publicação nesta etapa

Conforme decisão do projeto:
- progresso e eventos continuam em `localStorage`;
- publicação continua pública no GitHub Pages durante a fase de desenvolvimento;
- autenticação/backend e domínio privado ficam para uma etapa futura.

## Publicação atual

https://brunowdau.github.io/ensino/
