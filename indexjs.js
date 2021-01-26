KEY = ""
let requestURL = "https://api.hypixel.net/skyblock/bazaar?key=" + KEY

let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

dict = {}

request.onload = function() {
	const data = request.response;

	for (var productName in data['products']) {
		// console.log(productName)
		
		buycost = 0;
		cost = 0;
		if (data['products'][productName]['buy_summary'].length > 0) {
			buycost = data['products'][productName]['buy_summary'][0]['pricePerUnit'];
		}
		if (data['products'][productName]['sell_summary'].length > 0) {
			cost = data['products'][productName]['sell_summary'][0]['pricePerUnit'];
		}

		var temp = document.getElementById(productName + "buypricecurr")
		if (temp) {
			document.getElementById(productName + "buypricecurr").innerHTML = buycost.toFixed(1);
			document.getElementById(productName + "sellpricecurr").innerHTML = cost.toFixed(1);
			document.getElementById(productName + "sellvolcurr").innerHTML = data['products'][productName]['quick_status']['sellVolume'];
			//document.getElementById(productName + "sellPriceNewText").innerHTML = cost.toFixed(1);
			document.getElementById(productName + "buyvolcurr").innerHTML = data['products'][productName]['quick_status']['buyVolume'];
			//document.getElementById(productName + "buyPriceNewText").innerHTML = buycost.toFixed(1);
		}

		dict[productName] = {};

		currTime = data['lastUpdated'];

		dict[productName]['time'] = []
		dict[productName]['time'].push(currTime)

		dict[productName]['sellVolume'] = []
		dict[productName]['sellVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['sellVolume']})

		dict[productName]['sellPrice'] = []
		dict[productName]['sellPrice'].push({x: currTime, y: cost})

		dict[productName]['buyVolume'] = []
		dict[productName]['buyVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['buyVolume']})

		dict[productName]['buyPrice'] = []
		dict[productName]['buyPrice'].push({x: currTime, y: buycost})
	}
	var seconds = parseInt(data['lastUpdated'] / 1000)
	var day = seconds % 86400
	var hour = parseInt(day / 3600)
	var hourString = hour.toString()
	if (hour < 10) {
		hourString = "0" + hour.toString()
	}
	var secondsLeft = day % 3600
	var minutes = parseInt(secondsLeft / 60)
	var minutesString = minutes.toString()
	if (minutes < 10) {
		minutesString = "0" + minutes.toString()
	}
	var seconds = secondsLeft % 60
	var secondsString = seconds.toString()
	if (seconds < 10) {
		secondsString = "0" + seconds.toString()
	}
	document.getElementById("timeUpdated").innerHTML = "LAST UPDATED: " + hourString + ":" + minutesString + ":" + secondsString + " (UTC)"
}

setInterval(function(){ 
	let request = new XMLHttpRequest();
	request.open('GET', requestURL);

	request.responseType = 'json';
	request.send();

	request.onload = function() {
		const data = request.response;

		for (var productName in data['products']) {
			// console.log(productName)
			
			buycost = 0;
			cost = 0;
			if (data['products'][productName]['buy_summary'].length > 0) {
				buycost = data['products'][productName]['buy_summary'][0]['pricePerUnit'];
			}
			if (data['products'][productName]['sell_summary'].length > 0) {
				cost = data['products'][productName]['sell_summary'][0]['pricePerUnit'];
			}

			var temp = document.getElementById(productName + "buypricecurr")
			if (temp) {
				document.getElementById(productName + "buypricecurr").innerHTML = buycost.toFixed(1);
				document.getElementById(productName + "sellpricecurr").innerHTML = cost.toFixed(1);
				document.getElementById(productName + "sellvolcurr").innerHTML = data['products'][productName]['quick_status']['sellVolume'];
				//document.getElementById(productName + "sellPriceNewText").innerHTML = cost.toFixed(1);
				document.getElementById(productName + "buyvolcurr").innerHTML = data['products'][productName]['quick_status']['buyVolume'];
				//document.getElementById(productName + "buyPriceNewText").innerHTML = buycost.toFixed(1);

				TIMEBEFORECHANGE = 10000 //60000 
				TOLERANCE = 9000

				var index = dict[productName]['buyPrice'].length - 1
				while (index >= 0) {
					if (dict[productName]['time'][index] > currTime-TOLERANCE-TIMEBEFORECHANGE && dict[productName]['time'][index] < currTime+TOLERANCE-TIMEBEFORECHANGE) {
						change = cost / dict[productName]['sellPrice'][index]["y"]
						change *= 100
						change = change.toFixed(3)
						if (change < 100) {
							document.getElementById(productName + "sellpricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-red-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-green-700');
							document.getElementById(productName + "sellpricechange").classList.add('text-red-700');
							document.getElementById(productName + "sellpricechange").innerHTML = "- " + (100-change).toFixed(3) + "%";
						}
						else if (change > 100) {
							document.getElementById(productName + "sellpricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-red-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-green-700');
							document.getElementById(productName + "sellpricechange").classList.add('text-green-700');
							document.getElementById(productName + "sellpricechange").innerHTML = "+ " + (change-100).toFixed(3) + "%";
						}
						else {
							document.getElementById(productName + "sellpricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-red-700');
							document.getElementById(productName + "sellpricechange").classList.remove('text-green-700');
							document.getElementById(productName + "sellpricechange").classList.add('text-gray-700');
							document.getElementById(productName + "sellpricechange").innerHTML = "+ 0%";
						}

						//document.getElementById(productName + "sellVolOldText").innerHTML = dict[productName]['sellVolume'][index]["y"];
						//document.getElementById(productName + "sellPriceOldText").innerHTML = dict[productName]['sellPrice'][index]["y"].toFixed(1)
						//document.getElementById(productName + "buyVolOldText").innerHTML = dict[productName]['buyVolume'][index]["y"];
						//document.getElementById(productName + "buyPriceOldText").innerHTML = dict[productName]['buyPrice'][index]["y"].toFixed(1);

						changebuy = buycost / dict[productName]['buyPrice'][index]["y"]
						changebuy *= 100
						changebuy = changebuy.toFixed(3)
						if (changebuy < 100) {
							document.getElementById(productName + "buypricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-red-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-green-700');
							document.getElementById(productName + "buypricechange").classList.add('text-green-700');
							document.getElementById(productName + "buypricechange").innerHTML = "- " + (100-changebuy).toFixed(3) + "%";
						}
						else if (changebuy > 100) {
							document.getElementById(productName + "buypricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-red-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-green-700');
							document.getElementById(productName + "buypricechange").classList.add('text-red-700');
							document.getElementById(productName + "buypricechange").innerHTML = "+ " + (changebuy-100).toFixed(3) + "%";
						}
						else {
							document.getElementById(productName + "buypricechange").classList.remove('text-gray-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-red-700');
							document.getElementById(productName + "buypricechange").classList.remove('text-green-700');
							document.getElementById(productName + "buypricechange").classList.add('text-gray-700');
							document.getElementById(productName + "buypricechange").innerHTML = "+ 0%";
						}

						/*document.getElementById(productName + "sellVolOldText").innerHTML = dict[productName]['sellVolume'][index]["y"];
						document.getElementById(productName + "sellPriceOldText").innerHTML = dict[productName]['sellPrice'][index]["y"].toFixed(1)
						document.getElementById(productName + "buyVolOldText").innerHTML = dict[productName]['buyVolume'][index]["y"];
						document.getElementById(productName + "buyPriceOldText").innerHTML = dict[productName]['buyPrice'][index]["y"].toFixed(1);*/

						break;
					}
					if (index == 0 || dict[productName]['time'][index] < currTime-TOLERANCE-TIMEBEFORECHANGE) {
						document.getElementById(productName + "sellpricechange").classList.remove('text-gray-700');
						document.getElementById(productName + "sellpricechange").classList.remove('text-red-700');
						document.getElementById(productName + "sellpricechange").classList.remove('text-green-700');
						document.getElementById(productName + "sellpricechange").classList.add('text-gray-700');
						document.getElementById(productName + "sellpricechange").innerHTML = "N/A";
						document.getElementById(productName + "buypricechange").classList.remove('text-gray-700');
						document.getElementById(productName + "buypricechange").classList.remove('text-red-700');
						document.getElementById(productName + "buypricechange").classList.remove('text-green-700');
						document.getElementById(productName + "buypricechange").classList.add('text-gray-700');
						document.getElementById(productName + "buypricechange").innerHTML = "N/A";
						//document.getElementById(productName + "sellVolOldText").innerHTML = "N/A";
						//document.getElementById(productName + "sellPriceOldText").innerHTML = "N/A";
						//document.getElementById(productName + "buyVolOldText").innerHTML = "N/A";
						//document.getElementById(productName + "buyPriceOldText").innerHTML = "N/A";
						break;
					}
					index -= 1
				}

				currTime = data['lastUpdated'];

				dict[productName]['time'].push(data['lastUpdated'])
				dict[productName]['sellVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['sellVolume']})
				dict[productName]['sellPrice'].push({x: currTime, y: cost})
				dict[productName]['buyVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['buyVolume']})
				dict[productName]['buyPrice'].push({x: currTime, y: buycost})
			}
		}

		var seconds = parseInt(data['lastUpdated'] / 1000)
		var day = seconds % 86400
		var hour = parseInt(day / 3600)
		var hourString = hour.toString()
		if (hour < 10) {
			hourString = "0" + hour.toString()
		}
		var secondsLeft = day % 3600
		var minutes = parseInt(secondsLeft / 60)
		var minutesString = minutes.toString()
		if (minutes < 10) {
			minutesString = "0" + minutes.toString()
		}
		var seconds = secondsLeft % 60
		var secondsString = seconds.toString()
		if (seconds < 10) {
			secondsString = "0" + seconds.toString()
		}
		document.getElementById("timeUpdated").innerHTML = "LAST UPDATED: " + hourString + ":" + minutesString + ":" + secondsString + " (UTC)"
	}
}, 10000);