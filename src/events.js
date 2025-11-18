const defaultEventOptions = {
  bubbles: true,
  cancelable: false,
  composed: false
}


function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}
  
function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}
  
function publish(eventName, data={}) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

function createSyntheticEvent(eventName,options={},data=undefined){
  const eventOptions = {...defaultEventOptions,...options};
  const evt = new Event(eventName,eventOptions);
  let isDefaultPrevented = false;
  let isPropagationStopped = false;

  const preventDefault = () => {
    isDefaultPrevented = true;
    evt.preventDefault();
  }
  const stopPropagation = () => {
    isPropagationStopped = true;
    evt.stopPropagation();
  }

  return {
    nativeEvent: evt,
  }
}
  
export { publish, subscribe, unsubscribe};