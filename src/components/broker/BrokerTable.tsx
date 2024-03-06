import { Table } from "flowbite-react";

import { useRecoilState, useRecoilValue } from "recoil";
import { authState } from "../../atoms/globalAtoms";
import { userConnectionsState } from "../../atoms/userAtoms";
import { IUser } from "../../interfaces/UserInterface";
import ConnectionServices from "../../services/ConnectionService";

type Props = {
  brokerData: IUser[];
};

function BrokerTable({ brokerData }: Readonly<Props>) {
  const auth = useRecoilValue(authState);
  const [myConnections, setMyConnections] =
    useRecoilState(userConnectionsState);

  const requester = auth.user._id;

  const getMyConnections = async () => {
    const response = await ConnectionServices.getMyConnections();
    if (response) {
      setMyConnections(response);
    }
  };

  const addToMyList = async (brokerId: string) => {
    await ConnectionServices.createConnection({
      requester,
      requestee: brokerId,
      status: "pending",
    }).then(async () => {
      await getMyConnections();
    });
  };

  const cancelRequest = async (brokerId: string) => {
    // get connection id
    const connectionId = myConnections.filter(
      (connection) =>
        connection.requestee._id === brokerId &&
        connection.requester._id === requester
    )[0]._id;

    await ConnectionServices.cancelConnection(connectionId).then(async () => {
      await getMyConnections();
    });
  };

  const getConnectionStatus = (brokerId: string) => {
    // if any of the broker._id is equal to requesee in my connections and state is accepted, set the text as Request already sent

    let status = "Add to my list";

    myConnections.forEach((connection) => {
      if (connection.requestee._id === brokerId) {
        switch (connection.status) {
          case "pending":
            status = "Cancel request";
            break;
          case "accepted":
            status = "Connected";
            break;
          case "rejected":
            status = "Request rejected";
            break;
          default:
            status = "Add to my list";
            break;
        }
      }
    });

    return status;
  };

  return (
    <Table className="w-[1200px]">
      <Table.Head>
        <Table.HeadCell>Broker name</Table.HeadCell>
        <Table.HeadCell>Email</Table.HeadCell>
        <Table.HeadCell>Location</Table.HeadCell>
        <Table.HeadCell>Rating</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Add to my list</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {brokerData
          .filter((broker) => broker._id !== auth.user._id)
          .map((broker) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={broker._id}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {broker.firstName} {broker.lastName}
              </Table.Cell>
              <Table.Cell>{broker.email}</Table.Cell>
              <Table.Cell>{broker.location}</Table.Cell>
              <Table.Cell>$2999</Table.Cell>
              <Table.Cell>
                <button
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 disabled:text-gray-500 disabled:cursor-not-allowed"
                  disabled={!auth.isAuth || auth.user.userType === 2}
                  onClick={async () => {
                    // await addToMyList(broker._id);
                    switch (getConnectionStatus(broker._id)) {
                      case "Add to my list":
                        await addToMyList(broker._id);
                        break;
                      case "Cancel request":
                        await cancelRequest(broker._id);
                        break;
                      default:
                        break;
                    }
                  }}
                >
                  {getConnectionStatus(broker._id)}
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

export default BrokerTable;
