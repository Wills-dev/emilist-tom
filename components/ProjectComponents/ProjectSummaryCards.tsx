"use client";

import SummaryCard from "../DashboardComponents/SummaryCard";
import SummaryCardsSkeleton from "../Skeleton/SummaryCardsSkeleton";

import { numberWithCommas } from "@/helpers";
import { useGetUserProjectAnalytics } from "@/hooks/useGetUserProjectAnalytics";

const ProjectSummaryCards = () => {
  const { loadingAnalytics, projectAnalytics } = useGetUserProjectAnalytics();

  return (
    <section className="flex overflow-x-scroll gap-4 mt-5 py-4">
      {loadingAnalytics ? (
        <SummaryCardsSkeleton />
      ) : (
        <>
          <SummaryCard
            cardIcon="/assets/icons/leadIcon.svg"
            cardLink="/dashboard/job/lead"
            cardSum={0}
            cardTitle="Lead"
          />
          <SummaryCard
            cardIcon="/assets/icons/newIcon.svg"
            cardLink="/dashboard/project/new"
            cardSum={
              projectAnalytics?.totalPendingProjects &&
              numberWithCommas(projectAnalytics?.totalPendingProjects)
            }
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/assets/icons/activeIcon.svg"
            cardLink="/dashboard/project/active"
            cardSum={
              projectAnalytics?.totalActiveProjects &&
              numberWithCommas(projectAnalytics?.totalActiveProjects)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/assets/icons/overdueIcon.svg"
            cardLink="/dashboard/project/overdue"
            cardSum={
              projectAnalytics?.totalOverdueProjects &&
              numberWithCommas(projectAnalytics?.totalOverdueProjects)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/assets/icons/pausedIcon.svg"
            cardLink="/dashboard/project/paused"
            cardSum={
              projectAnalytics?.totalPausedProjects &&
              numberWithCommas(projectAnalytics?.totalPausedProjects)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/assets/icons/completedIcon.svg"
            cardLink="/dashboard/project/completed"
            cardSum={
              projectAnalytics?.totalCompletedProjects &&
              numberWithCommas(projectAnalytics?.totalCompletedProjects)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </section>
  );
};

export default ProjectSummaryCards;
