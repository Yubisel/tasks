import { StateCreator } from "zustand";
import { TStore } from "./index";
import { type TFilterOption, FILTER_OPTIONS } from "$types";

export type TFilter = {
  selectedFilter: TFilterOption;
  setSelectedFilter: (selected: TFilterOption) => void;
};

const FilterSlice: StateCreator<TStore, [], [], TFilter> = (set) => ({
  selectedFilter: FILTER_OPTIONS.ALL,
  setSelectedFilter: (selected: TFilterOption) =>
    set(() => ({
      selectedFilter: selected,
    })),
});

export default FilterSlice;
