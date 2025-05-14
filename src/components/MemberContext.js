import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchFromSheet from "./hooks/useFetchFromSheet";

const MemberContext = createContext({ metricObj: null });

export const useGeneralData = () => useContext(MemberContext);

export const MemberProvider = ({ children }) => {
  const auth = localStorage.getItem("_auth_state");
  const memberId = JSON.parse(auth).id;

  const [metricObj, setMetricObj] = useState(null);
  const [loading, setLoading] = useState(!!memberId);
  const [error, setError] = useState(null);

  const { fetchRequest } = useFetchFromSheet();

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!memberId) return;

      setLoading(true);
      try {
        const response = await fetchRequest({
          memberId,
        });
        if (response?.status !== "success") {
          throw new Error(response?.message || "Unknown error fetching data");
        }
        setMetricObj(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || "Unexpected error occurred");
        setMetricObj(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (!memberId) return <>{children}</>;

  if (loading) {
    return <div className="loading-screen">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="loading-screen error">Error loading data: {error}</div>
    );
  }

  if (!metricObj) {
    return (
      <div className="loading-screen error">
        Failed to load member account data.
      </div>
    );
  }

  return (
    <MemberContext.Provider value={{ metricObj }}>
      {children}
    </MemberContext.Provider>
  );
};
