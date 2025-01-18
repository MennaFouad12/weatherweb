let todayname=document.getElementById("today_name");
let todaynumber=document.getElementById("today_number");
let todaymonth=document.getElementById("today_month");
let todaylocation=document.getElementById("today_location");
let todaytemp=document.getElementById("today_temp");
let todayconditiontext=document.getElementById("today_condition");
let todayconditionimg=document.getElementById("today_img");
let humadity=document.getElementById("humadity");
let wind=document.getElementById("wind");
let winddirection=document.getElementById("wind_direction");
let weatherdate;
let nextday=document.getElementsByClassName("tomorrow_date");
let nextmaxtemp=document.getElementsByClassName("next_max_temp");
let nextmintemp=document.getElementsByClassName("next_min_temp");
let nextconditionimg=document.getElementsByClassName("next_condition_img");
let nextconditiontext=document.getElementsByClassName("next_condition_text");
let searchinput=document.getElementById("searchInput");
console.log(todayname);

// let date=new Date();
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-US",{weekday:"long"}));
// console.log(date.toLocaleDateString("en-US",{month:"long"}));


async function getweatherdata(city){
let weatherresponse=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f1155993a3aa476a8f5174351242406&q=${city}&days=3`);
let weatherdata=await weatherresponse.json();
return weatherdata ;
}

function displaytodaydata(data){
    let todaydate=new Date();
    todayname.innerHTML=todaydate.toLocaleDateString("en-US",{weekday:"long"});
    todaynumber.innerHTML=todaydate.getDate();
    todaymonth.innerHTML=todaydate.toLocaleDateString("en-US",{month:"long"});
todaylocation.innerHTML=data.location.name;
todaytemp.innerHTML=data.current.temp_c;
todayconditiontext.innerHTML=data.current.condition.text;
todayconditionimg.setAttribute("src","https:"+data.current.condition.icon);
humadity.innerHTML=data.current.humidity+"%";
wind.innerHTML=data.current.wind_kph+"Km/h";
winddirection.innerHTML=data.current.wind_dir;
}
let forecastdata=[]
function displaynextdata(data){
    console.log(data);
    console.log(data.forecast.forecastday);
 forecastdata=data.forecast.forcastday;

console.log(data.forecast.forecastday[2]);
for(let i=0; i<2; i++){
    let nextdate=new Date(data.forecast.forecastday[i+1].date);
    nextday[i].innerHTML=nextdate.toLocaleDateString("en-US",{weekday:"long"});
nextmaxtemp[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c;
nextmintemp[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c;
nextconditionimg[i].setAttribute("src",`https:${data.forecast.forecastday[i+1].day.condition.icon}`);
nextconditiontext[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;

}

}
async function startApp(city="cairo"){

    let weatherdata=await getweatherdata(city);
    if(!weatherdata.error){
   displaytodaydata(weatherdata);
   displaynextdata(weatherdata);
    }
}
startApp();

searchinput.addEventListener("input",function(){
startApp(searchinput.value);
})
