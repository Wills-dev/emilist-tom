import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useAddClicks = () => {
  const addClicks = async (
    service: string,
    serviceId: string,
    userId?: string
  ) => {
    try {
      await axiosInstance.patch(
        `/auth/add-click?service=${service}&serviceId=6${serviceId}&userId=${
          userId || null
        }`
      );
    } catch (error) {
      console.log("error updating click count", error);
    }
  };

  return {
    addClicks,
  };
};
