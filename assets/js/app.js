$(document).ready(function(){
    AOS.init();
    
    let headerHeight = $('.header').hasClass('active') ? 60 : 80;

    // header active
    $(window).on('scroll', function() {
        if($(window).scrollTop() > 10) {
            $('.header').addClass('active')
        } else {
            $('.header').removeClass('active')
        }

        headerHeight = $('.header').hasClass('active') ? 60 : 80;
    });

    // banner slick
    $('.banner__slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // button scroll down
    $('.btn-scrow-down').on('click', function() {

    })

    // button scroll top



});
