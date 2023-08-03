import { StateCreator } from "zustand";
import { TStore } from "./index";
import { NOTIFICATION_TYPE, type TNotificationType } from "$types";

export type TMessage = {
  message: string;
  type: TNotificationType;
  showMessage: (message: string, type: TNotificationType) => void;
  clearMessage: () => void;
  handleErrorMessages: (messages: string | string[]) => void;
};

const NotificationSlice: StateCreator<TStore, [], [], TMessage> = (
  set,
  get
) => ({
  message: "",
  type: NOTIFICATION_TYPE.SUCCESS,
  showMessage: (message: string, type: TNotificationType) =>
    set(() => ({
      message,
      type,
    })),
  clearMessage: () =>
    set(() => ({
      message: "",
      type: NOTIFICATION_TYPE.SUCCESS,
    })),
  handleErrorMessages: (messages: string | string[]) => {
    if (typeof messages === "string") {
      get().showMessage(messages, NOTIFICATION_TYPE.ERROR);
    } else {
      for (const message of messages)
        get().showMessage(message, NOTIFICATION_TYPE.ERROR);
    }
  },
});

export default NotificationSlice;
