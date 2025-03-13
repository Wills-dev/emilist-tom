import Image from "next/image";

import MainLayout from "@/components/MainLayout/MainLayout";
import Banner from "../../public/assets/images/Frame 27482.png";
import AboutUsImage from "../../public/assets/images/Rectangle 5678.png";
import EmilistExpertSection from "@/components/EmilistExpertSection/EmilistExpertSection";
import Link from "next/link";

const page = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-10">
        <div className="">
          <Image
            src={Banner}
            placeholder="blur"
            alt="banner"
            className="w-full"
          />
        </div>
        <div className="flex-c justify-center py-10">
          <h3 className="max-w-lg text-center sm:text-2xl text-xl">
            At Emilist, we’re connecting every business to the world’s most
            skilled worker, in the simplest way possible.
          </h3>
        </div>
        <div className="flex gap-10 max-md:first-line:flex-col padding-x pb-14">
          <div className="flex-1">
            <p className="sm:text-lg">
              Emilist is a global powerhouse, connecting skilled and unskilled
              workers with businesses across an impressive network of
              approximately 160 countries. Since its founding in 2025, the
              company has established itself as a leader in workforce solutions,
              bridging talent with opportunity on an international scale.
              Headquartered in California, USA, Emilist operates with a truly
              global presence, maintaining satellite offices in key cities
              including New York, Lagos, London, Kyiv, Berlin, and Orlando. This
              strategic footprint allows Emilist to offer localized support and
              services while maintaining the agility to respond to global market
              needs. With a diverse portfolio of industries and a commitment to
              fostering economic growth through meaningful employment
              opportunities, Emilist is dedicated to empowering businesses and
              individuals alike. The company’s robust infrastructure and
              innovative approach make it a trusted partner in workforce
              management, delivering excellence from small enterprises to
              multinational corporations around the world.
            </p>
          </div>
          <div className="flex-1 w-full">
            <Image src={AboutUsImage} placeholder="blur" alt="banner" />
          </div>
        </div>
        <section className="my-14 padding-x">
          <div className="  bg-[#054753] sm:py-14 py-8 rounded-xl flex items-center max-xl:flex-col">
            <div className="flex-1 flex flex-col max-xl:items-center  pl-10 max-xl:w-full max-xl:px-2 max-xl:max-w-[770px]">
              <h5 className="text-white text-3xl font-bold max-xl:text-center max-sm:text-lg">
                Manage your projects from your mobile
              </h5>
              <p className="text-white sm:text-lg my-6 max-xl:text-center font-inter">
                Download the app to manage your projects, keep track of the
                progress and complete tasks without procastinating. Stay on
                track and complete on time!
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
    </MainLayout>
  );
};

export default page;
