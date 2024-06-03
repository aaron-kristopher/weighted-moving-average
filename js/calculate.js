const salesJSON = localStorage.getItem("monthlySales");
const salesArray = JSON.parse(salesJSON);

function calculateWMA(data, windowSize) {
    const wma = [];

    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        for (
            let j = i;
            j < i + windowSize && i + windowSize <= data.length;
            j++
        ) {
            sum += data[j];
        }
        if (sum != 0) wma.push(sum / windowSize);
    }

    return wma;
}

const wmas = [];
for (let windowSize = 2; windowSize <= 6; windowSize++) {
    wmas.push(calculateWMA(salesArray, windowSize));
}

console.log(wmas);

let tableBody = document.getElementById("sales-table-body");
const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function displayTable(wmas, windowSize) {
    let newTbody = document.createElement("tbody");
    let wmaIndex = 0;
    for (let i = 0; i < salesArray.length; i++) {
        const tableRow = document.createElement("tr");
        const monthCell = document.createElement("td");
        const salesCell = document.createElement("td");
        const wma = document.createElement("td");

        monthCell.textContent = monthNames[i];
        salesCell.textContent = salesArray[i];
        wma.textContent =
            i + 1 >= windowSize ? wmas[wmaIndex++].toFixed(2) : "";

        tableRow.appendChild(monthCell);
        tableRow.appendChild(salesCell);
        tableRow.appendChild(wma);

        newTbody.appendChild(tableRow);
    }
    tableBody.parentNode.replaceChild(newTbody, tableBody);
    tableBody = newTbody;
}
displayTable(wmas[0], 2);

const sliderEl = document.querySelector("#range2");
const sliderValue = document.querySelector(".value2");

sliderEl.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    sliderValue.textContent = tempSliderValue;

    const progress = (tempSliderValue / sliderEl.max) * 100;

    sliderEl.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
    displayTable(wmas[tempSliderValue - 2], tempSliderValue);
});
