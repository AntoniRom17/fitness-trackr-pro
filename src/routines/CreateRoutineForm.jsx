import { useState } from "react";
import { createRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";

export default function CreateRoutineForm({ onRoutineCreated }) {
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await createRoutine(token, { name, goal });
      setName("");
      setGoal("");
      onRoutineCreated(); // refresh routines list
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Create Routine</h2>

      {error && <p className="error">{error}</p>}

      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Goal:
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
      </label>

      <button type="submit">Create Routine</button>
    </form>
  );
}
