import React, { useState, useEffect } from "react";
import Header from "./Header";
import AccountData from "./Home-compents/AccountData";
import Nav from "./Nav";
import RecentTransactions from "./Home-compents/RecentTransactions";
import useApiFetch from "./hooks/useApiFetch";

const Home = () => {
  const { sendAnyRequest, loading } = useApiFetch();
  const formData = new FormData();
  formData.append("requestType", "fetchData");
  formData.append(
    "memberId",
    JSON.parse(localStorage.getItem("_auth_state")).id
  );
  const [accountData, setAccountData] = useState(null);
  const [recentTransaction, setrecentTransaction] = useState(null);

  useEffect(() => {
    const savedAccountData = localStorage.getItem("accountData");
    const savedRecentTransaction = localStorage.getItem("recentTransaction");

    if (savedAccountData && savedRecentTransaction) {
      setAccountData(JSON.parse(savedAccountData));
      setrecentTransaction(JSON.parse(savedRecentTransaction));
    } else {
      const fetchData = async () => {
        try {
          const formData = new FormData();
          formData.append("requestType", "fetchData");
          formData.append(
            "memberId",
            JSON.parse(localStorage.getItem("_auth_state")).id
          );

          const response = await sendAnyRequest(formData);
          setAccountData(response.data);
          setrecentTransaction(response.data2);

          localStorage.setItem("accountData", JSON.stringify(response.data));
          localStorage.setItem(
            "recentTransaction",
            JSON.stringify(response.data2)
          );
        } catch (error) {
          console.log(error.message);
        }
      };
      fetchData();
    }
  }, []);

  return (
    <>
      <Header />
      {loading && <p>Loading</p>}
      {accountData && <AccountData accountData={accountData} />}
      {recentTransaction && (
        <RecentTransactions recentTransaction={recentTransaction} />
      )}
      <Nav />
    </>
  );
};

export default Home;
