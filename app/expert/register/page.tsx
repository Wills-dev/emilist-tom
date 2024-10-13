import Nav from "@/components/Nav/Nav";
import RegistrationGuide from "@/components/ExpertComponents/RegistrationGuide";
import RegistrationFormOne from "@/components/ExpertComponents/RegistrationFormOne";

const page = () => {
  return (
    <main className="relative">
      <Nav />
      <RegistrationGuide />
      <RegistrationFormOne />
    </main>
  );
};

export default page;
