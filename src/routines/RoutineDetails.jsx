import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchRoutineById,
  deleteRoutine,
  deleteSet,
} from "../api/routines";
import { useAuth } from "../auth/AuthContext";

import SetList from "../routineSets/SetList";
import AddSetForm from "../routineSets/AddSetForm";

export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState("");

  async function loadRoutine() {
    try {
      setError("");
      const data = await fetchRoutineById(id);
      setRoutine(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadRoutine();
  }, [id]);

  async function handleDeleteRoutine() {
    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteSet(routineActivityId) {
    try {
      await deleteSet(token, routineActivityId);
      loadRoutine(); // refresh sets
    } catch (err) {
      setError(err.message);
    }
  }

  if (!routine) return <p>Loading...</p>;

  const isCreator = user && user.username === routine.creatorName;

  return (
    <div className="page">
      <h1>{routine.name}</h1>
      <p><strong>Goal:</strong> {routine.goal}</p>
      <p><strong>Creator:</strong> {routine.creatorName}</p>

      {error && <p className="error">{error}</p>}

      {token && isCreator && (
        <button onClick={handleDeleteRoutine} className="danger">
          Delete Routine
        </button>
      )}

      <h2>Sets</h2>

      {routine.activities?.length ? (
        <SetList
          sets={routine.activities}
          onDeleteSet={handleDeleteSet}
          canDelete={isCreator}
        />
      ) : (
        <p>No sets yet — add one below!</p>
      )}

      {token && (
        <AddSetForm
          routineId={id}
          onSetAdded={loadRoutine}
        />
      )}
    </div>
  );
}
