// Sample lambda code for an Alexa video skill. The code provides stubbed discovery response.

// The code also provides success responses for a bunch of directives like SearchAndPlay, FastForward etc. 

// It doesn't do anything but just returns a success to Alexa. Developers might want to inject their
// business logic.

// Please do not use this in any kind of production environment. The purpose of this code is to get to
// a quick proof of concept.

var AWS = require('aws-sdk');
var request = require("request");
var url = 'http://f2b497ca.ngrok.io/handler_test';

exports.handler = (event, context, callback) => {
    console.log("Lambda was invoked by Alexa");
    console.log("Event: " + JSON.stringify(event, null, 2));
    console.log("Context: " + JSON.stringify(context));

    let directive = event.directive;
    if (directive)
    {
        console.log("Directive received from Alexa: " + JSON.stringify(directive));
        if (directive.header.name == "Discover")
        {
            console.log("Discover Request received from Alexa");

            // A discovery response that includes two devices. Alexa will show these devices to customers.
            let resp = {
               event: {
                   header : {
                       messageId : directive.header.messageId,
                       name : "Discover.Response",
                       namespace: "Alexa.Discovery",
                       payloadVersion: "3"
                   },
                   "payload": {
                       "endpoints": [
                            {
                                "capabilities": [
                                    {
                                        "interface": "Alexa.RemoteVideoPlayer",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.VideoRecorder",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.RecordController",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.PlaybackController",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.ChannelController",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.SeekController",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "interface": "Alexa.Launcher",
                                        "type": "AlexaInterface",
                                        "version": "1.0",
                                        "targets": []
                                    },
                                    {
                                        "interface": "Alexa.PowerController",
                                        "type": "AlexaInterface",
                                        "version": "1.0"
                                    },
                                    {
                                        "type": "AlexaInterface",
                                        "interface": "Alexa.InputController",
                                        "version": "1.0",
                                        "properties": {
                                            "supported": [
                                                {
                                                    "name": "xbox"
                                                }
                                            ],
                                            "proactivelyReported": true,
                                            "retrievable": true
                                        }
                                    },
                                    {
                                        "type": "AlexaInterface",
                                        "interface": "Alexa.Speaker",
                                        "version": "3",
                                        "properties": {
                                            "supported": [
                                                {
                                                    "name": "volume"
                                                },
                                                {
                                                    "name": "muted"
                                                }
                                            ],
                                            "proactivelyReported": true,
                                            "retrievable": true
                                        }
                                    }
                                ],
                                "endpointId": "GenericDevice",
                                "description": "Generic VSK App",
                                "friendlyName": "Bedroom TV",
                                "manufacturerName": "roku"
                            }
                        ]
                    }
               }
            }

            console.log("Sending Discover Response back to Alexa", JSON.stringify(resp));
            callback(null, resp);
        }
        else if(directive.header.name == 'TurnOn') 
        {
            console.log('Turn On directive recieved');
            
            let resp = {
                "context": {
                    "properties": [ {
                      "namespace": "Alexa.PowerController",
                      "name": "powerState",
                      "value": "ON",
                      "timeOfSample": "2017-02-03T16:20:50.52Z",
                      "uncertaintyInMilliseconds": 500
                    } ]
                  },
                  "event": {
                    "header": {
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3",
                      "messageId": "5f8a426e-01e4-4cc9-8b79-65f8bd0fd8a4",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg=="
                    },
                    "endpoint": {
                      "scope": {
                        "type": "BearerToken",
                        "token": "access-token-from-Amazon"
                      },
                      "endpointId": "appliance-001"
                    },
                    "payload": {}
                  }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending Turn On Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            });
        }
        else if(directive.header.name == 'TurnOff') 
        {
            console.log('Turn Off directive recieved');
            
            let resp = {
                "context": {
                    "properties": [ {
                      "namespace": "Alexa.PowerController",
                      "name": "powerState",
                      "value": "OFF",
                      "timeOfSample": "2017-02-03T16:20:50.52Z",
                      "uncertaintyInMilliseconds": 500
                    } ]
                  },
                  "event": {
                    "header": {
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3",
                      "messageId": "5f8a426e-01e4-4cc9-8b79-65f8bd0fd8a4",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg=="
                    },
                    "endpoint": {
                      "scope": {
                        "type": "BearerToken",
                        "token": "access-token-from-Amazon"
                      },
                      "endpointId": "appliance-001"
                    },
                    "payload": {}
                  }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending Turn Off Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            });
            
        }
        else if(directive.header.name == 'SetVolume') 
        {
            console.log('Volume directive recieved');
            
            let resp = {
                "context": {
                    "properties": [
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "volume",
                        "value": 50,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      },
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "muted",
                        "value": false,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      }
                    ]
                  },
                  "event": {
                    "header": {
                      "messageId": "30d2cd1a-ce4f-4542-aa5e-04bd0a6492d5",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3"
                    },
                    "endpoint":{
                       "endpointId":"appliance-001"
                    },
                    "payload":{ }
                 }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Volume Response back to Alexa: ", JSON.stringify(resp));  
            callback(null, resp); 
        }
        else if(directive.header.name == 'SetMute') 
        {
            console.log('Mute directive recieved');
            
            let resp = {
                "context": {
                    "properties": [
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "volume",
                        "value": 50,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      },
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "muted",
                        "value": false,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      }
                    ]
                  },
                  "event": {
                    "header": {
                      "messageId": "30d2cd1a-ce4f-4542-aa5e-04bd0a6492d5",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3"
                    },
                    "endpoint":{
                      "endpointId":"appliance-001"
                    },
                    "payload":{ }
                 }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': 'mute'
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending Mute Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            }); 
        }
        else if(directive.header.name == 'AdjustVolume') 
        {
            console.log('Adjust Volume directive recieved');
            
            let resp = {
                "context": {
                    "properties": [
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "volume",
                        "value": 50,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      },
                      {
                        "namespace": "Alexa.Speaker",
                        "name": "muted",
                        "value": false,
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      }
                    ]
                  },
                  "event": {
                    "header": {
                      "messageId": "30d2cd1a-ce4f-4542-aa5e-04bd0a6492d5",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3"
                    },
                    "endpoint":{
                      "endpointId":"appliance-001"
                    },
                    "payload":{ }
                 }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Volume Response back to Alexa: ", JSON.stringify(resp));  
            callback(null, resp); 
        }
        else if(directive.header.name == 'SelectInput') 
        {
            console.log('Input directive recieved');
            
            let resp = {
                "context": {
                    "properties": [
                      {
                        "namespace": "Alexa.InputController",
                        "name": "input",
                        "value": "HDMI 1",
                        "timeOfSample": "2017-02-03T16:20:50.52Z",
                        "uncertaintyInMilliseconds": 0
                      }
                    ]
                  },
                  "event": {
                    "header": {
                      "messageId": "30d2cd1a-ce4f-4542-aa5e-04bd0a6492d5",
                      "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                      "namespace": "Alexa",
                      "name": "Response",
                      "payloadVersion": "3"
                    },
                    "endpoint":{
                       "endpointId":"appliance-001"
                    },
                    "payload":{ }
                 }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload.input
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending Select Input Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            });
        }
        else if (directive.header.name == "LaunchTarget")
        {
            console.log("LaunchTarget directive received from Alexa");
            /* Video partner logic to handle the SearchAndPlay directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            
            let resp = {
                event: 
                {
                     "header": {
                            "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                            "messageId": "8f539cba-654c-4a7c-9040-bbb35dc8b58f",
                            "name": "Response",
                            "namespace": "Alexa",
                            "payloadVersion": "3"
                        },
                        "payload": {}
                }
            };
            
            // var payload = {
            //   url: url,
            //   formData: {
            //       'action': directive.header.name,
            //       'payload': directive.payload
            //   },
            // };
            
            // request.post(payload, function(err,httpResponse,body){ 
            //     if (err) console.log(err);
            //     console.log(body);
            // });
            
            console.log("Sending LaunchTarget Response back to Alexa: ", JSON.stringify(resp));  
            callback(null, resp);
               

        }
        else if (directive.header.name == "SearchAndPlay")
        {
            console.log("SearchAndPlay directive received from Alexa");
            /* Video partner logic to handle the SearchAndPlay directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            };
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload.entities[0].value
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending SearchAndPlay Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            });
            
        }
        else if (directive.header.name == "SearchAndDisplayResults")
        {
            console.log("SearchAndDisplayResults directive received from Alexa");
            /* Video partner logic to handle the SearchAndDisplayResults directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload.entities[0].value
              }
            };
            
            request.post(payload, function(err,httpResponse,body){ 
                if (err) console.log(err);
                console.log(body);
                console.log(httpResponse);
                console.log("Sending SearchAndPlay Response back to Alexa: ", JSON.stringify(resp));  
                callback(null, resp);
            });
        }
        else if (directive.header.name == "Play")
        {
            console.log("Play directive received from Alexa");
            /* Video partner logic to handle the Play directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Play Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "Pause")
        {
            console.log("Pause directive received from Alexa");
            /* Video partner logic to handle the Pause directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Pause Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "Next")
        {
            console.log("Next directive received from Alexa");
            /* Video partner logic to handle the Next directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });

            console.log("Sending Next Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "Previous")
        {
            console.log("Previous directive received from Alexa");
            /* Video partner logic to handle the Previous directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });

            console.log("Sending Previous Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "Rewind")
        {
            console.log("Rewind directive received from Alexa");
            /* Video partner logic to handle the Rewind directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });

            console.log("Sending Rewind Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "FastForward")
        {
            console.log("FastForward directive received from Alexa");
            /* Video partner logic to handle the FastForward directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });

            console.log("Sending FastForward Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "AdjustSeekPosition")
        {
            console.log("AdjustSeekPosition directive received from Alexa");
            /* Video partner logic to handle the AdjustSeekPosition directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "StateReport",
                        "namespace": "Alexa.SeekController",
                        "payloadVersion": "3"
                    },
                    "payload": {
                      "properties": [{
                        "name": "positionMilliseconds",
                        "value": 300000 // This is either as much as the user asked to skip or whatever we managed to skip (for example, if user asked to skip 30 seconds when there is only 20 seconds of video left, we return "value": 20000
                      }]
                    }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });

            console.log("Sending AdjustSeekPosition Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "StartOver")
        {
            console.log("Restart directive received from Alexa");
            /* Video partner logic to handle the Play directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Restart Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else if (directive.header.name == "ChangeChannel")
        {
            console.log("Channel Changed directive received from Alexa");
            /* Video partner logic to handle the Play directive */

            // A response to indicate success to Alexa that the directive has been successfully handled.
            let resp = {
                event: {
                    "header" : {
                        "messageId": "d47ab57a-aa33-4f16-99b6-2ba39c72f374",
                        "correlationToken": "dFMb0z+PgpgdDmluhJ1LddFvSqZ/jCc8ptlAKulUj90jSqg==",
                        "name": "Response",
                        "namespace": "Alexa",
                        "payloadVersion": "3"
                    },
                    "endpoint": {
                        "scope": {
                            "type": "DirectedUserId",
                            "directedUserId": "some-Amazon-user-id"
                        },
                        "endpointId": "videoDevice-001"
                    },
                    "payload": { }
                }
            }
            
            var payload = {
              url: url,
              formData: {
                  'action': directive.header.name,
                  'payload': directive.payload
              },
            };
            
            request.post(payload, function(err,httpResponse,body){ 
              if (err) console.log(err);
              console.log(body);
            });
            
            console.log("Sending Channel Response back to Alexa: ", JSON.stringify(resp));
            callback(null, resp);
        }
        else
        {
            console.log("Didn't recognize directive");
        }
    }
    else
    {
        callback(null, 'Hello from Lambda');
    }

};
