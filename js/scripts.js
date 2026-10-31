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

	// Scroll-spy: mark the nav link of the section the reader is in. The active section is the
	// last one (in page order) whose top has passed a line just below the fixed navbar.
	var spyLinks = Array.prototype.slice.call(
		document.querySelectorAll('#mainNav .navbar-nav .nav-link[href^="#"]')
	);
	var spyTargets = spyLinks
		.map(function (link) {
			return { link: link, el: document.querySelector(link.getAttribute("href")) };
		})
		.filter(function (t) {
			return t.el;
		});
	var spyLockedUntil = 0;

	function setActiveNav(activeLink) {
		spyLinks.forEach(function (link) {
			var isActive = link === activeLink;
			link.classList.toggle("active", isActive);
			if (isActive) link.setAttribute("aria-current", "true");
			else link.removeAttribute("aria-current");
		});
	}

	function updateScrollSpy() {
		// a clicked link stays active while the smooth scroll runs past other sections
		if (Date.now() < spyLockedUntil) return;
		// same 70px offset the smooth-scroll above lands on, plus some slack; independent of
		// the navbar's height, which grows when the mobile menu is open
		var line = window.scrollY + 70 + 40;
		var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
		var current = null;
		spyTargets.forEach(function (t) {
			if (t.el.getBoundingClientRect().top + window.scrollY <= line) current = t.link;
		});
		if (atBottom && spyTargets.length) current = spyTargets[spyTargets.length - 1].link;
		setActiveNav(current);
	}

	// cheap enough to run on every scroll event: a handful of rect reads
	function queueScrollSpy() {
		updateScrollSpy();
	}

	spyLinks.forEach(function (link) {
		link.addEventListener("click", function () {
			setActiveNav(link);
			spyLockedUntil = Date.now() + 1100;
			setTimeout(queueScrollSpy, 1150);
		});
	});
	window.addEventListener("scroll", queueScrollSpy, { passive: true });
	window.addEventListener("resize", queueScrollSpy);
	window.addEventListener("load", queueScrollSpy);
	updateScrollSpy();

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

// Start fetching the team as soon as the script runs, so the data is usually in before the
// reader scrolls anywhere near the section.
var teamDataPromise = getTeamData();

async function onPageLoad() {
	// import data from data.js
	var partnerData;
	import('./data.js').then((data) => {
		partnerData = data.partnerData;
		loadPartners(partnerData);
	})

	const loading = document.getElementById("loading_text");
	loading.textContent = "Loading...";
	loading.hidden = false;
	const data = await teamDataPromise;
	loading.hidden = true;
	if (data != null) {
		renderTeam(data);
	}
}

// Order the team (founder first, then leadership, then departments) and render every card in
// one go. Photos then load in the background; each card shows an initials avatar until its
// photo arrives, and keeps it if the photo never does.
function renderTeam(data) {
	const addedIds = new Set();
	const cards = [];
	const fragment = document.createDocumentFragment();
	const template = document.getElementById("teams-page-content").innerHTML;

	function addCards(team) {
		team.forEach((member) => {
			// avoid adding the same member twice
			if (addedIds.has(member.id)) return;
			addedIds.add(member.id);

			var div = document.createElement("div");
			div.setAttribute("class", "team-card");
			div.setAttribute("id", `${member.id}`);
			div.innerHTML = template;
			div.querySelector(".name").textContent = member.name;
			div.querySelector(".division").textContent =
				member.position || member.division || member.team || "";
			div.querySelector(".location").textContent = member.location || "";
			div.querySelector(".team-initials").textContent = initialsOf(member.name);
			if (member.email) div.querySelector(".team-email").href = `mailto:${member.email}`;

			fragment.appendChild(div);
			cards.push({ card: div, url: member.image });
		});
	}

	// replace HR with Human Resources
	data = data.map((m) => {
		if (m.team === "HR") {
			m.team = "Human Resources";
		}
		return m;
	});

	// remove certain people
	const remove = ["Danisha Panigrahi", "Shravani Tushar Kulkarni"]
	data = data.filter((m) => !remove.includes(m.name))
	data.forEach(card => {
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

	document.getElementById("main-card").appendChild(fragment);
	loadTeamPhotos(cards);
}

function initialsOf(name) {
	const words = (name || "").trim().split(/\s+/).filter(Boolean);
	if (!words.length) return "";
	const first = words[0][0];
	const last = words.length > 1 ? words[words.length - 1][0] : "";
	return (first + last).toUpperCase();
}

// Load photos a few at a time, in page order, without waiting for the reader to scroll.
// A photo that is missing or fails to load simply leaves the initials avatar in place.
function loadTeamPhotos(entries, concurrency = 6) {
	let next = 0;

	function loadNext() {
		if (next >= entries.length) return;
		const { card, url } = entries[next++];
		if (!url) return loadNext();

		const loader = new Image();
		loader.decoding = "async";
		loader.onload = () => {
			const target = card.querySelector(".team-image");
			target.src = url;
			target.alt = card.querySelector(".name").textContent;
			card.querySelector(".team-photo").classList.add("is-loaded");
			loadNext();
		};
		loader.onerror = loadNext;
		loader.src = url;
	}

	for (let i = 0; i < concurrency; i++) loadNext();
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
