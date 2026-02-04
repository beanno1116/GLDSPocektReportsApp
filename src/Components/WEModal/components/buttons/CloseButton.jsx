import CloseIcon from '../icons/CloseIcon';




const CloseButton = ({ onClick, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      <CloseIcon width={props.width} height={props.height} />
    </button>
  );
}

export default CloseButton;