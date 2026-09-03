function ConfirmDialog({
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">

        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        <p className="text-slate-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4
              py-2
              bg-red-600
              text-white
              rounded-lg
            "
          >
            Eliminar
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmDialog;