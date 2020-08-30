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
	let filters = getAllFilters()
	for (doelgroep of filters.doelgroep) {
		document.getElementById('doelgroepen').insertAdjacentHTML("afterbegin", `<button class="button-filter doelgroep" id="${doelgroep}">${doelgroep.toUpperCase()}</button>`)
	}
	for (genre of filters.genre) {
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
    for (item of arr) {
        if (filterItem['category'] == item || arr.length === 0){
			return true
		}
    }
}

const filterGenre = (filterItem, arr) => {
    for (item of arr) {
        if (filterItem['genre-v2'] == item || arr.lenght === 0){
			return true
		}
    }
} // true/false

const filterData = (obj) => {
	console.log(obj)
	const filteredByDoelgroep = data.filter(x => filterDoelgroep(x, obj.doelgroep))
	console.log(filteredByDoelgroep)
	const filteredData = filteredByDoelgroep.filter(x => filterGenre(x, obj.genre))
	console.log(filteredData)
}

const checkFilters = () => {
	let checkedElements = document.getElementsByClassName('checked')
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

getData()
