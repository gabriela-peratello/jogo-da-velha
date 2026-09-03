// REQUISITO: RF01 - Interatividade do Tabuleiro
// COMPONENTE: Square
// Papel: Componente de apresentação individual de cada casa (quadrado) da grade 3x3.
// Recebe via props: 
// - value: O símbolo a ser exibido ('X', 'O' ou null).
// - onSquareClick: Função callback disparada ao clicar no botão.


export default function Square({
    value, onSquareClick

}) {
    return (<button className="square" onClick={
        onSquareClick
    }
    > {
            value
        }

    </button>);
}

