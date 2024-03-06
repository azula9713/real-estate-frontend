import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { authState } from "../atoms/globalAtoms";
import { IUser } from "../interfaces/UserInterface";
import AuthServices from "../services/AuthServices";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authState);

  return (
    <Navbar fluid>
      <Navbar.Brand onClick={() => navigate("/")}>
        <img
          src="/logo.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-lg md:text-xl font-semibold dark:text-white">
          Real Estate
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {auth.isAuth && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={auth.user.profilePic}
                rounded
                className="mx-2"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {auth.user.firstName} {auth.user.lastName}
              </span>
              <span className="block truncate text-sm font-medium">
                {auth.user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item
              onClick={
                // Open in new tab
                () => window.open("/dashboard/home", "_blank")
              }
            >
              Dashboard
            </Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={async () => {
                await AuthServices.LogoutUser();
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setAuth({
                  isAuth: false,
                  user: {} as IUser,
                });
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link onClick={() => navigate("/find-listings")}>
          Find Listings
        </Navbar.Link>
        <Navbar.Link onClick={() => navigate("/find-brokers")}>
          Find Brokers
        </Navbar.Link>
        {auth.user.userType === 1 && (
          <Navbar.Link onClick={() => window.open("/dashboard/home", "_blank")}>
            Sell
          </Navbar.Link>
        )}

        <Navbar.Link onClick={() => navigate("/support")}>Support</Navbar.Link>
        {!auth.isAuth && location.pathname !== "/auth/login" && (
          <Navbar.Link
            className="ml-auto"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Navbar.Link>
        )}
        {!auth.isAuth && location.pathname === "/auth/register" && (
          <Navbar.Link
            className="ml-auto"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Header;
