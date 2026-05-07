const API = import.meta.env.VITE_API;
const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function fetchActivities() {
  const response = await fetch(`${BASE_URL}/activities`);
  if (!response.ok) throw new Error("Failed to fetch activities");
  return response.json();
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Requests the API to delete the activity with the given ID.
 * A valid token is required.
 */
export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  const response = await fetch(API + "/activities/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/** Fetches a single activity by ID */
export async function getActivityById(id) {
  const response = await fetch(`${API}/activities/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message);
  }

  return result;
}

