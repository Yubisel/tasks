import { ChangeEvent, FormEvent, useState } from "react";
import { ClearIcon, SaveIcon } from "./icons";
import { TCreateTask } from "../interfaces/task.interface";
import { useTasks } from "../context/useTasks";

const defaultTaskValues: TCreateTask = {
  title: "",
  description: "",
};

const TaskForm = () => {
  const [task, setTask] = useState<TCreateTask>({ ...defaultTaskValues });
  const { createTask } = useTasks();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setTask({ ...task, [event.target.name]: event.target.value });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void createTask(task);
  };

  const handleClear = () => setTask({ ...defaultTaskValues });

  return (
    <form onSubmit={handleSubmit} className="relative">
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
            {/* <button
                      type="button"
                      className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <EditIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Phone</span>
                    </button>
                    <button
                      type="button"
                      className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <TrashIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Email</span>
                    </button> */}
            <button
              onClick={handleClear}
              className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <ClearIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-900"
                aria-hidden="true"
              />
              <span>Clear</span>
            </button>
            <button
              type="submit"
              className="relative ml-3 inline-flex items-center rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              <SaveIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span>Create</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
