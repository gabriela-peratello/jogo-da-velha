import styles from './SelecionarAvatar.module.css';

// duas props: avatarSelecionado: avisa ql tema deve ficar marcado 
export default function SelecionarAvatar({ avatarSelecionado, temaTrocado }) {
  return (
    <div className={styles.container}>

      <label className={styles.label}>
        Escolha o estilo dos Avatares:
      </label>
      
      {/*  mostra a troca de opção no menu e envia o novo valor (e.target.value) para atualizar o estado */}
      <select id="avatar-selecao" className={styles.select} value={avatarSelecionado} onChange={(e) => temaTrocado(e.target.value)}>

        <option value="classico">Clássico (❌ / ⭕)</option>
        <option value="flores">Flores (🌻 / 🌼)</option>
        <option value="coracoes">Corações (❤ / 💜)</option>
        <option value="animais">animais (🐍 / 🐊)</option>

      </select>
    </div>
  );
}