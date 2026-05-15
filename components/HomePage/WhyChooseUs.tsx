import React from "react";
import { FaShieldAlt, FaUserCheck, FaLock, FaHandshake } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaUserCheck className="text-5xl text-indigo-600" />,
      title: "Verified Listings",
      description:
        "Every listing undergoes thorough authentication to ensure legitimacy and trustworthiness.",
    },
    {
      icon: <FaLock className="text-5xl text-indigo-600" />,
      title: "Secure Payments",
      description:
        "Bank-grade encryption protects all transactions, ensuring your money is always safe.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-indigo-600" />,
      title: "User Protection",
      description:
        "Comprehensive dispute resolution system and buyer protection policies keep you covered.",
    },
    {
      icon: <FaHandshake className="text-5xl text-indigo-600" />,
      title: "Trust & Safety",
      description:
        "24/7 support team and automated fraud detection to ensure a secure trading environment.",
    },
  ];

  return (
    <section className="my-32 bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Safe & Secure Transactions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your security is our top priority. We've implemented multiple layers
            of protection to ensure safe and reliable transactions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-indigo-100 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
