var simplemaps_worldmap_mapdata = {
    main_settings: {
        //General settings
        width: "responsive", //'700' or 'responsive'
        background_color: "#700000",
        background_transparent: "no",
        border_color: "#700000",
        popups: "on_click",

        //State defaults
        state_description: "Country description",
        state_color: "black",
        state_hover_color: "",
        state_url: "",
        border_size: "0",
        all_states_inactive: "yes",
        all_states_zoomable: "yes",

       //Location defaults
        location_description: "Location description",
        location_color: "#b8c9f2",
        location_opacity: "0.9",
        location_hover_opacity: 1,
        location_url: "",
        location_size: 25,
        location_type: 'image',
        // location_image_url: "map-pin.svg",
        location_image_url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",

        location_border_color: "#b8c9f2",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",

        //Label defaults
        label_color: "#d5ddec",
        label_hover_color: "#d5ddec",
        label_size: 22,
        label_font: "Arial",
        hide_labels: "no",

        //Zoom settings
        zoom: "yes",
        back_image: "no",
        initial_back: "no",
        initial_zoom: "-1",
        initial_zoom_solo: "no",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.5,

        //Popup settings
        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 3,
        popup_corners: 5,
        popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
        popup_nocss: "yes",

        //Advanced settings
        div: "map",
        auto_load: "yes",
        url_new_tab: "yes",
        images_directory: "default",
        fade_time: 0.1,
        link_text: "View Website",
        state_image_url: "",
        state_image_position: "",
        // location_image_url: "map-pin.svg",
        location_image_url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",

        border_hover_color: "",
        border_hover_size: "",
        manual_zoom: ""
    },
    state_specific: {
        AF: {
            name: "Afghanistan"
        },
        AO: {
            name: "Angola"
        },
        AL: {
            name: "Albania"
        },
        AE: {
            name: "United Arab Emirates"
        },
        AR: {
            name: "Argentina"
        },
        AM: {
            name: "Armenia"
        },
        AU: {
            name: "Australia"
        },
        AT: {
            name: "Austria"
        },
        AZ: {
            name: "Azerbaijan"
        },
        BI: {
            name: "Burundi"
        },
        BE: {
            name: "Belgium"
        },
        BJ: {
            name: "Benin"
        },
        BF: {
            name: "Burkina Faso"
        },
        BD: {
            name: "Bangladesh"
        },
        BG: {
            name: "Bulgaria"
        },
        BH: {
            name: "Bahrain"
        },
        BA: {
            name: "Bosnia and Herzegovina"
        },
        BY: {
            name: "Belarus"
        },
        BZ: {
            name: "Belize"
        },
        BO: {
            name: "Bolivia"
        },
        BR: {
            name: "Brazil"
        },
        BN: {
            name: "Brunei Darussalam"
        },
        BT: {
            name: "Bhutan"
        },
        BW: {
            name: "Botswana"
        },
        CF: {
            name: "Central African Republic"
        },
        CA: {
            name: "Canada"
        },
        CH: {
            name: "Switzerland"
        },
        CL: {
            name: "Chile"
        },
        CN: {
            name: "China"
        },
        CI: {
            name: "Côte d'Ivoire"
        },
        CM: {
            name: "Cameroon"
        },
        CD: {
            name: "Democratic Republic of the Congo"
        },
        CG: {
            name: "Republic of Congo"
        },
        CO: {
            name: "Colombia"
        },
        CR: {
            name: "Costa Rica"
        },
        CU: {
            name: "Cuba"
        },
        CZ: {
            name: "Czech Republic"
        },
        DE: {
            name: "Germany"
        },
        DJ: {
            name: "Djibouti"
        },
        DK: {
            name: "Denmark"
        },
        DO: {
            name: "Dominican Republic"
        },
        DZ: {
            name: "Algeria"
        },
        EC: {
            name: "Ecuador"
        },
        EG: {
            name: "Egypt"
        },
        ER: {
            name: "Eritrea"
        },
        EE: {
            name: "Estonia"
        },
        ET: {
            name: "Ethiopia"
        },
        FI: {
            name: "Finland"
        },
        FJ: {
            name: "Fiji"
        },
        GA: {
            name: "Gabon"
        },
        GB: {
            name: "United Kingdom"
        },
        GE: {
            name: "Georgia"
        },
        GH: {
            name: "Ghana"
        },
        GN: {
            name: "Guinea"
        },
        GM: {
            name: "The Gambia"
        },
        GW: {
            name: "Guinea-Bissau"
        },
        GQ: {
            name: "Equatorial Guinea"
        },
        GR: {
            name: "Greece"
        },
        GL: {
            name: "Greenland"
        },
        GT: {
            name: "Guatemala"
        },
        GY: {
            name: "Guyana"
        },
        HN: {
            name: "Honduras"
        },
        HR: {
            name: "Croatia"
        },
        HT: {
            name: "Haiti"
        },
        HU: {
            name: "Hungary"
        },
        ID: {
            name: "Indonesia"
        },
        SIN: {
            name: "South India"
        },
        NIN: {
            name: "North India"
        },
        IE: {
            name: "Ireland"
        },
        IR: {
            name: "Iran"
        },
        IQ: {
            name: "Iraq"
        },
        IS: {
            name: "Iceland"
        },
        IL: {
            name: "Israel"
        },
        IT: {
            name: "Italy"
        },
        JM: {
            name: "Jamaica"
        },
        JO: {
            name: "Jordan"
        },
        JP: {
            name: "Japan"
        },
        KZ: {
            name: "Kazakhstan"
        },
        KE: {
            name: "Kenya"
        },
        KG: {
            name: "Kyrgyzstan"
        },
        KH: {
            name: "Cambodia"
        },
        KR: {
            name: "Republic of Korea"
        },
        XK: {
            name: "Kosovo"
        },
        KW: {
            name: "Kuwait"
        },
        LA: {
            name: "Lao PDR"
        },
        LB: {
            name: "Lebanon"
        },
        LR: {
            name: "Liberia"
        },
        LY: {
            name: "Libya"
        },
        LK: {
            name: "Sri Lanka"
        },
        LS: {
            name: "Lesotho"
        },
        LT: {
            name: "Lithuania"
        },
        LU: {
            name: "Luxembourg"
        },
        LV: {
            name: "Latvia"
        },
        MA: {
            name: "Morocco"
        },
        MD: {
            name: "Moldova"
        },
        MG: {
            name: "Madagascar"
        },
        MX: {
            name: "Mexico"
        },
        MK: {
            name: "Macedonia"
        },
        ML: {
            name: "Mali"
        },
        MM: {
            name: "Myanmar"
        },
        ME: {
            name: "Montenegro"
        },
        MN: {
            name: "Mongolia"
        },
        MZ: {
            name: "Mozambique"
        },
        MR: {
            name: "Mauritania"
        },
        MW: {
            name: "Malawi"
        },
        MY: {
            name: "Malaysia"
        },
        NA: {
            name: "Namibia"
        },
        NE: {
            name: "Niger"
        },
        NG: {
            name: "Nigeria"
        },
        NI: {
            name: "Nicaragua"
        },
        NL: {
            name: "Netherlands"
        },
        NO: {
            name: "Norway"
        },
        NP: {
            name: "Nepal"
        },
        NZ: {
            name: "New Zealand"
        },
        OM: {
            name: "Oman"
        },
        PK: {
            name: "Pakistan"
        },
        PA: {
            name: "Panama"
        },
        PE: {
            name: "Peru"
        },
        PH: {
            name: "Philippines"
        },
        PG: {
            name: "Papua New Guinea"
        },
        PL: {
            name: "Poland"
        },
        KP: {
            name: "Dem. Rep. Korea"
        },
        PT: {
            name: "Portugal"
        },
        PY: {
            name: "Paraguay"
        },
        PS: {
            name: "Palestine"
        },
        QA: {
            name: "Qatar"
        },
        RO: {
            name: "Romania"
        },
        RU: {
            name: "Russia"
        },
        RW: {
            name: "Rwanda"
        },
        EH: {
            name: "Western Sahara"
        },
        SA: {
            name: "Saudi Arabia"
        },
        SD: {
            name: "Sudan"
        },
        SS: {
            name: "South Sudan"
        },
        SN: {
            name: "Senegal"
        },
        SL: {
            name: "Sierra Leone"
        },
        SV: {
            name: "El Salvador"
        },
        RS: {
            name: "Serbia"
        },
        SR: {
            name: "Suriname"
        },
        SK: {
            name: "Slovakia"
        },
        SI: {
            name: "Slovenia"
        },
        SE: {
            name: "Sweden"
        },
        SZ: {
            name: "Swaziland"
        },
        SY: {
            name: "Syria"
        },
        TD: {
            name: "Chad"
        },
        TG: {
            name: "Togo"
        },
        TH: {
            name: "Thailand"
        },
        TJ: {
            name: "Tajikistan"
        },
        TM: {
            name: "Turkmenistan"
        },
        TL: {
            name: "Timor-Leste"
        },
        TN: {
            name: "Tunisia"
        },
        TR: {
            name: "Turkey"
        },
        TW: {
            name: "Taiwan"
        },
        TZ: {
            name: "Tanzania"
        },
        UG: {
            name: "Uganda"
        },
        UA: {
            name: "Ukraine"
        },
        UY: {
            name: "Uruguay"
        },
        US: {
            name: "United States"
        },
        UZ: {
            name: "Uzbekistan"
        },
        VE: {
            name: "Venezuela"
        },
        VN: {
            name: "Vietnam"
        },
        VU: {
            name: "Vanuatu"
        },
        YE: {
            name: "Yemen"
        },
        ZA: {
            name: "South Africa"
        },
        ZM: {
            name: "Zambia"
        },
        ZW: {
            name: "Zimbabwe"
        },
        SO: {
            name: "Somalia"
        },
        GF: {
            name: "France"
        },
        FR: {
            name: "France"
        },
        ES: {
            name: "Spain"
        },
        AW: {
            name: "Aruba"
        },
        AI: {
            name: "Anguilla"
        },
        AD: {
            name: "Andorra"
        },
        AG: {
            name: "Antigua and Barbuda"
        },
        BS: {
            name: "Bahamas"
        },
        BM: {
            name: "Bermuda"
        },
        BB: {
            name: "Barbados"
        },
        KM: {
            name: "Comoros"
        },
        CV: {
            name: "Cape Verde"
        },
        KY: {
            name: "Cayman Islands"
        },
        DM: {
            name: "Dominica"
        },
        FK: {
            name: "Falkland Islands"
        },
        FO: {
            name: "Faeroe Islands"
        },
        GD: {
            name: "Grenada"
        },
        HK: {
            name: "Hong Kong"
        },
        KN: {
            name: "Saint Kitts and Nevis"
        },
        LC: {
            name: "Saint Lucia"
        },
        LI: {
            name: "Liechtenstein"
        },
        MF: {
            name: "Saint Martin (French)"
        },
        MV: {
            name: "Maldives"
        },
        MT: {
            name: "Malta"
        },
        MS: {
            name: "Montserrat"
        },
        MU: {
            name: "Mauritius"
        },
        NC: {
            name: "New Caledonia"
        },
        NR: {
            name: "Nauru"
        },
        PN: {
            name: "Pitcairn Islands"
        },
        PR: {
            name: "Puerto Rico"
        },
        PF: {
            name: "French Polynesia"
        },
        SG: {
            name: "Singapore"
        },
        SB: {
            name: "Solomon Islands"
        },
        ST: {
            name: "São Tomé and Principe"
        },
        SX: {
            name: "Saint Martin (Dutch)"
        },
        SC: {
            name: "Seychelles"
        },
        TC: {
            name: "Turks and Caicos Islands"
        },
        TO: {
            name: "Tonga"
        },
        TT: {
            name: "Trinidad and Tobago"
        },
        VC: {
            name: "Saint Vincent and the Grenadines"
        },
        VG: {
            name: "British Virgin Islands"
        },
        VI: {
            name: "United States Virgin Islands"
        },
        CY: {
            name: "Cyprus"
        },
        RE: {
            name: "Reunion (France)"
        },
        YT: {
            name: "Mayotte (France)"
        },
        MQ: {
            name: "Martinique (France)"
        },
        GP: {
            name: "Guadeloupe (France)"
        },
        CW: {
            name: "Curaco (Netherlands)"
        },
        IC: {
            name: "Canary Islands (Spain)"
        }
    },
    locations: {
        "0": {
            lat: "-6.135730",
            lng: "39.362122",
            name: "Zanzibar <br> Number of Students: 3",
            description: '<div class="content-container"><span class="batch-name">AFEN36</span><p>This batch included students from Senegal, Zanzibar, and Madagascar, most of whom were affiliated with Barefoot College as instructors or office staff. This batch demonstrated the scalability and adaptability of our curriculum and tutors, while also reinforcing the importance of language equity in adult education. The marked improvement in students’ comfort and confidence of the language only reaffirms our commitment to making English education accessible, inclusive, and impactful.</p></div>'
        },
        "1": {
            lat: "-19.8633617",
            lng: "46.5262506",
            name: "Madagascar <br> Number of Students: 8",
            description: '<div class="content-container"><span class="batch-name">AFEN36</span><p>This batch included students from Senegal, Zanzibar, and Madagascar, most of whom were affiliated with Barefoot College as instructors or office staff. This batch demonstrated the scalability and adaptability of our curriculum and tutors, while also reinforcing the importance of language equity in adult education. The marked improvement in students’ comfort and confidence of the language only reaffirms our commitment to making English education accessible, inclusive, and impactful. </p></div>'
        },
        "2": {
            lat: "30.0214489",
            lng: "31.4904086",
            name: "Cairo <br> Number of Students: 16",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>EGEN33</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "3": {
            lat: "15.6093419",
            lng: "-90.5600285",
            name: "Guatemala <br> Number of Students: 4",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>GTEN35</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "4": {
            lat: "30.75748767883997",
            lng: "76.8197241565849",
            name: "Chandigarh <br> Number of Students: 66",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>INEN25</p></div> </div><div><span class="batch-name"></span></div>'
            },
        "5": {
            lat: "12.872690366167038",
            lng: "77.67121939838034",
            name: "Bengaluru <br> Number of Students: 172",
            description: '<div class="content-container"><span class="batch-name">INEN04</span><p>This batch, INEN04 from Bengaluru, comprised Kannada-speaking students, with most expressing a strong desire to improve their spoken English. As a result, the program placed greater emphasis on speaking practice, leading to marked improvement in fluency and confidence. In addition to regular sessions, students participated in interactive “English Game Days” and group discussions, which provided fun, low-pressure environments to practice speaking and vocabulary. These activities played a key role in encouraging active communication and fostering a supportive learning atmosphere.</p></div> </div><div><span class="batch-name">INEN17, INEN26, INEN40</span></div>'
        },
        "6": {
            lat: "28.714817100672157",
            lng: "77.10238113358153",
            name: "Delhi <br> Number of Students: 855",
            description: '<div class="content-container"><span class="batch-name">INEN06</span><p>This batch consisted of Hindi-speaking students across four classrooms, primarily in the primary and middle school age groups. Over the course of the program, students showed significant improvement, particularly in reading and writing skills, and became notably more comfortable speaking English. In addition to regular lessons, students actively participated in debates, watched movies, and took part in “Just a Minute” competitions, which helped boost their confidence and language fluency in engaging, creative ways.</p></div> </div><div><span class="batch-name">Delhi: INEN08, INEN09, INEN11, INEN16, INEN18, INEN23, INEN27, INEN28, INEN32, INEN37, INEN45 <br> Bulandshahr: INEN03, INEN16, INEN23</span></div>'
        },
        "7": {
            lat: "33.35870646689087",
            lng: "74.72751256312212",
            name: "Chassana, Reasi <br> Number of Students: 24",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>INEN29</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "8": {
            lat: "22.362553698503227",
            lng: "82.70636957646961",
            name: "Korba <br> Number of Students: 91",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>INEN39</p></div></div><div><span class="batch-name"></span></div>'
        },
        "9": {
            lat: "-2.0201343718042812",
            lng: "29.915086557984797",
            name: "Rwanda <br> Number of Students: 61",
            description: ' <div class="content-container"><div class="text-content"><span class="batch-name">RWEN19:</span><p>In the 2023/2024 year, we launched our first cohort in Rwanda, marking our inaugural venture into a new continent. Partnering with the <a href="https://www.rwandagirlsinitiative.org" target="_blank">Rwanda Girls Initiative</a>, we empowered bright female students through immersive English learning and educational support, showcasing the impact of our program and the strong connections between tutors and students. </p></div><div class="image-container"><img src="assets/img/map_image/RWEN19-grad1.png" alt="Cohort Image" /></div></div><div><span class="batch-name">RWEN41</span></div>',
        },
        "10": {
            lat: "7.607365622998655",
            lng: "80.70624999705292",
            name: "Sri Lanka <br> Number of Students: 265",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>SLEN05, SLEN10, SLEN15, SLEN21</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "11": {
            lat: "13.084",
            lng: "80.283",
            name: "Chennai <br> Number of Students: 526",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>INEN02, INEN13, INEN24, INEN34</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "12": {
            lat: "14.497401",
            lng: "-14.452362",
            name: "Senegal <br> Number of Students: 2",
            description: '<div class="content-container"><span class="batch-name">AFEN36</span><p>This batch included students from Senegal, Zanzibar, and Madagascar, most of whom were affiliated with Barefoot College as instructors or office staff. This batch demonstrated the scalability and adaptability of our curriculum and tutors, while also reinforcing the importance of language equity in adult education. The marked improvement in students’ comfort and confidence of the language only reaffirms our commitment to making English education accessible, inclusive, and impactful.</p></div>'
        },
        "13": {
            lat: "26.847067388484213",
            lng: " 80.95182363358217",
            name: "Lucknow <br> Number of Students: 82",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name"></span><p>INEN43, INEN44</p></div> </div><div><span class="batch-name"></span></div>'
        },
        "14": {
            lat: "30.038374509420457",
            lng: "74.63240148965006",
            name: "Muktsar <br> Number of Students: 115",
            description: '<div class="content-container"><div class="text-content"><span class="batch-name">INEN30 & INEN42: </span><p> In July 2024, we launched a long-term partnership with <a href="https://schools.org.in/muktsar/03120201205/pseb-bibi-surinder-kaur-badal-adarsh-sen-sec-sch.html#google_vignette" target="_blank">Bibi Surinder Kaur Badal Adarsh Senior Secondary School</a>, bringing together students and teachers in the same learning space for the first time. Starting as beginners, participants progressed to an advanced English curriculum covering grammar, speaking, listening, reading, and writing. Students in our program outperformed their peers in school assessments, and strong bonds were formed through regular interaction and shared growth. The involvement of teachers was a proud milestone, and the heartfelt appreciation from learners highlighted the impact and dedication of everyone involved.</p></div><div class="image-container"><img src="assets/img/map_image/INEN30.jpg" alt="Batch Image" /></div></div><div><span class="batch-name"></span></div>'
        }
    },
    
    labels: {},
    legend: {
        entries: []
    },
    regions: {
        "0": {
            name: "North America",
            states: [
                "MX",
                "CA",
                "US",
                "GL",
                "BM"
            ]
        },
        "1": {
            name: "South America",
            states: [
                "EC",
                "AR",
                "VE",
                "BR",
                "CO",
                "BO",
                "PE",
                "BZ",
                "CL",
                "CR",
                "CU",
                "DO",
                "SV",
                "GT",
                "GY",
                "GF",
                "HN",
                "NI",
                "PA",
                "PY",
                "PR",
                "SR",
                "UY",
                "JM",
                "HT",
                "BS",
                "FK",
                "AI",
                "AG",
                "AW",
                "BB",
                "VG",
                "KY",
                "DM",
                "MQ",
                "LC",
                "VC",
                "GD",
                "GP",
                "MS",
                "TC",
                "SX",
                "MF",
                "KN",
                "CW"
            ]
        },
        "2": {
            name: "Europe",
            states: [
                "IT",
                "NL",
                "NO",
                "DK",
                "IE",
                "GB",
                "RO",
                "DE",
                "FR",
                "AL",
                "AM",
                "AT",
                "BY",
                "BE",
                "LU",
                "BG",
                "CZ",
                "EE",
                "GE",
                "GR",
                "HU",
                "IS",
                "LV",
                "LT",
                "MD",
                "PL",
                "PT",
                "RS",
                "SI",
                "HR",
                "BA",
                "ME",
                "MK",
                "SK",
                "ES",
                "FI",
                "SE",
                "CH",
                "TR",
                "CY",
                "UA",
                "XK",
                "MT",
                "FO"
            ]
        },
        "3": {
            name: "Africa and the Middle East",
            states: [
                "QA",
                "BH",
                "SA",
                "AE",
                "SY",
                "OM",
                "KW",
                "PK",
                "AZ",
                "AF",
                "IR",
                "IQ",
                "IL",
                "PS",
                "JO",
                "LB",
                "YE",
                "TJ",
                "TM",
                "UZ",
                "KG",
                "NE",
                "AO",
                "EG",
                "TN",
                "GA",
                "DZ",
                "LY",
                "CG",
                "GQ",
                "BJ",
                "BW",
                "BF",
                "BI",
                "CM",
                "CF",
                "TD",
                "CI",
                "CD",
                "DJ",
                "ET",
                "GM",
                "GH",
                "GN",
                "GW",
                "KE",
                "LS",
                "LR",
                "MG",
                "MW",
                "ML",
                "MA",
                "MR",
                "MZ",
                "NA",
                "NG",
                "ER",
                "RW",
                "SN",
                "SL",
                "SO",
                "ZA",
                "SD",
                "SS",
                "SZ",
                "TZ",
                "TG",
                "UG",
                "EH",
                "ZM",
                "ZW",
                "RE",
                "KM",
                "SC",
                "MU",
                "CV",
                "IC",
                "ST",
                "YT"
            ]
        },
        "4": {
            states: [
                "SIN"
            ],
            name: "South India"
        },
        "5": {
            states: [
                "NIN"
            ],
            name: "North India"
        },
        "6": {
            states: [
                "LK"
            ],
            name: "Sri Lanka"
        }
    }
};
