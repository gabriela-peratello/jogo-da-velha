// src/components/SuddenDeath/SuddenDeath.jsx

export default function SuddenDeath({ isSuddenDeath, timeLeft }) {
 
  if (!isSuddenDeath) return null;

  return (
    <div className="sudden-death-container">
      <h2> MORTE SÚBITA </h2>
      <p>Você tem <strong style={{ fontSize: '1.5rem', color: 'red' }}>{timeLeft}s</strong> para jogar!</p>
    </div>
  );
}