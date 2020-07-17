let inputs=document.querySelectorAll('.controls input')

console.log(inputs)
inputs.forEach(input=>input.addEventListener('change',handleUpdate))
inputs.forEach(input=>input.addEventListener('mousemove',handleUpdate))

function handleUpdate(){
    // console.log(this.value)
    let suffix=this.dataset.size || '';
    // console.log(suffix)
    document.documentElement.style.setProperty(`--${this.name}`,`${this.value}${suffix}`)

}