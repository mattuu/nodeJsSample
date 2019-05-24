import moment from "moment";
import { WorkWeek } from "../models";
import calculate from "./work-week-calculator";

export default function populate(timesheet) {
  let date = moment(timesheet.startDate);
  let workWeek = new WorkWeek();
  timesheet.addWorkWeek(workWeek);

  while (date.isBefore(timesheet.endDate)) {
    let workDay = timesheet.workDays.find(i => date.isSame(i.date));

    if (workDay) {
      workWeek.addDay(
        Object.assign({}, workDay, { date: workDay.date.toDate() })
      );
    } else {
      workWeek.addDay(Object.assign({}, { date: date.toDate() }));
    }

    date.add(1, "days");

    if (date.day() === 1 && date.isBefore(timesheet.endDate)) {
      calculate(workWeek);
      workWeek = new WorkWeek();
      timesheet.addWorkWeek(workWeek);
    }
  }
}
