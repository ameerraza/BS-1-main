"use client";
import React, { useState } from "react";
import { Button } from "../../../../components/common/Button";
import { InputField } from "../../../../components/common/InputField";
import { applyForVender, uploadImages } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";

const BecomeVendor = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [vendorType, setVendorType] = useState<"business" | "individual">(
    "business"
  );
  const [formData, setFormData] = useState({
    companyName: "",
    ownerFullName: "",
    businessEmail: "",
    contactNumber: "",
    businessAddress: "",
    city: "",
    businessType: "",
    typesOfProducts: "",
    taxRegistrationNumber: "",
    businessLicense: null as File | null,
    cnicNumber: "",
    cnicFrontImage: null as File | null,
    cnicBackImage: null as File | null,
  });

  const [base64Images, setBase64Images] = useState({
    businessLicense: "",
    cnicFrontImage: "",
    cnicBackImage: "",
  });

  const [errors, setErrors] = useState({});

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (
      files &&
      ["businessLicense", "cnicFrontImage", "cnicBackImage"].includes(name)
    ) {
      const file = files[0];
      if (file && file.type.startsWith("image/")) {
        try {
          const base64 = await convertToBase64(file);
          setBase64Images((prev) => ({
            ...prev,
            [name]: base64,
          }));
          setFormData((prev) => ({
            ...prev,
            [name]: file,
          }));
        } catch (error) {
          showToast("Error processing image. Please try again.", "error");
        }
      } else {
        showToast("Please upload only image files", "error");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const cleanBase64String = (base64String: string) => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const doUploadImages = async (data: any) => {
    try {
      if (!data || data.length === 0) {
        return null;
      }
      // Clean base64 string before uploading
      const cleanedBase64 = await cleanBase64String(data);
      const response = await uploadImages(cleanedBase64);
      if (response.success == true) {
        showToast("Image uploaded successfully", "success");
        return response.url;
      }
    } catch (error) {
      showToast("Failed to upload image. Please try again.", "error");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData :>> ", formData);
    // Basic validation
    if (
      !formData.companyName ||
      !formData.businessEmail ||
      !formData.contactNumber ||
      !formData.cnicNumber ||
      !base64Images.businessLicense ||
      !base64Images.cnicFrontImage ||
      !base64Images.cnicBackImage
    ) {
      showToast(
        "Please fill in all required fields and upload all images",
        "error"
      );
      return;
    }

    try {
      showLoader();
      // Upload all images in parallel
      const [businessLicenseUrl, cnicFrontUrl, cnicBackUrl] = await Promise.all(
        [
          doUploadImages(base64Images.businessLicense),
          doUploadImages(base64Images.cnicFrontImage),
          doUploadImages(base64Images.cnicBackImage),
        ]
      );

      hideLoader();

      const formDataWithImages = {
        ...formData,
        businessLicense: businessLicenseUrl,
        cnicFrontImage: cnicFrontUrl,
        cnicBackImage: cnicBackUrl,
      };

      const response = await applyForVender(formDataWithImages);

      if (response.success === true) {
        // Clear form fields
        const initialFormState = {
          companyName: "",
          ownerFullName: "",
          businessEmail: "",
          contactNumber: "",
          businessAddress: "",
          city: "",
          businessType: "",
          typesOfProducts: "",
          taxRegistrationNumber: "",
          businessLicense: null,
          cnicNumber: "",
          cnicFrontImage: null,
          cnicBackImage: null,
        };

        // Reset all states
        setFormData(initialFormState);
        setBase64Images({
          businessLicense: "",
          cnicFrontImage: "",
          cnicBackImage: "",
        });
        // Clear base64 images
        setBase64Images({
          businessLicense: "",
          cnicFrontImage: "",
          cnicBackImage: "",
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        showToast(
          "Application submitted successfully! We'll review it shortly.",
          "success"
        );
      } else {
        showToast(response.message, "error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      showToast(
        "An unexpected error occurred. Please try again later.",
        "error"
      );
    } finally {
      hideLoader(); // Single hideLoader call in finally block
    }
  };

  return (
    <div className="container mx-auto p-4 my-32">
      <div className="max-w-4xl mx-auto">
        {/* Introduction Section */}
        <div className="text-center mb-8">
          <h1 className="text-responsive-3xl font-bold mb-4">
            Become a Vendor
          </h1>
          <p className="text-gray-600">
            Join our marketplace and start selling your products to customers
            worldwide. Complete the form below to begin your journey with us.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b mb-6">
          <button
            type="button"
            className={`py-2 px-6 text-lg font-medium ${
              vendorType === "business"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setVendorType("business")}
          >
            Business Vendor
          </button>
          <button
            type="button"
            className={`py-2 px-6 text-lg font-medium ${
              vendorType === "individual"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setVendorType("individual")}
          >
            Individual Vendor
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Business/Personal Information */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {vendorType === "business"
                    ? "Business Information"
                    : "Personal Information"}
                </h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label={
                      vendorType === "business" ? "Company Name" : "Full Name"
                    }
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Owner's Full Name"
                        : "Display/Shop Name"
                    }
                    name="ownerFullName"
                    value={formData.ownerFullName}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Business Email"
                        : "Email Address"
                    }
                    name="businessEmail"
                    type="email"
                    value={formData.businessEmail}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Location Details</h2>
                <div className="space-y-4">
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Business Address"
                        : "Home Address"
                    }
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Business/Products Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {vendorType === "business"
                    ? "Business Details"
                    : "Products Details"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Business Type"
                        : "Seller Type"
                    }
                    name="businessType"
                    placeholder={
                      vendorType === "business"
                        ? "e.g., Retail, Manufacturing, Services"
                        : "e.g., Hobbyist, Artisan, Reseller"
                    }
                    value={formData.businessType}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="Types of Products"
                    name="typesOfProducts"
                    placeholder="e.g., Electronics, Clothing, Home Goods"
                    value={formData.typesOfProducts}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Tax Registration Number"
                        : "Tax Number (if applicable)"
                    }
                    name="taxRegistrationNumber"
                    value={formData.taxRegistrationNumber}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "Business License (Image only)"
                        : "ID Proof (Image only)"
                    }
                    name="businessLicense"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* CNIC Details */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  {vendorType === "business"
                    ? "CNIC Details"
                    : "Identity Verification"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label={
                      vendorType === "business"
                        ? "CNIC Number"
                        : "ID/CNIC Number"
                    }
                    name="cnicNumber"
                    value={formData.cnicNumber}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "CNIC Front Image"
                        : "ID Front Image"
                    }
                    name="cnicFrontImage"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <InputField
                    label={
                      vendorType === "business"
                        ? "CNIC Back Image"
                        : "ID Back Image"
                    }
                    name="cnicBackImage"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">
                  Terms & Conditions
                </h2>
                <p className="text-gray-600 mb-4 text-center">
                  By submitting this application, you agree to our vendor terms
                  and conditions. We will review your application and contact
                  you within 2-3 business days.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button type="submit" className="w-full md:w-auto px-8">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeVendor;
