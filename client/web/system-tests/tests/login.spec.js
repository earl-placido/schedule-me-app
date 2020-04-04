/// <reference types="cypress" />
const userUtil = require("../util/userUtil");

const createUser = user => {
  cy.visit("/");
  cy.get("p > .ant-btn").click();
  cy.get("#signup_firstName").type(user.fName, { delay: 10 });
  cy.get("#signup_lastName").type(user.lName, { delay: 10 });
  cy.get("#signup_email").type(user.email, { delay: 10 });
  cy.get("#signup_password").type(user.password, { delay: 10 });
  cy.get("#signup_confirm").type(user.password, { delay: 10 });
  cy.get(".ant-form-item-control-input-content > .ant-btn").click();
  cy.url().should("contain", "/main");

  cy.clearLocalStorage();
};

context("Test login functionality", () => {
  var generatedUser = userUtil.generateUser();

  before(() => {
    createUser(generatedUser);
  });

  it("Can login", () => {
    cy.visit("/");
    cy.get("#login_email").type(generatedUser.email, { delay: 10 });
    cy.get("#login_password").type(generatedUser.password, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/main");
  });

  it("Cannot login with invalid password", () => {
    cy.visit("/");
    cy.get("#login_email").type(generatedUser.email, { delay: 10 });

    // empty password
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get("div.ant-form-item-explain > div").should(
      "contain",
      "Please enter your password!"
    );

    // incorrect password
    cy.get("#login_password").type(`incorrect${generatedUser.password}`, {
      delay: 10
    });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(":nth-child(1) > :nth-child(1) > p").should(
      "contain",
      "Incorrect password"
    );

    cy.get("#login_password").clear();
  });

  it("Cannot login with invalid email", () => {
    cy.visit("/");
    cy.get("#login_password").type(`${generatedUser.password}`, { delay: 10 });

    // empty email
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(".ant-form-item-explain > div").should(
      "contain",
      "Please enter your email!"
    );

    // invalid email format
    cy.get("#login_email").type(`invalidformat`, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(".ant-form-item-explain > div").should(
      "contain",
      "Please enter a valid email address"
    );

    cy.get("#login_email").clear();

    // email that is not registered
    cy.get("#login_email").type(`notregistered_${generatedUser.email}`, {
      delay: 10
    });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(":nth-child(1) > :nth-child(1) > p").should(
      "contain",
      `Account with email notregistered_${generatedUser.email} not found`
    );
  });
});