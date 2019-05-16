export class Timesheet {
  constructor(workDays) {
    this._workDays = workDays;
    this._workWeeks = [];
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get workDays() {
    return this._workDays;
  }

  get workWeeks() {
    return this._workWeeks;
  }

  adjustStartDate(date) {
    this._startDate = date;
  }

  adjustEndDate(date) {
    this._endDate = date;
  }

  addWorkWeek(week) {
    this._workWeeks.push(week);
  }
}
