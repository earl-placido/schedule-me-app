var moment = require("moment");

const tune_intersection = intersections => {
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
};

const currentDateOptimalTime = (startTimes, endTimes) => {
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
};

const findOptimalTime = availabilities => {
  let availabilityPerDates = {};
  let optimalAvailabilityPerDate = [];

  // convert each availabilities to the appropriate format
  for (let availability of availabilities) {
    const startTime = moment(availability["CAST(A.StartTime as char)"]);
    const endTime = moment(availability["CAST(A.EndTime as char)"]);
    const currentDate = startTime.format("YYYY-MM-DD");

    const startTimeRange = parseFloat(startTime.format("HH.mm"));
    const endTimeRange = parseFloat(endTime.format("HH.mm"));

    if (availabilityPerDates[currentDate] !== undefined)
      availabilityPerDates[currentDate].push([startTimeRange, endTimeRange]);
    else availabilityPerDates[currentDate] = [[startTimeRange, endTimeRange]];
  }

  // for each day, find the best availability
  for (let currentDate of Object.keys(availabilityPerDates)) {
    const listOfAvailabilities = availabilityPerDates[currentDate];
    const startTimes = [];
    const endTimes = [];
    // listOfAvailabilities: [[start, end], [start, end], [start, end]]
    for (const listOfAvailability of listOfAvailabilities) {
      startTimes.push(listOfAvailability[0]);
      endTimes.push(listOfAvailability[1]);
    }
    // get optimal time for current day
    const optimalTime = currentDateOptimalTime(startTimes, endTimes);
    Object.keys(optimalTime).map(key => {
      optimalAvailabilityPerDate.push([
        `${currentDate}:${key}`,
        optimalTime[key]
      ]);
    });
  }

  // sort in descending order
  optimalAvailabilityPerDate.sort((first, second) => {
    return second[1] - first[1];
  });

  return optimalAvailabilityPerDate; // [[date:starthours.startminute_endhours.endminute],
  //   date:starthours.startminute_endhours.endminute ...]]
};

module.exports = {
  findOptimalTime
};
