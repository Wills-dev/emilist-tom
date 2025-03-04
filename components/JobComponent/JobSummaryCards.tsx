"use client";

import SummaryCard from "../DashboardComponents/SummaryCard";
import SummaryCardsSkeleton from "../Skeleton/SummaryCardsSkeleton";

import { numberWithCommas } from "@/helpers";
import { useGetJobSummary } from "@/hooks/useGetJobSummary";

const JobSummaryCards = () => {
  const { loadingAnalytics, jobAnalytics } = useGetJobSummary();

  return (
    <div className="w-full">
      <div className="flex w-full gap-4 py-4 max-w-full flex-wrap">
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
              cardLink="/dashboard/job/new"
              cardSum={
                jobAnalytics?.totalPendingJobs &&
                numberWithCommas(jobAnalytics?.totalPendingJobs)
              }
              cardTitle="New"
            />
            <SummaryCard
              cardIcon="/assets/icons/activeIcon.svg"
              cardLink="/dashboard/job/active"
              cardSum={
                jobAnalytics?.totalActiveJobs &&
                numberWithCommas(jobAnalytics?.totalActiveJobs)
              }
              cardTitle="Active"
            />
            <SummaryCard
              cardIcon="/assets/icons/overdueIcon.svg"
              cardLink="/dashboard/job/overdue"
              cardSum={
                jobAnalytics?.totalOverdueJobs &&
                numberWithCommas(jobAnalytics?.totalOverdueJobs)
              }
              cardTitle="Overdue"
            />
            <SummaryCard
              cardIcon="/assets/icons/pausedIcon.svg"
              cardLink="/dashboard/job/paused"
              cardSum={
                jobAnalytics?.totalPausedJobs &&
                numberWithCommas(jobAnalytics?.totalPausedJobs)
              }
              cardTitle="Paused"
            />
            <SummaryCard
              cardIcon="/assets/icons/completedIcon.svg"
              cardLink="/dashboard/job/completed"
              cardSum={
                jobAnalytics?.totalCompletedJobs &&
                numberWithCommas(jobAnalytics?.totalCompletedJobs)
              }
              cardTitle="Completed"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default JobSummaryCards;
