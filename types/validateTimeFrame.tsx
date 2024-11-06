import { Milestone } from "../types";

export function convertToDays(value: number, unit: string): number {
  switch (unit) {
    case "days":
      return value;
    case "weeks":
      return value * 7;
    case "months":
      return value * 30;
    default:
      throw new Error(`Unknown period unit: ${unit}`);
  }
}

export function convertMilestoneTimeframeToDays(
  milestones: Milestone[]
): number {
  let totalMilestoneNumber = 0;
  for (const milestone of milestones) {
    switch (milestone?.timeFrame?.period) {
      case "days":
        totalMilestoneNumber += Number(milestone?.timeFrame?.number);
        break;
      case "weeks":
        totalMilestoneNumber += Number(milestone?.timeFrame?.number) * 7;
        break;
      case "months":
        totalMilestoneNumber += Number(milestone?.timeFrame?.number) * 30;
        break;
      default:
        throw new Error("Invalid milestone duration period");
    }
  }
  return totalMilestoneNumber;
}

export function validateMilestoneTimeFrames(
  milestones: Milestone[],
  duration: number,
  period: string
): true | never {
  const durationInDays = convertToDays(duration, period);

  const totalMilestoneDays = convertMilestoneTimeframeToDays(milestones);

  if (totalMilestoneDays > durationInDays) {
    throw new Error(
      `Total milestone duration exceeds the ${duration} ${period} project duration.`
    );
  }

  return true;
}
