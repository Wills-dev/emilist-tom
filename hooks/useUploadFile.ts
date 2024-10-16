import { useState } from "react";

import { promiseErrorFunction } from "@/helpers";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useUploadFile = () => {
  const [loadFile, setLoadFile] = useState(false);
  const [file, setFile] = useState("");
  const [isImageTrue, setIsImageTrue] = useState(false);

  const handleSubmitFile = async (filee: any) => {
    setLoadFile(true);
    try {
      const formData = new FormData();
      formData.append("image", filee);
      const { data } = await axiosInstance.post(
        `/auth/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile(data?.data);
      setIsImageTrue(true);
    } catch (error: any) {
      console.log("error uploading file", error);
      promiseErrorFunction(error);
      setIsImageTrue(false);
    } finally {
      setLoadFile(false);
    }
  };
  return {
    loadFile,
    handleSubmitFile,
    file,
    isImageTrue,
  };
};
