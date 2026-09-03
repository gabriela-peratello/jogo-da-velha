import { useState, useEffect } from 'react';

import Board from '../Board/Board';
import SelecionarAvatar from '../SelecionarAvatar/SelecionarAvatar';
import SuddenDeath from '../SuddenDeath/SuddenDeath';

export default function Game() {
  // --- 1. ESTADOS DO JOGO ---
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // --- 2. ESTADOS DA MORTE SÚBITA ---
  const [isSuddenDeath, setIsSuddenDeath] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);

  // --- 3. SELEÇÃO DE AVATARES ---
  const icones = {
    classico: { x: '❌', o: '⭕' },
    flores: { x: '🌻', o: '🌼' },
    coracoes: { x: '❤', o: '💜' },
    animais: { x: '🐍', o: '🐊' }
  };
  const [AvatarEscolhido, setAvatarEscolhido] = useState('classico');
  const avatarAtual = icones[AvatarEscolhido];

  // --- 4. LÓGICA DERIVADA ---
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // --- 5. CALCULADOR DE VENCEDOR ---
  function calculateWinner(squares) {
    if (!squares) return null;
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // --- 6. FUNÇÃO PARA PASSAR A VEZ POR TIMEOUT ---
  function handleTimeoutPassTurn() {
    setCurrentMove((prevMove) => prevMove + 1);
    setTimeLeft(3);
  }

  // --- 7. TEMPORIZADOR DA MORTE SÚBITA ---
  useEffect(() => {
    let relogio;

    if (isSuddenDeath) {
      relogio = setInterval(() => {
        setTimeLeft((tempoAtual) => {
          if (tempoAtual <= 1) {
            return 0; // Marca que o tempo zerou
          }
          return tempoAtual - 1;
        });
      }, 1000);
    }

    return () => clearInterval(relogio);
  }, [isSuddenDeath]);

  // --- 8. TROCA DE TURNO QUANDO O TEMPO ZERA ---
  useEffect(() => {
    if (isSuddenDeath && timeLeft === 0) {
      handleTimeoutPassTurn();
    }
  }, [timeLeft, isSuddenDeath]);

  // --- 9. DETECTOR DE EMPATE E TRANSIÇÃO PARA MORTE SÚBITA ---
  useEffect(() => {
    if (!currentSquares) return;

    const winner = calculateWinner(currentSquares);
    const isBoardFull = currentSquares.every((square) => square !== null);

    console.log('Verificando Empate -> Vencedor:', winner, '| Tabuleiro cheio:', isBoardFull);

    if (!winner && isBoardFull && !isSuddenDeath) {
      const timerId = setTimeout(() => {
        setIsSuddenDeath(true);
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setTimeLeft(3);
      }, 400);

      return () => clearTimeout(timerId);
    }
  }, [currentSquares, isSuddenDeath]);

  // --- 10. MANIPULAÇÃO DE JOGADA ---
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (isSuddenDeath) {
      setTimeLeft(3);
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Ir para jogada #${move}` : 'Jogar Novamente';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <SelecionarAvatar
        selectedAvatar={AvatarEscolhido}
        temaTrocado={setAvatarEscolhido}
      />

      <SuddenDeath isSuddenDeath={isSuddenDeath} timeLeft={timeLeft} />

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          avatares={avatarAtual}
        />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}