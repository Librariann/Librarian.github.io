const jsClock = document.querySelector("js-clock"),
      jsClockH1 = document.querySelector("js-clock, h2");


    

function today(){
    const present = new Date();
    const presentYear = present.getFullYear(), //년도
          presentMonth = present.getMonth(), //월
          presentDate = present.getDate(), //일
          presentDay = present.getDay(), //요일
          presentHours = present.getHours(), //시
          presentMinutes = present.getMinutes(), //분
          presentSeconds = present.getSeconds(); //초
    
    
    
          jsClockH1.innerText = `${presentYear}-${presentMonth < 10 ? `0${presentMonth}` : presentMonth}-${presentDate < 10 ? `0${presentDate}` : presentDate} ${presentHours < 10 ? `0${presentHours}` : presentHours}:${presentMinutes < 10 ? `0${presentMinutes}` : presentMinutes}:${presentSeconds < 10 ? `0${presentSeconds}` : presentSeconds}`;

}

function init(){
    today();
    setInterval(today, 1000);
}

init();