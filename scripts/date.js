var makeDate = function() {
	var d = new Date();
	var formattedDate = formattedDate+(d.getMonth() + 1)+ "_";
	var formattedDate = formattedDate+d.getDate() + "_";
	var formattedDate =formattedDate+ d.getFullYear();
	
	return formattedDate
};