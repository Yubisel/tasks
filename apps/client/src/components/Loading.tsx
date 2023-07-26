import { Transition } from "@headlessui/react";
import useStore from "../store";
import { LoadingIcon } from "./icons/LoadingIcon";

const Loading = () => {
  const isLoading = useStore.use.isLoading();

  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-250"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="w-full my-3 flex justify-center">
        <LoadingIcon className="text-white w-6 h-6" />
      </div>
    </Transition>
  );
};

export default Loading;
