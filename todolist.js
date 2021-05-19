let inputContent='';
let listElem = document.getElementById('list');
dateId = '' + present.getFullYear() + modifyMonth(present.getMonth()) + modifyDate(present.getDate());
displayList();

document.querySelector('input').addEventListener('keyup', (event)=>{
    if(event.keyCode === 13){
        event.preventDefault();
        document.querySelector('button').click();
    }
});

document.querySelector('button').addEventListener('click', ()=>{
    inputToStroage();
    document.querySelector('input').value = '';
    clearList();
    displayList();
});

function inputToStroage(){
    inputContent = document.querySelector('input').value;
    if(inputContent === '') return
    let temp = storage.getItem(dateId);
    storage.setItem(dateId, temp + '\n' + inputContent);
}

function clearList(){
    while(listElem.hasChildNodes()){
        listElem.removeChild(listElem.firstChild);
    }
}

function displayList(){
    let scd = storage.getItem(dateId);

    if(scd != null){
        let splitedScd = scd.split('\n');
        for(e of splitedScd){
            createItem(e);
        }
    }       
}

function createItem(item){
    // 새로운 div 생성
    let newItem = createDivIn(listElem);
    newItem.classList.add('items');

    // 내용 부분 생성
    let contentDiv = createDivIn(newItem);
    contentDiv.textContent = item;
    contentDiv.classList.add('contents');
    setCheckFunc(contentDiv);

    // X 부분 생성
    let delDiv = createDivIn(newItem);
    delDiv.textContent = 'X';
    delDiv.classList.add('del');
    delDiv.addEventListener('click', (e)=>{
        deleteItem(e.currentTarget.parentNode);
        clearList();
        displayList();
    });
}

function deleteItem(item){
    item.remove();
    let contents = document.getElementsByClassName('contents')
    let newContents = '';
    for(let i = 0; i < contents.length; i++){
        newContents = newContents + contents[i].innerText + ((i != contents.length-1) ? '\n' : '');
    }
    storage.setItem(dateId, newContents);
}

function createDivIn(elem){
    return elem.appendChild(document.createElement('div'));
}

function setCheckFunc(elem){
    elem.addEventListener('click', (event)=>{
        if(event.target.classList.contains('checked')){
            event.target.classList.remove('checked');
        }else{
            event.target.classList.add('checked');
        }
    })
}