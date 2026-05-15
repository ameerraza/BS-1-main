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
const Buy = ({ setActiveTab }: any) => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [product, setProduct] = useState<any>({});
  const params = useParams();
  const router = useRouter();

  const id = params?.id
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cnicNumber: "", // Add this line
    transactionId: "",
    receipt: null as File | null,
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
    const productPrice = product?.price || 0;
    const deliveryCharges = 10.0;
    return productPrice + deliveryCharges;
  };

  const cleanBase64String = (base64String: string) => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const uploadReceipt = async () => {
    try {
      if (formData.receipt) {
        const base64Receipt = await convertToBase64(formData.receipt);
        const clean = cleanBase64String(base64Receipt);
        const receiptResponse = await uploadImages(clean);
        if (receiptResponse.success) {
          return receiptResponse.url;
        }
      }
      return null;
    } catch (error) {
      throw new Error("Failed to upload receipt");
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.cnicNumber && formData.cnicNumber.length == 13)
      newErrors.cnicNumber = "CNIC number is required"; // Add this line
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required";
    if (!formData.receipt) newErrors.receipt = "Receipt is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

        // Upload receipt image
        const receiptUrl = await uploadReceipt();

        // Create the payload
        const payload = {
          userId: Cookies.get("id"),
          vendorId: product.vendorId._id,
          productId: id,
          type: "buy",
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phone,
          cnicNumber: formData.cnicNumber, // Add this line
          address: formData.address,
          city: formData.city,
          transactionId: formData.transactionId,
          receiptImage: receiptUrl,
          productPrice: product.price,
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
    <div className="container mx-auto p-4 my-32">
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
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                <InputField
                  label="CNIC Number"
                  name="cnicNumber"
                  value={formData.cnicNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Shipping Details Section */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="space-y-4">
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
                  name="receipt"
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
                <span>Product Price</span>
                <span>${product?.price || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>$10.00</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateTotalAmount()}</span>
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

export default Buy;
