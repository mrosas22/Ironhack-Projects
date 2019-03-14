//Hide Form after submit
// document.getElementById('routine-button').onclick = function(event){
//   document.getElementById('routine-form').style.display = "none";
// }

const routineInfo  = axios.create({
  baseURL: 'http://localhost:3000/api/',
}); 
 
//Get Data Form API =====> http://localhost:3000/api/data
document.getElementById("getButton").onclick = function(event){
  routineInfo.get('data')
    .then(response => {
        // The following lane hides the form to create a new character when we are updating one
        document.getElementById('routine-form').style.display = 'none';
        document.getElementById('routine-chart').style.display = 'block';
        printTheChart(response.data);
    })
    .catch( error => {
      console.log(error);
    });
    const printTheChart = (routineData => {
      // instead in the console, show data in the browser using JS DOM manipulation:

      const sessions  = routineData.map( element => element.session);
      const calories  = routineData.map( element => element.calories);
      const ctx         = document.getElementById('routine-chart').getContext('2d');
      const chart       = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: sessions,
          datasets: [{
            label: "Progress Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: calories,
          }]
        }
      });
  });
}
















//================Send Updates to API ========================
// const theCalories = document.getElementsByClassName("the-calories");
// const theWater    = document.getElementsByClassName("the-water");
// const theSleep    = document.getElementsByClassName("the-sleep");
// const theExercise = document.getElementsByClassName("the-exercise");
// document.getElementById("routine-form").onsubmit = function(event) {
//   event.preventDefault();
 
//   const routineInfo = {
//     calories : theCalories[0].value,
//     water    : theWater[0].value,
//     sleep    : theSleep[0].value,
//     exercise : theExercise[0].value
//   };
 
//    axios.post('http://localhost:3000/api/data', routineInfo)
//      .then(response => {
//          const { calories, water, sleep, exercise } = response.data;
//          const newRoutineHtml = `
//          <li>
//            <p> Calories: ${calories} </p>
//            <p> Water: ${water} </p>
//            <p> Sleep: ${sleep} </p>
//            <p> Exercise: ${exercise} </p>
//          </li>
//          `;
//          document.getElementById("characters-list").innerHTML += newRoutineHtml;
//         // Clear the form after submitting:
//         document.getElementById("routine-form").reset();
// })
//      .catch(error => {
//          console.log("Error is: ", error);
//      })
// }