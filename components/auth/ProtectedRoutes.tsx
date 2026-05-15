"use client";
import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useLoaderStore } from "@/stores/useLoaderStore";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoaderStore();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    showLoader();
    const authToken = Cookies.get("authToken");

    setTimeout(() => {
      if (!authToken) {
        setIsAuthorized(false);
        hideLoader();
        router.push("/authentication?login");
      } else {
        setIsAuthorized(true);
        hideLoader();
      }
    }, 1000); // 1 second delay
  }, [router]);

  if (isAuthorized === null) {
    return null; // or a loading spinner if you prefer
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoutes;
