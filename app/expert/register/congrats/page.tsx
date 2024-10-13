import Link from "next/link";

import RegistrationNav from "@/components/ExpertComponents/RegistrationNav";

const Congrats = () => {
  return (
    <main className="relative">
      <RegistrationNav />
      <div className="w-full h-screen relative pt-24">
        <div className="w-full h-[40vh] bg-congrats-banner bg-cover bg-center bg-no-repeat"></div>

        <div className="w-full flex-c flex-col gap-4">
          <h1 className=" text-4xl font-bold mb-3  max-sm:text-2xl ">
            Congratulations!!!
          </h1>
          <p>You have successfully set up a service</p>
          <div className="flex gap-4 pt-10 max-md:flex-col max-md:w-full px-8">
            <Link
              href="/expert/register"
              className=" px-6 text-center rounded-lg font-medium  mt-15 whitespace-nowrap max-sm:text-sm max-sm:px-5  border-1 border-[#303632] py-3"
            >
              Set up another service
            </Link>
            <Link href="/dashboard/jobs" className="custom-btn ">
              Proceed to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Congrats;
