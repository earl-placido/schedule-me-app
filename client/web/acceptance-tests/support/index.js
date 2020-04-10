let localStorageMemory = {};
let sharedVariables = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    localStorageMemory[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(localStorageMemory).forEach(key => {
    localStorage.setItem(key, localStorageMemory[key]);
  });
});

Cypress.Commands.add("sharedVariables", (name, value) => {
  if (value) {
    sharedVariables[name] = value;
  }

  return sharedVariables[name];
});

// for exceptions unrelated to cypress
Cypress.on("uncaught:exception", () => {
  return false;
});
