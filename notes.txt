import { useState } from 'react';

function App() {

  // REQUISITO: RF01 - Interatividade do Tabuleiro
  // COMPONENTE: Square
  // Papel: Componente de apresentação individual de cada casa (quadrado) da grade 3x3.
  // Recebe via props: 
  // - value: O símbolo a ser exibido ('X', 'O' ou null).
  // - onSquareClick: Função callback disparada ao clicar no botão.
  function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }

  // REQUISITOS: RF01 (Interatividade), RF04 (Vitória) e RF05 (Painel de Status)
  // COMPONENTE: Board
  // Papel: Gerencia a renderização da grade 3x3 e a lógica de clique individual das casas.
  function Board({ xIsNext, squares, onPlay }) {
    
    // FUNÇÃO: handleClick
    // Manipula a tentativa de jogada na casa de índice 'i'.
    function handleClick(i) {
      // REGRA DE NEGÓCIO: Bloqueio de jogada inválida.
      // Retorna antecipadamente se o jogo já tiver um vencedor ou se a casa já estiver ocupada.
      if (calculateWinner(squares) || squares[i]) {
        return;
      }

      // PRINCIPIO REACT: Imutabilidade de Estado.
      // Cria uma cópia rasa do array de posições antes de modificar seus dados.
      const nextSquares = squares.slice();

      // Alterna a marcação entre 'X' e 'O' com base no turno do jogador.
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }

      // Notifica o componente pai (Game/App) sobre o novo estado do tabuleiro.
      onPlay(nextSquares);
    }

    // AVALIAÇÃO DE ESTADO: Verifica a cada renderização se há um vencedor.
    const winner = calculateWinner(squares);
    let status;

    // Define a mensagem dinâmica que será exibida no topo do tabuleiro.
    if (winner) {
      status = 'Winner: ' + winner; // Mensagem de vitória
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Mensagem do próximo turno
    }

    // RENDERIZAÇÃO DA GRADE 3x3:
    // Constrói as 3 linhas (board-row) contendo 3 componentes Square cada (índices 0 a 8).
    return (
      <>
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </>
    );
  }

  // REQUISITO: RF03 (Histórico e Estado Global do Jogo)
  // COMPONENTE CONTÊINER PRINCIPAL: Game (definido internamente)
  // Papel: Centraliza o estado global, o histórico de jogadas e a navegação temporal.
  export default function Game() {
    // ESTADO: 'history' armazena o histórico de todos os estados do tabuleiro (matriz de jogadas).
    // Inicializa com um array de 9 posições nulas.
    const [history, setHistory] = useState([Array(9).fill(null)]);

    // ESTADO: 'currentMove' indica qual jogada da linha do tempo está sendo visualizada no momento.
    const [currentMove, setCurrentMove] = useState(0);

    // LÓGICA DERIVADA:
    // Determina de quem é a vez baseado na paridade da jogada atual (sem necessidade de estado extra).
    const xIsNext = currentMove % 2 === 0;

    // Recupera o estado exato do tabuleiro para a jogada atual.
    const currentSquares = history[currentMove];

    // FUNÇÃO: handlePlay
    // Recebe o novo tabuleiro vindo do Board e atualiza o histórico.
    function handlePlay(nextSquares) {
      // Mantém o histórico até o ponto atual e concatena a nova jogada (garante consistência após viagens no tempo).
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
    }

    // FUNÇÃO: jumpTo
    // Permite navegar no tempo alterando o índice do movimento atual.
    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
    }

    // RENDERIZAÇÃO DA LISTA DE HISTÓRICO:
    // Mapeia o array 'history' para criar botões de navegação temporal.
    const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  // REQUISITO: RF04 - Destaque/Validação da Condição de Vitória
  // FUNÇÃO AUXILIAR PURA: calculateWinner
  // Papel: Avalia o array do tabuleiro contra as combinações possíveis de vitória do jogo da velha.
  function calculateWinner(squares) {
    // Matriz de referência contendo os 8 alinhamentos possíveis (3 horizontais, 3 verticais e 2 diagonais).
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Percorre todas as combinações de vitória.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Verifica se a casa 'a' está preenchida e se tem o mesmo valor das casas 'b' e 'c'.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retorna o símbolo vencedor ('X' ou 'O')
      }
    }
    return null; // Retorna null se não houver vencedor
  }

}

export default App