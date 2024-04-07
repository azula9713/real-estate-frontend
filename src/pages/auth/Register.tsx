import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import DropDown from "../../components/common/DropDown";
import TextField from "../../components/common/TextField";
import { ICity } from "../../interfaces/CityInterface";
import MainLayout from "../../layout/MainLayout";
import UserServices from "../../services/UserServices";
import CityUtils from "../../utils/locationUtils";

function Register() {
  const navigate = useNavigate();

  const [cities, setCities] = useState<ICity[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errorMessages, setErrorMessages] = useState<any[]>([]);

  const errorMapper = (path: string) => {
    const error = errorMessages.find((err) => err.path.includes(path));

    if (error) {
      return error.message;
    } else {
      return "";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = e.currentTarget.fName.value;
    const lastName = e.currentTarget.lName.value;
    const email = e.currentTarget.email.value;
    const phoneNum = e.currentTarget.phone.value;
    const password = e.currentTarget.password.value;
    const confirmPassword = e.currentTarget.confirmPassword.value;
    const userType = e.currentTarget.userType.value;
    const location = e.currentTarget.location.value;
    const profilePic =
      "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg";

    const response = await UserServices.CreateUser({
      firstName,
      lastName,
      email,
      phoneNum,
      password,
      confirmPassword,
      userType: parseInt(userType),
      profilePic,
      location,
      savedListings: [],
      savedFilters: [],
      rating: 0,
    });

    if (response.email === email) {
      alert("User created successfully");
      navigate("/auth/login");
    } else {
      setErrorMessages(response);
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
        <div className="lg:flex items-center justify-center w-full max-w-[900px]">
          <TextField
            label="First Name"
            placeholder="First Name"
            id="fName"
            isRequired
            errorMessage={errorMapper("firstName")}
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            id="lName"
            isRequired
            errorMessage={errorMapper("lastName")}
          />
        </div>
        <div className="lg:flex items-center justify-center w-full max-w-[900px]">
          <TextField
            label="Email"
            placeholder="Email"
            id="email"
            type="email"
            isRequired
            errorMessage={errorMapper("email")}
          />
          <TextField
            label="Phone Number"
            placeholder="Phone Number"
            id="phone"
            type="tel"
            isRequired
            errorMessage={errorMapper("phoneNum")}
          />
        </div>
        <div className="lg:flex items-center justify-center w-full max-w-[900px]">
          <TextField
            label="Password"
            placeholder="Password"
            id="password"
            type="password"
            isRequired
            errorMessage={errorMapper("password")}
          />
          <TextField
            label="Confirm Password"
            placeholder="Confirm Password"
            id="confirmPassword"
            type="password"
            isRequired
            errorMessage={errorMapper("confirmPassword")}
          />
        </div>
        <div className="lg:flex items-center justify-center w-full max-w-[900px]">
          <DropDown
            label="User Type"
            id="userType"
            isRequired
            errorMessage={errorMapper("userType")}
            items={[
              {
                label: "Buyer",
                value: 0,
              },
              {
                label: "Seller",
                value: 1,
              },
              {
                label: "Broker",
                value: 2,
              },
            ]}
          />

          <DropDown
            label="Location"
            id="location"
            isRequired
            errorMessage={errorMapper("location")}
            items={cities.map((city) => ({
              label: city.city,
              value: city.code,
            }))}
          />
        </div>

        <div className="py-6 px-3">
          <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
            Create Account
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

export default Register;
