import { useEffect, useState } from "react";
import SessionForm from "./components/SessionForm.jsx";
import SessionList from "./components/SessionList.jsx";

export default function App() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!showForm) return;
    document.getElementById("add-session")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [showForm]);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Study Session Planner
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="shrink-0 self-end rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:self-auto"
          >
            Add session
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        {showForm && <SessionForm onClose={() => setShowForm(false)} />}
        <SessionList />
      </main>
    </div>
  );
}
