import styles from './Square.module.css';

export default function Square({ value, onSquareClick, isWinningSquare }) {
  // Se for o quadrado vencedor, junta a classe padrão com a classe de destaque
  const squareClasses = `${styles.square} ${isWinningSquare ? styles.winning : ''}`;

  return (
    <button className={squareClasses} onClick={onSquareClick}>
      {value}
    </button>
  );
}