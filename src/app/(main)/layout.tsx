"use client";
import React from "react";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import JoinUs from "../../../components/HomePage/JoinUs";
import { usePathname } from "next/navigation";
import WhyChooseUs from "../../../components/HomePage/WhyChooseUs";
import ChatIcon from "../../../components/common/ChatIcon";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname: any = usePathname();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow">{children}</main>
      {pathname.includes("chat") ? null : (
        <>
          <Footer />
          <ChatIcon />
        </>
      )}
    </div>
  );
};

export default RootLayout;
