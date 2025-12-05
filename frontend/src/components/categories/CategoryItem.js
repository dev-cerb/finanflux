"use client";

export default function CategoryItem({ item, onEdit, onDelete }) {
  return (
    <div className="
      bg-color-card p-5 rounded-xl border border-purple-900/40
      shadow-lg shadow-black/20 flex justify-between items-center
      hover:bg-purple-900/40 transition cursor-pointer
    ">
      <div>
        <h3 className="text-xl font-semibold text-white">{item.name}</h3>

        <p className="text-purple-300 text-sm mt-1">
          Limite mensal: 
          <span className="text-white ml-1">
            R$ {Number(item.budget).toLocaleString("pt-BR", {
              minimumFractionDigits: 2
            })}
          </span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className="px-3 py-1 rounded bg-purple-700/40 hover:bg-purple-700/60 text-white"
        >
          Editar
        </button>

        <button
          onClick={onDelete}
          className="px-3 py-1 rounded bg-red-600/40 hover:bg-red-600/60 text-red-200"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
