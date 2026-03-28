import { useSessionContext } from "../context/SessionContext.jsx";
import SessionCard from "./SessionCard.jsx";

export default function SessionList() {
  const { sessions, totalDurationMinutes } = useSessionContext();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Your sessions</h2>
        {sessions.length > 0 && (
          <p className="text-sm text-slate-600">
            Total study time:{" "}
            <span className="font-semibold text-slate-900">
              {totalDurationMinutes} min
            </span>
          </p>
        )}
      </div>
      {sessions.length === 0 ? (
        <p className="rounded-lg bg-slate-50 py-8 text-center text-slate-500">
          No sessions yet. Add one using the form.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {sessions.map((session) => (
            <li key={session.id}>
              <SessionCard session={session} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
