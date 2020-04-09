/// <reference types="cypress" />
const { generateUser } = require("../util/userUtil");
const { generateGroup } = require("../util/groupUtil");
const { getDateFromNow } = require("../util/dateUtil");

context("Acceptance test", () => {
  const generatedGroupOwner = generateUser();
  const generatedGroupUser = generateUser();
  const generatedGroup = generateGroup();
  const generatedDate = getDateFromNow(1)
    .toISOString()
    .slice(0, 10);

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Can create user", () => {
    cy.visit("/");
    cy.get("p > .ant-btn").click();
    cy.get("#signup_firstName").type(generatedGroupOwner.fName, { delay: 10 });
    cy.get("#signup_lastName").type(generatedGroupOwner.lName, { delay: 10 });
    cy.get("#signup_email").type(generatedGroupOwner.email, { delay: 10 });
    cy.get("#signup_password").type(generatedGroupOwner.password, {
      delay: 10
    });
    cy.get("#signup_confirm").type(generatedGroupOwner.password, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/main");
  });

  it("Can create group", () => {
    cy.get("#create-group-web > a").click();

    cy.get("#group-name-input").type(generatedGroup.groupName, { delay: 10 });
    cy.get("#group-description-input").type(generatedGroup.groupDesc, {
      delay: 10
    });

    cy.get("#next-button").click();
    cy.get("#duration").type(generatedGroup.meetingDuration.replace(/:/, ""), {
      delay: 10
    });
    cy.get("#frequency").type(generatedGroup.meetingFrequency, { delay: 10 });
    cy.get("#location").type(generatedGroup.meetingLocation, { delay: 10 });
    cy.get("#next-button").click();

    cy.get("#created-group-code")
      .invoke("text")
      .then(code => cy.sharedVariables("groupCode", code));
    cy.get("#go-to-group-button").click();

    cy.sharedVariables("groupCode").then(code =>
      cy.url().should("contain", `/groups/${code}`)
    );
    cy.get("#group-name").should(
      "contain",
      `Group: ${generatedGroup.groupName}`
    );
    cy.get("#group-desc-detail").should(
      "contain",
      `${generatedGroup.groupDesc}`
    );
    cy.get("#meeting-duration-detail").should(
      "contain",
      `Meeting Duration: ${generatedGroup.meetingDuration}`
    );
    cy.get("#meeting-frequency-detail").should(
      "contain",
      `Meeting Frequency: ${generatedGroup.meetingFrequency}`
    );
    cy.get("#meeting-location-detail").should(
      "contain",
      `Meeting Location: ${generatedGroup.meetingLocation}`
    );

    cy.get("#show-code-button").click();
    cy.sharedVariables("groupCode").then(code =>
      cy.get("#share-group-code").should("contain", code)
    );
  });

  it("Can input availability", () => {
    cy.get("#input-availability-button").click();
    cy.wait(200);
    cy.get("#availability-group-name").should(
      "contain",
      `${generatedGroup.groupName}`
    );

    cy.get(`[title="${generatedDate}"]`)
      .should("be.visible")
      .click();
    cy.get(".modal-header").should("contain", "Input availability time");

    // click the range buttons
    cy.get(".ant-picker-input-active > input").click();
    cy.wait(100);
    cy.get(
      ":nth-child(1) > :nth-child(1) > .ant-picker-time-panel-cell-inner"
    ).click();
    cy.wait(100);
    cy.get(":nth-child(3) > input").click();
    cy.wait(100);
    cy.get(
      ":nth-child(1) > :nth-child(2) > .ant-picker-time-panel-cell-inner"
    ).click();
    cy.wait(100);
    cy.get(".ant-picker-ok > .ant-btn").click();

    // add another time range
    cy.get(".add-range-button").click();

    cy.get(
      ":nth-child(4) > .ant-picker > .ant-picker-input-active > input"
    ).click();
    cy.get(
      ":nth-child(4) > .ant-picker > .ant-picker-input-active > input"
    ).type("4:00", { delay: 10 });

    cy.get(":nth-child(4) > .ant-picker > :nth-child(3) > input").click();
    cy.get(
      ":nth-child(4) > .ant-picker > :nth-child(3) > input"
    ).type("5:00{enter}", { delay: 10 });
    cy.get(".ant-modal-footer > div > .ant-btn-primary").click();

    cy.get("#availability-done-button").click();
  });

  it("Can logout", () => {
    cy.get("#username").click();
    cy.get("#logout-button").click();
    cy.url().should("contain", "/");
  });

  it("Can login", () => {
    // send a call to the server to create the user
    cy.request({
      method: "POST",
      url: "http://localhost:8000/api/v1/auth/signup",
      form: true,
      body: {
        email: generatedGroupUser.email,
        password: generatedGroupUser.password,
        firstName: generatedGroupUser.fName,
        lastName: generatedGroupUser.lName
      }
    });

    cy.get("#login_email").type(`${generatedGroupUser.email}`, { delay: 10 });
    cy.get("#login_password").type(`${generatedGroupUser.password}`, {
      delay: 10
    });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/main");
  });

  it("Can join group", () => {
    cy.get("#join-group-web").click();
    cy.get("#group-code-input").click();

    cy.sharedVariables("groupCode").then(code =>
      cy.get("#group-code-input").type(code, { delay: 10 })
    );
    cy.get("#group-code-okay-button").click();
    cy.get("#group-code-go-to-group-button").contains("Go to Group");
    cy.get("#group-code-go-to-group-button").click();

    cy.sharedVariables("groupCode").then(code =>
      cy.url().should("contain", `/groups/${code}`)
    );
    cy.get("#group-name").should(
      "contain",
      `Group: ${generatedGroup.groupName}`
    );
    cy.get("#group-desc-detail").should(
      "contain",
      `${generatedGroup.groupDesc}`
    );
    cy.get("#meeting-duration-detail").should(
      "contain",
      `Meeting Duration: ${generatedGroup.meetingDuration}`
    );
    cy.get("#meeting-frequency-detail").should(
      "contain",
      `Meeting Frequency: ${generatedGroup.meetingFrequency}`
    );
    cy.get("#meeting-location-detail").should(
      "contain",
      `Meeting Location: ${generatedGroup.meetingLocation}`
    );

    cy.get("#group-members-list").contains(
      `${generatedGroupUser.fName} ${generatedGroupUser.lName}`
    );
  });

  it("Can add availability to a joined group", () => {
    cy.get("#input-availability-button").click();
    cy.wait(200);
    cy.get("#availability-group-name").should(
      "contain",
      `${generatedGroup.groupName}`
    );

    cy.get(`[title="${generatedDate}"]`)
      .should("be.visible")
      .click();
    cy.get(".modal-header").should("contain", "Input availability time");

    // click the range buttons
    cy.get(".ant-picker-input-active > input").click();
    cy.get(".ant-picker-input-active > input").type("4:00", { delay: 10 });
    cy.get(":nth-child(3) > input").click();
    cy.get(":nth-child(3) > input").type("5:00{enter}", { delay: 10 });
    cy.get(".ant-modal-footer > div > .ant-btn-primary").click();
    cy.get("#availability-done-button").click();
  });

  it("Can logout again", () => {
    cy.get("#username").click();
    cy.get("#logout-button").click();
    cy.url().should("contain", "/");
  });

  it("Can login again", () => {
    cy.get("#login_email").type(generatedGroupOwner.email, { delay: 10 });
    cy.get("#login_password").type(generatedGroupOwner.password, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/main");
  });

  it("Can select group", () => {
    cy.sharedVariables("groupCode").then(code =>
      cy.get(`[href="/groups/${code}/"]`).scrollIntoView()
    );
    cy.sharedVariables("groupCode").then(code =>
      cy
        .get(`[href="/groups/${code}/"] > .ant-list-item > .ant-list-item-meta`)
        .click()
    );

    cy.sharedVariables("groupCode").then(code =>
      cy.url().should("contain", `/groups/${code}`)
    );
    cy.get("#group-name").should(
      "contain",
      `Group: ${generatedGroup.groupName}`
    );
    cy.get("#group-desc-detail").should(
      "contain",
      `${generatedGroup.groupDesc}`
    );
    cy.get("#meeting-duration-detail").should(
      "contain",
      `Meeting Duration: ${generatedGroup.meetingDuration}`
    );
    cy.get("#meeting-frequency-detail").should(
      "contain",
      `Meeting Frequency: ${generatedGroup.meetingFrequency}`
    );
    cy.get("#meeting-location-detail").should(
      "contain",
      `Meeting Location: ${generatedGroup.meetingLocation}`
    );
  });

  it("Can set meeting time", () => {
    cy.get("#change-meeting-time").click();
    cy.get("#meeting-modal-title").should("contain", "Choose a meeting time");
    cy.get(".optimal-time-display")
      .contains("0400 - 0500")
      .click();
    cy.get("#meeting-modal-done-button").click();
    cy.get("#meeting-time-detail").should("contain", "04:00 - 05:00");
  });

  it("Can remove availability", () => {
    cy.get("#input-availability-button").click();
    cy.get(`[title="${generatedDate}"]`)
      .should("be.visible")
      .click();
    cy.get(".delete-button").click();
    cy.get(".delete-button").click();
    cy.get(".ant-modal-footer > div > .ant-btn-primary").click();
    cy.get("#availability-done-button").click();
    cy.get("#change-meeting-time").click();
    cy.get(".optimal-time-display")
      .contains("0000 - 0100")
      .should("not.exist");
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
});
