var allData; //imported json

var doelGroepFilters

fetch('/entries.json')
  .then(res => res.json())
  .then((json) => {
	console.log(`Got the response, there are ${json.items.length} entries`)
	allData = json.items;
	theBigDevFunction();
});


const count = (arr, classifier) => {
    return arr.reduce(function(counter, item) {
        var p = (classifier || String)(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
}


const filter = (filterName, filterStatus) => {
	
}

const theBigDevFunction = () => {
	createHTMLElementsForEveryPodia()
	createHTMLElementsForEveryFilter()
}

const createHTMLElementsForEveryPodia = () => {
	let containerPodia = document.createElement('DIV')
	containerPodia.setAttribute('class', 'container')
	containerPodia.setAttribute('id', 'podia-container')
	document.body.appendChild(containerPodia)
	for (const podium of allData) {
		let element = document.createElement('DIV')
		element.append(`${podium.name}`)
		element.setAttribute('class', 'content-card')
		element.setAttribute('id', podium.name)
		document.getElementById('podia-container').appendChild(element)
	}
}
const createHTMLElementsForEveryFilter = () => {
	let containerFilter = document.createElement('DIV')
	containerFilter.setAttribute('class', 'container')
	containerFilter.setAttribute('id', 'filter-container')
	document.body.appendChild(containerFilter)
	
	// var numVolwassenen = allData.reduce(function(n, genre) {
	// 	return n + (genre.genre == 'theater');
	// }, 0);
	
	// var numFamilie = allData.reduce(function(n, genre) {
	// 	return n + (genre.category == 'familie');
	// }, 0);

    console.log(count(allData, function(item) { return item.genre })
	)
}