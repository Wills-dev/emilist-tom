type StarCounts = {
  [key: string]: number;
};

export const getRatingPercentage = (
  starCounts: StarCounts,
  rating: number
): string => {
  const totalReviews = Object.values(starCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  if (totalReviews === 0) return "0%";

  const ratingCount = starCounts[rating.toString()] || 0;
  const percentage = (ratingCount / totalReviews) * 100;

  return `${percentage.toFixed(2)}%`;
};
