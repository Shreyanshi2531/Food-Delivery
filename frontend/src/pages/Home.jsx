import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import DeliveryBoyDashboard from "../components/DeliveryBoyDashboard";
import OwnerDashboard from "../components/OwnerDashboard";
import Navbar from "../components/Navbar";

function Home() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <div className="w-screen min-h-screen pt-25 flex flex-col items-center bg-[#fff9f6]">
        {userData?.role === "user" && <UserDashboard />}
        {userData?.role === "deliveryBoy" && <DeliveryBoyDashboard />}
        {userData?.role === "owner" && <OwnerDashboard />}
      </div>
    </div>
  );
}

export default Home;
