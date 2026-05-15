"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import heroImage from "../../public/heroSection.jpg";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button";
import Link from "next/link";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div
      className="relative h-[80dvh] w-full overflow-hidden"
      style={{ userSelect: "none" }}
    >
      <Image
        src={heroImage}
        alt="Hero background"
        fill
        priority
        loading="eager"
        quality={60}
        className="object-cover transition-transform duration-300"
        placeholder="blur"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-950/50 to-blue-950/70" />
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4">
        <div className="animate-fade-in space-y-6 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent transition-all duration-300 sm:text-4xl md:text-5xl lg:text-6xl [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
            One Platform, Endless Possibilities
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-100 sm:text-xl">
            Connect with trusted neighbors and share resources in your
            community. Save money, reduce waste, and make friends.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="w-full max-w-2xl animate-slide-up">
              <Suspense
                fallback={
                  <div className="h-12 rounded-lg bg-white/20 animate-pulse"></div>
                }
              >
                <SearchBar />
              </Suspense>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2 md:gap-4">
            <button
              className="text-sm md:text-base rounded-full bg-white px-3 md:px-8 py-2 md:py-3 font-semibold text-blue-950 transition-all hover:bg-opacity-90 hover:shadow-lg"
              onClick={() => router.push("/authentication?signup")}
            >
              Join Community
            </button>
            <button
              className="text-sm md:text-base rounded-full border-2 border-white bg-transparent px-3 md:px-8 py-2 font-semibold text-white transition-all hover:bg-white/10"
              onClick={() => router.push("/about-us")}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="text-center mt-6">
          <Button variant="primary">
            <Link href="/become-vendor">Start Earning Today!</Link>
          </Button>
        </div>
        {/* <div className="mt-8 flex justify-center">
          <div className="flex gap-4 rounded-full bg-white/10 backdrop-blur-md px-4 md:px-6 py-3">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                10K+
              </div>
              <div className="text-xs md:text-sm text-gray-200">
                Active Users
              </div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                50K+
              </div>
              <div className="text-xs md:text-sm text-gray-200">
                Items Shared
              </div>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default HeroSection;
