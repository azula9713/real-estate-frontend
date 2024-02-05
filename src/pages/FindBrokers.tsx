import { useEffect, useState } from "react";

import BrokerTable from "../components/broker/BrokerTable";
import { IUser } from "../interfaces/UserInterface";
import MainLayout from "../layout/MainLayout";
import UserServices from "../services/UserServices";

function FindBrokers() {
  const [brokers, setBrokers] = useState<IUser[]>([]);

  const fetchBrokers = async () => {
    const response = await UserServices.GetUsers("2");

    if (response) {
      setBrokers(response);
    }
  };

  useEffect(() => {
    fetchBrokers();
  }, []);

  return (
    <MainLayout>
      <div className="overflow-x-auto m-2 p-2 flex justify-start lg:justify-center">
        <BrokerTable brokerData={brokers} />
      </div>
    </MainLayout>
  );
}

export default FindBrokers;
