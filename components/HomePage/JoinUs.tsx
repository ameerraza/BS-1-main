import { FaMoneyBillWave, FaStore, FaShieldAlt } from "react-icons/fa";
import { Button } from "../common/Button";
import Link from "next/link";

interface JoinFeature {
  icon: any;
  title: string;
  description: string;
}

const JoinUs = () => {
  const features: JoinFeature[] = [
    {
      icon: <FaMoneyBillWave size={40} className="text-primary" />,
      title: "Earn Money Renting Your Items",
      description:
        "Turn your unused items into a source of income. Connect with local users and make extra cash by renting out your gear, equipment, or other valuable items. Soon, your rentals could pay for themselves!",
    },
    {
      icon: <FaStore size={40} className="text-primary" />,
      title: "Sell Your Items & Keep More of Your Money",
      description:
        "List your items for sale in a thriving marketplace. Enjoy strong seller protections and low fees—only 5%, with a maximum cap of $500—so you keep more of what you earn.",
    },
    {
      icon: <FaShieldAlt size={40} className="text-primary" />,
      title: "Renter & Seller Guarantees",
      description:
        "We provide extensive coverage options, rental protections, and seller guarantees to ensure a safe and secure experience for everyone.",
    },
  ];

  return (
    <div className="container-fluid py-12 bg-gray-400/80 backdrop-blur-sm rounded-sm space-y-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Rent or Sell Your Gear
          </h2>
          <p className="text-gray-100">
            Join thousands of owners who have listed over $1 billion worth of
            items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 cursor-default">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary">
            <Link href="/become-vendor">Start Earning Today!</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
