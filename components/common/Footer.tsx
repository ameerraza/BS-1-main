import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/about-us", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    {
      href: "/pricing-liabilities",
      label: "Payment Terms, Late Fees & Liabilities",
    },
    { href: "/contact-us", label: "Contact" },
  ];

  const policyLinks = [
    { href: "/data-retention", label: "Data Retention Policy" },
    { href: "/third-party-links", label: "Third Party Links" },
    { href: "/policy-updates", label: "Policy Updates" },
  ];

  const privacyLinks = [
    { href: "/information-we-get", label: "Information We Collect" },
    {
      href: "/how-we-use-your-information",
      label: "How We Use Information",
    },
    { href: "/user-rights", label: "User Rights" },
    { href: "/security-measures", label: "Security Measures" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: FaFacebook,
      hoverColor: "hover:text-blue-400",
    },
    {
      href: "https://twitter.com",
      icon: FaTwitter,
      hoverColor: "hover:text-blue-400",
    },
    {
      href: "https://instagram.com",
      icon: FaInstagram,
      hoverColor: "hover:text-pink-400",
    },
    {
      href: "https://linkedin.com",
      icon: FaLinkedin,
      hoverColor: "hover:text-blue-400",
    },
  ];

  const bottomLinks = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/cookies-tracking", label: "Cookies" },
  ];

  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-fluid mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Company Info - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">SwapNShare</h3>
            <p className="text-gray-300 text-base mb-8 max-w-md">
              One Platform, Endless Possibilities
            </p>
            {/* Newsletter Subscription */}
            <div className="mb-8">
              {/* <h4 className="text-lg font-semibold mb-4">Stay Connected</h4> */}
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Subscribe
                </button>
              </div> */}
            </div>
            {/* Social Links */}
            <div className="flex gap-6">
              {socialLinks.map(({ href, icon: Icon, hoverColor }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${hoverColor} transition-colors duration-200`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Legal & Privacy</h3>
            <ul className="space-y-4">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Privacy Information */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Privacy Information</h3>
            <ul className="space-y-4">
              {privacyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300">
              © {new Date().getFullYear()} SwapShare. All rights reserved.
            </div>
            <div className="flex gap-8">
              {bottomLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
