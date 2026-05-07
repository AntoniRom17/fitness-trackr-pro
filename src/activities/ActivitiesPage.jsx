import { useState, useEffect } from "react";
import { fetchActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);

  const syncActivities = async () => {
    const data = await fetchActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      <ActivityList activities={activities} />
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}

