const moment = require('moment');
function isValidDate(value) {
  const dateformat = 'YYYY-MM-DD'
  return moment(value, dateformat, true).isValid();
}
exports.isValidDate = isValidDate;
