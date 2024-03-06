import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/globalAtoms";
import {
  userConnectionsState,
  userListingsState,
  userSavedListingsState,
} from "../../atoms/userAtoms";
import SummaryTile from "../../components/dashboard/SummaryTile";
import DashboardLayout from "../../layout/DashboardLayout";

function DashHome() {
  const auth = useRecoilValue(authState);
  const userConnections = useRecoilValue(userConnectionsState);
  const userListings = useRecoilValue(userListingsState);
  const savedListings = useRecoilValue(userSavedListingsState);

  useEffect(() => {
    console.log("savedListings", savedListings);
  }, [savedListings]);

  return (
    <DashboardLayout>
      <div className="mt-12">
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
          {(auth.user.userType === 1 || auth.user.userType === 2) && (
            <>
              <SummaryTile
                summaryTitle="Total Property Value"
                summaryValue={
                  userListings
                    .reduce((acc, cur) => acc + cur.price, 0)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    }) || "$0"
                }
                icon={
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                      <path
                        fillRule="evenodd"
                        d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                        clipRule="evenodd"
                      />
                      <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
                    </svg>
                  </div>
                }
              />
              <SummaryTile
                summaryTitle="Total Views"
                summaryValue={userListings
                  .reduce((acc, cur) => acc + cur.clickCount, 0)
                  .toString()}
                icon={
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-6 h-6 text-white"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>
                  </div>
                }
              />
            </>
          )}
          <SummaryTile
            summaryTitle="Total Connections"
            summaryValue={userConnections.length.toString()}
            icon={
              <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-6 h-6 text-white"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
              </div>
            }
          />
        </div>
        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
            <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 flex items-center justify-between p-6">
              <div>
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
                  My Saved Listings
                </h6>
              </div>
            </div>
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Title
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Price
                      </p>
                    </th>
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Views
                      </p>
                    </th>
                    {/* actions */}
                    <th className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <p className="block antialiased font-sans text-[11px] font-medium uppercase text-blue-gray-400">
                        Actions
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {savedListings?.map((listing, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                            {listing.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          {listing?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "LKR",
                          })}
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">
                          {listing.clickCount}
                        </p>
                      </td>
                      <td className="py-3 px-5 border-b border-blue-gray-50">
                        <div className="flex items-center gap-4">
                          <button
                            disabled={
                              !listing.isAccepted || !listing.isPublished
                            }
                            type="button"
                            className="text-xs font-medium text-blue-500 hover:text-blue-600 disabled:opacity-50"
                          >
                            View
                          </button>
                          <button
                            disabled={
                              !listing.isAccepted || !listing.isPublished
                            }
                            type="button"
                            className="text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashHome;
