/**
 * SocketController
 *
 * @description :: Server-side logic for managing sockets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   * `SocketController.connect()`
   */
  connect: function (req, res) {
    if (!req.isSocket) {
			return res.badRequest();
		}
    var roomName = 'funSockets'; //client needs to send uniquely identifiable info, which populates this
		sails.sockets.join(req, roomName);

		return res.json({
			status: 'joined ' + roomName + ' room'
		});
  }
};

