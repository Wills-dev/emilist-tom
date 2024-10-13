import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

import toast from "react-hot-toast";

import { EditMaterialInfoType } from "@/types";
import { buildingMaterials } from "@/constants";
import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";
import {
  handleGoBack,
  handleInputFieldError,
  promiseErrorFunction,
  toastOptions,
} from "@/helpers";

export const useEditMaterialInfo = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);

  const [load, setLoad] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<undefined | string>("");
  const [subCategory, setSubCatgory] = useState("");
  const [editMaterialInfo, setEditMaterialInfo] =
    useState<EditMaterialInfoType>({
      productName: "",
      brand: "",
      description: "",
      quantityAvailable: "",
      price: "",
      supplier: "",
      location: "",
    });

  const getMaterialInfo = async (materialId: string) => {
    try {
      const data = await axiosInstance.get(`/fetchMaterial/${materialId}`);
      setEditMaterialInfo(data?.data);
      setCategory(data?.data?.category);
      setSubCatgory(data?.data?.subCategory);
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
      [name]: value,
    }));
  };

  // Get the selected category's subcategories
  const selectedMaterial = buildingMaterials.find(
    (material) => material.name === category
  );

  const handleErrorCheck = () => {
    if (
      !editMaterialInfo.productName ||
      !editMaterialInfo.brand ||
      !editMaterialInfo.description ||
      !editMaterialInfo.quantityAvailable ||
      !editMaterialInfo.price ||
      !editMaterialInfo.supplier ||
      !editMaterialInfo.location
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
    }
    setLoad(true);
    try {
      const {
        productName,
        brand,
        description,
        quantityAvailable,
        price,
        supplier,
        location,
      } = editMaterialInfo;

      const editInfoPayload: any = {
        product_name: productName,
        brand,
        description,
        quantity_available: quantityAvailable,
        price,
        supplier,
        location,
        sub_category: subCategory,
        category,
      };
      const formData = new FormData();
      for (const property in editInfoPayload) {
        formData.append(property, editInfoPayload[property]);
      }
      await axiosInstance.put(`/updateMaterial/${materialId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
  };
};
