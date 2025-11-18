import { useEffect, useRef } from "react";


const useEventListener = (event,handler,element=window) => {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  },[handler])

  useEffect(() => {
    const listener = (e) => {
      if (savedHandler.current){
        savedHandler.current(e);
      }
    }

    element.addEventListener(event,listener);

    return () => {
      element.removeEventListener(event,listener);
    }    
  },[event,element])
}

export default useEventListener;