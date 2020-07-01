// ****** SELECT ITEMS **********
let alert = document.querySelector('.alert')
let input = document.getElementById('grocery')
let form = document.querySelector('.grocery-form');
let submitBtn = document.querySelector('.submit-btn')
let clearBtn = document.querySelector('.clear-btn')
let groceryContainer = document.querySelector('.grocery-container')
let groceryList = document.querySelector('.grocery-list')
// edit option
let editFlag = false;
let editElement;
let editID = '';
// ****** EVENT LISTENERS **********
form.addEventListener('submit', additem);
clearBtn.addEventListener('click',clearItems);
window.addEventListener('DOMContentLoaded',setupItems)
// ****** FUNCTIONS **********
function additem(e) {
    e.preventDefault()
    let value = input.value;
    let id = new Date().getTime().toString()

    if (value && !editFlag) {
        console.log('add item')
        createElements(id,value)
        groceryContainer.classList.add('show-container')
        
        displayAlert('Grocery item added to list', 'success');
        setBackToDefault()
        addToLocalStorage(id,value);
        
    } else if (value && editFlag) {
        console.log('edit item');
        editElement.innerHTML=value;
        displayAlert('Item edited successfully','success')
        editFromLocalStorage(editID,value);
        setBackToDefault()
    } else {
        console.log('empty input');
        displayAlert('Please enter any value', 'danger')
    }
}
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    setTimeout(() => {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 3000);
}
function clearItems(){
    let items=document.querySelectorAll('.grocery-item')
    if(items.length>0){
        items.forEach((item)=>{
            groceryList.removeChild(item)
        })
    }
    localStorage.removeItem('list')
    setBackToDefault();
    displayAlert('Cleared all items from list','danger');
    groceryContainer.classList.remove('show-container')
}
function deleteItem(e){
    let element=e.currentTarget.parentElement.parentElement;
    let id=element.dataset.id;
    
    groceryList.removeChild(element)
    if(groceryList.children.length === 0){
        groceryContainer.classList.remove('show-container')
    }
    displayAlert('Item removed from list','danger')
    setBackToDefault();
    removeFromLocalStorage(id)
} 
function editItem(e){
    let element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling
    grocery.value=editElement.innerHTML;
    editFlag=true;
    submitBtn.textContent='edit'
    editID=element.dataset.id;
    
}
function setBackToDefault(){
    grocery.value=''
    editFlag=false;
    editID=''
    submitBtn.textContent="submit"

}
// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
    let groceries={id,value}
    let items= getLocalStorage()
    items.push(groceries)
    localStorage.setItem('list',JSON.stringify(items))
}
function removeFromLocalStorage(id){
    let items= getLocalStorage()
    
    items=items.filter((item)=>{
        if(item.id !== id){
            return item
        }
    })
    localStorage.setItem('list',JSON.stringify(items))
}
function editFromLocalStorage(id,value){
    let items=getLocalStorage()
    items=items.map((item)=>{
        if(item.id===id){
            item.value=value
        }
        return item
    })
    localStorage.setItem('list',JSON.stringify(items))
}
function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
// ****** SETUP ITEMS **********
function setupItems(){
    let items=getLocalStorage();
    if(items.length>0){
        items.forEach((item)=>{
            createElements(item.id,item.value)
        })
        groceryContainer.classList.add('show-container')
    }
}

function createElements(id,value){
    let element = document.createElement('article')
        element.classList.add('grocery-item')
        let attr = document.createAttribute('data-id')
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button class="edit-btn" type="button"><i class="fas fa-edit"></i></button>
          <button class="delete-btn" type="button"><i class="fas fa-trash"></i></button>
        </div>`;
        let deleteBtn=element.querySelector('.delete-btn')
        let editBtn=element.querySelector('.edit-btn')
        deleteBtn.addEventListener('click',deleteItem)
        editBtn.addEventListener('click',editItem)
        groceryList.appendChild(element);
    }