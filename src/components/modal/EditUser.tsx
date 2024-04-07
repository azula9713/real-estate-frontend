import { Alert, Button, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { authState } from "../../atoms/globalAtoms";
import { ICity } from "../../interfaces/CityInterface";
import { IUser } from "../../interfaces/UserInterface";
import UserServices from "../../services/UserServices";
import CityUtils from "../../utils/locationUtils";

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};

function EditUser({ openModal, setOpenModal }: Readonly<Props>) {
  const [auth, setAuth] = useRecoilState(authState);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);

  const user = auth.user;

  const [cities, setCities] = useState<ICity[]>([]);
  const [alert, setAlert] = useState(false);

  const saveUser = async () => {
    if (
      firstNameRef.current &&
      lastNameRef.current &&
      phoneRef.current &&
      profilePicRef.current &&
      locationRef.current
    ) {
      const newUser: IUser = {
        ...user,
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        phoneNum: phoneRef.current.value,
        profilePic: profilePicRef.current.value,
        location: locationRef.current.value,
      };

      await UserServices.UpdateUser(newUser).then(() => {
        setAlert(true);
        setAuth({ ...auth, user: newUser });
      });
    }
  };

  useEffect(() => {
    setCities(CityUtils.getAllCities());
  }, []);

  return (
    <Modal
      show={openModal}
      onClose={() => {
        setOpenModal(false);
        setAlert(false);
      }}
    >
      <Modal.Header>
        <label className="text-xl font-semibold">Edit My Details</label>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="First Name"
                defaultValue={user.firstName}
                ref={firstNameRef}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Last Name"
                defaultValue={user.lastName}
                ref={lastNameRef}
              />
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
                  cities.find((city) => city.code === user.location)?.code
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
          <div>
            <label
              htmlFor="phoneNum"
              className="block text-sm font-medium text-white"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="phoneNum"
                id="phoneNum"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Phone Number"
                defaultValue={user.phoneNum}
                ref={phoneRef}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white"
            >
              Profile Picture
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Title"
                defaultValue={user.profilePic}
                ref={profilePicRef}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            saveUser();
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
          User Updated Successfully
        </Alert>
      )}
    </Modal>
  );
}

export default EditUser;
