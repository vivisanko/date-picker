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
},
  determineIsDateInInterval: function(start, date, end) {
    let from = new Date(start);
    from.setDate(from.getDate() - 1);
    let to = new Date(end);
    to.setDate(to.getDate() + 1);
    return (date>from && date<to)
  },
  createMonthDays: function (date){
    let currentMonth = [];
    let day = 1;
    const numberDaysInMonth = this.determineNumberDaysInMonth(date);

    let startInd = this.determineStartWeekDay(date);
    while (currentMonth.length < startInd) {
      currentMonth.push("");
    }
    for (let i = startInd; i < numberDaysInMonth + startInd; i++) {
      currentMonth[i] = day;
      day += 1;
    }
    while (currentMonth.length % 7 !== 0) {
      currentMonth.push("");
    }
    return currentMonth
  },
  determineNumberDaysInMonth: function (date) {
    const month = date.getMonth();
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    if (month === 1) {
      const year = date.getFullYear();
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else return 28;
    }
    return 31;
  },
  determineStartWeekDay: function (date) {
    let startDay = new Date(date);
    startDay.setDate(1);
    let weekDay = startDay.getDay();

    return weekDay === 0 ? 6 : weekDay - 1;
  }

};
