import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useUploadFile = () => {
  const [loadFile, setLoadFile] = useState(false);
  const [file, setFile] = useState("");

  const handleSubmitFile = async (e: any, filee: any) => {
    e.preventDefault();
    setLoadFile(true);
    try {
      const formData = new FormData();
      formData.append("image", filee);

      const data = await axiosInstance.post(`/auth/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("data upload", data);
    } catch (error: any) {
      console.log("error uploading file", error);
      promiseErrorFunction(error);
    } finally {
      setLoadFile(false);
    }
  };
  return {
    loadFile,
    handleSubmitFile,
    file,
  };
};
