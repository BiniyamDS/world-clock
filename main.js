import MicroModal from 'micromodal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

// Variables to hold the elements to be changed
const timeZoneElem = document.getElementById('timezone')
const CurTime = document.getElementById('time')
const curDate = document.getElementById('date')
const applyBt = document.getElementById('apply-bt')
const selectElem = document.getElementById('timeZLi')

// declare a timezone in user's current location
let timeZObj = dayjs.tz.guess()

// initialize the element valaues
popScreen();

// function to populate the date and time zone screen elements
function popScreen(){
    const now = dayjs().tz(timeZObj)
    timeZoneElem.textContent = timeZObj.replace('/', ' / ').replace('_', ' ')
    CurTime.textContent = now.format('hh:mm:ss')
    curDate.textContent = now.format('dddd, D MMMM, YYYY')
}


// generate dropdown list of time zones
let SupTZArr = Intl.supportedValuesOf("timeZone");
for (const timz of SupTZArr){
    // Create a new option
    let newOption = new Option(timz, timz);

    // Add the new option to the select element
    selectElem.add(newOption, undefined);

}

// modal
MicroModal.init()
applyBt.addEventListener('click', changeTimeZone);

// function to change the time zone to selected one
function changeTimeZone(){
    const selVal = selectElem.value
    timeZObj = selVal
}

// reload the time every second
setInterval(popScreen,  1000);