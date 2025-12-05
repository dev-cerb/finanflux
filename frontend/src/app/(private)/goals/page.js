"use client";

import { useState } from "react";
import useGoals from "@/hooks/useGoals";
import GoalItem from "@/components/goals/GoalItem";
import NewGoalModal from "@/components/goals/NewGoalModal";
import EditGoalModal from "@/components/goals/EditGoalModal";

export default function GoalsPage() {
  const { goals, loading, error, reload } = useGoals();
  const [showNewModal, setShowNewModal] = useState(false);
  const [editing, setEditing] = useState(null);

  if (loading) return <p className="text-white">Carregando...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <div className="text-white space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-color-purple">Metas</h1>

        <button
          onClick={() => setShowNewModal(true)}
          className="bg-color-purple hover:bg-color-purple/80 px-4 py-2 rounded-lg font-bold"
        >
          Nova Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((g) => (
          <GoalItem key={g.id} item={g} onEdit={() => setEditing(g)} />
        ))}

        {goals.length === 0 && (
          <p className="text-purple-300">Nenhuma meta cadastrada ainda.</p>
        )}
      </div>

      {showNewModal && (
        <NewGoalModal onClose={() => setShowNewModal(false)} onCreated={reload} />
      )}

      {editing && (
        <EditGoalModal
          item={editing}
          onClose={() => setEditing(null)}
          onUpdated={reload}
        />
      )}
    </div>
  );
}
