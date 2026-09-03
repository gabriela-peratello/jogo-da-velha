
export default function SuddenDeath({ isSuddenDeath, timeLeft }) {
 
  // Se Morte Súbita for falsa -> retorna null (ficando invisível)
  if (!isSuddenDeath) return null;

  return (
    <div className="sudden-death-container">
      <h2> MORTE SÚBITA </h2>
      <p>Você tem <strong style={{ fontSize: '1.5rem', color: 'red' }}>{timeLeft}s</strong> para jogar!</p>
    </div>
  );
}