"use client";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import SummaryCard from "../DashboardComponents/SummaryCard";
import SummaryCardsSkeleton from "../Skeleton/SummaryCardsSkeleton";

import { numberWithCommas } from "@/helpers";
import { useGetJobSummary } from "@/hooks/useGetJobSummary";

const JobSummaryCards = () => {
  const { loadingAnalytics, jobAnalytics } = useGetJobSummary();

  return (
    <ScrollArea className="w-full overflow-x-auto whitespace-nowrap hide-scrollbar">
      <div className="flex gap-4 py-4 w-max">
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

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default JobSummaryCards;
