/* ========================= Module to Handle Solar panel ========================= */

exports.delay = (Sunset, SunriseTmrw) => {
  let SunsetHrs = parseInt(Sunset.slice(0, 2));
  let SunsetMinutes = parseInt(Sunset.slice(3, 5));
  let SunsetSeconds = parseInt(Sunset.slice(6, 8));

  let SunriseHrs = parseInt(SunriseTmrw.slice(0, 2));
  let SunriseMinutes = parseInt(SunriseTmrw.slice(3, 5));
  let SunriseSeconds = parseInt(SunriseTmrw.slice(6, 8));

  //calculation
  var totalSeconds, totalMinutes, totalHrs;

  //delay till 12:00:00

  if (SunsetSeconds != 0) {
    totalSeconds = 60 - SunsetSeconds;
    SunsetMinutes++;
  } else totalSeconds = 0;

  if (SunsetMinutes != 0) {
    totalMinutes = 60 - SunsetMinutes;
    SunsetHrs++;
  } else totalMinutes = 0;

  totalHrs = 12 - SunsetHrs;

  if (totalSeconds + SunriseSeconds >= 60) {
    totalSeconds = (totalSeconds + SunriseSeconds) % 60;
    totalMinutes++;
  } else totalSeconds = totalSeconds + SunriseSeconds;

  if (totalMinutes + SunriseMinutes >= 60) {
    totalMinutes = (totalMinutes + SunriseMinutes) % 60;
    totalHrs++;
  } else totalMinutes = totalMinutes + SunriseMinutes;

  totalHrs += SunriseHrs;

  return totalHrs * 3600000 + totalMinutes * 60000 + totalSeconds * 1000;
};

exports.workingSpan = dayLength => {
  let hrs = parseInt(dayLength.slice(0, 2));
  let minutes = parseInt(dayLength.slice(3, 5));
  let seconds = parseInt(dayLength.slice(6, 8));

  return hrs * 3600000 + minutes * 60000 + seconds * 1000;
};
