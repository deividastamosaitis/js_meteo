let xhr = new XMLHttpRequest();
let datalist = document.getElementById("miestai");

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

let citySelected = "";
let dataSelected = "";
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200) {
        let miestas = JSON.parse(xhr.responseText);
        for(let i=0; i < miestas.length;i++) {
            let option = document.createElement("option");
            option.value = miestas[i].code;
            datalist.appendChild(option);
        }
    }
}
xhr.open("GET", "https://api.meteo.lt/v1/places");
xhr.send();

/*DATOS*/
function datos() {
    citySelected = document.getElementById("miestas").value;
    let xh = new XMLHttpRequest();
    xh.onreadystatechange = function () {
        if(xh.readyState === 4 && xh.status === 200) {
            let data = JSON.parse(xh.responseText);
            for(let i=0;i < data.forecastTimestamps.length - 1; i++) {
                if(data.forecastTimestamps[i].forecastTimeUtc.slice(0,10) === data.forecastTimestamps[i+1].forecastTimeUtc.slice(0,10)){
                }
                 else {
                let option = document.createElement("option");
                let datalist = document.getElementById("datuList");
                option.value = data.forecastTimestamps[i].forecastTimeUtc.slice(0,10);
                datalist.appendChild(option);
                }
            }
        }
    }
xh.open("GET", "https://api.meteo.lt/v1/places/"+citySelected+"/forecasts/long-term");
xh.send();
}
/**/
const btn = document.querySelector(".oras");
btn.addEventListener('click', weather);

function weather() {
    citySelected = miestas.value;
    dataSelected = document.getElementById("data").value;
    console.log(dataSelected);
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function() {
        if(xhr1.readyState === 4 && xhr1.status === 200) {
            let weathers = JSON.parse(xhr1.responseText);
            /* Tikrinam ar lentele sukurta */
            if(document.querySelector('table') !== null) {
                var A = document.querySelector('table');
                /*var aux = A.parentNode;*/
                A.parentNode.removeChild(A);
            } else {
                /*Sukuriam table*/
                let table = document.createElement('table');
                table.classList.add("table","table-dark");
                oraidiv = document.querySelector('.orai');
                oraidiv.appendChild(table);
                let thead = document.createElement('thead')
                let rowTh = document.createElement('tr');
                let th0 = document.createElement('th')/*.setAttribute("scope", "col")*/;
                let th1 = document.createElement('th');
                let th2 = document.createElement('th');
                th0.innerHTML = "Laikas";
                th1.innerHTML = 'Temperatura';
                th2.innerHTML = 'Oras';

                table.appendChild(thead);
                thead.appendChild(rowTh);
                rowTh.appendChild(th0); 
                rowTh.appendChild(th1); 
                rowTh.appendChild(th2);
                tbody = document.createElement('tbody');
                table.appendChild(tbody);
            }


            for(let i=0; i<weathers.forecastTimestamps.length;i++){
                //if(date === weathers.forecastTimestamps[i].forecastTimeUtc.slice(0,10)) {
                if(dataSelected === weathers.forecastTimestamps[i].forecastTimeUtc.slice(0,10)) {
                    let tbody = document.querySelector("tbody");
                    let row = document.createElement('tr');
                    tbody.appendChild(row);
                        let laikas = document.createTextNode(weathers.forecastTimestamps[i].forecastTimeUtc.slice(10,30));
                        let temperatura = document.createTextNode(weathers.forecastTimestamps[i].airTemperature+" C");

                        let col = document.createElement('td');
                        let col0 = document.createElement('td');
                        let col1 = document.createElement('td');

                        row.appendChild(col);
                        row.appendChild(col0);
                        row.appendChild(col1);

                        col.appendChild(laikas);
                        col0.appendChild(temperatura);

                        let oras = document.createElement('i');
                        switch (weathers.forecastTimestamps[i].conditionCode) {
                            case "clear":
                            oras.classList.add("fas","fa-sun");
                            break;
                            case "isolated-clouds":
                            oras.classList.add("fas","fa-cloud");
                            break;
                            case "scattered-clouds":
                            oras.classList.add("fas","fa-cloud-sun");
                            break;
                            case "overcast":
                            oras.classList.add("fas","fa-cloud-sun");
                            break;
                            case "light-rain":
                            oras.classList.add("fas","fa-cloud-rain");
                            break;
                            case "moderate-rain":
                            oras.classList.add("fas","fa-cloud-showers-heavy");
                            break;
                            case "heavy-rain":
                            oras.classList.add("fas","fa-cloud-showers-heavy");
                            break;
                            case "sleet":
                            oras.classList.add("fas","fa-cloud-meatball");
                            break;
                            case "light-snow":
                            oras.classList.add("fas","fa-snowflake");
                            break;
                            case "moderate-snow":
                            oras.classList.add("fas","fa-snowflake");
                            break;
                            case "heavy-snow":
                            oras.classList.add("fas","fa-snowflake");
                            break;
                            case "fog":
                            oras.classList.add("fas","fa-smog");
                            break;
                            case "na":
                            oras.classList.add("fas","fa-question");
                            break;
                        }
                        col1.appendChild(oras);
                }
            }
        }
    }
    xhr1.open("GET", "https://api.meteo.lt/v1/places/"+citySelected+"/forecasts/long-term");
    xhr1.send();
}