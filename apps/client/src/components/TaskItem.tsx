import React from "react";
import { Transition } from "@headlessui/react";
import useStore from "$store";
import { type ITask } from "$types";
import { Button, ChevronDownIcon, DetailsIcon, EditIcon, TrashIcon } from "$ui";

interface IProps {
  task: ITask;
  onDelete: () => void;
}

const TaskItem: React.FC<IProps> = ({
  task: { _id, title, description, done },
  onDelete,
}) => {
  const [isShowingDescription, setIsShowingDescription] =
    React.useState<boolean>(false);
  const setEditingTask = useStore.use.setEditingTask();
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
                <Button
                  size="small"
                  onClick={() =>
                    setEditingTask(_id, { title, description, done })
                  }
                >
                  <EditIcon
                    className="-ml-0.5 h-5 w-5 text-blue-600"
                    aria-hidden="true"
                  />
                </Button>
              )}
              <Button size="small" onClick={onDelete} className="ml-2">
                <TrashIcon
                  className="-ml-0.5 h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
              </Button>
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
    </li>
  );
};

export default TaskItem;
