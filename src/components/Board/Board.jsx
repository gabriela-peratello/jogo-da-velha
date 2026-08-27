
import Square from '../Square/Square';


// REQUISITOS: RF01 (Interatividade), RF04 (Vitória) e RF05 (Painel de Status)
// COMPONENTE: Board
// Papel: Gerencia a renderização da grade 3x3 e a lógica de clique individual das casas.


export default function Board({ xIsNext, squares, onPlay }) {

  // FUNÇÃO: handleClick
  // Manipula a tentativa de jogada na casa de índice 'i'.
  function handleClick(i) {
   
    // Bloqueia o clique se a rodada já finalizou ou se a casa já tem dono
    if (isGameOver || squares[i]) {
      return;
    }

    // Aplicação do conceito de Imutabilidade
    const nextSquares = squares.slice();

    // Define qual jogador marcou a casa
    nextSquares[i] = xIsNext ? 'X' : 'O';

    // Envia o novo array com a jogada para o Game
    onPlay(nextSquares);
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

