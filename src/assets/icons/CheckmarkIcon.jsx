
const CheckmarkIcon = ({ size,color="rgba(255, 250, 250, 0.45)" }) => {
  return (
    
    <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill={color}>
      <defs>
        <linearGradient id="gradient-full" x1="0%" y1="0%" x2="120%" y2="120%">
          <stop offset="0%" stopColor="rgba(99, 187, 216, 0.6)" />
          <stop offset="90%" stopColor="#ffffff00" />
        </linearGradient>
        <linearGradient id="gradient-half" x1="-50%" y1="-50%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffffff00" />
        </linearGradient>
      </defs>
      <g id="Layer_2_00000080916089816102197240000009771465326107243407_"><g id="Layer_2_copy_11"><g id="_63"><g id="_63-2"><path d="m512 123.2c0 15.1-6 29.7-16.7 40.4l-265.5 265.5c-22.3 22.3-58.5 22.3-80.8 0l-132.3-132.2c-21.7-22.9-20.8-59 2.1-80.7 22.1-21 56.7-20.9 78.7 0l91.9 91.9 225.1-225.2c22.3-22.3 58.5-22.3 80.8 0 10.7 10.7 16.7 25.2 16.7 40.3z"></path></g></g></g></g>
    </svg>
  );
}

export default CheckmarkIcon;


