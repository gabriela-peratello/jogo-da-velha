import Square from '../Square/Square';
import styles from './Board.module.css';

export default function Board({ 
  xIsNext, 
  squares, 
  onPlay, 
  isGameOver, 
  avatares, 
  winningLine = [] 
}) {
  function getSquareIcon(value) {
    if (value === 'X') return avatares.x;
    if (value === 'O') return avatares.o;
    return null;
  }

  function handleClick(i) {
    if (isGameOver || squares[i]) return;

    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div className={styles.board}>
      {[0, 1, 2].map((row) => (
        <div key={row} className={styles.boardRow}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square
                key={index}
                value={getSquareIcon(squares[index])}
                onSquareClick={() => handleClick(index)}
                isWinningSquare={winningLine.includes(index)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}