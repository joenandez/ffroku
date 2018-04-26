const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
var Client = require('node-ssdp').Client
  , client = new Client();
var fs = require('fs');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var storage = require('electron-json-storage');
var http = require('http');
var request = require("request");


// =========== CONNECT WEB SOCKETs =============//

// Instantiate the socket client (`io`)
var io = sailsIOClient(socketIOClient);

// send URL of sails server to connect to
io.sails.url = 'http://localhost:1337';

// connect to sails server with info to identify appInstance/user
var appInstanceId = 'electron';
io.socket.get('/test/connect/?appInstanceId=' + appInstanceId, function gotResponse(resData, jwRes) {	
    console.log(resData.status);
});

// =========== VOICE DIRECTIVE HANDLERS =============//

// handle comms from cloud
io.socket.on('voiceRequest', function (broadcastedData){
  console.log('action: ' + broadcastedData.action + ' | payload: ' + broadcastedData.payload);

  //if play
  if (broadcastedData.action == 'SearchAndPlay') {

    //get Roku URL from storage
    storage.get('url', function(error, data){
      if(error) throw error;

      //determine title and apps the cotnent is on
      var title = encodeURIComponent(broadcastedData.payload);
      //add app # to request to start playback

      //construct url/request - with app to launch
      var url = 'http://192.168.7.250:8060/';
      var payload = {
        url: url + 'search/browse?title=' + title + '&provider-id=12&launch=true'
      };  
      console.log(payload);

      //send request to Roku device
      request.post(payload, function(err,httpResponse,body){ 
        if (err) console.log(err);
        console.log(body);
        console.log('PLAY ' + title)
      });  
    });
  }

  //if search
  if (broadcastedData.action == 'SearchAndDisplayResults') {
    storage.get('url', function(error, data){
      if(error) throw error;
      var title = encodeURIComponent(broadcastedData.payload);
      console.log(title);
      // broadcastedData.payload.entities[0].value
      var url = 'http://192.168.7.250:8060/';
      var payload = {
        url: url + 'search/browse?title=' + title
      };  
      console.log(payload);
      request.post(payload, function(err,httpResponse,body){ 
        if (err) console.log(err);
        console.log(body);
        console.log('SEARCH FOR ' + title)
      });  
    });
  }

  //if channels

  //if power off
  if (broadcastedData.action == 'TurnOff') {
    storage.get('url', function(error, data){
      if(error) throw error;
      // broadcastedData.payload.entities[0].value
      var url = 'http://192.168.7.250:8060/keypress/PowerOff';
      var payload = {
        url: url
      };  
      console.log(payload);
      request.post(payload, function(err,httpResponse,body){ 
        if (err) console.log(err);
        console.log(body);
        console.log('TURNING OFF')
      });  
    });
  }

  //if power on
  if (broadcastedData.action == 'TurnOn') {
  
      var url = 'http://192.168.7.250:8060/keypress/PowerOn';
      var payload = {
        url: url
      };  
      request.post(payload, function(err,httpResponse,body){ 
        if (err) console.log(err);
        console.log(body);
        console.log(url);
        console.log('TURNING ON')
      });  
  }
  
  //if mute
  if (broadcastedData.action == 'SetMute') {

    var url = 'http://192.168.7.250:8060/keypress/VolumeMute';
    var payload = {
      url: url
    };  
    request.post(payload, function(err,httpResponse,body){ 
      if (err) console.log(err);
      console.log(body);
      console.log(url);
      console.log('Toggle Mute')
    });
}

  //if inputs

  if (broadcastedData.action == 'SelectInput') {
  
    var url = 'http://192.168.7.250:8060/keypress/InputHDMI2';
    var payload = {
      url: url
    };  
    request.post(payload, function(err,httpResponse,body){ 
      if (err) console.log(err);
      console.log(body);
      console.log(url);
      console.log('HDMI 2')
    });  
}

  //if play

  //if pause

  //if seek
});

// ====================== ROKU DISCOVERY =================== //

function findRoku () {
	client.on('response', function(headers, code, rinfo) {
	
		//grab the right fields from SSDP response
		var name = headers.ST;
	
		//search for roku box
		var search = name.search("roku:ecp")
		
		//if search isn't empty, grab the desired values
		if(search != -1) {
			console.log(headers.USN);
			console.log(headers.LOCATION);
	
			//grab the full locaton URI
      var url = headers.LOCATION;

      storage.set('url', {url: url}, function(error){
        if(error) throw error;
      });

			//grab the IP only from the URI
			var uuid = headers.USN;
			var n = uuid.lastIndexOf(':');
			var parsedId = uuid.slice(n+1); 

			//construct string for file
      data = "url: " +url+ " \nuuid: " +parsedId; //need to send this up to server as JSON, store it, etc.
	
			//write data to a text file
			fs.writeFile("roku.txt", data, function(err) {
				if(err) {
					return console.log(err);
				}
				
				//kill ssdp process
				// process.exit();
			});
	
		};
	})
	client.search('ssdp:all');
}

// =============ELECCTRON APP ================//

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  console.log('creating window');

  //find and log the roku device
  findRoku();

  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.