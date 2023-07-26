import { RadioGroup } from "@headlessui/react";
import { useEffect, useState } from "react";
import { TrashIcon } from "./icons";
import { FILTER_OPTIONS, type TFilterOption } from "../types";

export default function Example() {
  const [selectedFilter, setSelectedFilter] = useState<TFilterOption>(
    FILTER_OPTIONS.ALL
  );

  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="w-full mt-3 flex justify-between">
      <RadioGroup value={selectedFilter} onChange={setSelectedFilter}>
        <span className="isolate inline-flex rounded-md shadow-sm">
          {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
            <RadioGroup.Option
              key={key}
              value={value}
              className={({ checked }) =>
                `relative inline-flex cursor-pointer items-center first:rounded-l-md last:rounded-r-md px-3 py-2 pe-8 text-sm font-semibold ring-1 ring-inset focus:z-10 ${
                  checked
                    ? "bg-green-600 hover:bg-green-700 ring-green-800"
                    : "bg-white hover:bg-gray-100 ring-gray-300"
                }`
              }
            >
              {({ checked }) => (
                <RadioGroup.Label
                  as="p"
                  className={`${checked ? "text-white" : "text-gray-900"}`}
                >
                  {value}
                  <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs z-10 font-bold text-white bg-slate-700 border-2 border-white rounded-full -top-2 right-1 dark:border-gray-900">
                    55
                  </span>
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
          ))}
        </span>
      </RadioGroup>

      <button
        type="submit"
        className="relative inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        // onClick={onAccept}
      >
        <TrashIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
          aria-hidden="true"
        />
        <span>Delete all completed</span>
      </button>
    </div>
  );
}
