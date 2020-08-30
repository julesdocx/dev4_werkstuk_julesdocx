// Functies om bij het laden te starten.
const onPageLoad = () => {
	const searchBar = document.getElementById('searchEntries')
	searchBar.addEventListener('input', () => searchEntriesEvent(searchBar.value))
	displayFilters();
}

// Returnt Promise met entries data
const getData = async () => {
	return await fetch('/entries.json')
}

// Alle filter-buttons klaarzetten
const displayFilters = async () => {
	const filters = await getAllFilters()
	for (doelgroep of filters.doelgroep) {
		document.getElementById('doelgroepen').insertAdjacentHTML("afterbegin", `<button class="button-filter doelgroep" id="${doelgroep}">${doelgroep.toUpperCase()}</button>`)
	}
	for (genre of filters.genre) {
		document.getElementById('genres').insertAdjacentHTML("afterbegin", `<button class="button-filter genre" id="${genre}">${genre.toUpperCase()}</button>`)
	}
	addBtnListeners()
	filterEvent()
}

// Returnt een {} met genres [] en doelgroep []
const getAllFilters = async () => {
	const fetchedData = await getData()
	const dataObj = await fetchedData.json()
	const doelgroepSet = dataObj.items.reduce((acc, value) => {
		return acc.add(value['category'].toLowerCase().trim());
	}, new Set())
	const genreSet = dataObj.items.reduce((acc, value) => {
		return acc.add(value['genre-v2'].toLowerCase().trim());
	}, new Set())
	return {
		"genre": [...genreSet],
		"doelgroep": [...doelgroepSet]
	}
}

// Event voor searchBar, zoekt door entries via inputValue
const searchEntriesEvent = async (inputValue) => {
	const fetchedData = await getData()
	const dataObj = await fetchedData.json()

	const filteredData = dataObj['items'].filter((input) => {
		const regex = new RegExp(`^${inputValue}`)
		return input['name'].match(regex)
	})

	if (inputValue.lenght === 0) {
		filteredData.items = []
	}
	updateCards(filteredData);
}

// Event voor filter-buttons
const filterEvent = async () => {
	const filteredData = filterData(checkFilters())
	updateCards(filteredData)
}

// Returnt gefilterde [] 
const filterData = async (obj) => {
	const fetchedData = await getData()
	const dataObj = await fetchedData.json()
	const filteredByDoelgroep = await dataObj.items.filter(x => filterDoelgroep(x, obj.doelgroep))
	updateGenreButtons(filteredByDoelgroep);
	return [...filteredByDoelgroep.filter(x => filterGenre(x, obj.genre))]
}

// Returnt true/false als filter voor een doelgroep []
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

// Returnt true/false als filter voor een genres []
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
} 

// Returnt een {} met genres [] en doelgroep [] van de gecheckte filters
const checkFilters =  () => {
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
}

// Voegt de filterEvent() toe aan de filter-buttons
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

// Laad de gefilterde entries
const updateCards = async (arr) => {
	const cards = await arr
	document.getElementById('container-cards').innerHTML = ""
		for(card of cards){
			document.getElementById('container-cards').insertAdjacentHTML('afterbegin',`<div class="card-entries">${card['key-takeaways']}</div>`)
	}
}

// Voegt het getal van het aantal entries van een bepaalt genre in de filter-buttons
const updateGenreButtons = async (arr) => {
	const filters = await getAllFilters()
	for (genre of filters.genre) {
		document.getElementById(genre).innerHTML =  `${genre.toUpperCase()} (${countGenre(arr, genre)})`
	}
}

// Returnt de lengte van een array gefiltert op 1 string
const countGenre = (arr, filterName) => {
	const filteredByGenre = [...arr.filter((value) =>  value['genre-v2'] == filterName )]
	return filteredByGenre.length
}

// Returnt array met alle 'gecheckte' filter-buttons
const getCheckedElements = () => { return document.getElementsByClassName('checked') }

// Returnt alle genre filter-buttons
const getGenreButtons = () => { return document.getElementsByClassName('genre') }

// Lets Start!
onPageLoad()