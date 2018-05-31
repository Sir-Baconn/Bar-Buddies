$(document).ready(function() {
    // Call Geo Complete
    console.log('we runnin');
    $("#address").geocomplete({
        details: "form#property",
        country: 'US'
    });

    $('#phone').mask('(999) 999-9999');
});