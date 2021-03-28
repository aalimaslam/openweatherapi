let city = document.getElementById('cityName');
let cName = document.querySelector('.name')
let cDesc = document.querySelector('.desc')
let cTemp = document.querySelector('.temperature');
let iconsDisplayer = document.querySelector('.iconsDisplayer');
let form = document.querySelector('form');
const API_KEY = '91b577bc3ab4d6903425682446e010ff';

    form.addEventListener('submit',(s)=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position =>{
                let lat = position.coords.latitude
                let long = position.coords.longitude
                let api = 'https://api.openweathermap.org/data/2.5/weather?q='+city.value+'&appid=' + API_KEY;
                const request = new XMLHttpRequest()
                request.open('GET', api , true)
                request.onload = ()=>{
                    var data = request.responseText
                    if (request.status >= 200 && request.status < 400) {
                        console.log(JSON.parse(data))
                        data = JSON.parse(data)
                        cName.innerText = data['name'];
                        temper = data['main']['temp'];
                        formula = temper - 273.15;
                        formula = formula.toFixed(2)
                        cTemp.innerText = formula + ' C' ;
                        cDesc.innerText = data['weather'][0]['description'];
                        console.log(data['main']['icon'])
                        iconsDisplayer.src = 'http://openweathermap.org/img/wn/' + data['weather'][0]['icon'] + '.png';

                    } else {
                        console.log('error')
                    }
                }
                request.send()
            })
        }
        s.preventDefault()
    })