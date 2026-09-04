import { useState, useEffect, useCallback } from 'react';
import Board from '../Board/Board';
import SelecionarAvatar from '../SelecionarAvatar/SelecionarAvatar';
import SuddenDeath from '../SuddenDeath/SuddenDeath';

const AVATARS = {
  classico: { x: '❌', o: '⭕' },
  flores: { x: '🌻', o: '🌼' },
  coracoes: { x: '❤', o: '💜' },
  animais: { x: '🐍', o: '🐊' }
};

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function calculateWinner(squares) {
  if (!squares) return null;
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [avatarEscolhido, setAvatarEscolhido] = useState('classico');
  
  // Morte Súbita
  const [isSuddenDeath, setIsSuddenDeath] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  
  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  const isBoardFull = currentSquares?.every(Boolean);
  const isGameOver = Boolean(winner);

  const passTurn = useCallback(() => {
    setCurrentMove((prev) => prev + 1);
    setTimeLeft(5);
  }, []);

  // Timer unificado para a Morte Súbita
  useEffect(() => {
    if (!isSuddenDeath || isGameOver) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          passTurn();
          return 5;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSuddenDeath, isGameOver, passTurn]);

  // Transição para Morte Súbita ao empatar
  useEffect(() => {
    if (!winner && isBoardFull && !isSuddenDeath) {
      const timer = setTimeout(() => {
        setIsSuddenDeath(true);
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setTimeLeft(5);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [winner, isBoardFull, isSuddenDeath]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (isSuddenDeath) {
      setTimeLeft(5);
    }
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsSuddenDeath(false);
    setTimeLeft(5);
  }

  return (
    <div className="game">
      <SelecionarAvatar
        selectedAvatar={avatarEscolhido}
        temaTrocado={setAvatarEscolhido}
      />

      <SuddenDeath isSuddenDeath={isSuddenDeath} timeLeft={timeLeft} />

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          avatares={AVATARS[avatarEscolhido]}
          winningLine={winningLine}
          isGameOver={isGameOver}
        />
      </div>

      <div className="game-info">
        <button onClick={handleReset}>Reiniciar Jogo</button>
      </div>
    </div>
  );
}