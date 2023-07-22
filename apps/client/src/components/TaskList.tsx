import TaskItem from "./TaskItem";
import { useTasks } from "../context/useTasks";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className="overflow-hidden bg-white mt-3 sm:rounded-lg sm:shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
