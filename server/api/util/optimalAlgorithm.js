var moment = require("moment");

const currentDateOptimalTime = (startTimes, endTimes) => {
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
      if (!intersected_value)
        intersections[`${max_start_time}_${min_end_time}`] = new Set();

      // iwe get all the users that current time is intersected and add the users to the current intersected time
      intersections[`${max_start_time}_${min_end_time}`].add(i);
      const intersectedUsers = intersections[keys[j]].values();
      let nextUser = intersectedUsers.next();
      while (!nextUser.done) {
        intersections[`${max_start_time}_${min_end_time}`].add(nextUser.value);
        nextUser = intersectedUsers.next();
      }
    }
    // if there is no existing time for the current start and end, then we add it
    if (
      intersections[`${current_start_time}_${current_end_time}`] === undefined
    ) {
      intersections[`${current_start_time}_${current_end_time}`] = new Set();
      intersections[`${current_start_time}_${current_end_time}`].add(i);
    }
  }

  // count only the length of each set (the number of users) instead of returning the whole set
  const keys = Object.keys(intersections) || [];
  for (const key of keys) {
    intersections[key] = intersections[key].size;
  }

  return intersections;
};

const findOptimalTime = availabilities => {
  let availabilityPerDate = toAvailabilityPerDate(availabilities);
  let optimalAvailabilityPerDate = findBestAvailabilityPerDate(
    availabilityPerDate
  );

  // sort in descending order
  optimalAvailabilityPerDate.sort((first, second) => {
    return second[1] - first[1];
  });

  return optimalAvailabilityPerDate; // [[date:starthours.startminute_endhours.endminute],
  //   date:starthours.startminute_endhours.endminute ...]]
};

const toAvailabilityPerDate = availabilities => {
  let availabilityPerDate = {};

  for (let availability of availabilities) {
    const startTime = moment(availability["CAST(A.StartTime as char)"]);
    const endTime = moment(availability["CAST(A.EndTime as char)"]);
    const currentDate = startTime.format("YYYY-MM-DD");

    const startTimeRange = parseFloat(startTime.format("HH.mm"));
    const endTimeRange = parseFloat(endTime.format("HH.mm"));

    if (availabilityPerDate[currentDate] !== undefined)
      availabilityPerDate[currentDate].push([startTimeRange, endTimeRange]);
    else availabilityPerDate[currentDate] = [[startTimeRange, endTimeRange]];
  }

  return availabilityPerDate;
};

const toStartEndTimes = availabilities => {
  const startTimes = [];
  const endTimes = [];
  // availabilities: [[start, end], [start, end], [start, end]]
  for (const availability of availabilities) {
    startTimes.push(availability[0]);
    endTimes.push(availability[1]);
  }
  return { startTimes, endTimes };
};

const findBestAvailabilityPerDate = availabilityPerDates => {
  let optimalAvailabilityPerDate = [];

  // for each day, find the best availability
  for (let currentDate of Object.keys(availabilityPerDates)) {
    let { startTimes, endTimes } = toStartEndTimes(
      availabilityPerDates[currentDate]
    );

    // get optimal time for current date
    const optimalTime = currentDateOptimalTime(startTimes, endTimes);

    Object.keys(optimalTime).map(key => {
      optimalAvailabilityPerDate.push([
        `${currentDate}:${key}`,
        optimalTime[key]
      ]);
    });
  }
  return optimalAvailabilityPerDate;
};

module.exports = {
  findOptimalTime
};
