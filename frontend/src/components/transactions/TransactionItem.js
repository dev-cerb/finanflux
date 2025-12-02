"use client";

export default function TransactionItem({ item, onClick }) {
  const isEntry = item.type_of_transaction === "entrada";

  return (
    <div
      onClick={onClick}
      className="
        bg-nubank-card
        p-4 
        rounded-xl 
        border border-purple-900/40
        shadow-lg shadow-black/20
        flex justify-between items-center
        cursor-pointer hover:bg-purple-900/30 transition
      "
    >
      <div>
        <p className="text-purple-200 text-sm">{item.category_name}</p>
        <h3 className="text-lg font-semibold text-white">{item.description}</h3>
        <p className="text-xs text-purple-400">
          {new Date(item.date).toLocaleDateString("pt-BR")}
        </p>
      </div>

      <div className={`text-lg font-bold ${isEntry ? "text-green-400" : "text-red-400"}`}>
        {isEntry ? "+" : "-"} R$ {Math.abs(Number(item.value)).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
}
