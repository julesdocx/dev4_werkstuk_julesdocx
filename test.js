"use strict";



// counterGenre 
const countGenre = (arr, filterName) => {
	const filteredByGenre = [...arr.filter((value) =>  value['genre-v2'] == filterName )];
	return filteredByGenre.length;
}

test('returns a number of times the genre is in the objects array', () => {
    expect(countGenre([{"genre-v2": "theater"},{"genre-v2": "comedy"},{"genre-v2": "theater"},{"genre-v2": "dans"}], 'theater')).toBe(2);
});

const getAllFilters = (arr) => {return [...arr.reduce((acc, value) => { return acc.add(value['genre-v2'].toLowerCase().trim())},new Set())]};

test('returns a number of times the genre is in the objects array', () => {
    expect(getAllFilters([{"genre-v2": "theater"},{"genre-v2": "comedy"},{"genre-v2": "theater"},{"genre-v2": "dans"}])).toStrictEqual(["theater", "comedy", "dans"]);
});