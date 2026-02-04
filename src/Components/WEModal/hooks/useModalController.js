import { useEffect } from "react";

const useModalController = () => {
  useEffect(() => {
    const closeOnEscKey = e => e.key === "Escape" ? toggle() : null;
    document.addEventListener("keydown", closeOnEscKey);
    return () => {
      document.removeEventListener("keydown", closeOnEscKey);
    }
  }, [toggle]);
}

export default useModalController;