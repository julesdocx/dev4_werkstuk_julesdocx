// FETCH REQUEST TO ENTRIES <JSON file>
let data = [];

const getData = async () => {
	await fetch('/entries.json').then(res => res.json()).then((json) => {
		console.log(`Got the response, there are ${json.items.length} entries`)
		data = json.items
		const filters = getAllFilters()
		displayFilters( filters);
	});
}

const displayFilters = ( filters) => {
	for (doelgroep of filters.doelgroep) {
		document.getElementById('doelgroepen').insertAdjacentHTML("afterbegin", `<button class="button-filter doelgroep" id="${doelgroep}">${doelgroep.toUpperCase()}</button>`)
	}
	for (genre of filters.genre) {
		console.log(data.length)
		document.getElementById('genres').insertAdjacentHTML("afterbegin", `<button class="button-filter genre" id="${genre}">${genre.toUpperCase()}</button>`)
	}
	addBtnListeners()
}

const addBtnListeners = () => {
	let elements = document.getElementsByClassName('button-filter')
	for (item of elements) {
		let element = document.getElementById(item.id)
		element.addEventListener('click', () => {
			if (!element.classList.contains("checked")) {
				element.classList.add("checked")
			} else {
				element.classList.remove("checked")
			}
			filterEvent();
		})
	}
}

// GET ALL FILTERS
const getAllFilters = () => {
	const doelgroepSet = data.reduce((acc, value) => {
		return acc.add(value['category'].toLowerCase().trim());
	}, new Set())
	const genreSet = data.reduce((acc, value) => {
		return acc.add(value['genre-v2'].toLowerCase().trim());
	}, new Set())
	return {
		"genre": [...genreSet],
		"doelgroep": [...doelgroepSet]
	}
} // {}

const filterEvent = () => {
	const filteredData = filterData(checkFilters())
} // 

const filterDoelgroep = (filterItem, arr) => {
	if (arr.length == 0){
		 return true 
	} else {
		for (item of arr) {
			if (filterItem['category'] == item){
				return true
			}
		}
	}	
}

const filterGenre = (filterItem, arr) => {
	if (arr.length == 0){
		return true 
   	} else {
    	for (item of arr) {
        	if (filterItem['genre-v2'] == item || arr.lenght === 0){
				return true
			}
		}
	}
} // true/false

const filterData = (obj) => {
	const filteredByDoelgroep = data.filter(x => filterDoelgroep(x, obj.doelgroep))
	let genreButtons =  [...getGenreButtons()]

	const filteredData = filteredByDoelgroep.filter(x => filterGenre(x, obj.genre))
}

const checkFilters = () => {
	let checkedElements = getCheckedElements()
	let arrD = []
	let arrG = []
	for (item of checkedElements) {
		if (item.classList.contains('doelgroep')){
			arrD.push(item.id)
		} else if(item.classList.contains('genre')) {
			arrG.push(item.id)
		}
	}
	return {
		"genre": [...arrG],
		"doelgroep": [...arrD]
	}
} // {}

const countGenre = (arr, filterName) => {
	const filteredByGenre = [...arr.filter((value) =>  value['genre-v2'] == filterName )]
	return filteredByGenre.length
}

const getCheckedElements = () => { return document.getElementsByClassName('checked') }
const getGenreButtons = () => { return document.getElementsByClassName('genre') }

getData()
