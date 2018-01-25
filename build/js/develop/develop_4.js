
function calcOcupnosti(){


    var invest = investToStart || 0;
    $('#calculator_ocup_invest_zapusk').attr('data-number',invest);
    $('#calculator_ocup_invest_zapusk').text(invest);

    var dogovorOfMonth = parseFloat($('#calculator_ocup_col_dogovorov').val());

    var viruchka = dogovorOfMonth * 90000;

    $('#calculator_ocup_viruchka').attr('data-number', viruchka);
    $('#calculator_ocup_viruchka').text( numberWithSpaces(viruchka) );

    var vozvratInvest = +( invest / (dogovorOfMonth*90000*0.5) ).toFixed(0);

    $('#calculator_ocup_summa_all').attr('data-number', vozvratInvest);
    $('#calculator_ocup_summa_all').text( numberWithSpaces(vozvratInvest) );

    if (vozvratInvest == 1){
        $('.calculator_ocup_summa_all_word').text('месяц')
    }else if (vozvratInvest > 1 && vozvratInvest < 5){
        $('.calculator_ocup_summa_all_word').text('месяцa')
    }else{
        $('.calculator_ocup_summa_all_word').text('месяцев')
    }

}

function section5Slider(){
    $('.army-help-slider .slider').slick({
        dots: true,
        prevArrow:'<button type="button" class="slick-prev"></button>',
        nextArrow:'<button type="button" class="slick-next"></button>'
    });
}

function fancyboxTownChange(){
    $('.town-change-popup').fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade',
        autoResize:true,
        wrapCSS:'fancybox-town-change-popup',
        'closeBtn' : true,
        fitToView:true,
        padding:'0',
        afterClose:function () {
            $('#searchInput').val("");
        }
    })
}

function searchField() {

    var newMassive = [];

    $.get(URL, function (data) {

        for(var i in data){

            var obj = {
                "id":i,
                "name":data[i]['name'],
                "population":data[i]['population']
            };
            newMassive.push(obj);

        }

    });

    var options = {
        data:newMassive,

        getValue:"name",
        placeholder: "Bаш город",

        list: {
            match: {
                enabled: true
            },
            onShowListEvent: function() {
                $('.text-on-noresults').removeClass('active');
            },
            onHideListEvent: function() {
                if ( $('#searchInput:focus') && $('#searchInput').val().length ){
                    $('.text-on-noresults').addClass('active');
                }

            }
        },
        template: {
            type: "custom",
            method: function(value, item) {
                    return '<a href="#" data-id="'+item.id+'" class="city-item city-prime">'+item.name+'</a>';
            }
        }
    };

    $('#searchInput').easyAutocomplete(options);
}


function checkInvestToStart() {
    var populat = MainPopulation;

    if (populat <= 300000){
        investToStart = 520000;
    }
    if (300000 < populat && populat < 800000){
        investToStart = 850000;
    }
    if (populat > 800000 ){
        investToStart = 1230000;
    }

    if (MainTown == 'Москва'){
        investToStart = 1800000
    }
    if (MainTown == 'Санкт-Петербург'){
        investToStart = 1490000
    }

    $('.check_invest_to_start_bottom_title span').text(investToStart);

}


$(document).ready(function(){

    searchField();

    fancyboxTownChange();
    section5Slider();

    $('.select').styler({
        onSelectClosed:function(){
            calcOcupnosti()
        }
    });
});

$(window).load(function(){

});

$(window).resize(function(){

});
