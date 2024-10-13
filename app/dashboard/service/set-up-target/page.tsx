import DashboardNav from "@/components/DashboardComponents/DashboardNav";
import Image from "next/image";

const page = () => {
  return (
    <main className="relative">
      <DashboardNav />
      <section className="py-28 padding-x">
        {" "}
        <div className="  w-full ">
          <div className="w-full mt-10 max-md:mt-5">
            <h1 className="sm:text-3xl font-bold text-xl">
              Set up your monthly/ yearly targets
            </h1>

            <div className="grid grid-cols-4 gap-10 w-full py-6 mt-6">
              <div className="col-span-2  max-sm:col-span-4 flex flex-col gap-2">
                <p className="sm:text-xl font-semibold">
                  Set up target for monthly or yearly
                </p>
                <div className="flex items-center">
                  <Image
                    src="/assets/icons/circle.svg"
                    alt="menu"
                    width={25}
                    height={25}
                    className="object-contain w-6 h-6"
                  />{" "}
                  <label htmlFor="Emi Preferred" className="ml-3">
                    Monthly
                  </label>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/assets/icons/circle.svg"
                    alt="menu"
                    width={25}
                    height={25}
                    className="object-contain w-6 h-6"
                  />{" "}
                  <label htmlFor="Emi Preferred" className="ml-3">
                    Yearly
                  </label>
                </div>
              </div>
              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Number of times you want to be referred
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="50 "
                  />
                </div>
              </div>
              <div className="col-span-2 max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Job
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="10"
                  />
                </div>
              </div>
              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Number of friends you want to invite
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="50 "
                  />
                </div>
              </div>

              <div className="col-span-2  max-sm:col-span-4">
                <p className="text-[#5e625f] py-2 font-medium max-sm:text-sm">
                  Amount
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="expert-reg-input"
                    placeholder="#500,000"
                  />
                </div>
              </div>

              <div className="flex  my-20 justify-center col-span-4">
                <button className="custom-btn">Set Target</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
