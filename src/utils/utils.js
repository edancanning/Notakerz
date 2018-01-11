function timeSince(timeStamp) {
  var time = new Date(timeStamp);
  var now = new Date(),
    secondsPast = (now.getTime() - time.getTime()) / 1000;
  if (secondsPast < 60) {
    //eslint-disable-next-line
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    //eslint-disable-next-line
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    //eslint-disable-next-line
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    const day = time.getDate();
    const month = time
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
      //eslint-disable-next-line
      time.getFullYear() == now.getFullYear() ? "" : " " + time.getFullYear();
    return day + " " + month + year;
  }
}

function courseToTitle(code, semester, year, professor) {
  return `${code} ${semester} ${String(year).substr(2)} (${professor})`;
}
export { timeSince, courseToTitle };
