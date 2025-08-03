/*!
 * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
(function ($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (
			location.pathname.replace(/^\//, "") ==
			this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var target = $(this.hash);
			target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
			if (target.length) {
				$("html, body").animate(
					{
						scrollTop: target.offset().top - 70,
					},
					1000,
					"easeInOutExpo"
				);
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$(".js-scroll-trigger").click(function () {
		$(".navbar-collapse").collapse("hide");
	});

	// Activate scrollspy to add active class to navbar items on scroll
	var scrollSpy = new bootstrap.ScrollSpy(document.body, {
		target: '#mainNav'
	})

	// Collapse Navbar
	var navbarCollapse = function () {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

window.addEventListener("DOMContentLoaded", onPageLoad);
// window.addEventListener("DOMContentLoaded", showPopup);
window.addEventListener("DOMContentLoaded", removePopupImage);

function removePopupImage() {
	const img = document.getElementsByClassName("sc-1a30cb0b-1 fmhGQz");
	console.log(img);
}

// function showPopup() {
// 	const popup = document.getElementById("popup");
// 	const closeButton = document.getElementById("close");
// 	const overlay = document.getElementById("overlay");
// 	const navButton = document.getElementById("nav-button");

// 	popup.classList.add("active");
// 	overlay.classList.add("active");
// 	navButton.disabled = true;

// 	closeButton.addEventListener("click", () => {
// 		popup.classList.remove("active");
// 		overlay.classList.remove("active");
// 		navButton.disabled = false;
// 	});
// }


async function getTeamData() {
	try {
		const URL = "https://tutor-timings.vercel.app/getDetails";

		const res = await fetch(URL, { method: "GET" });
		if (res.status != 200) {
			return null;
		}
		const data = await res.json(); // Wait for the JSON parsing
		return data;
	} catch (e) {
		console.log(e);
		return null;
	}
}

async function onPageLoad() {
	// import data from data.js
	// var teamData;
	var partnerData;
	import('./data.js').then((data) => {
	// 	teamData = data.teamData;
		partnerData = data.partnerData;	
	// 	loadImages(teamData);
		loadPartners(partnerData);
	})


	const dataContainer = document.getElementById("loading_text");
	dataContainer.textContent = "Loading...";
	document.getElementById("loading_text").hidden = false;
	const data = await getTeamData();
	if (data != null) {
		// console.log(data);
		document.getElementById("loading_text").hidden = true;
		// Display the fetched data
		loadImages(data);	
	} else {
		document.getElementById("loading_text").hidden = true;
	}
// }
	// }
}

function loadImages(data) {
	// Display team members by generating html
	function addCards(team) {
		team.forEach((member) => {
			var div = document.createElement("div");
			div.setAttribute("class", `team-card`);
			div.setAttribute("id", `${member.id}`);
			div.innerHTML = document.getElementById("teams-page-content").innerHTML;
			div.innerHTML = div.innerHTML
				.replace(/{NAME}/g, member.name)
				.replace(
					/{DIVISION}/g,
					member.position || member.division || member.team
				)
				.replace(/{LOCATION}/g, member.location);

			document.getElementById("main-card").appendChild(div);
		});
	}
	// replace HR with Human Resources
	data = data.map((m) => {
		if (m.team === "HR") {
			m.team = "Human Resources";
		}
		return m;
	});
	// display cards in order

	// remove certain people
	const remove = ["Danisha Panigrahi", "Shravani Tushar Kulkarni"]
	data = data.filter((m) => !remove.includes(m.name))
	data.map(card => {
		if (card.position == "Cohort Head" && card.cohort) {
			card.position = card.cohort + " " + card.position;
		}
	})

	var founder = data.filter(
		(m) => 
			m.position === "Founder" ||
			m.team === "Founder" ||
			m.division === "Founder"
	);
	addCards(founder);

	var CEO = data.filter(
		(m) =>
			m.position?.includes("Chief Executive Officer") ||
			m.team?.includes("Chief Executive Officer") ||
			m.division?.includes("Chief Executive Officer")
	);
	addCards(CEO);

	var CFO = data.filter(
		(m) =>
			m.position?.includes("Chief Operating Officer") ||
			m.team?.includes("Chief Operating Officer") ||
			m.division?.includes("Chief Operating Officer")
	);
	addCards(CFO);

	var HEAD_TECH_OPS = data.filter(m => m.position?.includes("Head of Technical Operations"))
	addCards(HEAD_TECH_OPS);

	var HEAD_HR = data.filter(m => m.position?.includes("Head of Human Resources"));
	addCards(HEAD_HR);

	var team_heads = data.filter(m => m.position?.includes("Head of") || m.team?.includes("Head of") || m.division?.includes("Head of"));
	addCards(team_heads);

	var admins = data.filter((m) => m.team === "Admin");
	addCards(admins);

	var HR = data.filter((m) => m.team === "Human Resources");
	addCards(HR);

	var strat = data.filter((m) => m.team === "Strategy");
	addCards(strat);

	var techOps = data.filter((m) => m.team === "Technical Operations");
	addCards(techOps);

	var otherHeads = data.filter((m) => m.position?.includes("Head"));
	addCards(otherHeads);

	// other members
	addCards(data);

	for (var i = 0; i < data.length; i++) {
		document
			.getElementById(`${data[i].id}`)
			.querySelector(".team-email").href = `mailto:${data[i].email}`;
		// checkImage(data[i]);
		document
			.getElementById(`${data[i].id}`)
			.querySelector(".team-image").src = `${data[i].image}`;
	}
}

function removeElement(element) {
	if (element != null) {
		try {
			element.parentNode.parentNode.parentNode.parentNode.remove();
		} catch (e) { }
	}
}

// Display partners by generating html
function loadPartners(partnerData) {

	partnerData.forEach((partner) => {
		var div = document.createElement("div");
		div.setAttribute("class", "partner-box");
		div.setAttribute("id", partner.id);

		// Create an anchor element
		var anchor = document.createElement("a");
		anchor.setAttribute("href", "");
		anchor.setAttribute("id", "partner-link");
		anchor.setAttribute("target", "_blank");

		// Create an img element
		if (partner.image){
			var img = document.createElement("img");
			img.setAttribute("id", "partner-img");
			img.setAttribute("src", partner.image);
			img.setAttribute("alt", partner.name);
		}
		
		// Create a div for text content
		var textDiv = document.createElement("div");

		// Create an h2 element
		var h2 = document.createElement("h2");
		h2.setAttribute("class", "partner-heading");

		// Create a span element
		var span = document.createElement("span");
		span.setAttribute("class", "highlight-orange");
		span.setAttribute("href", partner.link);
		span.textContent = partner.name; // Insert the name into the span

		// Append the span to the h2
		h2.appendChild(span);

		// Append the h2 to the text div
		textDiv.appendChild(h2);

		// Append the img to the anchor
		anchor.appendChild(img);
		anchor.appendChild(textDiv);

		// Append the anchor and text div to the div
		div.appendChild(anchor);
		document.getElementById("partner-card").appendChild(div);
	});

	for (var i = 0; i < partnerData.length; i++) {
		document
			.getElementById(`${partnerData[i].id}`)
			.querySelector("#partner-link").href = `${partnerData[i].link}`;
		document
			.getElementById(`${partnerData[i].id}`)
			.querySelector("#partner-img").src = `${partnerData[i].image}`;
	}
}

// counter animation

isInViewport = (elem) => {
	let bounding = elem.getBoundingClientRect();
	const width =
		window.innerWidth ||
		document.documentElement.clientWidth ||
		document.body.clientWidth;
	const height =
		window.innerHeight ||
		document.documentElement.clientHeight ||
		document.body.clientHeight;
	return (
		bounding.top >= 0 &&
		bounding.left >= 0 &&
		bounding.bottom <= height &&
		bounding.right <= width
	);
};

$(window).scroll(startCounter);

function startCounter() {
	document.querySelectorAll(".milestone-list").forEach(function (element) {
		if (isInViewport(element)) {
			$(window).off("scroll", startCounter);
			$(".count").each(function () {
				let $this = $(this);
				let max = $this.text();
				if (max == 0) {
					return;
				}
				if ($this.text() == "") {
					$this.text(Math.round(data.length / 10) * 10);
				}
				$this
					.prop("Counter", 0)
					.animate(
						{
							Counter: $this.text(),
						},
						{
							duration: 3000,
							easing: "swing",
							step: function () {
								$this.text(Math.floor(this.Counter));
							},
						}
					)
					.promise()
					.then(function () {
						$this.text(max);
					});
			});
		}
	});
}
