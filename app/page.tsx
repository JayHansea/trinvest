import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import Coinprice from "@/components/Coinprice";
import FAQs from "@/components/FAQs";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomBanner from "@/components/BottomBanner";

export default function Home() {
  return (
    <main>
      <div className="w-full bg-banner-bg bg-center bg-no-repeat bg-cover">
        <div className="w-full bg-black opacity-80 text-white">
          <Navbar />
          <Banner />
        </div>
      </div>
      <Coinprice />
      <AboutUs />
      <Pricing />
      <FAQs />
      <Contact />
      <BottomBanner />
      <Footer />
    </main>
  );
}
