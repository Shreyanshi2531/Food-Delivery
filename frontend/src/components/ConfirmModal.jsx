import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <div
  onClick={(e) => e.stopPropagation()}
  className="
  bg-white
  rounded-3xl
  shadow-[0_25px_60px_rgba(0,0,0,0.18)]
  w-full
  max-w-md
  p-7
  animate-[popup_.25s_ease]
  "
>
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-3 rounded-full">
            <FiAlertTriangle className="text-red-500" size={24} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        </div>

        <p className="text-gray-500 mt-3 leading-relaxed">{message}</p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="
px-5
py-2.5
rounded-xl
bg-gray-100
hover:bg-gray-200
font-medium
transition-all
duration-200
"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="
px-5
py-2.5
rounded-xl
bg-red-500
hover:bg-red-600
text-white
font-medium
shadow-lg
hover:scale-105
active:scale-95
transition-all
duration-200
"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
