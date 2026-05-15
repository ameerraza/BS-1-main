"use client";
import React, { useState } from "react";
import { InputField } from "../common/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button";
import { forgetPassword } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";

const ForgotPassword = ({ setActivePage }: any) => {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!email) {
      setErrorMessage("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      showLoader();
      const response = await forgetPassword({ email });
      if (response?.status === "success") {
        router.push("/authentication/?otp&forgetPassword=true");
        localStorage.setItem("email", email);
        showToast("OTP sent to your email", "success");
        hideLoader();
      } else {
        showToast("Email not found", "error");
        hideLoader();
      }
    } catch (error) {
      showToast("An error occurred while sending OTP", "error");
    }
    hideLoader();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-responsive-lg md:text-responsive-2xl text-primaryDash font-semibold">
          Forgot Password
        </h1>
        <p className="text-center font-light text-gray-400 text-sm">
          Enter your email to reset your password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 md:my-4">
        <div>
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
        </div>
        <div className="space-y-3">
          <Button
            type="submit"
            className="mt-2 md:mt-6 w-full flex justify-center bg-secondaryDash text-white font-semibold py-3 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Reset Password
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => router.push("/authentication/?login")}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
