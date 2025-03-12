import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { EditMaterialInfoType } from "@/types";
import { buildingMaterials } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";
import {
  handleGoBack,
  handleInputFieldError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";
import {
  formatInputTextNumberWithCommas,
  removeCommas,
} from "@/helpers/formatInputTextNumberWithCommas";

export const useEditMaterialInfo = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<undefined | string>("");
  const [subCategory, setSubCatgory] = useState("");
  const [location, setLocation] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [fetchedImages, setFetchedImages] = useState<any>([]);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [editMaterialInfo, setEditMaterialInfo] =
    useState<EditMaterialInfoType>({
      name: "",
      brand: "",
      description: "",
      availableQuantity: "",
      price: "NGN",
      storeName: "",
      currency: "",
    });

  const getMaterialInfo = async (materialId: string) => {
    try {
      const { data } = await axiosInstance.get(
        `/material/fetch-product/${materialId}`
      );
      setEditMaterialInfo(data?.data?.product);
      setCategory(data?.data?.product?.category);
      setSubCatgory(data?.data?.product?.subCategory);
      setLocation(data?.data?.product?.location);
      setFetchedImages(data?.data?.product?.images);
    } catch (error: any) {
      console.log("error getting material info", error);
      promiseErrorFunction(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    setCategory(selectedName);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditMaterialInfo((prevJob: any) => ({
      ...prevJob,
      [name]:
        name === "price" || name === "availableQuantity"
          ? formatInputTextNumberWithCommas(value)
          : value,
    }));
  };

  // Get the selected category's subcategories
  const selectedMaterial = buildingMaterials.find(
    (material) => material.name === category
  );

  //onChange function for image
  const onSelectFile = (e: any) => {
    const selectedFiles = e.target.files;
    const newImages = [...selectedImageFiles];
    const selectedFilesArray = Array.from(selectedFiles);
    const invalidFiles: any = [];
    let totalImages = newImages.length + selectedFilesArray.length;

    if (totalImages > 5) {
      toast.error(`You can only select up to 5 images.`, toastOptions);
      e.target.value = null;
      return;
    }

    selectedFilesArray.forEach((file: any) => {
      const fileSize = Math.round(file.size / 1024);
      const fileType = file.type.split("/")[1];
      if (!["jpeg", "jpg", "png"].includes(fileType)) {
        invalidFiles.push(file.name);
      } else if (fileSize > 2000) {
        invalidFiles.push(file.name);
      } else {
        // Check if the file is already added
        if (!newImages.some((img) => img.name === file.name)) {
          newImages.push(file);
        }
      }
    });

    if (invalidFiles.length > 0) {
      let errorMessage = "";
      invalidFiles.forEach((fileName: string) => {
        errorMessage += `${fileName} `;
      });
      errorMessage += invalidFiles.length === 1 ? "is" : "are";
      errorMessage +=
        " not a valid JPEG, JPG, or PNG file or exceeds the maximum size of 2mb.";
      toast.error(`${errorMessage}`, toastOptions);
      e.target.value = null;
    }

    // Update state with valid files only
    const imagesArray = newImages.map((file: any) => URL.createObjectURL(file));
    setSelectedImages(imagesArray);
    setSelectedImageFiles(newImages);
  };

  const handleImageDelete = (index: number) => {
    const newImages: File[] = [...selectedImageFiles];
    newImages.splice(index, 1);
    setSelectedImageFiles(newImages);
  };

  const handleErrorCheck = () => {
    if (
      !editMaterialInfo.name ||
      !editMaterialInfo.brand ||
      !editMaterialInfo.description ||
      !editMaterialInfo.availableQuantity ||
      !editMaterialInfo.price ||
      !editMaterialInfo.storeName ||
      !editMaterialInfo.currency ||
      !location ||
      !category ||
      !subCategory
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent, materialId: string) => {
    e.preventDefault();
    if (!currentUser) {
      router.push("/login");
      return;
    } else if (handleErrorCheck()) {
      return handleInputFieldError();
    } else if (selectedImageFiles?.length < 1 && fetchedImages.length < 1) {
      toast.error("Please select an image", toastOptions);
      return;
    }
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!googleMapsApiKey) {
      throw new Error("Google Maps API key is not defined.");
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        location
      )}&key=${googleMapsApiKey}`
    );
    const data = await response.json();

    if (data.status !== "OK") {
      toast.error(
        `Please enter a valid address from the suggestions.`,
        toastOptions
      );
      return;
    }
    setLoad(true);
    try {
      const {
        name,
        brand,
        description,
        availableQuantity,
        price,
        storeName,
        currency,
      } = editMaterialInfo;

      const editInfoPayload: any = {
        name,
        brand,
        description,
        availableQuantity: removeCommas(availableQuantity.toString()),
        price: removeCommas(price.toString()),
        storeName,
        location,
        subCategory,
        category,
        currency,
      };
      const formData = new FormData();
      for (const property in editInfoPayload) {
        formData.append(property, editInfoPayload[property]);
      }
      for (let i = 0; i < selectedImageFiles.length; i++) {
        formData.append("files", selectedImageFiles[i]);
      }
      await axiosInstance.patch(
        `/material/update-product/${materialId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Material edited successfully `, toastOptions);
      handleGoBack();
    } catch (error: any) {
      console.log("error editing material", error);
      promiseErrorFunction(error);
    } finally {
      setLoad(false);
    }
  };

  return {
    getMaterialInfo,
    handleSubmit,
    setEditMaterialInfo,
    handleInputChange,
    setSubCatgory,
    subCategory,
    category,
    setCategory,
    load,
    loading,
    handleCategoryChange,
    selectedMaterial,
    editMaterialInfo,
    setLocation,
    location,
    fetchedImages,
    onSelectFile,
    selectedImages,
    setSelectedImages,
    handleImageDelete,
  };
};
