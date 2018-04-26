/**
 * TestController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	connect: function(req, res) {
		if (!req.isSocket) {
			return res.badRequest();
		}
		console.log(req.query);
		//store this someplace - server session
		// req.session.userId = foundUser.id --https://sailsjs.com/documentation/concepts/sessions

		var roomId = req.query.appInstanceId;

		sails.sockets.join(req, roomId);

		return res.json({
			status: 'roomId: ' + roomId
		});
	}, 

	hi: function(req, res){
		//send a broadcast to the room
		//send the action - open 
		sails.sockets.broadcast('electron', 'hello', { action: 'launch', entity: 'netflix'}, req);

		return res.json({
			status: 'sent a message'
		});
	},

	handler: function(req, res){
		// handle directive from lambda here
		console.log(req.query);

		sails.sockets.broadcast('electron', 'hello', { action: req.query.a, entity: req.query.e}, req);

		return res.json({
			status: 'sent a message'
		});
	},

	handler_test: function(req, res) {
		console.log('body = ' + JSON.stringify(req.body));

		sails.sockets.broadcast('electron', 'voiceRequest', { action: req.body.action, payload: req.body.payload}, req);

		//respond to lambda
		return res.json({
			message: 'got the message' //better success message here because lambda needs to trigger off of it
		});
	}
};

