"use client";

export default function CategoryBar({ name, spent, budget }) {
  const percentage = budget ? Math.min((spent / budget) * 100, 100) : 0;
  const exceeded = budget && spent > budget;

  return (
    <div className="bg-color-card p-4 rounded-xl mb-3 border border-purple-900/30">
      <div className="flex justify-between text-sm text-purple-200 mb-2">
        <span>{name}</span>
        <span>
          R$ {spent.toFixed(2).replace(".", ",")}
          {budget && ` / R$ ${budget.toFixed(2).replace(".", ",")}`}
        </span>
      </div>

      <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden">
        <div
          className={`
            h-full 
            transition-all 
            ${exceeded ? "bg-color-pink" : "bg-color-purpleLight"}
          `}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      {exceeded && (
        <p className="text-xs text-color-pink mt-1">
          Você excedeu o limite desta categoria
        </p>
      )}
    </div>
  );
}
