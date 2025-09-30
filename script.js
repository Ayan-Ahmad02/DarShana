const stepsDiv = document.getElementById('steps');
const stepIndicator = document.getElementById('step-indicator').children;

let step = 0;
let moodSelected = null;
let energyLevel = 5;
let socialLevel = 5;
let adventureLevel = 5;

const moods = [
  {emoji:"😊", label:"Happy & Excited"},
  {emoji:"😌", label:"Calm & Peaceful"},
  {emoji:"😲", label:"Curious & Explorative"},
  {emoji:"💪", label:"Energetic & Active"},
  {emoji:"🧘‍♂️", label:"Reflective & Mindful"},
  {emoji:"🎉", label:"Celebratory & Social"}
];

function renderStep() {
  // Indicator dots
  [...stepIndicator].forEach((dot, idx) => dot.className = 'dot' + (idx === step ? ' active' : ''));
  // Main display
  if(step === 0){
    stepsDiv.innerHTML = `
      <h1>AI Mood Analyzer</h1>
      <div class="subtitle">Let our AI understand your current mood to suggest perfect destinations</div>
      <h2>How are you feeling today?</h2>
      <div class="mood-options">
        ${moods.map((m, i) =>
          `<div class="mood-option${moodSelected===i?' selected':''}" onclick="selectMood(${i})">
            <span>${m.emoji}</span>
            ${m.label}
          </div>`
        ).join('')}
      </div>
      <div class="btn-row">
        <button class="btn-outline" disabled>Previous</button>
        <button class="btn"${moodSelected===null?' disabled':''} onclick="nextStep()">Next</button>
      </div>
    `;
  }
  else if(step === 1){
    let levelText = energyLevel < 3 ? "Low" : (energyLevel < 7 ? "Moderate" : "High");
    stepsDiv.innerHTML = `
      <h1>AI Mood Analyzer</h1>
      <div class="subtitle">Let our AI understand your current mood to suggest perfect destinations</div>
      <div class="step-indicator"></div>
      <div class="slider-section">
        <div class="slider-title">What's your energy level?</div>
        <div class="emoji-large">😊</div>
        <div class="slider-value">${levelText}</div>
        <input type="range" min="1" max="10" value="${energyLevel}" id="energy-slider"/>
        <div class="slider-labels">
          <span>Low</span>
          <span>High</span>
        </div>
        <div style="margin-top:10px;"><span style="color:#888;">Energy Level: ${energyLevel}/10</span></div>
      </div>
      <div class="btn-row">
        <button class="btn-outline" onclick="prevStep()">Previous</button>
        <button class="btn" onclick="nextStep()">Next</button>
      </div>
    `;
    document.getElementById('energy-slider').addEventListener("input", e=>{
      energyLevel = parseInt(e.target.value);
      renderStep();
    });
  }
  else if(step === 2){
    let levelText = socialLevel < 4 ? "Solo" : (socialLevel < 7 ? "Small Groups" : "Groups");
    stepsDiv.innerHTML = `
      <h1>AI Mood Analyzer</h1>
      <div class="subtitle">Let our AI understand your current mood to suggest perfect destinations</div>
      <div class="slider-section">
        <div class="slider-title">How social do you want to be?</div>
        <div class="emoji-large">👥</div>
        <div class="slider-value">${levelText}</div>
        <input type="range" min="1" max="10" value="${socialLevel}" id="social-slider"/>
        <div class="slider-labels">
          <span>Solo</span>
          <span>Group</span>
        </div>
        <div style="margin-top:10px;"><span style="color:#888;">Social Level: ${socialLevel}/10</span></div>
      </div>
      <div class="btn-row">
        <button class="btn-outline" onclick="prevStep()">Previous</button>
        <button class="btn" onclick="nextStep()">Next</button>
      </div>
    `;
    document.getElementById('social-slider').addEventListener("input", e=>{
      socialLevel = parseInt(e.target.value);
      renderStep();
    });
  }
  else if(step === 3){
    // Adventure slider
    let text = adventureLevel < 4 ? "Safe" : (adventureLevel < 7 ? "Mild Adventure" : "Adventurous");
    stepsDiv.innerHTML = `
      <h1>AI Mood Analyzer</h1>
      <div class="subtitle">Let our AI understand your current mood to suggest perfect destinations</div>
      <div class="slider-section">
        <div class="slider-title">How adventurous are you feeling?</div>
        <div class="emoji-large">🚶</div>
        <div class="slider-value">${text}</div>
        <input type="range" min="1" max="10" value="${adventureLevel}" id="adventure-slider"/>
        <div class="slider-labels">
          <span>Safe</span>
          <span>Adventurous</span>
        </div>
        <div style="margin-top:10px;"><span style="color:#888;">Adventure Level: ${adventureLevel}/10</span></div>
      </div>
      <div class="btn-row">
        <button class="btn-outline" onclick="prevStep()">Previous</button>
        <button class="btn" onclick="showRecommendations()">Analyze My Mood</button>
      </div>
    `;
    document.getElementById('adventure-slider').addEventListener("input", e=>{
      adventureLevel = parseInt(e.target.value);
      renderStep();
    });
  }
}

window.selectMood = function(idx){
  moodSelected = idx;
  renderStep();
}

window.nextStep = function(){
  if(step < 3) step++;
  renderStep();
}

window.prevStep = function(){
  if(step > 0) step--;
  renderStep();
}

window.showRecommendations = function(){
  [...stepIndicator].forEach((dot)=>dot.className='dot');
  stepsDiv.innerHTML = `
    <h1>Your Personalized Recommendations</h1>
    <div class="subtitle">Based on your current mood and preferences</div>
    <div class="card-recommend">
      <div class="recommend-card">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" alt="">
        <div class="rc-info">
          <div class="rc-title">Rishikesh, Uttarakhand</div>
          <div class="rc-label">Spiritual</div>
          <div class="rc-tags">
            <span class="rc-tag">Yoga</span>
            <span class="rc-tag">River Rafting</span>
            <span class="rc-tag">Temple Visits</span>
          </div>
        </div>
      </div>
      <div class="recommend-card">
        <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308" alt="">
        <div class="rc-info">
          <div class="rc-title">Goa Beaches</div>
          <div class="rc-label">Relaxation</div>
          <div class="rc-tags">
            <span class="rc-tag">Beach Activities</span>
            <span class="rc-tag">Water Sports</span>
            <span class="rc-tag">Nightlife</span>
          </div>
        </div>
      </div>
      <div class="recommend-card">
        <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b" alt="">
        <div class="rc-info">
          <div class="rc-title">Ladakh, Jammu & Kashmir</div>
          <div class="rc-label">Adventure</div>
          <div class="rc-tags">
            <span class="rc-tag">Trekking</span>
            <span class="rc-tag">Motorcycle Tours</span>
            <span class="rc-tag">Camping</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-row">
      <button class="btn" onclick="restartMood()">Analyze Again</button>
      <button class="btn" onclick="payForTrip()">Pay & Select Date</button>
    </div>
  `;
}

window.restartMood = function(){
  step = 0;
  moodSelected = null;
  energyLevel = 5;
  socialLevel = 5;
  adventureLevel = 5;
  renderStep();
}

window.payForTrip = function(){
  alert("Redirecting to payment & date selection...");
}

renderStep();

// Cultural recommandation of enevt and fastivals
const festivals = [
  {
    name: "Diwali Festival",
    type: "religious",
    region: "Across India",
    image: "https://thumbs.dreamstime.com/b/decorated-diya-oil-lamp-happy-diwali-sign-set-bed-rose-petals-celebration-hindu-festival-diwali-deepavali-festival-389588303.jpg",
    month: ["oct", "nov"],
    desc: "Festival of lights celebrated with diyas, fireworks, and sweets.",
    experiences: ["Light Ceremonies", "Traditional Sweets", "Fireworks", "Family Gatherings"]
  },
  {
    name: "Holi Festival",
    type: "cultural",
    region: "North India",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1MRfFmaRAMNu_A4EodxJHsKyv-PGmMK7i5w&s",
    month: ["mar"],
    desc: "Festival of colors celebrating the arrival of spring.",
    experiences: ["Color Play", "Traditional Music", "Street Celebrations", "Special Foods"]
  },
  {
    name: "Durga Puja",
    type: "religious",
    region: "West Bengal",
    image: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/07/Durga-Puja.jpg?fit=1024%2C683&ssl=1",
    month: ["sep", "oct"],
    desc: "Grand celebration honoring Goddess Durga.",
    experiences: ["Pandal Hopping", "Cultural Programs", "Traditional Food", "Art Exhibitions"]
  },
  {
    name: "Eid-ul-Fitr",
    type: "religious",
    region: "Pan India",
    image: "https://media.citizen.co.za/wp-content/uploads/2025/03/Eid-al-Fitr.jpg",
    month: ["apr", "may"],
    desc: "Celebration marking the end of Ramadan fasting.",
    experiences: ["Prayer Gatherings", "Sweets", "Charity"]
  },
  {
    name: "Christmas",
    type: "religious",
    region: "Major Cities",
    image: "https://images.indianexpress.com/2024/02/Christmas-2024-Date-Christmas-2024-will-be-celebrated-on-25th-December-that-is-Wednesday.-Source-Freepik.jpg",
    month: ["dec"],
    desc: "Celebration of the birth of Jesus Christ, with decor and events.",
    experiences: ["Mass Prayers", "Decorations", "Music", "Santa Parade"]
  },
  {
    name: "Navratri Festival",
    type: "religious",
    region: "Gujarat",
    image: "https://www.gujarattourism.com/content/dam/gujrattourism/images/home_page/Navratri.jpg",
    month: ["sep", "oct"],
    desc: "Nine-day festival celebrating the goddess Durga.",
    experiences: ["Garba Dance", "Puja Ceremonies", "Traditional Foods"]
  },
  {
    name: "Ganesh Chaturthi",
    type: "religious",
    region: "Maharashtra",
    image: "https://www.nobrokerhood.com/blog/wp-content/uploads/2024/08/shutterstock_2351499283.jpg",
    month: ["aug", "sep"],
    desc: "Festival in honor of Lord Ganesha with vibrant processions.",
    experiences: ["Pandals", "Visarjan", "Sweets"]
  },
  {
    name: "Pushkar Fair",
    type: "cultural",
    region: "Rajasthan",
    image: "https://cdn.rajasthanstudio.com/2024/11/Pushkar-Mela-2024-11-09-18-07-15-384706-2024-11-09_18-07-16_156274.jpg.webp",
    month: ["nov"],
    desc: "India's largest camel fair with cultural events, markets, and competitions.",
    experiences: ["Camel Parade", "Folk Music", "Handicrafts"]
  }
];

const monthNames = {
  jan:"January", feb:"February", mar:"March", apr:"April", may:"May", jun:"June",
  jul:"July", aug:"August", sep:"September", oct:"October", nov:"November", dec:"December"
};

const cardsDiv = document.getElementById('festival-cards');
const filterBtns = document.querySelectorAll('.filter-btn');
const monthSelect = document.getElementById('month-select');

let festivalType = "all";
let festivalMonth = "all";

filterBtns.forEach(btn => {
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    festivalType = btn.dataset.type;
    renderFestivals();
  });
});

monthSelect.addEventListener('change', ()=>{
  festivalMonth = monthSelect.value;
  renderFestivals();
});

function renderFestivals(){
  let filtered = festivals.filter(f=>{
    let typeMatch = (festivalType === "all") || (festivalType === f.type);
    let monthMatch = (festivalMonth === "all") || (f.month.includes(festivalMonth));
    return typeMatch && monthMatch;
  });
  cardsDiv.innerHTML = filtered.map(f=>`
    <div class="festival-card">
      <div style="position:relative;">
        <img src="${f.image}" alt="${f.name}" class="festival-img"/>
        <div class="festival-type ${f.type}">${f.type.charAt(0).toUpperCase() + f.type.slice(1)}</div>
      </div>
      <div class="festival-content">
        <div class="festival-title">${f.name}</div>
        <div class="festival-meta">
          <span>📍 ${f.region}</span>
          <span>📅 ${f.month.map(m=>monthNames[m]).join(" - ")}</span>
        </div>
        <div class="festival-desc">${f.desc}</div>
        <div class="festival-experiences">
          <span class="exp-title">Festival Experiences:</span>
          ${f.experiences.map(exp=>`<span class="exp-tag">${exp}</span>`).join("")}
        </div>
        <button class="learn-btn">🔎 Learn More</button>
      </div>
    </div>
  `).join('');
}

renderFestivals();

// Sustainable & responsinable 

const carbonForm = document.getElementById('carbonForm');
const carbonResult = document.getElementById('carbonResult');

const emissionRates = {
  flight: 0.25, // kg CO2 per km per day (example)
  train: 0.06,
  bus: 0.08,
  car: 0.18,
};

carbonForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const days = parseInt(document.getElementById('tripdays').value);
  const type = document.getElementById('transporttype').value;

  // For demonstration, assume trip averages 100km/day
  const distance = days * 100;
  const rate = emissionRates[type] || 0.1;
  const totalCO2 = (distance * rate).toFixed(2);

  carbonResult.textContent =
    `Estimated Carbon Footprint: ${totalCO2} kg CO₂ for a ${days}-day trip by ${type.charAt(0).toUpperCase()+type.slice(1)}.`;
});

// AI ASSISTENT FEATURE

// Simple chat history + emergency button demos
const chatHistory = document.getElementById('chatHistory');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

// Initial welcome message
function addAssistantMsg(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg';
  msgDiv.textContent = text;
  chatHistory.appendChild(msgDiv);
}
addAssistantMsg("Hello! I'm your AI travel assistant. I can help you with real-time traffic updates, translate languages, provide emergency assistance, and suggest the best routes. How can I help you today?");

chatForm.addEventListener('submit', function(e){
  e.preventDefault();
  const userText = chatInput.value.trim();
  if(!userText) return;
  addAssistantMsg("You: " + userText);
  setTimeout(()=>{
    addAssistantMsg("Assistant: " + getBotReply(userText));
  }, 1200);
  chatInput.value = "";
});

function getBotReply(msg) {
  if(msg.toLowerCase().includes('traffic')) return "Current traffic to Red Fort is moderate.";
  if(msg.toLowerCase().includes('hospital')) return "Nearest hospital is AIIMS Delhi (4.5 km).";
  if(msg.toLowerCase().includes('translate')) return "Translation: 'Thank you' → 'धन्यवाद'";
  return "I'm here to assist! Please ask about traffic, hospitals, translation, or emergency help.";
}

// Emergency button: sends location and details (simulated)
window.sendEmergency = function(type) {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
      const {latitude, longitude} = pos.coords;
      addAssistantMsg(
        `[EMERGENCY] ${type}: Location sent (${latitude.toFixed(4)}, ${longitude.toFixed(4)}). Help is on the way!`
      );
      alert(`${type} - Location sent. Emergency services contacted!`);
    }, function(){
      addAssistantMsg(
        `[EMERGENCY] ${type}: Location unavailable. Sending alert without location.`
      );
      alert(`${type} - Unable to get location. Emergency services contacted!`);
    });
  } else {
    addAssistantMsg(
      `[EMERGENCY] ${type}: Geolocation unsupported. Sending alert without location.`
    );
    alert(`${type} - Geolocation not supported. Emergency services contacted!`);
  }
};

  const cities = [
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Goa",
    "Chandigarh",
    "Ranchi",
    "Guwahati",
    "Varanasi",
    "Surat"
  ];

  const fromInput = document.getElementById('fromCity');
  const toInput = document.getElementById('toCity');
  const fromSuggest = document.getElementById('fromSuggest');
  const toSuggest = document.getElementById('toSuggest');

  function filterCities(inputVal) {
    return cities.filter(city => city.toLowerCase().startsWith(inputVal.toLowerCase()));
  }

  function showSuggestions(inputElem, suggestElem) {
    let val = inputElem.value.trim();
    if (!val) {
      suggestElem.innerHTML = "";
      suggestElem.hidden = true;
      inputElem.setAttribute('aria-expanded', 'false');
      return;
    }
    let filtered = filterCities(val);
    if (filtered.length === 0) {
      suggestElem.innerHTML = "<div class='suggestion-item'>No results found</div>";
      suggestElem.hidden = false;
      inputElem.setAttribute('aria-expanded', 'true');
      return;
    }
    suggestElem.innerHTML = filtered.map(city =>
      `<div class="suggestion-item" role="option" tabindex="0">${city}</div>`
    ).join('');
    suggestElem.hidden = false;
    inputElem.setAttribute('aria-expanded', 'true');
  }

  function selectSuggestion(e, inputElem, suggestElem) {
    if (e.target.classList.contains('suggestion-item')) {
      inputElem.value = e.target.textContent;
      suggestElem.innerHTML = "";
      suggestElem.hidden = true;
      inputElem.setAttribute('aria-expanded', 'false');
      inputElem.focus();
    }
  }

  fromInput.addEventListener('input', () => showSuggestions(fromInput, fromSuggest));
  toInput.addEventListener('input', () => showSuggestions(toInput, toSuggest));

  fromSuggest.addEventListener('click', e => selectSuggestion(e, fromInput, fromSuggest));
  toSuggest.addEventListener('click', e => selectSuggestion(e, toInput, toSuggest));

  // Keyboard accessibility for suggestions
  function keyboardNav(inputElem, suggestElem, e) {
    let active = suggestElem.querySelector('.suggestion-item[tabindex="0"]');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!active) {
        let first = suggestElem.querySelector('.suggestion-item');
        if (first) first.setAttribute('tabindex', '0');
      } else {
        active.removeAttribute('tabindex');
        let next = active.nextElementSibling || suggestElem.querySelector('.suggestion-item');
        next.setAttribute('tabindex', '0');
        next.focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!active) {
        let last = suggestElem.querySelector('.suggestion-item:last-child');
        if (last) last.setAttribute('tabindex', '0');
      } else {
        active.removeAttribute('tabindex');
        let prev = active.previousElementSibling || suggestElem.querySelector('.suggestion-item:last-child');
        prev.setAttribute('tabindex', '0');
        prev.focus();
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (active) {
        inputElem.value = active.textContent;
        suggestElem.innerHTML = "";
        suggestElem.hidden = true;
        inputElem.setAttribute('aria-expanded', 'false');
        inputElem.focus();
      }
    } else if (e.key === 'Escape') {
      suggestElem.innerHTML = "";
      suggestElem.hidden = true;
      inputElem.setAttribute('aria-expanded', 'false');
    }
  }

  fromInput.addEventListener('keydown', e => keyboardNav(fromInput, fromSuggest, e));
  toInput.addEventListener('keydown', e => keyboardNav(toInput, toSuggest, e));

  // Swap cities
  function swapCities() {
    let fromVal = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = fromVal;
    fromInput.focus();
  }
  document.querySelector('.swap-btn').addEventListener('click', swapCities);

  // Show/hide return date field on trip type
  document.querySelectorAll('input[name="tripType"]').forEach(radio => {
    radio.addEventListener('change', function () {
      document.getElementById('returnField').style.display = this.value === 'roundtrip' ? 'block' : 'none';
    });
  });

  // Tab UI activate
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');
    });
  });

  // Form submit handler
  document.getElementById('bookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let fromCity = fromInput.value;
    let toCity = toInput.value;
    let departDate = document.getElementById('departDate').value;
    let returnDate = document.getElementById('returnDate').value;
    let tripType = document.querySelector('input[name="tripType"]:checked').value;
    let travellers = document.getElementById('travellers').value;
    let classType = document.getElementById('classType').value;
    let nonStop = document.getElementById('nonStop').checked;

    // Simple validation
    if(!fromCity || !toCity || !departDate) {
      alert('Please fill in all required fields.');
      return;
    }
    if(tripType === 'roundtrip' && !returnDate) {
      alert('Please select return date for round trip.');
      return;
    }

    // Show booking summary
    const bookingResult = document.getElementById('bookingResult');
    bookingResult.innerHTML = `<h3>Flight Booking Summary</h3>
      <p><strong>From:</strong> ${fromCity}</p>
      <p><strong>To:</strong> ${toCity}</p>
      <p><strong>Departure Date:</strong> ${departDate}</p>
      ${tripType === 'roundtrip' ? `<p><strong>Return Date:</strong> ${returnDate}</p>` : ''}
      <p><strong>Trip Type:</strong> ${tripType.charAt(0).toUpperCase() + tripType.slice(1)}</p>
      <p><strong>Travellers & Class:</strong> ${travellers}, ${classType}</p>
      <p><strong>Non-Stop Flights:</strong> ${nonStop ? 'Yes' : 'No'}</p>
      <button onclick="payNow()" style="background:#e45043;color:#fff;padding:12px 30px;border:none;border-radius:8px;cursor:pointer;font-size:1em;margin-top:10px;">Proceed to Payment</button>`;
  });

  function payNow() {
    alert('Proceeding to payment gateway...');
  }

   // Add your luxury train details below:
    const trains = [
      {
        name: "Deccan Odyssey",
        img: "https://deccan-odyssey.in/wp-content/uploads/2024/12/train-deccan-odyssey18.jpg"
      },
      {
        name: "The Golden Chariot",
        img: "https://www.tripsavvy.com/thmb/1ohjZcqgoCy1MU0aTeLSMa2V6_Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/golden-chariot-train-lg1-5a0303edda271500373e6ead.jpg"
      },
      {
        name: "Palace on Wheels",
        img: "https://preview.redd.it/indian-railways-palace-on-wheels-v0-96wnngxu0ssa1.png?width=602&format=png&auto=webp&s=af5b96576808fee62ccb34311ebb1d747bf4e4a5"
      },
      {
        name: "Maharajas' Express",
        img: "https://www.peakadventuretour.com/assets/images/maharaja-express-train_banner.webp"
      }
    ];

    const trainTrack = document.getElementById("trainTrack");
    let current = 0;

    function renderTrains() {
      trainTrack.innerHTML = trains.map(train => `
        <div class="train-card">
          <img src="${train.img}" alt="${train.name}" class="train-img" />
          <div class="train-name">${train.name}</div>
        </div>
      `).join('');
      trainTrack.style.transform = `translateX(${-current*402}px)`;
    }

    document.getElementById("prevBtn").onclick = () => {
      if(current > 0) current--;
      renderTrains();
    };
    document.getElementById("nextBtn").onclick = () => {
      if(current < trains.length-1) current++;
      renderTrains();
    };

    renderTrains();

    const registerBtn = document.getElementById('registerBtn');
const registrationSection = document.getElementById('registrationSection');
const registrationForm = document.getElementById('tripRegistrationForm');
const registrationMessage = document.getElementById('registrationMessage');

registerBtn.addEventListener('click', () => {
  const isVisible = registrationSection.style.display === 'block';
  registrationSection.style.display = isVisible ? 'none' : 'block';
  if (!isVisible) {
    registrationSection.scrollIntoView({ behavior: 'smooth' });
  }
});

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple form validation (already HTML5 validated, but can customize)
  if (!registrationForm.checkValidity()) {
    registrationMessage.textContent = "Please fill all required fields correctly.";
    registrationMessage.style.color = 'red';
    return;
  }
  
  // Simulate form submission, e.g., send to server or show success
  const formData = new FormData(registrationForm);
  const name = formData.get('fullName');
  
  registrationMessage.textContent = `Thank you, ${name}! Your trip registration has been received. We will contact you shortly.`;
  registrationMessage.style.color = 'green';
  
  registrationForm.reset();
});
