const ChevronIcon = ({ size,color="rgba(255, 250, 250, 0.45)" }) => {
  return (
    
    <svg id="fi_17571182" width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" fill={color}>
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
      <path d="m467.33 160.52-211.33 251.27-211.33-251.27a32.66 32.66 0 0 1 7.25-48.45l10.26-6.64a32.74 32.74 0 0 1 42.75 6.4l146.48 174.17a6 6 0 0 0 9.18 0l146.48-174.17a32.73 32.73 0 0 1 42.75-6.4l10.26 6.64a32.66 32.66 0 0 1 7.25 48.45z"></path>
    </svg>
  );
}

export default ChevronIcon;
