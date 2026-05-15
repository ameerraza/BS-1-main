import Image from "next/image";
import { images } from "@/utils/images";
import {
  Search,
  MessageCircle,
  CreditCard,
  Package,
  Star,
  Upload,
  Users,
  DollarSign,
  Key,
  BadgeCheck,
} from "lucide-react";

const steps = {
  buyers: [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse Listings",
      description:
        "Explore available products, properties, or rentals using filters for categories, location, and price.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Contact the Seller or Landlord",
      description:
        "Use the platform's chat or call option to discuss details, negotiate, and ask questions.",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Make a Secure Payment",
      description:
        "Use our secure payment gateway or choose cash-on-delivery (if applicable). For rentals, ensure deposits and rental agreements are finalized.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Receive Your Product or Move In",
      description:
        "Coordinate pickup/delivery for purchases or property handover for rentals.",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Leave a Review",
      description:
        "Share your experience and rate the seller/landlord to help other users.",
    },
  ],
  sellers: [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Create a Listing",
      description:
        "Sign up and post your product, service, or rental property with detailed descriptions & images.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Get Buyer/Renter Inquiries",
      description:
        "Interested users will contact you via chat, call, or email.",
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Negotiate & Confirm",
      description:
        "Finalize the price and terms before proceeding with the sale or rental agreement.",
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Deliver the Product or Hand Over the Property",
      description: "Arrange for delivery, pickup, or property access.",
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: "Get Paid & Receive Feedback",
      description:
        "Complete the transaction and receive payment via secure methods. Encourage buyers/renters to leave a review to boost credibility.",
    },
  ],
};

export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-16">How It Works</h1>

      {/* Buyers/Renters Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              For Buyers & Renters
            </h2>
            <p className="text-gray-600">
              Finding and securing your next purchase or rental is easy with our
              straightforward process.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 w-full">
            <Image
              src={images.buy.src}
              alt="Buyers Guide"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.buyers.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <div className="text-primary">{step.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sellers/Landlords Section */}
      <section>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              For Sellers & Lenders
            </h2>
            <p className="text-gray-600">
              Turn your items into cash or find the perfect tenant with our
              efficient listing process.
            </p>
          </div>
          <div className="md:w-1/2 relative h-64 w-full">
            <Image
              src={images.sell.src}
              alt="Sellers Guide"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.sellers.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <div className="text-primary">{step.icon}</div>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Step {index + 1}: {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
