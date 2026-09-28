# Ensino Lean — V11

Plataforma de capacitação gerencial aplicada da Lean Company.

## Status desta versão

A V11 consolida a arquitetura que vinha sendo construída nas versões anteriores e passa a operar com um único app shell, um único router e um único design system carregado em produção.

### Estrutura principal
- Início adaptativo
- Trilhas
- Resolver um problema
- Biblioteca
- Simuladores
- Casos práticos
- Meu progresso
- Painel Lean local de demonstração

### Modelo pedagógico
As aulas foram reorganizadas em cinco etapas:
1. Entender
2. Visualizar
3. Aplicar
4. Validar
5. Demonstrar

O progresso trabalha com os estados:
Conheceu → Praticou → Demonstrou → Aplicou → Validado.

### Recursos adicionados
- Perfil por papel: operação, gestão e direção
- Revisão espaçada
- Aplicação na empresa
- Registro local de validação com consultor
- Biblioteca em formatos rápidos
- Diagnóstico guiado por problema
- Simuladores de margem, ponto de equilíbrio, capital de giro e fluxo projetado
- Três casos práticos fictícios
- Busca global por aprender, consultar e resolver
- Painel Lean com eventos e dificuldades registradas localmente

## Persistência e acesso

Nesta etapa, o progresso e os eventos continuam armazenados em `localStorage` no navegador.

A publicação também continua pública via GitHub Pages durante a fase de evolução do produto.

A arquitetura já separa conteúdo, configuração de produto e aplicação para facilitar a futura migração para autenticação, banco de dados e domínio privado.

## Produção

GitHub Pages: https://brunowdau.github.io/ensino/

## Arquivos ativos

- `index.html`
- `assets/v11.css`
- `assets/v11.js`
- `data/content.js`
- `data/product-v11.js`

Arquivos de versões anteriores permanecem no repositório apenas como histórico e não são carregados pela aplicação atual.
