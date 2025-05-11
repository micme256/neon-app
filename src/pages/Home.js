import React, { useState, useEffect } from "react";
import Header from "./Header";
import BalanceCard from "../components/BalanceCard";
import Nav from "./Nav";
import RecentActivity from "../components/RecentActivity";
import useFetchData from "../components/hooks/useFetchData";
import { useGeneralData } from "../components/MemberContext";

const Home = () => {
  const { metricObj } = useGeneralData();
  const memberData = metricObj
    ? {
        "Total Savings": metricObj["Total Savings"],
        "Loan Bal": metricObj["Loan Bal"],
        "Interest Earned": metricObj["Interest Earned"],
      }
    : {};
  const memberId = JSON.parse(localStorage.getItem("_auth_state")).id;
  const {
    data: transactions,
    loading,
    error,
  } = useFetchData({
    dataType: "transactions",
    memberId,
    limit: 10,
  });
  if (loading) {
    return (
      <>
        <Header />
        <div className="header-background"></div>
        <BalanceCard memberData={memberData} />
        <p className="loading">Loading...</p>
        <Nav />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="header-background"></div>
        <BalanceCard memberData={memberData} />
        <p className="error">Error: {error}</p>
        <Nav />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="header-background"></div>
      <BalanceCard memberData={memberData} />
      {transactions && transactions.length > 0 ? (
        <RecentActivity recentActivity={transactions} />
      ) : (
        <p>No loan transactions found.</p>
      )}
      <Nav />
    </>
  );
};

export default Home;
