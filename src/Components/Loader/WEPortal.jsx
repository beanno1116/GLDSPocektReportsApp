import { createPortal } from "react-dom";
import { useState, useLayoutEffect } from "react";

const createPortalWrapper = (portalWrapperId) => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', portalWrapperId);
  document.body.appendChild(wrapper);
  return wrapper;
}

const WEPortal = ({ children, portalWrapperId = "we_portal_wrapper" }) => {
  const [wrapper, setWrapper] = useState(null);

  useLayoutEffect(() => {
    let portalWrapper = document.getElementById(portalWrapperId);
    let portalCreated = false;
    if (!portalWrapper) {
      portalCreated = true;
      portalWrapper = createPortalWrapper(portalWrapperId);
    }
    setWrapper(portalWrapper);

    return () => {
      if (portalCreated && portalWrapper.parentNode) {
        portalWrapper.parentNode.removeChild(portalWrapper);
      }
    }
  }, [portalWrapperId]);

  if (wrapper === null) return null;

  return createPortal(children, wrapper);
}

export default WEPortal;