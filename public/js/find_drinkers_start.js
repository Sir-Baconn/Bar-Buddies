$('.ui.dropdown').dropdown();
$('#stateYouSelect').on('change', function() {

    console.log($('#stateYouSelect option:selected').text());

    var data = {
        "state": $('#stateYouSelect option:selected').text(),
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/find_drinkers_start',
        success: function(data) {
            console.log('success');
            console.log('ajax data: ' + JSON.stringify(data));
            var drinkersHere = data.drinkers;

            var drinkerList = $("#drinkerYouSelect");
            drinkerList.find("option:gt(0)").remove();

            drinkerList.find('option:eq(0)').attr('value', ' ');
            drinkerList.find('option:eq(0)').text('Select Drinker');

            // var drinkerList = $('#friendYouSelect');
            // drinkerList.find("option:gt(0)").remove();

            // drinkerList.find('option:eq(0)').attr('value', '');
            // drinkerList.find('option:eq(0)').text('Select Drinker');

            for (var i = 0; i < drinkersHere.length; i++) {
                $('<option/>').val(drinkersHere[i].name).html(drinkersHere[i].name).appendTo('#drinkerYouSelect');
            }

            for (var i = 0; i < drinkersHere.length; i++) {
                $('<option/>').val(drinkersHere[i].name).html(drinkersHere[i].name).appendTo('#drinkerYouSelect2');
            }
        },
        error: function(e) {
            console.log("error");
        }
    });
});

$('#drinkerYouSelect').on('change', function() {
    
        console.log($('#drinkerYouSelect option:selected').text());
    
        var data = {
            "drinker": $('#drinkerYouSelect option:selected').text(),
        };
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/find_drinkers_start',
            success: function(data) {
                console.log('success');
            },
            error: function(e) {
                console.log("error");
            }
        });
    });