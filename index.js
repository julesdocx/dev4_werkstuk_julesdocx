var allData; //imported json

var podia = [HTMLElement]; //HTMLElements


fetch('/entries.json')
  .then(res => res.json())
  .then((json) => {
	console.log(`Got the response, there are ${json.items.length} entries`)
	allData = json.items;
	theBigDevFunction();
});

const theBigDevFunction = () => {
	let containerFilter = document.createElement('DIV')
	containerFilter.setAttribute('class', 'container')
	containerFilter.setAttribute('id', 'filter-container')
	document.body.appendChild(containerFilter)
	let containerPodia = document.createElement('DIV')
	containerPodia.setAttribute('class', 'container')
	containerPodia.setAttribute('id', 'podia-container')
	document.body.appendChild(containerPodia)
	createHTMLElementsForEveryPodia()
	createHTMLElementsForEveryFilter()
}

const createHTMLElementsForEveryPodia = () => {
	for (const podium of allData) {
		let element = document.createElement('DIV')
		element.append(`${podium.name}`)
		element.setAttribute('class', 'content-card')
		element.setAttribute('id', podium.name)
		document.getElementById('podia-container').appendChild(element)
	}
}
const createHTMLElementsForEveryFilter = () => {

}