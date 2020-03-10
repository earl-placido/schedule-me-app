import moment from "moment";

import { convertDatesToDay } from "../../../actions/util/date/day";

it("test convertDatesToDay action", () => {
  const currentDate = moment();
  const datesToDay = convertDatesToDay(currentDate.year(), currentDate.month());
  expect(datesToDay[currentDate.date()]).toEqual(currentDate.day());
});
