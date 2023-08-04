import React, { useState } from "react";
import TaskItem from "./TaskItem";
import useStore from "../store";
import { FILTER_OPTIONS, ITask } from "../types";
import ModalConfirmDelete from "./ModalConfirmDelete";

const TaskList = () => {
  const tasks = useStore.use.tasks();
  const selectedFilter = useStore.use.selectedFilter();
  const getAllTasks = useStore.use.getAllTasks();
  const deleteTask = useStore.use.deleteTask();
  // const [isOpenDeleteModal, setIsOpenDeleteModal] =
  //   React.useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask>({} as ITask);

  React.useEffect(() => {
    void getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDeleteTask = (task: ITask) => {
    setTaskToDelete(task);
  };

  const handleOnAceptDeleteTask = () => {
    void deleteTask(taskToDelete._id);
    setTaskToDelete({} as ITask);
  };

  return tasks.length === 0 ? (
    <div className="block bg-slate-700 mt-3 sm:rounded-lg sm:shadow">
      <div className="p-3 sm:px-6">
        <div className="flex items-center justify-center italic">
          <div className="relative flex items-center">
            <span className={`text-sm font-medium text-white`}>
              {"There is no tasks to show"}
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden bg-white mt-3 sm:rounded-lg sm:shadow">
      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => {
          if (selectedFilter === FILTER_OPTIONS.COMPLETED)
            return (
              task.done && (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={() => handleOnDeleteTask(task)}
                />
              )
            );
          if (selectedFilter === FILTER_OPTIONS.PENDING)
            return (
              !task.done && (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={() => handleOnDeleteTask(task)}
                />
              )
            );
          return (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={() => handleOnDeleteTask(task)}
            />
          );
        })}
      </ul>
      <ModalConfirmDelete
        isOpen={Object.keys(taskToDelete).length !== 0}
        onAccept={() => handleOnAceptDeleteTask()}
        onCancel={() => setTaskToDelete({} as ITask)}
        taskTitle={taskToDelete.title}
      />
    </div>
  );
};

export default TaskList;
