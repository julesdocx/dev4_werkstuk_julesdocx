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
		document.getElementById('doelgroepen').insertAdjacentHTML("afterbegin", `<button class="button-filter" id="${doelgroep}">${doelgroep.toUpperCase()}</button>`)
	}
	for (genre of filters.genre) {
		document.getElementById('genres').insertAdjacentHTML("afterbegin", `<button class="button-filter" id="${genre}" onclick=filterEvent("${genre}")>${genre.toUpperCase()}</button>`)
	}
	addBtnListeners()
}

const addBtnListeners = () => {
	let elements = document.getElementsByClassName('button-filter')
	for (filter of elements) {
		const element = document.getElementById(filter.id)
		element.addEventListener('click', () => {
			if (!element.classList.contains("checked")) {
				element.classList.add("checked")
			} else {
				element.classList.remove("checked")
			}
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

const filterEvent = (filterName) => {
	const filteredData = filterData(checkFilters())
} // 

const checkFilters = () => {
	let checkedElements = document.getElementsByClassName('checked')
	let arr = []
	for (filter of checkedElements) {
		arr.push(filter.id)
	}
	return arr
} // []

const filterData = (arr) => {
	const filteredData = data.filter((value)) => {

	}

}

const filterDoelgroep = (filterName) => {
	const arr = getData().then((data) => {
		const arrFiltered = [...data.filter((value) => {
			return value.category == filterName
		})]
		console.log(arrFiltered)
		return arrFiltered
	})
}

const filterGenre = (arr, filterName) => {
	const arrFiltered = [...arr.filter((value) => {
		return value.genre == filterName
	})]
	return arrFiltered
}

getData()
