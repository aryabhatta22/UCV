/**************************************************
 * Project : UCV
 * Version : 1.0.0
 * Description : RTC based movement of solar panel
 * Start Date : 14 Oct, 2019
 * *************************************************/

// ------------------- Data fetch and manipulation -------------------

//latitude & longitudes of Delhi
const latitude = 28.7041;
const longitude = 77.1025;
const curdate = new Date().toISOString().slice(0, 10);
const nextDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10);
console.log("Current Date : " + curdate);
console.log("Next Date : " + nextDate);

const request = require("request");
const today = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${curdate}`;
const tommorow = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${nextDate}`;
const Sun_IST = require("./User_modules/Sun_IST");
const HandlePanel = require("./User_modules/HandlePanel");

let dayLength = "";
let Sunset = "";
let SunriseTmrw = "";
request(today, (err, res, body) => {
  if (err) console.log(err);
  else {
    const data = JSON.parse(body);
    dayLength = data.results.day_length;
    Sunset = Sun_IST.UCTtoIST(data.results.sunset);
    console.log("\n======== Todays's Sun Info ========\n");
    console.log("Sunrise (IST) : " + Sun_IST.UCTtoIST(data.results.sunrise));
    console.log("Sunset (IST) : " + Sun_IST.UCTtoIST(data.results.sunset));
    console.log("Day Length (IST) : " + data.results.day_length);
  }
});

request(tommorow, (err, res, body) => {
  if (err) console.log(err);
  else {
    const data = JSON.parse(body);
    SunriseTmrw = Sun_IST.UCTtoIST(data.results.sunrise);
    console.log("\n======== Tommorow's Sun Info ========\n");
    console.log("Sunrise (IST) : " + Sun_IST.UCTtoIST(data.results.sunrise));
    console.log("Sunset (IST) : " + Sun_IST.UCTtoIST(data.results.sunset));
    console.log("Day Length (IST) : " + data.results.day_length);
  }
});

// ------------------- Serial communication with aurdino -------------------

const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const port = new SerialPort(
  "COM5",
  {
    baudRate: 9600
  },
  false
);
const parser = port.pipe(new Readline({ delimiter: "\n" }));

port.on("open", () => {
  console.log("***serial port open***");

  setTimeout(() => {
    port.write(
      `${HandlePanel.workingSpan(dayLength)}\n${HandlePanel.delay(
        Sunset,
        SunriseTmrw
      )}\n`,
      err => {
        if (err) console.log("Error has occured" + err);
      }
    );
  }, 5000);

  setTimeout(() => {
    port.write("String ended\n", err => {
      if (err) console.log("Error has occured" + err);
    });
  }, 5000);

  parser.on("data", data => {
    console.log("Aurdino : ", data.toString());
  });
});

SerialPort.list((err, ports) => {
  console.log("Working port : " + ports[0].comName); //portName
});
