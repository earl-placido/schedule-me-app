/// <reference types="cypress" />

var user;

context('Test register functionality', () => {
  before(() => {
    user = {
      fName: `fName_${Math.random().toString(36).slice(2)}`,
      lName: `Name_${Math.random().toString(36).slice(2)}`,
      email: `${Math.random().toString(36).slice(2)}@email.com`,
      password: Math.random().toString(36).slice(2)
    }
  })

  it('Cannot create user with invalid email', () => {
    let invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      '.email@example.com',
      '”(),:;<>[\]@example.com',
      'this\ is"really"not\allowed@example.com'
    ];

    cy.visit('/');

    cy.contains('Schedule Me Up');
    cy.contains('Continue as Guest');
    cy.contains('Sign Up');

    cy.get('p > .ant-btn').click();
    
    cy.get('#signup_firstName').type(user.fName, { delay: 10});
    cy.get('#signup_lastName').type(user.lName, { delay: 10});
    cy.get('#signup_password').type(user.password, { delay: 10});
    cy.get('#signup_confirm').type(user.password, { delay: 10});

    invalidEmails.forEach(email => {
      cy.get('#signup_email').type(email, { delay: 10});
      cy.get('.ant-form-item-control-input-content > .ant-btn').click();
      cy.get('.ant-form-item-explain > div').should('contain', 'Please enter a valid email address');
      cy.url().should('contain', '/');
      cy.get('#signup_email').clear();
    })
  })

  it('Cannot create user with invalid password', () => {
    let invalidPasswords = [
      'longharactersabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
      'short'
    ];

    cy.visit('/');

    cy.contains('Schedule Me Up');
    cy.contains('Continue as Guest');
    cy.contains('Sign Up');

    cy.get('p > .ant-btn').click();
    
    cy.get('#signup_firstName').type(user.fName, { delay: 10});
    cy.get('#signup_lastName').type(user.lName, { delay: 10});
    cy.get('#signup_email').type(user.email, { delay: 10});

    invalidPasswords.forEach(password => {
      cy.get('#signup_password').type(password, { delay: 10});
      cy.get('#signup_confirm').type(password, { delay: 10});
      cy.get('.ant-form-item-control-input-content > .ant-btn').click();
      cy.url().should('contain', '/');
      cy.get('#signup_password').clear();
      cy.get('#signup_confirm').clear();
    })
  })

    it('Can register', () => {

    cy.visit('/');

    cy.contains('Schedule Me Up');
    cy.contains('Continue as Guest');
    cy.contains('Sign Up');

    cy.get('p > .ant-btn').click();
    
    cy.get('#signup_firstName').type(user.fName, { delay: 10});
    cy.get('#signup_lastName').type(user.lName, { delay: 10});
    cy.get('#signup_email').type(user.email, { delay: 10});
    cy.get('#signup_password').type(user.password, { delay: 10});
    cy.get('#signup_confirm').type(user.password, { delay: 10});

    // signup button
    cy.get('.ant-form-item-control-input-content > .ant-btn').click();
    
    cy.url().should('contain', '/main');
  })

  it('Cannot create user with same email', () => {

    cy.visit('/');

    cy.contains('Schedule Me Up');
    cy.contains('Continue as Guest');
    cy.contains('Sign Up');

    cy.get('p > .ant-btn').click();
    
    cy.get('#signup_firstName').type(user.fName, { delay: 10});
    cy.get('#signup_lastName').type(user.lName, { delay: 10});
    cy.get('#signup_email').type(user.email, { delay: 10});
    cy.get('#signup_password').type(user.password, { delay: 10});
    cy.get('#signup_confirm').type(user.password, { delay: 10});

    // signup button
    cy.get('.ant-form-item-control-input-content > .ant-btn').click();
    
    cy.url().should('contain', '/');

    cy.get(':nth-child(1) > :nth-child(1) > p').should('contain', 'Email address entered is taken.');
  })
})
