import { TaskCard } from "../TaskCard/TaskCard";

export default function TodoSection({ todoTasks, refetch }) {
  return (
    <div className="">
      <h3 className="text-[#667085] text-sm font-bold mb-5">TO DO</h3>

      {/* cards */}
      <div className="space-y-6">
        {todoTasks.length > 0 &&
          todoTasks?.map((item) => (
            <TaskCard refetch={refetch} key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}
