
# Observatório Econômico Recife

**Versão 2.0.0**

Este é o repositório para o projeto do Observatório Econômico do Recife, desenvolvido como parte de um desafio/hackathon. Este projeto tem como objetivo melhorar a visualização e a usabilidade dos dados econômicos do Recife, proporcionando acesso mais fácil e análises robustas através de gráficos interativos, tabelas dinâmicas e outras ferramentas.

---

## Tecnologias Utilizadas

- **Next.js 14.2.5** - Framework de React para renderização de páginas dinâmicas e otimizadas.
- **React 18** - Biblioteca para construção de interfaces de usuário.
- **Recharts** - Biblioteca para gráficos em React, usada para visualização de dados.
- **Tailwind CSS 3.4.1** - Framework CSS utilitário para estilização rápida e responsiva.
- **Sass** - Processador CSS para maior flexibilidade de estilos.
- **HTML2Canvas** - Biblioteca para capturar elementos como imagens para exportação.

---

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/usuario/observatorio-economico-recife.git
   cd observatorio-economico-recife
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure as variáveis de ambiente (se aplicável) em um arquivo `.env.local`:
   ```
   PUBLIC_API_BASE_URL=http://localhost:3001/api/data
   ```
4. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

---

## Scripts Disponíveis

- `npm run dev`: Executa o servidor de desenvolvimento.
- `npm run build`: Constrói o projeto para produção.
- `npm run start`: Inicia o servidor com a build de produção.
- `npm run lint`: Executa o linter para identificar problemas de código.

---

## Funcionalidades

- **Gráficos Interativos**: Visualização de dados através de gráficos responsivos.
- **Tabelas Dinâmicas**: Dados organizados e filtráveis para melhor análise.
- **Exportação de Gráficos**: Capacidade de exportar gráficos como imagens (utilizando `html2canvas`).
- **Usabilidade Melhorada**: Interfaces amigáveis com foco na experiência do usuário.
- **Estilização Responsiva**: Estilização utilizando Tailwind CSS para um design responsivo.

---

## Desafios Enfrentados e Soluções

Durante o desenvolvimento, trabalhamos em diversas melhorias relacionadas à usabilidade e visualização dos dados econômicos, como:

- **Manipulação de Dados em Gráficos**: Ajustamos as visualizações para representar informações complexas de forma clara e concisa.
- **Desempenho**: Melhorias de renderização para carregar gráficos e tabelas de forma eficiente.
- **Interatividade**: Implementação de funcionalidades de tela cheia e exportação de gráficos, proporcionando maior flexibilidade para os usuários.



**Desenvolvido por:** 
---
<a href="https://github.com/brennoaf"><img src="https://avatars.githubusercontent.com/u/131369370?s=512&v=2" width="50" height="50" alt="Brenno França" /></a>

<a href="https://github.com/larialbu"><img src="https://avatars.githubusercontent.com/u/105246799?v=4" width="50" height="50" alt="Larissa Albuquerque" /></a>

<a href="https://github.com/RaCinthia"><img src="https://avatars.githubusercontent.com/u/144265210?v=4" width="50" height="50" alt="Radrígyla Fonseca" /></a>

<a href="https://github.com/rodrigoacm10"><img src="https://avatars.githubusercontent.com/u/137843317?v=4" width="50" height="50" alt="Rodrigo Andrade" /></a>
