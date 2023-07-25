import { StateCreator } from "zustand";
import { TStore } from "./index";

export enum NOTIFICATION_TYPE {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  DEFAULT = "default",
}

export type TMessage = {
  message: string;
  type: NOTIFICATION_TYPE;
  showMessage: (message: string, type: NOTIFICATION_TYPE) => void;
  clearMessage: () => void;
};

const NotificationSlice: StateCreator<TStore, [], [], TMessage> = (set) => ({
  message: "",
  type: NOTIFICATION_TYPE.SUCCESS,
  showMessage: (message: string, type: NOTIFICATION_TYPE) =>
    set(() => ({
      message,
      type,
    })),
  clearMessage: () =>
    set(() => ({
      message: "",
      type: NOTIFICATION_TYPE.SUCCESS,
    })),
});

export default NotificationSlice;
