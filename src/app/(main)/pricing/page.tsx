"use client";
import React, { useState } from "react";

const pricingPlans = [
  {
    name: "Starter",
    price: 0,
    features: [
      "List up to 5 products",
      "Basic product analytics",
      "Standard support",
      "Community access",
      "Basic chat features",
    ],
  },
  {
    name: "Business",
    price: 8000,
    features: [
      "List up to 25 products",
      "Advanced analytics",
      "Priority support",
      "Featured listings",
      "Enhanced chat features",
      "Verified seller badge",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: 15000,
    features: [
      "List up to 100 products",
      "Premium analytics",
      "24/7 Priority support",
      "Premium featured listings",
      "Advanced chat features",
      "Custom branding",
      "API access",
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="py-16 flex flex-col justify-center items-center w-full max-w-6xl mx-auto">
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h2 className="text-4xl mb-4 font-bold text-gray-800">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg">
            Select the perfect plan for your needs. List more products and
            unlock premium features to grow your business on SwapShare.
          </p>
        </div>
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 font-medium ${
              billingCycle === "monthly"
                ? "bg-primary text-white"
                : "text-primary bg-white"
            } rounded-full transition-all`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 font-medium ${
              billingCycle === "yearly"
                ? "bg-primary text-white"
                : "text-primary bg-white"
            } rounded-full transition-all`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between gap-5 rounded-xl p-6 ${
              plan.isPopular
                ? "bg-primary text-white shadow-xl"
                : "bg-white shadow-lg"
            }`}
          >
            <div className="w-full">
              {plan.isPopular && (
                <div className="flex justify-end mb-4">
                  <span className="bg-secondary text-primary px-3 py-1 text-sm rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <p className="text-4xl font-bold mb-4">
                Rs. {billingCycle === "yearly" ? plan.price * 10 : plan.price}
                <span className="text-base font-normal">
                  /{billingCycle === "yearly" ? "year" : "month"}
                </span>
              </p>
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <ul className="mb-6 flex flex-col gap-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 ${
                      plan.isPopular ? "text-white" : "text-gray-600"
                    } text-sm`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full py-3 font-medium rounded-lg transition-all ${
                plan.isPopular
                  ? "bg-white text-primary hover:bg-gray-100"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
