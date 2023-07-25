import { StateCreator } from "zustand";
import { TStore } from "./index";

export type TLoading = {
  isLoading: boolean;
  showLoading: () => void;
  dismissLoading: () => void;
};

const LoadingSlice: StateCreator<TStore, [], [], TLoading> = (set) => ({
  isLoading: false,
  showLoading: () =>
    set(() => ({
      isLoading: true,
    })),
  dismissLoading: () =>
    set(() => ({
      isLoading: false,
    })),
});

export default LoadingSlice;
