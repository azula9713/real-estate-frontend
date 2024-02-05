import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authState } from "../../atoms/globalAtoms";
import { userConnectionsState } from "../../atoms/userAtoms";
import { DropDown, TextArea, TextField } from "../../components/common";
import listingPurpose from "../../data/listingPurpose";
import { ICity } from "../../interfaces/CityInterface";
import MainLayout from "../../layout/MainLayout";
import ListingServices from "../../services/ListingService";
import CityUtils from "../../utils/locationUtils";

function AddListing() {
  const navigate = useNavigate();

  const [cities, setCities] = useState<ICity[]>([]);
  const myConnections = useRecoilValue(userConnectionsState);
  const auth = useRecoilValue(authState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = e.currentTarget.listingTitle.value;
    const description = e.currentTarget.description.value;
    const price = e.currentTarget.price.value;
    const location = e.currentTarget.location.value;
    const propertyType = e.currentTarget.propertyType.value;
    const imageURL = e.currentTarget.imageURL.value;

    const response = await ListingServices.CreateListing({
      title,
      description,
      price: parseInt(price),
      location,
      listingType: propertyType,
      photos: [imageURL],
    });

    if (response.title === title) {
      alert("Lisiting created successfully");
      navigate("/");
    }
  };

  useEffect(() => {
    setCities(CityUtils.getAllCities());
  }, []);

  return (
    <MainLayout>
      <form
        className="w-full flex flex-col items-center justify-center px-12 py-4"
        onSubmit={onSubmit}
      >
        <TextField
          label="Listing Title"
          placeholder="Enter the title"
          id="listingTitle"
          isRequired
        />
        <TextArea
          label="Description"
          placeholder="Enter the description"
          id="description"
          isRequired
        />
        <TextField
          label="Price"
          placeholder="Enter the price"
          id="price"
          type="number"
          isRequired
        />
        <DropDown
          label="Location"
          id="location"
          items={cities.map((city) => ({
            label: city.city,
            value: city.code,
          }))}
        />
        <DropDown
          label="Property Type"
          id="propertyType"
          items={listingPurpose}
        />
        <DropDown
          label="Select Broker"
          id="broker"
          items={
            // filter all accepted connections and map them to dropdown items
            myConnections
              .filter((connection) => connection.status === "accepted")
              .map((connection) => ({
                //  if user is the sender, then show the receiver's name
                //  else show the sender's name
                label:
                  connection.requestee._id === auth.user._id
                    ? `${connection.requester.firstName} ${connection.requester.lastName}`
                    : `${connection.requestee.firstName} ${connection.requestee.lastName}`,
                value:
                  connection.requestee._id === auth.user._id
                    ? connection.requester._id
                    : connection.requestee._id,
              }))
          }
        />

        {/* textfields to enter image URLs, by default display one, and users can add upto 5 dynamically */}
        <TextField
          label="Image URL"
          placeholder="Enter the image URL"
          id="imageURL"
          isRequired
        />
        <div className="py-6 px-3">
          <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Create Listing
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

export default AddListing;
