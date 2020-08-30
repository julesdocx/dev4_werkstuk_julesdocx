// FETCH REQUEST TO ENTRIES <JSON file>

const onPageLoad = () => {
	const searchBar = document.getElementById('searchEntries')
	searchBar.addEventListener('input', () => searchEntries(searchBar.value))
	displayFilters();
}

const updateCards = async (arr) => {
	const cards = await arr
	document.getElementById('container-cards').innerHTML = ""
		for(card of cards){
			document.getElementById('container-cards').insertAdjacentHTML('afterbegin',`<div class="card-entries">${card['key-takeaways']}</div>`)
	}
}

const getData = async () => {
	return await fetch('/entries.json')
	// .then(res => res.json()).then((json) => {
	// 	console.log(`Got the response, there are ${json.items.length} entries`)
	// 	data = json.items
	// 	const filters = getAllFilters()
	// 	updateCards(data)
	// 	displayFilters(filters);
	// });
}

const searchEntries = async (inputValue) => {
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

const updateGenreButtons = async (arr) => {
	const filters = await getAllFilters()
	for (genre of filters.genre) {
		document.getElementById(genre).innerHTML =  `${genre.toUpperCase()} (${countGenre(arr, genre)})`
	}
}

// GET ALL FILTERS
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
} // {}


const filterEvent = async () => {
	const filteredData = filterData(checkFilters())
	updateCards(filteredData)
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

const filterData = async (obj) => {
	const fetchedData = await getData()
	const dataObj = await fetchedData.json()
	const filteredByDoelgroep = await dataObj.items.filter(x => filterDoelgroep(x, obj.doelgroep))
	updateGenreButtons(filteredByDoelgroep);
	return [...filteredByDoelgroep.filter(x => filterGenre(x, obj.genre))]
}

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
} // {}

const countGenre = (arr, filterName) => {
	const filteredByGenre = [...arr.filter((value) =>  value['genre-v2'] == filterName )]
	return filteredByGenre.length
}

const getCheckedElements = () => { return document.getElementsByClassName('checked') }
const getGenreButtons = () => { return document.getElementsByClassName('genre') }


onPageLoad()