import axios from "axios";
import moment from "moment";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import {
  selectDate,
  showModal,
  cancelAvailability,
  deleteAvailability,
  addAvailability,
  getInformation,
  handleAdd,
  onChangeRange,
  SELECT_DATE,
  SHOW_MODAL,
  DELETE_AVAILABILITY,
  GROUP_INFORMATION,
  ADD_AVAILABILITY,
  ADD_RANGE,
  CHANGE_RANGE
} from "../../../actions/components/InputAvailabilityModal.action";

describe("test group actions", () => {
  it("test selectdate action", () => {
    const date = moment();
    const value = selectDate(date, {});
    expect(value.type).toEqual(SELECT_DATE);
    expect(value.payload.selectedDate).toEqual(date);
    expect(value.payload.rangeHours).toEqual([""]);
  });

  it("test showmodal action", () => {
    const currentDate = moment();
    const availableDays = {};
    const value = showModal(currentDate, availableDays);
    expect(value.type).toEqual(SHOW_MODAL);
    expect(value.payload.modalVisible).toEqual(true);
  });

  it("test cancel availability action", () => {
    const value = cancelAvailability();
    expect(value.type).toEqual(SHOW_MODAL);
    expect(value.payload.modalVisible).toEqual(false);
  });

  it("test handleadd action", () => {
    const rangeHours = [""];
    const newRangeHours = handleAdd(rangeHours);

    expect(newRangeHours.type).toEqual(ADD_RANGE);
    expect(newRangeHours.payload.length).toEqual(2);
    expect(newRangeHours.payload[1]).toEqual("");
  });

  it("test onChangeRange action", async () => {
    let store;
    const flushAllPromises = () =>
      new Promise(resolve => setImmediate(resolve));
    const mockStore = configureMockStore();
    store = mockStore({});

    const date = moment();
    const date2 = moment();
    const rangeHours = [
      {
        AvailabilityId: -1,
        "CAST(StartTime as char)": date.format("YYYY-MM-DD HH:mm:ss"),
        "CAST(EndTime as char)": date2.format("YYYY-MM-DD HH:mm:ss")
      }
    ];
    onChangeRange(
      0,
      [moment("12-25-1995", "MM-DD-YYYY"), moment("12-25-1995", "MM-DD-YYYY")],
      rangeHours
    )(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(CHANGE_RANGE);
    console.log(store.getActions()[0]);
    expect(
      moment(
        store.getActions()[0].payload.rangeHours[0]["CAST(StartTime as char)"]
      ).year()
    ).toEqual(1995);
    expect(
      moment(
        store.getActions()[0].payload.rangeHours[0]["CAST(EndTime as char)"]
      ).month()
    ).toEqual(11);
  });
});

describe("test contacting server from group", () => {
  let store, httpMock;
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    const mockStore = configureMockStore();
    store = mockStore({});
  });

  it("test delete availability action", async () => {
    httpMock
      .onDelete(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`
      )
      .reply(200, {
        data: { success: true, error: false }
      });

    const date = moment("2020-03-17 11:30");
    const rangeHours = [
      [1, [date, date]],
      [2, [date, date]]
    ];
    deleteAvailability(rangeHours, { 2: rangeHours })(store.dispatch); // should remove the last item in the array
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(DELETE_AVAILABILITY);
    expect(store.getActions()[0].payload.rangeHours.length).toEqual(1);
    expect(store.getActions()[0].payload.rangeHours[0][0]).toEqual(1);
    expect(store.getActions()[0].payload.rangeHours[0][1]).toEqual([
      date,
      date
    ]);
  });

  it("test add availability action", async () => {
    const selectedDate = moment();
    const rangeHours = [[-1, [selectedDate, selectedDate]]];
    let availabilities = {};

    httpMock
      .onPost(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/availability`
      )
      .reply(200, {
        success: true,
        error: false,
        ids: [1]
      });
    addAvailability(
      1,
      selectedDate,
      rangeHours,
      availabilities
    )(store.dispatch);
    await flushAllPromises();

    expect(store.getActions()[0].type).toEqual(ADD_AVAILABILITY);
    // close modal, add rangeHours to availableDays, reset rangeHours to empty
    expect(store.getActions()[0].payload.modalVisible).toEqual(false);
    expect(
      store.getActions()[0].payload.availabilities[
        selectedDate.format("YYYY-MM-DD")
      ]
    ).toEqual(rangeHours);
  });

  it("test obtaining group information", async () => {
    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/1000000`)
      .reply(200, {
        data: {
          GroupId: 1,
          GroupName: "we"
        }
      });

    httpMock
      .onGet(`${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/users/email/null`)
      .reply(200, {
        userId: 1
      });

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/1000000/members/1`
      )
      .reply(200, {
        groupMembers: [{ GroupMemberId: 1 }]
      });

    httpMock
      .onGet(
        `${process.env.REACT_APP_SERVER_ENDPOINT}api/v1/groups/members/1/availability`
      )
      .reply(200, [
        {
          AvailabilityId: 1,
          StartTime: moment().format("YYYY-MM-DD HH:mm:ss"),
          EndTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }
      ]);

    getInformation(1000000)(store.dispatch);
    await flushAllPromises();
    expect(store.getActions()[0].type).toEqual(GROUP_INFORMATION);
    expect(store.getActions()[0].payload.memberId).toEqual(1);
    expect(
      Object.keys(store.getActions()[0].payload.availabilities).length
    ).toEqual(1);
  });
});
