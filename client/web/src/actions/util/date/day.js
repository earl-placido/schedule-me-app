import moment from "moment";

export const convertAvailabilityToDays = (availableDays, availabilityInfos) => {
  let newAvailableDays = { ...availableDays };
  // convert database availability format into ui format
  for (const availabilityInfo of availabilityInfos) {
    const { AvailabilityId, StartTime, EndTime } = availabilityInfo;
    const momentStartTime = moment(StartTime);
    const momentEndTime = moment(EndTime);
    const currentDay = momentStartTime.day();
    if (!newAvailableDays[currentDay])
      newAvailableDays[currentDay] = [
        [AvailabilityId, [momentStartTime, momentEndTime]]
      ];
    else
      newAvailableDays[currentDay] = [
        ...newAvailableDays[currentDay],
        [AvailabilityId, [momentStartTime, momentEndTime]]
      ];
  }
  return newAvailableDays;
};

export const convertDatesToDay = (currentYear, currentMonth) => {
  const fullFirstDateOfMonth = new Date(currentYear, currentMonth, 1);
  const fullLastDateOfMonth = new Date(currentYear, (currentMonth + 1) % 11, 0);
  const lastDateOfMonth = fullLastDateOfMonth.getDate();
  const firstDayOfMonth = fullFirstDateOfMonth.getDay();

  let datesToDay = {};

  // calculate all the dates for a given day (index refers to day: monday, tuesday, ...)
  // {Monday: [1,8,15,22,29], Tuesday: [2,9,16,23,30], ...}
  for (let dayIndex = 1; dayIndex < 8; dayIndex++) {
    let currentDate = dayIndex;
    datesToDay[currentDate] = (firstDayOfMonth + (dayIndex - 1)) % 7; // convert date to day

    // get the same day of the following weeks
    currentDate += 7;
    while (currentDate <= lastDateOfMonth) {
      datesToDay[currentDate] = (firstDayOfMonth + (dayIndex - 1)) % 7;
      currentDate += 7;
    }
  }

  return datesToDay;
};
