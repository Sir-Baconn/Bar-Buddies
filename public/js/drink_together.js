// $('.ui.form').form({ onChange: submitForm });

$('.ui.dropdown').dropdown();
$('#drinkerYouSelect').on('change', function() {

    console.log($('#drinkerYouSelect option:selected').text());

    var data = {
        "drinker": $('#drinkerYouSelect option:selected').text()
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/drink_together',
        success: function(data) {
            console.log('success');
            // console.log('ajax data: ' + JSON.stringify(data));
            var barsHere = data.bars;
            var drinkersHere = data.drinkers;
            var drinkersFreq = data.freqDrinkers;

            var barList = $("#barYouSelect");
            barList.find("option:gt(0)").remove();

            barList.find('option:eq(0)').attr('value', ' ');
            barList.find('option:eq(0)').text('Select Bar');

            // var drinkerList = $('#friendYouSelect');
            // drinkerList.find("option:gt(0)").remove();

            // drinkerList.find('option:eq(0)').attr('value', '');
            // drinkerList.find('option:eq(0)').text('Select Drinker');

            for (var i = 0; i < barsHere.length; i++) {
                $('<option/>').val(barsHere[i].name).html(barsHere[i].name).appendTo('#barYouSelect');
            }

            for (var i = 0; i < drinkersHere.length; i++) {
                $('<option/>').val(drinkersHere[i].name).html(drinkersHere[i].name).appendTo('#friendYouSelect');
            }

            for (var i = 0; i < drinkersFreq.length; i++) {
                $('<option/>').val(drinkersFreq[i].drinker).html(drinkersFreq[i].drinker).appendTo('#freqFriendYouSelect');
            }
        },
        error: function(e) {
            console.log("error");
        }
    });
});