module.exports = {
  createDateString(date, withDay = true) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const day = date.getDate();
    const mon = months[date.getMonth()];
    const year = date.getFullYear();

    return withDay ? `${day} ${mon} ${year}` : `${mon} ${year}`;
  },
  checkFullCoincidenceDates(firstDate, secondDate, fullCoincidence = true) {
    const first = firstDate;
    const second = secondDate;
    return fullCoincidence ? first.getDate() === second.getDate()
      && first.getMonth() === second.getMonth()
      && first.getFullYear() === second.getFullYear() : first.getFullYear() === second.getFullYear()
      && first.getMonth() === second.getMonth()
  },
  determineIsDateInInterval(start, date, end) {
    const from = new Date(start);
    from.setDate(from.getDate() - 1);
    const to = new Date(end);
    to.setDate(to.getDate() + 1);
    return (date > from && date < to);
  },
  createMonthDays(date) {
    const currentMonth = [];
    let day = 1;
    const numberDaysInMonth = this.determineNumberDaysInMonth(date);

    const startInd = this.determineStartWeekDay(date);
    while (currentMonth.length < startInd) {
      currentMonth.push('');
    }
    for (let i = startInd; i < numberDaysInMonth + startInd; i += 1) {
      currentMonth[i] = day;
      day += 1;
    }
    while (currentMonth.length % 7 !== 0) {
      currentMonth.push('');
    }
    return currentMonth;
  },
  determineNumberDaysInMonth(date) {
    const month = date.getMonth();
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      return 30;
    }
    if (month === 1) {
      const year = date.getFullYear();
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } return 28;
    }
    return 31;
  },
  determineStartWeekDay(date) {
    const startDay = new Date(date);
    startDay.setDate(1);
    const weekDay = startDay.getDay();

    return weekDay === 0 ? 6 : weekDay - 1;
  },
};
