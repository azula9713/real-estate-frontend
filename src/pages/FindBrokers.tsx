import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { authState } from "../atoms/globalAtoms";
import BrokerTable from "../components/broker/BrokerTable";
import { IUser } from "../interfaces/UserInterface";
import MainLayout from "../layout/MainLayout";
import UserServices from "../services/UserServices";

function FindBrokers() {
  const [brokers, setBrokers] = useState<IUser[]>([]);
  const auth = useRecoilValue(authState);

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
        {brokers.filter((broker) => broker._id !== auth.user._id).length ===
        0 ? (
          <h2 className="text-2xl font-bold text-center text-white">
            No brokers found
          </h2>
        ) : (
          <BrokerTable brokerData={brokers} />
        )}
      </div>
    </MainLayout>
  );
}

export default FindBrokers;
