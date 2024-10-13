import { ChangeEvent, useMemo, useState } from "react";

import toast from "react-hot-toast";

import { axiosInstance } from "@/axiosInstance/baseUrl";
import { combineAndSortArrays, toastOptions } from "@/helpers";

export const useGetProjectByStatus = () => {
  const [allProjects, setAllProjects] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getAllProjectsByStatus = async (
    applicantId: string,
    status: string
  ) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post(
        `/get_projects_by_status?status=${status}`,
        {
          applicantId,
        }
      );
      const allProjects = combineAndSortArrays(
        data?.biddableJobs,
        data?.regularJobs
      );
      setAllProjects(allProjects);
      const totalJobs = allProjects?.length || 0;
      setTotalPages(Math.ceil(totalJobs / ITEMS_PER_PAGE));
    } catch (error: any) {
      console.error("Error fetching projects by status", error);
      toast.error("Internal error or Network  unavaliable", toastOptions);
    } finally {
      setIsLoading(false);
    }
  };

  const allProjectsData = useMemo(() => {
    let computedProjects = allProjects;

    if (search) {
      computedProjects = computedProjects?.filter(
        (project: any) =>
          project.category.toLowerCase().includes(search.toLowerCase()) ||
          project.expertlevel.toLowerCase().includes(search.toLowerCase()) ||
          project.location.toLowerCase().includes(search.toLowerCase()) ||
          project.projecttitle.toLowerCase().includes(search.toLowerCase()) ||
          project.projecttype.toLowerCase().includes(search.toLowerCase()) ||
          project.service.toLowerCase().includes(search.toLowerCase()) ||
          project.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    return computedProjects?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [allProjects, currentPage, search]);

  return {
    isLoading,
    allProjects,
    allProjectsData,
    search,
    handleChange,
    getAllProjectsByStatus,
    handlePageChange,
    totalPages,
    currentPage,
  };
};
