import { create } from "zustand";
import { StoreApi, UseBoundStore } from "zustand";
import NotificationSlice, { TMessage } from "./NotificationSlice";
import LoadingSlice, { TLoading } from "./LoadingSlice";
import TaskSlice, { TTask } from "./TaskSlice";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export type TStore = TMessage & TLoading & TTask;

const useStoreBase = create<TStore>((...args) => ({
  ...NotificationSlice(...args),
  ...LoadingSlice(...args),
  ...TaskSlice(...args),
}));

const useStore = createSelectors(useStoreBase);
export default useStore;
