import { FC } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { images } from "@/utils/images";
import {
  FiInfo,
  FiEye,
  FiMonitor,
  FiCreditCard,
  FiShield,
  FiMail,
  FiLock,
  FiUserCheck,
  FiRefreshCw,
  FiLink,
  FiAlertCircle,
  FiBell,
  FiFileText,
  FiClock,
  FiAlertTriangle,
  FiUser,
  FiTrash2,
  FiSettings,
  FiHelpCircle,
  FiPieChart,
  FiUsers,
  FiCamera,
} from "react-icons/fi";
import { HiOutlineCreditCard, HiOutlineShieldCheck } from "react-icons/hi2";
import { Metadata } from "next";

const pages: any = {
  "privacy-policy": {
    title: "Privacy Policy",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.privacy}
            fill
            className="object-cover rounded-lg"
            alt="Privacy and Security"
            priority
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Effective Date: January 1, 2024
              <br />
              Last Updated: January 1, 2024
            </p>

            <p className="text-gray-700 leading-relaxed">
              SwapNShare values your privacy and is committed to protecting your
              personal data. This Privacy Policy outlines how we collect, use,
              disclose, and safeguard your personal information when you use our
              platform for buying, selling, and renting properties and goods in
              Pakistan.
            </p>

            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <FiInfo className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-blue-700 text-sm">
                By accessing or using our services, you agree to this Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  "customer-support": {
    title: "Customer Support",
    content: "This is the customer support page content...",
  },
  "about-us": {
    title: "About Us",
    content: (
      <div className="space-y-8">
        <section className="bg-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Your ultimate destination for renting, buying, and selling with
              ease! We believe in smart living—why own what you can rent? Why
              let things collect dust when you can sell them?
            </p>
          </div>
          <div className="md:w-1/2 relative h-80 w-full group">
            <Image
              {...images.mission}
              fill
              className="object-cover rounded-lg transition-transform group-hover:scale-105"
              priority
            />
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                ...images.rent,
                title: "Rent",
                desc: "Need something temporarily? From formal attire to projectors, find what you need.",
              },
              {
                ...images.buy,
                title: "Buy",
                desc: "Browse through quality pre-owned items at great prices.",
              },
              {
                ...images.sell,
                title: "Sell",
                desc: "Turn your unused items into cash. List easily and reach potential buyers.",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 border rounded-lg group">
                <div className="relative h-56 w-full mb-4 overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm flex flex-col-reverse md:flex-row gap-8 items-center">
          <div className="md:w-1/2 relative h-80 w-full group">
            <Image
              {...images.vision}
              fill
              className="object-cover rounded-lg transition-transform group-hover:scale-105"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform is designed to make life simpler, more affordable,
              and sustainable. We're building a community where sharing
              resources becomes the smart choice for a better future.
            </p>
          </div>
        </section>
      </div>
    ),
  },
  "information-we-get": {
    title: "Information We Collect",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.dataCollection}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FiEye className="w-6 h-6 text-primary" />
              1.1 Personal Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address/location</li>
                <li>Government-issued ID (for verification, if required)</li>
                <li>
                  Payment details (processed via secure third-party gateways)
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FiMonitor className="w-6 h-6 text-primary" />
              1.2 Usage and Device Information
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>IP address</li>
                <li>Device type, operating system, and browser</li>
                <li>Pages visited and time spent</li>
                <li>Location data (if enabled)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <FiCreditCard className="w-6 h-6 text-primary" />
              1.3 Transaction Data
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Listing details</li>
                <li>Communication history with buyers/sellers/renters</li>
                <li>Payment and transaction history</li>
              </ul>
            </div>
          </section>

          <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg mt-8">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
              <FiInfo className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-blue-700 text-sm">
              We are committed to protecting your privacy and ensuring the
              security of your personal information. All data is collected and
              processed in accordance with applicable privacy laws and
              regulations.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  "how-we-use-your-information": {
    title: "How We Use Your Information",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.dataUsage}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <FiCreditCard className="w-8 h-8 text-primary" />,
                title: "Transactions",
                description:
                  "Enabling buying, selling, and renting transactions on our platform",
              },
              {
                icon: <FiShield className="w-8 h-8 text-primary" />,
                title: "Security",
                description:
                  "Account security and management to protect your data",
              },
              {
                icon: <FiMail className="w-8 h-8 text-primary" />,
                title: "Communications",
                description:
                  "Sending updates, transaction confirmations, and marketing messages",
              },
              {
                icon: <FiLock className="w-8 h-8 text-primary" />,
                title: "Protection",
                description:
                  "Fraud prevention and security monitoring for safe transactions",
              },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
            <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
              <FiInfo className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-blue-700 text-sm">
              You can opt-out of marketing communications at any time. We
              process and store your data in compliance with applicable laws and
              regulations.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  "pricing-liabilities": {
    title: "Payment Terms, Late Fees & Liabilities",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.pricing}
            className="object-cover rounded-lg"
            alt="Pricing and Payment Terms"
            priority
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          {/* Payment Obligations */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <HiOutlineCreditCard className="w-6 h-6 text-primary" />
              Payment Obligations
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  All payments must be made according to agreed terms at
                  transaction time
                </li>
                <li>
                  Payment methods must be verified and approved before use
                </li>
                <li>Delayed payments will result in account restrictions</li>
                <li>
                  Multiple payment delays may lead to permanent account
                  suspension
                </li>
              </ul>
            </div>
          </section>

          {/* Late Fees & Penalties */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiClock className="w-6 h-6 text-primary" />
              Late Fees & Penalties
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Late fee of 5% applies per day/week on delayed payments</li>
                <li>Continuous non-payment will result in legal action</li>
                <li>
                  Late returns of rented items incur additional daily charges
                </li>
                <li>
                  Repeated violations may be reported to relevant authorities
                </li>
              </ul>
            </div>
          </section>

          {/* Rental Policy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiFileText className="w-6 h-6 text-primary" />
              Rental Property and Goods Usage Policy
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div>
                <h4 className="font-medium mb-2">Renter Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Maintain rented items in original condition</li>
                  <li>Report any damage immediately</li>
                  <li>Follow provided usage guidelines</li>
                  <li>Return items on time and in proper condition</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Damage and Compensation:</h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>All damage beyond normal wear must be compensated</li>
                  <li>Security deposits will be deducted for damages</li>
                  <li>
                    Additional charges apply if repair costs exceed deposit
                  </li>
                  <li>Failure to compensate may result in legal action</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Dispute Resolution */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiHelpCircle className="w-6 h-6 text-primary" />
              Dispute Resolution
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>
                  All disputes must be reported within 15 days of transaction
                  completion
                </li>
                <li>
                  Provide detailed documentation and evidence to support your
                  claim
                </li>
                <li>
                  Our team will review and facilitate resolution between parties
                </li>
                <li>Legal action should only be pursued as a last resort</li>
                <li>
                  Both parties must participate in the resolution process in
                  good faith
                </li>
              </ul>
            </div>
          </section>

          <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg mt-4">
            <div className="w-12 h-12 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-yellow-800 text-sm">
              By proceeding with any transaction, you agree to these payment
              terms and conditions. Make sure to read and understand all
              policies before renting or purchasing.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  "user-rights": {
    title: "User Rights & Data Control",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.dataControl}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiUser className="w-8 h-8 text-primary" />,
                  title: "Access & Update",
                  description:
                    "View and modify your personal information in your account settings at any time.",
                },
                {
                  icon: <FiTrash2 className="w-8 h-8 text-primary" />,
                  title: "Account Deletion",
                  description:
                    "Request complete removal of your account and associated data.",
                },
                {
                  icon: <FiSettings className="w-8 h-8 text-primary" />,
                  title: "Marketing Preferences",
                  description:
                    "Control your email preferences and opt-out of marketing communications.",
                },
                {
                  icon: <FiHelpCircle className="w-8 h-8 text-primary" />,
                  title: "Support Access",
                  description:
                    "Contact our support team for assistance with your data rights.",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-blue-900">
                How to Exercise Your Rights
              </h3>
              <p className="text-blue-800">
                To exercise any of these rights, please contact our support team
                at{" "}
                <a href="mailto:support@swapnshare.com" className="underline">
                  support@swapnshare.com
                </a>
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Include your full name and account email</li>
                <li>Specify which right you wish to exercise</li>
                <li>
                  Provide any relevant details to help us process your request
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-yellow-800 text-sm">
                We aim to respond to all requests within 72 hours. Some requests
                may require additional verification of identity for security
                purposes.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  "security-measures": {
    title: "Security Measures",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.security}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Security Measures"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
              Our Security Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiShield className="w-8 h-8 text-primary" />,
                  title: "Encrypted Storage",
                  description:
                    "All sensitive data is encrypted using industry-standard protocols",
                },
                {
                  icon: <FiLock className="w-8 h-8 text-primary" />,
                  title: "Secure Payments",
                  description:
                    "Trusted payment gateways with PCI DSS compliance",
                },
                {
                  icon: <FiUserCheck className="w-8 h-8 text-primary" />,
                  title: "Fraud Monitoring",
                  description:
                    "24/7 automated system monitoring for suspicious activities",
                },
                {
                  icon: (
                    <HiOutlineShieldCheck className="w-8 h-8 text-primary" />
                  ),
                  title: "User Verification",
                  description:
                    "Multiple layers of verification for high-value transactions",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-yellow-900">
                User Security Recommendations
              </h3>
              <ul className="list-disc list-inside text-yellow-800 space-y-2">
                <li>Use strong, unique passwords for your account</li>
                <li>Enable two-factor authentication when available</li>
                <li>Never share login credentials or verification codes</li>
                <li>Report suspicious activities immediately</li>
                <li>Keep your device and browser updated</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-blue-700 text-sm">
                While we implement robust security measures, online platforms
                inherently carry some risk. Always exercise caution and follow
                security best practices when using our services.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  "cookies-tracking": {
    title: "Cookies & Tracking Technologies",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.cookies}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Cookies and Tracking"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiUsers className="w-8 h-8 text-primary" />,
                  title: "User Experience",
                  description:
                    "Remembering preferences and login status for seamless navigation",
                },
                {
                  icon: <FiPieChart className="w-8 h-8 text-primary" />,
                  title: "Analytics",
                  description:
                    "Understanding platform usage and performance metrics",
                },
                {
                  icon: <FiEye className="w-8 h-8 text-primary" />,
                  title: "Personalization",
                  description:
                    "Tailoring content and recommendations to your interests",
                },
                {
                  icon: <FiCamera className="w-8 h-8 text-primary" />,
                  title: "Advertising",
                  description:
                    "Delivering relevant ads and measuring their effectiveness",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Cookie Management
              </h3>
              <p className="text-blue-800 mb-4">
                You can control cookie settings through your browser
                preferences:
              </p>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
                <li>Accept or decline all cookies</li>
                <li>Delete cookies after each session</li>
                <li>Set specific preferences for different websites</li>
                <li>Enable/disable third-party cookies</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="text-yellow-800 text-sm">
                Disabling cookies may limit certain features and affect your
                browsing experience on our platform.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  "data-retention": {
    title: "Data Retention Policy",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.dataRetention}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Data Retention"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
              How We Handle Your Data
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiFileText className="w-8 h-8 text-primary" />,
                  title: "Service Records",
                  description:
                    "Transaction histories and account data kept for service continuity",
                },
                {
                  icon: (
                    <HiOutlineShieldCheck className="w-8 h-8 text-primary" />
                  ),
                  title: "Legal Compliance",
                  description:
                    "Records maintained as required by applicable laws and regulations",
                },
                {
                  icon: <FiShield className="w-8 h-8 text-primary" />,
                  title: "Fraud Prevention",
                  description:
                    "Historical data analyzed to prevent fraudulent activities",
                },
                {
                  icon: <FiTrash2 className="w-8 h-8 text-primary" />,
                  title: "Data Deletion",
                  description:
                    "Secure removal of unnecessary data through automated processes",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Retention Periods
              </h3>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Active account data: Maintained while account is active</li>
                <li>Transaction records: 7 years from transaction date</li>
                <li>Communication logs: 2 years from last interaction</li>
                <li>Marketing preferences: Until user opt-out</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-blue-700 text-sm">
                Data retention periods may vary based on legal requirements and
                operational needs. Contact support for specific inquiries about
                your data.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  "third-party-links": {
    title: "Third-Party Links & External Services",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.security}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Third-Party Links"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiLink className="w-8 h-8 text-primary" />,
                  title: "External Links",
                  description:
                    "Links to other websites are provided for convenience but we don't control their content or practices.",
                },
                {
                  icon: <FiLink className="w-8 h-8 text-primary" />,
                  title: "Third-Party Services",
                  description:
                    "We integrate with trusted services for payments, analytics, and other functionalities.",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold text-yellow-900">
                Important Notice
              </h3>
              <ul className="list-disc list-inside text-yellow-800 space-y-2">
                <li>
                  Review third-party privacy policies before sharing information
                </li>
                <li>External websites may have different security standards</li>
                <li>We're not responsible for external content or practices</li>
                <li>Report suspicious links or services to our support team</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <FiAlertCircle className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-blue-700 text-sm">
                Always exercise caution when accessing external links or
                services through our platform.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  "policy-updates": {
    title: "Policy Updates & Amendments",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.updates}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Policy Updates"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          <section className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiRefreshCw className="w-8 h-8 text-primary" />,
                  title: "Regular Updates",
                  description:
                    "We regularly review and update our policies to ensure compliance and best practices.",
                },
                {
                  icon: <FiBell className="w-8 h-8 text-primary" />,
                  title: "Notifications",
                  description:
                    "Significant changes will be communicated via email and platform notifications.",
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Update Process
              </h3>
              <ul className="list-disc list-inside text-green-800 space-y-2">
                <li>Regular policy reviews conducted quarterly</li>
                <li>Updates based on legal requirements and user feedback</li>
                <li>30-day notice for significant changes</li>
                <li>Archive of previous versions maintained</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-lg">
              <div className="w-12 h-12 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                <FiInfo className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-blue-700 text-sm">
                Continuing to use our services after policy updates constitutes
                acceptance of the new terms. We encourage regular review of our
                policies.
              </p>
            </div>
          </section>
        </div>
      </div>
    ),
  },
  terms: {
    title: "Terms & Conditions",
    content: (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="relative h-64 w-full mb-8">
          <Image
            {...images.terms}
            fill
            className="object-cover rounded-lg"
            priority
            alt="Terms and Conditions"
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-8">
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiFileText className="w-6 h-6 text-primary" />
              Introduction
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                Welcome to SwapNShare. By accessing or using our platform, you
                agree to be bound by these Terms and Conditions. Please read
                these terms carefully before using our services.
              </p>
            </div>
          </section>

          {/* Account Responsibilities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiUser className="w-6 h-6 text-primary" />
              Account Responsibilities
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Maintain accurate and up-to-date account information</li>
                <li>Keep login credentials secure and confidential</li>
                <li>Report unauthorized account access immediately</li>
                <li>Users must be 18 years or older to create an account</li>
                <li>One account per individual unless explicitly authorized</li>
              </ul>
            </div>
          </section>

          {/* Platform Rules */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiShield className="w-6 h-6 text-primary" />
              Platform Rules
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Post accurate and legal listings only</li>
                <li>No harmful, offensive, or inappropriate content</li>
                <li>Respect intellectual property rights</li>
                <li>No spam or misleading information</li>
                <li>Complete transactions as agreed upon</li>
              </ul>
            </div>
          </section>

          {/* Listing Guidelines */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiLink className="w-6 h-6 text-primary" />
              Listing Guidelines
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Accurate description of items or properties</li>
                <li>Clear pricing and payment terms</li>
                <li>High-quality images required</li>
                <li>Prohibited items clearly stated</li>
                <li>Honest representation of condition and features</li>
              </ul>
            </div>
          </section>

          {/* Transaction Rules */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiCreditCard className="w-6 h-6 text-primary" />
              Transaction Rules
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Honor agreed-upon prices and terms</li>
                <li>Use platform's payment system when required</li>
                <li>Complete transactions in a timely manner</li>
                <li>Report issues promptly</li>
                <li>Follow return and refund policies</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiAlertTriangle className="w-6 h-6 text-primary" />
              Account Termination
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>We reserve the right to suspend or terminate accounts</li>
                <li>Violation of terms may lead to immediate termination</li>
                <li>Users may delete their account at any time</li>
                <li>Certain obligations survive account termination</li>
              </ul>
            </div>
          </section>

          {/* Liability */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <FiHelpCircle className="w-6 h-6 text-primary" />
              Liability and Disclaimers
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Platform provided "as is" without warranties</li>
                <li>Users responsible for their own actions</li>
                <li>Limited liability for service interruptions</li>
                <li>Independent verification of information recommended</li>
              </ul>
            </div>
          </section>

          <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg mt-4">
            <div className="w-12 h-12 flex-shrink-0 bg-yellow-100 rounded-full flex items-center justify-center">
              <FiAlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <p className="text-yellow-800 text-sm">
              These terms are subject to change. Regular review is recommended.
              By continuing to use SwapNShare, you agree to be bound by the most
              current version of these terms.
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pageData = pages[resolvedParams.slug];
  if (!pageData) return {};

  return {
    title: `${pageData.title} | SwapNShare`,
    description: `Learn more about ${pageData.title.toLowerCase()} on SwapNShare`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const pageData = pages[resolvedParams.slug];

  if (!pageData) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          {pageData.title}
        </h1>
        <div className="mt-4">{pageData.content}</div>
      </div>
    </div>
  );
}

// Helper component for consistent card styling
const InfoCard = ({ icon, title, description }: any) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

// For section headers
const SectionHeader = ({ icon, title }: any) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="p-2 bg-primary/10 rounded-lg">{icon}</div>
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
  </div>
);

// For alert boxes
const AlertBox = ({ type = "info", icon, children }: any) => {
  const styles: any = {
    info: "bg-blue-50 text-blue-800",
    warning: "bg-yellow-50 text-yellow-800",
    success: "bg-green-50 text-green-800",
  };

  return (
    <div className={`flex items-center gap-4 ${styles[type]} p-4 rounded-lg`}>
      <div
        className={`w-12 h-12 flex-shrink-0 bg-${type}-100 rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <p className="text-sm">{children}</p>
    </div>
  );
};
