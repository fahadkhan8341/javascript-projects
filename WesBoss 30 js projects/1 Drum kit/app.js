window.addEventListener('keydown',e=>{
    // console.log(e.keyCode);
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
    if(!audio) return
    audio.currentTime=0;
    audio.play()
    let box=audio.parentElement
    box.classList.add('play')
})
function removeTransition(e){
    if(e.propertyName!=='transform') return;
    this.classList.remove('play')
}
let boxes=document.querySelectorAll('.box');
boxes.forEach(box=>{
    box.addEventListener('transitionend',removeTransition)
})

