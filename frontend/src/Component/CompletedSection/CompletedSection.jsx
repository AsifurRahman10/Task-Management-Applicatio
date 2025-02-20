import { TaskCard } from "../TaskCard/TaskCard";

export default function CompletedSection({ doneTasks, refetch }) {
  console.log(doneTasks);
  return (
    <div>
      <h3 className="text-[#667085] text-sm font-bold mb-5">Completed</h3>

      {/* cards */}
      <div className="space-y-6">
        {doneTasks.length > 0 &&
          doneTasks?.map((item) => (
            <TaskCard refetch={refetch} key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
}
