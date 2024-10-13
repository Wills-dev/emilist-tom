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
            cardLink="/dashboard/job/new"
            cardSum={
              projectAnalytics?.new && numberWithCommas(projectAnalytics?.new)
            }
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/assets/icons/activeIcon.svg"
            cardLink="/dashboard/job/active"
            cardSum={
              projectAnalytics?.active &&
              numberWithCommas(projectAnalytics?.active)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/assets/icons/overdueIcon.svg"
            cardLink="/dashboard/job/overdue"
            cardSum={
              projectAnalytics?.overdue &&
              numberWithCommas(projectAnalytics?.overdue)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/assets/icons/pausedIcon.svg"
            cardLink="/dashboard/job/paused"
            cardSum={
              projectAnalytics?.paused &&
              numberWithCommas(projectAnalytics?.paused)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/assets/icons/completedIcon.svg"
            cardLink="/dashboard/job/completed"
            cardSum={
              projectAnalytics?.completed &&
              numberWithCommas(projectAnalytics?.completed)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </section>
  );
};

export default ProjectSummaryCards;
