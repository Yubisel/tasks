import { Modal, Button, CancelIcon, TrashIcon } from "$ui";

interface IProps {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
  taskTitle: string;
}

const ModalConfirmDelete: React.FC<IProps> = ({
  isOpen,
  onAccept,
  onCancel,
  taskTitle,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Modal.Title>Delete task?</Modal.Title>
      <Modal.Body>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete the task <b>"{taskTitle}"</b>? This action cannot be undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel}>
          <CancelIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-900"
            aria-hidden="true"
          />
          <span>Cancel</span>
        </Button>
        <Button onClick={onAccept} variant="danger">
          <TrashIcon
            className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
            aria-hidden="true"
          />
          <span>Delete</span>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmDelete;
