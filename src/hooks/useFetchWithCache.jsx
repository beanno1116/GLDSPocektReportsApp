import { useState, useRef, useCallback } from "react";
import axios from "axios";


export default function useFetchWithCache({ url, method = "GET", defaultParams = {}, useCache = true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // simple in-memory cache: key = url + params
  const cacheRef = useRef({});

  const fetchData = useCallback(
    async (overrideParams = {}) => {
      const finalParams = { ...defaultParams, ...overrideParams };
      const cacheKey = JSON.stringify({ url, method, finalParams });

      // return cached response if enabled
      if (useCache && cacheRef.current[cacheKey]) {
        setData(cacheRef.current[cacheKey]);
        return Promise.resolve(cacheRef.current[cacheKey]);
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          ...(method === "GET"
            ? { params: finalParams }
            : { data: finalParams }),
        });

        setData(response.data);

        if (useCache) {
          cacheRef.current[cacheKey] = response.data;
        }

        return response.data; // so caller can await it
      } catch (err) {
        setError(err);
        return Promise.reject(err);
      } finally {
        setLoading(false);
      }
    },
    [url, method, defaultParams, useCache]
  );

  return {
    data,
    loading,
    error,
    fetchData, // manually run this
    clearCache: () => (cacheRef.current = {}),
  };
}
