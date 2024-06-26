
window.onload = () => { 
  PrintPatientsList();
  build_the_progress();
  print_x();
  print_patient_age_for_digram();
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
        // Generate Y-axis numbers
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

    // Generate results for each month
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


document.addEventListener('DOMContentLoaded', function() {
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

          // Create and style the box
          const ageBox = document.createElement('div');
          ageBox.classList.add('age-box');
          ageBox.style.backgroundColor = colors[index];

          // Create the text element
          const ageText = document.createElement('div');
          ageText.classList.add('text-age');
          ageText.textContent = age;

          // Append the box and text to the container
          ageContainer.appendChild(ageBox);
          ageContainer.appendChild(ageText);

          // Append the container to the main parent element
          Patientage.appendChild(ageContainer);
      });
  }

  print_patient_age_for_digram();
});
