import { useState } from "react";

const useApiFetch = () => {
  const [loading, setLoading] = useState(false);
  const makeRequest = async (formData) => {
    const baseUrl =
      "https://script.google.com/macros/s/AKfycbyb1bTdDTuTGERqRbn2j5gpvcdgKFxPXwMj5gzpuc_gxWvpO3SGiqgU9UEuTYt3sZtnig/exec";
    const params = new URLSearchParams(formData);
    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);

    setLoading(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTML ERROR: ${res.status}`);
      }
      const resData = await res.json();
      setLoading(false);
      return resData;
    } catch (error) {
      return error;
    }
  };

  const sendAnyRequest = async (formData) => {
    return await makeRequest(formData);
  };
  return { sendAnyRequest, loading };
};

export default useApiFetch;
