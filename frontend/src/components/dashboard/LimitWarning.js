export default function LimitWarning({ limit, expenses }) {
  if (!limit || !expenses) return null;

  const limitValue = parseFloat(limit);
  const expenseValue = parseFloat(expenses);

  if (limitValue <= 0) return null;

  const percent = expenseValue / limitValue;

  let message = null;
  let color = "";

  if (percent >= 1) {
    message = "Você ultrapassou seu limite mensal!";
    color = "bg-red-600";
  } else if (percent >= 0.8) {
    message = "Atenção: você atingiu 80% do seu limite mensal.";
    color = "bg-orange-500";
  } else if (percent >= 0.5) {
    message = "Você já gastou mais da metade do seu limite mensal.";
    color = "bg-yellow-500";
  }

  if (!message) return null;

  return (
    <div className={`p-4 rounded-lg text-white font-semibold ${color}`}>
      {message}
    </div>
  );
}
