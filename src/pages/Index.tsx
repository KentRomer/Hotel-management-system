import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { RoomsManagement } from "@/components/RoomsManagement";
import { GuestsManagement } from "@/components/GuestsManagement";
import { ReservationsManagement } from "@/components/ReservationsManagement";
import { BillingManagement } from "@/components/BillingManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "rooms":
        return <RoomsManagement />;
      case "guests":
        return <GuestsManagement />;
      case "reservations":
        return <ReservationsManagement />;
      case "billing":
        return <BillingManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
