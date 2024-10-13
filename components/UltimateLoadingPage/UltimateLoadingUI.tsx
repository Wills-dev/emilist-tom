import Image from "next/image";

const UltimateLoadingUI = () => {
  return (
    <div className="h-screen w-full bg-white flex-c justify-center absolute top-0 left-0 right-0 z-20">
      <div className="flex flex-col">
        <Image
          src="/assets/images/Logo.svg"
          alt="logo"
          width={130}
          height={30}
          className="object-contain h-auto"
          priority
        />
        <p className="text-primary-green flex-c justify-center py-5">
          <span className="loading loading-infinity loading-lg"></span>
        </p>
      </div>
    </div>
  );
};

export default UltimateLoadingUI;
