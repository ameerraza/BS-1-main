"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileForm from "../../../../components/profile/ProfileForm";
import OrderHistory from "../../../../components/profile/OrderHistory";
import ProtectedRoutes from "../../../../components/auth/ProtectedRoutes";

const ProfileDetails = () => {
  const [userData, setUserData] = useState();
  const router = useRouter();

  const list = ["Personal Details", "Order History", "Logout"];
  const handleLogout = async () => {};
  const [activeTab, setActiveTab] = useState("Personal Details");

  return (
    <ProtectedRoutes>
      <div className="container-fluid mx-auto px-4 sm:px-6 lg:px-8 my-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-sm">
            <ul className="divide-y divide-gray-200">
              {list.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    if (item === "Logout") {
                      handleLogout();
                    } else {
                      setActiveTab(item);
                    }
                  }}
                  className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    activeTab === item
                      ? "bg-primary-50 text-primary-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {activeTab === "Personal Details" ? (
              <ProfileForm userData={userData} />
            ) : activeTab === "Order History" ? (
              <OrderHistory />
            ) : activeTab === "Support" ? (
              <div className="min-h-[400px] flex items-center justify-center text-gray-500">
                Support Section Coming Soon
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default ProfileDetails;
