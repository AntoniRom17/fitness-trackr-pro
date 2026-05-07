import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getActivityById, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  const loadActivity = async () => {
    try {
      const data = await getActivityById(id);
      setActivity(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    loadActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);
    try {
      await deleteActivity(token, id);
      navigate("/"); // redirect back to activities list
    } catch (e) {
      setError(e.message);
    }
  };

  if (error) return <p role="alert">{error}</p>;
  if (!activity) return <p>Loading...</p>;

  return (
    <>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <p>
        <strong>Created by:</strong> {activity.creatorName}
      </p>

      {token && (
        <button onClick={tryDelete}>
          Delete Activity
        </button>
      )}
    </>
  );
}
