import { create } from "zustand";
import { StoreApi, UseBoundStore } from "zustand";
import NotificationSlice, { type TMessage } from "./NotificationSlice";
import LoadingSlice, { type TLoading } from "./LoadingSlice";
import TaskSlice, { type TTask } from "./TaskSlice";
import FilterSlice, { type TFilter } from "./FilterSlice";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export type TStore = TMessage & TLoading & TTask & TFilter;

const useStoreBase = create<TStore>((...args) => ({
  ...NotificationSlice(...args),
  ...LoadingSlice(...args),
  ...TaskSlice(...args),
  ...FilterSlice(...args),
}));

const useStorea = createSelectors(useStoreBase);
export default useStorea;
