import { cardData } from "./news-cards.js?v=20261031";

$(document).ready(function() {
    function checkScreenSize() {
        if ($(window).width() < 704) {
            $('.news-container').addClass('d-none');
            $('#news-carousel').removeClass('d-none');
            $('#news-carousel').owlCarousel('refresh');
        } else {
            $('.news-container').removeClass('d-none');
            $('#news-carousel').addClass('d-none');
        }
    }

    cardData.forEach(card => {
        let sliderCardDiv = $('<div>').addClass('slider-card');
        sliderCardDiv.html(`
            <div class="news-card1">
                <div class="news-card-body text-center">
                    <img src="${card.imgSrc}" class="news-card-img">
                    <h3 class="news-heading-container" id="interactive">${card.heading}</h3>
                    <div class="news-text-container">
                        <p class="article-about medium" id="interactive-about">${card.about}</p>
                    </div>
                    <div class="button-container">
                        <a href="${card.link}" target="_blank">
                            <button class="news-button1"> Read More </button>
                        </a>
                    </div>
                </div>
            </div>
        `);
        $('#news-carousel').append(sliderCardDiv);
    });

    $('#news-carousel').owlCarousel({
        loop: true,
        responsiveClass: true,
        center: true,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        responsive: {
            0: {
                items: 1,
            },
        },
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
    });

    checkScreenSize();
    $(window).resize(checkScreenSize);
});

// Prevent autoplay when user clicks
$('#news-carousel').on('touchstart', 'img', function(e) {
    $(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
});
$('#news-carousel').on('touchend', 'img', function(e) {
    $(this).closest('.owl-carousel').trigger('play.owl.autoplay');
});
$('#news-carousel').on('click', '.owl-dots, .owl-nav', function(e) {
    $(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
    $(this).closest('.owl-carousel').trigger('play.owl.autoplay');
});