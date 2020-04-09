const generateUser = () => {
  let generatedUser = {
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

  return generatedUser;
};

module.exports = {
  generateUser
};
