
import Square from '../Square/Square';
import styles from "./Board.module.css";


// REQUISITOS: RF01 (Interatividade), RF04 (Vitória) e RF05 (Painel de Status)
// COMPONENTE: Board
// Papel: Gerencia a renderização da grade 3x3 e a lógica de clique individual das casas.


export default function Board({ xIsNext, squares, onPlay, isGameOver, avatares }) {

  // pega a letra x ou o do array e devolve o do tema atual
  function iconeSquare (value) {
    if (value === 'X') return avatares.x; 
    if (value === 'O') return avatares.o; 
    return null;                           
  }

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
        <Square value={iconeSquare(squares[0])} onSquareClick={() => handleClick(0)} />
        <Square value={iconeSquare(squares[1])} onSquareClick={() => handleClick(1)} />
        <Square value={iconeSquare(squares[2])} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={iconeSquare(squares[3])} onSquareClick={() => handleClick(3)} />
        <Square value={iconeSquare(squares[4])} onSquareClick={() => handleClick(4)} />
        <Square value={iconeSquare(squares[5])} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={iconeSquare(squares[6])} onSquareClick={() => handleClick(6)} />
        <Square value={iconeSquare(squares[7])} onSquareClick={() => handleClick(7)} />
        <Square value={iconeSquare(squares[8])} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

