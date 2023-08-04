import React from "react";
import TaskItem from "./TaskItem";
import useStore from "../store";
import { FILTER_OPTIONS } from "../types";

const TaskList = () => {
  const tasks = useStore.use.tasks();
  const selectedFilter = useStore.use.selectedFilter();
  const getAllTasks = useStore.use.getAllTasks();

  React.useEffect(() => {
    void getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ToDo: Message when there is no task in the list
  return (
    <div className="overflow-hidden bg-white mt-3 sm:rounded-lg sm:shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => {
          if (selectedFilter === FILTER_OPTIONS.COMPLETED)
            return task.done && <TaskItem key={task._id} task={task} />;
          if (selectedFilter === FILTER_OPTIONS.PENDING)
            return !task.done && <TaskItem key={task._id} task={task} />;
          return <TaskItem key={task._id} task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
