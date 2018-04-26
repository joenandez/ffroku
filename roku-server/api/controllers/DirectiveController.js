/**
 * DirectiveController
 *
 * @description :: Server-side logic for managing tests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	default: function (req, res) {
		console.log(req.query); //http://73e03913.ngrok.io/?q=toast
		return res.send(req.query.q);
	},
	handler: function (req, res) {
		return res.send('handler');
	}
};

