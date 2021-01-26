KEY = ""
let requestURL = "https://api.hypixel.net/skyblock/bazaar?key=" + KEY

function toggleDropdown(id) {
    document.getElementById(id + "dropdown").classList.toggle("show");
    if (document.getElementById(id + "Chart").style.display == "none") {
    	document.getElementById(id + "Chart").style.display = "block";
    	dictOfCharts[(id.substr(0, id.indexOf("statdiv")))].update()
    }
    else {
    	document.getElementById(id + "Chart").style.display = "none";
    }
}

let request = new XMLHttpRequest();
request.open('GET', requestURL);

request.responseType = 'json';
request.send();

dict = {}

dictOfCharts = {}

let setOfProducts = new Set()

request.onload = function() {
	const data = request.response;
	for (var i in data['products']) {
		//setOfProducts.add(i)

		const div = document.createElement('div');
		div.classList.add("bg-gray-300");
		div.classList.add("p-3");
		div.classList.add("mb-5");
		div.classList.add("rounded-xl");
		div.classList.add("text-xl");
		div.classList.add("text-center");
		/*div.classList.add("flex");
		div.classList.add("flex-row");*/
		div.setAttribute("id", i + "base")

		const mainstatdiv = document.createElement('div');
		mainstatdiv.classList.add("dropbtn");
		mainstatdiv.classList.add("pointer");
		mainstatdiv.classList.add("w-full");
		mainstatdiv.classList.add("text-center");
		mainstatdiv.classList.add("flex");
		mainstatdiv.classList.add("flex-row");
		// mainstatdiv.classList.add("pb-3")
		mainstatdiv.setAttribute("id", i + "statdiv")

		const namediv = document.createElement('span');
		namediv.classList.add("font-bold");
		namediv.classList.add("w-1/2");
		namediv.classList.add("m-0");
		namediv.textContent = i;
		namediv.setAttribute("id", i);

		const changediv2 = document.createElement('span');
		changediv2.classList.add("font-bold");
		changediv2.classList.add("w-1/4");
		changediv2.classList.add("text-gray-700");
		changediv2.textContent = "N/A";
		changediv2.setAttribute("id", i + "changebuy");

		const costdiv2 = document.createElement('span');
		costdiv2.classList.add("font-bold");
		costdiv2.classList.add("w-1/4");
		if (data['products'][i]['buy_summary'].length > 0) {
			costdiv2.textContent = data['products'][i]['buy_summary'][0]['pricePerUnit'].toFixed(1);
		}
		else {
			costdiv2.textContent = "0.00";
		}
		
		costdiv2.setAttribute("id", i + "costbuy");

		const changediv = document.createElement('span');
		changediv.classList.add("font-bold");
		changediv.classList.add("w-1/4");
		changediv.classList.add("text-gray-700");
		changediv.textContent = "N/A";
		changediv.setAttribute("id", i + "changesell");

		const costdiv = document.createElement('span');
		costdiv.classList.add("font-bold");
		costdiv.classList.add("w-1/4");
		if (data['products'][i]['sell_summary'].length > 0) {
			costdiv.textContent = data['products'][i]['sell_summary'][0]['pricePerUnit'].toFixed(1);
		}
		else {
			costdiv.textContent = "0.00";
		}
		
		costdiv.setAttribute("id", i + "costsell");

		const dropdowndiv = document.createElement('div');
		// dropdowndiv.classList.add("dropdown-content");
		dropdowndiv.classList.add("hidden")
		dropdowndiv.classList.add("text-gray-700");
		dropdowndiv.classList.add("w-full");
		dropdowndiv.classList.add("pt-3");
		dropdowndiv.classList.add("flex");
		dropdowndiv.classList.add("flex-row");
		dropdowndiv.setAttribute("id", i + "statdivdropdown");

		document.getElementById("main-body").appendChild(div);
		document.getElementById(i + "base").appendChild(mainstatdiv);
		document.getElementById(i + "base").appendChild(dropdowndiv);
		document.getElementById(i + "statdiv").appendChild(namediv);
		document.getElementById(i + "statdiv").appendChild(changediv2);
		document.getElementById(i + "statdiv").appendChild(costdiv2);
		document.getElementById(i + "statdiv").appendChild(changediv);
		document.getElementById(i + "statdiv").appendChild(costdiv);

		document.getElementById(i + "statdiv").setAttribute("onclick",  "toggleDropdown(this.id)");

		//buyVol
		const buyVol = document.createElement('div');
		buyVol.classList.add("text-gray-700")
		buyVol.classList.add("w-1/4")
		buyVol.classList.add("text-center")
		buyVol.setAttribute("id", i + "buyVol");

		const buyVolspan = document.createElement('span');
		buyVolspan.classList.add("font-base")
		buyVolspan.classList.add("font-bold")
		buyVolspan.textContent = "Buy Volume"

		const buyVolContainer = document.createElement('div');
		buyVolContainer.classList.add("flex")
		buyVolContainer.classList.add("flex-row")
		buyVolContainer.setAttribute("id", i + "buyVolContainer");

		const buyVolOldContainer = document.createElement('div');
		buyVolOldContainer.classList.add("flex")
		buyVolOldContainer.classList.add("flex-col")
		buyVolOldContainer.classList.add("w-1/2")
		buyVolOldContainer.setAttribute("id", i + "buyVolOldContainer");

		const buyVolNewContainer = document.createElement('div');
		buyVolNewContainer.classList.add("flex")
		buyVolNewContainer.classList.add("flex-col")
		buyVolNewContainer.classList.add("w-1/2")
		buyVolNewContainer.setAttribute("id", i + "buyVolNewContainer");

		const buyVolOldLabel = document.createElement('div');
		buyVolOldLabel.classList.add("text-sm")
		buyVolOldLabel.classList.add("font-bold")
		buyVolOldLabel.classList.add("h-1/4")
		buyVolOldLabel.textContent = "10 Sec Ago"
		buyVolOldLabel.setAttribute("id", i + "buyVolOldLabel");

		const buyVolOldText = document.createElement('div');
		buyVolOldText.classList.add("text-xl")
		buyVolOldText.classList.add("text-black")
		buyVolOldText.classList.add("font-bold")
		buyVolOldText.classList.add("h-3/4")
		buyVolOldText.textContent = "N/A"
		buyVolOldText.setAttribute("id", i + "buyVolOldText");

		const buyVolNewLabel = document.createElement('div');
		buyVolNewLabel.classList.add("text-sm")
		buyVolNewLabel.classList.add("font-bold")
		buyVolNewLabel.classList.add("h-1/4")
		buyVolNewLabel.textContent = "Now"
		buyVolNewLabel.setAttribute("id", i + "buyVolNewLabel");

		const buyVolNewText = document.createElement('div');
		buyVolNewText.classList.add("text-xl")
		buyVolNewText.classList.add("text-black")
		buyVolNewText.classList.add("font-bold")
		buyVolNewText.classList.add("h-3/4")
		buyVolNewText.textContent = data['products'][i]['quick_status']['buyVolume']
		buyVolNewText.setAttribute("id", i + "buyVolNewText");

		document.getElementById(i + "statdivdropdown").appendChild(buyVol);
		document.getElementById(i + "buyVol").appendChild(buyVolspan);
		document.getElementById(i + "buyVol").appendChild(buyVolContainer);
		document.getElementById(i + "buyVolContainer").appendChild(buyVolOldContainer);
		document.getElementById(i + "buyVolOldContainer").appendChild(buyVolOldLabel);
		document.getElementById(i + "buyVolOldContainer").appendChild(buyVolOldText);
		document.getElementById(i + "buyVolContainer").appendChild(buyVolNewContainer);
		document.getElementById(i + "buyVolNewContainer").appendChild(buyVolNewLabel);
		document.getElementById(i + "buyVolNewContainer").appendChild(buyVolNewText);

		//buyPrice
		const buyPrice = document.createElement('div');
		buyPrice.classList.add("text-gray-700")
		buyPrice.classList.add("w-1/4")
		buyPrice.classList.add("text-center")
		buyPrice.setAttribute("id", i + "buyPrice");

		const buyPricespan = document.createElement('span');
		buyPricespan.classList.add("font-base")
		buyPricespan.classList.add("font-bold")
		buyPricespan.textContent = "Buy Price"

		const buyPriceContainer = document.createElement('div');
		buyPriceContainer.classList.add("flex")
		buyPriceContainer.classList.add("flex-row")
		buyPriceContainer.setAttribute("id", i + "buyPriceContainer");

		const buyPriceOldContainer = document.createElement('div');
		buyPriceOldContainer.classList.add("flex")
		buyPriceOldContainer.classList.add("flex-col")
		buyPriceOldContainer.classList.add("w-1/2")
		buyPriceOldContainer.setAttribute("id", i + "buyPriceOldContainer");

		const buyPriceNewContainer = document.createElement('div');
		buyPriceNewContainer.classList.add("flex")
		buyPriceNewContainer.classList.add("flex-col")
		buyPriceNewContainer.classList.add("w-1/2")
		buyPriceNewContainer.setAttribute("id", i + "buyPriceNewContainer");

		const buyPriceOldLabel = document.createElement('div');
		buyPriceOldLabel.classList.add("text-sm")
		buyPriceOldLabel.classList.add("font-bold")
		buyPriceOldLabel.classList.add("h-1/4")
		buyPriceOldLabel.textContent = "10 Sec Ago"
		buyPriceOldLabel.setAttribute("id", i + "buyPriceOldLabel");

		const buyPriceOldText = document.createElement('div');
		buyPriceOldText.classList.add("text-xl")
		buyPriceOldText.classList.add("text-black")
		buyPriceOldText.classList.add("font-bold")
		buyPriceOldText.classList.add("h-3/4")
		buyPriceOldText.textContent = "N/A"
		buyPriceOldText.setAttribute("id", i + "buyPriceOldText");

		const buyPriceNewLabel = document.createElement('div');
		buyPriceNewLabel.classList.add("text-sm")
		buyPriceNewLabel.classList.add("font-bold")
		buyPriceNewLabel.classList.add("h-1/4")
		buyPriceNewLabel.textContent = "Now"
		buyPriceNewLabel.setAttribute("id", i + "buyPriceNewLabel");

		const buyPriceNewText = document.createElement('div');
		buyPriceNewText.classList.add("text-xl")
		buyPriceNewText.classList.add("text-black")
		buyPriceNewText.classList.add("font-bold")
		buyPriceNewText.classList.add("h-3/4")
		buyPriceNewText.textContent = data['products'][i]['quick_status']['buyPrice'].toFixed(1)
		buyPriceNewText.setAttribute("id", i + "buyPriceNewText");

		document.getElementById(i + "statdivdropdown").appendChild(buyPrice);
		document.getElementById(i + "buyPrice").appendChild(buyPricespan);
		document.getElementById(i + "buyPrice").appendChild(buyPriceContainer);
		document.getElementById(i + "buyPriceContainer").appendChild(buyPriceOldContainer);
		document.getElementById(i + "buyPriceOldContainer").appendChild(buyPriceOldLabel);
		document.getElementById(i + "buyPriceOldContainer").appendChild(buyPriceOldText);
		document.getElementById(i + "buyPriceContainer").appendChild(buyPriceNewContainer);
		document.getElementById(i + "buyPriceNewContainer").appendChild(buyPriceNewLabel);
		document.getElementById(i + "buyPriceNewContainer").appendChild(buyPriceNewText);

		//sellVol
		const sellVol = document.createElement('div');
		sellVol.classList.add("text-gray-700")
		sellVol.classList.add("w-1/4")
		sellVol.classList.add("text-center")
		sellVol.setAttribute("id", i + "sellVol");

		const sellVolspan = document.createElement('span');
		sellVolspan.classList.add("font-base")
		sellVolspan.classList.add("font-bold")
		sellVolspan.textContent = "Sell Volume"

		const sellVolContainer = document.createElement('div');
		sellVolContainer.classList.add("flex")
		sellVolContainer.classList.add("flex-row")
		sellVolContainer.setAttribute("id", i + "sellVolContainer");

		const sellVolOldContainer = document.createElement('div');
		sellVolOldContainer.classList.add("flex")
		sellVolOldContainer.classList.add("flex-col")
		sellVolOldContainer.classList.add("w-1/2")
		sellVolOldContainer.setAttribute("id", i + "sellVolOldContainer");

		const sellVolNewContainer = document.createElement('div');
		sellVolNewContainer.classList.add("flex")
		sellVolNewContainer.classList.add("flex-col")
		sellVolNewContainer.classList.add("w-1/2")
		sellVolNewContainer.setAttribute("id", i + "sellVolNewContainer");

		const sellVolOldLabel = document.createElement('div');
		sellVolOldLabel.classList.add("text-sm")
		sellVolOldLabel.classList.add("font-bold")
		sellVolOldLabel.classList.add("h-1/4")
		sellVolOldLabel.textContent = "10 Sec Ago"
		sellVolOldLabel.setAttribute("id", i + "sellVolOldLabel");

		const sellVolOldText = document.createElement('div');
		sellVolOldText.classList.add("text-xl")
		sellVolOldText.classList.add("text-black")
		sellVolOldText.classList.add("font-bold")
		sellVolOldText.classList.add("h-3/4")
		sellVolOldText.textContent = "N/A"
		sellVolOldText.setAttribute("id", i + "sellVolOldText");

		const sellVolNewLabel = document.createElement('div');
		sellVolNewLabel.classList.add("text-sm")
		sellVolNewLabel.classList.add("font-bold")
		sellVolNewLabel.classList.add("h-1/4")
		sellVolNewLabel.textContent = "Now"
		sellVolNewLabel.setAttribute("id", i + "sellVolNewLabel");

		const sellVolNewText = document.createElement('div');
		sellVolNewText.classList.add("text-xl")
		sellVolNewText.classList.add("text-black")
		sellVolNewText.classList.add("font-bold")
		sellVolNewText.classList.add("h-3/4")
		sellVolNewText.textContent = data['products'][i]['quick_status']['sellVolume']
		sellVolNewText.setAttribute("id", i + "sellVolNewText");

		document.getElementById(i + "statdivdropdown").appendChild(sellVol);
		document.getElementById(i + "sellVol").appendChild(sellVolspan);
		document.getElementById(i + "sellVol").appendChild(sellVolContainer);
		document.getElementById(i + "sellVolContainer").appendChild(sellVolOldContainer);
		document.getElementById(i + "sellVolOldContainer").appendChild(sellVolOldLabel);
		document.getElementById(i + "sellVolOldContainer").appendChild(sellVolOldText);
		document.getElementById(i + "sellVolContainer").appendChild(sellVolNewContainer);
		document.getElementById(i + "sellVolNewContainer").appendChild(sellVolNewLabel);
		document.getElementById(i + "sellVolNewContainer").appendChild(sellVolNewText);

		//sellPrice
		const sellPrice = document.createElement('div');
		sellPrice.classList.add("text-gray-700")
		sellPrice.classList.add("w-1/4")
		sellPrice.classList.add("text-center")
		sellPrice.setAttribute("id", i + "sellPrice");

		const sellPricespan = document.createElement('span');
		sellPricespan.classList.add("font-base")
		sellPricespan.classList.add("font-bold")
		sellPricespan.textContent = "Sell Price"

		const sellPriceContainer = document.createElement('div');
		sellPriceContainer.classList.add("flex")
		sellPriceContainer.classList.add("flex-row")
		sellPriceContainer.setAttribute("id", i + "sellPriceContainer");

		const sellPriceOldContainer = document.createElement('div');
		sellPriceOldContainer.classList.add("flex")
		sellPriceOldContainer.classList.add("flex-col")
		sellPriceOldContainer.classList.add("w-1/2")
		sellPriceOldContainer.setAttribute("id", i + "sellPriceOldContainer");

		const sellPriceNewContainer = document.createElement('div');
		sellPriceNewContainer.classList.add("flex")
		sellPriceNewContainer.classList.add("flex-col")
		sellPriceNewContainer.classList.add("w-1/2")
		sellPriceNewContainer.setAttribute("id", i + "sellPriceNewContainer");

		const sellPriceOldLabel = document.createElement('div');
		sellPriceOldLabel.classList.add("text-sm")
		sellPriceOldLabel.classList.add("font-bold")
		sellPriceOldLabel.classList.add("h-1/4")
		sellPriceOldLabel.textContent = "10 Sec Ago"
		sellPriceOldLabel.setAttribute("id", i + "sellPriceOldLabel");

		const sellPriceOldText = document.createElement('div');
		sellPriceOldText.classList.add("text-xl")
		sellPriceOldText.classList.add("text-black")
		sellPriceOldText.classList.add("font-bold")
		sellPriceOldText.classList.add("h-3/4")
		sellPriceOldText.textContent = "N/A"
		sellPriceOldText.setAttribute("id", i + "sellPriceOldText");

		const sellPriceNewLabel = document.createElement('div');
		sellPriceNewLabel.classList.add("text-sm")
		sellPriceNewLabel.classList.add("font-bold")
		sellPriceNewLabel.classList.add("h-1/4")
		sellPriceNewLabel.textContent = "Now"
		sellPriceNewLabel.setAttribute("id", i + "sellPriceNewLabel");

		const sellPriceNewText = document.createElement('div');
		sellPriceNewText.classList.add("text-xl")
		sellPriceNewText.classList.add("text-black")
		sellPriceNewText.classList.add("font-bold")
		sellPriceNewText.classList.add("h-3/4")
		sellPriceNewText.textContent = data['products'][i]['quick_status']['sellPrice'].toFixed(1)
		sellPriceNewText.setAttribute("id", i + "sellPriceNewText");

		document.getElementById(i + "statdivdropdown").appendChild(sellPrice);
		document.getElementById(i + "sellPrice").appendChild(sellPricespan);
		document.getElementById(i + "sellPrice").appendChild(sellPriceContainer);
		document.getElementById(i + "sellPriceContainer").appendChild(sellPriceOldContainer);
		document.getElementById(i + "sellPriceOldContainer").appendChild(sellPriceOldLabel);
		document.getElementById(i + "sellPriceOldContainer").appendChild(sellPriceOldText);
		document.getElementById(i + "sellPriceContainer").appendChild(sellPriceNewContainer);
		document.getElementById(i + "sellPriceNewContainer").appendChild(sellPriceNewLabel);
		document.getElementById(i + "sellPriceNewContainer").appendChild(sellPriceNewText);

		const chart = document.createElement('canvas');
		chart.classList.add("hidden")
		chart.classList.add("w-full")
		chart.classList.add("pt-3")
		chart.height = 80
		chart.style.display = "none"
		chart.setAttribute("id", i + "statdivChart")

		document.getElementById(i + "base").appendChild(chart);

		dict[i] = {};
		dict[i]['time'] = []
		dict[i]['time'].push(data['lastUpdated'])

		time = data['lastUpdated']

		dict[i]['sellVolume'] = []
		dict[i]['sellVolume'].push({x: time, y: data['products'][i]['quick_status']['sellVolume']})
		dict[i]['sellPrice'] = []
		if (data['products'][i]['sell_summary'].length > 0) {
			dict[i]['sellPrice'].push({x: time, y: data['products'][i]['sell_summary'][0]['pricePerUnit']})
		}
		else {
			dict[i]['sellPrice'].push({x: time, y: 0})
		}
		
		dict[i]['buyVolume'] = []
		dict[i]['buyVolume'].push({x: time, y: data['products'][i]['quick_status']['buyVolume']})
		dict[i]['buyPrice'] = []
		if (data['products'][i]['buy_summary'].length > 0) {
			dict[i]['buyPrice'].push({x: time, y: data['products'][i]['buy_summary'][0]['pricePerUnit']})
		}
		else {
			dict[i]['buyPrice'].push({x: time, y: 0})
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

		var ctx = document.getElementById(i + 'statdivChart');
		var myLineChart = new Chart(ctx, {
		    type: 'line',
		    data: {
				datasets: [{
					label: 'Sell Price',
					backgroundColor: 'rgba(255, 0, 0, 0.5)',
					borderColor: 'rgba(255, 0, 0, 0.5)',
					fill: false,
					data: dict[i]['sellPrice']
				}, {
					label: 'Buy Price',
					backgroundColor: 'rgba(0, 255, 0, 0.5)',
					borderColor: 'rgba(0, 255, 0, 0.5)',
					fill: false,
					data: dict[i]['buyPrice']
				}]
			},
			options: {
				responsive: true,
				title: {
					display: false,
					text: 'Prices'
				},
				animation: {
			        duration: 0
			    },
				scales: {
					xAxes: [{
						type: 'linear',
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Time'
						},
						ticks: {
							suggestedMin: data['lastUpdated'], 
							callback: function(value, index, values) {
								var totalseconds = parseInt(value / 1000)
								var day = totalseconds % 86400
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

		                        return hourString + ":" + minutesString + ":" + secondsString;
		                    }
						}
					}],
					yAxes: [{
						display: true,
						/*ticks: {
							beginAtZero: true,
						},*/
						scaleLabel: {
							display: true,
							labelString: 'Cost'
						}
					}]
				},
				elements: {
                    point:{
                        radius: 0
                    }
                }
			}
		});

		myLineChart.update()

		dictOfCharts[i] = myLineChart
	}
}

setTimeout(function(){}, 10000);

setInterval(function(){ 
	let request = new XMLHttpRequest();
	request.open('GET', requestURL);

	request.responseType = 'json';
	request.send();

	request.onload = function() {
		const data = request.response;

		for (var productName in data['products']) {
			buycost = 0;
			cost = 0;
			if (data['products'][productName]['buy_summary'].length > 0) {
				buycost = data['products'][productName]['buy_summary'][0]['pricePerUnit'];
			}
			if (data['products'][productName]['sell_summary'].length > 0) {
				cost = data['products'][productName]['sell_summary'][0]['pricePerUnit'];
			}

			document.getElementById(productName + "costbuy").innerHTML = buycost.toFixed(1);
			document.getElementById(productName + "costsell").innerHTML = cost.toFixed(1);
			document.getElementById(productName + "sellVolNewText").innerHTML = data['products'][productName]['quick_status']['sellVolume'];
			document.getElementById(productName + "sellPriceNewText").innerHTML = cost.toFixed(1);
			document.getElementById(productName + "buyVolNewText").innerHTML = data['products'][productName]['quick_status']['buyVolume'];
			document.getElementById(productName + "buyPriceNewText").innerHTML = buycost.toFixed(1);

			currTime = data['lastUpdated'];

			dict[productName]['time'].push(data['lastUpdated'])
			dict[productName]['sellVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['sellVolume']})
			dict[productName]['sellPrice'].push({x: currTime, y: cost})
			dict[productName]['buyVolume'].push({x: currTime, y: data['products'][productName]['quick_status']['buyVolume']})
			dict[productName]['buyPrice'].push({x: currTime, y: buycost})

			// dictOfCharts[productName].update()

			TIMEBEFORECHANGE = 10000//60000 
			TOLERANCE = 9000

			var index = dict[productName]['buyPrice'].length - 1
			while (index >= 0) {
				if (dict[productName]['time'][index] > currTime-TOLERANCE-TIMEBEFORECHANGE && dict[productName]['time'][index] < currTime+TOLERANCE-TIMEBEFORECHANGE) {
					change = cost / dict[productName]['sellPrice'][index]["y"]
					change *= 100
					change = change.toFixed(3)
					if (change < 100) {
						document.getElementById(productName + "changesell").classList.remove('text-gray-700');
						document.getElementById(productName + "changesell").classList.remove('text-red-700');
						document.getElementById(productName + "changesell").classList.remove('text-green-700');
						document.getElementById(productName + "changesell").classList.add('text-red-700');
						document.getElementById(productName + "changesell").innerHTML = "- " + (100-change).toFixed(3) + "%";
					}
					else if (change > 100) {
						document.getElementById(productName + "changesell").classList.remove('text-gray-700');
						document.getElementById(productName + "changesell").classList.remove('text-red-700');
						document.getElementById(productName + "changesell").classList.remove('text-green-700');
						document.getElementById(productName + "changesell").classList.add('text-green-700');
						document.getElementById(productName + "changesell").innerHTML = "+ " + (change-100).toFixed(3) + "%";
					}
					else {
						document.getElementById(productName + "changesell").classList.remove('text-gray-700');
						document.getElementById(productName + "changesell").classList.remove('text-red-700');
						document.getElementById(productName + "changesell").classList.remove('text-green-700');
						document.getElementById(productName + "changesell").classList.add('text-gray-700');
						document.getElementById(productName + "changesell").innerHTML = "+ 0%";
					}

					document.getElementById(productName + "sellVolOldText").innerHTML = dict[productName]['sellVolume'][index]["y"];
					document.getElementById(productName + "sellPriceOldText").innerHTML = dict[productName]['sellPrice'][index]["y"].toFixed(1)
					document.getElementById(productName + "buyVolOldText").innerHTML = dict[productName]['buyVolume'][index]["y"];
					document.getElementById(productName + "buyPriceOldText").innerHTML = dict[productName]['buyPrice'][index]["y"].toFixed(1);

					changebuy = buycost / dict[productName]['buyPrice'][index]["y"]
					changebuy *= 100
					changebuy = changebuy.toFixed(3)
					if (changebuy < 100) {
						document.getElementById(productName + "changebuy").classList.remove('text-gray-700');
						document.getElementById(productName + "changebuy").classList.remove('text-red-700');
						document.getElementById(productName + "changebuy").classList.remove('text-green-700');
						document.getElementById(productName + "changebuy").classList.add('text-green-700');
						document.getElementById(productName + "changebuy").innerHTML = "- " + (100-changebuy).toFixed(3) + "%";
					}
					else if (changebuy > 100) {
						document.getElementById(productName + "changebuy").classList.remove('text-gray-700');
						document.getElementById(productName + "changebuy").classList.remove('text-red-700');
						document.getElementById(productName + "changebuy").classList.remove('text-green-700');
						document.getElementById(productName + "changebuy").classList.add('text-red-700');
						document.getElementById(productName + "changebuy").innerHTML = "+ " + (changebuy-100).toFixed(3) + "%";
					}
					else {
						document.getElementById(productName + "changebuy").classList.remove('text-gray-700');
						document.getElementById(productName + "changebuy").classList.remove('text-red-700');
						document.getElementById(productName + "changebuy").classList.remove('text-green-700');
						document.getElementById(productName + "changebuy").classList.add('text-gray-700');
						document.getElementById(productName + "changebuy").innerHTML = "+ 0%";
					}

					document.getElementById(productName + "sellVolOldText").innerHTML = dict[productName]['sellVolume'][index]["y"];
					document.getElementById(productName + "sellPriceOldText").innerHTML = dict[productName]['sellPrice'][index]["y"].toFixed(1)
					document.getElementById(productName + "buyVolOldText").innerHTML = dict[productName]['buyVolume'][index]["y"];
					document.getElementById(productName + "buyPriceOldText").innerHTML = dict[productName]['buyPrice'][index]["y"].toFixed(1);

					break;
				}
				if (index == 0 || dict[productName]['time'][index] < currTime-TOLERANCE-TIMEBEFORECHANGE) {
					document.getElementById(productName + "changesell").classList.remove('text-gray-700');
					document.getElementById(productName + "changesell").classList.remove('text-red-700');
					document.getElementById(productName + "changesell").classList.remove('text-green-700');
					document.getElementById(productName + "changesell").classList.add('text-gray-700');
					document.getElementById(productName + "changesell").innerHTML = "N/A";
					document.getElementById(productName + "changebuy").classList.remove('text-gray-700');
					document.getElementById(productName + "changebuy").classList.remove('text-red-700');
					document.getElementById(productName + "changebuy").classList.remove('text-green-700');
					document.getElementById(productName + "changebuy").classList.add('text-gray-700');
					document.getElementById(productName + "changebuy").innerHTML = "N/A";
					document.getElementById(productName + "sellVolOldText").innerHTML = "N/A";
					document.getElementById(productName + "sellPriceOldText").innerHTML = "N/A";
					document.getElementById(productName + "buyVolOldText").innerHTML = "N/A";
					document.getElementById(productName + "buyPriceOldText").innerHTML = "N/A";
					break;
				}
				index -= 1
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