import { DateTime } from "luxon";
import { SEARCHING_START_DATE } from "src/server/utils/constants";

export default function useCurrentWeek () {
  const start = DateTime.fromISO(SEARCHING_START_DATE);
  const end = start.plus({ days: 7 });
  const today = DateTime.now();
  const { days: daysDiff, weeks: weeksDiff } = today.diff(start, ["weeks", "days"]);
  let weekText = `We are in week #${weeksDiff}`;
  const daysInt = Math.floor(daysDiff);
  if (daysInt < 5) {
    weekText = `${daysInt} day${daysInt > 1 ? "s": ""} since the start of week #${weeksDiff}`;
  }
  if (daysInt >= 5) {
    weekText = `${7 - daysInt} day${(7 - daysInt) > 1 ? "s" : ""} to the end of week #${weeksDiff + 1}`;
  }
  return {
    start,
    end,
    today,
    weeksDiff,
    daysDiff,
    weekText
  }
}
