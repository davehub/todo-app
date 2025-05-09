"use client";
import Link from "next/link";


export default function HomePage() {
  return (
    <>
    <main>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur Mon Todo App</h1>
            <p className="text-lg mb-8">Gerer vos taches de maniere optimal et simple .</p>
            <div className="space-x-4">
            <Link href="/tasks" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Voir mes Taches</Link>
            </div>
        </div>

    </main>
    
    </>
  );
}