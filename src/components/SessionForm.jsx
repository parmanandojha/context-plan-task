import { useForm } from "react-hook-form";
import { useSessionContext } from "../context/SessionContext.jsx";

const subjects = ["DSA", "Web Dev", "DBMS", "OS", "Other"];
const priorities = ["Low", "Medium", "High"];

export default function SessionForm({ onClose }) {
  const { addSession } = useSessionContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      topicName: "",
      subject: "DSA",
      duration: 10,
      priority: "Medium",
      date: "",
    },
  });

  const onSubmit = (data) => {
    addSession({
      topicName: data.topicName.trim(),
      subject: data.subject,
      duration: Number(data.duration),
      priority: data.priority,
      date: data.date,
    });
    reset();
    onClose?.();
  };

  return (
    <form
      id="add-session"
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm scroll-mt-24"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800">Add study session</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Topic name
          </label>
          <input
            type="text"
            {...register("topicName", { required: "Topic name is required" })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-slate-400 focus:ring-2"
            placeholder="e.g. Binary trees"
          />
          {errors.topicName && (
            <p className="mt-1 text-sm text-red-600">{errors.topicName.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
          <select
            {...register("subject")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: { value: 10, message: "Minimum 10 minutes" },
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
          <select
            {...register("priority")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:ring-2 focus:ring-slate-400"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:w-auto"
      >
        Add session
      </button>
    </form>
  );
}
