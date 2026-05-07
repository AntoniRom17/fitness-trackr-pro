const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

// ----------------------
// GET all routines
// ----------------------
export async function fetchRoutines() {
  const response = await fetch(`${BASE_URL}/routines`);
  if (!response.ok) throw new Error("Failed to fetch routines");
  return response.json();
}

// ----------------------
// GET single routine by ID
// ----------------------
export async function fetchRoutineById(id) {
  const response = await fetch(`${BASE_URL}/routines/${id}`);
  if (!response.ok) throw new Error("Failed to fetch routine");
  return response.json();
}

// ----------------------
// CREATE routine (requires token)
// ----------------------
export async function createRoutine(token, { name, goal }) {
  const response = await fetch(`${BASE_URL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, goal }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to create routine");
  return result;
}

// ----------------------
// DELETE routine (requires token)
// ----------------------
export async function deleteRoutine(token, routineId) {
  const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to delete routine");
  return result;
}

// ----------------------
// ADD set to routine (requires token)
// ----------------------
export async function addSetToRoutine(token, routineId, { activityId, count }) {
  const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ activityId, count }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to add set");
  return result;
}

// ----------------------
// DELETE set from routine (requires token)
// ----------------------
export async function deleteSet(token, routineActivityId) {
  const response = await fetch(
    `${BASE_URL}/routine_activities/${routineActivityId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Failed to delete set");
  return result;
}
