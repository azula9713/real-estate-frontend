type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string;
};

function AuthForm({ onSubmit, errorMessage }: Readonly<AuthFormProps>) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div>
        <label htmlFor="email" className="block mb-2 text-sm text-white">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="example@example.com"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <label htmlFor="password" className="text-sm text-white">
            Password
          </label>
        </div>
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Your Password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {errorMessage && (
        <div className="mt-4 text-red-500">
          <p>{errorMessage}</p>
        </div>
      )}

      <div className="mt-6">
        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Sign in
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
