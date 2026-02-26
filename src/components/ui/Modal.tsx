import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
};

const Modal = ({ open, onOpenChange, title, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 max-w-lg w-full bg-white rounded-xl shadow-xl p-6 sm:p-8 -translate-x-1/2 -translate-y-1/2">
        <button
          className="absolute cursor-pointer top-8 right-8  hover:text-gray-600"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </button>

        {title && (
          <Dialog.Title className="text-2xl font-bold text-center mb-4">
            {title}
          </Dialog.Title>
        )}

        <div>{children}</div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
