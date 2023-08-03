import React from "react";
import { Dialog } from "@headlessui/react";

const ModalTitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex justify-start gap-3 sm:px-6">
      <Dialog.Title
        as="h3"
        className="text-base font-semibold leading-6 text-gray-900"
      >
        {children}
      </Dialog.Title>
    </div>
  );
};

ModalTitle.displayName = "Modal.Title";

export { ModalTitle };
