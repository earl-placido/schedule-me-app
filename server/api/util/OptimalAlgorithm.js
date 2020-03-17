var moment = require("moment");

function tune_intersection(intersections) {
  const keys = Object.keys(intersections);
  for (let i = 0; i < keys.length - 1; i++) {
    const current_intersection = keys[i].split("_");
    const current_intersection_start = parseFloat(current_intersection[0]);
    const current_intersection_end = parseFloat(current_intersection[1]);
    for (let j = i + 1; j < keys.length; j++) {
      const next_intersection = keys[j].split("_");
      const next_intersection_start = parseFloat(next_intersection[0]);
      const next_intersection_end = parseFloat(next_intersection[1]);

      if (
        current_intersection_start >= next_intersection_start &&
        current_intersection_end <= next_intersection_end
      )
        intersections[keys[i]] += 1;
      else if (
        next_intersection_start >= current_intersection_start &&
        next_intersection_end <= current_intersection_end
      )
        intersections[keys[j]] += 1;
    }
  }
}

function currentDayOptimalTime(startTimes, endTimes) {
  const intersections = {};
  // find intersections between all time slots (O(n^2))
  for (let i = 0; i < startTimes.length - 1; i++) {
    const startTime = startTimes[i];
    const endTime = endTimes[i];

    for (let j = i + 1; j < startTimes.length; j++) {
      const next_start_time = startTimes[j];
      const next_end_time = endTimes[j];

      const current_intersection_start = Math.max(startTime, next_start_time);
      const current_intersection_end = Math.min(endTime, next_end_time);

      if (current_intersection_start >= current_intersection_end) continue;

      if (
        intersections[
          `${current_intersection_start}_${current_intersection_end}`
        ] !== undefined
      )
        intersections[
          `${current_intersection_start}_${current_intersection_end}`
        ] += 1;
      else
        intersections[
          `${current_intersection_start}_${current_intersection_end}`
        ] = 1;
    }
  }
  // find intersected intersections
  tune_intersection(intersections);
  return intersections;
}

module.exports = function findOptimalTime(availabilities) {
  let availabilityPerDays = {};
  let optimalAvailabilityPerDay = [];

  // convert each availabilities to the appropriate format
  for (let availability of availabilities) {
    const startTime = moment(availability["CAST(A.StartTime as char)"]);
    const endTime = moment(availability["CAST(A.EndTime as char)"]);
    const currentDay = startTime.day();

    const startTimeRange = parseFloat(startTime.format("HH.mm"));
    const endTimeRange = parseFloat(endTime.format("HH.mm"));

    if (availabilityPerDays[currentDay] !== undefined)
      availabilityPerDays[currentDay].push([startTimeRange, endTimeRange]);
    else availabilityPerDays[currentDay] = [[startTimeRange, endTimeRange]];
  }

  // for each day, find the best availability
  for (let currentDay of Object.keys(availabilityPerDays)) {
    const listOfAvailabilities = availabilityPerDays[currentDay];
    const startTimes = [];
    const endTimes = [];
    // listOfAvailabilities: [[start, end], [start, end], [start, end]]
    for (const listOfAvailability of listOfAvailabilities) {
      startTimes.push(listOfAvailability[0]);
      endTimes.push(listOfAvailability[1]);
    }
    // get optimal time for current day
    const optimalTime = currentDayOptimalTime(startTimes, endTimes);
    Object.keys(optimalTime).map(key => {
      optimalAvailabilityPerDay.push([
        `${currentDay}:${key}`,
        optimalTime[key]
      ]);
    });
  }

  // sort in descending order
  optimalAvailabilityPerDay.sort((first, second) => {
    return second[1] - first[1];
  });

  return optimalAvailabilityPerDay; // [[day:starthours.startminute_endhours.endminute],
  //   day:starthours.startminute_endhours.endminute ...]]
};
