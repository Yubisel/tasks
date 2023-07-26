import Filter from "./Filter";
import { TrashIcon } from "./icons";


const OptionsBar = () => {

  return (
    <div className="w-full mt-3 flex justify-between">
      <Filter />
      {/* <button
        type="submit"
        className="relative inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        // onClick={onAccept}
      >
        <TrashIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
          aria-hidden="true"
        />
        <span>Delete all completed</span>
      </button> */}
    </div>
  );
};

export default OptionsBar;
