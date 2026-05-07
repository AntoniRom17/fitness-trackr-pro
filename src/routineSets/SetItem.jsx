export default function SetItem({ set, onDeleteSet, canDelete }) {
  return (
    <div className="set-item">
      <p>
        <strong>{set.name}</strong> — {set.count} reps
      </p>

      {canDelete && (
        <button
          className="danger"
          onClick={() => onDeleteSet(set.routineActivityId)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
