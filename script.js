/**************************************************
 * Project : UCV
 * Version : 1.0.0
 * Description : RTC based movement of solar panel
 * Start Date : 14 Oct, 2019
 * *************************************************/

//latitude & longitudes of Delhi
const latitude = 28.6517178;
const longitude = 77.2219388;
const curdate = new Date().toISOString().slice(0, 10);

const request = require("request");
const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${curdate}`;
const Sun_IST = require("./User_modules/Sun_IST");

request(url, (err, res, body) => {
  if (err) console.log(err);
  else {
    const data = JSON.parse(body);
    console.log("Sunrise (UTC) : " + data.results.sunrise);
    console.log("Sunrise (IST) : " + Sun_IST.USTtoIST(data.results.sunrise));
  }
});

// FIXME:

// const SerialPort = require("serialport");
// const port = new SerialPort("COM5", {
//   baudRate: 9600
// });

// port.write("Testing message");
// // port.write1(Buffer.from("Testing message"));
// SerialPort.list((err, ports) => {
//   console.log(ports[0].comName); //portName
// });
