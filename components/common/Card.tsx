import { useRouter } from "next/navigation";
import React from "react";

const Card = ({ slide }: any) => {
  const router = useRouter();
  const handlePageChange = (title: any) => {
    router.push(`/search?category=${title}`);
  };
  return (
    <div
      className="p-1 transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onClick={() => handlePageChange(slide.title)}
    >
      <div className="relative h-[400px] w-full rounded overflow-hidden shadow-lg">
        <img
          src={slide.image}
          alt={slide.title}
          className="object-cover h-full w-full transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="h-full flex flex-col justify-end gap-2">
            <h2 className="text-white/90 text-lg font-medium tracking-wide">
              {slide.title}
            </h2>
            <h3 className="text-white text-2xl font-bold mb-2 leading-tight">
              {slide.subtitle}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
