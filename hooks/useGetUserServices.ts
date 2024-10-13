import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrl";

export const useGetUserServices = () => {
  const { currentUser } = useContext(AuthContext);

  const [serviceLoad, setServiceLoad] = useState(false);
  const [services, setServices] = useState<any>();

  const getUserServices = async () => {
    const userId = currentUser.unique_id;

    setServiceLoad(true);
    try {
      const data = await axiosInstance.get(`/experts/${userId}`);
      setServices(data?.data);
    } catch (error: any) {
      console.log("error getting services/expertise", error);
      // promiseErrorFunction(error);
    } finally {
      setServiceLoad(false);
    }
  };

  useEffect(() => {
    getUserServices();
  }, [currentUser]);

  return {
    getUserServices,
    services,
    serviceLoad,
  };
};
