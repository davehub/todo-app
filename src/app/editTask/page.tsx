"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Task } from "@/interfaces/task";

export default function EditTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const task = tasks.find((t: Task) => t.id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [id]);

  const updateTask = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      const updatedTasks = tasks.map((task: Task) =>
        task.id === id ? { ...task, title, description } : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      alert("✅ Tâche mise à jour avec succès !");
      router.push("/tasks");
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Modifier la tâche</h1>
        <input 
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Titre" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition-all shadow-md"
          onClick={updateTask}
        >
          ✅ Modifier la tâche
        </button>
      </div>
    </div>
  );
}