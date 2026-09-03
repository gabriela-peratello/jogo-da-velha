📚 PLANO DETALHADO DO PROJETO: JOGO DA VELHA REFACTORED
📌 Capitulo 1: Planejamento, Visão Geral e Regras de Negócio
Objetivo: Mapear os requisitos antes de escrever qualquer linha de código.

1.1 Visão Geral do Projeto:

O que o projeto faz de diferente do tutorial padrão do React? (Ex.: suporte a troca de avatares/temas, temporizador Morte Súbita, nomes de jogadores customizados).

1.2 Mapeamento de Regras de Negócio (RN):

RN01 - Turnos: O jogador do turno atual clica em uma casa vazia para marcar seu símbolo.

RN02 - Bloqueio: Casas já preenchidas ou jogos com vencedor definido não aceitam novos cliques.

RN03 - Condição de Vitória: 3 símbolos iguais alinhados (linhas, colunas ou diagonais).

RN04 - Empate (Velha): 9 casas preenchidas sem nenhum alinhamento vencedor.

RN05 - Morte Súbita (Regra Especial): Temporizador regressivo de 3 segundos por jogada ativado em cenários específicos.

1.3 Requisitos Funcionais (RF):

RF01: O sistema deve permitir alterar o tema dos avatares (Classico, Flores, Coracoes, Animais).

RF02: O sistema deve exibir quem é o próximo a jogar e qual o resultado da partida.

RF03: O sistema deve armazenar o histórico de jogadas e permitir navegar entre elas ("viagem no tempo").

📌 Capitulo 2: Configuração do Ambiente e Design System
Objetivo: Estruturar a infraestrutura do projeto e garantir uma estilização modular e escalável.

2.1 Configuração inicial:

Criação do projeto com React + Vite.

Limpeza de arquivos desnecessários gerados pelo modelo padrão.

2.2 Arquitetura de Pastas:

Plaintext
src/
├── components/          # Componentes modulares
│   ├── Board/
│   ├── Square/
│   ├── SelecionarAvatar/
│   └── SuddenDeath/
├── index.css            # Variáveis CSS globais e Reset
└── main.jsx             # Ponto de entrada da aplicação
2.3 Design System & Variáveis CSS (index.css):

Criação das variáveis :root para cores, fontes, sombras e bordas.

Isolamento das regras específicas de estilo usando CSS Modules (Componente.module.css).

📌 Capitulo 3: Componentização e Hierarquia
Objetivo: Dividir a interface em componentes reutilizáveis mantendo responsabilidades claras.

3.1 Diagrama de Hierarquia:

Game (Componente Pai / Estado Global)

SelecionarAvatar (Formulário controlado)

SuddenDeath (Display do temporizador)

Board (Estrutura do tabuleiro 3x3)

Square (Botão individual / Átomo)

3.2 Fluxo de Props:

Elevação de Estado (Lifting State Up): o Game centraliza o estado e passa dados e funções manipuladoras (onPlay, temaTrocado) via props para os filhos.

📌 Capitulo 4: Estado, Lógica do Jogo e Imutabilidade
Objetivo: Implementar as regras de negócio e garantir previsibilidade nos estados.

4.1 Imutabilidade em Arrays:

Uso do operador Spread ([...]) e do método .slice() para atualizar o histórico sem alterar o estado diretamente (mutation-free).

4.2 Gerenciamento Assíncrono e Efeitos (useEffect):

Temporizador do modo Morte Súbita gerenciado com setInterval e função de limpeza (cleanup function) para evitar vazamento de memória (memory leaks).

4.3 Funções Auxiliares:

calculateWinner(squares): Algoritmo de verificação das 8 combinações de vitória possíveis.

📌 Capitulo 5: Refatoração, UX/UI e Acessibilidade
Objetivo: Polir o visual, garantir usabilidade e tornar a aplicação inclusiva.

5.1 Layout Responsivo:

Organização com CSS Grid e Flexbox para adaptação automática a telas de celulares e computadores.

5.2 Acessibilidade (a11y):

Uso de tags semânticas HTML5 (<main>, <section>, <button>, <label>).

Atributos como aria-label e estados visuais :focus-visible para navegação via teclado.

5.3 Boas Práticas e Clean Code:

Nomes descritivos para variáveis/estados (isSuddenDeath, timeLeft, avatarAtual).

Separação rigorosa entre componentes de lógica (containers) e componentes visuais (apresentação).

📌 Capitulo 6: Documentação e Relatório Técnico Final
Objetivo: Consolidar todo o aprendizado em uma documentação técnica pronta para portfólio.

6.1 Estrutura do Relatório:

Visão geral e justificativa das escolhas técnicas.

Mapeamento de componentes e decisões de arquitetura.

Especificação detalhada do código-fonte (propósito de cada função).

Criação do arquivo README.md detalhado na raiz do repositório.
