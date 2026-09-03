import styles from './SelecionarAvatar.module.css';

// Duas props: AvatarSelecionado: avisa qual tema deve ficar marcado 
export default function SelecionarAvatar({ avatarSelecionado, temaTrocado }) {
  return (
    <div className={styles.container}>

      <label className={styles.label}>
        Escolha o estilo dos Avatares:
      </label>
      
      {/*Quando o usuário escolhe um tema, é disparado um efeito de mudança -> Captura o valor e repassa ao componente pai */}
      <select id="avatar-selecao" className={styles.select} value={avatarSelecionado} onChange={(e) => temaTrocado(e.target.value)}>

        <option value="classico">Clássico (❌ / ⭕)</option>
        <option value="flores">Flores (🌻 / 🌼)</option>
        <option value="coracoes">Corações (❤ / 💜)</option>
        <option value="animais">Animais (🐍 / 🐊)</option>

      </select>
    </div>
  );
}