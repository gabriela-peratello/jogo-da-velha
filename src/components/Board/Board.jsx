
import Square from '../Square/Square';
import styles from './Board.module.css';

// REQUISITOS: RF01 (Interatividade), RF04 (Vitória) e RF05 (Painel de Status)
// Papel: Gerencia a renderização da grade 3x3 e a lógica de clique individual das casas


// Props adicionadas -> isGameOver e avatares
export default function Board({ xIsNext, squares, onPlay, isGameOver, avatares }) {

  // Lê a letra e retorna o avatar correspondente do tema selecionado
  function iconeSquare (value) {
    if (value === 'X') return avatares.x; 
    if (value === 'O') return avatares.o; 
    return null;                           
  }

  // FUNÇÃO: handleClick
  // Manipula a tentativa de jogada na casa de índice 'i'.
  function handleClick(i) {

    //Se o jogo acabou, não consegue clicar mais
    if (isGameOver || squares[i]) {
      return;
    }

    // React: Aplicação do conceito de Imutabilidade -> Cria uma cópia e altera apenas a cópia
    // e notifica o componente pai, atualizando a interface
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    // React: Envia novo array com a jogada para o Game
    onPlay(nextSquares);
  }


  // Grade jogo -> Apenas as classes foram modificadas
  return (
    <div className ={styles.board}>
      {/* <div className={styles.status}>Status do Jogo</div> */}
      <div className={styles.boardRow}>
        <Square value={iconeSquare(squares[0])} onSquareClick={() => handleClick(0)} />
        <Square value={iconeSquare(squares[1])} onSquareClick={() => handleClick(1)} />
        <Square value={iconeSquare(squares[2])} onSquareClick={() => handleClick(2)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={iconeSquare(squares[3])} onSquareClick={() => handleClick(3)} />
        <Square value={iconeSquare(squares[4])} onSquareClick={() => handleClick(4)} />
        <Square value={iconeSquare(squares[5])} onSquareClick={() => handleClick(5)} />
      </div>
      <div className={styles.boardRow}>
        <Square value={iconeSquare(squares[6])} onSquareClick={() => handleClick(6)} />
        <Square value={iconeSquare(squares[7])} onSquareClick={() => handleClick(7)} />
        <Square value={iconeSquare(squares[8])} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

