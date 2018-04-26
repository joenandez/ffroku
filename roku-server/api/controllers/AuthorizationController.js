/**
 * AuthorizationController
 *
 * @description :: Server-side logic for managing authorizations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	authorize: function (req, res) {
		// - grab clientId/secret, verify
		// - login user in - 6 digit code
		// - redirect URL with authorization code
		console.log(req.query);
		if(req.query.response_type) {
			var client_id = req.query.client_id;
			var redirect_uri = req.query.redirect_uri;		

			//validate client_id, response_type
			
			//if yes, store redirect_uri in session
			req.session.redirect_uri = redirect_uri;
			
			//show the authorization page
			return res.view('testing');

		} else if(req.query.authorized) {
			//grab user id, look up user
			//get authorization code for user
			var dummyCode = 12345;
			
			//redirect URL with auth code
			var uri = req.session.redirect_uri + '?code=' + dummyCode;
			return res.redirect('http://www.' + req.session.redirect_uri);

		} else {
			return res.send('nothing in url');
		}
	},
	token: function (req, res) {
		// - grab clientId/secret, verify
		// - grab auth code, verify
		// - respond with access, refresh, etc.
		console.log(req.query);
		if(req.query.grant_type == 'authorization_code') {
			//first time
			var data = {
				access_token: 1234,
				refresh_token: 1234,
				token_type: 'bearer',
				expires_in: 2592000
			};
			return res.json(data);
		} else if (req.query.grant_type == 'refresh_token') {
			//refresh
			//look up user by refresh token, update auth token, send new one
			var data = {
				access_token: 1234,
				refresh_token: 1234,
				token_type: 'bearer',
				expires_in: 2592000
			};
			return res.json(data);
		} else {
			//error
			res.send(500);
		}
	},
	validatePairingCode: function (req, res) {
		//take 6 digit code
		//validate against user object
		//check TTL - error if after (try again)
		//return success or failure
	},
	getPairingCode: function (req, res) {
		//generate/store/return a 6 digit pairing code for a given user
		//generate random 6 digit code
		//store that code along with 10 minute TTL
	}
};

