"use client";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "./Card";

interface CarosolProps {
  slides: {
    id: number;
    image: string;
    title: string;
    subtitle: string;
  }[];
}

const Carosol: React.FC<CarosolProps> = ({ slides }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const CustomButtonGroup = ({ next, previous }: any) => (
    <>
      <button
        onClick={previous}
        className=" absolute left-0 top-1/2 -translate-y-1/2 z-10  rounded-full"
      >
        <svg
          width={18}
          height={28}
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 1L1 7L7 13"
            stroke="#0b1027"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10  rounded-full"
      >
        <svg
          width={18}
          height={28}
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L1 13"
            stroke="#0b1027"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="w-full relative">
        <Carousel
          responsive={responsive}
          infinite={true}
          customButtonGroup={<CustomButtonGroup />}
          arrows={false}
          renderButtonGroupOutside={true}
          draggable={false}
          autoPlay={true}
          autoPlaySpeed={3000}
          shouldResetAutoplay={true}
          rewind={false}
          rewindWithAnimation={true}
        >
          {slides.map((slide: any) => (
            <Card slide={slide} key={slide.id} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Carosol;
