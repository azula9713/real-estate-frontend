import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../../atoms/globalAtoms";
import { userConnectionsState } from "../../atoms/userAtoms";
import { ICity } from "../../interfaces/CityInterface";
import { IListingDTO } from "../../interfaces/ListingInterface";
import ListingServices from "../../services/ListingService";
import isItMe from "../../utils/isItMe";
import CityUtils from "../../utils/locationUtils";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

function AddListing({ openModal, setOpenModal }: Readonly<Props>) {
  const auth = useRecoilValue(authState);
  const userConnections = useRecoilValue(userConnectionsState);

  const [cities, setCities] = useState<ICity[]>([]);
  const [alert, setAlert] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const listingTypeRef = useRef<HTMLSelectElement>(null);
  const listingUnderRef = useRef<HTMLSelectElement>(null);
  const propertyTypeRef = useRef<HTMLSelectElement>(null);

  const createListing = async () => {
    if (
      titleRef.current &&
      descriptionRef.current &&
      priceRef.current &&
      locationRef.current &&
      imagesRef.current &&
      listingTypeRef.current &&
      listingUnderRef.current &&
      propertyTypeRef.current
    ) {
      const newListing: IListingDTO = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: parseInt(priceRef.current.value),
        location: locationRef.current.value,
        photos: imagesRef.current.value.split(","),
        listedUnder: listingUnderRef.current.value || auth.user._id,
        listingType: listingTypeRef.current.value as "rent" | "sale" | "lease",
        propertyType: propertyTypeRef.current.value as
          | "apartment"
          | "house"
          | "office"
          | "land"
          | "commercial",
        clickCount: 0,
        isAccepted: auth.user._id === listingUnderRef.current.value,
        isPublished: auth.user._id === listingUnderRef.current.value,
      };

      await ListingServices.CreateListing(newListing).then(() => {
        setAlert(true);
      });
    }
  };

  useEffect(() => {
    setCities(CityUtils.getAllCities());
  }, []);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <label className="text-xl font-semibold">Add New Listing</label>
      </Modal.Header>
      <form onSubmit={createListing}>
        <Modal.Body>
          <div className="space-y-6">
            {/* Listing Form */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Title"
                  ref={titleRef}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Description"
                  ref={descriptionRef}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-white"
              >
                Price in LKR
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Price"
                  ref={priceRef}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="images"
                className="block text-sm font-medium text-white"
              >
                Images
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="images"
                  id="images"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter the image URLs separated by commas"
                  ref={imagesRef}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="listingType"
                className="block text-sm font-medium text-white"
              >
                Listing Type
              </label>

              <div className="mt-1">
                <select
                  id="listingType"
                  name="listingType"
                  autoComplete="listingType"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ref={listingTypeRef}
                  required
                >
                  <option value="rent">Rent</option>
                  <option value="sale">Sale</option>
                  <option value="lease">Lease</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-white"
              >
                Property Type
              </label>

              <div className="mt-1">
                <select
                  id="propertyType"
                  name="propertyType"
                  autoComplete="propertyType"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ref={propertyTypeRef}
                  required
                >
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="office">Office</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-white"
              >
                Location
              </label>

              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  autoComplete="location"
                  className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ref={locationRef}
                  required
                >
                  {cities.map((city, index) => (
                    <option key={index} value={city.code}>
                      {city.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {auth.user.userType === 1 && (
              <div>
                <label
                  htmlFor="listUnder"
                  className="block text-sm font-medium text-white"
                >
                  List under
                </label>

                <div className="mt-1">
                  <select
                    id="listUnder"
                    name="listUnder"
                    autoComplete="listUnder"
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    ref={listingUnderRef}
                  >
                    {/* get accepted connections */}
                    <option value={auth.user._id}>Myself</option>
                    {userConnections
                      .filter((connection) => connection.status === "accepted")
                      .map((connection, index) => (
                        <option
                          key={index}
                          value={
                            // connection.requester._id === auth.user._id
                            //   ? connection.requestee._id
                            //   : connection.requester._id
                            isItMe(connection.requester._id, auth.user._id)
                              ? connection.requestee._id
                              : connection.requester._id
                          }
                        >
                          {/* {connection.requestee.firstName}{" "}
                      {connection.requestee.lastName} */}
                          {isItMe(connection.requester._id, auth.user._id)
                            ? connection.requestee.firstName
                            : connection.requester.firstName}{" "}
                          {isItMe(connection.requester._id, auth.user._id)
                            ? connection.requestee.lastName
                            : connection.requester.lastName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // onClick={() => {
            //   createListing();
            // }}
            type="submit"
            disabled={alert}
          >
            Save
          </Button>
          <Button
            color="gray"
            // onClick={() => setOpenModal(false)}
            type="reset"
            disabled={alert}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </form>
      {alert && (
        <Alert
          color="success"
          className="mx-4"
          onDismiss={() => {
            setAlert(false);
            setOpenModal(false);
          }}
        >
          Listing added successfully
        </Alert>
      )}
    </Modal>
  );
}

export default AddListing;
