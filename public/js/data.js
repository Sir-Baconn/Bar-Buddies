$('.ui.dropdown').dropdown();

var beer1 = 'COors';
var beer2 = 'bud';
var price1 = 5.50;
var price2 = 3.40;

var ctx = document.getElementById('myChartBar').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    scaleOverride: true,

    // The data for our dataset
    data: {
        labels: [beer1, beer2],
        datasets: [{
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(200, 99, 132)', 'rgb(87,85,39)', 'rgb(12,175,156)', 'rgb(160,189,207 )', 'rgb(209,233,56)', 'rgb(248,43,148)', 'rgb(65,69,41)'],
            borderColor: ['rgb(255, 99, 132)', 'rgb(200, 99, 132)', 'rgb(87,85,39)', 'rgb(12,175,156)', 'rgb(160,189,207 )', 'rgb(209,233,56)', 'rgb(248,43,148)', 'rgb(65,69,41)'],
            data: [price1, price2],
        }]
    },

    // Configuration options go here
    options: {
        showAllTooltips: true,
        legend: {
            display: false
        },
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function(tooltipItems, data) {
                    return tooltipItems.xLabel + ' sells for: $' + tooltipItems.yLabel;
                }
            }
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'beer'
                }
            }],
            yAxes: [{
                ticks: {
                    // beginAtZero: true,
                    min: 0,
                    stepSize: 1,
                    max: 15,
                    callback: function(label, index, labels) {
                        return '$' + label;
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: 'price'
                }
            }]
        },
        title: {
            display: true,
            text: 'Bar',
            fontSize: 16
        }
    }
});

// for(var i = 0; i < chart.data.datasets[0].data.length; i++){
//     console.log(chart.data.datasets[0].data.length);
//     removeData(chart);
// }
// removeData(chart);

var newData = [10, 5];
var newLabels = ['meme', 'dream'];


function changeChart(newLabels, newData, chart){
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.labels = newLabels;
    chart.data.datasets[0].data = newData;
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

$('#barYouSelect').on('change', function() {
    
        // console.log($('#barYouSelect option:selected').text());

        var data = {
            "bar": $('#barYouSelect option:selected').text()
        };
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/data',
            success: function(data) {
                console.log('success');
                $('#barCanvas').removeAttr('hidden');
                // console.log('ajax data: ' + JSON.stringify(data));
                var sells = data.sells;
    
                console.log(sells);
                var newData = [];
                var newLabels = [];
                for(var i = 0; i < sells.length; i++){
                    newData.push(sells[i].price);
                    newLabels.push(sells[i].beer);
                }
                chart.options.title.text = $('#barYouSelect option:selected').text();
                changeChart(newLabels, newData, chart);
            },
            error: function(e) {
                console.log("error");
            }
        });
    });