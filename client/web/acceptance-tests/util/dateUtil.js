const getDateFromNow = days => {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = {
  getDateFromNow
};
