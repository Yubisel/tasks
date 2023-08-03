import { Transition } from "@headlessui/react";
import useStore from "$store";
import { LoadingIcon } from "$ui";

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
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg-gray-500 bg-opacity-40">
          <LoadingIcon className="text-white w-8 h-8" />
        </div>
      </div>
    </Transition>
  );
};

export default Loading;
