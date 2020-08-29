// FETCH REQUEST TO ENTRIES <JSON file>
let data = [];
const getData = async () => {
	await fetch('/entries.json').then(res => res.json()).then((json) => {
			console.log(`Got the response, there are ${json.items.length} entries`)
			data = json.items
			displayFilters();
	});
}

const displayFilters = () => {
	const filters = getAllFilters();
	for (doelgroep of filters.doelgroep) {
		document.body.insertAdjacentHTML("afterbegin", `<button onclick=filterEvent(${doelgroep}) >${doelgroep.toUpperCase()}</button>`)
	for (genre of filters.genre) {
		document.body.insertAdjacentHTML("afterend",`<button  onclick=filterEvent(${doelgroep} >${genre.toUpperCase()}</button>`)
	}
}

// GET ALL FILTERS returns {}
const getAllFilters = () => {
	const doelgroepSet = data.reduce((acc,value) =>{ return acc.add(value['category'].toLowerCase().trim());  }, new Set())
	const genreSet = data.reduce((acc,value) =>{ return acc.add(value['genre-v2'].toLowerCase().trim());  }, new Set())
	return { "genre": [...genreSet], "doelgroep": [...doelgroepSet] }
}

const checkFilters = () => {
	
}

const filterData = () => {

}

const filterDoelgroep = (filterName) => {
	const arr = getData().then((data)=>{
		const arrFiltered = [...data.filter((value) => { return value.category == filterName })]
		console.log(arrFiltered)
		return arrFiltered
	})
}

const filterGenre = (arr, filterName) => {
	const arrFiltered = [...arr.filter((value) => { return value.genre == filterName })]
	return arrFiltered
}

const filterEvent = (filterName, filterInputDoelgroep) => {
	const arr = filterGenre(filterDoelgroep(filterInputDoelgroep), filterName)
}
//document.getElementById('filterVolwassenen').addEventListener('click', filterEvent('volwassenen'))
//document.getElementById('filterFamilie').addEventListener('click', filterEvent('familie'))
//document.getElementById('filterFamilie').addEventListener('click', () => {filterEvent('theater', findDoelGroep())})// theater is nog hardcoded

const existfilter = item => item == !null
const itemToLowerCase = item => item['genre-v2'].toLowerCase()
const trimGenre = item => item['genre-v2'].trim()


const count = (arr, classifier) => { //count(allData, function(item) { return item['genre-v2']}))
    return arr.reduce(function(acc,value) {
        var p = (classifier || String)(value)
        acc[p] = acc.hasOwnProperty(p) ? acc[p] + 1 : 1
        return acc
    }, {})
}

getData();
