NProgress.start();

$(document).ready(function () {
    AOS.init();

    window.addEventListener('load', function () {
        AOS.refresh();
        servicosSlider();
    });

    setTimeout(() => {
        var sectionId = localStorage.getItem('sectionId')
        if ($(sectionId).length > 0)
            goToSection(sectionId)
    }, 500);


    // header active
    $(window).on('scroll', function () {
        setHeaderScroll();
    });

    $(document.body).on('touchmove', setHeaderScroll);

    // banner slick

    $('#telefoneCelular').mask('(00) 0000-00000', {
        onKeyPress: function (value, e, field, options) {
            var masks = ['(00) 0000-00000', '(00) 0.0000-0000'];
            var mask = (value.length >= 15) ? masks[1] : masks[0];
            $(field).mask(mask, options);
            validator.element($(field))
        },
        onInvalid: function (val, e, f, invalid, options) {
            $('#telefoneCelular-error').css('display', 'block');
            $('#telefoneCelular-error').html('Letras e caracteres especiais não são válidos.')
        }
    });
    // form validation
    $.extend($.validator.messages, {
        required: "Esse campo é obrigatório.",
        email: "E-mail inválido."
    });
    let validator = $('.contato_form').validate({
        submitHandler: function (form) {
            toastr.success('Sua mensagem foi enviada com sucesso!');
            toastr.success('Aguarde nosso retorno em algumas horas.');
            $('#contactForm').trigger("reset");
        }
    });
    $('.contato_form').find('.form-control').on('blur', function () {
        $(this).val($(this).val().trim())
        if ($(this).attr('id') == 'telefoneCelular') {
            let invalid = validaTelefoneCelular($(this).val());
            if (!!(invalid)) {
                $('#telefoneCelular-error').css('display', 'block');
                $('#telefoneCelular-error').html(invalid)
            }
        }
        validator.element($(this))
    })


    $('.header__navigation-link').on('click', function () {
        let sectionId = $(this).data('sectionid');
        goToSection(sectionId)
    });
    $('.btn-scroll-top').on('click', function () {
        goToSection('#home')
    })
    $('.btn-scroll-down').on('click', function () {
        goToSection('#quem-somos')
    });
    $('.modal-close').on('click', function () {
        closeModal();
    })
    $('.modal-bg').on('click', function () {
        closeModal();
    });

    $('.galeria-item:not(.galeria-item-video)').each(function (i, el) {
        $(this).attr('data-slick', i)
    })


    $('.galeria-item:not(.galeria-item-video)').on('click', function () {
        openModal();
        let slickItem = $(this).data('slick');
        $('.modal-galeria').slick('slickGoTo', slickItem);
    });

    setClientesAnimation();
    setInterval(() => {
        setClientesAnimation();
    }, 5000);



    servicosSlider();
    bannerSlider();
    modalSlider();
    atuacaoSlider();
    dotsSlider();


    setTimeout(() => {
        NProgress.done();
        $('.loading').remove();
    }, 300);

    $(window).on('resize', function (e) {
        var size = 250 + (1500 - 250) * (($(window).width - 500) / (1920 - 500));
        $('.clientes').css({
            'transform': `scaleX(${size})`
        });
        

    servicosSlider();
    bannerSlider();
    modalSlider();
    atuacaoSlider();
    dotsSlider();
    })

});

function bannerSlider() {
    try {
        $('.banner__slider').slick('unslick');
    } catch (e) { }
    $('.banner__slider').slick({
        arrows: true,
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
}

function modalSlider() {
    try {
        $('.modal-galeria').slick('unslick');
    } catch (e) { }
    $('.modal-galeria').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        variableWidth: true,
        adaptiveHeight: true,
        speed: 600
    });
}

function atuacaoSlider() {
    try {
        $('.atuacao-slider').unbind('afterChange');
        $('.atuacao-slider').slick('unslick');
    } catch (e) {

    }
    $('.atuacao-slider').slick({
        arrows: true,
        dots: true,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        adaptiveHeight: true,
    });

    $('.atuacao-slider').on('afterChange', function (slick, current) {
            var dotAtivo = $('.atuacao-slider .slick-dots li.slick-active').offset().left;
            var dotsList = $('.atuacao-slider .slick-dots').offset().left;
            var positionList = dotAtivo - dotsList;
            $('.atuacao-slider .slick-dots').css('transform', 'translateX(-' + positionList + 'px)');
    });
}

function setSlickItemVisible(slickParent, currentSlide) {
    let prev = $(currentSlide.$slides[currentSlide.currentSlide - 1]) // prev
    let current = $(currentSlide.$slides).eq(currentSlide.currentSlide) // current
    let next = $(currentSlide.$slides).eq(currentSlide.currentSlide + 1) // next
    
    current.addClass('show')

    if ($(window).width() >= 600) {
        next.addClass('show');
        if ($(window).width() > 900)
            prev.addClass('show');
    }
   
    $(currentSlide.$slides).not(prev).not(current).not(next).removeClass('show');

    $(currentSlide.$slides).each(function (index, el) {
        if (index != currentSlide.currentSlide - 1
            && index != currentSlide.currentSlide + 1
            && index != currentSlide.currentSlide) {
        }
    });
}

function validaTelefoneCelular(val) {
    console.log(val, val.length);
    if (!val.trim()) {
        return 'Esse campo é obrigatório';
    }
    else if (val.trim() == '(') {
        return 'Esse campo é obrigatório';
    }
    else if (val.trim().length < 14) {
        return 'Telefone/Celular inválido';
    }

    return '';
}

function setHeaderScroll() {
    if (window.navigator.brave) {
        $('.header').addClass('active')
    } else {
        if ($(window).scrollTop() > 10) {
            $('.header').addClass('active')
        } else {
            $('.header').removeClass('active')
        }
    }
}

function dotsSlider() {
    $('.atuacao-slider .slick-dots li:nth-child(1) button').html('<img src="./assets/img/icon-slide-logo.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(2) button').html('<img src="./assets/img/icon-slide-metalica.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(3) button').html('<img src="./assets/img/icon-slide-tubulacao.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(4) button').html('<img src="./assets/img/icon-slide-eletrica.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(5) button').html('<img src="./assets/img/icon-slide-civil.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(6) button').html('<img src="./assets/img/icon-slide-projetos.png" />')

}

function servicosSlider() {
    try {
        $('.servicos-nav').slick('unslick');
        $('.servicos-for').slick('unslick');
    } catch (e) {

    }
    // Serviços
    $('.servicos-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        fade: true,
        asNavFor: '.servicos-nav'
    });
    $('.servicos-nav').slick({
        slidesToShow: $(window).width() > 900 ? 3 : $(window).width() < 600 ? 1 : 2,
        slidesToScroll: 1,
        asNavFor: '.servicos-for',
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 100000,
        centerMode: $(window).width() > 900,
        variableWidth: $(window).width() > 900,
    });
    $('.servicos-nav').on('init', function (slick, currentSlide) {
        setSlickItemVisible(slick, currentSlide)
    });
    $('.servicos-nav').on('afterChange', function (slick, currentSlide) {
        setSlickItemVisible(slick, currentSlide)
    });

}

function toggleHeaderNavigation() {
    if ($(window).width() <= 992) {
        $('.header').toggleClass('toggle');
    }
}

function setClientesAnimation() {
    let p = []
    $('.cliente-item[position]').each(function () {
        let position = parseInt($(this).attr('position'))
        let newPosition = position >= $('.cliente-item[position]').length - 1 ? 0 : position + 1;
        let img = $(this).find('.cliente-item-img')
        if (img.length > 0) {
            p.push(newPosition)
            setTimeout(() => {
                let next = $(`.cliente-item[position=${newPosition}]`);
                next.html(img);
            }, 300)
        }
    });
}

function closeModal() {
    $('.modal').removeClass('active')
    $('body').css('overflow', 'auto')
}

function openModal() {
    $('.modal').addClass('active')
    $('body').css('overflow', 'hidden')
}

function goToSection(sectionId) {
    if ($(sectionId).length > 0) {
        localStorage.setItem('sectionId', sectionId)
        let position = $(sectionId).offset().top;
        let newPosition = sectionId == '#atuacao' ?
            position : position - 60 < 0 ?
                0 : position - 60;
        $("html, body").stop().animate({
            scrollTop: newPosition
        }, 500);
    }
}