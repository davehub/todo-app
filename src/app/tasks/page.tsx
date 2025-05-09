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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des tâches</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={navigateToCreate}>Créer une tâche</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-left">
            <th className="p-2">Titre</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description ? "Complété" : "Non complété"}</td>
              <td className="p-2 flex space-x-2">
                <button className="text-blue-500" onClick={() => router.push(`/editTask?id=${task.id}`)}>Modifier</button>
                <button className="text-red-500" onClick={() => deleteTask(task.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}