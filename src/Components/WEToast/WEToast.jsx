import { useEffect,useState } from 'react';
import { subscribe,unsubscribe,publish } from '../../events';
import ToastPortal from './ToastPortal';

import styles from './weToastPortal.module.css';
import Toast from './components/Toast';


/**
 * 
 * toast.success(`Customer ${fullName} created!`,{
      position: toast.position.TOP_RIGHT,
      title: "Success"
    })
 */


const toast = {
  position: {
    TOP_LEFT: 'top_left',
    TOP_RIGHT: 'top_right',
    BOTTOM_LEFT: 'bottom_left',
    BOTTOM_RIGHT: 'bottom_right'
  },
  toastTypes: {
    SUCCESS: 'success',
    WARN: 'warning',
    ERROR: 'error'
  },
  success(msg, options) {
    
    console.log('WEToast:toast:success');
    publish('displaytoast', { msg: msg, options: options, type: toast.toastTypes.SUCCESS });
  },
  warning(msg, options) {
    console.log('WEToast:toast:warn');
    publish('displaytoast', { msg: msg, options: options, type: toast.toastTypes.WARN });
  },
  error(msg, options) {
    console.log('WEToast:toast:error');
    publish('displaytoast', { msg: msg, options: options, type: toast.toastTypes.ERROR });
  },
}

const WEToast = () => {
  const [toastList,setToastList] = useState([]);

  useEffect(() => {
    subscribe("displaytoast",displayToast);
    return () => {
      unsubscribe("displaytoast",displayToast);
    }
  })

  const displayToast = (e) => {
    console.log(e);    
    let id = Math.floor((Math.random() * 101) + 1);
    let toastObj = {
      id: id,
      msg: e.detail.msg,
      type: e.detail.type
    }
    toastObj = { ...toastObj, ...e.detail.options };
    setToastList(toasts => [...toasts, { ...toastObj, ...e.detail.options }]);    
    let intv = setInterval(() => {      
      let tmpArr = toastList.filter(x => x.id !== id);
      setToastList([...tmpArr]);
      clearInterval(intv);
    }, 3000)
    console.log('WEToast:displayToast:Event:displaytoast');
  }


  const handleToastClick = (e,id) => {
    setToastList([...toastList.filter(x => x.id !== id)]);
  }

  return (
    <>
      <ToastPortal>
        
        <div className={styles.toast_container}>

          {toastList.length > 0 && toastList.map(toast => {
            return (
              <Toast
                key={toast.id}
                msg={toast.msg}
                title={toast.title}
                type={toast.type}
                position={toast.position}
                onClick={(e)=>handleToastClick(e,toast.id)}
              />
            )
          })}

        </div>

      </ToastPortal>
    </>
  );
}

export { WEToast, toast };