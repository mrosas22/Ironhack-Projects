const stockInfo  = axios.create({
  baseURL: 'http://localhost:3000/api/',
}); 
 
 //Get Character Form
 document.getElementById("getButton").onclick = function(event){
  stockInfo.get('data')
    .then(response => {
        console.log('Response from the Script is: ', response.data);
        // const countryName = response.data[0].calories;
        // const countryCapital = response.data[0].water;
        // const currencyName  = response.data[0].sleep
        // The following lane hides the form to create a new character when we are updating one
        document.getElementById("character-form").style.display = "none";
        document.getElementById("updateForm").style.display = "block";
        // document.getElementById("countryName").innerHTML = "Calories: " + countryName;
        // document.getElementById("countryCapital").innerHTML = "Capital: " + countryCapital;
        // document.getElementById("currency").innerHTML = "Sleep: " + currencyName;  
        printTheChart(response.data);
    })
    .catch( error => {
      console.log(error);
    });
    const printTheChart = (stockData => {
      console.log('The response after printChart is: ', stockData)
      // instead in the console, show data in the browser using JS DOM manipulation:

      const stockLabels = stockData.map( element => element.session);
      const stockPrice  = stockData.map( element => element.calories);
      console.log('The array of calories is: ', stockPrice)
      console.log('The array of sessions is: ', stockLabels)
      const ctx         = document.getElementById('updateForm').getContext('2d');
      const chart       = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: stockLabels,
          datasets: [{
            label: "Progress Chart",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: stockPrice,
          }]
        }
      });
  });
}