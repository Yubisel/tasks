import React from "react";
import { Transition } from "@headlessui/react";
import ModalConfirmDelete from "./ModalConfirmDelete";
import useStore from "$store";
import { type ITask } from "$types";
import { ChevronDownIcon, DetailsIcon, EditIcon, TrashIcon } from "$ui";

interface IProps {
  task: ITask;
}

const TaskItem: React.FC<IProps> = ({ task: { _id, title, description, done } }) => {
  const [isShowingDescription, setIsShowingDescription] =
    React.useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState<boolean>(false);
  const setEditingTask = useStore.use.setEditingTask();
  const deleteTask = useStore.use.deleteTask();
  const updateTaskStatus = useStore.use.updateTaskStatus();

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    void updateTaskStatus(_id, { done: event.target.checked });
  };

  const showDescription = description && !done;

  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="p-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="relative flex items-center">
              {description && !done && (
                <ChevronDownIcon
                  className={`absolute -ml-5 transition-all ${
                    isShowingDescription ? "" : "-rotate-90"
                  }`}
                />
              )}
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 mr-3 rounded border-gray-300 text-green-600 focus:ring-green-600"
                checked={done}
                onChange={handleCheck}
              />
              <a
                className={`text-sm mr-auto font-medium text-gray-900 ${
                  done ? "opacity-40 line-through" : ""
                } ${showDescription ? "cursor-pointer" : ""}`}
                onClick={() =>
                  showDescription &&
                  setIsShowingDescription(
                    (isShowingDescription) => !isShowingDescription
                  )
                }
              >
                {title}
              </a>
            </div>
            <div className="ml-2 flex flex-shrink-0">
              {!done && (
                <button
                  className="relative ml-3 inline-flex items-center rounded-md bg-white px-2 py-1 text-sm font-semibold shadow hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  onClick={() =>
                    setEditingTask(_id, { title, description, done })
                  }
                >
                  <EditIcon
                    className="-ml-0.5 h-5 w-5 text-green-800"
                    aria-hidden="true"
                  />
                </button>
              )}
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
          {showDescription && (
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
          )}
        </div>
      </div>
      <ModalConfirmDelete
        isOpen={isOpenDeleteModal}
        onAccept={() => void deleteTask(_id)}
        onCancel={() => void setIsOpenDeleteModal(false)}
        taskTitle={title}
      />
    </li>
  );
};

export default TaskItem;
