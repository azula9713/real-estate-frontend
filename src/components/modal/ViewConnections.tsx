import { Modal, Tabs } from "flowbite-react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { authState } from "../../atoms/globalAtoms";
import { userConnectionsState } from "../../atoms/userAtoms";
import { IConnectionExpanded } from "../../interfaces/ConnectionInterface";
import ConnectionServices from "../../services/ConnectionService";
import isItMe from "../../utils/isItMe";
import ConnectionTab from "../dashboard/ConnectionTab";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

function ViewConnections({ openModal, setOpenModal }: Readonly<Props>) {
  const auth = useRecoilValue(authState);
  const [userConnections, setUserConnections] =
    useRecoilState(userConnectionsState);

  const [activeTab, setActiveTab] = useState(0);

  const updateUserConnection = async (
    connection: IConnectionExpanded,
    status: "accepted" | "rejected"
  ) => {
    const { _id: connectionId } = connection;
    // update connection status
    const response = await ConnectionServices.updateConnection(connectionId, {
      ...connection,
      status,
      requestee: connection.requestee._id,
      requester: connection.requester._id,
    });

    if (response) {
      const updatedConnections = userConnections.map((conn) => {
        //  remove the connection from the list
        if (conn._id === connectionId) {
          return {
            ...conn,
            status,
          };
        }
        return conn;
      });
      setUserConnections(updatedConnections);
    }
  };

  const removeConnection = async (connection: IConnectionExpanded) => {
    const { _id: connectionId } = connection;
    // remove connection
    const response = await ConnectionServices.cancelConnection(connectionId);

    if (response) {
      const updatedConnections = userConnections.filter(
        (conn) => conn._id !== connectionId
      );
      setUserConnections(updatedConnections);
    }
  };

  const sentConnections = userConnections.filter(
    (connection) =>
      connection.requester._id === auth.user._id &&
      connection.status !== "rejected"
  );

  const receivedConnections = userConnections.filter(
    (connection) =>
      connection.requestee._id === auth.user._id &&
      connection.status !== "rejected"
  );

  const pendingConnections = userConnections.filter(
    (connection) => connection.status === "pending"
  );

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <div className="text-xl font-semibold">My Connections</div>
      </Modal.Header>
      <Modal.Body>
        <Tabs aria-label="My Connections">
          <ConnectionTab
            title="Sent"
            indexOfTab={0}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {sentConnections.length === 0 ? (
              <p>No sent connections</p>
            ) : (
              <ul className="overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                {sentConnections.map((connection) => (
                  <li
                    key={connection._id}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-900"
                  >
                    <div className="flex items-center justify-between space-x-4 w-full dark:text-white text-black">
                      <p>
                        {connection.requestee.firstName}{" "}
                        {connection.requestee.lastName}
                      </p>

                      {/* depend on connection state, give an action, plus block */}
                      <div className="flex items-center space-x-4">
                        {connection.status === "pending" &&
                          auth.user._id === connection.requester._id && (
                            <button
                              className="bg-red-500 px-4 py-1 rounded-md text-white"
                              onClick={() => removeConnection(connection)}
                            >
                              Cancel
                            </button>
                          )}

                        {connection.status === "accepted" && (
                          <button
                            className="bg-red-500 px-4 py-1 rounded-md text-white"
                            onClick={() => removeConnection(connection)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ConnectionTab>
          <ConnectionTab
            title="Received"
            indexOfTab={1}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {receivedConnections.length === 0 ? (
              <p>No received connections</p>
            ) : (
              <ul>
                {receivedConnections.map((connection) => (
                  <li key={connection._id}>
                    <div className="flex items-center justify-between space-x-4 w-full dark:text-white text-black">
                      <p>
                        {connection.requester.firstName}{" "}
                        {connection.requester.lastName}
                      </p>

                      {/* accept and reject buttons */}
                      <div className="flex items-center space-x-4">
                        {connection.status === "pending" && (
                          <>
                            <button
                              className="bg-green-500 px-4 py-1 rounded-md text-white"
                              onClick={() =>
                                updateUserConnection(connection, "accepted")
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 px-4 py-1 rounded-md dark:text-white text-black"
                              onClick={() =>
                                updateUserConnection(connection, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {
                          // if connection is accepted, show remove button
                          connection.status === "accepted" && (
                            <button
                              className="bg-red-500 px-4 py-1 rounded-md dark:text-white text-black"
                              onClick={() => removeConnection(connection)}
                            >
                              Remove
                            </button>
                          )
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ConnectionTab>
          <ConnectionTab
            title="Pending"
            indexOfTab={2}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {pendingConnections.length === 0 ? (
              <p>No pending connections</p>
            ) : (
              <ul>
                {pendingConnections.map((connection) => (
                  <li key={connection._id}>
                    <div className="flex items-center justify-between space-x-4 w-full text-white">
                      <p>
                        {isItMe(connection.requester._id, auth.user._id)
                          ? connection.requestee.firstName
                          : connection.requester.firstName}{" "}
                        {isItMe(connection.requester._id, auth.user._id)
                          ? connection.requestee.lastName
                          : connection.requester.lastName}
                      </p>
                      <div className="flex items-center space-x-4">
                        {connection.status === "pending" &&
                          auth.user._id === connection.requestee._id && (
                            <>
                              <button className="bg-green-500 px-4 py-1 rounded-md text-white">
                                Accept
                              </button>
                              <button className="bg-red-500 px-4 py-1 rounded-md text-white">
                                Reject
                              </button>
                            </>
                          )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </ConnectionTab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default ViewConnections;
