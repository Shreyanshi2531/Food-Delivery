import React from "react";
import Navbar from "./Navbar";

function DeliveryDashboard() {
  return (
    <div>
      <Navbar />

      <div className="pt-28 px-6">
        <h1 className="text-3xl font-bold">
           Delivery Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Assigned deliveries will appear here.
        </p>

        <div className="mt-8 bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold">
            No deliveries assigned
          </h2>

          <p className="text-gray-500 mt-2">
            New delivery requests will appear here automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDashboard;
