/*!
    * Start Bootstrap - Grayscale v6.0.3 (https://startbootstrap.com/theme/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
    */

const {google} = require("googleapis") //Adding in this line is what breaks data for team member, not sure why


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
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
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
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

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

// Team Member Data 

//Api integration
const auth = new google.auth.GoogleAuth({
    keyFile: "credential.json",

    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

//Create client instance for auth
const client = await auth.getClient();

const spreadsheetId = "1WxTEPrg-_55l6fOKrY5-kOxPsmrkIMH87RcKXWXINPY";


//Create instance of Google Sheets API
const googleSheets = google.sheets({version: "v4", auth: client});

//Get metadata about spreadsheet
const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
});

//Read rows from spreadsheet
const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1"
});

//parse data here

const parseData = getRows.data.values

function findIndexHeader(headerRow, headerName){
    
    for(let headIndex = 0; headIndex < headerRow.length; headIndex++){
        if(headerRow[headIndex].toLowerCase() == headerName){
            return headIndex
        }
    }
    return -1
}

const header = parseData[0];

const valuesContained = {
    "name": findIndexHeader(header, "name"),
    "email": findIndexHeader(header, "email"),
    "division": findIndexHeader(header, "division"),
    "team": findIndexHeader(header, "team"),
    "location": findIndexHeader(header, "location"),
    "image": findIndexHeader(header, "image")
}

var data = []

for(let i = 1; i < parseData.length; i++){

    var personObject = {}

    personObject["id"] = i
    for(var key in valuesContained){
        personObject[key] = parseData[i][valuesContained[key]]
    }
    data.push(personObject)
}

// var data = [
//     {
//         "id": 1,
//         "name": "Nilabh Agrawal",
//         "email": "nilabh@instilt.com",
//         "division": "Founder & CEO",
//         "team": "Admin",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Nilabh Agrawal.png"
//     },
//     {
//         "id": 2,
//         "name": "Amy Park",
//         "email": "amy@instilt.com",
//         "division": "Chief Program Officer",
//         "team": "Admin",
//         "location": "Las Vegas, USA",
//         "image": "assets/img/team/Amy Park.png"
//     },
//     {
//         "id": 3,
//         "name": "Haresh Wedanayake",
//         "email": "haresh@instilt.com",
//         "division": "Chief Operating Officer",
//         "team": "Admin",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Haresh Wedanayake.png"
//     },
//     {
//         "id": 4,
//         "name": "Riya Garg",
//         "email": "riya@instilt.com",
//         "division": "Chief Marketing Officer",
//         "team": "Admin",
//         "location": "Singapore",
//         "image": "assets/img/team/Riya Garg.png"
//     },
//     {
//         "id": 5,
//         "name": "Ayush Ravichandran",
//         "email": "ayush@instilt.com",
//         "division": "Head of Technical Operations",
//         "team": "Admin",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Ayush Ravichandran.png"
//     },
//     {
//         "id": 6,
//         "name": "Theaswanth Ganesh",
//         "email": "theaswanth@instilt.com",
//         "division": "Head of Project Development",
//         "team": "Admin",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Theaswanth Ganesh.png"
//     },
//     {
//         "id": 7,
//         "name": "Tanush Das",
//         "email": "tanush@instilt.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Dubai, UAE",
//         "image": "assets/img/team/Tanush Das.png"
//     },
//     {
//         "id": 8,
//         "name": "Paloosha Sheikh",
//         "email": "sheikhpaloosha1@gmail.com",
//         "division": "Social Media & Cohort Head",
//         "team": "Social Media",
//         "location": "Srinagar, India",
//         "image": "assets/img/team/Paloosha Sheikh.png"
//     },
//     {
//         "id": 9,
//         "name": "Roohee Urs",
//         "email": "rohee.urs@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Mysore, India",
//         "image": "assets/img/team/Roohee Urs.png"
//     },
//     {
//         "id": 10,
//         "name": "Ben Turner",
//         "email": "ben.turner0987@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Oxford, UK",
//         "image": "assets/img/team/Ben Turner.png"
//     },
//     {
//         "id": 11,
//         "name": "Nandini Joshi",
//         "email": "nandini.joshi04@gmail.com",
//         "division": "Head of Human Resources",
//         "team": "Admin",
//         "location": "Muscat, Oman",
//         "image": "assets/img/team/Nandini Joshi.png"
//     },
//     {
//         "id": 12,
//         "name": "Priyanka Karamchandani",
//         "email": "khushikaramchandani@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Dubai, UAE",
//         "image": "assets/img/team/Priyanka Karamchandani.png"
//     },
//     {
//         "id": 13,
//         "name": "Mansi Agrawal",
//         "email": "agrawamansi@gmail.com",
//         "division": "Strategy",
//         "team": "Strategy",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Mansi Agrawal.png"
//     },
//     {
//         "id": 14,
//         "name": "YanXi Chen",
//         "email": "yan@instilt.com",
//         "division": "Human Resources",
//         "team": "Human Resources",
//         "location": "Wirral, UK",
//         "image": "assets/img/team/YanXi Chen.png"
//     },
//     {
//         "id": 15,
//         "name": "Arshia Singha",
//         "email": "sbgs.arshia.singha@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Arshia Singha.png"
//     },
//     {
//         "id": 16,
//         "name": "Abeer Shaikh",
//         "email": "shaikhabeer03@gmail.com",
//         "division": "Strategy",
//         "team": "Strategy",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Abeer Shaikh.png"
//     },
//     {
//         "id": 17,
//         "name": "Anirudh Agarwal",
//         "email": "itsanirudh98@gmail.com",
//         "division": "Strategy",
//         "team": "Strategy",
//         "location": "Noida, India",
//         "image": "assets/img/team/Anirudh Agarwal.png"
//     },
//     {
//         "id": 18,
//         "name": "Sanjana Mahesh",
//         "email": "sanjumahesh2411@gmail.com",
//         "division": "Partnerships & Project Manager",
//         "team": "Partnerships",
//         "location": "Singapore",
//         "image": "assets/img/team/Sanjana Mahesh.png"
//     },
//     {
//         "id": 19,
//         "name": "Kruthya Ratnayake",
//         "email": "kruthya@outlook.com",
//         "division": "Tutor & Project Manager",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Kruthya Ratnayake.png"
//     },
//     {
//         "id": 20,
//         "name": "Yashasvi Gupta",
//         "email": "yashasvi.gupta@outlook.in",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Lucknow, India",
//         "image": "assets/img/team/Yashasvi Gupta.png"
//     },
//     {
//         "id": 21,
//         "name": "Renuk Basnayake",
//         "email": "renukbas@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Renuk Basnayake.png"
//     },
//     {
//         "id": 22,
//         "name": "Rosemary Ibe",
//         "email": "rosemaryibe18@gmail.com",
//         "division": "Strategy",
//         "team": "Strategy",
//         "location": "Lagos, Nigeria",
//         "image": "assets/img/team/Rosemary Ibe.png"
//     },
//     {
//         "id": 23,
//         "name": "Aarush Panda",
//         "email": "aarushp@gmail.com",
//         "division": "Social Media & Cohort Head",
//         "team": "Social Media",
//         "location": "Livemore, USA",
//         "image": "assets/img/team/Aarush Panda.png"
//     },
//     {
//         "id": 24,
//         "name": "Anamitra Phukon",
//         "email": "anamitra.p2@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Guwahati, India",
//         "image": "assets/img/team/Anamitra Phukon.png"
//     },
//     {
//         "id": 25,
//         "name": "Aarya Kumar",
//         "email": "aaryakk1289@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Pune, India",
//         "image": "assets/img/team/Aarya Kumar.png"
//     },
//     {
//         "id": 26,
//         "name": "Vishaka Subramaniam",
//         "email": "wish032005@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Vishaka Subramaniam.png"
//     },
//     {
//         "id": 27,
//         "name": "Kumudha Triveedhi",
//         "email": "ktiriveedhi1@abaoman.org",
//         "division": "Tutor",
//         "team": "Academics",
//         "location": "Muscat, Oman",
//         "image": "assets/img/team/Kumudha Triveedhi.png"
//     },
//     {
//         "id": 28,
//         "name": "Sanju Malika",
//         "email": "sanjubeautyvlogs@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Coimbatore, India",
//         "image": "assets/img/team/Sanju Malika.png"
//     },
//     {
//         "id": 29,
//         "name": "Tvadhanya Badruka",
//         "email": "tvadhanyabadruka@gmail.com",
//         "division": "Academics & Content Lead",
//         "team": "Academics",
//         "location": "Hyderabad, India",
//         "image": "assets/img/team/Tvadhanya Badruka.png"
//     },
//     {
//         "id": 30,
//         "name": "Sophia Bagnes",
//         "email": "sbtfbagnes@gmail.com",
//         "division": "Academics & Content Lead",
//         "team": "Academics",
//         "location": "Iriga, Philippines",
//         "image": "assets/img/team/Sophia Bagnes.png"
//     },
//     {
//         "id": 31,
//         "name": "Rithvik Singh",
//         "email": "singhrithvik2016@gmail.com",
//         "division": "Tutor & Content Lead",
//         "team": "Tutor",
//         "location": "Sharjah, UAE",
//         "image": "assets/img/team/Rithvik Singh.png"
//     },
//     {
//         "id": 32,
//         "name": "Shaurya Sarma",
//         "email": "shaurya.sarma@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "New Jersey, USA",
//         "image": "assets/img/team/Shaurya Sarma.png"
//     },
//     {
//         "id": 33,
//         "name": "Vanya Agarwal",
//         "email": "vanya@ajcast.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Vanya Agarwal.png"
//     },
//     {
//         "id": 34,
//         "name": "Simran Hakim",
//         "email": "simran.hakim@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Simran Hakim.png"
//     },
//     {
//         "id": 35,
//         "name": "Madhurima Nayak",
//         "email": "connectwithmadhurima@gmail.com",
//         "division": "Head of Communications",
//         "team": "Admin",
//         "location": "Navi Mumbai, India",
//         "image": "assets/img/team/Madhurima Nayak.png"
//     },
//     {
//         "id": 36,
//         "name": "Tanvi Garg",
//         "email": "gargselene@gmail.com",
//         "division": "Academics & Project Manager",
//         "team": "Academics",
//         "location": "Agra, India",
//         "image": "assets/img/team/Tanvi Garg.png"
//     },
//     {
//         "id": 37,
//         "name": "Rucha Shah",
//         "email": "ruchas2005@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Rucha Shah.png"
//     },
//     {
//         "id": 38,
//         "name": "Devmini Wimalasena",
//         "email": "devminiqueend@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Devmini Wimalasena.png"
//     },
//     {
//         "id": 39,
//         "name": "Amrita Anbuchezhian",
//         "email": "amritaanbu05@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Singapore",
//         "image": "assets/img/team/Amrita Anbuchezhian.png"
//     },
//     {
//         "id": 40,
//         "name": "Steven Kadavil",
//         "email": "stevens20142021@yahoo.com",
//         "division": "Digital Marketing",
//         "team": "Social Media",
//         "location": "Philadelphia, USA",
//         "image": "assets/img/team/Steven Kadavil.png"
//     },
//     {
//         "id": 41,
//         "name": "Ruth Sunil Thomas",
//         "email": "ruthsunil9966@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Doha, Qatar",
//         "image": "assets/img/team/Ruth Sunil Thomas.png"
//     },
//     {
//         "id": 42,
//         "name": "Divyanshi Gupta",
//         "email": "divyanshi2004@gmail.com",
//         "division": "Communications & Cohort Head",
//         "team": "Communications",
//         "location": "Dubai, UAE",
//         "image": "assets/img/team/Divyanshi Gupta.png"
//     },
//     {
//         "id": 43,
//         "name": "Nubin Chung",
//         "email": "nuboutnubin@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Seoul, South Korea",
//         "image": "assets/img/team/Nubin Chung.png"
//     },
//     {
//         "id": 44,
//         "name": "Hashim Ishfaq",
//         "email": "hashimishfaq134@hotmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Dubai, UAE",
//         "image": "assets/img/team/Hashim Ishfaq.png"
//     },
//     {
//         "id": 45,
//         "name": "Marija Nikolic",
//         "email": "marijamashanikolic@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Belgrade, Serbia",
//         "image": "assets/img/team/Marija Nikolic.png"
//     },
//     {
//         "id": 46,
//         "name": "Shevani Ranawana",
//         "email": "suhelaran86@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Shevani Ranawana.png"
//     },
//     {
//         "id": 47,
//         "name": "Coco Zhang",
//         "email": "coco.401828@nv.ccsd.net",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Las Vegas, USA",
//         "image": "assets/img/team/Coco Zhang.png"
//     },
//     {
//         "id": 48,
//         "name": "Sahana Ramachandran",
//         "email": "sahanarama89@gmail.com",
//         "division": "Communications & Project Manager",
//         "team": "Communications",
//         "location": "Navi Mumbai, India",
//         "image": "assets/img/team/Sahana Ramachandran.png"
//     },
//     {
//         "id": 49,
//         "name": "Kavini Ralapanawe",
//         "email": "kavinitr17@gmail.com",
//         "division": "Finance",
//         "team": "Finance",
//         "location": "Yerevan, Armenia",
//         "image": "assets/img/team/Kavini Ralapanawe.png"
//     },
//     {
//         "id": 50,
//         "name": "Insha Pervez",
//         "email": "inshapervez07@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Ajmer, India",
//         "image": "assets/img/team/Insha Pervez.png"
//     },
//     {
//         "id": 51,
//         "name": "Hashani Abeygunawardene",
//         "email": "hashabey3@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Hashani Abeygunawardene.png"
//     },
//     {
//         "id": 52,
//         "name": "Abhimanyu Singhal",
//         "email": "abhimanyusinghal11@icloud.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Ghaziabad, India",
//         "image": "assets/img/team/Abhimanyu Singhal.png"
//     },
//     {
//         "id": 53,
//         "name": "Navraj Choudhary",
//         "email": "sach8in@yahoo.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Sydney, Australia",
//         "image": "assets/img/team/Navraj Choudhary.png"
//     },
//     {
//         "id": 54,
//         "name": "Ntombikhona Manyifolo",
//         "email": "ntombikhona.manyifolo@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Cape Town, South Africa",
//         "image": "assets/img/team/Ntombikhona Manyifolo.png"
//     },
//     {
//         "id": 55,
//         "name": "Hanin Shamsheer",
//         "email": "haninshamsheer@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Doha, Qatar",
//         "image": "assets/img/team/Hanin Shamsheer.png"
//     },
//     {
//         "id": 56,
//         "name": "Ayuushi Gunetilleke",
//         "email": "ayuushig@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Ayuushi Gunetilleke.png"
//     },
//     {
//         "id": 57,
//         "name": "Harishi Fernando",
//         "email": "harshisudharafernando@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Harishi Fernando.png"
//     },
//     {
//         "id": 58,
//         "name": "Shruti Singh",
//         "email": "shrutisinghkg@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Shruti Singh.png"
//     },
//     {
//         "id": 59,
//         "name": "Divyanshi Mohanty",
//         "email": "divyanshimohanty4@gmail.com",
//         "division": "Social Media & Cohort Head",
//         "team": "Social Media",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Divyanshi Mohanty.png"
//     },
//     {
//         "id": 60,
//         "name": "Lavanya Pasi",
//         "email": "lavanyapasi88@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "New Delhi, India",
//         "image": "assets/img/team/Lavanya Pasi.png"
//     },
//     {
//         "id": 61,
//         "name": "Tanmay Shintre",
//         "email": "tanmayshintrewadhwani@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Pune, India",
//         "image": "assets/img/team/Tanmay Shintre.png"
//     },
//     {
//         "id": 62,
//         "name": "Shravani Tushar Kulkarni",
//         "email": "shravani@instilt.com",
//         "division": "Human Resources",
//         "team": "Human Resources",
//         "location": "Ahmedabad, India",
//         "image": "assets/img/team/Shravani Tushar Kulkarni.png"
//     },
//     {
//         "id": 63,
//         "name": "Haripriya Saravanan",
//         "email": "haripriyasaravanan012@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Chennai, India",
//         "image": "assets/img/team/Haripriya Saravanan.png"
//     },
//     {
//         "id": 64,
//         "name": "Priya Ramani",
//         "email": "priya15.ramani@gmail.com",
//         "division": "Communications & Cohort Head",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Priya Ramani.png"
//     },
//     {
//         "id": 65,
//         "name": "Diya Singh Chauhan",
//         "email": "diyasinghchauhan@gmail.com",
//         "division": "Human Resources & Content Lead",
//         "team": "Human Resources",
//         "location": "Melbourne, Australia",
//         "image": "assets/img/team/Diya Singh Chauhan.png"
//     },
//     {
//         "id": 66,
//         "name": "Saumika Pandey",
//         "email": "pandeysaumika@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Thane, India",
//         "image": "assets/img/team/Saumika Pandey.png"
//     },
//     {
//         "id": 67,
//         "name": "Sanjana Menon",
//         "email": "future2402@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Sanjana Menon.png"
//     },
//     {
//         "id": 68,
//         "name": "Manasvini Balaji",
//         "email": "manasvinibalaji@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Dubai, UAE",
//         "image": "assets/img/team/Manasvini Balaji.png"
//     },
//     {
//         "id": 69,
//         "name": "Shresth Agarwal",
//         "email": "shresth.agarwal@oberoi-is.net",
//         "division": "Academics & Content Lead",
//         "team": "Academics",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Shresth Agarwal.png"
//     },
//     {
//         "id": 70,
//         "name": "Ria Goel",
//         "email": "riagoel2501@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Jaipur, India",
//         "image": "assets/img/team/Ria Goel.png"
//     },
//     {
//         "id": 71,
//         "name": "Nisha Kumar",
//         "email": "24nisha2004@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Indore, India",
//         "image": "assets/img/team/Nisha Kumar.png"
//     },
//     {
//         "id": 72,
//         "name": "Dhriti Shah",
//         "email": "dhriti.r2004@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Coimbatore, India",
//         "image": "assets/img/team/Dhriti Shah.png"
//     },
//     {
//         "id": 73,
//         "name": "Anvi Shah",
//         "email": "anvishah1704@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Chennai, India",
//         "image": "assets/img/team/Anvi Shah.png"
//     },
//     {
//         "id": 74,
//         "name": "Neelima Sharma",
//         "email": "editor.neelima@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "New Delhi, India",
//         "image": "assets/img/team/Neelima Sharma.png"
//     },
//     {
//         "id": 75,
//         "name": "Aaralynn Thomas",
//         "email": "aaralynn89@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Canada",
//         "image": "assets/img/team/Aaralynn Thomas.png"
//     },
//     {
//         "id": 76,
//         "name": "Maithili Pungaliya",
//         "email": "maithilipungaliya2605@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Pune, India",
//         "image": "assets/img/team/Maithili Pungaliya.png"
//     },
//     {
//         "id": 77,
//         "name": "Vinicius Penido Coutinho",
//         "email": "viniciuspenidocoutinho@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Brazil",
//         "image": "assets/img/team/Vinicius Penido Coutinho.png"
//     },
//     {
//         "id": 78,
//         "name": "Anouk Leshan Gunaratne",
//         "email": "anoukguna@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Anouk Leshan Gunaratne.png"
//     },
//     {
//         "id": 79,
//         "name": "Aseel Mohamedosman",
//         "email": "aseelosman22@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Doha, Qatar",
//         "image": "assets/img/team/Aseel Mohamedosman.png"
//     },
//     {
//         "id": 80,
//         "name": "Akhila Herath",
//         "email": "akhilahasit@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Akhila Herath.png"
//     },
//     {
//         "id": 81,
//         "name": "Leo Barrientos Gutierrez",
//         "email": "leobar22@bergen.org",
//         "division": "Scouting",
//         "team": "Social Media",
//         "location": "Fort Lee, USA",
//         "image": "assets/img/team/Leo Barrientos Gutierrez.png"
//     },
//     {
//         "id": 82,
//         "name": "Nitya Bomma",
//         "email": "nityabomma@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Hyderabad, India",
//         "image": "assets/img/team/Nitya Bomma.png"
//     },
//     {
//         "id": 83,
//         "name": "Samaarah Wijewardene",
//         "email": "samaarahwijewardene@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Samaarah Wijewardene.png"
//     },
//     {
//         "id": 84,
//         "name": "Andrew Spearing",
//         "email": "andrew.spearing@uconn.edu",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "Boston, USA",
//         "image": "assets/img/team/Andrew Spearing.png"
//     },
//     {
//         "id": 85,
//         "name": "Mason Hartlage",
//         "email": "mason.ipad3@icloud.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Louisville, USA",
//         "image": "assets/img/team/Mason Hartlage.png"
//     },
//     {
//         "id": 86,
//         "name": "Srinithi Mohan",
//         "email": "mohannith95@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Hradec Kralove, Czech Republic",
//         "image": "assets/img/team/Srinithi Mohan.png"
//     },
//     {
//         "id": 87,
//         "name": "Tanisha Banerjee",
//         "email": "banerjeetb3@gmail.com",
//         "division": "Human Resources",
//         "team": "Human Resources",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Tanisha Banerjee.png"
//     },
//     {
//         "id": 88,
//         "name": "Mahek Srivastava",
//         "email": "mahek4@icloud.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Hradec Kralove, Czech Republic",
//         "image": "assets/img/team/Mahek Srivastava.png"
//     },
//     {
//         "id": 89,
//         "name": "Claire Nguyen",
//         "email": "clairenuen@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Garden Grove, USA",
//         "image": "assets/img/team/Claire Nguyen.png"
//     },
//     {
//         "id": 90,
//         "name": "Sanket Sharma",
//         "email": "sharmasanketa899@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Kathmandu, Nepal",
//         "image": "assets/img/team/Sanket Sharma.png"
//     },
//     {
//         "id": 91,
//         "name": "Marasel Perry",
//         "email": "p.marasel@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "New York, USA",
//         "image": "assets/img/team/Marasel Perry.png"
//     },
//     {
//         "id": 92,
//         "name": "Anwesha Maiti",
//         "email": "maitianwesha16@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Anwesha Maiti.png"
//     },
//     {
//         "id": 93,
//         "name": "Vinugi De Silva",
//         "email": "vinugidesilva@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Vinugi De Silva.png"
//     },
//     {
//         "id": 94,
//         "name": "Soraya Kumara",
//         "email": "sorayakumara@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Soraya Kumara.png"
//     },
//     {
//         "id": 95,
//         "name": "Kehara Edirisinghe",
//         "email": "kehara.edirisinghe@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Kehara Edirisinghe.png"
//     },
//     {
//         "id": 96,
//         "name": "Devishka Chandrasekera",
//         "email": "devishka2003@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Devishka Chandrasekera.png"
//     },
//     {
//         "id": 97,
//         "name": "Sumaiya Sultana",
//         "email": "sumaiyasultanax@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Dhaka, Bangladesh",
//         "image": "assets/img/team/Sumaiya Sultana.png"
//     },
//     {
//         "id": 98,
//         "name": "Pooja Goel",
//         "email": "hawy397@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Gurgaon, India",
//         "image": "assets/img/team/Pooja Goel.png"
//     },
//     {
//         "id": 99,
//         "name": "Binudi Benjamin",
//         "email": "binudibenjamin8@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Binudi Benjamin.png"
//     },
//     {
//         "id": 100,
//         "name": "Payel Bora",
//         "email": "payelbora2710@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Kamrup Metropolitan, India",
//         "image": "assets/img/team/Payel Bora.png"
//     },
//     {
//         "id": 101,
//         "name": "Kujana Hewagama",
//         "email": "kujana2004@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Kujana Hewagama.png"
//     },
//     {
//         "id": 102,
//         "name": "Thimasha Perera",
//         "email": "thimashasenaliperera@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Thimasha Perera.png"
//     },
//     {
//         "id": 103,
//         "name": "Ishita Walia",
//         "email": "ishita.walia2005@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Ghaziabad, India",
//         "image": "assets/img/team/Ishita Walia.png"
//     },
//     {
//         "id": 104,
//         "name": "Ruelle Sittampalam",
//         "email": "ruellesittampalam@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Ruelle Sittampalam.png"
//     },
//     {
//         "id": 105,
//         "name": "Amaani Miskin",
//         "email": "amani.miskin@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Amaani Miskin.png"
//     },
//     {
//         "id": 106,
//         "name": "Masa Dutta",
//         "email": "ranoniitb@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Masa Dutta.png"
//     },
//     {
//         "id": 107,
//         "name": "Buvaneshka Chandrasekera",
//         "email": "buvaneshka376@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Buvaneshka Chandrasekera.png"
//     },
//     {
//         "id": 108,
//         "name": "Veenaaz Vaid",
//         "email": "veenaazv@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Veenaaz Vaid.png"
//     },
//     {
//         "id": 109,
//         "name": "Annie Elizabeth Binesh",
//         "email": "anniebinesh@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Chennai, India",
//         "image": "assets/img/team/Annie Elizabeth Binesh.png"
//     },
//     {
//         "id": 110,
//         "name": "Archit Sinha",
//         "email": "architsinha8@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Gautam Buddh Nagar, India",
//         "image": "assets/img/team/Archit Sinha.png"
//     },
//     {
//         "id": 111,
//         "name": "Neha Menon",
//         "email": "neha.menon.2005@gmail.com",
//         "division": "Digital Marketing",
//         "team": "Social Media",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Neha Menon.png"
//     },
//     {
//         "id": 112,
//         "name": "Nidhi Iyer",
//         "email": "nidhiyer0402@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Nidhi Iyer.png"
//     },
//     {
//         "id": 113,
//         "name": "Gayatri Ashutosh Konjalwar",
//         "email": "gakonjalwar198@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Gayatri Ashutosh Konjalwar.png"
//     },
//     {
//         "id": 114,
//         "name": "Atheena Anil",
//         "email": "atheenaanil2005@gmail.com",
//         "division": "Communications & Cohort Head",
//         "team": "Communications",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Atheena Anil.png"
//     },
//     {
//         "id": 115,
//         "name": "Frank Liu",
//         "email": "frankl0217@icloud.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Tampa, USA",
//         "image": "assets/img/team/Frank Liu.png"
//     },
//     {
//         "id": 116,
//         "name": "Gabriel Sianipar",
//         "email": "gabrielbarita@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Jakarta, Indonesia",
//         "image": "assets/img/team/Gabriel Sianipar.png"
//     },
//     {
//         "id": 117,
//         "name": "Yadavi Bhatia",
//         "email": "paribhatia2006@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Yadavi Bhatia.png"
//     },
//     {
//         "id": 118,
//         "name": "Israh Muhseen",
//         "email": "israh.m@icloud.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Israh Muhseen.png"
//     },
//     {
//         "id": 119,
//         "name": "Ramayana Jaiswal",
//         "email": "ramayanajaiswal@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Ramayana Jaiswal.png"
//     },
//     {
//         "id": 120,
//         "name": "Rustam Singh Tomer",
//         "email": "rustamstomer@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Meerut, India",
//         "image": "assets/img/team/Rustam Singh Tomer.png"
//     },
//     {
//         "id": 121,
//         "name": "Vatsala Singh",
//         "email": "singhvatsala123@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Lucknow, India",
//         "image": "assets/img/team/Vatsala Singh.png"
//     },
//     {
//         "id": 122,
//         "name": "Adrija Jana",
//         "email": "adrijajana.live@gmail.com",
//         "division": "Communications & Cohort Head",
//         "team": "Communications",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Adrija Jana.png"
//     },
//     {
//         "id": 123,
//         "name": "Syed Ehab Haider",
//         "email": "ehabhaider18@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Wah Cantonment, Pakistan",
//         "image": "assets/img/team/Syed Ehab Haider.png"
//     },
//     {
//         "id": 124,
//         "name": "Aanya Mishra",
//         "email": "aanyamishra0306@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Aanya Mishra.png"
//     },
//     {
//         "id": 125,
//         "name": "Shivani Raj Urs",
//         "email": "shivani.raj.urs1105@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Shivani Raj Urs.png"
//     },
//     {
//         "id": 126,
//         "name": "Prerna Tandon",
//         "email": "prernatandon18@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Lucknow, India",
//         "image": "assets/img/team/Prerna Tandon.png"
//     },
//     {
//         "id": 127,
//         "name": "Yuvika Sehgal",
//         "email": "yuvikachess@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "New Delhi, India",
//         "image": "assets/img/team/Yuvika Sehgal.png"
//     },
//     {
//         "id": 128,
//         "name": "Rhea Joseph",
//         "email": "rheajoe33@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Rhea Joseph.png"
//     },
//     {
//         "id": 129,
//         "name": "Nicole Sy",
//         "email": "nicsy102@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Manilla, Philippines",
//         "image": "assets/img/team/Nicole Sy.png"
//     },
//     {
//         "id": 130,
//         "name": "Ann Mascarenhas",
//         "email": "annmasc3@gmail.com",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "Troy, USA",
//         "image": "assets/img/team/Ann Mascarenhas.png"
//     },
//     {
//         "id": 131,
//         "name": "Valoumi Sedani",
//         "email": "sedanivaloumi@gmail.com",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Valoumi Sedani.png"
//     },
//     {
//         "id": 132,
//         "name": "Saloni Dwivedi",
//         "email": "salonid.s1508@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Indore, India",
//         "image": "assets/img/team/Saloni Dwivedi.png"
//     },
//     {
//         "id": 133,
//         "name": "Archie McNeill",
//         "email": "archie.mcnll@gmail.com",
//         "division": "Head of Partnerships",
//         "team": "Admin",
//         "location": "Oxford, UK",
//         "image": "assets/img/team/Archie McNeill.png"
//     },
//     {
//         "id": 134,
//         "name": "Jia Dodeja",
//         "email": "jiadodeja@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "New Jersey, USA",
//         "image": "assets/img/team/Jia Dodeja.png"
//     },
//     {
//         "id": 135,
//         "name": "Maithreyi Murali Manohar",
//         "email": "maithreyi.murali.manohar@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Lewis Center, USA",
//         "image": "assets/img/team/Maithreyi Murali Manohar.png"
//     },
//     {
//         "id": 136,
//         "name": "Hongqing Feng",
//         "email": "hxngfeng@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Las Vegas, USA",
//         "image": "assets/img/team/Hongqing Feng.png"
//     },
//     {
//         "id": 137,
//         "name": "Ritesh Manjunathan",
//         "email": "ritesh.blore@gmail.com",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "London, UK",
//         "image": "assets/img/team/Ritesh Manjunathan.png"
//     },
//     {
//         "id": 138,
//         "name": "Sehan Dineth Udugama",
//         "email": "dinethudugama1@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Sehan Dineth Udugama.png"
//     },
//     {
//         "id": 139,
//         "name": "Ruthsha Deb",
//         "email": "ruthshadeb@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Fremont, United States",
//         "image": "assets/img/team/Ruthsha Deb.png"
//     },
//     {
//         "id": 140,
//         "name": "Iryna Iziumska",
//         "email": "iryna@instilt.com",
//         "division": "Human Resources",
//         "team": "Human Resources",
//         "location": "San Jose, United States",
//         "image": "assets/img/team/Iryna Iziumska.png"
//     },
//     {
//         "id": 141,
//         "name": "Jai Ansh Singh Bindra",
//         "email": "jaianshofficial26@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "New Delhi, India",
//         "image": "assets/img/team/Jai Ansh Singh Bindra.png"
//     },
//     {
//         "id": 142,
//         "name": "Sarah Muhammad Aamir",
//         "email": "sarah.muhammad.aamir@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Karachi, Pakistan",
//         "image": "assets/img/team/Sarah Muhammad Aamir.png"
//     },
//     {
//         "id": 143,
//         "name": "Kieran Clare",
//         "email": "kieraneamesroberts@gmail.com",
//         "division": "Strategy",
//         "team": "Strategy",
//         "location": "Manchester, UK",
//         "image": "assets/img/team/Kieran Clare.png"
//     },
//     {
//         "id": 144,
//         "name": "Amon Kipkogei Kurgat",
//         "email": "amonlatimo101@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Kenya",
//         "image": "assets/img/team/Amon Kipkogei Kurgat.png"
//     },
//     {
//         "id": 145,
//         "name": "Vinayika Goel",
//         "email": "vinayikagoel@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Ghaziabad, India",
//         "image": "assets/img/team/Vinayika Goel.png"
//     },
//     {
//         "id": 146,
//         "name": "Tanav Dhawan",
//         "email": "tanavdhawan1@gmail.com",
//         "division": "Head of Finance",
//         "team": "Admin",
//         "location": "New Delhi, India",
//         "image": "assets/img/team/Tanav Dhawan.png"
//     },
//     {
//         "id": 147,
//         "name": "Kaavya Dasgupta",
//         "email": "dasgupta.kaavya@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Bangalore, India",
//         "image": "assets/img/team/Kaavya Dasgupta.png"
//     },
//     {
//         "id": 148,
//         "name": "Anvika Shukla",
//         "email": "anvikashukla00@gmail.com",
//         "division": "Digital Marketing",
//         "team": "Social Media",
//         "location": "Rewa, India",
//         "image": "assets/img/team/Anvika Shukla.png"
//     },
//     {
//         "id": 149,
//         "name": "Yelizaveta Halauniova",
//         "email": "wldchlx@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Gomel, Belarus",
//         "image": "assets/img/team/Yelizaveta Halauniova.png"
//     },
//     {
//         "id": 150,
//         "name": "Arwa Khan",
//         "email": "arwaisreadytolearn@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Illinois, USA",
//         "image": "assets/img/team/Arwa Khan.png"
//     },
//     {
//         "id": 151,
//         "name": "Aarya Munot",
//         "email": "munotaarya@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Aarya Munot.png"
//     },
//     {
//         "id": 152,
//         "name": "Radha K",
//         "email": "worldofalexisxoxo@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Hyderabad, India",
//         "image": "assets/img/team/Radha K.png"
//     },
//     {
//         "id": 153,
//         "name": "Gia Chandni",
//         "email": "giachandni@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Mumbai, India",
//         "image": "assets/img/team/Gia Chandni.png"
//     },
//     {
//         "id": 154,
//         "name": "Raqeeba Makhdoomi",
//         "email": "raqeebamakhdoomib@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Srinagar, India",
//         "image": "assets/img/team/Raqeeba Makhdoomi.png"
//     },
//     {
//         "id": 155,
//         "name": "Chevi Amanda Christina Fernando",
//         "email": "chevi.ac.fernando@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Colombo, Sri Lanka",
//         "image": "assets/img/team/Chevi Amanda Christina Fernando.png"
//     },
//     {
//         "id": 156,
//         "name": "Sajid Fahmid",
//         "email": "sfahmid25@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Houston, USA",
//         "image": "assets/img/team/Sajid Fahmid.png"
//     },
//     {
//         "id": 157,
//         "name": "Sneha Sinha",
//         "email": "snehamehtasinha@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Bohpal, India",
//         "image": "assets/img/team/Sneha Sinha.png"
//     },
//     {
//         "id": 158,
//         "name": "Deeksha Bachu",
//         "email": "bachu.deeksha@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Hyderabad, India",
//         "image": "assets/img/team/Deeksha Bachu.png"
//     },
//     {
//         "id": 159,
//         "name": "Damia Arya",
//         "email": "damiaarya@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "East Delhi, India",
//         "image": "assets/img/team/Damia Arya.png"
//     },
//     {
//         "id": 160,
//         "name": "Nihira Joshi",
//         "email": "nihirajoshi08@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Nashik, India",
//         "image": "assets/img/team/Nihira Joshi.png"
//     },
//     {
//         "id": 161,
//         "name": "Ojas Fernandes",
//         "email": "ojas0604@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Pune, India",
//         "image": "assets/img/team/Ojas Fernandes.png"
//     },
//     {
//         "id": 162,
//         "name": "Mohamed Ibrahim Mashhour",
//         "email": "mohamedi.mashhour1@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Cairo, Egypt",
//         "image": "assets/img/team/Mohamed Ibrahim Mashhour.png"
//     },
//     {
//         "id": 163,
//         "name": "Varsha Viswapriyan",
//         "email": "varsha.viswapriyan@outlook.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Louisiana, USA",
//         "image": "assets/img/team/Varsha Viswapriyan.png"
//     },
//     {
//         "id": 164,
//         "name": "Bhavika Shekar",
//         "email": "bhavikashekar@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Frisco, USA",
//         "image": "assets/img/team/Bhavika Shekar.png"
//     },
//     {
//         "id": 165,
//         "name": "Varun Viswapriyan",
//         "email": "manjula.viswapriyan@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "USA",
//         "image": "assets/img/team/Varun Viswapriyan.png"
//     },
//     {
//         "id": 166,
//         "name": "Dishita Swaika",
//         "email": "dishita.swaika@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Bangalore Urban, India",
//         "image": "assets/img/team/Dishita Swaika.png"
//     },
//     {
//         "id": 167,
//         "name": "Ishika Gupta",
//         "email": "guptaishika035@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Kolkata, India",
//         "image": "assets/img/team/Ishika Gupta.png"
//     },
//     {
//         "id": 168,
//         "name": "Suha",
//         "email": "reachstg007@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Coimbatore, India",
//         "image": "assets/img/team/Suha.png"
//     },
//     {
//         "id": 169,
//         "name": "Rama Ismael",
//         "email": "lialiisa4@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Sidon, Lebanon",
//         "image": "assets/img/team/Rama Ismael.png"
//     },
//     {
//         "id": 170,
//         "name": "Sreejit Dey",
//         "email": "dey.sreejit19@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Hooghly, India",
//         "image": "assets/img/team/Sreejit Dey.png"
//     },
//     {
//         "id": 171,
//         "name": "Vaibhavi Bhat",
//         "email": "vaibhavibhat2808@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Bangalore Urban, India",
//         "image": "assets/img/team/Vaibhavi Bhat.png"
//     },
//     {
//         "id": 172,
//         "name": "Keya Mehta",
//         "email": "mehtakeya22@gmail.com",
//         "division": "Tutor",
//         "team": "Tutor",
//         "location": "Muscat, Oman",
//         "image": "assets/img/team/Keya Mehta.png"
//     },
//     {
//         "id": 173,
//         "name": "Shaurya Mahajan",
//         "email": "shauryam182@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Chandigarh, India",
//         "image": "assets/img/team/Shaurya Mahajan.png"
//     },
//     {
//         "id": 174,
//         "name": "Rayan Ghosh",
//         "email": "theglasstable2007@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "California, USA",
//         "image": "assets/img/team/Rayan Ghosh.png"
//     },
//     {
//         "id": 175,
//         "name": "Jyoti Saini",
//         "email": "jyotssaini777@gmail.com",
//         "division": "Finance",
//         "team": "Finance",
//         "location": "Bangalore Urban, India",
//         "image": "assets/img/team/Jyoti Saini.png"
//     },
//     {
//         "id": 176,
//         "name": "Tanvi Garg",
//         "email": "garg.tanvi.st@gmail.com",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "California, USA",
//         "image": "assets/img/team/Tanvi Garg.png"
//     },
//     {
//         "id": 177,
//         "name": "Phillip Cao",
//         "email": "phillipcao1234@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "California, USA",
//         "image": "assets/img/team/Phillip Cao.png"
//     },
//     {
//         "id": 178,
//         "name": "Nistha G",
//         "email": "lilac13lavender@gmail.com",
//         "division": "Communications",
//         "team": "Communications",
//         "location": "Goalpara, India",
//         "image": "assets/img/team/Nistha G.png"
//     },
//     {
//         "id": 179,
//         "name": "Deepthy Ajith K",
//         "email": "deepthyajithk07@gmail.com",
//         "division": "Technical Operations",
//         "team": "Technical Operations",
//         "location": "Thrissur, India",
//         "image": "assets/img/team/Deepthy Ajith K.png"
//     },
//     {
//         "id": 180,
//         "name": "Aryan Kumar",
//         "email": "aryank1401@gmail.com",
//         "division": "Academics",
//         "team": "Academics",
//         "location": "Hyderabad, India",
//         "image": "assets/img/team/Aryan Kumar.png"
//     },
//     {
//         "id": 181,
//         "name": "Vaishnavi Muchukota",
//         "email": "vaishnavvvii@gmail.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "California, USA",
//         "image": "assets/img/team/Vaishnavi Muchukota.png"
//     },
//     {
//         "id": 182,
//         "name": "Danisha Panigrahi",
//         "email": "danishap15@gmail.com",
//         "division": "Human Resources",
//         "team": "Human Resources",
//         "location": "California, USA",
//         "image": "assets/img/team/Danisha Panigrahi.png"
//     },
//     {
//         "id": 183,
//         "name": "Florence Wang",
//         "email": "florencewang624@gmail.com",
//         "division": "Partnerships",
//         "team": "Partnerships",
//         "location": "California, USA",
//         "image": "assets/img/team/Florence Wang.png"
//     },
//     {
//         "id": 184,
//         "name": "Suha Farook",
//         "email": "suha_farook@outlook.com",
//         "division": "Social Media",
//         "team": "Social Media",
//         "location": "Columbo, Sri Lanka",
//         "image": "assets/img/team/Suha Farook.png"
//     }
// ]
// Display team members by generating html


function addCards(team){
    team.forEach((member) => {
        var div = document.createElement("div");
        div.setAttribute('class', `team-card`);
        div.setAttribute('id', `${member.id}`);
        div.innerHTML = document.getElementById("teams-page-content").innerHTML;

        div.innerHTML = div.innerHTML
            .replace(/{NAME}/g, member.name)
            .replace(/{DIVISION}/g,  member.division)
            .replace(/{LOCATION}/g,  member.location)

        document.getElementById("main-card").appendChild(div);
    });
}

// display admins
var admins = data.filter(m => m.team === "Admin")
addCards(admins)

var HR = data.filter(m => m.team === "Human Resources")
addCards(HR)

var strat = data.filter(m => m.team === "Strategy")
addCards(strat)

var strategy_member_count = strat.length;

var managers = [
    "Haresh Wedanayake",
    "Riya Garg",
    "Ayush Ravichandran",
    "Theaswanth Ganesh",
    "Sanjana Mahesh",
    "Priyanka Karamchandani",
    "Agrim Gulaty",
    "Divyanshi Mohanty",
    "Kruthya Ratnayake",
    "Priya Ramani",
    "Yashasvi Gupta"
]
var batch_managers = data.filter(m => managers.includes(m.name))
addCards(batch_managers)

// other members
addCards(data)

var strategy_member_count = strat.length;

function checkImage(member){
    const img = new Image();
    img.src = member.image;

    if (!img.complete) {
        if (member.team === "Strategy"){
            strategy_member_count -= 1;

        }
    }
}


for(var i = 0; i < data.length; i++) {
    document.getElementById(`${data[i].id}`).querySelector(".team-email").href =  `mailto:${data[i].email}`;
    // checkImage(data[i]);
    document.getElementById(`${data[i].id}`).querySelector(".team-image").src = `${data[i].image}`;
}
//
// document.addEventListener("DOMContentLoaded", (event) => {
//     if (strategy_member_count === 0) {
//         document.getElementById("strategy-text").remove()
//     }
// })


function removeElement(element) {
    if (element != null) {
        try {
            element.parentNode.parentNode.parentNode.parentNode.remove();
        }
        catch (e){

        }
    }
}

var partnerData = [
    {
        "id": 1,
        "name": "Asha For Education",
        "link": "https://ashanet.org/",
        "image": "assets/img/partners/AFE.png"
    },
    {
        "id": 2,
        "name": "SOS Children's Villages",
        "link": "https://www.sos-childrensvillages.org/",
        "image": "assets/img/partners/SOS.png"
    },  
    {
        "id": 3,
        "name": "Ministry of Education, Ampara",
        "link": "https://moe.gov.lk/",
        "image": "assets/img/partners/SL_MOE.png"
    },
    {
        "id": 4,
        "name": "United Under Arts",
        "link": "https://www.unitedunderarts.org/",
        "image": "assets/img/partners/UUALogo.png"
    },
    {
        "id": 5,
        "name": "Mind Stance",
        "link": "https://www.instagram.com/_mind.stance_/?hl=en",
        "image": "assets/img/partners/mindstance.png"
    },
    {
        "id": 6,
        "name": "The Online Foundation",
        "link": "https://www.instagram.com/theonlinefoundation/?hl=en",
        "image": "assets/img/partners/TOF.png"
    },
    {
        "id": 7,
        "name": "Vajira Sri Children’s Development Center",
        "link": "http://vajirasri.com/",
        "image": "assets/img/partners/Vajira_Sri.png"
    }

]


// Display partners by generating html

partnerData.forEach((partner) => {
    var div = document.createElement("div");
    div.setAttribute('class', `partner-column`);
    div.setAttribute('id', `${partner.id}`);
    div.innerHTML = document.getElementById("partner-content").innerHTML;
    
    div.innerHTML = div.innerHTML
        .replace(/{NAME}/g, partner.name)

    document.getElementById("partner-card").appendChild(div);
});


for(var i = 0; i < partnerData.length; i++) {
    document.getElementById(`${partnerData[i].id}`).querySelector("#partner-link").href =  `${partnerData[i].link}`;
    document.getElementById(`${partnerData[i].id}`).querySelector("#partner-img").src = `${partnerData[i].image}`;
}

// counter animation

isInViewport = (elem) => {
    let bounding = elem.getBoundingClientRect();
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (height) &&
        bounding.right <= (width)
    );
};

$(window).scroll(startCounter);

function startCounter() {

    document.querySelectorAll(".milestone-list").forEach(function(element){
        if (isInViewport(element)) {
            $(window).off("scroll", startCounter);
            $('.count').each(function () {
                let $this = $(this);
                let max = $this.text();
                if (max == 0){
                    return;
                }
                if ($this.text() == "") {
                    $this.text(Math.round(data.length / 10) * 10)
                }
                $this.prop('Counter',0).animate({
                    Counter: $this.text()
                }, {
                    duration: 6500,
                    easing: 'swing',
                    step: function () {
                        $this.text(Math.floor(this.Counter));
                    },
                })
                .promise().then(function () {
                    $this.text(max);
                });
            });
        }
    })

}
