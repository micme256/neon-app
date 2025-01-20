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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendAnyRequest(formData);
        setAccountData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      {loading && <p>Loading</p>}
      {accountData && <AccountData accountData={accountData} />}
      <RecentTransactions />
      <Nav />
    </>
  );
};

export default Home;
