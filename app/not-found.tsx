import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex-c justify-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src="/assets/images/Logo.svg"
          alt="logo"
          width={130}
          height={30}
          className="object-contain h-auto pb-8"
          priority
        />
        <h1 className="text-3xl font-bold text-center">404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className="custom-btn">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
