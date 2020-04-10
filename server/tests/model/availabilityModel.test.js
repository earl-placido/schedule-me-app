const sqlService = require("../../api/container/services/sqlService");
const availabilityModel = require("../../api/model/availabilityModel");

jest.mock("../../api/container/services/sqlService");

describe("test availability model", () => {
  it("returns the correct availabilityId", async () => {
    const groupMemberId = 1;
    sqlService.query.mockImplementation(() => {
      return Promise.resolve([
        {
          AvailabilityId: 1,
          "CAST(StartTime as char)": "2020-03-09 16:53:14"
        },
        { AvailabilityId: 2, "CAST(StartTime as char)": "2020-03-09 16:53:14" }
      ]);
    });

    const data = await availabilityModel(sqlService).getAvailability(
      groupMemberId
    );
    expect(data[0].AvailabilityId).toEqual(1);
    expect(data[0]["CAST(StartTime as char)"]).toEqual("2020-03-09 16:53:14");
    expect(data[1].AvailabilityId).toEqual(2);
    expect(data[1]["CAST(StartTime as char)"]).toEqual("2020-03-09 16:53:14");
  });

  it("returns the error when getting availability id", async () => {
    const groupMemberId = 1;
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const data = await availabilityModel(sqlService).getAvailability(
      groupMemberId
    );
    expect(data.error).toEqual("sql error");
  });

  it("add availabilities", async () => {
    sqlService.query
      .mockImplementationOnce(() => {
        return Promise.resolve({
          affectedRows: 1,
          message: ""
        });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({ affectedRows: 1, message: "" });
      });

    const groupMemberId = 1;
    const date = new Date("2020-03-09T21:53:14.000Z");
    const formatted_date =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    let availableInfo = await availabilityModel(sqlService).addAvailability(
      groupMemberId,
      [-1],
      [formatted_date],
      [formatted_date]
    );

    expect(availableInfo.affectedRows).toEqual(1);
    expect(availableInfo.message).toEqual("");

    availableInfo = await availabilityModel(sqlService).addAvailability(
      groupMemberId,
      [1],
      [formatted_date],
      [formatted_date]
    );

    expect(availableInfo.affectedRows).toEqual(1);
    expect(availableInfo.message).toEqual("");
  });

  it("returns the error when adding availability id", async () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const groupMemberId = 1;
    const date = new Date("2020-03-09T21:53:14.000Z");
    const formatted_date =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    const availableInfo = await availabilityModel(sqlService).addAvailability(
      groupMemberId,
      [-1],
      [formatted_date],
      [formatted_date]
    );

    expect(availableInfo.error).toEqual("sql error");
  });

  it("delete availabilities", async () => {
    sqlService.query
      .mockImplementationOnce(() => {
        return Promise.resolve({
          length: 10
        });
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({});
      })
      .mockImplementationOnce(() => {
        return Promise.resolve({
          length: 9
        });
      });

    const groupMemberId = 1;
    const availabilityInfos = await availabilityModel(
      sqlService
    ).getAvailability(groupMemberId);
    const currentLength = availabilityInfos.length;
    await availabilityModel(sqlService).deleteAvailability([1]);
    const newAvailabilityInfos = await availabilityModel(
      sqlService
    ).getAvailability(groupMemberId);
    expect(newAvailabilityInfos.length).toEqual(currentLength - 1);
  });

  it("returns the error when deleting availability id", async () => {
    sqlService.query.mockImplementation(() => {
      return Promise.resolve({
        errno: 1,
        sqlMessage: "sql error"
      });
    });

    const data = await availabilityModel(sqlService).deleteAvailability([1]);

    expect(data.error).toEqual("sql error");
  });
});
