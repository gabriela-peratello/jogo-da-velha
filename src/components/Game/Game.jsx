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