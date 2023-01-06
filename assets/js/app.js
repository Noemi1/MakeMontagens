$(document).ready(function () {
    AOS.init();

    window.addEventListener('load', function() {
        AOS.refresh();
        servicosSlick();
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

    $(document.body).on('touchmove', setHeaderScroll)

    // banner slick
    $('.banner__slider').slick({
        arrows: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    $('#telefoneCelular').mask('(00) 0000-00000', {
        onKeyPress: function (value, e, field, options) {
            var masks = ['(00) 0000-00000', '(00) 0.0000-0000'];
            var mask = (value.length >= 15) ? masks[1] : masks[0];
            $(field).mask(mask, options);
        }
    });
    // form validation
    $.extend($.validator.messages, {
        required: "Esse campo é obrigatório.",
        email: "E-mail inválido."
    });
    let validator = $('.contato_form').validate({
        submitHandler: function (form) {

        }
    });
    $('.contato_form').find('.form-control').on('blur', function () {
        validator.element($(this))
    })

    servicosSlick();

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

    $('.galeria-item').on('click', function () {
        openModal();
        $('.modal-inner').html($(this).html());
    });

    setClientesAnimation();
    setInterval(() => {
        setClientesAnimation();
    }, 2000);


    $('.atuacao-slider').slick({
        arrows: true,
        dots: true,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
    });

    $('.atuacao-slider').on('afterChange', function () {
        if ($(window).width() > 800) {
            var dotAtivo = $('.atuacao-slider .slick-dots li.slick-active').offset().left;
            var dotsList = $('.atuacao-slider .slick-dots').offset().left;

            var positionList = dotAtivo - dotsList;

            $('.atuacao-slider .slick-dots').css('transform', 'translateX(-' + positionList + 'px)');
        }
    });
    
    dotsSlider();
});

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
    $('.atuacao-slider .slick-dots li:nth-child(1) button').html('<img src="./assets/img/icon-slide-next.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(2) button').html('<img src="./assets/img/icon-slide-metalica.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(3) button').html('<img src="./assets/img/icon-slide-tubulacao.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(4) button').html('<img src="./assets/img/icon-slide-eletrica.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(5) button').html('<img src="./assets/img/icon-slide-civil.png" />')
    $('.atuacao-slider .slick-dots li:nth-child(6) button').html('<img src="./assets/img/icon-slide-projetos.png" />')
   
}

function servicosSlick() {
    try {
        
    $('.servicos-nav').slick('unslick')
    $('.servicos-for').slick('unslick')
    } catch(e) {

    }
    // Serviços
    $('.servicos-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: true,
        fade: true,
        asNavFor: '.servicos-nav'
    });

    $('.servicos-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.servicos-for',
        dots: true,
        centerMode: true,
        variableWidth: true,
        focusOnSelect: true,
        infinite: true,
        mobileFirst: true,//add this one
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    variableWidth: false,
                }
            },
        ]
    });

    // $('.btn-mobile').on('click', function(e) {
    //     e.preventDefault();
    //     console.log('oi')
    //     $('.header').toggleClass('toggle');
    // })
}

function toggleHeaderNavigation() {
    if ($(window).width() <= 768) {
        $('.header').toggleClass('toggle');
    }
}

function setClientesAnimation() {
    let clientes = $('.cliente-item[position]')
    clientes.each(function () {
        let position = parseInt($(this).attr('position'))
        let img = $(this).find('.cliente-item-img')
        if (img) {
            let newPosition = position >= 15 ? 0 : position + 1;
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