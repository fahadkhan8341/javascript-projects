let secondHand=document.querySelector('.secondHand')
let minuteHand=document.querySelector('.minuteHand')
let hourHand=document.querySelector('.hourHand')
let p1=document.querySelector('.p1')
let p2=document.querySelector('.p2')
let toggler=document.querySelector('.mode-toggler')
let weekday=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function run(){
    let now=new Date()
    let seconds=now.getSeconds()
    let minutes=now.getMinutes()
    let hours=now.getHours()
    console.log(hours)
    let secondsDegree=((seconds/60)*360)+90
    let minutesDegree=((minutes/60)*360)+90
    let hourDegree=((minutes/12)*360)+90

    secondHand.style.transform=`rotate(${secondsDegree}deg)`;
    minuteHand.style.transform=`rotate(${minutesDegree}deg)`;
    hourHand.style.transform=`rotate(${hourDegree}deg)`;

    let date=now.getDate()
    let month=now.getMonth()
    let year=now.getFullYear()
    let day=now.getDay()
   
    p1.innerHTML=`${date}/${months[month]}/${year}`
    p2.innerHTML=`${weekday[day]}`
    
    
}
// run()
setInterval(() => {
    run()
}, 1000);

toggler.addEventListener('click',()=>{
   changeMode()
})

function changeMode(){
     
    document.querySelector('body').classList.toggle('light')
    document.querySelector('.clock').classList.toggle('dark')
    document.querySelector('.clock').classList.toggle('glow')
    document.querySelector('.clock-face').classList.toggle('light')
    document.querySelector('.hourHand').classList.toggle('dark')
    document.querySelector('.minuteHand').classList.toggle('dark')
    document.querySelector('.btn').classList.toggle('move')
    document.querySelector('.btn').classList.toggle('light')
    toggler.classList.toggle('dark')
    
    p1.classList.toggle('dark')
    p2.classList.toggle('dark')
    console.log();
    if(document.querySelector('body').classList.contains('light')){
        let mode='light'
        localStorage.setItem('mode',mode)
    }
    
}

window.addEventListener('DOMContentLoaded',()=>{
    let mode=localStorage.getItem('mode')
    if(mode=='light'){
        changeMode()
        localStorage.removeItem('mode')
    }
})