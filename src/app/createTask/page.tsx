"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const createTask = () => {
    const storedTasks = localStorage.getItem("tasks");
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];
   
    localStorage.setItem("tasks", JSON.stringify([...tasks]));
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
       
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition-all shadow-md"
          onClick={createTask}
        >
          ✅ Créer la tâche
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded mt-4" onClick={() => router.push("/tasks")}>Retour aux tâches</button>
      </div>
    </div>
  );
}