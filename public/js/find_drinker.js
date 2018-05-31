// var ctx = document.getElementById('myChart').getContext('2d');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'horizontalBar',

//     // The data for our dataset
//     data: {
//         labels: ["Beers", "Bars", "Days", "Night", "May", "June", "July"],
//         datasets: [{
//             backgroundColor: ['rgb(255, 99, 132)', 'rgb(200, 99, 132)', 'rgb(100, 99, 132)', 'rgb(255, 99, 255)', 'rgb(255, 0, 132)', 'rgb(255, 50, 132)', 'rgb(235, 99, 132)'],
//             borderColor: ['rgb(255, 99, 132)', 'rgb(200, 99, 132)', 'rgb(100, 99, 132)', 'rgb(255, 99, 255)', 'rgb(255, 0, 132)', 'rgb(255, 50, 132)', 'rgb(235, 99, 132)'],
//             data: [2, 10, 5, 2, 20, 30, 45],
//         }]
//     },

//     // Configuration options go here
//     options: {
//         showAllTooltips: true,
//         legend: {
//             display: false
//         },
//         tooltips: {
//             enabled: true,
//             mode: 'single',
//             callbacks: {
//                 label: function(tooltipItems, data) {
//                     return tooltipItems.yLabel + ' in Common: ' + tooltipItems.xLabel;
//                 }
//             }
//         }
//     }
// });