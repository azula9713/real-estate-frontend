import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

function Home() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className="bg-transparent text-white h-full w-full">
        <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
            <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
              Ceylon Properties
            </h1>
            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
              Real Estate done right
            </h2>
            <p className="text-sm md:text-base text-gray-50 mb-4">
              Ceylon Properties offers a diverse portfolio of exquisite real
              estate solutions, seamlessly blending modern luxury with timeless
              elegance to meet the unique needs and aspirations of discerning
              clients
            </p>
            <button
              onClick={() => navigate("/find-listings")}
              className="bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
            >
              Explore Now
            </button>
          </div>
          <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
            <div className="flex flex-wrap content-center">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/657b29edf09ae8354c4debba/Real-estate-agents-shake-hands-after-the-signing-of-the-contract-agreement-is/960x0.jpg"
                alt="home"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
