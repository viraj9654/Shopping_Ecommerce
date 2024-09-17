import React from "react";
import HomeSection from "./HomeSection";
import CateogrySection from "./CateogrySection";
import Promo from "./Promo";
import Footer from "./Footer";
import Navigation from "../Navigation";
const Main = () => {
  return (
    <>
      <Navigation />
      <HomeSection />
      <CateogrySection />
      <Promo />
      <Footer />
    </>
  );
};

export default Main;
