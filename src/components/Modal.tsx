import { useEffect, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, title, onClose, children }: ModalProps) {
  // Fermer avec Escape + bloquer le scroll du body
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="flex min-h-screen items-end justify-center p-0 sm:items-center sm:p-4">
        <div
          className="flex h-[92vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl transition-all sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6">
            <h2 id="modal-title" className="text-base font-bold text-gray-800 sm:text-xl">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Fermer la fenêtre"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}