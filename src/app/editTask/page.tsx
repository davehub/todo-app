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
        alert("Tâche mise à jour avec succès");
        router.push("/tasks");
      }
    };
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Modifier la tâche</h1>
        <input className="border p-2 mb-2 w-full" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="border p-2 mb-2 w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateTask}>Modifier</button>
      </div>
    );
  }