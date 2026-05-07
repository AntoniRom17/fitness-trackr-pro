import { useEffect, useState } from "react";
import { fetchRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

import RoutineList from "./RoutineList";
import CreateRoutineForm from "./CreateRoutineForm";

export default function RoutinesPage() {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState("");

  async function loadRoutines() {
    try {
      setError("");
      const data = await fetchRoutines();
      setRoutines(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  return (
    <div className="page">
      <h1>Routines</h1>

      {error && <p className="error">{error}</p>}

      {token && (
        <CreateRoutineForm
          onRoutineCreated={loadRoutines}
        />
      )}

      <RoutineList routines={routines} />
    </div>
  );
}
