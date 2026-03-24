import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-4 sm:px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 sm:w-auto sm:py-1"
          >
            Fermer
          </button>
        </div>

        <div className="max-h-[85vh] overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}