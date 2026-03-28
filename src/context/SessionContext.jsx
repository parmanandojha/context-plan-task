import { createContext, useCallback, useContext, useMemo, useState } from "react";

export const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState([]);

  const addSession = useCallback((session) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now());
    setSessions((prev) => [...prev, { ...session, id }]);
  }, []);

  const deleteSession = useCallback((id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const totalDurationMinutes = useMemo(
    () => sessions.reduce((sum, s) => sum + Number(s.duration || 0), 0),
    [sessions]
  );

  const value = useMemo(
    () => ({
      sessions,
      addSession,
      deleteSession,
      totalDurationMinutes,
    }),
    [sessions, addSession, deleteSession, totalDurationMinutes]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSessionContext must be used within SessionProvider");
  }
  return ctx;
}
