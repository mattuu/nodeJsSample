import moment from "moment";

const round_interval = 10;

export default function adjustTimes(workDay) {
  if (!workDay.timeIn) {
    return;
  }

  const adjustedTimeIn = adjustMinutesDown(workDay.timeIn);
  workDay.timeInAdjusted = adjustedTimeIn;
  workDay.durationMinutes = moment.duration(workDay.duration).asMinutes();

  const adjustedDuration = adjustUp(
    moment.duration(workDay.duration).asMinutes()
  );

  const totalBreaksMins = adjustUp(
    Math.abs(moment.duration(workDay.breaks).asMinutes())
  );
  workDay.totalBreaksAdjusted = moment.duration(totalBreaksMins, "minutes");

  workDay.timeOutAdjusted = moment(adjustedTimeIn).add(
    totalBreaksMins + adjustedDuration,
    "m"
  );
  workDay.durationAdjusted =
    moment
      .duration(
        workDay.timeOutAdjusted.diff(workDay.timeInAdjusted, "minutes"),
        "m"
      )
      .asMinutes() - totalBreaksMins;
}

function adjustMinutesDown(date) {
  const m = moment(date);
  let remainder = m.minute() % round_interval;
  m.subtract(remainder, "m").add(
    remainder > round_interval / 2 ? round_interval : 0,
    "m"
  );

  return m.toDate();
}

function adjustUp(number) {
  let remainder = number % round_interval;
  return (
    number - remainder + (remainder > round_interval / 2 ? round_interval : 0)
  );
}

function adjustMinutesUp(date) {
  const m = moment(date);
  let remainder = m.minute() % round_interval;
  m.add(remainder, "m").add(adjustUp(m.minute()), "m");

  return m.toDate();
}
