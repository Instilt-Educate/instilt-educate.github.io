$(document).ready(function(){
    // dynamically add images to the carousel
    const numberOfImages = 12;
    const imgSubs = {
        'img1': 'Presenting batch completion certificates to the accomplished students of Shri Krishna Hindu Vidhyalaya in Tamil Nadu.',
        'img2': "Students of Salaam Baalak Trust Delhi performing brilliantly at the Shakti Samman event in New Delhi, hosted by the District Magistrate's Office.",
        'img3': "Students of Salaam Baalak Trust Delhi performing brilliantly at the Shakti Samman event in New Delhi, hosted by the District Magistrate's Office.",
        'img4': "Students of Salaam Baalak Trust Delhi receiving several awards at the Shakti Samman event, celebrating International Women's Day.",
        'img5': "Students of Salaam Baalak Trust Delhi celebrating International Women's Day."
    }

    for (let i = 1; i <= numberOfImages; i++) {
        // Create the div element
        let sliderCardDiv = $('<div>').addClass('slider-card');
        // Create the inner div
        let innerDiv = $('<div>').addClass('d-flex justify-content-center align-items-center mb-4 text-nowrap');
        // Create the image element
        let imgElement = $('<img>').attr('src', 'assets/img/our_model_carousel/img' + i + '.png')
                                    .attr('alt', '#')
                                    .attr('title', i)
                                    .attr('onerror', 'this.alt="NF"');
        imgElement.on('error', function() {
            // remove the image from the carousel
            let index = $(this).attr('title');
            $(".owl-carousel").trigger('remove.owl.carousel', [index]).trigger('refresh.owl.carousel');;
        })
        if (imgElement.alt == 'NF') {
            console.log("hi")
            continue;
        }
        // Append image to inner div
        innerDiv.append(imgElement);
        // Append inner div to slider card div
        sliderCardDiv.append(innerDiv);
        if (imgSubs['img' + i]) {
            sliderCardDiv.append('<p class="small caption" id="figcaption">' + imgSubs['img' + i] + '</p>');
        }
        // Append slider card div to owl-carousel
        $('.owl-carousel').append(sliderCardDiv);
    }

    $('.owl-carousel').owlCarousel({
        loop:true,
        responsiveClass:true,
        center:true,
        nav:true,
        dots:true,
        autoplay:true,
        autoplayTimeout:3000,
        responsive:{
            0:{
                items:1,
            },
           
            992:{
                items:3,
            }
        },
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
         ],
    }) 
})

//Prevent autoplay when user clicks
$('.owl-carousel').on('touchstart', 'img', function(e) {
	$(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
});
$('.owl-carousel').on('touchend', 'img', function(e) {
	$(this).closest('.owl-carousel').trigger('play.owl.autoplay');
});
$('.owl-carousel').on('click', '.owl-dots, .owl-nav', function(e) {
	$(this).closest('.owl-carousel').trigger('stop.owl.autoplay');
	$(this).closest('.owl-carousel').trigger('play.owl.autoplay');
});