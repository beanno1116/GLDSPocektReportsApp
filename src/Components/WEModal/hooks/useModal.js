import { useState, useRef, useCallback } from "react";


const useModal = () => {
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [modalState, setModalState] = useState(false);

  const anchorRef = useRef(null);

  const toggleModal = useCallback((next) => {
    if (next) {
      setModalState(next);
      return;
    }
    if (modalState) {
      setModalState(false);
      return;
    }
    setModalState(true);
  },[modalState,setModalState])
  return { modalState, coordinates, toggleModal }
}

export default useModal;