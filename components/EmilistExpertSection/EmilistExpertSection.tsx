import Image from "next/image";
import Link from "next/link";

const EmilistExpertSection = () => {
  return (
    <div className="padding-x">
      <section className="relative w-full flex justify-center items-center max-xl:flex-col sm:gap-6  sm:pb-14">
        <h2 className="text-3xl font-bold max-md:text-lg xl:hidden max-xl:max-w-[770px]">
          EmiList Private expert
        </h2>
        <div className="flex-1 relative  mx-4 w-full max-xl:max-w-[770px]">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/assets/images/workers.svg"
              alt="menu"
              width={408}
              height={460}
              className="object-contain max-lg:w-[80%]"
            />{" "}
          </div>
          <div className="flex items-center w-full px-10 py-5  shadow-md rounded-xl max-xl:mb-6 max-sm:px-3 max-sm:py-3">
            <div className="mr-4">
              <Image
                src="/assets/dummyImages/profilePic.png"
                alt="menu"
                width={60}
                height={60}
                className="object-cover h-14 w-14 rounded-full"
              />
            </div>
            <div className="flex-1 ">
              <h6 className="sm:text-lg font-bold">Mike Kane</h6>
              <div className="flex items-center my-1">
                <Image
                  src="/assets/icons/star-fill.svg"
                  alt="rate"
                  width={16}
                  height={16}
                  className="object-contain w-5 h-5"
                />
                <Image
                  src="/assets/icons/star-fill.svg"
                  alt="rate"
                  width={16}
                  height={16}
                  className="object-contain w-5 h-5"
                />
                <Image
                  src="/assets/icons/star-fill.svg"
                  alt="rate"
                  width={16}
                  height={16}
                  className="object-contain w-5 h-5"
                />
                <Image
                  src="/assets/icons/star-fill.svg"
                  alt="rate"
                  width={16}
                  height={16}
                  className="object-contain w-5 h-5"
                />
                <Image
                  src="/assets/icons/star.svg"
                  alt="rate"
                  width={16}
                  height={16}
                  className="object-contain w-5 h-5"
                />
              </div>
              <p className=" max-sm:text-sm">
                Find your project dream team today. Start by browsing profiles
                of artisans and handymen, and hire the experts who will bring
                your vision to life.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col max-xl:justify-center max-xl:max-w-[770px] gap-4">
          <h2 className="text-3xl font-bold max-xl:hidden">
            EmiList Private expert
          </h2>
          <p className=" max-xl:text-center max-sm:text-sm">
            Hire private investigators, supervisors, project managers, and other
            professionals to facilitate the successful execution of your
            project.
          </p>
          <div className="w-full flex max-xl:justify-center">
            <Link href="/expert/private-expert">
              <button className="custom-btn">Get Started</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="padding-y">
        <div className="  bg-[#054753] sm:py-14 py-8 rounded-xl flex items-center max-xl:flex-col">
          <div className="flex-1 flex flex-col max-xl:items-center  pl-10 max-xl:w-full max-xl:px-2 max-xl:max-w-[770px]">
            <h5 className="text-white text-3xl font-bold max-xl:text-center max-sm:text-lg">
              Manage your projects from your mobile
            </h5>
            <p className="text-white sm:text-lg my-6 max-xl:text-center font-inter">
              Download the app to manage your projects, keep track of the
              progress and complete tasks without procastinating. Stay on track
              and complete on time!
            </p>

            <div className="xl:hidden flex justify-center">
              <Image
                src="/assets/images/phone.png"
                alt="logo"
                width={354}
                height={372}
                className="object-cover w-[350px] rounded-lg h-[372px]"
              />
            </div>
            <h6 className="text-white sm:text-lg font-semibold mb-3">
              GET THE APP
            </h6>
            <div className="flex gap-4">
              <Link href="/">
                {" "}
                <Image
                  src="/assets/images/playstore.png"
                  alt="logo"
                  width={169}
                  height={49}
                  className="object-contain w-auto h-10"
                />
              </Link>

              <Link href="/">
                <Image
                  src="/assets/images/googleplay.png"
                  alt="logo"
                  width={200}
                  height={55}
                  className="object-contain w-auto h-10"
                />
              </Link>
            </div>
          </div>
          <div className="flex-1 relative max-xl:hidden">
            <Image
              src="/assets/images/phone.png"
              alt="logo"
              width={700}
              height={500}
              className="absolute object-cover -bottom-[300px]  w-full rounded-lg h-[600px] max-md:h-[400px]   "
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmilistExpertSection;
