import { useCallback } from "react";
import { useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (reqObject, setTaskHandler) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reqObject.url, {
        method: reqObject.method ? reqObject.method : "GET",
        body: reqObject.body ? JSON.stringify(reqObject.body) : null,
        headers: reqObject.headers ? reqObject.headers : {},
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      console.log(response);
      console.log(data);

      setTaskHandler(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
