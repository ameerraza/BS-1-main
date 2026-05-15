"use client";
import React, { useState } from "react";
import { InputField } from "../common/InputField";
import { useRouter } from "next/navigation";
import { Button } from "../common/Button";

interface ResetPasswordProps {
  setActivePage: (page: string) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setActivePage }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    if (!formData.password) {
      setErrorMessage("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Add your API call here to reset the password
      console.log("Password reset with:", formData.password);
      setActivePage("login");
    } catch (error) {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage("");
  };

  return (
    <div className="w-full mt-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-responsive-lg md:text-responsive-2xl text-primaryDash font-semibold">
          Reset Password
        </h1>
        <p className="text-center font-light text-gray-400 text-sm">
          Enter your new password.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 md:my-4">
        <div className="space-y-2">
          <InputField
            type="password"
            name="password"
            label="New Password"
            placeholder="Enter new password"
            value={formData.password}
            onChange={handleChange}
            errors={errorMessage}
          />
          <InputField
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            errors={errorMessage}
          />
        </div>
        <div className="space-y-3 mt-4">
          <Button type="submit" fullWidth>
            Reset Password
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => router.push("/authentication/?login")}
          >
            Back to Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
