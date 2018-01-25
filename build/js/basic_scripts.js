jQuery.browser = {};
jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

var scroller=jQuery.browser.webkit ? "body": "html";

$.scrollbarWidth=function(){var a,b,c;if(c===undefined){a=$('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b=a.children();c=b.innerWidth()-b.height(99).innerWidth();a.remove()}return c};


/* scrollUp */
function scrollUp(block,targetBlock) {

    $(block).click(function(e){
        var target = $(targetBlock).offset().top;

        $(scroller).stop().animate({scrollTop:target},800);
        return false;

        e.preventDefault();
    });
}

function oneHeightItems(){

    function oneHeight(block, options){

        var timer = null;

        var params = {
            notebook:false,
            macBook:false,
            iPadHorizontal:false,
            iPadVertical:false,
            iPhoneHorizontal:false,
            iPhoneVertical:false,
            phoneHorizontal:false
        };

        $.extend(params, options);

        function calcOneHeight(){

            clearTimeout(timer);

            var height=0;
            $(block).removeAttr('style');

            var calcHeight = false;
            var windowWidth = $(window).width();

            if(windowWidth > 1366){
                calcHeight = true;
            }else if(windowWidth <= 1366 && windowWidth > 1280 && params.notebook == true){
                calcHeight = true;
            }else if(windowWidth <= 1280 && windowWidth > 1024 && params.macBook == true){
                calcHeight = true;
            }else if(windowWidth <= 1024 && windowWidth > 992 && params.ipadHorizontal == true){
                calcHeight = true;
            }else if(windowWidth <= 992 && windowWidth > 767 && params.ipadVertical == true){
                calcHeight = true;
            }else if(windowWidth <=767 && windowWidth > 666 && params.iPhoneHorizontal == true){
                calcHeight = true;
            }else if(windowWidth <= 666 && windowWidth > 479 && params.iPhoneVertical == true){
                calcHeight = true;
            }else if(windowWidth <= 479 && params.phoneHorizontal == true){
                calcHeight = true;
            }


            if(calcHeight == true){
                timer = setTimeout(function(){

                    $(block).each(function(index){
                        if($(this).height() > height){
                            height=$(this).height();
                        }
                    });

                    $(block).css('height', height);

                },0);
            }

        };

        calcOneHeight();

        $(window).load(function(){

            calcOneHeight();

        });

        $(window).resize(function(){

            calcOneHeight();

        });

    }
    // options:{notebook:false, macBook:false, iPadHorizontal:false, iPadVertical:false, iPhoneHorizontal:false, iPhoneVertical:false, phoneHorizontal:false}

    oneHeight('.oneHeight', {notebook:true, macBook:true});

}

/*scroll animation*/
function animationBlock(item){

    $(window).scroll(function(){
        checkForAnimate();
    });

    function checkForAnimate(){
        var bottomCheck = $(window).height()+$(window).scrollTop();
        var windowTop = $(window).scrollTop()+($(window).height()/1.5);
        item.each(function(){
           if(windowTop>$(this).offset().top || bottomCheck > $('body').height()*0.98){

              var itemSect = $(this);
              var point = 0;
              itemSect.find('.animate-it').addClass('animated');

              var timer = setInterval(function(){
                 itemSect.find('.animate-delay').eq(point).addClass('animated');
                 point++;
                 if(itemSect.find('.animate-delay').length == point){
                     clearInterval(timer);
                 }
              },200);


           }
        });
    }
    checkForAnimate();
}

/*GO TO href*/
function goTo(){
    $('.header-wrap a').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top-65;
        $("html").animate({scrollTop:target},500);
    });
}

// cut text script

function cutText(){
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function(){
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if(text.length > value && value > 0){
            var newText = text.substring(0,value) + filler;
            $(this).text(newText);
        }
    });
};

//bind example

function bindExample(){

    $(document).bind('click', bindFunc);

    function bindFunc(){

        $(document).unbind('click');

        console.log('unbinded');

        $.ajax({
            url:'ajax.php',
            method:'POST',
            success:function(){

                setTimeout(function(){
                    console.log('binded');
                    $(document).bind('click', bindFunc);
                },4000);

            }
        });
    };

}

/*header buter*/
function headeButer(menuMobile,toggleMenu){
    if(menuMobile){
        menuMobile.click(function(event) {
            if($(window).width()<1024-$.scrollbarWidth()){
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart',function (event){
            if($(window).width()<1024-$.scrollbarWidth()){
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0)
                    {
                        toggleMenu.slideUp();
                        menuMobile.removeClass('active');
                    }
            }
        });
    }
}

/* expresion for numbers with spaces */

    function numberWithSpaces(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return parts.join(".");
    }

/* /expresion for numbers with spaces */


function getTownAll() {

    $.get(URL, function (data) {

        return data;

    }).fail(function() {
        alert( "Ошибка получения данных" );
    })
}



function changeTownGloabal() {

    $(document).on('click','.city-item',function (event) {
        event.preventDefault();

        var id = parseFloat($(this).attr('data-id'));

        var townNow = $.get(URL, function (data) {

            var weNeedTown = data[id];

            MainTown = weNeedTown.name;

            MainPopulation = weNeedTown.population;

            calcSizeMarket(); //calc section 4
            changeTownGlobal(); //change global variable MainTown and MainPopulation
            checkInvestToStart();// count invest to start (sect 8)
            calcOcupnosti(); //calc section 9



        }).fail(function() {
            alert( "Ошибка получения данных" );
        })

    })

}

function changeTownGlobal() {

    var town = MainTown;

    $('#user-city').text(town);
    $('.town-change').text(town);

    $.fancybox.close();
}

/* DOCUMENT READY  */
$(document).ready(function() {

    changeTownGloabal();

    //oneHeightItems();

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
    //animationBlock($('.setion-animate'));
});

$(window).resize(function() {

    $('.footer_placeholder').height($('.footer').outerHeight());
});