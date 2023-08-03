import React from "react";

const ModalFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:flex justify-center gap-3 sm:px-6">
      {children}
    </div>
  );
};

ModalFooter.displayName = "Modal.Footer";

export { ModalFooter };
