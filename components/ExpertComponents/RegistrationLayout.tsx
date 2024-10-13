import RegistrationNav from "./RegistrationNav";
import RegistrationGuide from "./RegistrationGuide";

interface RegistrationLayoutProps {
  children: React.ReactNode;
}

const RegistrationLayout = ({ children }: RegistrationLayoutProps) => {
  return (
    <main className="relative">
      <RegistrationNav />
      <div className="max-md:hidden">
        <RegistrationGuide />
      </div>
      {children}
    </main>
  );
};

export default RegistrationLayout;
