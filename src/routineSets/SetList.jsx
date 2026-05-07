import SetItem from "./SetItem";

export default function SetList({ sets, onDeleteSet, canDelete }) {
  return (
    <div className="set-list">
      {sets.map((set) => (
        <SetItem
          key={set.routineActivityId}
          set={set}
          onDeleteSet={onDeleteSet}
          canDelete={canDelete}
        />
      ))}
    </div>
  );
}
