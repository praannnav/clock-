const timeBox = document.getElementById("time");
const temperature = document.getElementById("temperature");
const city=document.getElementById("city")


//stopwatch controls
const navigationStopwatch=document.getElementById("stopwatch")
const stopwatch = document.getElementById("stopwatch-timer");
const stopwatchBtn = document.getElementById("stopwatch-timer-btn");
const stopStopwatchBtn=document.getElementById("stopwatch-stop-timer-btn")
const resetStopwatchBtn=document.getElementById("stopwatch-reset-timer-btn")


let Secondcounter=0
let minuteCounter=0
let hourCounter=0





function showTime() {
  const currentTime = new Date();
  const time = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  //   console.log(time);
  return time;
}
let clock=setInterval(() => {
  timeBox.innerHTML = showTime();
}, 1000);



//weather of the city
async function weather(latitude,longitude) {
  try {
    const weatherApiResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=06196b9a7bfa4c68b1875518262608&q=${latitude},${longitude}&aqi=no`,
    );
    if(!weatherApiResponse.ok){
      throw new Error(`HTTP error: ${weatherApiResponse.status}`)
    }
    const weatherJSON = await weatherApiResponse.json();
    console.log(weatherJSON.current.temp_c);
    temperature.textContent=`${weatherJSON.current.temp_c}C`
    city.textContent=`${weatherJSON.location.name}`

  } catch (error) {
    console.log("Error:", error.messege);
  }
}

// current city of the user

async function succeded(coordinate) {
  try{
    console.log(coordinate.coords)
    const userLatitude=coordinate.coords.latitude
    const userLongitude=coordinate.coords.longitude
    weather(userLatitude,userLongitude)
    
  }catch(error){
    console.log(`error ${error}`)
  }
}

function failed(error){
  console.log(error)
}


// weather();
const userCoordinate=navigator.geolocation.getCurrentPosition(succeded,failed)


//stopwatch
navigationStopwatch.addEventListener("click",()=>{
  stopwatchBtn.style.display="inline-block"
  
  console.log("clicked")
  clearInterval(clock)  


})


function second(){
     if(Secondcounter>=60){
        Secondcounter=0
        minuteCounter+=1
        
    }else if(minuteCounter>=60){
        minuteCounter=0
        hourCounter+=1

    }else{
        Secondcounter+=1
    }
 
    console.log(`${hourCounter}:${minuteCounter}:${Secondcounter}`)
    return (`${hourCounter}:${minuteCounter}:${Secondcounter}`)
}





stopwatchBtn.addEventListener("click",()=>{
  stopStopwatchBtn.style.display="inline-block"  
  resetStopwatchBtn.style.display="inline-block"
  let stopwatchStarted=setInterval(()=>{
        timeBox.innerHTML=second()
    },1000)
  stopStopwatchBtn.addEventListener("click",()=>{
  clearInterval(stopwatchStarted)
})
  resetStopwatchBtn.addEventListener("click",()=>{
    Secondcounter=0
    minuteCounter=0
    hourCounter=0

  })
})

