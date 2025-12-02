"use client";

import { useState } from "react";
import useCategories from "@/hooks/useCategories";
import CategoryItem from "@/components/categories/CategoryItem";
import CategoryModal from "@/components/categories/CategoryModal";
import ConfirmDeleteModal from "@/components/categories/ConfirmDeleteModal";

export default function CategoriesPage() {
  const { data, loading, error, reload } = useCategories();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  return (
    <div className="text-white space-y-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-nubank-purple">Categorias</h1>

        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="bg-nubank-purple hover:bg-nubank-purpleLight transition-all px-6 py-2 rounded-lg font-bold text-white"
        >
          Nova Categoria
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* LISTA */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="bg-nubank-card p-6 rounded-xl border border-purple-900/40 shadow-lg shadow-black/20 text-purple-300">
            Nenhuma categoria cadastrada ainda.
          </div>
        ) : (
          data.map((cat) => (
            <CategoryItem
              key={cat.id}
              item={cat}
              onEdit={() => { setEditing(cat); setShowModal(true); }}
              onDelete={() => setDeleting(cat)}
            />
          ))
        )}
      </div>

      {/* MODAL CRIAR/EDITAR */}
      {showModal && (
        <CategoryModal
          item={editing}
          onClose={() => setShowModal(false)}
          onSaved={reload}
        />
      )}

      {/* MODAL EXCLUIR */}
      {deleting && (
        <ConfirmDeleteModal
          item={deleting}
          onCancel={() => setDeleting(null)}
          onConfirm={async () => {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:8000/api/v1/categories/${deleting.id}/`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            reload();
            setDeleting(null);
          }}
        />
      )}
    </div>
  );
}
