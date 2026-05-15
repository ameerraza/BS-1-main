import React from "react";
import HeroSection from "../../../components/HomePage/HeroSection";
import Carosol from "../../../components/common/Carosol";

import WhyChooseUs from "../../../components/HomePage/WhyChooseUs";
import FeaturedItems from "../../../components/HomePage/FeaturedItems";
import JoinUs from "../../../components/HomePage/JoinUs";

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg",
    title: "Electronics",
    subtitle: "Laptops, Tablets & More",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg",
    title: "Academic Materials",
    subtitle: "Textbooks & Study Resources",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg",
    title: "Dorm Furniture",
    subtitle: "Desks, Chairs & Storage",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
    title: "Event Supplies",
    subtitle: "Party & Gathering Essentials",
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
    title: "Formal Wear",
    subtitle: "Professional Attire",
  },
];

const bannerData = {
  title: "Swap & Share",
  description:
    "Your one-stop platform for all  rental needs. From textbooks and laptops to formal wear and party supplies, find everything you need for your academic journey. Save money and access quality items when you need them, all verified and trusted by your community.",
  image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg",
  link: "/browse",
};

const Home = () => {
  return (
    <div className="space-y-24 mb-32">
      <HeroSection />
      <div className="py-16">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Featured Categories
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </h2>
        <Carosol slides={slides} />
      </div>
      {/* Single Banner Section */}
      <div className="container-fluid mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 h-[90dvh]">
          <div className="w-full md:w-1/2 space-y-8 px-4">
            <h3 className="text-5xl font-bold text-gray-800">
              {bannerData.title}
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed">
              {bannerData.description}
            </p>
            <button
              className="px-10 py-4 bg-black text-white rounded-full font-semibold 
              hover:bg-gray-800 transition-colors duration-300 text-lg"
            >
              Start Browsing
            </button>
          </div>

          <div className="w-full md:w-1/2 h-full">
            <div className="group relative h-full w-full  overflow-hidden">
              <img
                src={bannerData.image}
                alt={bannerData.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      <FeaturedItems />
      <WhyChooseUs />
      <JoinUs />
    </div>
  );
};

export default Home;
