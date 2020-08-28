var arr;

document.getElementById('filterVolwassenen').onclick( (button) => {
	event('volwassenen') 
	button.color('green')})
document.getElementById('filterVolwassenen').onclick( (button) => event('volwassenen'))

fetch('/entries.json')
  .then(res => res.json())
  .then((json) => {
	console.log(`Got the response, there are ${json.items.length} entries`);
	arr = [...json.items]
	print(arr);
});



const existfilter = item => item == !null
const itemToLowerCase = item => item['genre-v2'].toLowerCase()
const trimGenre = item => item['genre-v2'].trim()

const count = (arr, classifier) => { //count(allData, function(item) { return item['genre-v2']}))
    return arr.reduce(function(counter, item) {
        var p = (classifier || String)(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
}

const event = ( filterName) => {
	if (filterName == 'volwassenen') {
		const arrFiltered = [...arr.filter((value) => { return value.category == filterName })]
		console.log(arrFiltered)
	} else if (filterName == 'familie') {
		const arrFiltered = [...arr.filter((value) => { return value.category == filterName })]
		console.log(arrFiltered)
	} else {
		const dataCopy = [...arr];
	}
}


// const theBigDevFunction = () => {
// 	createHTMLElementsForEveryPodia()
// 	createHTMLElementsForEveryFilter()
// }

// const createHTMLElementsForEveryPodia = () => {
// 	let containerPodia = document.createElement('DIV')
// 	containerPodia.setAttribute('class', 'container')
// 	containerPodia.setAttribute('id', 'podia-container')
// 	document.body.appendChild(containerPodia)
// 	for (const podium of allData) {
// 		let element = document.createElement('DIV')
// 		element.append(`${podium.name}`)
// 		element.setAttribute('class', 'content-card')
// 		element.setAttribute('id', podium.name)
// 		document.getElementById('podia-container').appendChild(element)
// 	}
// }
// const createHTMLElementsForEveryFilter = () => {
// 	let containerFilter = document.createElement('DIV')
// 	containerFilter.setAttribute('class', 'container')
// 	containerFilter.setAttribute('id', 'filter-container')
// 	document.body.appendChild(containerFilter)
	
	// var numVolwassenen = allData.reduce(function(n, genre) {
	// 	return n + (genre.genre == 'theater');
	// }, 0);
	
	// var numFamilie = allData.reduce(function(n, genre) {
	// 	return n + (genre.category == 'familie');
	// }, 0);

//     console.log(count(allData, function(item) { return item.genre }))
// }