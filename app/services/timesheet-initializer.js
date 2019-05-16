import { Timesheet } from "../models";
import moment from "moment";

export default function init(workDays) {
  const timesheet = new Timesheet(workDays);
  timesheet.adjustStartDate(padLeft(workDays));
  timesheet.adjustEndDate(padRight(workDays));
  return timesheet;
}

function padLeft(workDays) {
  const minDate = workDays.map(wd => wd.date).sort(d => d)[0];
  const monthStart = minDate.startOf("month");
  if (moment(minDate).isBefore(monthStart)) {
    return moment(minDate).startOf("week");
  } else {
    return moment(monthStart).startOf("week");
  }
}

function padRight(workDays) {
  const maxDate = workDays.map(wd => wd.date).sort(d => d)[workDays.length - 1];
  const monthEnd = maxDate.endOf("month");
  if (moment(maxDate).isAfter(monthEnd)) {
    return moment(maxDate).endOf("week");
  } else {
    return moment(monthEnd).endOf("week");
  }
}
