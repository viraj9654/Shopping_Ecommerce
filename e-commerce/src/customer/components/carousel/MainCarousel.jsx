import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CarouselData } from "./CarouselData";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 2 },
};

const MainCarousel = () => {
  const items = CarouselData.map((item) => (
    <img
      src={item.image}
      alt=""
      role="presentation"
      className="cursor-pointer images -z-10"
    />
  ));

  return (
    <>
      <div className="main-div">
        <AliceCarousel
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          disableButtonsControls
          autoPlay
          autoPlayInterval={1000}
          infinite
          className="alice"
        />
      </div>
    </>
  );
};
export default MainCarousel;
