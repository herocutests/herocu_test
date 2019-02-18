const helperFunctions = {
	isEnterButton : (e) => {
		return (e.keyCode === 13) ? true : false;
	},
	isEnterCtrlButton : (e) => {
		return ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) ? true : false;
	},
	isEmptyValue : (val) => {
		return (val === '') ? true : false
	},
	numericEnding : (number, one, two, five) => {
	    let n = Math.abs(number);
	    n %= 100;
	    if (n >= 5 && n <= 20) {
	    	return five;
	    }
	    n %= 10;
	    if (n === 1) {
	    	return one;
	    }
	    if (n >= 2 && n <= 4) {
	    	return two;
	    }
	    return five;
	},
	parseTime : (date) => {
		var time = new Date(date);
		return ("0" + time.getHours()).slice(-2)   + ":" +  ("0" + time.getMinutes()).slice(-2) + ":" ;
	},
	parseDate : (date) => {
		var messageDate = new Date(date);
		var searchDate = new Date();
		if(helperFunctions.compareDates(messageDate, searchDate))
			return "Сегодня";
		searchDate.setDate(searchDate.getDate()-1);
		if(helperFunctions.compareDates(messageDate, searchDate))
			return "Вчера";
		return messageDate.getDate()+'.'+messageDate.getMonth()+'.'+messageDate.getFullYear();
	},
	compareDates : (date1, date2) => {
		return (date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear() &&  date1.getDate() === date2.getDate()) ? true : false;
	}
};

export default helperFunctions;