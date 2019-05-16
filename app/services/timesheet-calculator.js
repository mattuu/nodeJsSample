import moment from "moment";
import { WorkWeek } from "../models";

export default function calculate(timesheet) {
  let date = moment(timesheet.startDate);
  let workWeek = new WorkWeek();
  timesheet.addWorkWeek(workWeek);

  while (date.isBefore(timesheet.endDate)) {
    let workDay = timesheet.workDays.find(i => date.isSame(i.date));

    if (workDay) {
      workWeek.addDay(Object.assign({}, workDay));
    } else {
      workWeek.addDay(
        Object.assign({}, { date: date.toISOString(), day: date.day() })
      );
    }

    date.add(1, "days");

    if (date.day() === 1 && date.isBefore(timesheet.endDate)) {
      workWeek = new WorkWeek();
      timesheet.addWorkWeek(workWeek);
    }
  }
}
