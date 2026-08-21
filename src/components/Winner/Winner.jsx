 // REQUISITO: RF04 - Destaque/Validação da Condição de Vitória
  // FUNÇÃO AUXILIAR PURA: calculateWinner
  // Papel: Avalia o array do tabuleiro contra as combinações possíveis de vitória do jogo da velha.
  function calculateWinner(squares) {
    // Matriz de referência contendo os 8 alinhamentos possíveis (3 horizontais, 3 verticais e 2 diagonais).
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Percorre todas as combinações de vitória.
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // Verifica se a casa 'a' está preenchida e se tem o mesmo valor das casas 'b' e 'c'.
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Retorna o símbolo vencedor ('X' ou 'O')
      }
    }
    return null; // Retorna null se não houver vencedor
  }
