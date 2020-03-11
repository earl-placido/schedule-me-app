import moment from "moment";

import {
  convertDatesToDay,
  convertAvailabilityToDays
} from "../../../actions/util/date/day";

it("test convertAvailabilityToDays", () => {
  const availableDays = {};
  const time = moment();
  const availabilities = [
    { AvailabilityId: 1, StartTime: time, EndTime: time },
    { AvailabilityId: 2, StartTime: time, EndTime: time }
  ];
  const newAvailabilityDays = convertAvailabilityToDays(
    availableDays,
    availabilities
  );
  expect(newAvailabilityDays[time.day()].length).toEqual(2);
  expect(newAvailabilityDays[time.day()][0].length).toEqual(2);
  expect(newAvailabilityDays[time.day()][1].length).toEqual(2);
});

it("test convertDatesToDay action", () => {
  const currentDate = moment();
  const datesToDay = convertDatesToDay(currentDate.year(), currentDate.month());
  expect(datesToDay[currentDate.date()]).toEqual(currentDate.day());
});
