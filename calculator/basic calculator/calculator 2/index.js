class Calculator {
    constructor(currentOperand,previousOperand){
        this.currentOperand=currentOperand;
        this.previousOperand=previousOperand;
    }
    appendNumber(number){
        currentOperand.innerHTML+=number;
    }
}
let numberBtns= document.querySelectorAll('[data-number]');
let operationBtns= document.querySelectorAll('[data-operation]');
let currentOperand= document.querySelector('.currentOperand');
let previousOperand= document.querySelector('.previousOperand')
let calculator = new Calculator (currentOperand,previousOperand)

numberBtns.forEach(number=>{
    number.addEventListener('click',()=>{
        console.log(number.textContent);
        calculator.appendNumber(number.textContent)
        
    })
})
operationBtns.forEach(operator=>{
    operator.addEventListener('click',()=>{
        console.log(operator.textContent)
    })
})