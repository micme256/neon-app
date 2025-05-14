import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchFromSheet from "../hooks/useFetchFromSheet";

const GeneralDataContext = createContext({
  accountsData: null,
  metricObj: null,
});

export const useGeneralData = () => useContext(GeneralDataContext);

export const GenelDataProvider = ({ children }) => {
  const [accountsData, setAccountsData] = useState(null);
  const [metricObj, setMetricObj] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchRequest } = useFetchFromSheet();

  useEffect(() => {
    const fetchGeneralData = async () => {
      setLoading(true);
      try {
        const response = await fetchRequest({ dataType: "generalData" });
        if (response?.status !== "success") {
          throw new Error(response?.message || "Failed to fetch general data");
        }

        const { accountsData, metricObj } = response.data || {};

        setAccountsData(accountsData);
        setMetricObj(metricObj);
        setError(null);
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchGeneralData();
  }, []);

  if (loading) return <div className="loading-screen">Loading data...</div>;

  if (error) {
    return (
      <div className="loading-screen error">Error loading data: {error}</div>
    );
  }

  return (
    <GeneralDataContext.Provider value={{ accountsData, metricObj }}>
      {children}
    </GeneralDataContext.Provider>
  );
};
