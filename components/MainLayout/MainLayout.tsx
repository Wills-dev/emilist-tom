import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="relative ">
      <Nav />
      {children}
      <NewsLetter />
      <Footer />
    </main>
  );
};

export default MainLayout;
