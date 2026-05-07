import RoutineCard from "./RoutineCard";

export default function RoutineList({ routines }) {
  if (!routines.length) {
    return <p>No routines found.</p>;
  }

  return (
    <div className="routine-list">
      {routines.map((routine) => (
        <RoutineCard key={routine.id} routine={routine} />
      ))}
    </div>
  );
}
