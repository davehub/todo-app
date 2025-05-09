"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Task } from "@/interfaces/task";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  const saveTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      saveTasks(filteredTasks);
    }
  };

  const navigateToCreate = () => router.push("/createTask");

  return (
    <div className="container mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Liste des tâches</h1>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-all shadow-md block mx-auto mb-6"
        onClick={navigateToCreate}
      >
        ➕ Créer une tâche
      </button>
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700 font-semibold">
              <th className="p-4">Titre</th>
              <th className="p-4">Statut</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{task.title}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-white text-sm ${task.description ? "bg-green-500" : "bg-red-500"}`}>
                    {task.description ? "Complété" : "Non complété"}
                  </span>
                </td>
                <td className="p-4 flex space-x-4">
                  <button
                    className="text-blue-600 hover:text-blue-700 transition-all"
                    onClick={() => router.push(`/editTask?id=${task.id}`)}
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    className="text-red-600 hover:text-red-700 transition-all"
                    onClick={() => deleteTask(task.id)}
                  >
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}