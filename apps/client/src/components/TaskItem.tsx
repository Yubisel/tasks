import { FC, useState } from "react";
import Modal from "./Modal";
import useStore from "../store";
import { ITask } from "../interfaces/task.interface";
import { DetailsIcon, EditIcon, TrashIcon } from "./icons";
import { Transition } from "@headlessui/react";

interface IProps {
  task: ITask;
}

const TaskItem: FC<IProps> = ({ task: { _id, title, description } }) => {
  const [isShowingDescription, setIsShowingDescription] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const setEditingTask = useStore.use.setEditingTask();
  const deleteTask = useStore.use.deleteTask();

  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="p-3 sm:px-6">
          <div className="flex items-center justify-between">
            <a
              className="text-sm font-medium text-gray-900 cursor-pointer"
              onClick={() => setIsShowingDescription((isShowingDescription) => !isShowingDescription)}
            >
              {title}
            </a>
            <div className="ml-2 flex flex-shrink-0">
              <button
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                onClick={() => setEditingTask(_id, { title, description })}
              >
                <EditIcon
                  className="-ml-0.5 h-5 w-5 text-green-800"
                  aria-hidden="true"
                />
              </button>
              <button
                className="relative ml-3 inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                onClick={() => void setIsOpenDeleteModal(true)}
              >
                <TrashIcon
                  className="-ml-0.5 h-5 w-5 text-red-800"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
          <Transition
            show={isShowingDescription}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
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
          </Transition>
        </div>
      </div>
      <Modal
        isOpen={isOpenDeleteModal}
        onAccept={() => void deleteTask(_id)}
        onCancel={() => void setIsOpenDeleteModal(false)}
        taskTitle={title}
      />
    </li>
  );
};

export default TaskItem;
