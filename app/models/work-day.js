import moment from "moment";

export class WorkDay {
  constructor(data) {
    this._job = data.Job;
    this._timeIn = moment(data["Clocked In"], "DD/MM/YYYY HH:mm");
    this._timeOut = moment(data["Clocked Out"], "DD/MM/YYYY HH:mm");
    this._duration = data.Duration;
    this._breaks = data.TotalTimeAdjustment;
  }

  get job() {
    return this._job;
  }

  get date() {
    return moment(this._timeIn).startOf('day');
  }

  get timeIn() {
    return this._timeIn;
  }

  get timeOut() {
    return this._timeOut;
  }

  get duration() {
    return this._duration;
  }

  get breaks() {
    return this._breaks;
  }
}
