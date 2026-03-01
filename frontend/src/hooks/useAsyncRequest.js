import { useCallback, useState } from "react";

const useAsyncRequest = (asyncFn, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFn(...args);
        setData(result);
        return result;
      } catch (requestError) {
        setError(requestError);
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn]
  );

  return {
    data,
    error,
    isLoading,
    run,
    setData,
  };
};

export default useAsyncRequest;
