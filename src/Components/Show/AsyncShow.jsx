import { useState } from "react";
import { useEffect } from "react";


const AsyncShow = ({ when,fallback,children }) => {
  const [isLoading,setIsLoading] = useState(true);
  const [data,setData] = useState(null);

  useEffect(() => {
    Promise.resolve(when).then(result => {
      setData(result);
      setIsLoading(false);
    });
  },[when]);

  if (isLoading) return fallback;
  return data ? children : null;
}

export default AsyncShow;