const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let giveaway=document.querySelector('.giveaway')
let deadline=document.querySelector('.deadline');
let boxes=document.querySelectorAll('.deadline-format h4')
let tempDate= new Date();
let tempYear= tempDate.getFullYear()
let tempMonth=tempDate.getMonth()
let tempDay=tempDate.getDate()
// let futureDate=new Date(2020,6,4,19,56,0)
let futureDate=new Date(tempYear,tempMonth,tempDay+10,7,30,0)
console.log(futureDate)
let year=futureDate.getFullYear()
let hours=futureDate.getHours()
let minutes=futureDate.getMinutes()

let date=futureDate.getDate()
let month=futureDate.getMonth()
month=months[month]
let weekday=futureDate.getDay()
weekday=weekdays[weekday]
giveaway.textContent=`Giveaway Ends On ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes} pm. `;

let futureTime=futureDate.getTime()
console.log(futureTime)

function getRemainingTime(){
  let today=new Date().getTime()
  console.log(today)
  let t=futureTime-today;
  console.log(t)

  let oneDay=24*60*60*1000;
  let oneHour=60*60*1000;
  let oneMinute=60*1000;

  console.log(oneDay)
  let days=Math.floor(t/oneDay);
  let hours=Math.floor((t % oneDay) / oneHour);
  let minutes=Math.floor((t % oneHour) / oneMinute);
  let seconds=Math.floor((t % oneMinute) / 1000);
  

  let values=[days,hours,minutes,seconds];
  function format(item){
    if(item<10){
      return (item=`0${item}`);
    } 
    return item
  }
  boxes.forEach((box,index)=>{
    box.innerHTML=format(values[index]);
  })
  if(t<0){
    deadline.innerHTML=`<h4 class="expired">Sorry, this giveaway has expired!</h4>`
  }
}

let giveawayExpire=setInterval(() => {
  getRemainingTime()
}, 1000);