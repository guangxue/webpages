// import { ElementWrapper as $ } from './core.js';

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let day = currentDate.getDate();
let hrs = currentDate.getHours();
let min = currentDate.getMinutes();
let sec = currentDate.getSeconds();
let time = hrs + ':' + min + ':' + sec;
let today = 'Today: '+ day + '/' + month + '/' + year;
document.querySelector('#today').innerHTML = today + '  '+ time;


fetch("https://gzhang.dev/tenda/query/models?allmodels=true")
	.then(response => {
		return response.json()
	})
	.then(data=> {
		console.log("data->",data);
		var modelist = [];
		for(let [key, value] of Object.entries(data)) {
			modelist.push(value);
		}
		return modelist;
	})
	.then(models => {
		let datalistElem = document.createElement('datalist')
		datalistElem.id='modelist'

		let formElem = document.querySelector('form');
		formElem.insertAdjacentElement('afterend', datalistElem);
		let optionFragement = new DocumentFragment();
		models.forEach( model => {
			let currentOpt = '<option value="'+model+'">';
			let opt = document.createElement('option');
			opt.value = model;
			optionFragement.appendChild(opt);
		});
		datalistElem.appendChild(optionFragement)
	})
	.catch( err => {
		console.log("modelallerr:", err);
	})


let queryButton = document.querySelector('#querybutton');
if(queryButton) {
	queryButton.addEventListener('click', function(e) {
		e.preventDefault();
		let model = document.querySelector('#prodModel').value;
		let fetchurl = "https://gzhang.dev/tenda/query/models?model="+model;
		fetch(fetchurl).then(response => { return response.json()})
		.then(data => {
			let sum_total = 0;
			let table = "<table><tr><th>Model</th><th>Location</th><th>Unit</th><th>Cartons</th><th>Loose</th><th>Total</th></tr>";
			data.forEach(m => {
				// console.log("model ->", m);
				let row = `<tr><td>${m.model}</td><td>${m.location}</td><td>${m.unit}</td><td>${m.cartons}</td><td>${m.loose}</td><td>${m.total}</td></tr>`
				table += row
				sum_total += m.total;
			});
			table += `<tr><td></td><td></td><td></td><td></td><td></td><td>${sum_total}</td></tr></table>`
			document.querySelector("#feedback").innerHTML = table;
		})
		.catch( err => {
			console.log("model query FAILED:", err);
		});
	});
}

let addBtn = document.querySelector('.addBtn');
if(addBtn) {
	addBtn.addEventListener('click', function(e) {
		e.preventDefault();
		let time = new Date();
		let model = document.querySelector('#prodModel').value;
		let qty = document.querySelector('input[name="qty"]').value;
		let customer = document.querySelector('input[name="customer"]').value;
		let tableElem = document.querySelector('table > tbody');
		if(tableElem) {
			let tplrow = document.querySelector('#order');
			var row = tplrow.content.cloneNode(true);
			var td = row.querySelectorAll('td');
			td.item(0).textContent = model;
			td.item(1).textContent = qty;
			td.item(2).textContent = customer;
			tableElem.appendChild(row);
		}
		else {
			let table = "<table><tr><th>Model</th><th>Quantity</th><th>Cusotmer</th></tr>";
			var row = `<tr><td>${model}</td><td>${qty}</td><td>${customer}</td></tr>`;
			table = table + row + "</table>";
			document.querySelector("#po").innerHTML = table;
		}
		
	});
}