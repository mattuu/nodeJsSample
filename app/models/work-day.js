import moment from "moment";

export class WorkDay {
  constructor(data) {
    this.job = data.Job;
    this.timeIn = moment(data["Clocked In"], "DD/MM/YYYY HH:mm");
    this.timeOut = moment(data["Clocked Out"], "DD/MM/YYYY HH:mm");
    this.duration = data.Duration;
    this.breaks = data.TotalTimeAdjustment;
  }

  get date() {
    return moment(this.timeIn).startOf("day");
  }
}
