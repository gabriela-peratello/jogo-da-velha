// COMPONENTE: Square
// Papel: Componente de apresentação individual de cada casa (quadrado) da grade 3x3.

import styles from './Square.module.css';


// Recebe o valor calculado pelo componente pai via props e o exibe no botão
export default function Square({value, onSquareClick}) {
    return (<button className={styles.square} onClick={onSquareClick}> {value}</button>);}

