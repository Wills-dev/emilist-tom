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
            cardSum={3}
            cardTitle="Lead"
          />
          <SummaryCard
            cardIcon="/assets/icons/newIcon.svg"
            cardLink="/dashboard/project/new"
            cardSum={
              projectAnalytics?.totalPendingJobs &&
              numberWithCommas(projectAnalytics?.totalPendingJobs)
            }
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/assets/icons/activeIcon.svg"
            cardLink="/dashboard/project/active"
            cardSum={
              projectAnalytics?.totalActiveJobs &&
              numberWithCommas(projectAnalytics?.totalActiveJobs)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/assets/icons/overdueIcon.svg"
            cardLink="/dashboard/project/overdue"
            cardSum={
              projectAnalytics?.totalOverdueJobs &&
              numberWithCommas(projectAnalytics?.totalOverdueJobs)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/assets/icons/pausedIcon.svg"
            cardLink="/dashboard/project/paused"
            cardSum={
              projectAnalytics?.totalPausedJobs &&
              numberWithCommas(projectAnalytics?.totalPausedJobs)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/assets/icons/completedIcon.svg"
            cardLink="/dashboard/project/completed"
            cardSum={
              projectAnalytics?.totalCompletedJobs &&
              numberWithCommas(projectAnalytics?.totalCompletedJobs)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </section>
  );
};

export default ProjectSummaryCards;
