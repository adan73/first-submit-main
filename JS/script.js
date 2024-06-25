
window.onload = () => { 
  PrintPatientsList();
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
  