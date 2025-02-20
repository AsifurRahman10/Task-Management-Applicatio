import { TaskCard } from "../TaskCard/TaskCard";

export default function InProgress() {
  return (
    <div>
      <h3 className="text-[#667085] text-sm font-bold">In Progress</h3>

      {/* cards */}
      <TaskCard />
    </div>
  );
}
