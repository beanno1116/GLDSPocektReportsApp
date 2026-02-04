import { useRef, useState, useEffect } from 'react';
import { formatISO, DAYS_OF_WEEK, MONTHS_OF_YEAR, dateDetails } from './WEDateUtils';


import LeftNavButton from './components/buttons/LeftNavButton';
import RightNavButton from './components/buttons/RightNavButton';
import PickerDetails from './components/PickerDetails';
import PickerGrid from './components/PickerGrid';
import PickerHeader from './components/PickerHeader';
import PickerModal from './components/PickerModal';


import styles from './weDatePicker.module.css';



const domRectAsObject = (ele) => {
  const rect = ele.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    width: rect.width,
    top: rect.top,
    left: rect.left,
    right: rect.right,
    x: rect.x,
    y: rect.y
  }
}
const getModalDimensions = (ele) => {
  ele.parentElement.style.visibility = 'hidden';
  ele.parentElement.style.opacity = '0';
  ele.parentElement.classList.add(styles.showing);
  let retObj = domRectAsObject(ele);
  ele.parentElement.style.opacity = '1';
  ele.parentElement.style.visibility = 'visible';
  ele.parentElement.classList.remove(styles.showing);
  return retObj;
}

const canDisplayCenter = (_inputDims, _modalDims) => {
  let inputCenter = _inputDims.left + (_inputDims.width / 2);
  let halfModal = _modalDims.width * .5;
  let modalLeft = inputCenter - halfModal;
  let modalRight = inputCenter + halfModal;

  if (modalLeft < 0) {
    return false;
  }
  if (modalRight > window.innerHeight) {
    return false;
  }

  return true;

}
const canDisplayLeft = (_inputDims, _modalDims) => {
  let leftCheck = (_modalDims.width - _inputDims.width) + _inputDims.right;
  if (leftCheck > window.innerWidth) {
    return false;
  }
  return true;
}
const canDisplayRight = (_inputDims, _modalDims) => {
  let leftCheck = _modalDims.width - _inputDims.width;
  if (leftCheck < 0) {
    return false;
  }
  return true;
}
const canDisplayBottom = (_inputDims, _modalDims) => {
  let topCheck = (_inputDims.bottom + (16 * .5)) + _modalDims.height;
  if (topCheck > window.innerHeight) {
    return false;
  }
  return true;
}

const modalBelow = (_inputDims, _modalDims) => {
  let top = _inputDims.height + (16 * .5) + _inputDims.top;
  return top;
}
const modalAbove = (_inputDims, _modalDims) => {
  let top = (16 * .5) + _modalDims.height;
  return top;
}
const centerModal = (_inputDims, _modalDims) => {
  let halfModal = _modalDims.width * .5;
  let inputMiddle = (_inputDims.width / 2) + _inputDims.left;
  let left = inputMiddle - halfModal;
  return left;
}
const leftAlignModal = (_inputDims, _modalDims) => {
  let left = _inputDims.left;
  return left;
}
const rightAlignModal = (_inputDims, _modalDims) => {
  let inputRight = _inputDims.left + (_inputDims.width - (16 * 1.25));
  let left = inputRight - _modalDims.width;
  return left;
}

const getModalTopAndLeft = (_inputDims, _modalDims) => {
  let left = canDisplayCenter(_inputDims, _modalDims) ?
    centerModal(_inputDims, _modalDims) : canDisplayLeft(_inputDims, _modalDims) ?
      leftAlignModal(_inputDims, _modalDims) : canDisplayRight(_inputDims, _modalDims) ?
        rightAlignModal(_inputDims, _modalDims) : centerModal(_inputDims, _modalDims);
  let top = canDisplayBottom(_inputDims, _modalDims) ?
    modalBelow(_inputDims, _modalDims) : modalAbove(_inputDims, _modalDims);
  return {
    top,
    left
  }
}


const WEDatePicker = ({ date = new Date(), selectRange = false, ...props }) => {
  const [defaultDate, setDefaultDate] = useState(date);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [pickerModalCoords, setPickerModalCoords] = useState({
    top: 0,
    left: 0
  })

  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    updateInput();
  }, [defaultDate])

  const updateInput = () => {
    if (inputRef.current) {
      inputRef.current.value = formatISO(defaultDate);
    }
  }

  const handleDateSelectAction = (date) => {
    ;
    console.log(date);
    if (date !== undefined) {
      setDefaultDate(date);
      !selectRange && setShowPickerModal(false);
      return;
    }
    setDefaultDate(new Date());
  }

  const handleDateClick = (e) => {
    let inputDims;
    let modalDims;
    let location = {
      top: 0,
      left: 0
    }

    if (inputRef.current) {
      modalDims = getModalDimensions(modalRef.current);
      inputDims = domRectAsObject(inputRef.current);
      location = { ...getModalTopAndLeft(inputDims, modalDims) };
    }

    setPickerModalCoords({ top: location.top, left: location.left });
    setShowPickerModal(true);
  }

  return (
    <div className={styles.date_picker}>
      <div className={styles.input_wrapper} onClick={handleDateClick}>
        <input type={"date"} ref={inputRef} />
      </div>

      <PickerModal ref={modalRef} top={pickerModalCoords.top} left={pickerModalCoords.left} date={defaultDate} show={showPickerModal} handleClose={setShowPickerModal} handleSelect={handleDateSelectAction} />

    </div>
  );
}

export default WEDatePicker;