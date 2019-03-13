
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