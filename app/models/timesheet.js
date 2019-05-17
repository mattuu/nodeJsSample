export class Timesheet {
  constructor(workDays) {
    this.workDays = workDays;
    this.workWeeks = [];
  }

  adjustStartDate(date) {
    this.startDate = date;
  }

  adjustEndDate(date) {
    this.endDate = date;
  }

  addWorkWeek(week) {
    this.workWeeks.push(week);
  }
}
