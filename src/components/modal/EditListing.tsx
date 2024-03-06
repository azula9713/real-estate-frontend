import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

import { selectedListingState } from "../../atoms/listingAtoms";
import { ICity } from "../../interfaces/CityInterface";
import { IListing } from "../../interfaces/ListingInterface";
import ListingServices from "../../services/ListingService";
import CityUtils from "../../utils/locationUtils";

type Props = {
  listing: IListing;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

function EditListing({ listing, openModal, setOpenModal }: Readonly<Props>) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const listingTypeRef = useRef<HTMLSelectElement>(null);

  const [cities, setCities] = useState<ICity[]>([]);
  const [alert, setAlert] = useState(false);
  const setSelectedListing = useSetRecoilState(selectedListingState);

  const saveListing = async () => {
    // if all refs are available
    if (
      titleRef.current &&
      descriptionRef.current &&
      priceRef.current &&
      locationRef.current &&
      imagesRef.current &&
      listingTypeRef.current
    ) {
      const newListing: IListing = {
        ...listing,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: parseInt(priceRef.current.value),
        location: locationRef.current.value,
        photos: imagesRef.current.value.split(","),
        listedUnder: listing.listedUnder,
        listingType: listingTypeRef.current.value as "rent" | "sale" | "lease",
      };

      await ListingServices.UpdateListing(newListing).then(() => {
        setAlert(true);
        setSelectedListing(newListing);
      });
    }
  };

  useEffect(() => {
    setCities(CityUtils.getAllCities());
  }, []);

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <label className="text-xl font-semibold">Edit {listing.title}</label>
      </Modal.Header>
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
                defaultValue={listing.title}
                ref={titleRef}
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
                defaultValue={listing.description}
                ref={descriptionRef}
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
                type="text"
                name="price"
                id="price"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Price"
                defaultValue={listing.price}
                ref={priceRef}
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
                placeholder="Images"
                defaultValue={
                  listing.photos ? listing.photos.join(",") : undefined
                }
                ref={imagesRef}
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
                defaultValue={listing.listingType}
              >
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
                <option value="lease">Lease</option>
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
                defaultValue={
                  cities.find((city) => city.code === listing.location)?.code
                }
                ref={locationRef}
              >
                {cities.map((city, index) => (
                  <option key={index} value={city.code}>
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            saveListing();
          }}
          disabled={alert}
        >
          Save
        </Button>
        <Button
          color="gray"
          onClick={() => setOpenModal(false)}
          disabled={alert}
        >
          Cancel
        </Button>
      </Modal.Footer>

      {alert && (
        <Alert
          color="success"
          className="mx-4"
          onDismiss={() => {
            setAlert(false);
            setOpenModal(false);
          }}
        >
          Listing updated successfully
        </Alert>
      )}
    </Modal>
  );
}

export default EditListing;
