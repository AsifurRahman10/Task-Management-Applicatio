import { TaskCard } from "../TaskCard/TaskCard";

export default function TodoSection() {
  return (
    <div>
      <h3 className="text-[#667085] text-sm font-bold">TO DO</h3>

      {/* cards */}
      <TaskCard />
    </div>
  );
}
