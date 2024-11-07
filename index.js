let btn1=document.getElementById("btn1").addEventListener('click',Search)

 async function Search(){
    let weather;
    const apikey='6e29a69143d0b439afff7cdcef7b116a';

    let cityname = document.getElementById("city-name").value.trim();
    document.getElementById("city-name").value="";

    if (!cityname) {
        alert("City name cannot be empty.");
        return;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(cityname)) {
        alert("Please enter a valid city name.");
        return;
    }
    
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`
    let country;
    let time;

    await fetch(url).then(response =>{
        if(!response.ok){
            alert("city Not Found")
            throw new Error("NetWork repsonse was not okay");
        }
        return response.json()
    })
    .then(data=>{
        console.log('data',data);

        document.getElementById("city").innerHTML=data['name']

        country=document.getElementById("country").innerHTML=data['sys']['country']
        // document.getElementById("country").style.marginLeft="20px"
        // document.getElementById("conutry").style.marginTop="10px"
        let temp = parseInt(data['main']['temp']);
        document.getElementById("temp").innerHTML = temp;

        console.log(temp); // Log the temperature value

        if (temp <= 20) {
            // alert("Cold");
            document.getElementById("temp-emoji").textContent = "🥶"; // Cold emoji
        } else if (temp > 20 && temp <= 30) {
            // alert("Okay");
            document.getElementById("temp-emoji").textContent = "😊"; // Okay emoji
        } else {
            // alert("Hot");
            document.getElementById("temp-emoji").textContent = "🥵"; // Hot emoji
        }

        document.getElementById("weather").innerHTML=data['weather'][0]['main']
        weather=data['weather'][0]['main']
        console.log(weather);
        document.getElementById("humidity").innerHTML=data['main']['humidity']
        document.getElementById("wind-speed").innerHTML=data['wind']['speed']
        document.getElementById("temp-min").innerHTML=data['main']['temp_min']
        document.getElementById("temp-max").innerHTML=data['main']['temp_max']
        time=data.timezone;
        

        const sunrise = data['sys']['sunrise'];
        const sunriseMilliseconds = sunrise * 1000;  // Convert from seconds to milliseconds
        const sunriseHours = `0${new Date(sunriseMilliseconds).getHours()}`.slice(-2);
        const sunriseMinutes = `0${new Date(sunriseMilliseconds).getMinutes()}`.slice(-2);
        const sunriseSeconds = `0${new Date(sunriseMilliseconds).getSeconds()}`.slice(-2);
        const sunriseTime = `${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
        document.getElementById("sunrise").innerHTML = sunriseTime;

        const sunset = data['sys']['sunset'];
        const sunsetMilliseconds = sunset * 1000;  // Convert from seconds to milliseconds
        const sunsetHours = `0${new Date(sunsetMilliseconds).getHours()}`.slice(-2);
        const sunsetMinutes = `0${new Date(sunsetMilliseconds).getMinutes()}`.slice(-2);
        const sunsetSeconds = `0${new Date(sunsetMilliseconds).getSeconds()}`.slice(-2);
        const sunsetTime = `${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`;
        document.getElementById("sunset").innerHTML = sunsetTime;

            let bg;
            let icon;

            if (weather === 'Haze') {
                bg = "url('Images/free-photo-of-misty-autumn-road-through-forest-scenery.jpeg')";
                icon='Images/haze.png'
            } else if (weather === 'Clouds') {
                bg = "url('Images/sky.webp')";
                icon='Images/cloudy-day.png'
            } else if (weather === 'Clear') {
                bg = "url('Images/clear.jpeg.jpeg')";
                icon='Images/sun.png';
            } else if (weather === 'Rain') {
                bg = "url('Images/rain.jpg')";
                icon='Images/rainy-day.png'
            }
            else if(weather === 'Smoke'){
                bg = "url('Images/ss.jpeg')";
                icon='Images/SMOKE.png'
            }
            else if(weather === 'Snow'){
                 bg = "url('Images/Snow.jpg')";
                icon='Images/SMOKE.png'
            }
            else if(weather === 'Mist'){
                bg="url('Images/Mist.jpg')"
                icon='Images/SMOKE.png'
            }
            else{
                bg = "url('Images/bg-image.jpeg')";
                icon='https://openweathermap.org/img/wn/02d@2x.png'
            }
            document.getElementById("bg").style.backgroundImage = bg;
            document.getElementById("bg").style.backgroundSize = "cover";
            document.getElementById("bg").style.backgroundPosition = "center center";
            document.getElementById("bg").style.backgroundRepeat = "no-repeat";

            document.getElementById("image-icon").src=icon;

    })
    .catch(error =>{
        console.error('error',error)
    });

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = now.toLocaleDateString(undefined, options);
        const timeStr = now.toLocaleTimeString();
        // const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
        // const cityLocalTime = new Date(utcTime + time * 1000);
        document.getElementById("current-time").textContent = `${dateStr},${timeStr}`;
    }

    // Run updateTime every second
    setInterval(updateTime, 1000);
    updateTime(); 
}
