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
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="flex min-h-screen items-end justify-center p-0 sm:items-center sm:p-4">
        <div className="flex h-[92vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl">
          <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
            <h2 className="text-base font-bold text-gray-800 sm:text-xl">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Fermer
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}