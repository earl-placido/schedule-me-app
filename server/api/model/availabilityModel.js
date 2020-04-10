module.exports = mysql => {
  const availabilityModel = {};

  availabilityModel.getAvailability = groupMemberId => {
    return mysql
      .query(
        `
                    SELECT AvailabilityId, CAST(StartTime as char), CAST(EndTime as char) FROM 
                    \`Availability\` WHERE GroupMemberId = ?;
                `,
        [groupMemberId]
      )
      .then(res => {
        if (res.errno) {
          return { error: res.sqlMessage };
        } else {
          return res;
        }
      });
  };

  availabilityModel.addAvailability = (
    groupMemberId,
    availabilityIds,
    startTimes,
    endTimes
  ) => {
    // check is made in router to ensure they are all same length
    let query = `
      ${availabilityIds
        .map((availabilityId, index) => {
          let availabilityQuery;
          if (availabilityId === -1) {
            availabilityQuery = mysql.format(
              `INSERT INTO \`Availability\` (GroupMemberId, StartTime, EndTime) VALUES (?, ?, ?);`,
              [groupMemberId, startTimes[index], endTimes[index]]
            );
          } else {
            availabilityQuery = mysql.format(
              `UPDATE \`Availability\` SET StartTime=?, EndTime=? WHERE AvailabilityId=?;`,
              [startTimes[index], endTimes[index], availabilityId]
            );
          }

          return availabilityQuery;
        })
        .join(`\n`)}
      `;

    return mysql.query(query).then(res => {
      if (res.errno) {
        return { error: res.sqlMessage };
      } else {
        return res;
      }
    });
  };

  availabilityModel.deleteAvailability = availabilityIds => {
    // check is made in router to ensure they are all same length
    let query = `
      ${availabilityIds
        .map(availabilityId =>
          mysql.format(`DELETE FROM \`Availability\` WHERE AvailabilityId=?;`, [
            availabilityId
          ])
        )
        .join(`\n`)}`;

    return mysql.query(query).then(res => {
      if (res.errno) {
        return { error: res.sqlMessage };
      } else {
        return res;
      }
    });
  };

  return availabilityModel;
};
