$(document).ajaxStart(function(){
    $("#loading").modal({
        show: true,
        backdrop: 'static',
        keyboard: false
    });
});


$(document).ajaxStop(function(){
    $("#loading").modal('hide');
});




