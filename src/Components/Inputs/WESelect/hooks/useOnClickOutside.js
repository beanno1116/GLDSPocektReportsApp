import { useEffect } from "react";

const useOnClickOutside = (_ref, _handler) => {

  useEffect(() => {
    const eventhandler = (e) => {
      if (!_ref.current || _ref.current.contains(e.target)) return;
      // _handler(e);
    }
    document.addEventListener("mousedown", eventhandler);
    document.addEventListener("touchstart", eventhandler);
    return () => {
      document.removeEventListener("mousedown", eventhandler);
      document.removeEventListener("touchstart", eventhandler);
    }
  }, [_ref, _handler]);
}

export default useOnClickOutside;