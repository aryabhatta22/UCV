/* ========================= module to convert UTC to IST ========================= */

// Time differences value
const hrsDiff = 5;
const minutesDiff = 30;
const secondsDiff = 00;

//------- Function definitions ----------

exports.UCTtoIST = UCTtime => {
  //slicing the UCT time
  let hrs = parseInt(UCTtime.slice(0, 2));
  let minutes = parseInt(UCTtime.slice(3, 5));
  let seconds = parseInt(UCTtime.slice(6, 8));
  let meredian = UCTtime.slice(9, 11);

  //converting UCT to IST

  if (seconds + secondsDiff > 60) {
    minutesDiff++;
  }
  seconds = (seconds + secondsDiff) % 60;

  if (minutes + minutesDiff > 60) {
    hrs++;
  }
  minutes = (minutes + minutesDiff) % 60;

  if (hrs < 12 && hrs + hrsDiff > 12) {
    if (meredian === "AM") meredian = "PM";
    else meredian = "AM";
  }
  hrs = (hrs + hrsDiff) % 12;
  return standardTimeFormat(hrs, minutes, seconds, meredian);
};

standardTimeFormat = (hrs, minutes, seconds, meredian) => {
  //converting int to String type

  hrs = hrs.toString();
  minutes = minutes.toString();
  seconds = seconds.toString();

  if (hrs.length === 1) hrs = 0 + hrs;
  if (minutes.length === 1) minutes = 0 + minutes;
  if (seconds.length === 1) seconds = 0 + seconds;

  return `${hrs}:${minutes}:${seconds} ${meredian}`;
};

//calling test function
// USTtoIST("11:12:00 PM");
