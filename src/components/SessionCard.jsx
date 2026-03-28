import { useSessionContext } from "../context/SessionContext.jsx";

const priorityStyles = {
  High: "bg-red-100 text-red-800 ring-red-200",
  Medium: "bg-orange-100 text-orange-800 ring-orange-200",
  Low: "bg-green-100 text-green-800 ring-green-200",
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function SessionCard({ session }) {
  const { deleteSession } = useSessionContext();
  const badgeClass = priorityStyles[session.priority] ?? priorityStyles.Medium;

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{session.topicName}</h3>
        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeClass}`}
        >
          {session.priority}
        </span>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <dt className="text-slate-500">Subject</dt>
        <dd className="font-medium text-slate-800">{session.subject}</dd>
        <dt className="text-slate-500">Duration</dt>
        <dd className="font-medium text-slate-800">{session.duration} min</dd>
        <dt className="text-slate-500">Date</dt>
        <dd className="font-medium text-slate-800">{formatDate(session.date)}</dd>
      </dl>
      <button
        type="button"
        onClick={() => deleteSession(session.id)}
        className="mt-1 w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
      >
        Delete
      </button>
    </article>
  );
}
