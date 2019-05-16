export class WorkWeek {
  constructor() {
    this._days = [];
  }

  get days() {
    return this._days;
  }

  get startDate() {
    return this._days.sort()[0];
  }

  get endDate() {
    return this._days.sort()[this._days.length - 1];
  }

  addDay(workDay) {
    this._days.push(workDay);
  }
}
