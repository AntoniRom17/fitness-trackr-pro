import { useEffect, useState } from "react";
import { addSetToRoutine } from "../api/routines";
import { fetchActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function AddSetForm({ routineId, onSetAdded }) {
  const { token } = useAuth();

  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [error, setError] = useState("");

  async function loadActivities() {
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch (err) {
      setError("Failed to load activities");
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await addSetToRoutine(token, routineId, {
        activityId: Number(activityId),
        count: Number(count),
      });

      setActivityId("");
      setCount("");
      onSetAdded(); // refresh routine details
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3>Add Set</h3>

      {error && <p className="error">{error}</p>}

      <label>
        Activity:
        <select
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          required
        >
          <option value="">-- Select an activity --</option>
          {activities.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Reps:
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Set</button>
    </form>
  );
}
