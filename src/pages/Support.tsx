import MainLayout from "../layout/MainLayout";

function Support() {
  return (
    <MainLayout>
      <div className="container mx-auto mt-8 p-4 text-white">
        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Category Card 1 */}
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Buying a Property</h2>
            <p className="text-gray-200">
              Learn how to find and purchase your dream home with our
              step-by-step guide.
            </p>
            <button className="text-blue-500 hover:underline mt-4 inline-block">
              Read More
            </button>
          </div>
          {/* Category Card 2 */}
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4 text-white">
              Selling a Property
            </h2>
            <p className="text-gray-200">
              Get tips on how to sell your property quickly and at the best
              price possible.
            </p>
            <button className="text-blue-500 hover:underline mt-4 inline-block">
              Read More
            </button>
          </div>
          {/* Category Card 3 */}
          <div className="bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Technical Support</h2>
            <p className="text-gray-200">
              Having issues with our website or app? Find solutions here.
            </p>
            <button className="text-blue-500 hover:underline mt-4 inline-block">
              Get Help
            </button>
          </div>
        </div>
        {/* Contact Form */}
        <div className="mt-8 bg-gray-900 p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <form action="#" method="post">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-200"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-200"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 p-2 w-full border rounded-md bg-gray-800 text-white"
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Support;
