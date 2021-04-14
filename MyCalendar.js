var present = new Date();
var thisYear = present.getFullYear();
var thisMonth = present.getMonth();  // 달 0~11
var thisDate = present.getDate();  // 날짜 1~31
var thisDay = present.getDay();  // 요일 0~6   일요일 = 0, 월요일 = 1
var firstDay = 0;
var lastDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var thisLastDay = 0;

function getFirstDay(thisDate, thisDay){    //해당 월의 1일의 요일
    if(thisDay === 0) thisDay = 7;
    var temp = thisDate % 7;
    if(temp === 1) return thisDay;
    else if(temp === 0) return (thisDay + 1);
    else if(temp - 1 < thisDay) return (thisDay - temp + 1);
    else return (thisDay + 7 - temp + 1);
}

function displayTitle(){
    document.getElementById("yearMonth").innerHTML = thisYear + '년 ' + (thisMonth+1) + '월';
}

function deleteCalendar(){
    var i = 0;
    while(i < 6){
        var week = document.getElementById(i.toString());
        while(week.hasChildNodes()){
            week.removeChild(week.firstChild);
        }
        i++;
    }
}

function displayCalendar(){
    firstDay = getFirstDay(thisDate, thisDay);
    if(thisYear % 4 === 0) lastDate[1] = 29;
    var cnt = 0;
    loop1:
    for(var i = 0; i < 6; i++){
        var week = document.getElementById(i.toString());
        loop2:
        for(var j = 1; j <= 7; j++){
            if(i===0 && j<firstDay){
                week.insertAdjacentHTML('beforeend', '<td></td>');
            }else{
                cnt++;
                week.insertAdjacentHTML('beforeend', `
                    <td>
                        <div class='daynum'>${cnt}</div>
                        <div class='daycontent'></div>
                    </td>
                `);
            }
            if(cnt === lastDate[thisMonth]){
                thisLastDay = j;
                break loop1;
            }
        }
    }
}

displayTitle();
displayCalendar();


function presentMonth(){
    thisYear = present.getFullYear();
    thisMonth = present.getMonth();
    thisDate = present.getDate();
    thisDay = present.getDay();

    displayTitle();
    deleteCalendar();
    displayCalendar();
}

function prevMonth(){
    if(thisMonth === 0){
        thisYear -= 1;
        thisMonth = 11;
    }else{
        thisMonth -= 1; 
    }
    thisDate = lastDate[thisMonth];
    thisDay = firstDay - 1;

    displayTitle();
    deleteCalendar();
    displayCalendar();
}

function nextMonth(){
    if(thisMonth === 11){
        thisYear += 1;
        thisMonth = 0;
    }else{
        thisMonth += 1;
    }
    thisDate = 1;
    if(thisLastDay === 7) thisDay = 1;
    else thisDay = thisLastDay + 1;

    displayTitle();
    deleteCalendar()
    displayCalendar();
}
