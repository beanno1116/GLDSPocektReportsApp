import { useEffect } from "react";

const useClickOutside = (ref,handler) => {  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler && handler(e);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref,handler]);
}

export default useClickOutside;