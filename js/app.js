let dataList = document.getElementById('miestai');
let pasirinktasMiestas = document.getElementById('miestoPav');

let citySelected = "";
//DATALIST miestai
let xhr = new XMLHttpRequest();
let api = 'https://api.meteo.lt/v1/places/';

xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200){
        let miestai = JSON.parse(xhr.responseText);
        console.log(miestai[0].name);
        for (i = 0; i<miestai.length; i++){
            let option = document.createElement('option');
            option.value = miestai[i].name;
            dataList.appendChild(option);
        }
    }
}

xhr.open('GET', api);
xhr.send();

//DATALIST datos
function forecastDates(){
    let citySelect = document.getElementById('miestoPav').value;
    let datosXhr = new XMLHttpRequest();
    if (datosXhr.readyState === 4 && datosXhr.status === 200){
        let dateLoad = JSON.parse(datosXhr.responseText);
        for (i = 0; i < dateLoad.forecastTimestamps.length; i++){
            if (dateLoad.forecastTimestamps[i].forecastTimeUtc.slice(0,10) === dateLoad.forecastTimestamps[i+1].forecastTimeUtc.slice(0,10)){}
            else {
                let option = document.createElement('option');
                let datuList = document.getElementById('datuListas');
                option.value = dateLoad.forecastTimestamps[i].forecastTimeUtc.slie(0,10);
                datuList.appendChild(option);
            }
        }
    }
datosXhr.open("GET", "https://api.meteo.lt/v1/places/"+citySelect+"/forecasts/long-term");
datosXhr.send();
}

//SHOW forecast
let forecast = document.getElementById('prognoze');
let xhr1 = new XMLHttpRequest();
forecast.addEventListener('click', showForeCast);

function showForeCast() {
    document.querySelector('.table').innerHTML = "";
    let cityAPI = 'https://api.meteo.lt/v1/places/'+ searchCity() +'/forecasts/long-term';

    xhr1.onreadystatechange = function(){
        if (xhr1.readyState === 4 && xhr1.status === 200){
            let cityData = JSON.parse(xhr1.responseText);
            console.log(cityAPI);
            let tableDiv = document.querySelector('.table')
            let table = document.createElement('table');
            tableDiv.appendChild(table);
            for (let i = 0; i<cityData.forecastTimestamps.length; i++){
                let temperature = cityData.forecastTimestamps[i].airTemperature;
                let condition = cityData.forecastTimestamps[i].conditionCode;
                let date = cityData.forecastTimestamps[i].forecastTimeUtc;
                let forecastTable = {
                    date: date,
                    temperature: temperature,
                    condition: condition,
                };
                let row = table.insertRow(i);
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
            
        }else if (xhr1.readyState === 4 && xhr1.status === 404){
            alert('ERROR')
        }
    }

    xhr1.open('GET', cityAPI);
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

