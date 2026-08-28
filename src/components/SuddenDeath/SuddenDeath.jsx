import styles from './SuddenDeath.module.css';


//  mostra se o modo Morte Súbita ta valendo
export default function SuddenDeath({ ativo, tempo }) {
  // se o modo nao tiver ativo, nao aparece
  if (!ativo) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}> MORTE SÚBITA </h3>
      <p className={styles.contador}>
        Tempo para a jogada: <span>{tempo}s</span>
      </p>
    </div>
  );
}