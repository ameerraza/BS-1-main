import React, { useEffect, useState } from "react";
import { InputField } from "../common/InputField";
import { Button } from "../common/Button";
import ImageUploader from "./ImageUploader";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import { updateProfile, uploadImages, getUserById } from "@/api/api"; // Add getUserById import
import Cookies from "js-cookie";
const ProfileForm = ({ userData }: any) => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const formRef = React.useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    profilePhoto: null as File | null,
  });

  const [base64Image, setBase64Image] = useState("");
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      showLoader();
      const id = Cookies.get("id");
      if (id) {
        const response = await getUserById();
        console.log("response :>> ", response);
        if (response.success == true) {
          setFormData({
            name: response.data.name || "",
            phoneNumber: response.data.phoneNumber || "",
            password: "",
            profilePhoto: response.data.profilePhoto || null,
          });
        }
      } else {
        showToast("Failed to fetch user data. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      hideLoader();
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const cleanBase64String = (base64String: string) => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const handleImageUpload = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      try {
        const base64 = await convertToBase64(file);
        setBase64Image(base64);
        setFormData((prev) => ({
          ...prev,
          profilePhoto: file,
        }));
      } catch (error) {
        showToast("Error processing image. Please try again.", "error");
      }
    } else {
      showToast("Please upload only image files", "error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      showLoader();
      let imageUrl = formData?.profilePhoto;

      if (base64Image) {
        const cleanedBase64 = cleanBase64String(base64Image);
        const response = await uploadImages(cleanedBase64);
        if (response.success) {
          imageUrl = response.url;
          showToast("Profile image updated successfully", "success");
        }
      }

      const submitData = {
        ...formData,
        profilePhoto: imageUrl,
      };
      const id = localStorage.getItem("id");
      const response = await updateProfile(id, submitData);
      if (response.success == true) {
        showToast("Profile updated successfully!", "success");
        setFormData((prev) => ({
          ...prev,
          password: "",
          profilePhoto: null,
        }));
        setBase64Image("");

        // Fetch updated user data after successful update
        await fetchUserData();
      } else {
        showToast("Failed to update profile. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Failed to update profile. Please try again.", "error");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className="w-full flex-col mt-2 md:mt-0">
      <ImageUploader
        onImageUpload={handleImageUpload}
        initialImageUrl={formData?.profilePhoto}
      />
      <form onSubmit={handleSubmit} className="grid gap-6" ref={formRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <InputField
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>

        <InputField
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
        />

        <div className="flex justify-start mt-4">
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
