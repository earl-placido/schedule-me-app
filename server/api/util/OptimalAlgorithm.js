function tune_intersection(intersections) {
    keys = Object.keys(intersections)
    for(let i = 0; i < keys.length-1; i++) {

        current_intersection = keys[i].split("_")
        current_intersection_start, current_intersection_end = float(current_intersection[0]), float(current_intersection[1])
        for(let j = 0; j < keys.length-1; j++) {
            next_intersection = keys[j].split("_")
            next_intersection_start, next_intersection_end = float(next_intersection[0]), float(
                next_intersection[1])

            if (current_intersection_start >= next_intersection_start && current_intersection_end <= next_intersection_end)
                intersections[keys[i]] += 1
            else if (next_intersection_start >= current_intersection_start && next_intersection_end <= current_intersection_end)
                intersections[keys[j]] += 1
        }
    }
}

function CurrentDayOptimalTime(startTimes, endTimes) {
    intersections = {}
    for (let i = 0; i < startTimes.length-1; i ++) {
        startTime = startTimes[i]
        endTime = endTimes[i]

        for(let j=i+1; j < startTimes.length; j++) {
            next_start_time = startTimes[j]
            next_end_time = endTimes[j]

            current_intersection_start = max(startTime, next_start_time)
            current_intersection_end = min(endTime, next_end_time)

            if (current_intersection_start >= current_intersection_end)
                continue

            if (intersections[`${current_intersection_start}_${current_intersection_end}`] !== undefined)
                intersections[`${current_intersection_start}_${current_intersection_end}`] += 1
            else
                intersections[`${current_intersection_start}_${current_intersection_end}`] = 1
        }
        tune_intersection(intersections)

    }
}

function findOptimalTime(availabilities) {
    
}

