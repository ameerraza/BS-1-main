import React, { useState, ChangeEvent, useEffect } from "react";

const ImageUploader = ({ onImageUpload, initialImageUrl }: any) => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (initialImageUrl) {
      setImage(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        if (onImageUpload) {
          onImageUpload(file);
        }
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (onImageUpload) {
      onImageUpload(null);
    }
  };

  return (
    <div className="relative w-36 h-36 md:w-40 md:h-40 flex flex-col items-center mb-4">
      <label
        className="cursor-pointer flex flex-col items-center justify-center w-full h-full 
        rounded-full border-3 border-primary/60 bg-gradient-to-br from-white to-gray-50
        hover:from-gray-50 hover:to-gray-100 
        transition-all duration-300 ease-in-out group overflow-hidden
        shadow-lg hover:shadow-xl hover:border-primary/80"
      >
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full bg-white/90 backdrop-blur-sm">
            <div className="relative">
              <div
                className="w-12 h-12 border-4 border-primary/10 border-t-primary/90 
                rounded-full animate-spin"
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-8 h-8 border-3 border-transparent border-t-primary/30 
                  rounded-full animate-spin-slow"
                ></div>
              </div>
            </div>
          </div>
        ) : image ? (
          <div className="relative w-full h-full group">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover rounded-full transition-all 
                duration-300 group-hover:scale-105 group-hover:brightness-90"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
              opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full
              flex items-end justify-center pb-6"
            >
              <button
                onClick={removeImage}
                className="text-white bg-red-500/90 hover:bg-red-600 px-4 py-1.5 
                  rounded-full text-sm font-medium tracking-wide
                  transform transition-all duration-200 hover:scale-105
                  flex items-center gap-2 shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center space-y-3 p-4 
            transition-all duration-300 group-hover:scale-105"
          >
            <div
              className="p-4 rounded-full bg-primary/5 group-hover:bg-primary/10 
              transition-all duration-300 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary/70 group-hover:text-primary/90 
                  transition-colors duration-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8zm9.012-3.972l.354-1.06a.5.5 0 01.94.332l-.708 2.125a.5.5 0 01-.632.314l-2.125-.708a.5.5 0 01.333-.94l1.06.354V9.5a.5.5 0 011 0v2.528z" />
              </svg>
            </div>
            <span
              className="text-primary/90 text-sm font-medium text-center
              bg-primary/10 px-4 py-1.5 rounded-full tracking-wide
              group-hover:bg-primary/20 transition-all duration-300"
            >
              Upload Photo
            </span>
          </div>
        )}
        <input
          type="file"
          id="image-input"
          className="hidden"
          onChange={handleImageChange}
          accept="image/*"
        />
      </label>

      <div className="relative">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() =>
            document.querySelector<HTMLInputElement>("#image-input")?.click()
          }
          className="absolute bottom-0 translate-y-1/2 p-2.5 text-primary bg-white 
            rounded-full cursor-pointer border-3 border-primary/60 shadow-lg
            transition-all duration-200 hover:scale-110 active:scale-95
            hover:bg-primary hover:text-white hover:border-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {showTooltip && (
          <div
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
            bg-gray-800 text-white text-xs py-2 px-3 rounded-lg whitespace-nowrap
            shadow-lg animate-fade-in"
          >
            Change Photo
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
