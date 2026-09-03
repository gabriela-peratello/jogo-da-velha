// COMPONENTE: Square
// Papel: Componente de apresentação individual de cada casa (quadrado) da grade 3x3.

// Recebe o valor calculado pelo componente pai via props e o exibe no botão
export default function Square({value, onSquareClick}) {
    return (<button className="square" onClick={onSquareClick}> {value}</button>);}

