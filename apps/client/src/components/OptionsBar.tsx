import React from "react";
import useStore from "$store";
import Filter from "./Filter";
import { Button, TrashIcon } from "$ui";
import ModalConfirmDeleteAllDoneTasks from "./ModalConfirmDeleteAllDoneTasks";

const OptionsBar = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] =
    React.useState<boolean>(false);
  const tasks = useStore.use.tasks();
  const deleteAllDoneTasks = useStore.use.deleteAllDoneTasks();

  const handleRemoveAllDoneTask = () => {
    void deleteAllDoneTasks();
    setIsOpenDeleteModal(false);
  };

  return (
    <div className="w-full mt-3 flex justify-between">
      <Filter />
      <Button type="submit" variant="danger" onClick={() => setIsOpenDeleteModal(true)}
        disabled={tasks.filter((task) => task.done).length <= 1}>

        <TrashIcon
          className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
          aria-hidden="true"
        />
        <span>Delete all completed</span>
      </Button>
      <ModalConfirmDeleteAllDoneTasks
        isOpen={isOpenDeleteModal}
        onAccept={handleRemoveAllDoneTask}
        onCancel={() => void setIsOpenDeleteModal(false)}
      />
    </div>
  );
};

export default OptionsBar;
