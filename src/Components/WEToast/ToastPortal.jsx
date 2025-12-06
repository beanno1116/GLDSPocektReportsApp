import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { isEmpty } from '../../appUtils';

const createToastPortal = (toastPortalId) => {
  try {
    if (isEmpty(toastPortalId)) throw new Error("Must provide a toastPortalId");
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id',toastPortalId);
    document.body.appendChild(wrapper);
    return wrapper;  
  } catch (error) {
    console.error(`[ToastPortal.jsx][FNC][createToastPortal][ERROR]-${error.message}`);
  }
}


const ToastPortal = ({ children,toastPortalId = "toast_portal" }) => {
  const [portal,setPortal] = useState(null);

  useLayoutEffect(() => {
    let toastPortalWrapper = document.getElementById(toastPortalId);
    let toastPortalCreated = false;
    if (!toastPortalWrapper){
      toastPortalCreated = true;
      toastPortalWrapper = createToastPortal(toastPortalId);
    }
    setPortal(toastPortalWrapper);
    return () => {
      if (toastPortalCreated && toastPortalWrapper.parentNode) {
        toastPortalWrapper.parentNode.removeChild(toastPortalWrapper);
      }
    }
  },[toastPortalId]);

  if (portal === null) return null;

  return createPortal(children,portal);
}

export default ToastPortal;