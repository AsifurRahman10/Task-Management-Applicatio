import { TaskCard } from "../TaskCard/TaskCard";

export default function TodoSection({ todo }) {
  return (
    <div className="">
      <h3 className="text-[#667085] text-sm font-bold mb-5">TO DO</h3>

      {/* cards */}
      <div className="space-y-6">
        {todo.length > 0 &&
          todo?.map((item) => <TaskCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
