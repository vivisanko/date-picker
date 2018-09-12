export default {
  createDateString: function(date, withDay = true) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = date.getDate();
    const mon = months[date.getMonth()];
    const year = date.getFullYear();

    return withDay ? `${day} ${mon} ${year}` : `${mon} ${year}`;
  },
  checkFullCoincidenceDates: function(firstDate, secondDate,  fullCoincidence = true) {
    let first = firstDate;
    let second = secondDate;

  return fullCoincidence ?  first.getDate() === second.getDate() && first.getMonth() === second.getMonth() &&  first.getFullYear() === second.getFullYear() : first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth()
}
  
//   determineIsDateInInterval: function(date, start, end) {}
};
