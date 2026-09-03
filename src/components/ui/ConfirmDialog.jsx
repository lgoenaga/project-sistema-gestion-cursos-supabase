import { useModalAccessibility } from "../../hooks/useModalAccessibility";

function ConfirmDialog({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Eliminar",
  confirmColor = "red",
}) {
  const modalRef = useModalAccessibility(isOpen, onCancel);

  if (!isOpen) return null;

  const confirmButtonClass =
    confirmColor === "blue"
      ? "px-4 py-2 bg-blue-600 text-white rounded-lg"
      : "px-4 py-2 bg-red-600 text-white rounded-lg";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <p className="text-slate-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg">
            Cancelar
          </button>

          <button onClick={onConfirm} className={confirmButtonClass}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
