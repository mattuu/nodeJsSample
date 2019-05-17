import adjustTimes from "./work-day-calculator";

export default function calculate(workWeek) {
  workWeek.days.forEach(wd => {
    adjustTimes(wd);
  });
}
