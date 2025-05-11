import React, { createContext, useContext, useEffect, useState } from "react";
import useFetchData from "./hooks/useFetchData";

const MemberContext = createContext({ metricObj: null });

export const useGeneralData = () => useContext(MemberContext);

export const MemberProvider = ({ children }) => {
  const [memberId, setMemberId] = useState(null);
  useEffect(() => {
    const authState = localStorage.getItem("_auth_state");
    if (authState) {
      const parsed = JSON.parse(authState);
      setMemberId(parsed.id);
    }
  }, [memberId]);

  const {
    data: generalData,
    loading,
    error,
  } = useFetchData(memberId ? { memberId } : null);

  const metricObj = generalData || {};

  if (!memberId) return children;
  if (loading) return <div className="loading-screen">Loading data...</div>;
  if (error)
    return (
      <div className="loading-screen error">
        Error loading data: {error.message || "Unknown error"}
      </div>
    );
  if (!metricObj)
    return (
      <div className="loading-screen error">Failed to load account data.</div>
    );

  return (
    <MemberContext.Provider value={{ metricObj }}>
      {children}
    </MemberContext.Provider>
  );
};
