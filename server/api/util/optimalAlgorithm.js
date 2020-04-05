var moment = require("moment");

function currentDateOptimalTime(startTimes, endTimes) {
  let intersections = {};
  for (let i = 0; i < startTimes.length; i++) {
    const current_start_time = startTimes[i];
    const current_end_time = endTimes[i];

    const keys = Object.keys(intersections) || [];
    for (let j = 0; j < keys.length; j++) {
      const current_intersection = keys[j].split("_");
      const intersected_start_time = parseFloat(current_intersection[0]);
      const intersected_end_time = parseFloat(current_intersection[1]);

      const max_start_time = Math.max(
        current_start_time,
        intersected_start_time
      );
      const min_end_time = Math.min(current_end_time, intersected_end_time);

      // does not intersect with the current availability
      if (max_start_time >= min_end_time) continue;

      // if intersect
      const intersected_value =
        intersections[`${max_start_time}_${min_end_time}`];
      if (intersected_value)
        intersections[`${max_start_time}_${min_end_time}`] += 1;
      else intersections[`${max_start_time}_${min_end_time}`] = 2;
    }
    if (
      intersections[`${current_start_time}_${current_end_time}`] === undefined
    )
      intersections[`${current_start_time}_${current_end_time}`] = 1;
  }
  return intersections;
}

module.exports = function findOptimalTime(availabilities) {
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
