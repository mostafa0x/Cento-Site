"use client";

interface ModalToastProps {
  message: string | null;
  onClose: () => void;
}

export default function ModalToast({ message, onClose }: ModalToastProps) {
  if (!message) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white text-black p-6 rounded-[24px] max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-serif text-sm">
          cento
        </div>
        <p className="font-semibold text-base text-neutral-800 leading-relaxed">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 px-6 py-2 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 active:scale-95 transition-all cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
