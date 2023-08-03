import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import useStore from "$store";
import { FILTER_OPTIONS, TFilterOption } from "$types";

type TFilterValues = {
  [key in TFilterOption]: number;
};

const defaultFilterCountValues = {
  [FILTER_OPTIONS.ALL]: 0,
  [FILTER_OPTIONS.COMPLETED]: 0,
  [FILTER_OPTIONS.PENDING]: 0,
};

const Filter = () => {
  const tasks = useStore.use.tasks();
  const selectedFilter = useStore.use.selectedFilter();
  const setSelectedFilter = useStore.use.setSelectedFilter();

  const [s, setS] = useState<TFilterValues>({ ...defaultFilterCountValues });

  useEffect(() => {
    const tmpFilterCount = { ...defaultFilterCountValues };
    tasks.forEach((task) => {
      tmpFilterCount[FILTER_OPTIONS.ALL]++;
      task.done
        ? tmpFilterCount[FILTER_OPTIONS.COMPLETED]++
        : tmpFilterCount[FILTER_OPTIONS.PENDING]++;
    });
    setS({ ...tmpFilterCount });
  }, [tasks]);

  return (
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
                    {s[value]}
                  </span>
                </RadioGroup.Label>
              )}
            </RadioGroup.Option>
          ))}
        </span>
      </RadioGroup>
  );
};

export default Filter;
