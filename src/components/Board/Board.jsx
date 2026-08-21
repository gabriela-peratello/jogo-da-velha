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
