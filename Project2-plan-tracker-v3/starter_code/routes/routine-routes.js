 //Get Character Form
 document.getElementById("getButton").onclick = function(event){
    axios.get('http://localhost:3000/api/data')
      .then(response => {
          // console.log('Response from the API is: ', response.data);
          
          // The following lane hides the form to create a new character when we are updating one
          document.getElementById("character-form").style.display = "none";
          document.getElementById("updateForm").style.display = "block";
          console.log('the response is: ', response.routines)
          printTheChart(response.routines);
      })
      .catch( error => {
        console.log(error);
      });
      const printTheChart = (stockData => {
        const stockLabels = stockData.map( element => element.calories);
        const stockPrice  = stockData.map( element => element.session);
        const ctx         = document.getElementById('myChart').getContext('2d');
        const chart       = new Chart(ctx, {
          type: 'line',
          data: {
            labels: stockLabels,
            datasets: [{
              label: "Stock Chart",
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: stockPrice,
            }]
          }
        });
    });
}