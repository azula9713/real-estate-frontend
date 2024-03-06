import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { authState } from "../../atoms/globalAtoms";
import AuthForm from "../../components/auth/AuthForm";
import MainLayout from "../../layout/MainLayout";
import AuthServices from "../../services/AuthServices";

import hereBg from "../../assets/herobg2.jpg";

function Login() {
  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authState);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    const response = await AuthServices.LoginUser(email, password);

    if (response.accessToken && response.refreshToken) {
      setAuth({
        isAuth: true,
        user: response.user,
      });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
    } else {
      setErrorMessage(response);
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <MainLayout>
      <div className="flex justify-center h-[calc(100vh-56px)]">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${hereBg})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Ceylon Properties
              </h2>
              <p className="max-w-xl mt-3 text-gray-300">
                Ceylon Properties offers a diverse portfolio of exquisite real
                estate solutions, seamlessly blending modern luxury with
                timeless elegance to meet the unique needs and aspirations of
                discerning clients
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-center text-gray-300">
                Ceylon Properties
              </h2>
              <p className="mt-3 text-gray-300 ">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <AuthForm onSubmit={onSubmit} errorMessage={errorMessage} />
              <p className="mt-6 text-sm text-center text-gray-400">
                Don't have an account yet?{" "}
                <button
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                  onClick={() => navigate("/auth/register")}
                >
                  Click here to create one
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
