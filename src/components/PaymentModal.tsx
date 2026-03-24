import { useState } from "react";
import type { PaymentMethod } from "../types/car";
import waveLogo from "../assets/wave.jpg";
import orangeLogo from "../assets/om.png";

type PaymentModalProps = {
  isOpen: boolean;
  amount: number;
  selectedMethod: PaymentMethod;
  onChangeMethod: (method: PaymentMethod) => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function PaymentModal({
  isOpen,
  amount,
  selectedMethod,
  onChangeMethod,
  onConfirm,
  onClose,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60">
      <div className="flex min-h-screen items-end justify-center p-0 sm:items-center sm:p-4">
        <div className="flex h-[92vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-xl sm:rounded-2xl">
          <div className="flex flex-col gap-3 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
                Paiement sécurisé
              </h2>
              <p className="text-sm text-gray-500">
                Simulation de paiement Wave ou Orange Money
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-600 sm:w-auto sm:py-1"
            >
              Fermer
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
            <div className="rounded-2xl bg-gray-100 p-5 text-center">
              <p className="text-sm text-gray-500">Montant à payer</p>
              <p className="mt-1 text-2xl font-extrabold text-orange-600 sm:text-3xl">
                {amount.toLocaleString()} FCFA
              </p>
            </div>

            <div>
              <p className="mb-3 text-base font-semibold text-gray-800">
                Choisissez votre moyen de paiement
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onChangeMethod("wave")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedMethod === "wave"
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <img
                      src={waveLogo}
                      alt="Wave"
                      className="h-12 w-12 object-contain"
                    />

                    <span className="text-xl">
                      {selectedMethod === "wave" ? "✅" : "💳"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-blue-700">Wave</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Paiement mobile rapide, simple et moderne.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeMethod("orange-money")}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedMethod === "orange-money"
                      ? "border-orange-500 bg-orange-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-orange-300 hover:shadow-sm"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <img
                      src={orangeLogo}
                      alt="Orange Money"
                      className="h-12 w-12 object-contain"
                    />

                    <span className="text-xl">
                      {selectedMethod === "orange-money" ? "✅" : "📱"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-orange-600">
                    Orange Money
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Paiement sécurisé via portefeuille mobile.
                  </p>
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Ce paiement est une simulation pour démonstration de projet.
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-sm text-gray-500">Mode sélectionné</p>
              <p className="mt-1 font-semibold text-gray-800">
                {selectedMethod === "wave" ? "Wave" : "Orange Money"}
              </p>
            </div>

            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {isProcessing ? "Traitement du paiement..." : "Payer maintenant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}