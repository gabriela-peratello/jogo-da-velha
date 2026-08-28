import { useState } from 'react';

import Board from '../Board/Board';
import SelecionarAvatar from '../SelecionarAvatar/SelecionarAvatar';

// import Scoreboard from '../ScoreBoard/ScoreBoard';
// import SuddenDeath from '../SuddenDeath/SuddenDeath';





// REQUISITO: RF03 (Histórico e Estado Global do Jogo)
// COMPONENTE CONTÊINER PRINCIPAL: Game (definido internamente)
// Papel: Centraliza o estado global, o histórico de jogadas e a navegação temporal.
export default function Game() {

  const icones = {
    classico: { x: '❌', o: '⭕' },
    flores: { x: '🌻', o: '🌼' },
    coracoes: { x: '❤', o: '💜' },
    animais: { x: '🐍', o: '🐊' }
  };

  
  const [AvatarEscolhido, setAvatarEscolhido] = useState('classico')

  const avatarAtual = icones[AvatarEscolhido]



  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retorna 'X' ou 'O'
      }
    }
    return null; 
  }



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
      <SelecionarAvatar selectedAvatar={AvatarEscolhido}
        temaTrocado={setAvatarEscolhido} />
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} avatares={avatarAtual} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

