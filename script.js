/**************************************************
 * Project : UCV
 * Version : 1.0.0
 * Description : RTC based movement of solar panel
 * Start Date : 14 Oct, 2019
 * *************************************************/

const SerialPort = require("serialport");
const port = new SerialPort("COM5", {
  baudRate: 9600
});

port.write("Testing message");
// port.write1(Buffer.from("Testing message"));
SerialPort.list((err, ports) => {
  console.log(ports[0].comName); //portName
});
