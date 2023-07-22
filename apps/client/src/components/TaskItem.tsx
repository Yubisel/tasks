import { FC } from "react";
import { ITask } from "../interfaces/task.interface";
import { DetailsIcon, EditIcon, TrashIcon } from "./icons";
import { useTasks } from "../context/useTasks";

interface IProps {
  task: ITask;
}

const TaskItem: FC<IProps> = ({ task: { _id, title, description } }) => {
  const { deleteTask, updateTask } = useTasks();

  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="p-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-900">{title}</div>
            <div className="ml-2 flex flex-shrink-0">
              {/* <button className="relative ml-3 inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
                <EditIcon
                  className="-ml-0.5 h-5 w-5 text-green-800"
                  aria-hidden="true"
                />
              </button> */}
              <button
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                // TODO: ask before delete (modal)
                onClick={() => void deleteTask(_id)}
              >
                <TrashIcon
                  className="-ml-0.5 h-5 w-5 text-red-800"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <DetailsIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                aria-hidden="true"
              />
              {description}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
