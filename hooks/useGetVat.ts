import { useContext, useEffect, useState } from "react";

import { AuthContext } from "@/utils/AuthState";
import { axiosInstance } from "@/axiosInstance/baseUrls";

export const useGetVat = () => {
  const { currentUser } = useContext(AuthContext);

  const [vat, setVat] = useState(0);
  const [load, setLoad] = useState(false);

  const getVat = async () => {
    setLoad(true);
    try {
      const { data } = await axiosInstance.get(`/transaction/fetch-vat`);
      setVat(data?.data);
    } catch (error) {
      console.log("error getting vat", error);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getVat();
    }
  }, [currentUser]);

  return {
    vat,
    load,
  };
};
