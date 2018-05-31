module.exports = {

distance: function(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
},

cost: function(miles, type){
	if(type === "X"){ //Standard car
		return miles * 0.9;
	}else if(type === "Pool"){ //Standard car, with carpool
		return miles * 0.85;
	}else if(type === "XL"){ //Large car
		return (miles * 1.55) + 1;
	}else if(type === "Select"){ //Luxury non-black cars
		return (miles * 2.35) + 5;
	}else if(type === "Black"){ //Luxury black cars
		return (miles * 3.55) + 8;
	}else if(type === "SUV"){ //SUV
		return (miles * 4.25) + 15;
	}
},

type: function(make, model, color, year){
	if(year < 2007){
		return "X";
	}else if(color === "black" && year >= 2010){
		return "Black";
	}else if(year >= 2007){
		return "Select";
	}
}

}


