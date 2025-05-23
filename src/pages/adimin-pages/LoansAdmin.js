import KeyMetrics from "../../components/KeyMetrics";
import { useGeneralData } from "../../components/admin-pages-comps/GeneralDataContext";
import AdminNav from "./AdminNav";
import { Outlet } from "react-router-dom";

const LoansAdmin = () => {
  const { metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Active Loans": `${metricObj["Active Loans"]}`,
        "Loan Sum": metricObj["Loan Sum"],
      }
    : {};

  return (
    <>
      <KeyMetrics metricsData={metricsData} />
      <Outlet />
      <AdminNav />
    </>
  );
};

export default LoansAdmin;
