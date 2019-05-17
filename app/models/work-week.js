export class WorkWeek {
  constructor() {
    this.days = [];
  }

  get startDate() {
    return this.days.sort()[0];
  }

  get endDate() {
    return this.days.sort()[this.days.length - 1];
  }

  addDay(workDay) {
    this.days.push(workDay);
  }
}
