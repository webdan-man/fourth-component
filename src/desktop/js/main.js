//мобильное устройство?
var win_w = $(window).width();
var win_h = $(window).height();
var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
}

if (isMobile == true || win_w < 980 || win_h < 600) {
    $('.animation').addClass('animated');
    $('<style>.animation,.animation *{-webkit-transition:0s all 0s!important;transition:0s all 0s!important;-webkit-animation-duration:0s!important;animation-duration:0s!important;-webkit-animation-delay:0s!important;animation-delay:0s!important}.section .site-nav.down,.section .site-nav.up{display:none!important}section{min-height:600px!important;}</style>').appendTo('head');
}

function opisanie(elem,opis){

    var opis_gr = $(elem).closest('.opis_gr');
    var butn_gr = $(elem).closest('.butn_gr');

    if (opis) {
        opis_gr.children('.opis_p').addClass('active');
        butn_gr.children('.opis').addClass('active');
        opis_gr.children('.har_p').removeClass('active');
        butn_gr.children('.har').removeClass('active');
    }else{
        opis_gr.children('.har_p').addClass('active');
        butn_gr.children('.har').addClass('active');
        opis_gr.children('.opis_p').removeClass('active');
        butn_gr.children('.opis').removeClass('active');
    }
}
function scroll_fix(){
    var fixed_gran = $('.sec3').offset().top + $('.sec3').height() - $('.katalog').height() - 200;
   
if ($('.sec3').offset().top > $('body').scrollTop()) {
        $('.katalog').addClass('top');
        $('.katalog').removeClass('fix');
        $('.katalog').removeClass('bottom');
    }else{
        if (fixed_gran > $('body').scrollTop()) {
            $('.katalog').addClass('fix');
            $('.katalog').removeClass('top');
            $('.katalog').removeClass('bottom');
        }else{
            $('.katalog').addClass('bottom');
            $('.katalog').removeClass('top');
            $('.katalog').removeClass('fix');
        }
    }
}
var audio1 = new Audio('audio/audio1.mp3');
var audio2 = new Audio('audio/audio2.mp3');

$(window).scroll(function() {
    scroll_fix();
});

$(document).ready(function() {
    
    $('.btn_zz,.phone_fone').click(function(e) {
        e.preventDefault();
        $('#pop1').arcticmodal();
    });
    $('.close,.back').click(function() {
        $(this).parent().arcticmodal('close');
    });
$('.mouse,.kat_gr a').click(function(e){e.preventDefault();$("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top}, 500);});


$('.opis').click(function(e) {
        e.preventDefault();
        opisanie(this,'opis');
    });

$('.har').click(function(e) {
        e.preventDefault();
        opisanie(this);
    });
$('.kat_gr a').click(function(e) {
        e.preventDefault();
        $('.kat_gr a').removeClass('active');
        $(this).addClass('active');
    });

$('.sounds').hover(function(){
    $('.sounds').removeClass('active');
    $(this).addClass('active');
    });

$('.youtybe').click(function(){
    $(this).parent().html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$(this).data('video')+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
  });
$('.vid').click(function(){
    $(this).closest(".wrap").find(".video").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+$(this).data('video')+'?autoplay=1" frameborder="0" allowfullscreen></iframe>');
    $(".vid").removeClass('active');
    $(this).addClass('active');
  });

$("#audio1").mouseenter(function(){
     audio1.play();
});
$("#audio2").mouseenter(function(){
    audio2.play();
});
$("#audio1").mouseleave(function(){
     audio1.pause();
});
$("#audio2").mouseleave(function(){
     audio2.pause();
});

  function getURLParameter(name) {return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;} 
    function run_geo(geo_url){
        $.ajax({type: 'GET',url: geo_url,dataType: 'xml',
            success: function(xml) {$(xml).find('ip').each(function(){
            var city = $(this).find('city').text();
            var region = $(this).find('region').text();
            if(city!=region){var ipg = city+', '+region;}else{var ipg = city;}
            $('<input type="hidden" />').attr({name: 'location', class: 'location', value:ipg}).appendTo("form");
        });}});
    }
    $.get("http://ipinfo.io", function(response) {geo_url='http://ipgeobase.ru:7020/geo?ip='+response.ip; run_geo(geo_url);}, "jsonp");
    utm=[];$.each(["utm_source","utm_medium","utm_campaign","utm_term",'source_type','source','position_type','position','added','creative','matchtype'],function(i,v){$('<input type="hidden" />').attr({name: v, class: v, value: function(){if(getURLParameter(v) == undefined)return '-'; else return getURLParameter(v)}}).appendTo("form")});
    $('<input type="hidden" />').attr({name: 'url', value: document.location.href}).appendTo("form");
    $('<input type="hidden" />').attr({name: 'title', value: document.title}).appendTo("form");

    $('input[name="name"]').blur(function() {if($(this).val().length < 3) {$(this).addClass('error-input');}});
    $('input[name="name"]').focus(function() {$(this).removeClass('error-input');});

    $('input[name="phone"]').mask('+7 (999) 999-99-99');
    $('input[name="phone"]').blur(function() {if($(this).val().length != 18) {$(this).addClass('error-input');}});
    $('input[name="phone"]').focus(function() {$(this).removeClass('error-input');});

 $('form').submit(function(e){
        e.preventDefault();
        $(this).find('input[type="text"]').trigger('blur');
        if(!$(this).find('input[type="text"]').hasClass('error-input')&&!$(this).find('textarea').hasClass('error-input')){
            var type=$(this).attr('method');
            var url=$(this).attr('action');
            var data=$(this).serialize();
            $.ajax({type: type, url: url, data: data,
            success : function(){
                $.arcticmodal('close');$('#pop2').arcticmodal();
            }
        }); 
        }
    });


});