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
    $('#telefoneCelular').mask('(00) 0000-00000', {
        onKeyPress: function(value, e, field, options) {
            var masks = ['(00) 0000-00000', '(00) 0.0000-0000'];
            var mask = (value.length>=15) ? masks[1] : masks[0];
            $(field).mask(mask, options);
        }
    });
    // form validation
    $.extend($.validator.messages, {
        required: "Esse campo é obrigatório.",
        email: "E-mail inválido."
    });
    let validator = $('.contato_form').validate({
        submitHandler: function(form) {

        }
    });
    $('.contato_form').find('.form-control').on('blur', function() {
        validator.element($(this))
    })

    // button scroll down
    $('.btn-scrow-down').on('click', function() {

    })

    // button scroll top



});
