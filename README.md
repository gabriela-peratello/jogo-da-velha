# Jogo da Velha Evoluído - Black Clover Edition

## 1. Visão Geral e Objetivo do Projeto
Este projeto consiste no desenvolvimento de uma aplicação web do tipo SPA (Single Page Application), construída sobre a biblioteca React e utilizando Vite como ferramenta de build. O objetivo fundamental da aplicação é evoluir a mecânica clássica do jogo da velha tradicional, transformando uma estrutura simples de tabuleiro em uma plataforma interativa, competitiva e com alta riqueza de feedback multimídia.

A aplicação conta com uma identidade visual temática inspirada no universo do anime Black Clover, trazendo suporte ao modo escuro (Dark Mode) nativo, customização de avatares em tempo real, sorteio automatizado de início de turno, controle contínuo de placar e ranking acumulativo, sistema de áudio adaptativo e a implementação da mecânica exclusiva de Morte Súbita cronometrada para cenários de empate.

---

## 2. Tecnologias Utilizadas e Arquitetura

- **React 18+:** Biblioteca principal para criação da interface de usuário baseada em componentes reutilizáveis, imutabilidade e gerenciamento de estado declarativo.
- **Vite:** Ferramenta de build de alta performance responsável pelo servidor de desenvolvimento e pelo empacotamento otimizado para produção.
- **JavaScript (ES6+):** Linguagem base para a implementação dos algoritmos de validação de vitória, temporizadores e manipulação dos estados do jogo.
- **CSS3 / CSS Modules:** Estilização modular com escopo fechado por componente, aplicando a metodologia BEM (Block Element Modifier) e variáveis CSS para controle centralizado do Design System.
- **HTML5 Semântico e ARIA:** Estruturação acessível com atributos para leitores de tela e suporte completo para navegação via teclado.

---

## 3. Instruções de Instalação e Execução

### Pré-requisitos Técnicos
Antes de iniciar a instalação local, certifique-se de que o seu ambiente atende aos seguintes requisitos:
- Node.js instalado na versão 18.0.0 ou superior.
- Gerenciador de pacotes NPM (incluso no Node.js) ou Yarn.

### Passos para Execução do Projeto
1. Realize o clone do repositório remoto para o seu diretório local:
   git clone <URL_DO_SEU_REPOSITORIO>

2. Acesse a pasta raiz do projeto via terminal:
   cd nome-do-repositorio

3. Execute o comando de instalação para baixar todas as dependências mapeadas:
   npm install

4. Inicie o servidor de desenvolvimento local:
   npm run dev

5. Acesse o endereço disponibilizado no terminal em seu navegador (por padrão, http://localhost:5173).

---

## 4. Instruções de Jogabilidade e Regras de Negócio

### Regras do Jogo Tradicional
1. A cada nova rodada, o tabuleiro 3x3 é completamente limpo e o sistema executa um sorteio aleatório (com probabilidade 50/50) para determinar qual jogador realizará a primeira jogada.
2. Os jogadores realizam jogadas de forma estritamente alternada. Não é permitido sobrescrever casas previamente marcadas ou executar jogadas após o encerramento do round.
3. Para vencer uma rodada, o jogador deve alinhar três ícones idênticos na horizontal, vertical ou diagonal.
4. O placar da partida monitora a pontuação em tempo real. Quando um jogador atinge a marca de 3 vitórias na partida corrente, o placar do round é zerado e o ponto de vitória final é contabilizado no Ranking Acumulativo Geral.

### Regra Especial: Modo Morte Súbita (Pós-Empate)
1. Se todas as 9 casas do tabuleiro forem preenchidas sem que haja um alinhamento vencedor, a rodada é declarada como empate.
2. A rodada imediatamente seguinte a um empate ativa de forma automática o modo Morte Súbita, introduzindo pressão de tempo sobre os jogadores.
3. No modo Morte Súbita, cada jogador dispõe de um limite estrito de 3 segundos para selecionar uma casa e efetuar a sua jogada.
4. Se o cronômetro de 3 segundos zerar sem uma ação do jogador, ele perde o turno corrente e a vez é repassada automaticamente ao adversário. Caso o adversário também não jogue a tempo, os turnos continuam alternando sucessivamente a cada 3 segundos até que uma marcação válida seja realizada no tabuleiro.

### Métodos de Interação e Acessibilidade
- **Interação Visual (Mouse / Touch):** Seleção direta das casas através do clique ou toque no tabuleiro.
- **Interação Acessível (Teclado Numérico):** Suporte total ao mapeamento das teclas 1 a 9 do teclado numérico para preenchimento rápido das casas correspondentes na grade.
- **Seleção de Temas e Avatares:** O usuário pode alterar o conjunto visual de ícones a qualquer momento no menu de configurações; a alteração será aplicada na rodada subsequente para manter a integridade da partida em andamento.


Clonar repositório:
Link: https://github.com/gabriela-peratello/jogo-da-velha.git