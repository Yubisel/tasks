import React from "react";

const ModalBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-white px-4 pb-6 pt-5 sm:p-6">
      <div className="sm:flex sm:items-start">
        {/* TODO: Implement icon support */}
        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
      <TrashIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
    </div> */}
        <div className="text-center sm:ml-4 sm:mt-0 sm:text-left">
          {children}
        </div>
      </div>
    </div>
  );
};

ModalBody.displayName = "Modal.Body";

export { ModalBody };
