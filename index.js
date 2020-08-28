var allData;

fetch('/entries.json')
  .then(res => res.json())
  .then((json) => {
	console.log(`Got the response, there are ${json.items.length} entries`)
	allData = JSON.stringify(json.items);
	printAlldata();
});

const printAlldata = () => {
	document.body.append(`<div><p>${allData}</p></div>`)
}