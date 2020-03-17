require("dotenv").config();
const findOptimalTime = require("../../api/util/OptimalAlgorithm");

describe("test optimal time algorithm", () => {
  const availabilities = [
    {
      "CAST(A.StartTime as char)": "2020-03-11 5:00",
      "CAST(A.EndTime as char)": "2020-03-11 7:00"
    },

    {
      "CAST(A.StartTime as char)": "2020-03-12 1:00",
      "CAST(A.EndTime as char)": "2020-03-12 4:00"
    },
    {
      "CAST(A.StartTime as char)": "2020-03-12 1:00",
      "CAST(A.EndTime as char)": "2020-03-12 4:00"
    },
    {
      "CAST(A.StartTime as char)": "2020-03-12 2:00",
      "CAST(A.EndTime as char)": "2020-03-12 3:00"
    },

    {
      "CAST(A.StartTime as char)": "2020-03-14 1:00",
      "CAST(A.EndTime as char)": "2020-03-14 3:00"
    },
    {
      "CAST(A.StartTime as char)": "2020-03-14 2:00",
      "CAST(A.EndTime as char)": "2020-03-14 3:00"
    }
  ];

  it("returns the correct optimal time algorithm", async () => {
    const optimalAvailabilities = findOptimalTime(availabilities);
    expect(optimalAvailabilities).toEqual([
      ["4:2_3", 3],
      ["4:1_4", 1],
      ["6:2_3", 1]
    ]);
  });
});
