import { TaskCard } from "../TaskCard/TaskCard";

export default function InProgress({ inProgressTasks, refetch }) {
  return (
    <div>
      <h3 className="text-[#667085] text-sm font-bold mb-5">In Progress</h3>

      {/* cards */}

      <div className="space-y-6">
        {inProgressTasks.length > 0 &&
          inProgressTasks?.map((item) => (
            <TaskCard refetch={refetch} key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}
