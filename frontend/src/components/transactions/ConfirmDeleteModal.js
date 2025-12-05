"use client";

export default function ConfirmDeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-color-card p-8 rounded-2xl border border-purple-900/40 shadow-xl shadow-black/40 w-full max-w-md text-white">
        
        <h2 className="text-2xl font-bold mb-4 text-color-pink">
          Excluir transação
        </h2>

        <p className="text-purple-200 mb-6">
          Tem certeza que deseja excluir esta transação?  
          <br />
          Esta ação não pode ser desfeita.
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
            className="px-6 py-2 rounded bg-color-pink hover:bg-pink-500 text-white font-bold"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
