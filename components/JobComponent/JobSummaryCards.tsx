"use client";

import SummaryCard from "../DashboardComponents/SummaryCard";
import SummaryCardsSkeleton from "../Skeleton/SummaryCardsSkeleton";

import { numberWithCommas } from "@/helpers";
import { useGetJobSummary } from "@/hooks/useGetJobSummary";

const JobSummaryCards = () => {
  const { loadingAnalytics, jobAnalytics } = useGetJobSummary();
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
            cardSum={jobAnalytics?.new && numberWithCommas(jobAnalytics?.new)}
            cardTitle="New"
          />
          <SummaryCard
            cardIcon="/assets/icons/activeIcon.svg"
            cardLink="/dashboard/job/active"
            cardSum={
              jobAnalytics?.active && numberWithCommas(jobAnalytics?.active)
            }
            cardTitle="Active"
          />
          <SummaryCard
            cardIcon="/assets/icons/overdueIcon.svg"
            cardLink="/dashboard/job/overdue"
            cardSum={
              jobAnalytics?.overdue && numberWithCommas(jobAnalytics?.overdue)
            }
            cardTitle="Overdue"
          />
          <SummaryCard
            cardIcon="/assets/icons/pausedIcon.svg"
            cardLink="/dashboard/job/paused"
            cardSum={
              jobAnalytics?.paused && numberWithCommas(jobAnalytics?.paused)
            }
            cardTitle="Paused"
          />
          <SummaryCard
            cardIcon="/assets/icons/completedIcon.svg"
            cardLink="/dashboard/job/completed"
            cardSum={
              jobAnalytics?.completed &&
              numberWithCommas(jobAnalytics?.completed)
            }
            cardTitle="Completed"
          />
        </>
      )}
    </section>
  );
};

export default JobSummaryCards;
