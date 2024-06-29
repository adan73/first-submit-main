
window.onload = () => { 
  PrintPatientsList();
  build_the_progress();
  print_x();
  print_patient_age_for_digram();
  BuildCalendar();
  Show_User_Activity();
}



function PrintPatientsList(){

    fetch('data/patients_data.json')
      .then(response => response.json())
      .then(data => {
        const personInfo = document.getElementById('patione');
        const ul = document.createElement('ul');
  
        data.patients.forEach(patient => {
          const li = document.createElement('li');
  
          const img = document.createElement('img');
          img.src = patient.photo;
          img.alt = patient.name;
  
          const patientName = document.createElement('div');
          patientName.textContent = patient.name;
  
          li.appendChild(img);
          li.appendChild(patientName);
          ul.appendChild(li);
        });
        personInfo.appendChild(ul);
  
  
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  
  function build_the_progress(){
    const yAxisContainer = document.querySelector('.y-axis');
    
        var x=0;
        for (let i = 100; i >= 10; i -= 10) {
          if(i==100)
          {
            const ytitle = document.createElement('span');
            ytitle.textContent = 'Progress';
            ytitle.classList.add('y-title');
            yAxisContainer.appendChild(ytitle);
          }
           
            const yAxisLine = document.createElement('div');
            yAxisLine.classList.add('y-axis-line');
        
            const yAxisNumber = document.createElement('span');
            yAxisNumber.textContent = i;
            yAxisNumber.classList.add('y-axis-number');
            
            yAxisLine.appendChild(yAxisNumber);   
            yAxisContainer.appendChild(yAxisLine);
           if(i==10)
          {   
              const xtitle = document.createElement('span');
              xtitle.textContent = 'months';
              xtitle.classList.add('x-title');
              yAxisContainer.appendChild(xtitle);
          } 
         
        }
     
}


function print_x(){
  const monthsContainer = document.querySelector('.months');
  const resultsContainer = document.querySelector('.results');
  const color = ["#003D32", "#00665F", "#35978F"];
  const months = ["January", "February", "March"];
  const results = {"January": [178,30,90],"February": [30, 209,259],"March": [209, 120, 90]};
  
  months.forEach(month => {
    const monthDiv = document.createElement('div');
    monthDiv.textContent = month;
    monthDiv.classList.add('month');
    monthsContainer.appendChild(monthDiv);

    const monthResults = document.createElement('div');
    monthResults.classList.add('month-results');
    
    results[month].forEach((result, index) => {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('result');
        resultDiv.style.height = `${result}px`;
        resultDiv.style.backgroundColor = color[index % color.length];
        monthResults.appendChild(resultDiv);
    });

    resultsContainer.appendChild(monthResults);
});
}



  function print_patient_age_for_digram(){
      const Patientage = document.querySelector('.patient-age');
      const colors = ["#003D32", "#00665F", "#35978F"];
      const ages = ["0-12", "12-25", "25+"];

      const titleDiv = document.createElement('div');
      titleDiv.textContent = "Patient Age";
      titleDiv.classList.add('text-age');
      Patientage.appendChild(titleDiv);

      ages.forEach((age, index) => {
          const ageContainer = document.createElement('div');
          ageContainer.classList.add('age-container');

          const ageBox = document.createElement('div');
          ageBox.classList.add('age-box');
          ageBox.style.backgroundColor = colors[index];

          const ageText = document.createElement('div');
          ageText.classList.add('text-age');
          ageText.textContent = age;

          ageContainer.appendChild(ageBox);
          ageContainer.appendChild(ageText);

        
          Patientage.appendChild(ageContainer);
      });
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    BuildCalendar();
    
});

function BuildCalendar() {
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
  
    const calendarDates = document.getElementById('calendar-dates');
    const monthYearElement = document.querySelector('.month-year');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
  
    PrintTheDaysInMonthCalendar(currentYear, currentMonth);
  
    prevBtn.addEventListener('click', () => changeMonth(-1));
    nextBtn.addEventListener('click', () => changeMonth(1));
  
  function PrintTheDaysInMonthCalendar(year, month) {
    monthYearElement.textContent = `${months[month]} ${year}`;
    const wh = document.getElementById('weekday-header');
    wh.innerHTML = '';
    calendarDates.innerHTML = '';
    weekdays.forEach(day => {
      const weekdayElement = document.createElement('div');
      weekdayElement.textContent = day;
      wh.appendChild(weekdayElement);
    });
    printdays(year, month)
  }  
  
  function printdays(year, month){
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = (new Date(year, month, 1).getDay() + 6) % 7;
    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("empty-cell");
      calendarDates.appendChild(emptyCell);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateCell = document.createElement("div");
      dateCell.classList.add("date-cell");
      if (
        i === currentDate.getDate() &&
        year === currentDate.getFullYear() &&
        month === currentDate.getMonth()
      ) {
        dateCell.classList.add("current-date");
      }
      dateCell.textContent = i;
      calendarDates.appendChild(dateCell);
    }
  }        
  
  function changeMonth(change) {
    currentMonth += change;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    } else 
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    PrintTheDaysInMonthCalendar(currentYear, currentMonth);
    }
}


function Show_User_Activity(){
  fetch('data/Orit_schedule_data.json')
      .then(response => response.json())
      .then(data => {
        const activityInfo = document.getElementById('activity');
        const ul = document.createElement('ul');
  
          data.schedule.forEach(activity => {
          const li = document.createElement('li');
  
          const activitytime = document.createElement('div');
          activitytime.textContent = activity.time;
          activitytime.classList='time_text';
          const theActivity = document.createElement('div');
          theActivity.textContent = activity.the_activity;
          theActivity.classList='active_text';
  
          li.appendChild(activitytime);
          li.appendChild(theActivity);
          ul.appendChild(li);
        });
        activityInfo.appendChild(ul);
  
  
      })
      .catch(error => console.error('Error fetching data:', error));
}


function initializeForm() {
 
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  localStorage.setItem("fname", fname);
  localStorage.setItem("lname", lname);

  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("form");
  if (form) {
      form.addEventListener("submit", function(event) {
          event.preventDefault();
          initializeForm();
      });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var resultElement = document.getElementById("result");
  if (resultElement) {
      var submittedFname = localStorage.getItem("fname");
      var submittedLname = localStorage.getItem("lname");
      if (submittedFname && submittedLname) {

        var nameContainer = document.createElement('div');
          nameContainer.classList.add('name-container');

          var firstLetter = submittedFname.charAt(0).toUpperCase();
          var circle = document.createElement('div');
          circle.textContent = firstLetter;
          circle.classList.add('name-circle');

          var nameText = document.createElement('span');
          nameText.textContent = submittedFname + " " + submittedLname;
          nameText.classList.add('name-text');

          nameContainer.appendChild(circle);
          nameContainer.appendChild(nameText);

          resultElement.appendChild(nameContainer);

          localStorage.removeItem("fname");
          localStorage.removeItem("lname");
      }
  }
});

