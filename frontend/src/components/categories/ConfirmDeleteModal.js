"use client";

export default function ConfirmDeleteModal({ item, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-nubank-card p-8 rounded-2xl border border-purple-900/40 shadow-xl shadow-black/40 w-full max-w-md text-white">
        
        <h2 className="text-2xl font-bold mb-4 text-nubank-pink">
          Excluir categoria
        </h2>

        <p className="text-purple-200 mb-6">
          Você tem certeza que deseja excluir a categoria:
          <br />
          <span className="text-white font-bold">{item.name}</span>?
          <br /><br />
          Esta ação <strong>não poderá ser desfeita.</strong>
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-purple-700/40 hover:bg-purple-700/60"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded bg-red-500/40 hover:bg-red-500/60 text-red-200 font-bold"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
