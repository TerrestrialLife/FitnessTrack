console.log('Hello World!');

let option = 0;
function option1() {
  option = 1;
  if (option == 1) {
    document.getElementById('container2').style.display = "block";
    document.getElementById('container3').style.display = "none";
  }
}

function option2() {
  option = 2;
  if (option == 2) {
    document.getElementById('container2').style.display = "none";
    document.getElementById('container3').style.display = "block";
  }
}

function clear1() {
  document.getElementById('nameWorkout').value = "";
  document.getElementById('sets').value = "";
  document.getElementById('reps').value = "";
  document.getElementById('weight').value = "";
  document.getElementById('height').value = "";
  document.getElementById('result').value = "";
}

function calculate() {
  let sets = parseFloat(document.getElementById('sets').value);
  let reps = parseFloat(document.getElementById('reps').value);
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value);
  
  bmi = weight / Math.pow(height / 100, 2);
  intensity = (reps * weight) / sets;
  totalWorkout = reps * sets;
  
  document.getElementById('result').value = "BMI = " + bmi.toFixed(2) + " | Intensity = " + intensity.toFixed(2) + " | Total Workout = " + totalWorkout.toFixed(2);
}

function save() {
  let name = document.getElementById('nameWorkout').value;
  let sets = +document.getElementById('sets').value;
  let reps = +document.getElementById('reps').value;
  let weight = +document.getElementById('weight').value;

  let workoutData = {
    name, sets, reps, weight,
    totalWorkout: sets * reps,
    intensity: ((reps * weight) / sets).toFixed(2),
    date: new Date().toLocaleDateString()
  };

  let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts.push(workoutData);
  localStorage.setItem('workouts', JSON.stringify(workouts));

  displayHistory();
}

function displayHistory() {
  let historyList = document.getElementById('historyList');
  historyList.innerHTML = (JSON.parse(localStorage.getItem('workouts')) || [])
    .map((w, i) => `<div class="box1-3">📅 ${w.date} - ${w.name}-${w.sets}×${w.reps} | ${w.weight}kg | Intensity: ${w.intensity}, Total: ${w.totalWorkout}kg 
    <button id="btn6" onclick="deleteWorkout(${i})">delete</button></div>`)
    .join('');
}

function deleteWorkout(index) {
  let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  workouts.splice(index, 1);
  localStorage.setItem('workouts', JSON.stringify(workouts));
  displayHistory();
}

window.onload = displayHistory;