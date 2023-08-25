import { useEffect } from "react";

export function usePopupsClose(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const handleOverlay = (event) => {
      if (event.target.classList.contains("popup_opened")) {
        onClose();
      }
    };

    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleOverlay);
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);
}
