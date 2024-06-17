class Post {
    picURL;
    url;
    title;
    constructor(title, url, picURL){
        this.picURL = picURL;
        this.url = url;
        this.title = title;
    }
}

window.onload = function () {
    const featuredPosts = [
        new Post(
            "The Barons of the 21st Century",
            "https://instilt.com/2021/05/08/baronsofthe21stcentury/",
            "https://instilt.com/wp-content/uploads/2021/05/Untitled-1.png",
        ),
        new Post(
            "Your tainted is someone else’s treasure.",
            "https://instilt.com/2021/04/28/yourtaintedistreasure/",
            "https://instilt.com/wp-content/uploads/2021/04/Untitled-1.png",
        ),
        new Post(
            "Will the compulsion to become the Anti-Trump cause Biden’s demise?",
            "https://instilt.com/2021/02/10/will-the-compulsion-to-become-the-anti-trump-cause-bidens-demise/",
            "https://instilt.com/wp-content/uploads/2021/02/biden-vp-2.jpg",
        ),
    ];

    let mainDiv = document.getElementById("myCarousel");
    let indicators = document.getElementById("myCarouselIndicator");
    let inner = document.getElementById("myCarouselInner");

    featuredPosts.forEach((currentValue, index) => {
 
        let li = document.createElement("li");
        li.setAttribute("type", "button");
        li.setAttribute("data-target", "#myCarousel");
        li.setAttribute("data-slide-to", index.toString());
        if (index == 0) {
            li.setAttribute("class", "active");
            li.setAttribute("aria-current", "true");
        }
        li.setAttribute("aria-label", "Slide" + (index + 1).toString());
        indicators.appendChild(li);

        let carouselDiv = document.createElement("div");
        if (index === 0) {
            carouselDiv.classList.add("active");
        }
        carouselDiv.classList.add("carousel-item");

            let img = document.createElement("img");
            img.src = currentValue.picURL.toString();
            img.classList.add("d-block");
            img.classList.add("w-100");
            img.setAttribute("alt", currentValue.title.toString());

        carouselDiv.appendChild(img);

            let captionDiv = document.createElement("div");
            captionDiv.classList.add("carousel-caption");

                let textContainer = document.createElement("div");
                textContainer.classList.add("container");
                textContainer.classList.add("text");

                    let title = document.createElement("h1");
                    title.innerText = currentValue.title.toString();
                    title.setAttribute("style", "text-align: center; vertical-align: middle");

                    let button = document.createElement("a");
                    button.setAttribute("style", "text-align: center; vertical-align: middle");
                    button.href = currentValue.url;
                    button.target = "_blank";
                    button.classList.add("btn");
                    button.classList.add("btn-lg");
                    button.classList.add("btn-primary");

                    button.textContent = "Read Blog";

                textContainer.appendChild(title);
                textContainer.appendChild(button);

        
            captionDiv.appendChild(textContainer);
        carouselDiv.appendChild(captionDiv);

        inner.appendChild(carouselDiv);
    });
};