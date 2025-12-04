export default function DebtItem({ item, onEdit }) {
  const total = parseFloat(item.total_value);
  const paid = parseFloat(item.current_value);

  const percentage = Math.min((paid / total) * 100, 100);
  const remaining = total - paid;

  return (
    <div className="bg-nubank-card p-5 rounded-xl border border-purple-900/40 shadow-lg shadow-black/30">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{item.name}</h2>
        <button 
          onClick={() => onEdit(item)} 
          className="text-nubank-purple font-semibold hover:underline"
        >
          Editar
        </button>
      </div>

      <div className="mt-4">
        <p className="text-purple-200 text-sm mb-1">Progresso</p>
        <div className="w-full h-3 bg-purple-950 rounded">
          <div
            className="h-full bg-nubank-purple rounded"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 text-purple-200 text-sm space-y-1">
        <p>Total: R$ {total.toFixed(2).replace('.', ',')}</p>
        <p>Pago: R$ {paid.toFixed(2).replace('.', ',')}</p>
        <p>Restante: R$ {remaining.toFixed(2).replace('.', ',')}</p>
      </div>

      <p className="text-purple-300 text-xs mt-3">
        Vencimento: {item.due_date}
      </p>
    </div>
  );
}
