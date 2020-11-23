//DATALIST miestai
let cityList = document.getElementById('miestaiList')
let pasirinktasMiestas = document.getElementById('miestoPav');
let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200){
        let miestai = JSON.parse(xhr.responseText);
        for (i = 0; i<miestai.length; i++){
            let option = document.createElement('option');
            option.value = miestai[i].name;
            cityList.appendChild(option);
        }
    }
}

xhr.open('GET', 'https://api.meteo.lt/v1/places/');
xhr.send();
//DATALIST laikai
let datos = document.getElementById('datos');
function chooseDate(){
    let datuListas = document.getElementById('datuListas');
    let xhrDates = new XMLHttpRequest();
    xhrDates.onreadystatechange = function (){
        if (xhrDates.readyState === 4 && xhrDates.status === 200){
            let datesLoad = JSON.parse(xhrDates.responseText);
            for (i = 0; i < datesLoad.forecastTimestamps.length - 1; i++){
                if (datesLoad.forecastTimestamps[i].forecastTimeUtc.slice(0,10) === datesLoad.forecastTimestamps[i+1].forecastTimeUtc.slice(0,10)){}
                else{
                    let option = document.createElement('option');
                    option.value = datesLoad.forecastTimestamps[i].forecastTimeUtc.slice(0,10);
                    datuListas.appendChild(option);
                }
            }
        }
    }
    xhrDates.open('GET', 'https://api.meteo.lt/v1/places/'+ searchCity() +'/forecasts/long-term');
    xhrDates.send();
}


// PROGNOZE
let btn = document.getElementById('prognoze');
btn.addEventListener('click', prognoze);

function prognoze(){
    let tableDiv = document.querySelector('.tableDiv');
    tableDiv.innerHTML = "";
    let dataSelect = document.getElementById('datos').value;
    console.log(dataSelect);
    let xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function() {
        if(xhr1.readyState === 4 && xhr1.status === 200) {
            let weather = JSON.parse(xhr1.responseText);
            
            tableDiv.className = "col-lg-6 justify-content-center tableDiv";
            let createTable = document.createElement('table');
            createTable.className = "table";
            tableDiv.appendChild(createTable);
            let createThead = document.createElement('thead');
            let createTbody = document.createElement('tbody');
            let headTr = document.createElement('tr');
            let thLaikas = document.createElement('th');
            thLaikas.scope = "col";
            let thTemperatura = document.createElement('th');
            thTemperatura.scope = "col";
            let thOras = document.createElement('th');
            thOras.scope = "col";

            thLaikas.innerHTML = "Laikas";
            thTemperatura.innerHTML = "Temperatūra";
            thOras.innerHTML = "Oras";

            createTable.appendChild(createThead);
            createTable.appendChild(createTbody);
            createThead.appendChild(headTr);
            headTr.appendChild(thLaikas);
            headTr.appendChild(thTemperatura);
            headTr.appendChild(thOras);
            for(let i = 0; i<weather.forecastTimestamps.length; i++){
                if (dataSelect === weather.forecastTimestamps[i].forecastTimeUtc.slice(0,10)){
                    let row = document.createElement('tr');
                    createTbody.appendChild(row);
                    let temperature = weather.forecastTimestamps[i].airTemperature;
                    let condition = weather.forecastTimestamps[i].conditionCode;
                    let date = weather.forecastTimestamps[i].forecastTimeUtc.slice(10,16);
                    let forecastTable = {
                        date: date,
                        temperature: temperature + " C",
                        condition: condition,
                    };
                    let cellDate = row.insertCell(0);
                    let cellTemp = row.insertCell(1);
                    let cellCon = row.insertCell(2);

                    cellDate.innerHTML = forecastTable.date;
                    cellTemp.innerHTML = forecastTable.temperature;

                    switch(condition){
                        case 'clear':
                            let clear = document.createElement('i');
                            clear.className = "fas fa-sun";
                            cellCon.appendChild(clear);
                        break;
                        case 'isolated-clouds':
                            let isolated = document.createElement('i');
                            isolated.className = "fas fa-cloud-sun";
                            cellCon.appendChild(isolated);
                        break;
                        case 'scattered-clouds':
                            let scattered = document.createElement('i');
                            scattered.className = "fas fa-cloud";
                            cellCon.appendChild(scattered);
                        break;
                        case 'overcast':
                            let overcast = document.createElement('i');
                            overcast.className = "fas fa-cloud";
                            cellCon.appendChild(overcast);
                        break;
                        case 'light-rain':
                            let lightRain = document.createElement('i');
                            lightRain.className = "fas fa-cloud-sun-rain";
                            cellCon.appendChild(lightRain);
                        break;
                        case 'moderate-rain':
                            let moderateRain = document.createElement('i');
                            moderateRain.className = "fas fa-cloud-rain";
                            cellCon.appendChild(moderateRain);
                        break;
                        case 'heavy-rain':
                            let heavyRain = document.createElement('i');
                            heavyRain.className = "fas fa-cloud-showers-heavy";
                            cellCon.appendChild(heavyRain);
                        break;
                        case 'sleet':
                            let sleet = document.createElement('i');
                            sleet.className = "fas fa-snowflake";
                            cellCon.appendChild(sleet);
                        break;
                        case 'light-snow':
                            let lightSnow = document.createElement('i');
                            lightSnow.className = "fas fa-snowflake";
                            cellCon.appendChild(lightSnow);
                        break;
                        case 'moderate-snow':
                            let moderateSnow = document.createElement('i');
                            moderateSnow.className = "fas fa-snowflake";
                            cellCon.appendChild(moderateSnow);
                        break;
                        case 'heavy-snow':
                            let heavySnow = document.createElement('i');
                            heavySnow.className = "fas fa-snowflake";
                            cellCon.appendChild(heavySnow);
                        break;
                        case 'fog':
                            let fog = document.createElement('i');
                            fog.className = "fas fa-smog";
                            cellCon.appendChild(fog);
                        break;
                    }
                }
            }
        }else if (xhr1.readyState === 4 && xhr1.status === 404){
            alert('ERROR')
        }
    }
    xhr1.open("GET", "https://api.meteo.lt/v1/places/"+searchCity()+"/forecasts/long-term");
    xhr1.send();
}



function searchCity(){
    let city = "";
    let cityName = JSON.parse(xhr.responseText);
    for (i = 0; i<cityName.length; i++){
        if (cityName[i].name === document.getElementById('miestoPav').value){
            city = cityName[i].code;
        }
    }
    return city;
}
