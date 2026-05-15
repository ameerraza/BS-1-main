import type { Metadata } from "next";
import "./globals.css";
import { Urbanist } from "next/font/google";
import Loader from "../../components/common/Loader";
import ToastProvider from "../../components/common/ToastProvider";
const urbanist = Urbanist({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "SwapNShare",
  description: "The most trusted sharing community",
};
//
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.className} min-h-screen flex flex-col antialiased`}
      >
        <Loader />
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
