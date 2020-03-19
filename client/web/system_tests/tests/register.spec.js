/// <reference types="cypress" />

context("Test register functionality", () => {
  var generatedUser;

  before(() => {
    // generate a random user
    generatedUser = {
      fName: `fName_${Math.random()
        .toString(36)
        .slice(2)}`,
      lName: `Name_${Math.random()
        .toString(36)
        .slice(2)}`,
      email: `${Math.random()
        .toString(36)
        .slice(2)}@email.com`,
      password: Math.random()
        .toString(36)
        .slice(2)
    };
  });

  it("Cannot create user with invalid email", () => {
    let invalidEmails = [
      "plainaddress",
      "#@%^%#$@#$@#.com",
      "@example.com",
      "Joe Smith <email@example.com>",
      "email.example.com",
      "email@example@example.com",
      ".email@example.com",
      "”(),:;<>[]@example.com",
      'this is"really"notallowed@example.com'
    ];

    cy.visit("/");

    cy.contains("Schedule Me Up");
    cy.contains("Continue as Guest");
    cy.contains("Sign Up");

    cy.get("p > .ant-btn").click();

    cy.get("#signup_firstName").type(generatedUser.fName, { delay: 10 });
    cy.get("#signup_lastName").type(generatedUser.lName, { delay: 10 });
    cy.get("#signup_password").type(generatedUser.password, { delay: 10 });
    cy.get("#signup_confirm").type(generatedUser.password, { delay: 10 });

    invalidEmails.forEach(email => {
      cy.get("#signup_email").type(email, { delay: 10 });
      cy.get(".ant-form-item-control-input-content > .ant-btn").click();
      cy.get(".ant-form-item-explain > div").should(
        "contain",
        "Please enter a valid email address"
      );
      cy.url().should("contain", "/");
      cy.get("#signup_email").clear();
    });
  });

  it("Cannot create user with invalid passwords", () => {
    let longPassword =
      "longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
    let shortPassword = "short";

    cy.visit("/");

    cy.contains("Schedule Me Up");
    cy.contains("Continue as Guest");
    cy.contains("Sign Up");

    cy.get("p > .ant-btn").click();

    cy.get("#signup_firstName").type(generatedUser.fName, { delay: 10 });
    cy.get("#signup_lastName").type(generatedUser.lName, { delay: 10 });
    cy.get("#signup_email").type(generatedUser.email, { delay: 10 });

    // length over 100
    cy.get("#signup_password").type(longPassword, { delay: 10 });
    cy.get("#signup_confirm").type(longPassword, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(".ant-form-item-explain > div").should(
      "contain",
      "Password cannot be over 100 characters!"
    );

    cy.get("#signup_password").clear();
    cy.get("#signup_confirm").clear();

    // length less than 8
    cy.get("#signup_password").type(shortPassword, { delay: 10 });
    cy.get("#signup_confirm").type(shortPassword, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(
      ".ant-form-item-has-error > .ant-col > .ant-form-item-explain > div"
    ).should("contain", "Password must be atleast 8 characters");

    cy.get("#signup_password").clear();
    cy.get("#signup_confirm").clear();

    // passwords not matching
    cy.get("#signup_password").type(generatedUser.password, { delay: 10 });
    cy.get("#signup_confirm").type(`${generatedUser.password}2`, { delay: 10 });
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();
    cy.url().should("contain", "/");
    cy.get(
      ".ant-form-item-with-help.ant-form-item-has-feedback > .ant-col > .ant-form-item-explain > div"
    ).should("contain", "The two passwords that you entered do not match!");
  });

  it("Can register", () => {
    cy.visit("/");

    cy.contains("Schedule Me Up");
    cy.contains("Continue as Guest");
    cy.contains("Sign Up");

    cy.get("p > .ant-btn").click();

    cy.get("#signup_firstName").type(generatedUser.fName, { delay: 10 });
    cy.get("#signup_lastName").type(generatedUser.lName, { delay: 10 });
    cy.get("#signup_email").type(generatedUser.email, { delay: 10 });
    cy.get("#signup_password").type(generatedUser.password, { delay: 10 });
    cy.get("#signup_confirm").type(generatedUser.password, { delay: 10 });

    // signup button
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();

    cy.url().should("contain", "/main");
  });

  it("Cannot create user with same email", () => {
    cy.visit("/");

    cy.contains("Schedule Me Up");
    cy.contains("Continue as Guest");
    cy.contains("Sign Up");

    cy.get("p > .ant-btn").click();

    cy.get("#signup_firstName").type(generatedUser.fName, { delay: 10 });
    cy.get("#signup_lastName").type(generatedUser.lName, { delay: 10 });
    cy.get("#signup_email").type(generatedUser.email, { delay: 10 });
    cy.get("#signup_password").type(generatedUser.password, { delay: 10 });
    cy.get("#signup_confirm").type(generatedUser.password, { delay: 10 });

    // signup button
    cy.get(".ant-form-item-control-input-content > .ant-btn").click();

    cy.url().should("contain", "/");

    cy.get(":nth-child(1) > :nth-child(1) > p").should(
      "contain",
      "Email address entered is taken."
    );
  });
});
