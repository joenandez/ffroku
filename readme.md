#Summary

This repo is a rough prototype for controlling a Roku device from an Alexa using Video Skills API. Since Roku can be controlled through the local network, it requires an Electron App running on a Mac/PC to discovery, connect to, and send commands to the Roku device.

**High level set up flow in the works**

1. Electron client launches, establishes web socket connection with cloud
2. Customer signs in/signs up with email code based authentication flow
3. Local server discovers roku device, sends device info up to cloud store
4. Cloud generates 6 digit pairing code associated with customer account, sends down to Electorn client to display
5. Customer enables skill through Alexa Skill Store, signs into account using 6 digit pairing code
6. Alexa sends Alexa.Discovery request, response grabs device/customer data from Cloud and responds to request
7. Customer pairs Roku device to the Alexa device they want to use
8. Customer says 'turn on Roku' or 'find Silicon Valley'
9. Alexa sends Alexa.PowerController or Alexa.RemoteVideoPlayer directive to AWS Lambda
10. Lambda parses directive and sends 'action' payload to cloud
11. Cloud IDs customer and device endpoint from payload, sends payload through websockets to client
12. Electron client handles data, constructing local URL from discovered device data
13. Electron client sends command to Roku, which turns on and/or displays search results for Silicon Valley

**What works now?**

1. Client discovers Roku devices
2. Web socket session established
3. Lambda has hardcoded local server URL to send payload to 'cloud'
4. CLoud handles directive and passes down to client through websockets
5. Search/Power handlers send local network command to Roku

#Key Files:

##Alexa Lambda
Event Handler: lambda.js
* Handles Alexa voice directives, parses payload, sends directive to my cloud

##Sails App
API Routes: roku-server/config/routes.js
* API routes to establish socket connections, pass payload/directie through web sockets to client

Controller: roku-server/api/controllers/TestController.js
* Handles socket connection & communication with client, sending directives down, responses back to lambda

##Electron App
Express Server: local-roku-client/main.js
* Discovers Roku client, Initializes websocket connections, handles directievs from cloud, sends urls through local network to Roku