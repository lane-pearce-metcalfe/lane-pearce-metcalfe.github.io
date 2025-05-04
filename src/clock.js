export function setClock() {
  
  const date = Date();
  let hour = Number(date.slice(16, 18));
  let minute = Number(date.slice(19, 21));
  let second = Number(date.slice(22, 24))
  let APM = 'AM';

  const secondId = document.getElementById('second')
  const minuteId = document.getElementById('minute')
  const hourId = document.getElementById('hour')
  const APMId = document.getElementById('APM')

  if (hour > 12) {
    hour -= 12;
    APM = `PM`
  }

  APMId.innerHTML = `${APM}`

  if (second < 10) {
    secondId.innerHTML = `0${second}`
  } else {
    secondId.innerHTML = `${second}`
  }

  if (minute < 10) {
    minuteId.innerHTML = `0${minute}`
  } else {
    minuteId.innerHTML = `${minute}`
  }

  if (hour < 10) {
    hourId.innerHTML = `0${hour}`
  } else {
    hourId.innerHTML = `${hour}`
  }

  console.log(minute)

  function updateClock() {
    
    second++;
    if (second === 60) {
      second = 0;
      secondId.innerHTML = `0${second}`
      minute++;
      if (minute === 60) {
        minute = 0;
        minuteId.innerHTML = `0${minute}`
        hour++
      } else if (minute < 10) {
        minuteId.innerHTML = `0${minute}`
      } else {
        minuteId.innerHTML = `${minute}`
      }
      if (hour === 13) {
        hour = 1;
        hourId.innerHTML = `0${hour}`
        if (APM === 'PM') {
          APM = 'AM'
        } else {
          APM = 'PM'
        }

      } else if (hour < 10) {
        hourId.innerHTML = `0${hour}`
      } else {
        hourId.innerHTML = `${hour}`
      }
    } else if (second < 10) {
      secondId.innerHTML = `0${second}`
    } else {
      secondId.innerHTML = `${second}`
    }
  }

  setInterval(() => {
    updateClock();
  }, 1000)
}