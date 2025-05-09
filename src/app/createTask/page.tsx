"use client";
import React, {  useState } from "react";
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
    alert("Tâche créée avec succès");
    router.push("/tasks");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Créer une nouvelle tâche</h1>
      <input className="border p-2 mb-2 w-full" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2 mb-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={createTask}>Créer</button>
    </div>
  );
}