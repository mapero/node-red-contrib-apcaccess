# Node-RED nodes for APC UPS Daemon

[![npm version](https://badge.fury.io/js/node-red-contrib-apcaccess.svg)](https://badge.fury.io/js/node-red-contrib-apcaccess)

[![NPM](https://nodei.co/npm/node-red-contrib-apcaccess.png)](https://nodei.co/npm/node-red-contrib-apcaccess/)

Node-RED nodes to request status and events from an APC UPS Daemon NIS running on the network.

![Screenshot](https://raw.githubusercontent.com/mapero/node-red-contrib-apcaccess/master/doc/screen.png)

## Prerequisites

An APC UPS Daemon has to run on a local or remote machine and has to be configured as network information server (NIS). For more information visit the apcupsd website.

* [APC UPS Daemon](http://www.apcupsd.org/) - The APC UPS Daemon
* [APCUPSD User Manual](https://maven.apache.org/) - The User Manual for the APC UPS Daemon containing installation instructions
* [APCUPSD NIS Example Configuration](http://www.apcupsd.org/manual/manual.html#nis-server-client-configuration-using-the-net-driver) - Howto configure the APCUPSD as NIS

## Nodes

### Server Configuration Node

Configure the APC UPS Daemon NIS settings to connect to. You can either use an ip address or hostname combined with the port of the server (default: 3551).

### Request Node

This node allows you to send request to an APC UPS Daemon Network Information Server (apcupsd NIS). Currently it supports the following commands:

* status
* events
* statusJson

Use one of the mentioned commands as payload of the input message. It will output a string with the result or in case of statusJson an Object containing the current status of the APC UPS.

#### Example Outputs

##### Command: status

```
APC      : 001,034,0839
DATE     : 2017-04-30 13:41:04 +0200  
HOSTNAME : alarmpi
VERSION  : 3.14.14 (31 May 2016) unknown
UPSNAME  : alarmpi
CABLE    : USB Cable
DRIVER   : USB UPS Driver
UPSMODE  : Stand Alone
STARTTIME: 2017-04-28 12:04:47 +0200  
MODEL    : Back-UPS ES 700G
STATUS   : ONLINE
LINEV    : 232.0 Volts
LOADPCT  : 5.0 Percent
BCHARGE  : 100.0 Percent
TIMELEFT : 36.4 Minutes
MBATTCHG : 5 Percent
MINTIMEL : 3 Minutes
MAXTIME  : 0 Seconds
SENSE    : Medium
LOTRANS  : 180.0 Volts
HITRANS  : 266.0 Volts
ALARMDEL : 30 Seconds
BATTV    : 13.5 Volts
LASTXFER : Unacceptable line voltage changes
NUMXFERS : 0
TONBATT  : 0 Seconds
CUMONBATT: 0 Seconds
XOFFBATT : N/A
STATFLAG : 0x05000008
SERIALNO : 5B1325T16968  
BATTDATE : 2013-06-23
NOMINV   : 230 Volts
NOMBATTV : 12.0 Volts
FIRMWARE : 871.O2 .I USB FW:O2
END APC  : 2017-04-30 13:41:26 +0200  
```

##### Command: events

```
2017-04-28 12:01:15 +0200  Cannot create /run/apcupsd/LCK.. serial port lock file: ERR=No such file or directory
2017-04-28 12:01:15 +0200  apcupsd FATAL ERROR in apcupsd.c at line 221
Unable to create UPS lock file.
  If apcupsd or apctest is already running,
  please stop it and run this program again.
2017-04-28 12:01:15 +0200  apcupsd error shutdown completed
2017-04-28 12:01:35 +0200  Cannot create /run/apcupsd/LCK.. serial port lock file: ERR=No such file or directory
2017-04-28 12:01:35 +0200  apcupsd FATAL ERROR in apcupsd.c at line 221
Unable to create UPS lock file.
  If apcupsd or apctest is already running,
  please stop it and run this program again.
2017-04-28 12:01:35 +0200  apcupsd error shutdown completed
2017-04-28 12:04:47 +0200  apcupsd 3.14.14 (31 May 2016) unknown startup succeeded
```

##### Command: statusJson

```javascript
{ APC: '001,034,0839',
  DATE: '2017-04-30 13:47:07 +0200  ',
  HOSTNAME: 'alarmpi',
  VERSION: '3.14.14 (31 May 2016) unknown',
  UPSNAME: 'alarmpi',
  CABLE: 'USB Cable',
  DRIVER: 'USB UPS Driver',
  UPSMODE: 'Stand Alone',
  STARTTIME: '2017-04-28 12:04:47 +0200  ',
  MODEL: 'Back-UPS ES 700G ',
  STATUS: 'ONLINE ',
  LINEV: '232.0 Volts',
  LOADPCT: '5.0 Percent',
  BCHARGE: '100.0 Percent',
  TIMELEFT: '36.4 Minutes',
  MBATTCHG: '5 Percent',
  MINTIMEL: '3 Minutes',
  MAXTIME: '0 Seconds',
  SENSE: 'Medium',
  LOTRANS: '180.0 Volts',
  HITRANS: '266.0 Volts',
  ALARMDEL: '30 Seconds',
  BATTV: '13.5 Volts',
  LASTXFER: 'Unacceptable line voltage changes',
  NUMXFERS: '0',
  TONBATT: '0 Seconds',
  CUMONBATT: '0 Seconds',
  XOFFBATT: 'N/A',
  STATFLAG: '0x05000008',
  SERIALNO: '5B1325T16968  ',
  BATTDATE: '2013-06-23',
  NOMINV: '230 Volts',
  NOMBATTV: '12.0 Volts',
  FIRMWARE: '871.O2 .I USB FW:O2',
  'END APC': '2017-04-30 13:47:10 +0200  ' }
```

## Example

```javascript
[{"id":"8f31665a.668f48","type":"apcrequest","z":"5517edea.ed19e4","name":"apc","server":"afa3f4e3.795558","x":435.5,"y":102,"wires":[["2e628a77.cc2d76"]]},{"id":"47122c35.9c5f84","type":"inject","z":"5517edea.ed19e4","name":"","topic":"Test","payload":"status","payloadType":"str","repeat":"","crontab":"","once":false,"x":189,"y":72,"wires":[["8f31665a.668f48"]]},{"id":"2e628a77.cc2d76","type":"debug","z":"5517edea.ed19e4","name":"","active":true,"console":"false","complete":"false","x":641,"y":102,"wires":[]},{"id":"de2b47a8.eb6b08","type":"inject","z":"5517edea.ed19e4","name":"","topic":"Test","payload":"events","payloadType":"str","repeat":"","crontab":"","once":false,"x":182,"y":110,"wires":[["8f31665a.668f48"]]},{"id":"70fc817d.84b88","type":"inject","z":"5517edea.ed19e4","name":"","topic":"Test","payload":"statusJson","payloadType":"str","repeat":"","crontab":"","once":false,"x":176,"y":146,"wires":[["8f31665a.668f48"]]},{"id":"afa3f4e3.795558","type":"apcconfig","z":"5517edea.ed19e4","name":"localhost","host":"127.0.0.1","port":"3551"}]
```

## Authors

* **Jochen Scheib** - [mapero](https://github.com/mapero)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
