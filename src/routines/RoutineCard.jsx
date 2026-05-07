import { Link } from "react-router-dom";

export default function RoutineCard({ routine }) {
  return (
    <div className="routine-card">
      <h3>
        <Link to={`/routines/${routine.id}`}>
          {routine.name}
        </Link>
      </h3>

      <p><strong>Goal:</strong> {routine.goal}</p>
      <p><strong>Creator:</strong> {routine.creatorName}</p>
    </div>
  );
}
