"use client";

export default function GoalItem({ item, onEdit }) {
  const progress = (Number(item.current_value) / Number(item.final_value)) * 100;
  const nearGoal = progress >= 80;

  return (
    <div className="bg-color-card p-5 rounded-xl border border-purple-900/40 shadow-lg shadow-black/30">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{item.name}</h2>

        <button
          onClick={onEdit}
          className="text-sm bg-purple-700 hover:bg-purple-600 px-3 py-1 rounded-md"
        >
          Editar
        </button>
      </div>

      <p className="text-purple-300 mt-1">
        R$ {Number(item.current_value).toLocaleString("pt-BR")} / R${" "}
        {Number(item.final_value).toLocaleString("pt-BR")}
      </p>

      <div className="w-full h-3 bg-purple-800 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all ${
            nearGoal ? "bg-green-400" : "bg-color-purple"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {nearGoal && (
        <p className="text-green-400 text-sm mt-2 font-semibold">
          Quase lá! Sua meta está {progress.toFixed(0)}% concluída
        </p>
      )}
    </div>
  );
}
