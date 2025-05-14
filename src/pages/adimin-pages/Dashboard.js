import KeyMetrics from "../../components/KeyMetrics";
import Contribution from "../../components/admin-pages-comps/Contributions";
import { useGeneralData } from "../../components/admin-pages-comps/GeneralDataContext";

import AdminNav from "./AdminNav";
const Dashboard = () => {
  const { accountsData, metricObj } = useGeneralData();
  const metricsData = metricObj
    ? {
        "Total Savings": metricObj["Total Savings"],
        "Membership fee": metricObj["Membership fee"],
        "Cumulative expenses": metricObj["Cumulative expenses"],
        "Bank Balance": metricObj["Bank Balance"],
      }
    : {};
  return (
    <>
      <AdminNav />
      <KeyMetrics metricsData={metricsData} />
      <Contribution contributions={[...accountsData]} />
    </>
  );
};

export default Dashboard;
