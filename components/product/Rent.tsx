"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { InputField } from "../common/InputField";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { getProductById, order, uploadImages } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import Cookies from "js-cookie";
const Rent = ({ setActiveTab }: any) => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [product, setProduct] = useState<any>({});
  const params = useParams();
  const router = useRouter();

  // Get ID from URL parameters
  const id = params?.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "", // Changed from phone to phoneNumber
    cnicNumber: "", // Changed from cnic to cnicNumber
    cnicFrontImage: null as File | null, // Changed from cnicFront
    cnicBackImage: null as File | null, // Changed from cnicBack
    address: "",
    city: "",
    startDate: "",
    endDate: "",
    transactionId: "",
    receiptImage: null as File | null, // Changed from receipt
  });
  const [errors, setErrors] = useState({});

  const [imageUrls, setImageUrls] = useState({
    cnicFront: "",
    cnicBack: "",
    receipt: "",
  });

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (file && !file.type.startsWith("image/")) {
        showToast("Please upload only image files", "error");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.cnicNumber) newErrors.cnicNumber = "CNIC is required";
    if (!formData.cnicFrontImage)
      newErrors.cnicFrontImage = "CNIC front image is required";
    if (!formData.cnicBackImage)
      newErrors.cnicBackImage = "CNIC back image is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required";
    if (!formData.receiptImage) newErrors.receiptImage = "Receipt is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (id) {
      doGetProductById(id);
    }
  }, [id]);

  const doGetProductById = async (productId: string) => {
    try {
      showLoader();
      const response = await getProductById(productId);
      if (response.success === true) {
        setProduct(response.product);
        showToast(response.message, "success");
      } else {
        showToast("Failed to fetch product details", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Not Found", "error");
    } finally {
      hideLoader();
    }
  };

  const calculateTotalAmount = () => {
    const productPrice = product?.rentPrice || 0;
    const deliveryCharges = 10.0; // Fixed delivery charge
    return productPrice + deliveryCharges;
  };
  const cleanBase64String = (base64String: string) => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  };
  const uploadImagess = async () => {
    try {
      const imageUploads = [];

      if (formData.cnicFrontImage) {
        const base64Front = await convertToBase64(formData.cnicFrontImage);
        const clean = cleanBase64String(base64Front);
        const frontResponse = await uploadImages(clean);
        if (frontResponse.success) {
          imageUploads.push({ key: "cnicFront", url: frontResponse.url });
        }
      }

      if (formData.cnicBackImage) {
        const base64Back = await convertToBase64(formData.cnicBackImage);
        const clean = cleanBase64String(base64Back);

        const backResponse = await uploadImages(clean);
        if (backResponse.success) {
          imageUploads.push({ key: "cnicBack", url: backResponse.url });
        }
      }

      if (formData.receiptImage) {
        const base64Receipt = await convertToBase64(formData.receiptImage);
        const clean = cleanBase64String(base64Receipt);
        const receiptResponse = await uploadImages(clean);
        if (receiptResponse.success) {
          imageUploads.push({ key: "receipt", url: receiptResponse.url });
        }
      }

      return imageUploads;
    } catch (error) {
      throw new Error("Failed to upload images");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("authToken");
    if (!token) {
      showToast("Please login first", "warning");
      return;
    }
    if (validateForm()) {
      try {
        showLoader();

        // First upload all images
        const uploadedImages = await uploadImagess();

        // Create the payload with image URLs
        const payload = {
          userId: localStorage.getItem("id"),
          vendorId: product.vendorId._id,
          productId: id,
          type: "rent",
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          cnicNumber: formData.cnicNumber,
          cnicFrontImage: uploadedImages.find((img) => img.key === "cnicFront")
            ?.url,
          cnicBackImage: uploadedImages.find((img) => img.key === "cnicBack")
            ?.url,
          receiptImage: uploadedImages.find((img) => img.key === "receipt")
            ?.url,
          address: formData.address,
          city: formData.city,
          transactionId: formData.transactionId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          productPrice: product.rentPrice,
          deliveryCharges: 10.0,
          totalAmount: calculateTotalAmount(),
        };

        const response = await order(payload);
        if (response.success) {
          showToast("Order placed successfully", "success");
          router.push("/profile");
        } else {
          showToast(response.message || "Failed to place order", "error");
        }
      } catch (error) {
        console.error(error);
        showToast("Error placing order", "error");
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <div className="container-fluid mx-auto p-4 my-24">
      {/* Back Button */}
      <button
        onClick={() => {
          router.push(`/product/${id}`);
        }}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
      >
        <IoArrowBack size={20} />
        <span>Back to Details</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Form Section */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Details Section */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <InputField
                  label="CNIC Number"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  onChange={handleInputChange}
                />
                <InputField
                  label="CNIC Front Image"
                  name="cnicFrontImage"
                  type="file"
                  onChange={handleInputChange}
                />
                <InputField
                  label="CNIC Back Image"
                  name="cnicBackImage"
                  type="file"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Shipping Details Section */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <InputField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Transaction ID"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  instruction="Enter the transaction ID from your payment receipt"
                />

                <InputField
                  label="Receipt Image"
                  name="receiptImage"
                  type="file"
                  onChange={handleInputChange}
                  instruction=" Upload a clear image of your payment receipt"
                />
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <p className="text-gray-600">
                Please make sure to verify all details before submitting. Once
                your order is confirmed, you will receive a confirmation email
                with tracking information.
              </p>
            </div>
          </form>
        </div>

        {/* Price Summary Section */}
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Product Name</span>
                <span>{product?.name || "Loading..."}</span>
              </div>
              <div className="flex justify-between">
                <span>Rent Price</span>
                <span>${product?.rentPrice || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>$10.00</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotalAmount().toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button type="submit" onClick={handleSubmit} className="w-full">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;
