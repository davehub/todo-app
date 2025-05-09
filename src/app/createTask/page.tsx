"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const createTask = () => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const newTask = { id: Date.now().toString(), title, description };
    localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
    alert("✅ Tâche créée avec succès !");
    router.push("/tasks");
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Créer une nouvelle tâche</h1>
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
          onClick={createTask}
        >
          ✅ Créer la tâche
        </button>
      </div>
    </div>
  );
}