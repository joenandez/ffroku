var Client = require('node-ssdp').Client
  , client = new Client();
var fs = require('fs');

function findRoku () {
	client.on('response', function(headers, code, rinfo) {
	
		//grab the right fields from SSDP response
        var name = headers.ST;
        console.log(headers.ST);
	
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

findRoku();