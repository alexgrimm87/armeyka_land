function scrollNav(){

  $(window).scroll(function(){
    var scrolled = $(window).scrollTop();

    if(scrolled > 30){
        $('.header').addClass('active');
    }else{
        $('.header').removeClass('active');
    }

    if(scrolled >= 300) {
        $('#video_bg')[0].pause();
    } else {
        $('#video_bg')[0].play();;
    }
  });

};

function revenue(averageCheck, transactions){
  var revenueResult = averageCheck * transactions;
  $('#revenue').val(revenueResult);
};

function netProfit() {
  var revenueResult = $('#revenue').val();
  var netProfitMonthResult = revenueResult * 0.50;
  $('#net-profit-month').val( numberWithSpaces(netProfitMonthResult) );

  var netProfitResult = netProfitMonthResult * 12;
  $('#net-profit').text( numberWithSpaces(netProfitResult) );
};

function somefun() {

  var averageCheck = 90000,transactions = 12;

  $('#average-check').on('keyup', function() {
    averageCheck = $(this).val();
    revenue(averageCheck, transactions);
    netProfit();
  });

  $('#transactions').on('keyup', function() {
    transactions = $(this).val();
    revenue(averageCheck, transactions);
    netProfit();
  });
};

function calcSizeMarket() {
  var recruitsCityResult = MainPopulation * 0.0699;
  $('#recruitsCity').text( numberWithSpaces( recruitsCityResult.toFixed()) );

  var recruitsDeferredResult = MainPopulation * 0.02613;
  $('#recruitsDeferred').text( numberWithSpaces( recruitsDeferredResult.toFixed()) );

  var recruitsNineResult = 9 * 302100 / 146544710 * MainPopulation;
  $('#recruitsNine').text( numberWithSpaces( recruitsNineResult.toFixed()) );



  var tam = MainPopulation * 0.0699 * 90000;
  $('#potentialSize').text( (tam/1000000000).toFixed(3) );
  
  var sam = (recruitsCityResult-recruitsDeferredResult-recruitsNineResult)*90000;
  $('#realSize').text( (sam/1000000000).toFixed(3) );

  var som = sam*0.05;
  $('#marketShare').text( (som/1000000).toFixed() );

};


function townPopup() {
  $.fancybox.open('#select-town-pop', {
    modal: true,
    openEffect  : 'none',
    closeEffect : 'none',
    autoResize:true,
    wrapCSS:'fancybox-town-change-popup',
    'closeBtn' : true,
    fitToView:true,
    padding:'0',
    afterClose:function () {
      $('#searchInput').val("");
    }
  });    
};


var newMassive2 = [];
function getValue(array,keyText) {
  for(i=0; i<array.length; i++){
    if(array[i].name == keyText) {
        $("#user-city").text(city);
        
        var weNeedTown = array[i];

        MainTown = weNeedTown.name;

        MainPopulation = weNeedTown.population;

        calcSizeMarket(); //calc section 4
        changeTownGlobal(); //change global variable MainTown and MainPopulation
        checkInvestToStart();// count invest to start (sect 8)
        calcOcupnosti(); //calc section 9

        return false;
    } else {
      $("#user-city").text('Выберите город');
      townPopup();
      // $.fancybox.open('#not-city-popup', {
      //   openEffect  : 'none',
      //   closeEffect : 'none',
      //   autoSize:true,
      //   width : 640,
      //   height : 250,
      //   maxWidth : '100%',
      //   wrapCSS:'not-city-wrap',
      //   'closeBtn' : true,
      //   fitToView:true,
      //   padding:'0',
      //   'afterClose': function(){
      //     setTimeout(function() { 
      //        townPopup();
      //     }, 500)
      //   }
      // });

    }
  }
};


$(document).ready(function(){
  scrollNav();
  somefun();

  $('.video-overlay').on('click', function() {
    $(this).addClass('hide');
    $("#video")[0].src += "&autoplay=1";
  });
      
  // $("#preload").show();
  $.get(URL, function (data) {
    newMassive2 = [];
    for(var i in data){
      var obj = {
          "id":i,
          "name":data[i]['name'],
          "population":data[i]['population']
      };
      newMassive2.push(obj);
    }
    // setTimeout(function(){   
    //   $("#preload").hide();
    // }, 2000);
  });

  $('.business-link').fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    autoSize:true,
    width : 640,
    height : 480,
    maxWidth : '100%',
    wrapCSS:'business-wrap',
    'closeBtn' : true,
    fitToView:true,
    padding:'0',
    afterShow:function () {
      this.content.find('.jq-selectbox__dropdown ul li').each(function(){
        var liText = $(this).text();
        if(liText == MainTown) {
          $(this).addClass('selected sel');
          $(this).closest('.jq-selectbox__dropdown').prev('.jq-selectbox__select').find('.jq-selectbox__select-text').text(liText);
        } else {
          $(this).removeClass('selected sel');
        }
      });
    }
  });

  $('#city_select').styler();

});

$(window).load(function(){
  var city = ymaps.geolocation.city;
  getValue(newMassive2,city);
});

$(window).resize(function(){

});