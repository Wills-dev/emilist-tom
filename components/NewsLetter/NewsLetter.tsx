"use client";

import { useSubscribeNewsLetter } from "@/hooks/useSubscribeNewsLetter";

const NewsLetter = () => {
  const { loading, setEmail, email, handleSubmit } = useSubscribeNewsLetter();

  return (
    <section className=" padding-x mb-8">
      <h4 className="text-gray-900 text-3xl font-semibold mb-3  max-sm:text-2xl">
        Subscribe to Our Newsletter
      </h4>
      <div className="flex-c max-lg:flex-col max-lg:items-start max-lg:max-w-[770px] w-full gap-7 max-lg:gap-2">
        <div className="flex-1">
          <p className="mb-3  max-sm:text-sm">
            Be the first to get latest updates from us and get more information
            about our products
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className=" flex-1 w-full flex-c-b  shadow-lg h-12 rounded-lg"
        >
          <div className="flex-1 flex items-center px-2  rounded-l-lg border-light-gray border-1 focus-within:border-primary-green h-full  max-lg:h-12">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="focus:outline-none max-md:text-sm w-full bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {loading ? (
            <button className="bg-green-300 w-32 max-sm:w-24 h-full max-lg:h-12 border-green-300 border-1 rounded-r-md text-white">
              <span className="loading loading-dots loading-lg"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary-green w-32 max-sm:w-24 h-full max-lg:h-12 border-primary-green border-1 rounded-r-lg text-white  max-sm:text-sm"
            >
              Subscribe
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
