import { useState } from "react";

const useApiFetch = () => {
  const [loading, setLoading] = useState(false);
  const makeRequest = async (formData) => {
    // const abortController = new AbortController();
    // const token = localStorage.getItem("_auth");
    const baseUrl =
      "https://script.google.com/macros/s/AKfycbwVJ4S8n_8_Fx49sWYydwSDI94h4yhUiw4gCHeXU6_OwrLCUAmkbs3Y9ihGpv8GugzKGA/exec";
    const params = new URLSearchParams(formData);
    const url = `${baseUrl}?${params.toString()}`;
    console.log(url);

    setLoading(true);
    try {
      // const headers = {};
      // if (token) {
      //   headers.Authorization = `Token ${token}`;
      // }
      // const requestOptions = {
      //   signal: abortController.signal,
      //   headers: headers,
      //   url: url,
      //   method: method,
      //   cors: no - cors,
      //   body: data !== null ? data : null,
      // };
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
