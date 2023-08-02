import { ChangeEvent } from "react";
import useStore from "../store";
import { ClearIcon, SaveIcon } from "./icons";
import Button from "./Button/Button";

const TaskForm = () => {
  const task = useStore.use.task();
  const idEditingTask = useStore.use.idEditingTask();
  const setTaskProp = useStore.use.setTaskProp();
  const createTask = useStore.use.createTask();
  const updateTask = useStore.use.updateTask();
  const clearTaskData = useStore.use.clearTaskData();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTaskProp(event.target.name, event.target.value);

  const handleSubmit = () => {
    if (idEditingTask === "") {
      void createTask();
    } else {
      void updateTask();
    }
  };

  return (
    <div className="relative">
      <div className="overflow-hidden bg-slate-200 rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          className="block w-full border-0 pt-2.5 text-lg bg-slate-200 font-medium placeholder:text-gray-400 focus:ring-0"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={3}
          name="description"
          className="block w-full resize-none border-0 py-0 bg-slate-200 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Write a description..."
          value={task.description}
          onChange={handleChange}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex"></div>
          <div className="flex-shrink-0">
            <Button onClick={clearTaskData}>
              <ClearIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
              <span>Clear</span>
            </Button>
            <Button onClick={handleSubmit} variant="success" className="ml-3">
              <SaveIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>{idEditingTask === "" ? "Create" : "Save"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
