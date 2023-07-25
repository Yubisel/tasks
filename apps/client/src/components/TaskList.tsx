import { useEffect } from "react";
import TaskItem from "./TaskItem";
import useStore from "../store";

const TaskList = () => {
  const tasks = useStore.use.tasks();
  const getAllTasks = useStore.use.getAllTasks();

  useEffect(() => {
    void getAllTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-hidden bg-white mt-3 sm:rounded-lg sm:shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task}  />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
