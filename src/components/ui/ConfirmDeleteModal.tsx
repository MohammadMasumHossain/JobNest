import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Confirm Delete
            </Dialog.Title>
            <button className="cursor-pointer" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <Dialog.Description className="mb-4">
            Are you sure you want to delete this user? This action is
            irreversible.
          </Dialog.Description>

          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 cursor-pointer text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 cursor-pointer text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Yes, Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDeleteModal;
