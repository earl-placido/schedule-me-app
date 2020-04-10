const bcrypt = require("bcrypt");

const comparePasswordAsync = async (password, saltedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, saltedPassword, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = { comparePasswordAsync };
