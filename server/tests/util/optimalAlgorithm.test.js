require("dotenv").config();
const findOptimalTime = require("../../api/util/optimalAlgorithm");

describe("test optimal time algorithm", () => {
  const availabilities = [
    {
      "CAST(A.StartTime as char)": "2020-03-11 5:01",
      "CAST(A.EndTime as char)": "2020-03-11 7:01"
    },

    {
      "CAST(A.StartTime as char)": "2020-03-12 1:01",
      "CAST(A.EndTime as char)": "2020-03-12 4:01"
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
      ["2020-03-12:2_3", 3],
      ["2020-03-12:1.01_4", 2],
      ["2020-03-14:2_3", 2],
      ["2020-03-11:5.01_7.01", 1],
      ["2020-03-12:1.01_4.01", 1],
      ["2020-03-12:1_4", 1],
      ["2020-03-14:1_3", 1]
    ]);
  });
});
