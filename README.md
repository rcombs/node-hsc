Node.js [HighSchoolCube](http://www.highschoolcube.com/) Client
=============================

Usage
-----

	var HSC = require("hsc");
	var hsc = new HSC("myUsername", "myPassword", function(success){
		if(success){
			hsc.get("activity", function(err, ret){
				if(err){
					console.error(err);
				}else{
					for(var i = 0; i < ret.results.length; i++){
						console.log(ret.results[i].affected);
					}
				}
			});
		}
	});

API Functions
-------------

API details are available at [the HighSchoolCube API Site](http://api.highschoolcube.com/api/v1/docs)